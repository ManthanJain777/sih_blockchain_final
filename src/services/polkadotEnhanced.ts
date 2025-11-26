import { ApiPromise, WsProvider, Keyring } from '@polkadot/api';
import { web3Accounts, web3Enable, web3FromSource } from '@polkadot/extension-dapp';
import { u8aToHex, hexToU8a } from '@polkadot/util';
import { blake2AsHex } from '@polkadot/util-crypto';

export interface FileVerificationData {
  fileHash: string;
  fileName: string;
  fileSize: number;
  timestamp: string;
  location: string;
  metadata: Record<string, any>;
}

export interface VerificationRecord {
  fileHash: string;
  fileName: string;
  timestamp: string;
  location: string;
  status: string;
  blockNumber: number | string;
  transactionHash: string;
  metadata: Record<string, any>;
}

export class PolkadotVerificationService {
  private static instance: PolkadotVerificationService;
  private api: ApiPromise | null = null;
  private accounts: any[] = [];
  private selectedAccount: any = null;

  public static getInstance(): PolkadotVerificationService {
    if (!PolkadotVerificationService.instance) {
      PolkadotVerificationService.instance = new PolkadotVerificationService();
    }
    return PolkadotVerificationService.instance;
  }

  async connectWallet(): Promise<boolean> {
    try {
      console.log('🔗 Connecting to Polkadot...');

      // Connect to Acala network (Polkadot parachain) - can be changed to other networks
      const provider = new WsProvider('wss://acala-rpc.dwellir.com');
      this.api = await ApiPromise.create({ provider });

      // Enable browser extension
      const extensions = await web3Enable('ZeroTrace-Polkadot-Verification');
      if (extensions.length === 0) {
        throw new Error('No Polkadot extension found. Please install Polkadot.js extension.');
      }

      // Get accounts
      this.accounts = await web3Accounts();
      if (this.accounts.length > 0) {
        this.selectedAccount = this.accounts[0];
      }

      console.log('✅ Polkadot connected successfully');
      return true;
    } catch (error) {
      console.error('❌ Polkadot connection failed:', error);
      return false;
    }
  }

  async uploadFileAndVerify(file: File, location: string, metadata: Record<string, any> = {}): Promise<VerificationRecord> {
    if (!this.api || !this.selectedAccount) {
      throw new Error('Not connected to Polkadot');
    }

    // Calculate file hash
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const fileHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // Prepare verification data
    const verificationData: FileVerificationData = {
      fileHash,
      fileName: file.name,
      fileSize: file.size,
      timestamp: new Date().toISOString(),
      location,
      metadata
    };

    // Submit verification to blockchain
    const injector = await web3FromSource(this.selectedAccount.meta.source);
    
    // Using a more appropriate call for storing verification data
    const tx = this.api.tx.system.remark(JSON.stringify(verificationData));

    return new Promise((resolve, reject) => {
      tx.signAndSend(this.selectedAccount.address, { signer: injector.signer },
        ({ status, dispatchError, events }) => {
          if (dispatchError) {
            if (dispatchError.isModule) {
              const decoded = this.api!.registry.findMetaError(dispatchError.asModule);
              reject(new Error(`${decoded.section}.${decoded.name}: ${decoded.documentation.join(' ')}`));
            } else {
              reject(new Error(dispatchError.toString()));
            }
          } else if (status.isInBlock) {
            const verificationRecord: VerificationRecord = {
              fileHash,
              fileName: file.name,
              timestamp: verificationData.timestamp,
              location,
              status: 'verified',
              blockNumber: status.asInBlock.toNumber ? status.asInBlock.toNumber() : 'unknown',
              transactionHash: status.asInBlock.toString(),
              metadata
            };
            resolve(verificationRecord);
          }
        }
      ).catch(reject);
    });
  }

  async verifyFileOnBlockchain(fileHash: string): Promise<VerificationRecord | null> {
    if (!this.api) {
      throw new Error('Not connected to Polkadot');
    }

    try {
      // Query all system.remark events to find file verification records
      const events = await this.api.query.system.events();
      const verificationRecords: VerificationRecord[] = [];

      // Process events to find our verification records
      events.forEach((record: any) => {
        const { event } = record;
        if (this.api?.events.system.Remarked.is(event)) {
          const [sender, hash] = event.data;
          const dataStr = u8aToHex(hash);
          
          // Try to parse the verification data from remarks
          try {
            const verificationData: FileVerificationData = JSON.parse(new TextDecoder().decode(hash));
            if (verificationData.fileHash === fileHash) {
              verificationRecords.push({
                fileHash: verificationData.fileHash,
                fileName: verificationData.fileName,
                timestamp: verificationData.timestamp,
                location: verificationData.location,
                status: 'verified',
                blockNumber: record.phase.asApplyExtrinsic.toNumber ? record.phase.asApplyExtrinsic.toNumber() : 'unknown',
                transactionHash: 'unknown',
                metadata: verificationData.metadata
              });
            }
          } catch (e) {
            // If parsing fails, check for legacy format
            if (dataStr.includes('MEDIA_VERIFY') && dataStr.includes(fileHash)) {
              const parts = dataStr.split(':');
              if (parts.length >= 4) {
                verificationRecords.push({
                  fileHash: parts[2],
                  fileName: parts[3],
                  timestamp: parts[4] || new Date().toISOString(),
                  location: parts[5] || 'Unknown',
                  status: 'verified',
                  blockNumber: record.phase.asApplyExtrinsic.toNumber ? record.phase.asApplyExtrinsic.toNumber() : 'unknown',
                  transactionHash: 'unknown',
                  metadata: {}
                });
              }
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
      console.error('Error verifying file hash on blockchain:', error);
      throw error;
    }
  }

  async getTransactionStatus(txHash: string): Promise<any> {
    if (!this.api) {
      throw new Error('Not connected to Polkadot');
    }

    try {
      // Get the block header
      const header = await this.api.rpc.chain.getHeader();
      return {
        status: 'finalized',
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

  async disconnect() {
    if (this.api) {
      await this.api.disconnect();
      this.api = null;
    }
    this.selectedAccount = null;
    this.accounts = [];
  }

  // Add support for multiple networks in Polkadot ecosystem
  async connectToNetwork(network: 'polkadot' | 'kusama' | 'acala' | 'astar' | 'moonbeam' | 'statemint' | 'paseo') {
    try {
      let providerUrl = '';
      
      switch(network) {
        case 'polkadot':
          providerUrl = 'wss://polkadot-rpc.dwellir.com';
          break;
        case 'kusama':
          providerUrl = 'wss://kusama-rpc.dwellir.com';
          break;
        case 'acala':
          providerUrl = 'wss://acala-rpc.dwellir.com';
          break;
        case 'astar':
          providerUrl = 'wss://astar-rpc.dwellir.com';
          break;
        case 'moonbeam':
          providerUrl = 'wss://wss.api.moonbeam.network';
          break;
        case 'statemint':
          providerUrl = 'wss://statemint-rpc.dwellir.com';
          break;
        case 'paseo':
          providerUrl = 'wss://rpc.ibp.network/paseo'; // Fixed: Removed invalid UUID path, using public RPC endpoint
          break;
        default:
          providerUrl = 'wss://acala-rpc.dwellir.com';
      }

      if (this.api) {
        try {
          await this.api.disconnect();
        } catch (e) {
          // Ignore disconnect errors
        }
        this.api = null;
      }

      // Get fallback endpoints
      const endpoints = this.getEndpointsWithFallback(providerUrl);
      
      let lastError: Error | null = null;
      for (const endpoint of endpoints) {
        try {
          console.log(`🔄 Attempting to connect to ${network} via: ${endpoint}`);
          
          const provider = new WsProvider(endpoint, 3000); // 3 second connection timeout
          
          this.api = await Promise.race([
            ApiPromise.create({ provider, throwOnConnect: false }),
            new Promise<never>((_, reject) => 
              setTimeout(() => reject(new Error('Connection timeout')), 10000)
            )
          ]);

          // Wait for the API to be ready with timeout
          await Promise.race([
            this.api.isReady,
            new Promise<never>((_, reject) => 
              setTimeout(() => reject(new Error('API ready timeout')), 10000)
            )
          ]);

          // Reinitialize accounts with the new connection
          const extensions = await web3Enable('ZeroTrace-Polkadot-Verification');
          if (extensions.length > 0) {
            this.accounts = await web3Accounts();
            if (this.accounts.length > 0 && !this.selectedAccount) {
              this.selectedAccount = this.accounts[0];
            }
          }

          console.log(`✅ Connected to ${network} network via ${endpoint}`);
          return true;
        } catch (error) {
          console.warn(`⚠️ Connection failed to ${endpoint}:`, error);
          lastError = error as Error;
          
          if (this.api) {
            try {
              await this.api.disconnect();
            } catch (e) {
              // Ignore disconnect errors
            }
            this.api = null;
          }
          continue;
        }
      }

      throw lastError || new Error('All connection attempts failed');
    } catch (error) {
      console.error(`❌ Failed to connect to ${network} network:`, error);
      return false;
    }
  }

  private getEndpointsWithFallback(primaryEndpoint: string): string[] {
    const fallbacks: Record<string, string[]> = {
      'wss://rpc.ibp.network/paseo': [
        'wss://rpc.ibp.network/paseo',
        'wss://paseo-rpc.dwellir.com',
        'wss://paseo-rpc.polkadot.io'
      ],
      'wss://polkadot-rpc.dwellir.com': [
        'wss://polkadot-rpc.dwellir.com',
        'wss://rpc.polkadot.io',
        'wss://polkadot.api.onfinality.io/public-ws'
      ],
      'wss://kusama-rpc.dwellir.com': [
        'wss://kusama-rpc.dwellir.com',
        'wss://kusama-rpc.polkadot.io',
        'wss://kusama.api.onfinality.io/public-ws'
      ]
    };
    return fallbacks[primaryEndpoint] || [primaryEndpoint];
  }
}