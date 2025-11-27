import React, { useState, useEffect } from 'react';
import { Wallet, Shield, CheckCircle, XCircle, ChevronDown } from 'lucide-react';
import { CertificatePolkadotService } from '../services/certificatePolkadotService';
import { NetworkSelector } from './NetworkSelector';

interface PolkadotHeaderProps {
  onConnectionChange: (connected: boolean) => void;
}

export const PolkadotHeader: React.FC<PolkadotHeaderProps> = ({ onConnectionChange }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [accounts, setAccounts] = useState<any[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<any>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showAccounts, setShowAccounts] = useState(false);

  const polkadotService = CertificatePolkadotService.getInstance();

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    const connected = polkadotService.isConnected();
    if (connected) {
      setIsConnected(true);
      setAccounts(polkadotService.getAccounts());
      setSelectedAccount(polkadotService.getSelectedAccount());
      onConnectionChange(true);
    }
  };

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      const connected = await polkadotService.connectWallet();
      if (connected) {
        setIsConnected(true);
        setAccounts(polkadotService.getAccounts());
        setSelectedAccount(polkadotService.getSelectedAccount());
        onConnectionChange(true);
      }
    } catch (error) {
      console.error('Connection failed:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleAccountChange = (account: any) => {
    polkadotService.setSelectedAccount(account);
    setSelectedAccount(account);
    setShowAccounts(false);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setAccounts([]);
    setSelectedAccount(null);
    onConnectionChange(false);
  };

  return (
    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Shield className="w-5 h-5" />
          <span className="font-semibold text-sm">Polkadot Network</span>
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${
            isConnected ? 'bg-green-500/20 text-green-100' : 'bg-red-500/20 text-red-100'
          }`}>
            {isConnected ? (
              <CheckCircle className="w-3 h-3" />
            ) : (
              <XCircle className="w-3 h-3" />
            )}
            <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <NetworkSelector />
          
          {isConnected ? (
            <div className="relative">
              <button
                onClick={() => setShowAccounts(!showAccounts)}
                className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-3 py-1 rounded-lg transition-colors"
              >
                <Wallet className="w-4 h-4" />
                <span className="text-sm max-w-[120px] truncate">
                  {selectedAccount?.meta?.name || 'Account'}
                </span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {showAccounts && (
                <div className="absolute right-0 top-full mt-1 bg-white text-gray-800 rounded-lg shadow-xl border border-gray-200 min-w-[200px] z-50">
                  <div className="p-2 border-b border-gray-100">
                    <p className="text-xs text-gray-500">Connected Accounts</p>
                  </div>
                  {accounts.map((account) => (
                    <button
                      key={account.address}
                      onClick={() => handleAccountChange(account)}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${
                        selectedAccount?.address === account.address ? 'bg-purple-50 text-purple-600' : ''
                      }`}
                    >
                      <div className="font-medium truncate">
                        {account.meta.name || 'Unknown'}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {account.address.slice(0, 8)}...{account.address.slice(-6)}
                      </div>
                    </button>
                  ))}
                  <div className="p-2 border-t border-gray-100">
                    <button
                      onClick={handleDisconnect}
                      className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                      Disconnect
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={handleConnect}
              disabled={isConnecting}
              className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 disabled:opacity-50 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
            >
              <Wallet className="w-4 h-4" />
              <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};