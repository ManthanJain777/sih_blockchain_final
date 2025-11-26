import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Shield, FileUp, CheckCircle, Rocket, Network } from 'lucide-react'; // Added Polkadot icons

interface HomePageProps {
  onNavigate: (page: string) => void;
  isPolkadotConnected?: boolean; // NEW: Polkadot connection status
}

export function HomePage({ onNavigate, isPolkadotConnected = false }: HomePageProps) {
  const features = [
    {
      icon: FileUp,
      title: 'Certificate Upload',
      description: 'Upload certificates and generate SHA256 hashes with complete metadata',
      color: 'bg-gradient-to-br from-[#E6007A] to-[#6F36BC]', // Polkadot colors
      bgShape: 'bg-[#E6007A]/20',
    },
    {
      icon: Shield,
      title: 'Blockchain Storage',
      description: 'Store certificate data on Polkadot Relay Chain for immutable verification',
      color: 'bg-gradient-to-br from-[#6F36BC] to-[#E6007A]', // Polkadot colors
      bgShape: 'bg-[#6F36BC]/20',
    },
    {
      icon: CheckCircle,
      title: 'Certificate Verification',
      description: 'Verify certificate authenticity and retrieve complete metadata instantly',
      color: 'bg-gradient-to-br from-[#E6007A] to-[#FF6B9C]',
      bgShape: 'bg-[#FF6B9C]/20',
    },
    {
      icon: Rocket,
      title: 'Transaction History',
      description: 'Track all certificate operations with comprehensive transaction history',
      color: 'bg-gradient-to-br from-[#6F36BC] to-[#9D6BFF]',
      bgShape: 'bg-[#9D6BFF]/20',
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background relative overflow-hidden">
      {/* Large organic blob shapes - Polkadot colors */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-[#E6007A] rounded-[40%_60%_70%_30%/60%_30%_70%_40%] opacity-90"></div>
      <div className="absolute -top-20 left-[20%] w-[500px] h-[500px] bg-[#6F36BC] rounded-[60%_40%_30%_70%/40%_60%_70%_30%] opacity-90"></div>
      <div className="absolute top-[10%] -right-40 w-[550px] h-[550px] bg-[#FF6B9C] rounded-[30%_70%_70%_30%/30%_30%_70%_70%] opacity-90"></div>
      <div className="absolute -bottom-40 -left-40 w-[650px] h-[650px] bg-[#9D6BFF] rounded-[70%_30%_50%_50%/60%_40%_60%_40%] opacity-80"></div>
      <div className="absolute bottom-[5%] right-[15%] w-[450px] h-[450px] bg-[#6F36BC] rounded-[50%_50%_30%_70%/50%_50%_70%_30%] opacity-85"></div>
      
      <div className="container mx-auto px-4 py-20 max-w-6xl relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-20">
          {/* Polkadot Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#E6007A] to-[#6F36BC] rounded-full text-white text-sm font-semibold mb-6 shadow-lg">
            <Network size={16} />
            <span>Powered by Polkadot</span>
          </div>

          <h1 className="text-foreground mb-6 text-5xl md:text-6xl uppercase font-black tracking-tight">
            Certificate Verification on Polkadot
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-10 text-lg">
            A decentralized application for certificate verification and authentication 
            using the Polkadot Relay Chain. Ensure authenticity and permanent verification 
            of your certificates with immutable blockchain records.
          </p>
          
          {/* Connection Status */}
          {!isPolkadotConnected && (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-6 py-3 rounded-lg mb-6 max-w-md mx-auto">
              <p className="font-semibold">Connect your Polkadot wallet to get started</p>
            </div>
          )}

          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              onClick={() => onNavigate('upload')}
              disabled={!isPolkadotConnected}
              className="bg-gradient-to-r from-[#E6007A] to-[#6F36BC] hover:from-[#FF6B9C] hover:to-[#9D6BFF] text-white px-10 py-6 text-lg rounded-full shadow-lg shadow-[#E6007A]/30 font-semibold lowercase disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isPolkadotConnected ? 'start verifying' : 'connect wallet first'}
            </Button>
            <Button
              onClick={() => onNavigate('verify')}
              className="bg-secondary hover:bg-secondary/90 text-background px-10 py-6 text-lg rounded-full shadow-lg shadow-secondary/30 font-semibold lowercase"
            >
              verify file
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="p-8 border-2 border-border/50 hover:shadow-2xl hover:shadow-[#E6007A]/10 transition-all hover:-translate-y-1 bg-card relative overflow-hidden">
                <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full ${feature.bgShape} blur-2xl`}></div>
                <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-4 shadow-lg relative z-10`}>
                  <Icon className="text-white" size={32} />
                </div>
                <h3 className="text-card-foreground mb-3 text-xl font-bold">{feature.title}</h3>
                <p className="text-card-foreground/70">{feature.description}</p>
              </Card>
            );
          })}
        </div>

        {/* How It Works - Updated for Polkadot */}
        <Card className="p-10 bg-card border-2 border-border/50 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-[#E6007A]/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-[#6F36BC]/20 rounded-full blur-3xl"></div>
          <h2 className="text-card-foreground mb-10 text-center uppercase font-black text-3xl tracking-wide relative z-10">
            How It Works on Polkadot
          </h2>
          <div className="grid md:grid-cols-3 gap-10 relative z-10">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#E6007A] to-[#FF6B9C] text-white rounded-2xl flex items-center justify-center mx-auto mb-4 font-black text-2xl shadow-lg">
                1
              </div>
              <h4 className="text-card-foreground mb-3 font-bold text-lg">Connect Polkadot Wallet</h4>
              <p className="text-card-foreground/70">Connect your Polkadot.js wallet to authenticate and enable blockchain features</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#6F36BC] to-[#9D6BFF] text-white rounded-2xl flex items-center justify-center mx-auto mb-4 font-black text-2xl shadow-lg">
                2
              </div>
              <h4 className="text-card-foreground mb-3 font-bold text-lg">Upload Certificate</h4>
              <p className="text-card-foreground/70">Upload your certificate to generate SHA256 hash with complete metadata</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#E6007A] to-[#6F36BC] text-white rounded-2xl flex items-center justify-center mx-auto mb-4 font-black text-2xl shadow-lg">
                3
              </div>
              <h4 className="text-card-foreground mb-3 font-bold text-lg">Verify on Blockchain</h4>
              <p className="text-card-foreground/70">Submit certificate to Polkadot Relay Chain for permanent verification and proof</p>
            </div>
          </div>
        </Card>

        {/* Polkadot Benefits Section */}
        <Card className="p-10 bg-gradient-to-br from-[#E6007A]/10 to-[#6F36BC]/10 border-2 border-[#E6007A]/20 mt-12 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#6F36BC]/20 rounded-full blur-3xl"></div>
          <div className="text-center">
            <h3 className="text-card-foreground mb-6 text-2xl font-bold">Why Polkadot?</h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#E6007A] text-white rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield size={20} />
                </div>
                <h4 className="text-card-foreground font-semibold mb-2">Interoperability</h4>
                <p className="text-card-foreground/70 text-sm">Connect with multiple blockchains through Polkadot's parachain architecture</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#6F36BC] text-white rounded-full flex items-center justify-center mx-auto mb-3">
                  <Rocket size={20} />
                </div>
                <h4 className="text-card-foreground font-semibold mb-2">Scalability</h4>
                <p className="text-card-foreground/70 text-sm">Handle high transaction volumes with Polkadot's shared security model</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#FF6B9C] text-white rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle size={20} />
                </div>
                <h4 className="text-card-foreground font-semibold mb-2">Security</h4>
                <p className="text-card-foreground/70 text-sm">Benefit from Polkadot's robust security and governance features</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}