import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Wallet, CheckCircle } from 'lucide-react';

interface WalletConnectionProps {
  onConnectionChange: (connected: boolean, address: string) => void;
}

export function WalletConnection({ onConnectionChange }: WalletConnectionProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const handleConnect = () => {
    // Simulate MetaMask connection
    const mockAddress = '0x' + Math.random().toString(16).substring(2, 42);
    setWalletAddress(mockAddress);
    setIsConnected(true);
    onConnectionChange(true, mockAddress);
  };

  const handleDisconnect = () => {
    setWalletAddress('');
    setIsConnected(false);
    onConnectionChange(false, '');
  };

  return (
    <Card className="p-8 bg-card border-2 border-border/50 shadow-xl relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#8B5CF6]/20 rounded-full blur-2xl"></div>
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-[#8B5CF6] to-[#2DD4BF] rounded-2xl flex items-center justify-center shadow-lg">
            <Wallet className="text-white" size={28} />
          </div>
          <div>
            <h3 className="text-card-foreground font-bold text-xl">MetaMask Connection</h3>
            {isConnected ? (
              <div className="flex items-center gap-2 mt-2">
                <CheckCircle className="text-[#2DD4BF]" size={18} />
                <span className="text-[#2DD4BF] font-semibold">Connected</span>
              </div>
            ) : (
              <p className="text-card-foreground/60 mt-2">Not connected</p>
            )}
          </div>
        </div>
        
        {!isConnected ? (
          <Button 
            onClick={handleConnect}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-semibold lowercase shadow-lg shadow-primary/30"
          >
            connect wallet
          </Button>
        ) : (
          <Button 
            onClick={handleDisconnect}
            className="bg-card-foreground/10 hover:bg-card-foreground/20 text-card-foreground px-8 py-3 rounded-full font-semibold lowercase"
          >
            disconnect
          </Button>
        )}
      </div>
      
      {isConnected && (
        <div className="mt-6 p-4 bg-card-foreground/5 rounded-2xl border border-card-foreground/10 relative z-10">
          <p className="text-card-foreground/60 font-semibold mb-2">Connected Account:</p>
          <p className="text-card-foreground font-mono break-all">{walletAddress}</p>
        </div>
      )}
    </Card>
  );
}