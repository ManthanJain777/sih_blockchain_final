import { useState, useEffect } from "react";
import { CertificateUploader } from "../components/CertificateUploader";
import { Alert, AlertDescription } from "../components/ui/alert";
import { CheckCircle, Clock, Shield, Award, ToggleLeft } from "lucide-react";
import { CertificatePolkadotService } from "../services/certificatePolkadotService";
import { MockCertificatePolkadotService } from "../services/certificatePolkadotService.mock";

interface CertificateData {
  fileName: string;
  certificateHash: string;
  certificateType: string;
  issuer: string;
  recipient: string;
  issueDate: string;
  expiryDate?: string;
}

interface CertificateUploadPageProps {
  isPolkadotConnected?: boolean;
}

export function CertificateUploadPage({ isPolkadotConnected = false }: CertificateUploadPageProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [certificateData, setCertificateData] = useState<CertificateData | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [polkadotSuccess, setPolkadotSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isSubmittingToPolkadot, setIsSubmittingToPolkadot] = useState(false);
  const [polkadotTransactionHash, setPolkadotTransactionHash] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCertificateData = (data: CertificateData | null, file: File | null) => {
    if (data && file) {
      setCertificateData(data);
      setFile(file);
      setPolkadotSuccess(false);
    }
  };

  const handleUploadToBlockchain = async () => {
    if (!certificateData || !file) {
      setError("Please ensure all fields are filled.");
      return;
    }

    handleSubmitToPolkadot(certificateData, file);
  };

  const [useMockService, setUseMockService] = useState(false); // Use real blockchain by default

  const handleSubmitToPolkadot = async (certData: CertificateData, certFile: File) => {
    if (!certData || !certFile) {
      setError("Please ensure all fields are filled.");
      return;
    }

    setIsSubmittingToPolkadot(true);
    setError("");

    try {
      let verificationRecord;
      
      if (useMockService) {
        // Use mock service for demo without requiring real blockchain funds
        const mockService = MockCertificatePolkadotService.getInstance();
        verificationRecord = await mockService.uploadCertificateAndVerify(
          certFile,
          certData.certificateType,
          certData.issuer,
          certData.recipient,
          certData.issueDate,
          certData.expiryDate,
          {}
        );
      } else {
        // Use real service for actual blockchain submission
        const polkadotService = CertificatePolkadotService.getInstance();
        verificationRecord = await polkadotService.uploadCertificateAndVerify(
          certFile,
          certData.certificateType,
          certData.issuer,
          certData.recipient,
          certData.issueDate,
          certData.expiryDate,
          {}
        );
      }

      setPolkadotTransactionHash(verificationRecord.transactionHash);
      setPolkadotSuccess(true);
      console.log('✅ Certificate verified on Polkadot:', verificationRecord);
    } catch (err: any) {
      setError(`Certificate submission failed: ${err.message}`);
      console.error('Certificate submission error:', err);
    } finally {
      setIsSubmittingToPolkadot(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Radial Gradients */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-cyan-500/20 to-blue-500/5 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-0 -right-32 w-[500px] h-[500px] bg-gradient-to-tl from-blue-500/10 to-cyan-500/5 rounded-full blur-3xl opacity-50"></div>

      <div className="container mx-auto px-4 py-16 max-w-5xl relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-up">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-cyan-500/30 to-blue-500/20 rounded-3xl mb-8 shadow-2xl shadow-cyan-500/20 border border-cyan-500/20 backdrop-blur-xl">
            <Award className="text-cyan-400" size={48} />
          </div>
          
          <h1 className="text-slate-100 mb-4 text-5xl uppercase font-black tracking-widest leading-tight">
            Certificate<br />Verification
          </h1>
          
          <p className="text-slate-400 mb-8 text-lg max-w-2xl mx-auto leading-relaxed">
            Enterprise-grade security for certificate verification powered by Polkadot blockchain
          </p>

          {/* Status & Time Grid */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            {/* Polkadot Status */}
            {isPolkadotConnected ? (
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500/10 rounded-xl text-emerald-300 text-sm font-semibold border border-emerald-500/30 shadow-lg shadow-emerald-500/10">
                <Shield size={18} />
                <span>Polkadot Connected</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500/10 rounded-xl text-amber-300 text-sm font-semibold border border-amber-500/30 shadow-lg shadow-amber-500/10">
                <Shield size={18} />
                <span>Wallet Pending</span>
              </div>
            )}

            {/* Time Display */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl text-cyan-300 shadow-lg shadow-cyan-500/10 font-semibold border border-cyan-500/20 backdrop-blur-xl">
              <Clock size={18} />
              <span className="font-mono">{formatTime(currentTime)}</span>
            </div>
          </div>
          
          {/* Mode Toggle */}
          <div className="mt-8 flex items-center justify-center">
            <div className="inline-flex items-center space-x-2 bg-slate-900/70 p-1.5 rounded-xl border border-slate-700/50">
              <button
                onClick={() => setUseMockService(true)}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  useMockService 
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/20' 
                    : 'text-slate-400 hover:text-slate-300'
                }`}
              >
                Demo Mode
              </button>
              <button
                onClick={() => setUseMockService(false)}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  !useMockService 
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/20' 
                    : 'text-slate-400 hover:text-slate-300'
                }`}
              >
                Real Blockchain
              </button>
            </div>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6 bg-rose-500/10 border-rose-500/30 text-rose-300">
            <AlertDescription className="font-semibold">{error}</AlertDescription>
          </Alert>
        )}

        {polkadotSuccess && (
          <Alert className="mb-6 bg-emerald-500/10 border-emerald-500/30 text-emerald-300 shadow-lg shadow-emerald-500/10">
            <CheckCircle className="h-5 w-5 text-emerald-400" />
            <AlertDescription className="font-semibold">
              ✓ Certificate verified on Polkadot blockchain successfully!
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-8 max-w-3xl mx-auto">
          <CertificateUploader
            onCertificateData={handleCertificateData}
            onUploadToBlockchain={handleUploadToBlockchain}
            walletConnected={isPolkadotConnected}
          />

          {polkadotSuccess && certificateData && (
            <div className="p-8 bg-gradient-to-br from-slate-900/80 to-slate-950 border-2 border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/10 relative overflow-hidden backdrop-blur-xl">
              <div className="absolute -top-20 -right-20 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl"></div>
              
              <h3 className="text-slate-100 mb-8 font-bold text-2xl uppercase tracking-widest relative z-10">
                Verification Proof
              </h3>
              
              <div className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-slate-950/50 border border-slate-700/50 rounded-xl">
                    <p className="text-slate-400 font-semibold mb-2 text-sm uppercase tracking-wide">
                      Certificate Hash
                    </p>
                    <p className="text-cyan-300 font-mono text-sm break-all bg-slate-950/70 p-3 rounded-lg border border-cyan-500/10">
                      {certificateData.certificateHash}
                    </p>
                  </div>
                  <div className="p-4 bg-slate-950/50 border border-slate-700/50 rounded-xl">
                    <p className="text-slate-400 font-semibold mb-2 text-sm uppercase tracking-wide">
                      Transaction Hash
                    </p>
                    <p className="text-cyan-300 font-mono text-sm break-all bg-slate-950/70 p-3 rounded-lg border border-cyan-500/10">
                      {polkadotTransactionHash}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-slate-950/50 border border-slate-700/50 rounded-xl">
                    <p className="text-slate-400 font-semibold mb-2 text-sm uppercase tracking-wide">
                      Type
                    </p>
                    <p className="text-slate-200 capitalize bg-slate-950/70 p-3 rounded-lg border border-slate-700/30">
                      {certificateData.certificateType}
                    </p>
                  </div>
                  <div className="p-4 bg-slate-950/50 border border-slate-700/50 rounded-xl">
                    <p className="text-slate-400 font-semibold mb-2 text-sm uppercase tracking-wide">
                      Issuer
                    </p>
                    <p className="text-slate-200 bg-slate-950/70 p-3 rounded-lg border border-slate-700/30 truncate">
                      {certificateData.issuer}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-slate-950/50 border border-slate-700/50 rounded-xl">
                    <p className="text-slate-400 font-semibold mb-2 text-sm uppercase tracking-wide">
                      Recipient
                    </p>
                    <p className="text-slate-200 bg-slate-950/70 p-3 rounded-lg border border-slate-700/30 truncate">
                      {certificateData.recipient}
                    </p>
                  </div>
                  <div className="p-4 bg-slate-950/50 border border-slate-700/50 rounded-xl">
                    <p className="text-slate-400 font-semibold mb-2 text-sm uppercase tracking-wide">
                      Issue Date
                    </p>
                    <p className="text-slate-200 bg-slate-950/70 p-3 rounded-lg border border-slate-700/30">
                      {new Date(certificateData.issueDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}