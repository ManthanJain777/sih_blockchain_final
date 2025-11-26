# Polkadot Certificate Verification System - Usage Guide

## Overview
This is a fully functional decentralized certificate verification system built on the Polkadot Relay Chain. The system enables you to upload, store, and verify certificates with permanent, immutable records on the blockchain.

## Prerequisites

### 1. Polkadot.js Extension
- Install the [Polkadot.js browser extension](https://polkadot.js.org/extension/)
- Available for Chrome, Firefox, and Brave browsers
- Create or import a Polkadot account

### 2. Polkadot Account Funding
- You need a small amount of DOT tokens to pay for transaction fees
- Approximately 0.01-0.1 DOT should be sufficient for testing
- You can get testnet tokens from faucets if testing on Paseo testnet

## Getting Started

### Step 1: Launch the Application
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000`

### Step 2: Connect Your Wallet
1. Click the **"Connect Wallet"** button in the top-right header
2. The Polkadot.js extension will prompt you to authorize the connection
3. Select the account you want to use
4. Once connected, you'll see your account name and a green "Connected" status

### Step 3: Network Selection
- The system defaults to the **Polkadot Relay Chain**
- You can switch networks using the network selector dropdown
- Supported networks:
  - **Polkadot** (Recommended - Main relay chain)
  - Kusama
  - Acala
  - Astar
  - Moonbeam
  - Statemint
  - Paseo (Testnet)

## Certificate Upload Workflow

### 1. Navigate to Certificate Upload
- Click **"Certificate"** in the navigation menu
- Or click **"Start Verifying"** on the home page

### 2. Upload Certificate File
- Click the **"Select"** button or use the file input
- Supported formats: PDF, JPG, JPEG, PNG, DOC, DOCX
- The system will automatically generate a SHA256 hash

### 3. Fill in Certificate Metadata
Required fields:
- **Certificate Type**: Select from dropdown (Academic Degree, Professional Certificate, etc.)
- **Issuing Organization**: Name of the institution that issued the certificate
- **Recipient Name**: Name of the certificate holder
- **Issue Date**: When the certificate was issued

Optional fields:
- **Expiry Date**: When the certificate expires (if applicable)

### 4. Submit to Blockchain
- Click **"Upload Certificate to Polkadot Blockchain"**
- The Polkadot.js extension will prompt you to sign the transaction
- Review the transaction fee and click **"Sign and Submit"**
- Wait for the transaction to be included in a block (usually 6-12 seconds)

### 5. Confirmation
- You'll see a success message with:
  - Certificate hash
  - Transaction hash
  - Block number
  - All metadata details
- The certificate is now permanently stored on the blockchain!

## Certificate Verification Workflow

### 1. Navigate to Verification
- Click **"Verify"** in the navigation menu

### 2. Enter Certificate Hash
- Paste the SHA256 hash of the certificate you want to verify
- The hash is a 64-character hexadecimal string

### 3. Verify
- Click the **"Verify"** button
- The system will:
  1. Check local storage for recently uploaded certificates
  2. Query the Polkadot blockchain for matching records

### 4. View Results
If found, you'll see:
- ✅ Verification status
- Certificate name and type
- Issuer and recipient information
- Issue and expiry dates
- Block number and transaction hash
- Network where it was stored
- Expiry status (if applicable)

## Transaction History

### View All Certificates
- Click **"Transactions"** in the navigation menu
- See all certificates you've uploaded with:
  - Certificate names and hashes
  - Transaction hashes
  - Block numbers
  - Timestamps
  - Network information
  - Status indicators

### Search and Filter
- Use the search bar to find specific certificates
- Search by certificate name, hash, or transaction ID
- View statistics:
  - Total certificates
  - Verified count
  - Recent uploads (last 30 days)
  - Networks used

## Important Technical Details

### Data Storage Architecture
The system uses a **dual storage approach**:

1. **Blockchain Storage**: 
   - Certificate metadata is stored on the Polkadot Relay Chain using `system.remark` extrinsics
   - Data is permanently recorded and immutable
   - Tagged with prefix `POLKADOT_CERT:` for easy identification

2. **Local Storage**:
   - Certificates are cached in browser localStorage
   - Enables instant verification without blockchain queries
   - Persists across browser sessions
   - Automatically synced when you upload new certificates

### Why Both Storage Methods?
- **Blockchain**: Provides immutability, transparency, and permanent proof
- **Local Cache**: Enables fast verification and reduces blockchain query costs
- **Note**: Blockchain queries via RPC only return recent events (~100 blocks), so local storage ensures you can always verify your certificates

### Transaction Fees
- Each certificate upload requires a small transaction fee (typically 0.01-0.05 DOT)
- Fees go to Polkadot validators securing the network
- Verification is free (no transaction required)

### Certificate Hash Generation
- Uses SHA256 algorithm (industry standard)
- The hash is unique to the file contents
- Any change to the file produces a completely different hash
- This ensures tamper-proof verification

## Common Use Cases

### 1. Academic Institutions
- Universities can upload degree certificates
- Students can verify their credentials
- Employers can authenticate qualifications

### 2. Professional Certifications
- Training organizations can issue certificates
- Professionals can prove their certifications
- Clients can verify credentials instantly

### 3. License Verification
- Regulatory bodies can issue licenses
- License holders can share verification links
- Anyone can verify license authenticity

### 4. Awards and Achievements
- Organizations can issue achievement certificates
- Recipients can prove their accomplishments
- Public verification of merits

## Troubleshooting

### Wallet Connection Issues
**Problem**: Can't connect Polkadot.js extension
- Ensure the extension is installed and unlocked
- Refresh the page and try again
- Check that you've created at least one account

**Problem**: Transaction fails
- Check that you have sufficient DOT balance
- Ensure your account has at least 0.1 DOT for fees
- Try switching to a less congested network time

### Certificate Upload Issues
**Problem**: Upload button is disabled
- Ensure your wallet is connected (check header status)
- Verify all required fields are filled
- Check that a file is selected

**Problem**: Transaction pending for too long
- Network congestion can delay transactions
- Wait up to 2 minutes for inclusion
- Check Polkadot block explorer for transaction status

### Verification Issues
**Problem**: Certificate not found
- If you just uploaded it, wait 30 seconds and try again
- Ensure you're using the correct hash (64 hexadecimal characters)
- Check that you're on the same network where it was uploaded
- Note: Very old transactions may only be in local storage

**Problem**: Local storage cleared
- Browser cache clearing removes local certificates
- They're still on the blockchain but may not be queryable via RPC
- Consider exporting certificate details after upload

## Best Practices

### Security
1. **Backup Certificate Hashes**: Save certificate hashes in a secure location
2. **Use Strong Passwords**: Protect your Polkadot wallet with a strong password
3. **Verify Extensions**: Only use official Polkadot.js extension
4. **Test First**: Use testnet (Paseo) before mainnet production use

### Data Management
1. **Export Records**: Download or screenshot certificate verification results
2. **Organize Certificates**: Use clear, descriptive file names
3. **Maintain Metadata**: Keep accurate issuer and recipient information
4. **Set Expiry Dates**: Add expiry dates for time-limited certificates

### Network Selection
1. **Use Polkadot for Production**: Most secure and decentralized
2. **Use Paseo for Testing**: Free testnet for development
3. **Consider Parachains**: May offer specialized features
4. **Check Transaction Costs**: Different networks have different fees

## Advanced Features

### Export Certificate Data
You can export verification results:
1. Navigate to transaction history
2. Use browser dev tools to access localStorage
3. Key: `polkadot_certificates`
4. Value: JSON array of all certificates

### Verify on Block Explorers
You can verify transactions on Polkadot block explorers:
1. Copy the transaction hash from verification results
2. Visit https://polkadot.subscan.io/
3. Paste the transaction hash
4. View the raw blockchain data including your certificate remark

### Multi-Account Management
- Switch between accounts using the account dropdown
- Each account has its own transaction history
- Certificates are network-specific, not account-specific

## API and Integration

### Certificate Data Format
```json
{
  "certificateHash": "abc123...",
  "certificateName": "Bachelor Degree.pdf",
  "certificateType": "Academic Degree",
  "issuer": "University Name",
  "recipient": "John Doe",
  "issueDate": "2024-01-15",
  "expiryDate": "2029-01-15",
  "metadata": {
    "blockHash": "0x...",
    "timestamp": 1705334400000
  }
}
```

### Verification Record Format
```json
{
  "certificateHash": "abc123...",
  "status": "verified",
  "blockNumber": 12345678,
  "transactionHash": "0x...",
  "parachain": "polkadot",
  ...
}
```

## Support and Resources

### Documentation
- [Polkadot Documentation](https://wiki.polkadot.network/)
- [Polkadot.js API Docs](https://polkadot.js.org/docs/)

### Community
- [Polkadot Forum](https://forum.polkadot.network/)
- [Polkadot Discord](https://discord.gg/polkadot)

### Block Explorers
- [Subscan](https://polkadot.subscan.io/)
- [Polkadot.js Apps](https://polkadot.js.org/apps/)

## Frequently Asked Questions

**Q: Can I delete a certificate from the blockchain?**
A: No, blockchain data is immutable. Once uploaded, it's permanent.

**Q: What happens if I lose the certificate hash?**
A: Check your transaction history or local storage. Hashes are also visible on block explorers.

**Q: Can others see my certificates?**
A: Yes, blockchain data is public. Don't upload sensitive personal information.

**Q: How long do certificates remain valid?**
A: Forever, unless you specified an expiry date. The blockchain data never expires.

**Q: Can I update certificate information?**
A: No, you must upload a new certificate. The old one remains on-chain.

**Q: What's the maximum certificate file size?**
A: Only the hash and metadata are stored on-chain, so file size doesn't matter. However, browser file upload limits may apply (typically up to 100MB).

## Conclusion

This certificate verification system provides a robust, decentralized solution for proving the authenticity of certificates. By leveraging the Polkadot Relay Chain, you get:

- ✅ Permanent, immutable records
- ✅ Transparent verification
- ✅ No central authority required
- ✅ Global accessibility
- ✅ Low transaction costs

Start verifying your certificates on the blockchain today!
