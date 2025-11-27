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
    <div className="min-h-[calc(100vh-4rem)] bg-background relative overflow-hidden">
      {/* Background shapes */}
      <div className="absolute -top-40 -left-40 w-[550px] h-[550px] bg-[#8B5CF6] rounded-[40%_60%_70%_30%/60%_30%_70%_40%] opacity-90"></div>
      <div className="absolute top-[5%] -right-32 w-[500px] h-[500px] bg-[#2DD4BF] rounded-[60%_40%_30%_70%/40%_60%_70%_30%] opacity-90"></div>

      <div className="container mx-auto px-4 py-12 max-w-4xl relative z-10">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-[#8B5CF6] to-[#2DD4BF] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-[#8B5CF6]/30">
            <Award className="text-white" size={40} />
          </div>
          <h1 className="text-foreground mb-4 text-4xl uppercase font-black tracking-tight">
            Certificate Verification
          </h1>
          <p className="text-muted-foreground mb-6 text-lg">
            Secure certificate verification on Polkadot blockchain
          </p>

          {/* Polkadot Status */}
          {isPolkadotConnected ? (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#E6007A] to-[#6F36BC] rounded-full text-white text-sm font-semibold mb-4 shadow-lg">
              <Shield size={16} />
              <span>Polkadot Connected</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-500 rounded-full text-white text-sm font-semibold mb-4">
              <Shield size={16} />
              <span>Connect Polkadot Wallet to Start</span>
            </div>
          )}

          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#E6007A] to-[#6F36BC] rounded-full text-white shadow-lg font-semibold">
            <Clock size={20} />
            <span>{formatTime(currentTime)}</span>
          </div>
          
          <div className="mt-4 flex items-center justify-center">
            <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-full">
              <button
                onClick={() => setUseMockService(true)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  useMockService 
                    ? 'bg-[#E6007A] text-white shadow-md' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Demo Mode
              </button>
              <button
                onClick={() => setUseMockService(false)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  !useMockService 
                    ? 'bg-[#E6007A] text-white shadow-md' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Real Blockchain
              </button>
            </div>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {polkadotSuccess && (
          <Alert className="mb-6 bg-gradient-to-r from-[#E6007A]/20 to-[#6F36BC]/20 border-2 border-[#E6007A] shadow-lg">
            <CheckCircle className="h-5 w-5 text-[#E6007A]" />
            <AlertDescription className="text-foreground font-semibold">
              Certificate verified on Polkadot blockchain successfully!
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-6 max-w-3xl mx-auto">
          <CertificateUploader
            onCertificateData={handleCertificateData}
            onUploadToBlockchain={handleUploadToBlockchain}
            walletConnected={isPolkadotConnected}
          />

          {polkadotSuccess && certificateData && (
            <div className="p-8 bg-card border-2 border-[#E6007A] rounded-3xl shadow-2xl shadow-[#E6007A]/20 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#FACC15]/20 rounded-full blur-2xl"></div>
              <h3 className="text-card-foreground mb-6 font-bold text-2xl uppercase tracking-wide relative z-10">
                Certificate Verification Proof
              </h3>
              <div className="space-y-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-card-foreground/60 font-semibold mb-1">
                      Certificate Hash
                    </p>
                    <p className="text-card-foreground font-mono break-all bg-card-foreground/5 p-3 rounded-xl">
                      {certificateData.certificateHash}
                    </p>
                  </div>
                  <div>
                    <p className="text-card-foreground/60 font-semibold mb-1">
                      Polkadot Transaction
                    </p>
                    <p className="text-card-foreground font-mono break-all bg-card-foreground/5 p-3 rounded-xl">
                      {polkadotTransactionHash}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-card-foreground/60 font-semibold mb-1">
                      Certificate Type
                    </p>
                    <p className="text-card-foreground bg-card-foreground/5 p-3 rounded-xl capitalize">
                      {certificateData.certificateType}
                    </p>
                  </div>
                  <div>
                    <p className="text-card-foreground/60 font-semibold mb-1">
                      Issuer
                    </p>
                    <p className="text-card-foreground bg-card-foreground/5 p-3 rounded-xl">
                      {certificateData.issuer}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-card-foreground/60 font-semibold mb-1">
                      Recipient
                    </p>
                    <p className="text-card-foreground bg-card-foreground/5 p-3 rounded-xl">
                      {certificateData.recipient}
                    </p>
                  </div>
                  <div>
                    <p className="text-card-foreground/60 font-semibold mb-1">
                      Issue Date
                    </p>
                    <p className="text-card-foreground bg-card-foreground/5 p-3 rounded-xl">
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