import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { 
  CheckCircle, 
  Search, 
  User, 
  Building, 
  Calendar, 
  FileText, 
  Hash, 
  AlertTriangle,
  Globe,
  Layers,
  Award
} from 'lucide-react';
import { CertificatePolkadotService } from '../services/certificatePolkadotService';

interface CertificateVerificationRecord {
  certificateHash: string;
  certificateName: string;
  certificateType: string;
  issuer: string;
  recipient: string;
  issueDate: string;
  expiryDate?: string;
  status: string;
  blockNumber: string | number;
  transactionHash: string;
  parachain: string;
  metadata: Record<string, any>;
}

export function CertificateVerificationModule() {
  const [hashInput, setHashInput] = useState('');
  const [verificationResult, setVerificationResult] = useState<CertificateVerificationRecord | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');

  const handleVerify = async () => {
    if (!hashInput.trim()) {
      setError('Please enter a certificate hash to verify');
      return;
    }

    setIsVerifying(true);
    setError('');
    setVerificationResult(null);

    try {
      const polkadotService = CertificatePolkadotService.getInstance();
      if (!polkadotService.isConnected()) {
        await polkadotService.connectWallet();
      }

      const result = await polkadotService.verifyCertificateOnBlockchain(hashInput);
      if (result) {
        setVerificationResult(result);
      } else {
        setError('No certificate record found for this hash on the Polkadot blockchain.');
      }
    } catch (err: any) {
      setError(`Certificate verification failed: ${err.message}`);
    } finally {
      setIsVerifying(false);
    }
  };

  // Check if certificate is expired
  const isCertificateExpired = (expiryDate?: string): boolean => {
    if (!expiryDate) return false;
    return new Date() > new Date(expiryDate);
  };

  return (
    <Card className="p-8 bg-card border-2 border-border/50 shadow-xl relative overflow-hidden">
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#3B82F6]/20 rounded-full blur-2xl"></div>
      <h3 className="text-card-foreground mb-6 font-bold text-2xl uppercase tracking-wide relative z-10">Verify Certificate on Polkadot</h3>

      <div className="space-y-6 relative z-10">
        <div className="p-4 bg-blue-500/10 border-2 border-blue-500/30 rounded-xl mb-6">
          <p className="text-sm text-card-foreground/80">
            <strong>📌 Note:</strong> All certificates are stored directly on the Polkadot blockchain. 
            Verification queries the blockchain for certificate records. Recent transactions (last ~100 blocks) 
            can be verified via RPC. For older certificates, use the transaction hash with a blockchain explorer.
          </p>
        </div>
        <div>
          <Label htmlFor="hash-input" className="text-card-foreground/60 font-semibold">Certificate Hash</Label>
          <div className="flex gap-3 mt-3">
            <Input
              id="hash-input"
              value={hashInput}
              onChange={(e) => setHashInput(e.target.value)}
              placeholder="Enter certificate hash here"
              className="flex-1 font-mono border-2 border-border/50 bg-card-foreground/5 rounded-xl"
            />
            <Button
              onClick={handleVerify}
              disabled={isVerifying}
              className="bg-primary hover:bg-primary/90 text-white px-8 rounded-full font-semibold lowercase shadow-lg shadow-primary/30"
            >
              <Search size={18} className="mr-2" />
              {isVerifying ? 'verifying...' : 'verify'}
            </Button>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-3 p-5 bg-red-500/10 border-2 border-red-500/50 rounded-2xl">
            <AlertTriangle className="text-red-500" size={28} />
            <span className="text-red-500 font-bold text-lg">{error}</span>
          </div>
        )}

        {verificationResult && (
          <div className="mt-8 space-y-5">
            <div className={`flex items-center gap-3 p-5 rounded-2xl shadow-lg ${
              isCertificateExpired(verificationResult.expiryDate) 
                ? 'bg-gradient-to-r from-red-500/20 to-red-700/20 border-2 border-red-500' 
                : 'bg-gradient-to-r from-[#2DD4BF]/20 to-[#3B82F6]/20 border-2 border-[#2DD4BF]'
            }`}>
              <CheckCircle 
                className={isCertificateExpired(verificationResult.expiryDate) ? "text-red-500" : "text-[#2DD4BF]"} 
                size={28} 
              />
              <span className="text-card-foreground font-bold text-lg">
                {isCertificateExpired(verificationResult.expiryDate) ? 'Certificate Expired' : `Certificate Verified on ${verificationResult.parachain}!`}
              </span>
            </div>

            {isCertificateExpired(verificationResult.expiryDate) && (
              <div className="p-4 bg-red-500/10 border-2 border-red-500/50 rounded-xl">
                <p className="text-red-500 font-semibold">⚠ This certificate has expired and is no longer valid.</p>
              </div>
            )}

            <div className="grid gap-4">
              {/* Certificate Name */}
              <div className="p-5 bg-card-foreground/5 rounded-2xl border-2 border-border/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#8B5CF6] to-[#FB923C] rounded-xl flex items-center justify-center">
                    <FileText className="text-white" size={18} />
                  </div>
                  <Label className="text-card-foreground/60 font-semibold">Certificate Name</Label>
                </div>
                <p className="text-card-foreground font-mono break-all ml-13">{verificationResult.certificateName}</p>
              </div>

              {/* Certificate Type */}
              <div className="p-5 bg-card-foreground/5 rounded-2xl border-2 border-border/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#2DD4BF] to-[#3B82F6] rounded-xl flex items-center justify-center">
                    <Award className="text-white" size={18} />
                  </div>
                  <Label className="text-card-foreground/60 font-semibold">Certificate Type</Label>
                </div>
                <p className="text-card-foreground ml-13 capitalize">{verificationResult.certificateType}</p>
              </div>

              {/* Issuer */}
              <div className="p-5 bg-card-foreground/5 rounded-2xl border-2 border-border/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#FB923C] to-[#FACC15] rounded-xl flex items-center justify-center">
                    <Building className="text-white" size={18} />
                  </div>
                  <Label className="text-card-foreground/60 font-semibold">Issuing Organization</Label>
                </div>
                <p className="text-card-foreground ml-13">{verificationResult.issuer}</p>
              </div>

              {/* Recipient */}
              <div className="p-5 bg-card-foreground/5 rounded-2xl border-2 border-border/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] rounded-xl flex items-center justify-center">
                    <User className="text-white" size={18} />
                  </div>
                  <Label className="text-card-foreground/60 font-semibold">Recipient</Label>
                </div>
                <p className="text-card-foreground ml-13">{verificationResult.recipient}</p>
              </div>

              {/* Issue Date */}
              <div className="p-5 bg-card-foreground/5 rounded-2xl border-2 border-border/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#8B5CF6] to-[#2DD4BF] rounded-xl flex items-center justify-center">
                    <Calendar className="text-white" size={18} />
                  </div>
                  <Label className="text-card-foreground/60 font-semibold">Issue Date</Label>
                </div>
                <p className="text-card-foreground ml-13">{new Date(verificationResult.issueDate).toLocaleDateString()}</p>
              </div>

              {/* Expiry Date */}
              {verificationResult.expiryDate && (
                <div className="p-5 bg-card-foreground/5 rounded-2xl border-2 border-border/50">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#F59E0B] to-[#EF4444] rounded-xl flex items-center justify-center">
                      <Calendar className="text-white" size={18} />
                    </div>
                    <Label className="text-card-foreground/60 font-semibold">Expiry Date</Label>
                  </div>
                  <p className={`ml-13 ${isCertificateExpired(verificationResult.expiryDate) ? 'text-red-500 font-bold' : 'text-card-foreground'}`}>
                    {new Date(verificationResult.expiryDate).toLocaleDateString()}
                    {isCertificateExpired(verificationResult.expiryDate) && ' (Expired)'}
                  </p>
                </div>
              )}

              {/* Certificate Hash */}
              <div className="p-5 bg-card-foreground/5 rounded-2xl border-2 border-border/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#6394F8] to-[#2669DD] rounded-xl flex items-center justify-center">
                    <Hash className="text-white" size={18} />
                  </div>
                  <Label className="text-card-foreground/60 font-semibold">Certificate Hash</Label>
                </div>
                <p className="text-card-foreground font-mono break-all ml-13">{verificationResult.certificateHash}</p>
              </div>

              {/* Blockchain Network */}
              <div className="p-5 bg-card-foreground/5 rounded-2xl border-2 border-border/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#6394F8] to-[#2669DD] rounded-xl flex items-center justify-center">
                    <Globe className="text-white" size={18} />
                  </div>
                  <Label className="text-card-foreground/60 font-semibold">Blockchain Network</Label>
                </div>
                <p className="text-card-foreground font-mono break-all ml-13 capitalize">{verificationResult.parachain}</p>
              </div>

              {/* Block Number */}
              <div className="p-5 bg-card-foreground/5 rounded-2xl border-2 border-border/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#8B5CF6] to-[#2DD4BF] rounded-xl flex items-center justify-center">
                    <Layers className="text-white" size={18} />
                  </div>
                  <Label className="text-card-foreground/60 font-semibold">Block Number</Label>
                </div>
                <p className="text-card-foreground font-mono break-all ml-13">{verificationResult.blockNumber}</p>
              </div>

              {/* Transaction Hash */}
              <div className="p-5 bg-card-foreground/5 rounded-2xl border-2 border-border/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#F59E0B] to-[#EF4444] rounded-xl flex items-center justify-center">
                    <Hash className="text-white" size={18} />
                  </div>
                  <Label className="text-card-foreground/60 font-semibold">Transaction Hash</Label>
                </div>
                <p className="text-card-foreground font-mono break-all ml-13">{verificationResult.transactionHash}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}