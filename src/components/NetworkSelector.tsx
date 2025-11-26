import { useState, useEffect } from 'react';
import { Network, Globe, ChevronDown } from 'lucide-react';
import { CertificatePolkadotService } from '../services/certificatePolkadotService';

interface NetworkSelectorProps {
  onNetworkChange?: (network: string) => void;
}

export function NetworkSelector({ onNetworkChange }: NetworkSelectorProps) {
  const [currentNetwork, setCurrentNetwork] = useState<string>('polkadot');
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  
  const networks = [
    { id: 'polkadot', name: 'Polkadot', color: 'from-[#E6007A] to-[#6F36BC]' },
    { id: 'kusama', name: 'Kusama', color: 'from-[#000000] to-[#2B2B2B]' },
    { id: 'acala', name: 'Acala', color: 'from-[#6394F8] to-[#2669DD]' },
    { id: 'astar', name: 'Astar', color: 'from-[#1B1B1B] to-[#4A4A4A]' },
    { id: 'moonbeam', name: 'Moonbeam', color: 'from-[#53CBC7] to-[#2A86E0]' },
    { id: 'statemint', name: 'Statemint', color: 'from-[#8CC64A] to-[#0066CC]' },
    { id: 'paseo', name: 'Paseo (Testnet)', color: 'from-[#FF6B35] to-[#F7931E]' },
  ];

  const polkadotService = CertificatePolkadotService.getInstance();

  useEffect(() => {
    // Update network when service changes network
    if (polkadotService.isConnected()) {
      setIsConnected(true);
      setCurrentNetwork(polkadotService.getCurrentNetwork());
    }
  }, []);

  const handleNetworkSelect = async (networkId: string) => {
    if (!polkadotService.isConnected()) {
      // If not connected, connect first
      await polkadotService.connectWallet();
    }
    
    const success = await polkadotService.switchNetwork(networkId as any);
    if (success) {
      setCurrentNetwork(networkId);
      setIsSelectorOpen(false);
      onNetworkChange?.(networkId);
    }
  };

  const currentNetworkInfo = networks.find(n => n.id === currentNetwork) || networks[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsSelectorOpen(!isSelectorOpen)}
        disabled={!isConnected}
        className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all ${
          isConnected 
            ? 'bg-gradient-to-r ' + currentNetworkInfo.color + ' text-white shadow-lg' 
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        <Globe size={18} />
        <span className="font-semibold">{currentNetworkInfo.name}</span>
        <ChevronDown size={16} className={`transform transition-transform ${isSelectorOpen ? 'rotate-180' : ''}`} />
      </button>

      {isSelectorOpen && (
        <div className="absolute top-full mt-2 w-64 bg-card border border-border rounded-xl shadow-2xl z-50 overflow-hidden">
          <div className="py-2">
            <p className="px-4 py-2 text-sm font-semibold text-card-foreground/70 border-b border-border">
              Select Network
            </p>
            {networks.map((network) => (
              <button
                key={network.id}
                onClick={() => handleNetworkSelect(network.id)}
                className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-accent transition-colors ${
                  currentNetwork === network.id ? 'bg-accent font-bold' : ''
                }`}
              >
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${network.color}`}></div>
                <span className="text-card-foreground">{network.name}</span>
                {currentNetwork === network.id && (
                  <div className="ml-auto w-2 h-2 bg-green-500 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}