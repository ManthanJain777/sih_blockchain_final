import { useState, useEffect } from "react";
import { WalletConnection } from "../components/WalletConnection";
import { FileUploader } from "../components/FileUploader";
import { MetadataDisplay } from "../components/MetadataDisplay";
import {
  Alert,
  AlertDescription,
} from "../components/ui/alert";
import { CheckCircle, Clock } from "lucide-react";
import { ethers } from "ethers";
import axios from "axios";
import MediaVerificationABI from "../MediaVerification.json";

interface FileData {
  fileName: string;
  fileHash: string;
  ipfsCID: string;
  latitude: number;
  longitude: number;
  timestamp: string;
}

export function UploadPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [fileData, setFileData] = useState<FileData | null>(
    null,
  );
  const [file, setFile] = useState<File | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [blockchainSuccess, setBlockchainSuccess] =
    useState(false);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleConnectionChange = async (
    connected: boolean,
    address: string,
  ) => {
    setWalletConnected(connected);
    setWalletAddress(address);
    if (connected && window.ethereum) {
      try {
        const newProvider = new ethers.BrowserProvider(window.ethereum);
        setProvider(newProvider);
        const newSigner = await newProvider.getSigner();
        setSigner(newSigner);
        const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
        if (!contractAddress) {
          throw new Error("Contract address not found. Check your .env file.");
        }
        const mediaVerificationContract = new ethers.Contract(contractAddress, MediaVerificationABI, newSigner);
        setContract(mediaVerificationContract);
      } catch (err) {
        setError("Failed to connect to wallet.");
      }
    } else {
      setFileData(null);
      setUploadSuccess(false);
      setBlockchainSuccess(false);
    }
  };

  const handleFileData = (data: FileData | null, file: File | null) => {
    setFileData(data);
    setFile(file);
    setUploadSuccess(false);
    setBlockchainSuccess(false);
  };

  const handleUploadToIPFS = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }
    setIsUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
            pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_API_KEY,
          },
        }
      );
      if (fileData) {
        setFileData({ ...fileData, ipfsCID: res.data.IpfsHash });
      }
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 5000);
    } catch (err) {
      setError("Failed to upload to IPFS.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmitToBlockchain = async () => {
    if (!contract || !fileData) {
      setError("Missing data. Please ensure all fields are ready.");
      return;
    }
    setIsSubmitting(true);
    setError("");

    try {
      const transaction = await contract.addMedia(
        fileData.fileHash,
        Math.floor(new Date(fileData.timestamp).getTime() / 1000),
        Math.round(fileData.latitude * 1e6),
        Math.round(fileData.longitude * 1e6),
        fileData.ipfsCID
      );
      await transaction.wait();
      setTransactionHash(transaction.hash);
      setBlockchainSuccess(true);
    } catch (err) {
      setError("Transaction failed. Check the console for details.");
    } finally {
      setIsSubmitting(false);
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
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-foreground mb-3">
            File Hasher & IPFS Uploader
          </h1>
          <p className="text-muted-foreground mb-4">
            Select a file to calculate its SHA256 hash, get
            time/geo-tag, and upload to IPFS.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full text-secondary">
            <Clock size={18} />
            <span>Time: {formatTime(currentTime)}</span>
          </div>
        </div>

        {uploadSuccess && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              File uploaded to IPFS successfully!
            </AlertDescription>
          </Alert>
        )}

        {blockchainSuccess && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Transaction submitted successfully to blockchain!
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-6 max-w-3xl mx-auto">
          <WalletConnection
            onConnectionChange={handleConnectionChange}
          />

          <FileUploader
            onFileData={handleFileData}
            walletConnected={walletConnected}
          />

          {fileData && (
            <MetadataDisplay
              fileData={fileData}
              onUploadToIPFS={handleUploadToIPFS}
              onSubmitToBlockchain={handleSubmitToBlockchain}
              walletConnected={walletConnected}
            />
          )}

          {blockchainSuccess && fileData && (
            <div className="p-6 bg-gradient-to-br from-secondary/10 to-primary/10 border border-border rounded-lg">
              <h3 className="text-foreground mb-4">
                Transaction Details
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-muted-foreground">
                    File Hash
                  </p>
                  <p className="text-foreground font-mono break-all">
                    {fileData.fileHash}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">
                    IPFS CID
                  </p>
                  <p className="text-foreground font-mono break-all">
                    {fileData.ipfsCID}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">
                    Timestamp
                  </p>
                  <p className="text-foreground">
                    {new Date(
                      fileData.timestamp,
                    ).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">
                    Location
                  </p>
                  <p className="text-foreground">
                    {fileData.latitude.toFixed(6)},{" "}
                    {fileData.longitude.toFixed(6)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}