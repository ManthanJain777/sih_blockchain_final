# 🚀 Quick Start Guide - Polkadot Certificate Verification

## 📋 Prerequisites (5 minutes)

1. **Install Polkadot.js Extension**
   - Chrome: https://chrome.google.com/webstore (search "Polkadot.js")
   - Firefox: https://addons.mozilla.org (search "Polkadot.js")
   - Create a new account or import existing

2. **Get DOT Tokens**
   - **Testnet (Free)**: Use Paseo testnet faucet
   - **Mainnet**: Buy DOT on exchange, send to wallet (~0.5 DOT recommended)

## ⚡ Quick Start (2 minutes)

### Step 1: Launch App
```bash
npm install
npm run dev
```
Open: http://localhost:3000

### Step 2: Connect Wallet
1. Click **"Connect Wallet"** (top-right)
2. Approve in Polkadot.js extension
3. See green "Connected" status

### Step 3: Upload Certificate
1. Click **"Certificate"** in menu
2. Click **"Select"** → Choose file
3. Fill in:
   - Type: Academic Degree / Professional / etc.
   - Issuer: Organization name
   - Recipient: Person name
   - Issue Date: When issued
4. Click **"Upload Certificate to Polkadot Blockchain"**
5. **Sign transaction** in wallet popup
6. Wait ~10 seconds

### Step 4: Save Transaction Info
📝 **CRITICAL**: Screenshot or save:
- ✅ Certificate Hash (64 hex characters)
- ✅ Transaction Hash (0x...)
- ✅ Block Number (#12345...)

### Step 5: Verify Certificate
1. Click **"Verify"** in menu
2. Paste certificate hash
3. Click **"Verify"**
4. View complete details!

## 📊 What Gets Stored on Blockchain

```json
{
  "certificateHash": "abc123...",
  "certificateName": "degree.pdf",
  "certificateType": "Academic Degree",
  "issuer": "University Name",
  "recipient": "John Doe",
  "issueDate": "2024-01-15",
  "expiryDate": "2029-01-15",
  "blockNumber": 12345678,
  "transactionHash": "0x..."
}
```

## 🔍 Verification Options

### Option 1: In-App (Recent Only)
- Verify page → Enter hash → Click Verify
- Works for ~last 100 blocks

### Option 2: Blockchain Explorer (All Time)
1. Visit: https://polkadot.subscan.io/
2. Paste transaction hash
3. View certificate data in remark
4. **Works forever!**

## 💰 Costs

| Network | Upload | Verify |
|---------|--------|--------|
| Paseo (Testnet) | FREE | FREE |
| Polkadot (Mainnet) | ~0.01-0.05 DOT | FREE |

## ⚠️ Important Notes

### ✅ DO
- Save transaction hashes immediately
- Screenshot confirmation page
- Test on testnet first
- Verify upload succeeded

### ❌ DON'T
- Include sensitive personal info (SSN, etc.)
- Forget to save transaction hash
- Close browser before saving info
- Upload without verifying DOT balance

## 🔗 Essential Links

| Resource | URL |
|----------|-----|
| Polkadot Explorer | https://polkadot.subscan.io/ |
| Polkadot.js Apps | https://polkadot.js.org/apps/ |
| Wallet Extension | https://polkadot.js.org/extension/ |
| Documentation | See BLOCKCHAIN_STORAGE.md |

## 🆘 Troubleshooting

### Can't Connect Wallet?
```
1. Install Polkadot.js extension
2. Create/unlock account
3. Refresh page
4. Click "Connect Wallet" again
```

### Transaction Failed?
```
1. Check DOT balance (need ~0.1 DOT)
2. Wait 30 seconds, try again
3. Switch to less busy time
4. Check network status
```

### Can't Verify Certificate?
```
1. Check hash is correct (64 characters)
2. Try blockchain explorer instead
3. Use transaction hash lookup
4. Certificate may be older than 100 blocks
```

## 📝 Quick Commands

```bash
# Install
npm install

# Development
npm run dev

# Build for production
npm run build

# Check logs
Open browser console (F12)
```

## 🎯 Common Use Cases

### Academic Certificates
```
Type: Academic Degree
Issuer: University of California
Recipient: Jane Smith
Issue Date: 2024-05-15
Expiry: Never (leave blank)
```

### Professional License
```
Type: License
Issuer: Medical Board
Recipient: Dr. John Doe
Issue Date: 2024-01-01
Expiry: 2026-12-31
```

### Training Certificate
```
Type: Professional Certificate
Issuer: Tech Academy
Recipient: Alice Johnson
Issue Date: 2024-03-20
Expiry: 2025-03-20
```

## 📦 File Formats Supported

✅ PDF (.pdf)  
✅ JPG/JPEG (.jpg, .jpeg)  
✅ PNG (.png)  
✅ DOC/DOCX (.doc, .docx)  

**Note:** Only hash stored on-chain, not actual file!

## 🎓 Learning Path

1. **Read This** → Quick Start (you are here!)
2. **Try It** → Upload test certificate on Paseo
3. **Verify** → Check certificate verification
4. **Explore** → View on blockchain explorer
5. **Deep Dive** → Read BLOCKCHAIN_STORAGE.md
6. **Deploy** → Use on mainnet

## ⏱️ Time Estimates

| Task | Time |
|------|------|
| Setup wallet | 5 min |
| First upload | 2 min |
| Verification | 30 sec |
| Per certificate | 1 min |

## 🌟 Pro Tips

1. **Keep a Spreadsheet**: Track all transaction hashes
2. **Use QR Codes**: Generate for easy sharing
3. **Test First**: Always use testnet before mainnet
4. **Screenshot Everything**: Confirmation pages are important
5. **Batch Process**: Upload multiple at once during quiet hours

## 🎉 Success Checklist

After successful upload, you should have:
- ✅ Certificate uploaded
- ✅ Green success message
- ✅ Transaction hash saved
- ✅ Certificate hash noted
- ✅ Block number recorded
- ✅ Screenshot taken
- ✅ Verification tested

## 🚨 Emergency Recovery

**Lost Transaction Hash?**
1. Check browser console logs (F12 → Console)
2. Look for transaction in wallet history
3. Check Polkadot.js Apps → Accounts → Recent
4. Contact support with approximate time/date

**Browser Crashed?**
- All data is on blockchain (safe!)
- Just need transaction hash to verify
- Use blockchain explorer for lookup

## 📞 Need Help?

1. Check console logs (F12)
2. Read full documentation
3. Test on testnet
4. Verify wallet is connected
5. Check DOT balance

## 🎯 Remember

> **Your data lives on the blockchain forever!**
> 
> No servers, no databases, no single point of failure.
> Just permanent, decentralized, immutable records.

## ⚡ One-Liner Summary

```
Upload → Hash → Blockchain → Verify → Forever
```

That's it! You're ready to use the Polkadot Certificate Verification System! 🚀

---

**Next Steps:**
- [ ] Install Polkadot.js extension
- [ ] Get testnet tokens
- [ ] Upload first certificate
- [ ] Verify it works
- [ ] Read BLOCKCHAIN_STORAGE.md for details
- [ ] Deploy to production

**Questions?** Check the full documentation in USAGE_GUIDE.md
