import { useState, useEffect } from "react";
import { FileUploader } from "../components/FileUploader";
import { MetadataDisplay } from "../components/MetadataDisplay";
import { Alert, AlertDescription } from "../components/ui/alert";
import { CheckCircle, Clock, Shield } from "lucide-react";
import { MultiChainPolkadotService } from "../services/multiChainPolkadotService";

interface FileData {
  fileName: string;
  fileHash: string;
  latitude: number;
  longitude: number;
  timestamp: string;
}

interface UploadPageProps {
  isPolkadotConnected?: boolean;
}

export function UploadPage({ isPolkadotConnected = false }: UploadPageProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [fileData, setFileData] = useState<FileData | null>(null);
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

  const handleFileData = (data: FileData | null, file: File | null) => {
    setFileData(data);
    setFile(file);
    setPolkadotSuccess(false);
  };

  // POLKADOT ONLY: Submit to Polkadot Blockchain
  const handleSubmitToPolkadot = async () => {
    if (!fileData || !isPolkadotConnected) {
      setError("Please connect Polkadot wallet first.");
      return;
    }
    
    setIsSubmittingToPolkadot(true);
    setError("");

    try {
      const polkadotService = MultiChainPolkadotService.getInstance();
      const metadata = {
        timestamp: fileData.timestamp,
        location: `${fileData.latitude}, ${fileData.longitude}`,
        fileName: fileData.fileName,
        fileSize: file?.size || 0
      };

      // Use the new enhanced service method
      const verificationRecord = await polkadotService.uploadFileAndVerify(
        file!, // We can safely assert file is not null since we check for fileData first
        `${fileData.latitude}, ${fileData.longitude}`,
        metadata
      );
      
      const txHash = verificationRecord.transactionHash;
      
      setPolkadotTransactionHash(txHash);
      setPolkadotSuccess(true);
      console.log('✅ File verified on Polkadot:', txHash);
    } catch (err: any) {
      setError(`Polkadot submission failed: ${err.message}`);
      console.error('Polkadot submission error:', err);
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
          <h1 className="text-foreground mb-4 text-4xl uppercase font-black tracking-tight">
            Polkadot File Verifier
          </h1>
          <p className="text-muted-foreground mb-6 text-lg">
            Secure file verification on Polkadot blockchain
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
              File verified on Polkadot blockchain successfully!
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-6 max-w-3xl mx-auto">
          {/* Removed WalletConnection - using PolkadotHeader instead */}
          
          <FileUploader
            onFileData={handleFileData}
            walletConnected={isPolkadotConnected} // Use Polkadot connection status
          />

          {fileData && (
            <MetadataDisplay
              fileData={fileData}
              onSubmitToPolkadot={handleSubmitToPolkadot}
              isPolkadotConnected={isPolkadotConnected}
              isSubmittingToPolkadot={isSubmittingToPolkadot}
            />
          )}

          {polkadotSuccess && fileData && (
            <div className="p-8 bg-card border-2 border-[#E6007A] rounded-3xl shadow-2xl shadow-[#E6007A]/20 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#FACC15]/20 rounded-full blur-2xl"></div>
              <h3 className="text-card-foreground mb-6 font-bold text-2xl uppercase tracking-wide relative z-10">
                Polkadot Verification Proof
              </h3>
              <div className="space-y-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-card-foreground/60 font-semibold mb-1">
                      File Hash
                    </p>
                    <p className="text-card-foreground font-mono break-all bg-card-foreground/5 p-3 rounded-xl">
                      {fileData.fileHash}
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
                      Timestamp
                    </p>
                    <p className="text-card-foreground bg-card-foreground/5 p-3 rounded-xl">
                      {new Date(fileData.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-card-foreground/60 font-semibold mb-1">
                      Location
                    </p>
                    <p className="text-card-foreground bg-card-foreground/5 p-3 rounded-xl">
                      {fileData.latitude.toFixed(6)},{" "}
                      {fileData.longitude.toFixed(6)}
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