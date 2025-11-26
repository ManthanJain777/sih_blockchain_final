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
      title: 'IPFS Storage',
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
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-foreground mb-4">About IPFS File Hasher</h1>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            A decentralized application that combines blockchain technology, cryptographic hashing, 
            and distributed storage to provide secure file verification and ownership proof.
          </p>
        </div>

        <Card className="p-8 mb-8 bg-gradient-to-br from-secondary/10 to-primary/10 border-border">
          <h2 className="text-foreground mb-4">Our Mission</h2>
          <p className="text-muted-foreground mb-4">
            In an era of deepfakes, digital manipulation, and content theft, proving the authenticity 
            and ownership of digital files has never been more critical. IPFS File Hasher provides a 
            trustless, decentralized solution for verifying file integrity and establishing proof of 
            ownership through blockchain technology.
          </p>
          <p className="text-muted-foreground">
            By combining SHA256 cryptographic hashing, IPFS distributed storage, and blockchain 
            immutability, we enable users to create unforgeable records of their digital assets with 
            timestamp and geolocation metadata.
          </p>
        </Card>

        <div className="mb-12">
          <h2 className="text-foreground mb-6 text-center">Technologies</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {technologies.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <Card key={index} className="p-6 border-border">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="text-secondary" size={24} />
                    </div>
                    <div>
                      <h3 className="text-foreground mb-2">{tech.title}</h3>
                      <p className="text-muted-foreground">{tech.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-foreground mb-6 text-center">Use Cases</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => {
              const Icon = useCase.icon;
              return (
                <Card key={index} className="p-6 border-border text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-secondary to-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="text-white" size={28} />
                  </div>
                  <h3 className="text-foreground mb-2">{useCase.title}</h3>
                  <p className="text-muted-foreground">{useCase.description}</p>
                </Card>
              );
            })}
          </div>
        </div>

        <Card className="p-6 bg-destructive/10 border-border">
          <h3 className="text-foreground mb-3">Important Notice</h3>
          <p className="text-muted-foreground mb-2">
            This is a demonstration application. In production environments:
          </p>
          <ul className="space-y-2 text-muted-foreground ml-4">
            <li>• Connect to real MetaMask wallets and blockchain networks</li>
            <li>• Implement actual SHA256 hashing using Web Crypto API</li>
            <li>• Integrate with IPFS nodes for real file storage</li>
            <li>• Deploy smart contracts for on-chain verification</li>
            <li>• Add proper error handling and security measures</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
