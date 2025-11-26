import { useState } from 'react';
import { Button } from './ui/button';
import { MultiChainPolkadotService } from '../services/multiChainPolkadotService';

export function PolkadotTest() {
  const [status, setStatus] = useState<string>('Disconnected');
  const [accounts, setAccounts] = useState<any[]>([]);
  
  const connectWallet = async () => {
    const service = MultiChainPolkadotService.getInstance();
    const success = await service.connectWallet();
    
    if (success) {
      setStatus('Connected');
      setAccounts(service.getAccounts());
    } else {
      setStatus('Connection failed');
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-bold mb-2">Polkadot Connection Test</h3>
      <p>Status: {status}</p>
      
      <Button onClick={connectWallet} className="mt-2">
        Connect Wallet
      </Button>
      
      {accounts.length > 0 && (
        <div className="mt-4">
          <p>Accounts found: {accounts.length}</p>
          {accounts.map((acc, index) => (
            <div key={index} className="text-sm font-mono break-all">
              {acc.meta.name || 'Unnamed Account'}: {acc.address?.slice(0, 10)}...{acc.address?.slice(-6)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}