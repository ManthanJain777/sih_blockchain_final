import { useState, useRef } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Upload, MapPin } from 'lucide-react';

interface FileData {
  fileName: string;
  fileHash: string;
  latitude: number;
  longitude: number;
  timestamp: string;
}

interface FileUploaderProps {
  onFileData: (data: FileData | null, file: File | null) => void;
  walletConnected: boolean;
}

export function FileUploader({ onFileData, walletConnected }: FileUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileHash, setFileHash] = useState('');
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const calculateHash = async (file: File): Promise<string> => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  };

  const getGeolocationAsync = (): Promise<{ latitude: number; longitude: number }> => {
    return new Promise((resolve) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({ latitude: position.coords.latitude, longitude: position.coords.longitude });
          },
          () => {
            // Use mock coordinates if geolocation fails
            resolve({ latitude: 37.7749 + (Math.random() - 0.5) * 0.1, longitude: -122.4194 + (Math.random() - 0.5) * 0.1 });
          }
        );
      } else {
        // Use mock coordinates if geolocation not supported
        resolve({ latitude: 37.7749 + (Math.random() - 0.5) * 0.1, longitude: -122.4194 + (Math.random() - 0.5) * 0.1 });
      }
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const hash = await calculateHash(file);
      setFileHash(hash);

      const geo = await getGeolocationAsync(); // Await geolocation
      setLatitude(geo.latitude);
      setLongitude(geo.longitude);

      const timestamp = new Date().toISOString();
      onFileData({
        fileName: file.name,
        fileHash: hash,
        latitude: geo.latitude, // Use awaited geolocation
        longitude: geo.longitude, // Use awaited geolocation
        timestamp,
      }, file);
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