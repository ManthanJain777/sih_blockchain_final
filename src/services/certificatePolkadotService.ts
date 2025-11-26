import { ApiPromise, WsProvider } from '@polkadot/api';
import { web3Accounts, web3Enable, web3FromSource } from '@polkadot/extension-dapp';
import { u8aToHex, stringToU8a } from '@polkadot/util';
import { blake2AsHex } from '@polkadot/util-crypto';

export interface CertificateData {
  certificateHash: string;
  certificateName: string;
  certificateType: string;
  issuer: string;
  recipient: string;
  issueDate: string;
  expiryDate?: string;
  metadata: Record<string, any>;
}

export interface CertificateVerificationRecord {
  certificateHash: string;
  certificateName: string;
  certificateType: string;
  issuer: string;
  recipient: string;
  issueDate: string;
  expiryDate?: string;
  status: string;
  blockNumber: number | string;
  transactionHash: string;
  parachain: string;
  metadata: Record<string, any>;
}

export interface PolkadotNetworkConfig {
  name: string;
  providerUrl: string;
  parachainId?: number;
}

export class CertificatePolkadotService {
  private static instance: CertificatePolkadotService;
  private api: ApiPromise | null = null;
  private accounts: any[] = [];
  private selectedAccount: any = null;
  private currentNetwork: string = 'paseo'; // default network - Paseo testnet for demo
  private certificateRecords: Map<string, CertificateVerificationRecord> = new Map(); // In-memory only for current session

  public static getInstance(): CertificatePolkadotService {
    if (!CertificatePolkadotService.instance) {
      CertificatePolkadotService.instance = new CertificatePolkadotService();
    }
    return CertificatePolkadotService.instance;
  }

  async connectWallet(): Promise<boolean> {
    try {
      console.log('🔗 Connecting to Polkadot ecosystem for certificate verification...');

      // Enable browser extension first
      const extensions = await web3Enable('Certificate-Polkadot-Verification');
      if (extensions.length === 0) {
        throw new Error('No Polkadot extension found. Please install Polkadot.js extension.');
      }

      // Use the default network with fallback endpoints
      const networkConfig = this.getNetworkConfig(this.currentNetwork);
      const endpoints = this.getEndpointsWithFallback(networkConfig.providerUrl);
      
      // Try connecting with timeout and fallback endpoints
      let lastError: Error | null = null;
      for (const endpoint of endpoints) {
        try {
          console.log(`🔄 Attempting to connect to: ${endpoint}`);
          
          const provider = new WsProvider(endpoint, 3000); // 3 second connection timeout
          
          // Create API with timeout
          this.api = await Promise.race([
            ApiPromise.create({ 
              provider,
              throwOnConnect: false,
            }),
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

          // Get accounts after connecting to API
          this.accounts = await web3Accounts();
          if (this.accounts.length > 0) {
            this.selectedAccount = this.accounts[0];
          }

          console.log(`✅ Connected to ${this.currentNetwork} network via ${endpoint}`);
          return true;
        } catch (error) {
          console.warn(`⚠️ Connection failed to ${endpoint}:`, error);
          lastError = error as Error;
          
          // Clean up failed connection
          if (this.api) {
            try {
              await this.api.disconnect();
            } catch (e) {
              // Ignore disconnect errors
            }
            this.api = null;
          }
          
          // Continue to next endpoint
          continue;
        }
      }

      // All endpoints failed
      throw lastError || new Error('All connection attempts failed');
    } catch (error) {
      console.error('❌ Polkadot connection failed:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(`💡 Connection error details: ${errorMessage}`);
      return false;
    }
  }

  private getEndpointsWithFallback(primaryEndpoint: string): string[] {
    // Define fallback endpoints for each network
    const fallbacks: Record<string, string[]> = {
      'wss://rpc.ibp.network/paseo': [
        'wss://rpc.ibp.network/paseo',
        'wss://paseo-rpc.dwellir.com',
        'wss://paseo-rpc.polkadot.io'
      ],
      'wss://rpc.polkadot.io': [
        'wss://rpc.polkadot.io',
        'wss://polkadot-rpc.dwellir.com',
        'wss://polkadot.api.onfinality.io/public-ws'
      ],
      'wss://kusama-rpc.polkadot.io': [
        'wss://kusama-rpc.polkadot.io',
        'wss://kusama-rpc.dwellir.com',
        'wss://kusama.api.onfinality.io/public-ws'
      ]
    };

    // Return fallbacks for known endpoints, or just the primary endpoint
    return fallbacks[primaryEndpoint] || [primaryEndpoint];
  }

  private getNetworkConfig(network: string): PolkadotNetworkConfig {
    const networks: Record<string, PolkadotNetworkConfig> = {
      polkadot: {
        name: 'Polkadot',
        providerUrl: 'wss://rpc.polkadot.io'
      },
      kusama: {
        name: 'Kusama',
        providerUrl: 'wss://kusama-rpc.polkadot.io'
      },
      acala: {
        name: 'Acala',
        providerUrl: 'wss://acala-rpc.dwellir.com'
      },
      astar: {
        name: 'Astar',
        providerUrl: 'wss://astar.api.onfinality.io/public-ws'
      },
      moonbeam: {
        name: 'Moonbeam',
        providerUrl: 'wss://wss.api.moonbeam.network'
      },
      statemint: {
        name: 'Statemint',
        providerUrl: 'wss://statemint-rpc.polkadot.io'
      },
      paseo: {
        name: 'Paseo (Testnet)',
        providerUrl: 'wss://rpc.ibp.network/paseo' // Fixed: Removed invalid UUID path, using public RPC endpoint
      }
    };

    return networks[network] || networks['polkadot']; // default to polkadot
  }

  async switchNetwork(network: 'polkadot' | 'kusama' | 'acala' | 'astar' | 'moonbeam' | 'statemint' | 'paseo'): Promise<boolean> {
    try {
      this.currentNetwork = network;
      const networkConfig = this.getNetworkConfig(network);
      
      // Disconnect existing connection
      if (this.api) {
        try {
          await this.api.disconnect();
        } catch (e) {
          // Ignore disconnect errors
        }
        this.api = null;
      }

      // Use the same connection logic with fallbacks
      const endpoints = this.getEndpointsWithFallback(networkConfig.providerUrl);
      
      let lastError: Error | null = null;
      for (const endpoint of endpoints) {
        try {
          console.log(`🔄 Switching to ${network} via: ${endpoint}`);
          
          const provider = new WsProvider(endpoint, 3000); // 3 second connection timeout
          
          this.api = await Promise.race([
            ApiPromise.create({ 
              provider,
              throwOnConnect: false,
            }),
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

          // Refresh accounts with the new connection
          const extensions = await web3Enable('Certificate-Polkadot-Verification');
          if (extensions.length > 0) {
            this.accounts = await web3Accounts();
            if (this.accounts.length > 0) {
              // Keep the same selected account if it exists in the new list, otherwise select first
              if (!this.selectedAccount || !this.accounts.some(acc => acc.address === this.selectedAccount.address)) {
                this.selectedAccount = this.accounts[0];
              }
            }
          }

          console.log(`✅ Switched to ${network} network via ${endpoint}`);
          return true;
        } catch (error) {
          console.warn(`⚠️ Failed to connect to ${endpoint}:`, error);
          lastError = error as Error;
          
          // Clean up failed connection
          if (this.api) {
            try {
              await this.api.disconnect();
            } catch (e) {
              // Ignore disconnect errors
            }
            this.api = null;
          }
          
          // Continue to next endpoint
          continue;
        }
      }

      // All endpoints failed
      throw lastError || new Error('All connection attempts failed');
    } catch (error) {
      console.error(`❌ Failed to switch to ${network} network:`, error);
      return false;
    }
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
    if (!this.api || !this.selectedAccount) {
      throw new Error('Not connected to Polkadot. Please connect your wallet first.');
    }

    console.log('📋 Uploading certificate to Polkadot blockchain...');

    // Calculate certificate hash
    const buffer = await certificateFile.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const certificateHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // Prepare certificate verification data with a specific prefix for easy identification
    const certificateData: CertificateData = {
      certificateHash,
      certificateName: certificateFile.name,
      certificateType,
      issuer,
      recipient,
      issueDate,
      expiryDate,
      metadata
    };

    // Create a tagged remark for easy identification: POLKADOT_CERT:{jsonData}
    const remarkData = `POLKADOT_CERT:${JSON.stringify(certificateData)}`;
    
    // Submit certificate verification to blockchain
    const injector = await web3FromSource(this.selectedAccount.meta.source);
    const tx = this.api.tx.system.remark(remarkData);

    return new Promise((resolve, reject) => {
      let txHash = '';
      
      tx.signAndSend(this.selectedAccount.address, { signer: injector.signer },
        async ({ status, txHash: hash, dispatchError, events }) => {
          // Capture transaction hash
          if (hash) {
            txHash = hash.toString();
          }

          if (dispatchError) {
            if (dispatchError.isModule) {
              const decoded = this.api!.registry.findMetaError(dispatchError.asModule);
              const errorMsg = `${decoded.section}.${decoded.name}: ${decoded.documentation.join(' ')}`;
              console.error('❌ Transaction failed:', errorMsg);
              
              // Better error message for balance issues
              if (decoded.name === 'InsufficientBalance' || 
                  decoded.name === 'Payment' || 
                  decoded.name === 'Fees' ||
                  errorMsg.toLowerCase().includes('insufficient')) {
                reject(new Error('Insufficient balance to pay transaction fees. Please use a testnet account with funds or connect a different wallet.'));
              } else {
                reject(new Error(errorMsg));
              }
            } else {
              console.error('❌ Transaction failed:', dispatchError.toString());
              
              // Handle specific error messages related to balance
              const dispatchErrorStr = dispatchError.toString();
              if (dispatchErrorStr.includes('balance') || 
                  dispatchErrorStr.includes('fee') || 
                  dispatchErrorStr.toLowerCase().includes('insufficient')) {
                reject(new Error('Insufficient balance to pay transaction fees. Please use a testnet account with funds or connect a different wallet.'));
              } else {
                reject(new Error(dispatchError.toString()));
              }
            }
          } else if (status.isInBlock) {
            console.log(`✅ Certificate included in block: ${status.asInBlock.toString()}`);
            
            // Get block number
            const blockHash = status.asInBlock;
            const signedBlock = await this.api!.rpc.chain.getBlock(blockHash);
            const blockNumber = signedBlock.block.header.number.toNumber();
            
            const verificationRecord: CertificateVerificationRecord = {
              certificateHash,
              certificateName: certificateFile.name,
              certificateType,
              issuer,
              recipient,
              issueDate,
              expiryDate,
              status: 'verified',
              blockNumber,
              transactionHash: txHash || blockHash.toString(),
              parachain: this.currentNetwork,
              metadata: {
                ...metadata,
                blockHash: blockHash.toString(),
                timestamp: Date.now()
              }
            };
            
            // Store in current session memory only
            this.certificateRecords.set(certificateHash, verificationRecord);
            
            console.log('✅ Certificate successfully stored on Polkadot blockchain!');
            console.log(`📝 Block Number: ${blockNumber}`);
            console.log(`🔗 Transaction Hash: ${txHash}`);
            resolve(verificationRecord);
          }
        }
      ).catch((error) => {
        console.error('❌ Transaction error:', error);
        if (error.message && (error.message.toLowerCase().includes('balance') || 
                              error.message.toLowerCase().includes('fee') || 
                              error.message.toLowerCase().includes('insufficient'))) {
          reject(new Error('Insufficient balance to pay transaction fees. Please use a testnet account with funds or connect a different wallet.'));
        } else {
          reject(error);
        }
      });
    });
  }

  async verifyCertificateOnBlockchain(certificateHash: string): Promise<CertificateVerificationRecord | null> {
    if (!this.api) {
      throw new Error('Not connected to Polkadot. Please connect your wallet first.');
    }

    console.log(`🔍 Verifying certificate with hash: ${certificateHash}`);
    console.log('🔗 Querying Polkadot blockchain for certificate records...');

    try {
      // Check current session memory first
      const sessionRecord = this.certificateRecords.get(certificateHash);
      if (sessionRecord) {
        console.log('✅ Certificate found in current session!');
        return sessionRecord;
      }

      // Query blockchain for certificate records
      // Note: This queries recent events from the blockchain
      const events = await this.api.query.system.events();
      const verificationRecords: CertificateVerificationRecord[] = [];

      // Process events to find certificate verification records
      events.forEach((record: any) => {
        const { event } = record;
        if (this.api?.events.system.Remarked.is(event)) {
          try {
            const remarkHex = event.data[0];
            const remarkStr = new TextDecoder().decode(remarkHex);
            
            // Check if this is a POLKADOT_CERT remark
            if (remarkStr.startsWith('POLKADOT_CERT:')) {
              const jsonStr = remarkStr.substring('POLKADOT_CERT:'.length);
              const certificateData: CertificateData = JSON.parse(jsonStr);
              
              if (certificateData.certificateHash === certificateHash) {
                const verificationRecord: CertificateVerificationRecord = {
                  certificateHash: certificateData.certificateHash,
                  certificateName: certificateData.certificateName,
                  certificateType: certificateData.certificateType,
                  issuer: certificateData.issuer,
                  recipient: certificateData.recipient,
                  issueDate: certificateData.issueDate,
                  expiryDate: certificateData.expiryDate,
                  status: 'verified',
                  blockNumber: 'recent',
                  transactionHash: 'from_blockchain_events',
                  parachain: this.currentNetwork,
                  metadata: certificateData.metadata
                };
                verificationRecords.push(verificationRecord);
              }
            }
          } catch (e) {
            // Skip records that can't be parsed
          }
        }
      });

      // If found in blockchain events, store in session and return
      if (verificationRecords.length > 0) {
        const record = verificationRecords[verificationRecords.length - 1];
        this.certificateRecords.set(certificateHash, record);
        console.log('✅ Certificate found on blockchain!');
        return record;
      }

      console.log('❌ Certificate not found in recent blockchain events.');
      console.log('💡 Note: Only recent transactions (~last 100 blocks) can be queried via RPC.');
      console.log('💡 For older certificates, use a blockchain explorer with the transaction hash.');
      return null;
    } catch (error) {
      console.error('❌ Error verifying certificate on blockchain:', error);
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

  getCurrentNetwork() {
    return this.currentNetwork;
  }

  getAllCertificates(): CertificateVerificationRecord[] {
    // Returns certificates from current session only
    // For full history, query blockchain explorer or use indexing service
    return Array.from(this.certificateRecords.values()).sort((a, b) => {
      const timeA = a.metadata?.timestamp || 0;
      const timeB = b.metadata?.timestamp || 0;
      return timeB - timeA; // Most recent first
    });
  }

  async disconnect() {
    if (this.api) {
      await this.api.disconnect();
      this.api = null;
    }
    this.selectedAccount = null;
    this.accounts = [];
  }
}
