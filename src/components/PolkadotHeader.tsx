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
    <div className="bg-slate-950/95 backdrop-blur-xl border-b border-cyan-500/20 text-slate-100 px-4 py-3 shadow-xl shadow-slate-950/50 sticky top-0 z-40">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
            <Shield className="w-5 h-5 text-cyan-400" />
          </div>
          <span className="font-semibold text-sm uppercase tracking-widest text-slate-200">Polkadot Network</span>
          <div className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            isConnected 
              ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 shadow-lg shadow-emerald-500/10' 
              : 'bg-rose-500/10 text-rose-300 border border-rose-500/30 shadow-lg shadow-rose-500/10'
          }`}>
            {isConnected ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <XCircle className="w-4 h-4" />
            )}
            <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <NetworkSelector />
          
          {isConnected ? (
            <div className="relative">
              <button
                onClick={() => setShowAccounts(!showAccounts)}
                className="flex items-center space-x-2 bg-slate-900/70 border border-cyan-500/20 hover:border-cyan-500/50 px-4 py-2 rounded-xl transition-all hover:bg-slate-900 active:scale-95"
              >
                <Wallet className="w-4 h-4 text-cyan-400" />
                <span className="text-sm max-w-[140px] truncate text-slate-200">
                  {selectedAccount?.meta?.name || 'Account'}
                </span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${showAccounts ? 'rotate-180' : ''}`} />
              </button>

              {showAccounts && (
                <div className="absolute right-0 top-full mt-2 bg-slate-950 text-slate-100 rounded-xl shadow-2xl border border-cyan-500/20 min-w-[260px] z-50 backdrop-blur-xl overflow-hidden animate-in fade-in-50 slide-in-from-top-2">
                  <div className="p-3 border-b border-slate-800/50">
                    <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Connected Accounts</p>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {accounts.map((account) => (
                      <button
                        key={account.address}
                        onClick={() => handleAccountChange(account)}
                        className={`w-full text-left px-4 py-3 text-sm transition-all border-l-2 ${
                          selectedAccount?.address === account.address 
                            ? 'bg-cyan-500/10 border-l-cyan-500 text-cyan-300' 
                            : 'border-l-transparent hover:bg-slate-900/50 text-slate-300 hover:text-slate-100'
                        }`}
                      >
                        <div className="font-semibold truncate">
                          {account.meta.name || 'Unknown'}
                        </div>
                        <div className="text-xs text-slate-500 truncate font-mono">
                          {account.address.slice(0, 8)}...{account.address.slice(-6)}
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="p-2 border-t border-slate-800/50">
                    <button
                      onClick={handleDisconnect}
                      className="w-full text-left px-4 py-2 text-sm text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors font-semibold"
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
              className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/50 hover:border-cyan-500 disabled:opacity-50 px-4 py-2 rounded-xl transition-all text-sm font-semibold text-cyan-300 hover:text-cyan-200 active:scale-95 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20"
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