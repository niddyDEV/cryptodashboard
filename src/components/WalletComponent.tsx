'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { chains } from '@/app/utils/chains';
import { useWallet, useCryptoAssets } from '@/app/hooks/hooks';

interface WalletComponentProps {
  walletAddress: string;
  onAccountChange: (address: string) => void;
  onTokenSelect: (tokenSymbol: string) => void;
}

export default function WalletComponent({
  walletAddress,
  onAccountChange,
  onTokenSelect,
}: WalletComponentProps) {
  const [network, setNetwork] = useState<string>(chains[0].name);
  const [selectedToken, setSelectedToken] = useState<string>('');
  const [transactionStatus, setTransactionStatus] = useState<string>('');
  const [accounts, setAccounts] = useState<string[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<string>('');

  // Используем кастомные хуки
  const { balance, provider, wallet } = useWallet('', walletAddress, network);
  const { cryptoAssets } = useCryptoAssets(network);

  // Инициализация аккаунтов
  useEffect(() => {
    const savedAccounts = ['Account 1'];
    setAccounts(savedAccounts);
    setSelectedAccount(savedAccounts[0]);
  }, []);

  // Обработка выбора токена
  const handleTokenSelect = (tokenSymbol: string) => {
    setSelectedToken(tokenSymbol);
    onTokenSelect(tokenSymbol);
  };

  // Обработка смены аккаунта
  const handleAccountChange = (account: string) => {
    setSelectedAccount(account);
    onAccountChange(account);
  };

  // Форматирование валюты
  const formatCurrency = (value: string) => {
    return `$${parseFloat(value).toFixed(2)}`;
  };

  // Форматирование баланса криптовалюты
  const formatCryptoBalance = (balance: string) => {
    return parseFloat(balance).toFixed(4);
  };

  return (
    <div>
      {/* Селектор аккаунта */}
      <div className="mb-6">
        <select
          value={selectedAccount}
          onChange={(e) => handleAccountChange(e.target.value)}
          className="w-full p-3 bg-zinc-800 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-white-900"
        >
          {accounts.map((account) => (
            <option key={account} value={account}>
              {account}
            </option>
          ))}
        </select>
      </div>
      <div className='account-picture ml-auto mr-auto'>
        <div className='blur-back'></div>
      </div>

      {/* Информация о кошельке */}
      <div className="mb-2 mt-2 p-4 rounded-lg">
        <p className="text-white w-36 ml-auto mr-auto pixelify-sans mb-4 break-all">{walletAddress}</p>
        <p className="text-white text-4xl red-rose font-bold">
          {balance} <span className="text-sm text-3xl">{selectedToken || chains.find(c => c.name === network)?.tokens[0]?.symbol}</span>
        </p>
      </div>

      {/* Селектор сети */}
      <div className="mb-6">
        <select
          value={network}
          onChange={(e) => setNetwork(e.target.value)}
          className="w-full p-3 bg-zinc-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
        >
          {chains.map((chain) => (
            <option key={chain.name} value={chain.name}>
              {chain.name} 
            </option>
          ))} 
        </select>
      </div>

      {/* Список активов */}
      <div className="mb-6 rounded-lg bg-zinc-800 p-4">
        <label className="text-white text-sm font-medium mb-2 block">Your assets</label>
        <div className="space-y-2">
          {cryptoAssets.map((crypto) => {
            const usdValue = (parseFloat(crypto.balance) * parseFloat(crypto.price)).toFixed(2);
            return (
              <button
                key={crypto.symbol}
                onClick={() => handleTokenSelect(crypto.symbol)}
                className="flex items-center justify-between w-full p-3 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-lg ${
                    crypto.symbol === 'BTC' ? 'bg-orange-500' :
                    crypto.symbol === 'ETH' ? 'bg-blue-500' :
                    crypto.symbol === 'USDC' ? 'bg-blue-400' :
                    'bg-purple-500'
                  }`}>
                    {crypto.icon}
                  </div>
                  <div className="text-left">
                    <p className="text-white font-medium">{crypto.symbol}</p>
                    <p className="text-sm text-gray-400">{formatCurrency(crypto.price)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white">{formatCryptoBalance(crypto.balance)}</p>
                  <p className="text-sm text-gray-400">{formatCurrency(usdValue)}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Кнопки "Отправить" и "Получить" */}
      <div className="flex gap-4 mb-6">
        <button
          className="flex-1 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          onClick={() => setTransactionStatus('Send functionality not implemented yet.')}
        >
          Send
        </button>
        <button
          className="flex-1 p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          onClick={() => setTransactionStatus('Receive functionality not implemented yet.')}
        >
          Receive
        </button>
      </div>

      {/* Статус транзакции */}
      {transactionStatus && (
        <div className="p-3 bg-gray-700 text-white rounded-lg">
          <p className="text-sm">{transactionStatus}</p>
        </div>
      )}
    </div>
  );
}