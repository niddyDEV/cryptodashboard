import { useState } from 'react';

export default function ImportWallet({ onWalletCreated }: { onWalletCreated: (seedPhrase: string, walletAddress: string) => void }) {
  const [inputSeedPhrase, setInputSeedPhrase] = useState('');

  const recoverWallet = () => {
    const walletAddress = 'ваш восстановленный кошелек';
    onWalletCreated(inputSeedPhrase, walletAddress);
  };

  return (
    <div>
      <input
        type="text"
        value={inputSeedPhrase}
        onChange={(e) => setInputSeedPhrase(e.target.value)}
      />
      <button onClick={recoverWallet}>Recover Wallet</button>
    </div>
  );
}