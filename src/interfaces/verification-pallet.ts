// interfaces/verification-pallet.ts
// This defines the interface for a custom verification pallet on a Polkadot parachain

export interface VerificationPallet {
  addFileVerification(
    fileHash: string,
    fileName: string,
    metadata: Record<string, any>
  ): Promise<void>;

  getFileVerification(
    fileHash: string
  ): Promise<VerificationRecord | null>;

  verifyFileIntegrity(
    fileHash: string,
    originalData: Uint8Array
  ): Promise<boolean>;
}

export interface VerificationRecord {
  id: string;
  fileHash: string;
  fileName: string;
  fileSize: number;
  timestamp: Date;
  uploader: string;
  metadata: Record<string, any>;
}

// For now, we'll create a simplified version that works with the existing Polkadot API
// In a real implementation, this would connect to a custom substrate pallet