'use client';
import { CircleArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CreateWallet from '@/components/Wallet/CreateWallet';

export default function Home() {
  // useStates 
  const router = useRouter();
  const [showWalletOptions, setShowWalletOptions] = useState(false); // Показывать ли выбор между созданием и импортом
  const [activeOption, setActiveOption] = useState<'create' | 'import' | null>(null); // Выбранная опция (создание или импорт)
  const [seedPhrase, setSeedPhrase] = useState(''); // State for seed phrase
  const [walletAddress, setWalletAddress] = useState(''); // State for address

  // Обработчик для создания кошелька
  const handleWalletCreated = (newSeedPhrase: string, newWalletAddress: string) => {
    setSeedPhrase(newSeedPhrase);
    setWalletAddress(newWalletAddress);

    // Сохраняем данные в localStorage
    localStorage.setItem('walletAddress', newWalletAddress);
    localStorage.setItem('seedPhrase', newSeedPhrase);

    // Перенаправляем на dashboard
    router.push('/dashboard');
  };

  const handleCreateWallet = () => {
    setActiveOption('create');
  };

  const handleImportWallet = () => {
    setActiveOption('import');
  };
  
  const handleBack = () => {
    setActiveOption(null); // Возврат к выбору между созданием и импортом
  };

  return (
    <div className="HomePage flex flex-col items-center justify-center min-h-screen">
      <header>
        <Image
        src='/images/wMyornLogo.png'
        alt='whiteLogo'
        width={100}
        height={100}
        className='mb-6'
        />
      </header>
      <div className='wallet-container'>
        <h1 className="text-white font-bold pixelify-sans text-2xl">Welcome to Myorn</h1>
        <h1 className="text-white font-bold pixelify-sans text-xl">An AI powered crypto-dashboard.</h1>
        <p className="text-white font-medium pixelify-sans text-sm mt-5">Manage your investments and study chart patterns with excellent intelligence.</p>

        {!showWalletOptions ? (
          <button
            className="setup-wallet-button"
            onClick={() => setShowWalletOptions(true)}
          >
            Setup Your Wallet
          </button>
        ) : (
          <div className="mt-6">
            {!activeOption ? (
              <div className="flex flex-col gap-2">
                <button
                  className="create-wallet-button px-4 py-2 text-white rounded"
                  onClick={handleCreateWallet}
                >
                  Create New Wallet
                </button>
                <button
                  className="import-wallet-button px-4 py-2 text-white rounded"
                  onClick={handleImportWallet}
                >
                  Import Wallet
                </button>
              </div>
            ) : (
              <div className="mt-6">
                {activeOption === 'create' && (
                  <CreateWallet onWalletCreated={handleWalletCreated} />
                )}

                {activeOption === 'import' && (
                  <div>
                    <p className="text-white">Enter your seed phrase to import your wallet.</p>
                    <input
                      type="text"
                      value={seedPhrase}
                      onChange={(e) => setSeedPhrase(e.target.value)}
                      placeholder="Enter your seed phrase"
                      className="mt-2 mb-4 px-4 py-2 rounded"
                    />
                    <button
                      className="import-wallet-button"
                      onClick={handleImportWallet}
                    >
                      Import Wallet
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        </div>
        {/* Кнопка-стрелочка для возврата */}
        {activeOption && (
          <button
            onClick={handleBack}
            className="back-button"
          >
            <CircleArrowLeft size={48} color="white" />
          </button>
        )}
        </div>
    );
}
