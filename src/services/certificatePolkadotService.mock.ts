import { CertificateData, CertificateVerificationRecord } from './certificatePolkadotService';

export class MockCertificatePolkadotService {
  private static instance: MockCertificatePolkadotService;
  private certificateRecords: Map<string, CertificateVerificationRecord> = new Map();
  
  public static getInstance(): MockCertificatePolkadotService {
    if (!MockCertificatePolkadotService.instance) {
      MockCertificatePolkadotService.instance = new MockCertificatePolkadotService();
    }
    return MockCertificatePolkadotService.instance;
  }

  async connectWallet(): Promise<boolean> {
    console.log('🔗 Connected to Mock Wallet (Demo Mode)');
    return true;
  }

  async switchNetwork(network: string): Promise<boolean> {
    console.log(`🔗 Switched to ${network} (Mock Network)`);
    return true;
  }

  async uploadCertificateAndVerify(
    certificateFile: File,
    certificateType: string,
    issuer: string,
    recipient: string,
    issueDate: string,
    expiryDate?: string,
    metadata: Record<string, any> = {}
  ): Promise<CertificateVerificationRecord> {
    console.log('📋 Mock upload certificate operation...');
    
    // Calculate certificate hash
    const buffer = await certificateFile.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const certificateHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // Mock transaction hash
    const mockTxHash = `0x${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    const mockBlockNumber = Math.floor(Math.random() * 1000000) + 1000000;

    const verificationRecord: CertificateVerificationRecord = {
      certificateHash,
      certificateName: certificateFile.name,
      certificateType,
      issuer,
      recipient,
      issueDate,
      expiryDate,
      status: 'verified',
      blockNumber: mockBlockNumber,
      transactionHash: mockTxHash,
      parachain: 'mock-network',
      metadata: {
        ...metadata,
        timestamp: Date.now()
      }
    };

    // Store in mock session
    this.certificateRecords.set(certificateHash, verificationRecord);

    console.log('✅ Certificate mock-uploaded to blockchain (Demo Mode)');
    console.log(`📝 Block Number: ${mockBlockNumber}`);
    console.log(`🔗 Transaction Hash: ${mockTxHash}`);
    
    return verificationRecord;
  }

  async verifyCertificateOnBlockchain(certificateHash: string): Promise<CertificateVerificationRecord | null> {
    console.log(`🔍 Mock verifying certificate with hash: ${certificateHash}`);
    
    const record = this.certificateRecords.get(certificateHash);
    if (record) {
      console.log('✅ Certificate found in mock blockchain!');
      return record;
    } else {
      console.log('❌ Certificate not found in mock blockchain.');
      return null;
    }
  }

  async getTransactionStatus(txHash: string): Promise<any> {
    return {
      status: 'finalized',
      blockHash: `0x${Math.random().toString(36).substring(2, 15)}`,
      blockNumber: Math.floor(Math.random() * 1000000) + 1000000,
      timestamp: Date.now()
    };
  }

  getAccounts() {
    return [{ address: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY', meta: { name: 'Mock Account' } }];
  }

  getSelectedAccount() {
    return { address: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY', meta: { name: 'Mock Account' } };
  }

  setSelectedAccount(account: any) {
    // Mock implementation
  }

  isConnected() {
    return true;
  }

  getCurrentNetwork() {
    return 'mock-network';
  }

  getAllCertificates(): CertificateVerificationRecord[] {
    return Array.from(this.certificateRecords.values()).sort((a, b) => {
      const timeA = a.metadata?.timestamp || 0;
      const timeB = b.metadata?.timestamp || 0;
      return timeB - timeA; // Most recent first
    });
  }

  async disconnect() {
    console.log('Mock disconnection');
  }
}