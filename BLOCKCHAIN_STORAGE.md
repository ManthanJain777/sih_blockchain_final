# Blockchain-Only Storage Architecture

## Overview
This certificate verification system stores **ALL data directly on the Polkadot Relay Chain** with no local storage dependencies. Every certificate and its metadata is permanently recorded on the blockchain.

## How It Works

### 1. Certificate Upload
When you upload a certificate:
```
Certificate File → SHA256 Hash → Metadata + Hash → Polkadot Blockchain
```

**What gets stored on-chain:**
- Certificate hash (SHA256)
- Certificate name
- Certificate type
- Issuer organization
- Recipient name
- Issue date
- Expiry date (if applicable)
- Additional metadata

**Format on blockchain:**
```
system.remark("POLKADOT_CERT:{json_data}")
```

### 2. Blockchain Transaction
Every certificate upload creates a transaction:
- **Extrinsic**: `system.remark` with certificate data
- **Cost**: Small transaction fee (~0.01-0.05 DOT)
- **Finality**: ~6-12 seconds
- **Permanence**: Forever (immutable)

### 3. Verification Process
To verify a certificate:
1. System queries recent blockchain events
2. Searches for `POLKADOT_CERT:` remarks
3. Matches certificate hash
4. Returns complete certificate data

**Important:** RPC queries only return recent events (~last 100 blocks). For older certificates, you need:
- The transaction hash (provided on upload)
- A blockchain explorer (e.g., Subscan)

## Storage Details

### What is Stored
✅ **On Blockchain:**
- Certificate hash
- All metadata (issuer, recipient, dates, etc.)
- Block number
- Transaction hash
- Timestamp

❌ **NOT Stored:**
- Actual certificate files (only hash)
- Local browser data (no localStorage)
- Any off-chain data

### Session Memory
The system keeps uploaded certificates in **session memory only** for:
- Displaying transaction history during current session
- Quick verification of just-uploaded certificates
- Better user experience

**Note:** Session memory is cleared when you:
- Close the browser tab
- Refresh the page
- Disconnect wallet

## Certificate Verification

### Recent Certificates (Last ~100 Blocks)
✅ Can be verified directly via RPC query
✅ System automatically retrieves from blockchain
✅ Instant verification

### Older Certificates
For certificates older than ~100 blocks:
1. Use the **transaction hash** (saved during upload)
2. Visit a blockchain explorer:
   - [Polkadot Subscan](https://polkadot.subscan.io/)
   - [Polkadot.js Apps](https://polkadot.js.org/apps/)
3. Search for the transaction hash
4. View the certificate data in the remark

### Why This Limitation?
- RPC nodes only expose recent events by default
- Full historical queries require:
  - Indexing services
  - Archive nodes
  - Blockchain explorers

## Data Permanence

### ✅ Permanent Storage
- All certificates are **permanently stored** on Polkadot
- **Cannot be deleted or modified** (immutable)
- **Globally accessible** by anyone with the hash
- **Survives** browser crashes, device changes, etc.

### 📋 How to Keep Track
**Important:** Save these details after uploading:
1. **Certificate Hash** (for verification)
2. **Transaction Hash** (for blockchain explorer lookup)
3. **Block Number** (for reference)

**Recommended:** 
- Screenshot the confirmation page
- Save transaction details in a spreadsheet
- Export transaction hashes to a text file

## Blockchain Explorers

### Using Subscan
1. Visit https://polkadot.subscan.io/
2. Paste your transaction hash in search
3. View transaction details
4. Find the `system(Remarked)` event
5. View the certificate data in the remark

### Using Polkadot.js Apps
1. Visit https://polkadot.js.org/apps/
2. Go to Network → Explorer
3. Search for the block number
4. Find your transaction
5. View the remark data

## Advantages

### ✅ True Decentralization
- No central database
- No single point of failure
- No dependency on any server

### ✅ Immutability
- Cannot be altered after submission
- Permanent proof of existence
- Tamper-proof records

### ✅ Transparency
- All data publicly verifiable
- Anyone can verify certificates
- No hidden changes possible

### ✅ Global Accessibility
- Access from anywhere in the world
- No account required to verify
- Works on any blockchain-connected device

## Important Considerations

### ⚠️ Public Data
**All blockchain data is PUBLIC:**
- Anyone can see certificate metadata
- Don't include sensitive personal information
- Use general identifiers when possible

**Example:**
- ✅ Good: "Student ID: 12345"
- ❌ Bad: "SSN: 123-45-6789"

### ⚠️ Immutability
**Cannot delete or edit:**
- Once uploaded, data is permanent
- No way to remove or modify
- Think carefully before uploading

### ⚠️ Transaction Costs
**Each upload costs DOT:**
- Small fee per transaction
- Paid to network validators
- Cannot be refunded

### ⚠️ Recent Verification Only
**RPC limitations:**
- Only recent certificates (~100 blocks) via direct query
- Older certificates need transaction hash
- Consider keeping a personal database of uploaded certificates

## Best Practices

### 1. Record Keeping
After each upload, save:
```json
{
  "certificateName": "Bachelor_Degree.pdf",
  "certificateHash": "abc123...",
  "transactionHash": "0x...",
  "blockNumber": 12345678,
  "uploadDate": "2024-01-15",
  "network": "polkadot"
}
```

### 2. Verification Links
Create shareable verification links:
```
https://polkadot.subscan.io/extrinsic/[transaction_hash]
```

### 3. Batch Uploads
If uploading multiple certificates:
- Keep a spreadsheet of all transaction hashes
- Upload during low-traffic times (lower fees)
- Verify each upload completes successfully

### 4. Testing
Before mainnet production:
- Test on Paseo testnet first
- Verify the complete workflow
- Ensure you understand the process

## Integration with Blockchain Explorers

### Automated Lookup
You can programmatically query explorers:

**Subscan API:**
```javascript
fetch('https://polkadot.subscan.io/api/scan/extrinsic', {
  method: 'POST',
  body: JSON.stringify({
    hash: 'your_transaction_hash'
  })
})
```

### QR Codes
Generate QR codes for easy verification:
```javascript
const verificationUrl = `https://polkadot.subscan.io/extrinsic/${txHash}`;
// Generate QR code with this URL
```

## Alternative Approaches (Future)

### For Better Historical Queries:
1. **Indexing Service**: Deploy a dedicated indexer that tracks all certificate remarks
2. **Archive Node**: Run your own archive node with full history
3. **Subquery**: Use SubQuery to index certificate data
4. **Hybrid Storage**: Combine blockchain + IPFS for file storage

### For Large-Scale Deployments:
1. **Custom Pallet**: Build a dedicated Substrate pallet for certificates
2. **Parachain**: Deploy on a specialized parachain
3. **Smart Contracts**: Use Moonbeam or Astar for smart contract logic

## Frequently Asked Questions

**Q: Can I retrieve very old certificates?**
A: Yes, but you need the transaction hash. Use a blockchain explorer.

**Q: What if I lose the transaction hash?**
A: You'll need to query the blockchain directly or use an indexing service.

**Q: How long are certificates stored?**
A: Forever. Blockchain data is permanent.

**Q: Can I bulk export all my certificates?**
A: Only from the current session. For full history, query the blockchain or keep personal records.

**Q: Is there a better way to query old certificates?**
A: Yes, use blockchain explorers, indexing services, or run an archive node.

**Q: Why not store files on the blockchain?**
A: Blockchain storage is very expensive. Only hashes and metadata are stored.

## Summary

✅ **All data stored on Polkadot blockchain**  
✅ **Permanent, immutable records**  
✅ **No local storage dependencies**  
✅ **Recent certificates verifiable via RPC**  
✅ **Older certificates accessible via explorers**  

📝 **Remember:** Save transaction hashes for easy lookup later!

🔗 **Key Tools:**
- Polkadot Subscan: https://polkadot.subscan.io/
- Polkadot.js Apps: https://polkadot.js.org/apps/

The blockchain is your permanent, decentralized database. Keep your transaction hashes safe!
