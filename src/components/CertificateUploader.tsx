import { useState, useRef } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Upload, Award, Calendar, User, Building } from 'lucide-react';
import { CertificatePolkadotService } from '../services/certificatePolkadotService';

interface CertificateData {
  fileName: string;
  certificateHash: string;
  certificateType: string;
  issuer: string;
  recipient: string;
  issueDate: string;
  expiryDate?: string;
}

interface CertificateUploaderProps {
  onCertificateData: (data: CertificateData | null, file: File | null) => void;
  onUploadToBlockchain: (data: CertificateData, file: File) => Promise<void>; // New prop for blockchain upload
  walletConnected: boolean;
}

export function CertificateUploader({ onCertificateData, onUploadToBlockchain, walletConnected = true }: CertificateUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [certificateHash, setCertificateHash] = useState('');
  const [certificateType, setCertificateType] = useState('Academic Degree');
  const [issuer, setIssuer] = useState('Default University');
  const [recipient, setRecipient] = useState('Student Name');
  const [issueDate, setIssueDate] = useState(new Date().toISOString().split('T')[0]);
  const [expiryDate, setExpiryDate] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const certificateTypes = [
    'Academic Degree',
    'Professional Certificate',
    'License',
    'Certification',
    'Diploma',
    'Other'
  ];

  const calculateHash = async (file: File): Promise<string> => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const hash = await calculateHash(file);
      setCertificateHash(hash);

      const certificateData: CertificateData = {
        fileName: file.name,
        certificateHash: hash,
        certificateType,
        issuer,
        recipient,
        issueDate,
        expiryDate: expiryDate || undefined
      };

      onCertificateData(certificateData, file);
    }
  };

  const handleUploadToBlockchain = async () => {
    if (!selectedFile) {
      alert('Please select a certificate file first');
      return;
    }

    if (!certificateType || !issuer || !recipient) {
      alert('Please fill in all required fields');
      return;
    }

    const certificateData: CertificateData = {
      fileName: selectedFile.name,
      certificateHash,
      certificateType,
      issuer,
      recipient,
      issueDate,
      expiryDate: expiryDate || undefined
    };

    // Pass data to parent component for blockchain upload
    onCertificateData(certificateData, selectedFile);
    
    // Trigger the blockchain upload directly
    try {
      await onUploadToBlockchain(certificateData, selectedFile);
    } catch (error) {
      console.error('Blockchain upload error:', error);
    }
  };

  return (
    <Card className="p-8 bg-card border-2 border-border/50 shadow-xl relative overflow-hidden">
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#2DD4BF]/20 rounded-full blur-2xl"></div>
      <h3 className="text-card-foreground mb-6 font-bold text-2xl uppercase tracking-wide relative z-10">Certificate Upload & Verification</h3>

      <div className="space-y-5 relative z-10">
        <div>
          <Label htmlFor="certificate-input" className="text-card-foreground/60 font-semibold">Upload Certificate</Label>
          <div className="flex gap-3 mt-3">
            <Input
              id="certificate-input"
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              disabled={false}
              className="flex-1 border-2 border-border/50 bg-card-foreground/5 rounded-xl"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={false}
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
          <div className="p-6 bg-gradient-to-br from-[#F59E0B]/20 to-[#FBBF24]/20 rounded-2xl border-2 border-[#F59E0B]/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#F59E0B] to-[#FBBF24] rounded-xl flex items-center justify-center shadow-lg">
                <Award className="text-white" size={20} />
              </div>
              <h4 className="text-card-foreground font-bold text-lg">Certificate Details</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-card-foreground/60 font-semibold">File Name</Label>
                <Input
                  value={selectedFile.name}
                  readOnly
                  className="bg-card mt-2 border-2 border-border/50 rounded-xl"
                />
              </div>

              <div>
                <Label className="text-card-foreground/60 font-semibold">Certificate Hash</Label>
                <Input
                  value={certificateHash}
                  readOnly
                  className="bg-card font-mono mt-2 border-2 border-border/50 rounded-xl"
                />
              </div>
            </div>

            <div className="mt-4">
              <Label className="text-card-foreground/60 font-semibold">Certificate Type *</Label>
              <select
                value={certificateType}
                onChange={(e) => setCertificateType(e.target.value)}
                className="w-full mt-2 p-3 bg-card border-2 border-border/50 rounded-xl"
                disabled={false}
              >
                <option value="">Select Certificate Type</option>
                {certificateTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <Label className="text-card-foreground/60 font-semibold">Issuing Organization *</Label>
                <div className="relative mt-2">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-card-foreground/60" size={18} />
                  <Input
                    value={issuer}
                    onChange={(e) => setIssuer(e.target.value)}
                    placeholder="e.g., University Name"
                    className="pl-10 bg-card border-2 border-border/50 rounded-xl"
                    disabled={false}
                  />
                </div>
              </div>

              <div>
                <Label className="text-card-foreground/60 font-semibold">Recipient Name *</Label>
                <div className="relative mt-2">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-card-foreground/60" size={18} />
                  <Input
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="e.g., John Doe"
                    className="pl-10 bg-card border-2 border-border/50 rounded-xl"
                    disabled={false}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <Label className="text-card-foreground/60 font-semibold">Issue Date *</Label>
                <div className="relative mt-2">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-card-foreground/60" size={18} />
                  <input
                    type="date"
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                    className="w-full pl-10 p-3 bg-card border-2 border-border/50 rounded-xl"
                    disabled={false}
                  />
                </div>
              </div>

              <div>
                <Label className="text-card-foreground/60 font-semibold">Expiry Date (Optional)</Label>
                <div className="relative mt-2">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-card-foreground/60" size={18} />
                  <input
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full pl-10 p-3 bg-card border-2 border-border/50 rounded-xl"
                    disabled={false}
                  />
                </div>
              </div>
            </div>

            <Button
              onClick={handleUploadToBlockchain}
              disabled={!selectedFile}
              className="w-full mt-6 bg-gradient-to-r from-[#E6007A] to-[#6F36BC] hover:from-[#E6007A]/90 hover:to-[#6F36BC]/90 text-white font-semibold py-6 rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {!selectedFile ? 'Select a file first' : 'Upload Certificate to Polkadot Blockchain'}
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}