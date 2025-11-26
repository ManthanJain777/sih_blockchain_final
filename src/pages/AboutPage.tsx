import { Card } from '../components/ui/card';
import { Shield, Lock, Globe, Fingerprint, GitBranch, FileCheck } from 'lucide-react';

export function AboutPage() {
  const technologies = [
    {
      icon: Fingerprint,
      title: 'SHA256 Hashing',
      description: 'Cryptographic hash function that generates unique 256-bit signatures for files, ensuring data integrity and enabling verification.',
    },
    {
      icon: Globe,
      title: 'Polkadot Blockchain',
      description: 'InterPlanetary File System - a distributed, peer-to-peer protocol for storing and sharing data in a decentralized manner.',
    },
    {
      icon: GitBranch,
      title: 'Blockchain',
      description: 'Immutable distributed ledger technology that stores file hashes and metadata, providing tamper-proof verification records.',
    },
    {
      icon: Lock,
      title: 'MetaMask',
      description: 'Cryptocurrency wallet and gateway to blockchain apps, enabling secure authentication and transaction signing.',
    },
  ];

  const useCases = [
    {
      icon: FileCheck,
      title: 'Document Verification',
      description: 'Verify the authenticity of legal documents, certificates, and contracts',
    },
    {
      icon: Shield,
      title: 'Media Authenticity',
      description: 'Prove ownership and origin of photos, videos, and digital artwork',
    },
    {
      icon: Lock,
      title: 'Data Integrity',
      description: 'Ensure files have not been tampered with or modified',
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background relative overflow-hidden">
      {/* Large organic blob shapes */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#FACC15] rounded-[40%_60%_70%_30%/60%_30%_70%_40%] opacity-90"></div>
      <div className="absolute top-[15%] -left-40 w-[500px] h-[500px] bg-[#8B5CF6] rounded-[60%_40%_30%_70%/40%_60%_70%_30%] opacity-90"></div>
      <div className="absolute -bottom-32 right-[15%] w-[550px] h-[550px] bg-[#2DD4BF] rounded-[30%_70%_70%_30%/30%_30%_70%_70%] opacity-85"></div>
      <div className="absolute bottom-[40%] -right-32 w-[450px] h-[450px] bg-[#D946EF] rounded-[50%_50%_30%_70%/50%_50%_70%_30%] opacity-80"></div>
      <div className="absolute top-[50%] left-[5%] w-[400px] h-[400px] bg-[#3B82F6] rounded-[70%_30%_50%_50%/60%_40%_60%_40%] opacity-75"></div>
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-[#FB923C] rounded-[65%_35%_45%_55%/55%_45%_65%_35%] opacity-85"></div>
      
      <div className="container mx-auto px-4 py-16 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-foreground mb-6 text-5xl uppercase font-black tracking-tight">About Polkadot File Verifier</h1>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
            A decentralized application that combines blockchain technology, cryptographic hashing, 
            and distributed storage to provide secure file verification and ownership proof.
          </p>
        </div>

        <Card className="p-10 mb-12 bg-card border-2 border-border/50 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#FB923C]/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-[#3B82F6]/20 rounded-full blur-3xl"></div>
          <h2 className="text-card-foreground mb-6 text-3xl uppercase font-black tracking-wide relative z-10">Our Mission</h2>
          <p className="text-card-foreground/70 mb-6 text-lg relative z-10">
            In an era of deepfakes, digital manipulation, and content theft, proving the authenticity 
            and ownership of digital files has never been more critical. Polkadot File Verifier provides a 
            trustless, decentralized solution for verifying file integrity and establishing proof of 
            ownership through blockchain technology.
          </p>
          <p className="text-card-foreground/70 text-lg relative z-10">
            By combining SHA256 cryptographic hashing and Polkadot blockchain technology, 
            immutability, we enable users to create unforgeable records of their digital assets with 
            timestamp and geolocation metadata.
          </p>
        </Card>

        <div className="mb-16">
          <h2 className="text-foreground mb-10 text-center text-3xl uppercase font-black tracking-wide">Technologies</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {technologies.map((tech, index) => {
              const Icon = tech.icon;
              const colors = [
                'from-[#8B5CF6] to-[#2DD4BF]',
                'from-[#2DD4BF] to-[#3B82F6]',
                'from-[#FB923C] to-[#FACC15]',
                'from-[#3B82F6] to-[#8B5CF6]',
              ];
              return (
                <Card key={index} className="p-8 border-2 border-border/50 hover:shadow-2xl transition-all hover:-translate-y-1 bg-card relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br opacity-10 rounded-full blur-2xl"></div>
                  <div className="flex items-start gap-5">
                    <div className={`w-14 h-14 bg-gradient-to-br ${colors[index]} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg relative z-10`}>
                      <Icon className="text-white" size={28} />
                    </div>
                    <div>
                      <h3 className="text-card-foreground mb-3 font-bold text-lg">{tech.title}</h3>
                      <p className="text-card-foreground/70">{tech.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-foreground mb-10 text-center text-3xl uppercase font-black tracking-wide">Use Cases</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => {
              const Icon = useCase.icon;
              const colors = [
                'from-[#8B5CF6] to-[#FB923C]',
                'from-[#2DD4BF] to-[#3B82F6]',
                'from-[#FB923C] to-[#FACC15]',
              ];
              return (
                <Card key={index} className="p-8 border-2 border-border/50 text-center hover:shadow-2xl transition-all hover:-translate-y-1 bg-card relative overflow-hidden">
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br opacity-10 rounded-full blur-2xl"></div>
                  <div className={`w-16 h-16 bg-gradient-to-br ${colors[index]} rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-xl relative z-10`}>
                    <Icon className="text-white" size={32} />
                  </div>
                  <h3 className="text-card-foreground mb-3 font-bold text-xl">{useCase.title}</h3>
                  <p className="text-card-foreground/70">{useCase.description}</p>
                </Card>
              );
            })}
          </div>
        </div>

        <Card className="p-8 bg-gradient-to-br from-[#FB923C]/20 to-[#FACC15]/20 border-2 border-[#FB923C]/50 shadow-xl relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-60 h-60 bg-[#FACC15]/30 rounded-full blur-3xl"></div>
          <h3 className="text-card-foreground mb-4 font-bold text-2xl uppercase tracking-wide relative z-10">Important Notice</h3>
          <p className="text-card-foreground/80 mb-4 font-semibold relative z-10">
            This is a demonstration application. In production environments:
          </p>
          <ul className="space-y-3 text-card-foreground/70 ml-4 relative z-10">
            <li className="flex gap-2 items-start">
              <span className="text-[#FB923C] text-xl flex-shrink-0">•</span>
              <span>Connect to real MetaMask wallets and blockchain networks</span>
            </li>
            <li className="flex gap-2 items-start">
              <span className="text-[#FB923C] text-xl flex-shrink-0">•</span>
              <span>Implement actual SHA256 hashing using Web Crypto API</span>
            </li>
            <li className="flex gap-2 items-start">
              <span className="text-[#FB923C] text-xl flex-shrink-0">•</span>
              <span>Integrate with Polkadot parachains for enhanced functionality</span>
            </li>
            <li className="flex gap-2 items-start">
              <span className="text-[#FB923C] text-xl flex-shrink-0">•</span>
              <span>Deploy smart contracts for on-chain verification</span>
            </li>
            <li className="flex gap-2 items-start">
              <span className="text-[#FB923C] text-xl flex-shrink-0">•</span>
              <span>Add proper error handling and security measures</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
