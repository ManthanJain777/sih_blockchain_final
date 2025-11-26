import { useState, useRef } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Upload, ExternalLink, MapPin } from 'lucide-react';

interface FileData {
  fileName: string;
  fileHash: string;
  ipfsCID: string;
  latitude: number;
  longitude: number;
  timestamp: string;
}

interface FileUploaderProps {
  onFileData: (data: FileData | null) => void;
  walletConnected: boolean;
}

export function FileUploader({ onFileData, walletConnected }: FileUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileHash, setFileHash] = useState('');
  const [ipfsCID, setIpfsCID] = useState('');
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateMockHash = (fileName: string): string => {
    // Generate a mock SHA256 hash
    const hash = Array.from({ length: 64 }, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join('');
    return hash;
  };

  const generateMockCID = (): string => {
    // Generate a mock IPFS CID
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const cid = 'Qm' + Array.from({ length: 44 }, () => 
      chars[Math.floor(Math.random() * chars.length)]
    ).join('');
    return cid;
  };

  const getGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        () => {
          // Use mock coordinates if geolocation fails
          setLatitude(37.7749 + (Math.random() - 0.5) * 0.1);
          setLongitude(-122.4194 + (Math.random() - 0.5) * 0.1);
        }
      );
    } else {
      // Use mock coordinates if geolocation not supported
      setLatitude(37.7749 + (Math.random() - 0.5) * 0.1);
      setLongitude(-122.4194 + (Math.random() - 0.5) * 0.1);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const hash = generateMockHash(file.name);
      const cid = generateMockCID();
      setFileHash(hash);
      setIpfsCID(cid);
      getGeolocation();
      
      const timestamp = new Date().toISOString();
      onFileData({
        fileName: file.name,
        fileHash: hash,
        ipfsCID: cid,
        latitude: latitude || 0,
        longitude: longitude || 0,
        timestamp,
      });
    }
  };

  return (
    <Card className="p-8 bg-card border-2 border-border/50 shadow-xl relative overflow-hidden">
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#2DD4BF]/20 rounded-full blur-2xl"></div>
      <h3 className="text-card-foreground mb-6 font-bold text-2xl uppercase tracking-wide relative z-10">File Selection & Hashing</h3>
      
      <div className="space-y-5 relative z-10">
        <div>
          <Label htmlFor="file-input" className="text-card-foreground/60 font-semibold">Choose File</Label>
          <div className="flex gap-3 mt-3">
            <Input
              id="file-input"
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              disabled={!walletConnected}
              className="flex-1 border-2 border-border/50 bg-card-foreground/5 rounded-xl"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={!walletConnected}
              className="bg-secondary hover:bg-secondary/90 text-background px-6 rounded-full font-semibold lowercase shadow-lg shadow-secondary/30"
            >
              <Upload size={18} className="mr-2" />
              select
            </Button>
          </div>
          {!walletConnected && (
            <p className="text-[#EF4444] mt-3 font-semibold">⚠ Please connect your wallet first</p>
          )}
        </div>

        {selectedFile && (
          <>
            <div>
              <Label className="text-card-foreground/60 font-semibold">File Name</Label>
              <Input
                value={selectedFile.name}
                readOnly
                className="bg-card-foreground/5 mt-2 border-2 border-border/50 rounded-xl"
              />
            </div>

            <div>
              <Label className="text-card-foreground/60 font-semibold">SHA256 Hash</Label>
              <Input
                value={fileHash}
                readOnly
                className="bg-card-foreground/5 font-mono mt-2 border-2 border-border/50 rounded-xl"
              />
            </div>

            <div>
              <Label className="text-card-foreground/60 font-semibold">IPFS CID</Label>
              <div className="flex gap-3 mt-2">
                <Input
                  value={ipfsCID}
                  readOnly
                  className="bg-card-foreground/5 font-mono flex-1 border-2 border-border/50 rounded-xl"
                />
                <Button
                  onClick={() => window.open(`https://ipfs.io/ipfs/${ipfsCID}`, '_blank')}
                  title="View on IPFS Gateway"
                  className="bg-primary hover:bg-primary/90 text-white rounded-full px-4 shadow-lg shadow-primary/30"
                >
                  <ExternalLink size={18} />
                </Button>
              </div>
            </div>

            {latitude !== null && longitude !== null && (
              <div className="p-6 bg-gradient-to-br from-[#2DD4BF]/20 to-[#3B82F6]/20 rounded-2xl border-2 border-[#2DD4BF]/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#2DD4BF] to-[#3B82F6] rounded-xl flex items-center justify-center shadow-lg">
                    <MapPin className="text-white" size={20} />
                  </div>
                  <h4 className="text-card-foreground font-bold text-lg">Geo-tagging</h4>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-card-foreground/60 font-semibold">Latitude</Label>
                    <Input
                      value={latitude.toFixed(6)}
                      readOnly
                      className="bg-card mt-2 border-2 border-border/50 rounded-xl"
                    />
                  </div>
                  <div>
                    <Label className="text-card-foreground/60 font-semibold">Longitude</Label>
                    <Input
                      value={longitude.toFixed(6)}
                      readOnly
                      className="bg-card mt-2 border-2 border-border/50 rounded-xl"
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </Card>
  );
}