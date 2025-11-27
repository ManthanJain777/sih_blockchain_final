# Polkadot Certificate Verification System

A comprehensive blockchain-based certificate verification system using Polkadot Relay Chain technology that enables users to upload, store, and verify certificates with permanent, immutable records on the Polkadot network.

## Features

- **Certificate Upload & Storage**: Securely upload certificate files (PDF, images, documents) to the Polkadot Relay Chain
- **Blockchain Integration**: Store certificate data directly on the Polkadot Relay Chain using system remarks
- **Certificate Verification**: Verify certificate authenticity by checking blockchain records
- **Multi-Network Support**: Primary focus on Polkadot Relay Chain with optional support for parachains
- **Transaction History**: View certificate transactions from current session
- **Blockchain-Only Storage**: All data stored permanently on the blockchain
- **Modern UI**: Responsive design with gradient backgrounds and organic shapes

## Tech Stack

- Frontend: React with TypeScript
- Blockchain: Polkadot.js API for blockchain interactions
- Wallet: Polkadot.js extension integration
- Styling: Tailwind CSS with gradient effects
- Icons: Lucide React icons

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   cd polkadot-certificate-verification
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Connect your Polkadot wallet using the Polkadot.js extension
2. Select a Polkadot network (mainnet or parachain)
3. Upload a certificate with required metadata (type, issuer, recipient, etc.)
4. Submit the certificate hash to the Polkadot blockchain
5. Receive transaction confirmation and verification proof
6. Verify certificates using their unique hashes anytime

## Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # UI components
│   └── ...              # Other components
├── pages/               # Page components
├── services/            # Blockchain services
└── interfaces/          # TypeScript interfaces
```

## How It Works

1. **Certificate Hashing**: The system uses SHA256 hashing to create unique fingerprints of certificates
2. **Blockchain Storage**: Certificate metadata is stored as immutable records on the Polkadot Relay Chain using system.remark extrinsics
3. **Permanent Storage**: All data stored directly on the blockchain with no local dependencies
4. **Verification**: Certificates are verified by querying the blockchain for recent transactions
5. **Transaction Tracking**: Current session certificates can be viewed in transaction history

All certificate data is permanently stored on the Polkadot blockchain, ensuring immutability and decentralization.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with Polkadot.js API
- Design inspired by modern UI/UX principles
- Thanks to the Polkadot ecosystem for enabling decentralized solutions"# polkadot_hackathon" 
"# polkadot_hackathon" 
"# polkadot_final" 
