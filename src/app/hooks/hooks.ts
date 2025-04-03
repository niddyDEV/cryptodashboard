import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { chains, Chain } from '@/app/utils/chains';

// Хук для инициализации кошелька
export const useWallet = (seedPhrase: string, walletAddress: string, network: string) => {
  const [balance, setBalance] = useState<string>('0');
  const [provider, setProvider] = useState<ethers.providers.JsonRpcProvider | null>(null);
  const [wallet, setWallet] = useState<ethers.Wallet | null>(null);

  useEffect(() => {
    const initializeWallet = async () => {
      try {
        const selectedChain = chains.find((chain) => chain.name === network);
        if (!selectedChain) return;

        const provider = new ethers.providers.JsonRpcProvider(selectedChain.rpcUrl);
        setProvider(provider);

        const wallet = ethers.Wallet.fromMnemonic(seedPhrase).connect(provider);
        setWallet(wallet);

        const balance = await provider.getBalance(wallet.address);
        setBalance(ethers.utils.formatEther(balance));
      } catch (error) {
        console.error('Error initializing wallet:', error);
      }
    };

    if (seedPhrase && walletAddress) {
      initializeWallet();
    }
  }, [seedPhrase, walletAddress, network]);

  return { balance, provider, wallet };
};

// Хук для загрузки криптоактивов
export const useCryptoAssets = (network: string) => {
  const [cryptoAssets, setCryptoAssets] = useState<{ symbol: string; balance: string; price: string; icon: string }[]>([]);

  useEffect(() => {
    const fetchCryptoAssets = async () => {
      try {
        const selectedChain = chains.find((chain) => chain.name === network);
        if (!selectedChain) return;

        const assets = selectedChain.tokens.map((token) => ({
          symbol: token.symbol,
          balance: '0', // Замените на реальный баланс
          price: '0', // Замените на реальную цену
          icon: getTokenIcon(token.symbol), // Получаем иконку токена
        }));

        setCryptoAssets(assets);
      } catch (error) {
        console.error('Error fetching crypto assets:', error);
      }
    };

    fetchCryptoAssets();
  }, [network]);

  return { cryptoAssets };
};

// Хук для управления аккаунтами
export const useAccounts = () => {
  const [accounts, setAccounts] = useState<string[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<string>('');

  useEffect(() => {
    const savedAccounts = ['Account 1']; // Пример данных
    setAccounts(savedAccounts);
    setSelectedAccount(savedAccounts[0]);
  }, []);

  return { accounts, selectedAccount, setSelectedAccount };
};

// Вспомогательная функция для получения иконки токена
const getTokenIcon = (symbol: string): string => {
  switch (symbol) {
    case 'ETH':
      return 'Ξ';
    case 'USDT':
      return '$';
    case 'DAI':
      return '◈';
    case 'BNB':
      return 'ⓑ';
    case 'BUSD':
      return '$';
    case 'MATIC':
      return 'Ⓜ';
    case 'USDC':
      return '$';
    default:
      return '₿';
  }
};