import { Shield } from 'lucide-react';

// Define the interface for file data
interface FileData {
  fileName: string;
  fileHash: string;
  latitude: number;
  longitude: number;
  timestamp: string;
}

interface MetadataDisplayProps {
  fileData: FileData;
  onSubmitToPolkadot: () => void;
  isPolkadotConnected: boolean;
  isSubmittingToPolkadot: boolean;
}

export function MetadataDisplay({
  fileData,
  onSubmitToPolkadot,
  isPolkadotConnected,
  isSubmittingToPolkadot
}: MetadataDisplayProps) {
  return (
    <div className="p-6 bg-card rounded-2xl shadow-lg border border-border">
      <h3 className="text-card-foreground mb-4 font-bold text-xl">
        File Verification Ready
      </h3>
      
      {/* File Metadata */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-card-foreground/60 text-sm">File Name</p>
          <p className="text-card-foreground font-semibold">{fileData.fileName}</p>
        </div>
        <div>
          <p className="text-card-foreground/60 text-sm">SHA-256 Hash</p>
          <p className="text-card-foreground font-mono text-sm break-all">
            {fileData.fileHash}
          </p>
        </div>
        <div>
          <p className="text-card-foreground/60 text-sm">Timestamp</p>
          <p className="text-card-foreground">
            {new Date(fileData.timestamp).toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-card-foreground/60 text-sm">Location</p>
          <p className="text-card-foreground">
            {fileData.latitude.toFixed(6)}, {fileData.longitude.toFixed(6)}
          </p>
        </div>
      </div>

      {/* POLKADOT ONLY: Submit Button */}
      <button
        onClick={onSubmitToPolkadot}
        disabled={!isPolkadotConnected || isSubmittingToPolkadot}
        className="w-full bg-gradient-to-r from-[#E6007A] to-[#6F36BC] text-white py-3 px-6 rounded-xl font-semibold hover:opacity-90 disabled:opacity-50 transition-all shadow-lg"
      >
        {isSubmittingToPolkadot ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Verifying on Polkadot...
          </>
        ) : (
          <>
            <Shield className="w-4 h-4 mr-2" />
            Verify on Polkadot Blockchain
          </>
        )}
      </button>
    </div>
  );
}