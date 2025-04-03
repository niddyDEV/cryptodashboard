import { useState } from 'react';
import CreateWallet from '@/components/Wallet/CreateWallet'
import ImportWallet from '@/components/Wallet/ImportWallet';

export default function WalletTabs({ onWalletCreated }: { onWalletCreated: (seedPhrase: string, walletAddress: string) => void }) {
  const [activeTab, setActiveTab] = useState<'create' | 'import'>('create');

  return (
    <div>
      <div>
        <button onClick={() => setActiveTab('create')}>Create Wallet</button>
        <button onClick={() => setActiveTab('import')}>Import Wallet</button>
      </div>
      {activeTab === 'create' && <CreateWallet onWalletCreated={onWalletCreated} />}
      {activeTab === 'import' && <ImportWallet onWalletCreated={onWalletCreated} />}
    </div>
  );
}