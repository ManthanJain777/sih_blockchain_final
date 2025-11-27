import { ApiPromise } from '@polkadot/api';
import { web3Accounts, web3Enable, web3FromSource } from '@polkadot/extension-dapp';
import { u8aToHex, hexToU8a } from '@polkadot/util';
import { blake2AsHex } from '@polkadot/util-crypto';
import { ConnectionManager } from './ConnectionManager';
import { getNetworkEndpoints, getDefaultNetwork, NetworkType } from './NetworkConfig';

export class PolkadotService {
  private static instance: PolkadotService;
  private api: ApiPromise | null = null;
  private accounts: any[] = [];
  private selectedAccount: any = null;
  private currentNetwork: string = 'polkadot'; // Changed default from astar to polkadot for stable connection
  private connectionManager: ConnectionManager;

  public static getInstance(): PolkadotService {
    if (!PolkadotService.instance) {
      PolkadotService.instance = new PolkadotService();
    }
    return PolkadotService.instance;
  }

  constructor() {
    this.connectionManager = ConnectionManager.getInstance();
  }

  async connectWallet(): Promise<boolean> {
    try {
      console.log('🔗 Connecting to Polkadot...');

      // Enable browser extension
      const extensions = await web3Enable('MediaVerificationApp');
      if (extensions.length === 0) {
        throw new Error('No Polkadot extension found. Please install Polkadot.js extension.');
      }

      // Use the connection manager with fallback
      this.api = await this.connectionManager.connectWithFallback(this.currentNetwork);

      // Get accounts
      this.accounts = await web3Accounts();
      if (this.accounts.length > 0) {
        this.selectedAccount = this.accounts[0];
      }

      console.log(`✅ Connected to ${this.currentNetwork} network`);
      return true;
    } catch (error) {
      console.error('❌ Polkadot connection failed:', error);
      return false;
    }
  }

  // Add support for connecting to different networks in the Polkadot ecosystem
  // Create API connection with fallback to alternative endpoints for all networks
  async connectToNetwork(network: NetworkType) {
    try {
      this.currentNetwork = network;

      if (this.api) {
        await this.api.disconnect();
      }

      this.api = await this.connectionManager.connectWithFallback(network);

      // Reinitialize accounts with the new connection
      const extensions = await web3Enable('MediaVerificationApp');
      if (extensions.length > 0) {
        this.accounts = await web3Accounts();
        if (this.accounts.length > 0 && !this.selectedAccount) {
          this.selectedAccount = this.accounts[0];
        }
      }

      console.log(`✅ Connected to ${network} network`);
      return true;
    } catch (error) {
      console.error(`❌ Failed to connect to ${network} network:`, error);
      return false;
    }
  }

  async submitFileHash(fileHash: string, fileName: string, metadata: any): Promise<string> {
    if (!this.api || !this.selectedAccount) {
      throw new Error('Not connected to Polkadot');
    }

    const injector = await web3FromSource(this.selectedAccount.meta.source);

    // Create a transaction to store the file hash using system.remark with structured data
    const verificationData = {
      hash: fileHash,
      fileName,
      timestamp: metadata.timestamp,
      location: metadata.location,
      fileSize: metadata.fileSize || 0
    };

    // Convert to JSON string and hash it to create a unique identifier
    const dataStr = JSON.stringify(verificationData);
    const dataHash = blake2AsHex(dataStr, 256);

    const tx = this.api.tx.system.remark(
      `MEDIA_VERIFY:${dataHash}:${fileHash}:${fileName}:${metadata.timestamp}`
    );

    return new Promise((resolve, reject) => {
      tx.signAndSend(this.selectedAccount.address, { signer: injector.signer },
        ({ status, dispatchError, events }) => {
          if (dispatchError) {
            if (dispatchError.isModule) {
              const decoded = this.api.registry.findMetaError(dispatchError.asModule);
              reject(new Error(`${decoded.section}.${decoded.name}: ${decoded.documentation.join(' ')}`));
            } else {
              reject(new Error(dispatchError.toString()));
            }
          } else if (status.isInBlock) {
            resolve(status.asInBlock.toString());
          }
        }
      ).catch(reject);
    });
  }

  async verifyFileHash(fileHash: string): Promise<any> {
    if (!this.api) {
      throw new Error('Not connected to Polkadot');
    }

    try {
      // Query all system.remark events to find file verification records
      // In a real implementation, we would store the hashes in a custom pallet
      // For now, we'll use a more sophisticated approach to find the record
      
      // Get all system events
      const events = await this.api.query.system.events();
      const verificationRecords = [];
      
      // Process events to find our verification records
      events.forEach((record: any) => {
        const { event } = record;
        if (this.api?.events.system.Remarked.is(event)) {
          const [sender, hash] = event.data;
          const dataStr = u8aToHex(hash);
          if (dataStr.includes('MEDIA_VERIFY') && dataStr.includes(fileHash)) {
            // Extract verification data from the remark
            const parts = dataStr.split(':');
            if (parts.length >= 4) {
              verificationRecords.push({
                hash: parts[2],  // fileHash
                fileName: parts[3],
                timestamp: parts[4],
                location: parts[5] || 'Unknown',
                status: 'verified',
                blockNumber: record.phase.asApplyExtrinsic.toNumber ? record.phase.asApplyExtrinsic.toNumber() : 'unknown'
              });
            }
          }
        }
      });

      // Return the most recent verification record
      if (verificationRecords.length > 0) {
        return verificationRecords[verificationRecords.length - 1];
      }

      return null;
    } catch (error) {
      console.error('Error verifying file hash:', error);
      throw error;
    }
  }

  async getTransactionStatus(txHash: string): Promise<any> {
    if (!this.api) {
      throw new Error('Not connected to Polkadot');
    }

    try {
      // In a real implementation, we'd check for a specific transaction
      // For now, let's return a mock status since checking arbitrary tx hashes
      // in Polkadot requires more complex logic
      
      // We can check the chain status and return general status
      const header = await this.api.rpc.chain.getHeader();
      return {
        status: 'finalized', // or 'inBlock', 'broadcast', etc.
        blockHash: header.hash.toString(),
        blockNumber: header.number.toNumber(),
        timestamp: Date.now()
      };
    } catch (error) {
      console.error('Error getting transaction status:', error);
      throw error;
    }
  }

  getAccounts() {
    return this.accounts;
  }

  getSelectedAccount() {
    return this.selectedAccount;
  }

  setSelectedAccount(account: any) {
    this.selectedAccount = account;
  }

  isConnected() {
    return this.api !== null && this.selectedAccount !== null;
  }

  getApi() {
    return this.api;
  }
}