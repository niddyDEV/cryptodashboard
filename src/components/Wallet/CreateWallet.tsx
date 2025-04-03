'use client';
'use client';
import { useState } from 'react';
import { ethers } from 'ethers';

interface CreateWalletProps {
  onWalletCreated: (seedPhrase: string, walletAddress: string) => void;
}

export default function CreateWallet({ onWalletCreated }: CreateWalletProps) {
  const [newSeedPhrase, setNewSeedPhrase] = useState<string | null>(null);

  // Генерация сид-фразы
  const generateWallet = () => {
    const mnemonic = ethers.Wallet.createRandom().mnemonic!.phrase;
    setNewSeedPhrase(mnemonic);
  };

  // Сохранение сид-фразы и адреса кошелька
  const setWalletAndMnemonic = () => {
    if (!newSeedPhrase) return;

    const wallet = ethers.Wallet.fromPhrase(newSeedPhrase);
    onWalletCreated(newSeedPhrase, wallet.address);
  };

  // Разделение сид-фразы на слова
  const seedWords = newSeedPhrase ? newSeedPhrase.split(' ') : [];

  return (
    <div >
      <p className="text-white">Click the button below to generate a new wallet.</p>
      <button
        className="create-wallet-button px-4 py-2 text-white rounded mt-4"
        onClick={generateWallet}
      >
        Generate Seed Phrase
      </button>

      {/* Отображение сид-фразы в мини-блоках */}
      {newSeedPhrase && (
        <div className="mt-4 wallet-container">
          <div className="seed-phrase-grid">
            {seedWords.map((word, index) => (
              <div key={index} className="seed-word">
                {word}
              </div>
            ))}
          </div>
          <p className="text-white mt-4">
            Save this seed phrase securely. It will be required to recover your wallet.
          </p>
        </div>
      )}

      {/* Кнопка для открытия нового кошелька */}
      {newSeedPhrase && (
        <button
          className="setup-wallet-button mt-4 px-4 py-2 text-white rounded"
          onClick={setWalletAndMnemonic}
        >
          Open Your New Wallet
        </button>
      )}
    </div>
  );
}