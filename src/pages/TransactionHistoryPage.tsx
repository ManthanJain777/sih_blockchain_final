import { useState, useEffect } from 'react';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Search, ExternalLink, Calendar, Hash, Globe, CheckCircle } from 'lucide-react';
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

export function TransactionHistoryPage() {
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
    <div className="min-h-[calc(100vh-4rem)] bg-background relative overflow-hidden">
      {/* Background shapes */}
      <div className="absolute -top-40 -left-40 w-[550px] h-[550px] bg-[#8B5CF6] rounded-[40%_60%_70%_30%/60%_30%_70%_40%] opacity-90"></div>
      <div className="absolute top-[5%] -right-32 w-[500px] h-[500px] bg-[#2DD4BF] rounded-[60%_40%_30%_70%/40%_60%_70%_30%] opacity-90"></div>

      <div className="container mx-auto px-4 py-12 max-w-6xl relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-foreground mb-4 text-4xl uppercase font-black tracking-tight">
            Blockchain Transaction History
          </h1>
          <p className="text-muted-foreground mb-6 text-lg">
            View all certificate-related transactions on the Polkadot blockchain
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="text"
              placeholder="Search by certificate name, hash, or transaction ID..."
              className="w-full pl-10 p-3 bg-card border-2 border-border/50 rounded-xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button 
            onClick={loadTransactionHistory}
            className="bg-gradient-to-r from-[#E6007A] to-[#6F36BC] hover:from-[#E6007A]/90 hover:to-[#6F36BC]/90 text-white font-semibold px-6 rounded-xl shadow-lg"
          >
            Refresh Transactions
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-[#8B5CF6]/20 to-[#2DD4BF]/20 border-2 border-[#8B5CF6]/50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#8B5CF6] to-[#2DD4BF] rounded-xl flex items-center justify-center">
                <Hash className="text-white" size={24} />
              </div>
              <div>
                <p className="text-card-foreground/70 text-sm">Total Certificates</p>
                <p className="text-card-foreground font-bold text-2xl">{transactions.length}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 bg-gradient-to-br from-[#2DD4BF]/20 to-[#3B82F6]/20 border-2 border-[#2DD4BF]/50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#2DD4BF] to-[#3B82F6] rounded-xl flex items-center justify-center">
                <CheckCircle className="text-white" size={24} />
              </div>
              <div>
                <p className="text-card-foreground/70 text-sm">Verified</p>
                <p className="text-card-foreground font-bold text-2xl">{transactions.filter(t => t.status === 'verified').length}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 bg-gradient-to-br from-[#F59E0B]/20 to-[#EF4444]/20 border-2 border-[#F59E0B]/50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#F59E0B] to-[#EF4444] rounded-xl flex items-center justify-center">
                <Calendar className="text-white" size={24} />
              </div>
              <div>
                <p className="text-card-foreground/70 text-sm">Last 30 Days</p>
                <p className="text-card-foreground font-bold text-2xl">
                  {transactions.filter(t => {
                    const thirtyDaysAgo = new Date();
                    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                    return new Date(t.timestamp) > thirtyDaysAgo;
                  }).length}
                </p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 bg-gradient-to-br from-[#6394F8]/20 to-[#2669DD]/20 border-2 border-[#6394F8]/50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#6394F8] to-[#2669DD] rounded-xl flex items-center justify-center">
                <Globe className="text-white" size={24} />
              </div>
              <div>
                <p className="text-card-foreground/70 text-sm">Networks Used</p>
                <p className="text-card-foreground font-bold text-2xl">{new Set(transactions.map(t => t.parachain)).size}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Transactions Table */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E6007A]"></div>
            <p className="mt-4 text-card-foreground">Loading transaction history...</p>
          </div>
        ) : (
          <Card className="p-6 bg-card border-2 border-border/50 shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left py-4 px-2 text-card-foreground/70 font-semibold">Certificate</th>
                    <th className="text-left py-4 px-2 text-card-foreground/70 font-semibold">Transaction</th>
                    <th className="text-left py-4 px-2 text-card-foreground/70 font-semibold">Block</th>
                    <th className="text-left py-4 px-2 text-card-foreground/70 font-semibold">Date & Time</th>
                    <th className="text-left py-4 px-2 text-card-foreground/70 font-semibold">Network</th>
                    <th className="text-left py-4 px-2 text-card-foreground/70 font-semibold">Status</th>
                    <th className="text-left py-4 px-2 text-card-foreground/70 font-semibold">Type</th>
                    <th className="text-left py-4 px-2 text-card-foreground/70 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((tx) => (
                      <tr key={tx.id} className="border-b border-border/20 hover:bg-accent/30 transition-colors">
                        <td className="py-4 px-2">
                          <div className="font-medium text-card-foreground truncate max-w-xs">{tx.certificateName}</div>
                          <div className="text-sm text-card-foreground/60 truncate max-w-xs font-mono">{tx.certificateHash.slice(0, 12)}...{tx.certificateHash.slice(-6)}</div>
                        </td>
                        <td className="py-4 px-2">
                          <div className="text-card-foreground font-mono text-sm truncate max-w-xs">{tx.transactionHash.slice(0, 12)}...{tx.transactionHash.slice(-6)}</div>
                        </td>
                        <td className="py-4 px-2">
                          <div className="text-card-foreground font-mono text-sm">#{tx.blockNumber}</div>
                        </td>
                        <td className="py-4 px-2">
                          <div className="text-card-foreground text-sm">{formatDate(tx.timestamp)}</div>
                        </td>
                        <td className="py-4 px-2">
                          <Badge variant="secondary" className="capitalize bg-card-foreground/10">
                            {tx.parachain}
                          </Badge>
                        </td>
                        <td className="py-4 px-2">
                          <Badge variant={getStatusVariant(tx.status) as any} className="capitalize">
                            {tx.status}
                          </Badge>
                        </td>
                        <td className="py-4 px-2">
                          <Badge variant="outline" className="capitalize border-[#2DD4BF]/50 text-[#2DD4BF]">
                            {tx.type}
                          </Badge>
                        </td>
                        <td className="py-4 px-2">
                          <Button variant="ghost" size="sm" className="p-0 h-auto text-[#E6007A] hover:text-[#E6007A]/80">
                            <ExternalLink size={16} />
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-card-foreground">
                        <p>No transactions found matching your search criteria</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        <div className="mt-8 text-center text-card-foreground/60 text-sm">
          <p>All transactions are permanently recorded on the Polkadot blockchain and cannot be altered.</p>
        </div>
      </div>
    </div>
  );
}