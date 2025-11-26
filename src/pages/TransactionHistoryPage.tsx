import { useState, useEffect } from 'react';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Search, ExternalLink, Calendar, Hash, Globe, CheckCircle, Shield } from 'lucide-react';
import { CertificatePolkadotService } from '../services/certificatePolkadotService';

interface TransactionRecord {
  id: string;
  certificateHash: string;
  certificateName: string;
  transactionHash: string;
  blockNumber: number;
  timestamp: string;
  status: 'verified' | 'pending' | 'failed';
  parachain: string;
  type: 'upload' | 'verification';
}

interface TransactionHistoryPageProps {
  isPolkadotConnected?: boolean;
}

export function TransactionHistoryPage({ isPolkadotConnected = false }: TransactionHistoryPageProps) {
  const [transactions, setTransactions] = useState<TransactionRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  const polkadotService = CertificatePolkadotService.getInstance();

  useEffect(() => {
    loadTransactionHistory();
  }, []);

  const loadTransactionHistory = async () => {
    try {
      setLoading(true);
      
      // Get all certificates from the Polkadot service
      const certificates = polkadotService.getAllCertificates();
      
      // Convert certificate records to transaction records
      const transactionRecords: TransactionRecord[] = certificates.map((cert, index) => ({
        id: cert.certificateHash.slice(0, 16),
        certificateHash: cert.certificateHash,
        certificateName: cert.certificateName,
        transactionHash: cert.transactionHash,
        blockNumber: typeof cert.blockNumber === 'number' ? cert.blockNumber : 0,
        timestamp: cert.metadata?.timestamp ? new Date(cert.metadata.timestamp).toISOString() : new Date().toISOString(),
        status: cert.status as 'verified' | 'pending' | 'failed',
        parachain: cert.parachain,
        type: 'upload' as const
      }));
      
      setTransactions(transactionRecords);
    } catch (error) {
      console.error('Error loading transaction history:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTransactions = transactions.filter(tx => 
    tx.certificateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.certificateHash.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.transactionHash.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to get status badge variant
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'verified':
        return 'success';
      case 'pending':
        return 'secondary';
      case 'failed':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  // Function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Radial Gradients */}
      <div className="absolute -top-40 left-[5%] w-[600px] h-[600px] bg-gradient-to-br from-green-500/20 to-cyan-500/5 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute top-[10%] -right-40 w-[500px] h-[500px] bg-gradient-to-tl from-cyan-500/15 to-blue-500/5 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute -bottom-40 left-[20%] w-[500px] h-[500px] bg-gradient-to-tr from-blue-500/10 to-cyan-500/5 rounded-full blur-3xl opacity-40"></div>

      <div className="container mx-auto px-4 py-16 max-w-6xl relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-up">
          <h1 className="text-slate-100 mb-4 text-5xl uppercase font-black tracking-widest leading-tight">
            Transaction History
          </h1>
          <p className="text-slate-400 mb-8 text-lg max-w-3xl mx-auto">
            View all certificate-related transactions verified on the Polkadot blockchain
          </p>

          {/* Status Bar */}
          <div className="flex flex-col items-center gap-4">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-slate-900/70 border border-cyan-500/20 rounded-xl text-slate-200 text-sm font-semibold">
              <Globe size={18} className="text-cyan-400" />
              <span>Polkadot Network Transactions</span>
            </div>
            {isPolkadotConnected ? (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#E6007A] to-[#6F36BC] rounded-full text-white text-sm font-semibold shadow-lg">
                <Shield size={16} />
                <span>Polkadot Wallet Connected</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-500 rounded-full text-white text-sm font-semibold">
                <Shield size={16} />
                <span>Connect Polkadot Wallet for Live Data</span>
              </div>
            )}
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400" size={18} />
            <input
              type="text"
              placeholder="Search by certificate name, hash, or transaction ID..."
              className="w-full pl-12 pr-4 py-3 bg-slate-900/70 border border-cyan-500/20 hover:border-cyan-500/40 focus:border-cyan-500 rounded-xl text-slate-100 placeholder-slate-500 transition-all focus:outline-none focus:shadow-lg focus:shadow-cyan-500/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={loadTransactionHistory}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold px-8 py-3 rounded-xl shadow-lg shadow-cyan-500/20 active:scale-95 transition-all"
          >
            Refresh
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {/* Total Certificates */}
          <div className="p-6 bg-gradient-to-br from-slate-900/80 to-slate-950 border-2 border-blue-500/30 rounded-xl shadow-lg shadow-blue-500/10 backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Hash className="text-white" size={24} />
              </div>
              <div>
                <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Total Certificates</p>
                <p className="text-slate-100 font-bold text-3xl">{transactions.length}</p>
              </div>
            </div>
          </div>
          
          {/* Verified */}
          <div className="p-6 bg-gradient-to-br from-slate-900/80 to-slate-950 border-2 border-emerald-500/30 rounded-xl shadow-lg shadow-emerald-500/10 backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <CheckCircle className="text-white" size={24} />
              </div>
              <div>
                <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Verified</p>
                <p className="text-slate-100 font-bold text-3xl">{transactions.filter(t => t.status === 'verified').length}</p>
              </div>
            </div>
          </div>
          
          {/* Pending */}
          <div className="p-6 bg-gradient-to-br from-slate-900/80 to-slate-950 border-2 border-amber-500/30 rounded-xl shadow-lg shadow-amber-500/10 backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center shadow-lg shadow-amber-500/30">
                <Calendar className="text-white" size={24} />
              </div>
              <div>
                <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Pending</p>
                <p className="text-slate-100 font-bold text-3xl">{transactions.filter(t => t.status === 'pending').length}</p>
              </div>
            </div>
          </div>

          {/* Failed */}
          <div className="p-6 bg-gradient-to-br from-slate-900/80 to-slate-950 border-2 border-rose-500/30 rounded-xl shadow-lg shadow-rose-500/10 backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-red-500 rounded-lg flex items-center justify-center shadow-lg shadow-rose-500/30">
                <Globe className="text-white" size={24} />
              </div>
              <div>
                <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Networks</p>
                <p className="text-slate-100 font-bold text-3xl">{new Set(transactions.map(t => t.parachain)).size}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cyan-500"></div>
            <p className="mt-6 text-slate-300 text-lg font-semibold">Loading transaction history...</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border-2 border-cyan-500/30 shadow-2xl shadow-cyan-500/10 bg-gradient-to-br from-slate-900/80 to-slate-950 backdrop-blur-xl">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-950/80 border-b border-cyan-500/20">
                  <tr>
                    <th className="text-left py-4 px-6 text-slate-300 font-semibold text-sm uppercase tracking-wider">Certificate</th>
                    <th className="text-left py-4 px-6 text-slate-300 font-semibold text-sm uppercase tracking-wider">Transaction</th>
                    <th className="text-left py-4 px-6 text-slate-300 font-semibold text-sm uppercase tracking-wider">Block</th>
                    <th className="text-left py-4 px-6 text-slate-300 font-semibold text-sm uppercase tracking-wider">Date & Time</th>
                    <th className="text-left py-4 px-6 text-slate-300 font-semibold text-sm uppercase tracking-wider">Network</th>
                    <th className="text-left py-4 px-6 text-slate-300 font-semibold text-sm uppercase tracking-wider">Status</th>
                    <th className="text-left py-4 px-6 text-slate-300 font-semibold text-sm uppercase tracking-wider">Type</th>
                    <th className="text-left py-4 px-6 text-slate-300 font-semibold text-sm uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((tx) => (
                      <tr key={tx.id} className="border-b border-slate-700/50 hover:bg-slate-900/30 transition-colors">
                        <td className="py-4 px-6">
                          <div className="font-medium text-slate-100 truncate max-w-xs">{tx.certificateName}</div>
                          <div className="text-sm text-slate-400 truncate max-w-xs font-mono">{tx.certificateHash.slice(0, 12)}...{tx.certificateHash.slice(-6)}</div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-slate-100 font-mono text-sm truncate max-w-xs">{tx.transactionHash.slice(0, 12)}...{tx.transactionHash.slice(-6)}</div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-slate-100 font-mono text-sm">#{tx.blockNumber}</div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-slate-100 text-sm">{formatDate(tx.timestamp)}</div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-flex px-3 py-1.5 bg-slate-800/50 text-slate-300 text-xs font-semibold uppercase tracking-wider rounded-lg border border-slate-700/50">
                            {tx.parachain}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-lg border ${
                            tx.status === 'verified' ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' :
                            tx.status === 'pending' ? 'bg-amber-500/10 text-amber-300 border-amber-500/30' :
                            'bg-rose-500/10 text-rose-300 border-rose-500/30'
                          }`}>
                            {tx.status}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="px-3 py-1.5 bg-slate-800/50 text-slate-300 text-xs font-semibold uppercase tracking-wider rounded-lg border border-slate-700/50">
                            {tx.type}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <button className="text-cyan-400 hover:text-cyan-300 transition-colors p-2 hover:bg-cyan-500/10 rounded-lg">
                            <ExternalLink size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="py-16 text-center">
                        <p className="text-slate-400 font-semibold">No transactions found matching your search criteria</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-12 text-center text-slate-400 text-sm">
          <p className="font-semibold">All transactions are permanently recorded on the Polkadot Relay Chain and cannot be altered.</p>
        </div>
      </div>
    </div>
  );
}