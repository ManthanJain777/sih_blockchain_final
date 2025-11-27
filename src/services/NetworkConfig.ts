export interface NetworkEndpoints {
  primary: string;
  fallback: string[];
}

export interface NetworkConfig {
  name: string;
  endpoints: NetworkEndpoints;
  parachainId?: number;
}

export const getNetworkEndpoints = (): Record<string, NetworkConfig> => {
  return {
    polkadot: {
      name: 'Polkadot',
      endpoints: {
        primary: 'wss://rpc.polkadot.io',
        fallback: ['wss://polkadot.api.onfinality.io/public-ws']
      }
    },
    kusama: {
      name: 'Kusama',
      endpoints: {
        primary: 'wss://kusama-rpc.polkadot.io',
        fallback: ['wss://kusama.api.onfinality.io/public-ws']
      }
    },
    paseo: {
      name: 'Paseo (Testnet)',
      endpoints: {
        primary: 'wss://paseo.api.onfinality.io/public-ws',
        fallback: ['wss://paseo-rpc.publicnode.com']
      }
    },
    paseo_backup: {
      name: 'Paseo (Testnet) - Backup',
      endpoints: {
        primary: 'wss://paseo-rpc.publicnode.com',
        fallback: ['wss://paseo.api.onfinality.io/public-ws']
      }
    },
    acala: {
      name: 'Acala',
      endpoints: {
        primary: 'wss://acala-rpc.dwellir.com',
        fallback: ['wss://acala.api.onfinality.io/public-ws']
      }
    },
    astar: {
      name: 'Astar',
      endpoints: {
        primary: 'wss://astar-rpc.dwellir.com',
        fallback: ['wss://astar.api.onfinality.io/public-ws']
      }
    },
    moonbeam: {
      name: 'Moonbeam',
      endpoints: {
        primary: 'wss://wss.api.moonbeam.network',
        fallback: ['wss://moonbeam.public.blastapi.io']
      }
    },
    statemint: {
      name: 'Statemint',
      endpoints: {
        primary: 'wss://statemint-rpc.polkadot.io',
        fallback: ['wss://statemint.api.onfinality.io/public-ws']
      }
    }
  };
};

export type NetworkType = 'polkadot' | 'kusama' | 'acala' | 'astar' | 'moonbeam' | 'statemint' | 'paseo' | 'paseo_backup';

export const getDefaultNetwork = (): string => {
  return 'polkadot'; // Changed from paseo to polkadot for stable default connection
};