import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Shield, FileUp, CheckCircle, Globe } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const features = [
    {
      icon: FileUp,
      title: 'File Hashing',
      description: 'Generate SHA256 hashes for your files with automatic timestamp and geo-tagging',
      color: 'from-secondary to-accent',
    },
    {
      icon: Globe,
      title: 'IPFS Storage',
      description: 'Upload files and metadata to the InterPlanetary File System for distributed storage',
      color: 'from-primary to-secondary',
    },
    {
      icon: Shield,
      title: 'Blockchain Verification',
      description: 'Submit file hashes to blockchain for immutable proof of ownership and integrity',
      color: 'from-accent to-primary',
    },
    {
      icon: CheckCircle,
      title: 'Media Verification',
      description: 'Verify file authenticity and retrieve metadata using file hash lookup',
      color: 'from-secondary to-primary',
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-foreground mb-4">
            Secure File Verification & IPFS Storage
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            A decentralized application for hashing files, uploading to IPFS, and verifying 
            data integrity through blockchain technology. Ensure authenticity and ownership 
            of your digital assets.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => onNavigate('upload')}
              className="bg-gradient-to-r from-secondary to-primary hover:from-accent hover:to-primary text-white px-8"
            >
              Get Started
            </Button>
            <Button
              onClick={() => onNavigate('verify')}
              variant="outline"
              className="border-secondary text-secondary hover:bg-secondary/10 px-8"
            >
              Verify File
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="p-6 border-border hover:shadow-lg transition-shadow">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                  <Icon className="text-white" size={28} />
                </div>
                <h3 className="text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            );
          })}
        </div>

        {/* How It Works */}
        <Card className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 border-border">
          <h2 className="text-foreground mb-6 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-secondary text-white rounded-full flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h4 className="text-foreground mb-2">Connect Wallet</h4>
              <p className="text-muted-foreground">Connect your MetaMask wallet to authenticate and enable blockchain features</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h4 className="text-foreground mb-2">Upload & Hash</h4>
              <p className="text-muted-foreground">Select your file to generate hash, get geo-tags, and upload to IPFS network</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h4 className="text-foreground mb-2">Verify & Secure</h4>
              <p className="text-muted-foreground">Submit to blockchain for verification and retrieve metadata anytime</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
