import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { CheckCircle, Search, MapPin, Clock, FileText, Hash, AlertTriangle } from 'lucide-react';
import { MultiChainPolkadotService } from '../services/multiChainPolkadotService';

interface VerificationResult {
  fileHash: string;
  timestamp: string;
  fileName: string;
  location: string;
  status: string;
  blockNumber: string | number;
}

export function VerificationModule() {
  const [hashInput, setHashInput] = useState('');
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');

  const handleVerify = async () => {
    if (!hashInput.trim()) {
      setError('Please enter a file hash to verify');
      return;
    }

    setIsVerifying(true);
    setError('');
    setVerificationResult(null);

    try {
      const polkadotService = MultiChainPolkadotService.getInstance();
      if (!polkadotService.isConnected()) {
        await polkadotService.connectWallet();
      }

      const result = await polkadotService.verifyFileOnBlockchain(hashInput);
      if (result) {
        setVerificationResult(result);
      } else {
        setError('No record found for this hash on the Polkadot blockchain.');
      }
    } catch (err: any) {
      setError(`Verification failed: ${err.message}`);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <Card className="p-8 bg-card border-2 border-border/50 shadow-xl relative overflow-hidden">
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#3B82F6]/20 rounded-full blur-2xl"></div>
      <h3 className="text-card-foreground mb-6 font-bold text-2xl uppercase tracking-wide relative z-10">Verify Media</h3>

      <div className="space-y-6 relative z-10">
        <div>
          <Label htmlFor="hash-input" className="text-card-foreground/60 font-semibold">File Hash</Label>
          <div className="flex gap-3 mt-3">
            <Input
              id="hash-input"
              value={hashInput}
              onChange={(e) => setHashInput(e.target.value)}
              placeholder="Enter file hash here"
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
            <div className="flex items-center gap-3 p-5 bg-gradient-to-r from-[#2DD4BF]/20 to-[#3B82F6]/20 border-2 border-[#2DD4BF] rounded-2xl shadow-lg">
              <CheckCircle className="text-[#2DD4BF]" size={28} />
              <span className="text-card-foreground font-bold text-lg">Verification Successful!</span>
            </div>

            <div className="grid gap-4">
              <div className="p-5 bg-card-foreground/5 rounded-2xl border-2 border-border/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#8B5CF6] to-[#FB923C] rounded-xl flex items-center justify-center">
                    <Hash className="text-white" size={18} />
                  </div>
                  <Label className="text-card-foreground/60 font-semibold">File Hash</Label>
                </div>
                <p className="text-card-foreground font-mono break-all ml-13">{verificationResult.fileHash}</p>
              </div>

              <div className="p-5 bg-card-foreground/5 rounded-2xl border-2 border-border/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#2DD4BF] to-[#3B82F6] rounded-xl flex items-center justify-center">
                    <Clock className="text-white" size={18} />
                  </div>
                  <Label className="text-card-foreground/60 font-semibold">Timestamp</Label>
                </div>
                <p className="text-card-foreground ml-13">{new Date(parseInt(verificationResult.timestamp)).toLocaleString()}</p>
              </div>

              <div className="p-5 bg-card-foreground/5 rounded-2xl border-2 border-border/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#FB923C] to-[#FACC15] rounded-xl flex items-center justify-center">
                    <MapPin className="text-white" size={18} />
                  </div>
                  <Label className="text-card-foreground/60 font-semibold">Geolocation</Label>
                </div>
                <p className="text-card-foreground ml-13">{verificationResult.location}</p>
              </div>

              <div className="p-5 bg-card-foreground/5 rounded-2xl border-2 border-border/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] rounded-xl flex items-center justify-center">
                    <FileText className="text-white" size={18} />
                  </div>
                  <Label className="text-card-foreground/60 font-semibold">File Name</Label>
                </div>
                <p className="text-card-foreground font-mono break-all ml-13">{verificationResult.fileName}</p>
              </div>

              <div className="p-5 bg-card-foreground/5 rounded-2xl border-2 border-border/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#8B5CF6] to-[#2DD4BF] rounded-xl flex items-center justify-center">
                    <Hash className="text-white" size={18} />
                  </div>
                  <Label className="text-card-foreground/60 font-semibold">Block Number</Label>
                </div>
                <p className="text-card-foreground font-mono break-all ml-13">{verificationResult.blockNumber}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}