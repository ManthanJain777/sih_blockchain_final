import { ApiPromise, WsProvider } from '@polkadot/api';
import { getNetworkEndpoints, NetworkConfig } from './NetworkConfig';

export interface ConnectionOptions {
  maxReconnect?: number;
  timeout?: number;
  connectionTimeout?: number;
}

export class ConnectionManager {
  private static instance: ConnectionManager | null = null;
  private api: ApiPromise | null = null;
  
  public static getInstance(): ConnectionManager {
    if (!ConnectionManager.instance) {
      ConnectionManager.instance = new ConnectionManager();
    }
    return ConnectionManager.instance;
  }

  // Create API connection with fallback to alternative endpoints
  public async connectWithFallback(
    network: string, 
    options: ConnectionOptions = { maxReconnect: 5, timeout: 30000, connectionTimeout: 10000 }
  ): Promise<ApiPromise> {
    const networkConfigs = getNetworkEndpoints();
    const networkConfig: NetworkConfig | undefined = networkConfigs[network];
    
    if (!networkConfig) {
      throw new Error(`Network configuration not found for: ${network}`);
    }

    // Create array of endpoints to try (primary + fallback)
    const endpoints = [networkConfig.endpoints.primary, ...networkConfig.endpoints.fallback];
    
    for (const endpoint of endpoints) {
      try {
        console.log(`Attempting connection to: ${endpoint}`);
        
        // Configure provider with connection options
        const provider = new WsProvider(
          endpoint // Use single endpoint
        );
        
        this.api = await ApiPromise.create({
          provider,
          throwOnConnect: false, // Don't throw immediately if connection fails
        });

        // Wait for the API to be ready or timeout after specified time
        await Promise.race([
          this.api.isReady,
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Connection timeout')), options.connectionTimeout)
          )
        ]);

        console.log(`✅ Successfully connected to: ${endpoint}`);
        return this.api;
      } catch (error) {
        console.error(`❌ Failed to connect to: ${endpoint}`, error.message || error);
        // Continue to next endpoint
      }
    }

    throw new Error(`Failed to connect to any of the provided endpoints for ${network}: ${endpoints.join(', ')}`);
  }

  public getApi(): ApiPromise | null {
    return this.api;
  }

  public async disconnect(): Promise<void> {
    if (this.api) {
      await this.api.disconnect();
      this.api = null;
    }
  }
  
  public isConnected(): boolean {
    return this.api !== null && this.api.isConnected;
  }
}