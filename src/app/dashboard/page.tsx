'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import ChartComponent from '@/components/ChartComponent';
import ChatComponent from '@/components/ChatComponent';
import { Resizable, ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import WalletComponent from '@/components/WalletComponent';

export default function WalletPage() {
  const [selectedChain, setSelectedChain] = useState('0x1');
  const [walletAddress, setWalletAddress] = useState('');
  const [seedPhrase, setSeedPhrase] = useState('');
  const [selectedToken, setSelectedToken] = useState('ETH'); // По умолчанию ETH
  // making hook for resizable boxes
  const [sizes, setSizes] = useState({
    chart: { width: 1200, height: 500 }, 
    wallet: { width: 600, height: 700 },
    chat: { width: 600, height: 700 },
  });

  // uploading data from sessionStorage
  useEffect(() => {
    const savedWalletAddress = sessionStorage.getItem('walletAddress');
    const savedSeedPhrase = sessionStorage.getItem('seedPhrase');
    const savedSizes = sessionStorage.getItem('blockSizes');
    if (savedWalletAddress && savedSeedPhrase) {
      setWalletAddress(savedWalletAddress);
      setSeedPhrase(savedSeedPhrase);
    }
    if (savedSizes) {
      setSizes(JSON.parse(savedSizes));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('blockSizes', JSON.stringify(sizes));
  }, [sizes]);

  const handleResize = (block: keyof typeof sizes, size: { width: number; height: number }) => {
    setSizes((prev) => ({
      ...prev,
      [block]: size,
    }));
  };

  const handleAccountChange = (address: string) => {
    console.log('Selected Account:', address);
  };

  const handleTokenSelect = (tokenSymbol: string) => {
    setSelectedToken(tokenSymbol);
  };

  return (
    <div className="HomePage flex flex-col items-center justify-center min-h-screen p-6">
      <header className="mb-8">
        <Image
          src="/images/wMyornLogo.png"
          alt="whiteLogo"
          width={100}
          height={100}
        />
      </header>

      {/* Верхний ряд: WalletComponent и ChatComponent */}
      <div className="flex w-full max-w-7xl gap-6 mb-6">
        {/* Кошелёк */}
        <ResizableBox
          width={sizes.wallet.width}
          height={sizes.wallet.height}
          onResize={(e, { size }) => handleResize('wallet', size)}
          minConstraints={[300, 300]}
          maxConstraints={[800, 800]}
          resizeHandles={['se', 'sw', 'ne', 'nw']}
          className="wallet-container p-6 bg-gray-900 rounded-lg" 
        >
          <WalletComponent 
            walletAddress={walletAddress} 
            onAccountChange={handleAccountChange} 
            onTokenSelect={handleTokenSelect} 
          />
        </ResizableBox>

        {/* Чат с ИИ */}
        <ResizableBox
          width={sizes.chat.width}
          height={sizes.chat.height}
          onResize={(e, { size }) => handleResize('chat', size)}
          minConstraints={[300, 300]}
          maxConstraints={[800, 800]}
          resizeHandles={['se', 'sw', 'ne', 'nw']}
          className="wallet-container p-6 bg-gray-900 rounded-lg"
        >
          <ChatComponent />
        </ResizableBox>
      </div>

      {/* Нижний ряд: ChartComponent */}
      <div className="w-full max-w-7xl">
        <ResizableBox
          width={sizes.chart.width}
          height={sizes.chart.height}
          onResize={(e, { size }) => handleResize('chart', size)}
          minConstraints={[800, 400]}
          maxConstraints={[1200, 800]}
          resizeHandles={['se', 'sw', 'ne', 'nw']}
          className="wallet-container p-6 bg-gray-900 rounded-lg"
        >
          <div className="chart-container">
            <ChartComponent pairAddress={`${selectedToken}/USDT`} />
          </div>
        </ResizableBox>
      </div>
    </div>
  );
}