import { Card } from './ui/card';
import { Button } from './ui/button';
import { Upload, Send } from 'lucide-react';

interface FileData {
  fileName: string;
  fileHash: string;
  ipfsCID: string;
  latitude: number;
  longitude: number;
  timestamp: string;
}

interface MetadataDisplayProps {
  fileData: FileData | null;
  onUploadToIPFS: () => void;
  onSubmitToBlockchain: () => void;
  walletConnected: boolean;
}

export function MetadataDisplay({ 
  fileData, 
  onUploadToIPFS, 
  onSubmitToBlockchain,
  walletConnected 
}: MetadataDisplayProps) {
  if (!fileData) return null;

  const metadata = {
    fileHash: fileData.fileHash,
    ipfsCID: fileData.ipfsCID,
    timestamp: fileData.timestamp,
    latitude: fileData.latitude.toFixed(6),
    longitude: fileData.longitude.toFixed(6),
    fileName: fileData.fileName,
  };

  const metadataJSON = JSON.stringify(metadata, null, 2);

  return (
    <Card className="p-8 bg-card border-2 border-border/50 shadow-xl relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#FB923C]/20 rounded-full blur-2xl"></div>
      <h3 className="text-card-foreground mb-6 font-bold text-2xl uppercase tracking-wide relative z-10">Data Aggregation Preview</h3>
      
      <div className="mb-8 relative z-10">
        <pre className="bg-[#0F0F1A] text-[#2DD4BF] p-6 rounded-2xl overflow-x-auto border-2 border-[#2DD4BF]/30 shadow-lg shadow-[#2DD4BF]/10">
          <code className="text-sm">{metadataJSON}</code>
        </pre>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 relative z-10">
        <Button
          onClick={onUploadToIPFS}
          disabled={!walletConnected}
          className="flex-1 bg-secondary hover:bg-secondary/90 text-background py-6 rounded-full font-semibold lowercase shadow-lg shadow-secondary/30 text-lg"
        >
          <Upload size={20} className="mr-2" />
          upload to ipfs
        </Button>
        
        <Button
          onClick={onSubmitToBlockchain}
          disabled={!walletConnected}
          className="flex-1 bg-primary hover:bg-primary/90 text-white py-6 rounded-full font-semibold lowercase shadow-lg shadow-primary/30 text-lg"
        >
          <Send size={20} className="mr-2" />
          submit to blockchain
        </Button>
      </div>
    </Card>
  );
}