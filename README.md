# NFT Minting Frontend

A React-based frontend for minting and displaying NFTs, integrated with a Web3 smart contract and backend API.

## 🔗 Live Links

- **Frontend Deployment**: [https://cytric-assessment-frontend.vercel.app/](https://cytric-assessment-frontend.vercel.app/)
- **Backend API**: [https://cytric-assessment-backend.onrender.com](https://cytric-assessment-backend.onrender.com)
- **API Documentation**: [Swagger UI](https://cytric-assessment-backend.onrender.com/api/)
- **Demo Video**: [Loom Walkthrough](https://www.loom.com/share/38977d18abbf42c5bdfb4fda16e9a5b1?sid=9481f3ad-5082-4333-95b6-ff7399147acc)

## 🛠️ API Routes

### Store NFT Data

```http
POST /nfts
```

**Parameters**:

```json
{
  "name": "string",
  "description": "string",
  "logoUrl": "string",
  "nftId": number,
  "userWalletAddress": "string"
}
```

### Get NFT Data by ID

```http
GET /nfts/{nftId}
```

### Get NFT Gallery by Wallet

```http
GET /nfts/user/{walletAddress}
```

## 📚 Related Repositories

- **Backend Source Code**: [cytric-assessment-backend](https://github.com/wisdomsGit21/cytric-assessment-backend)

## 🚀 Features

- Wallet connection using RainbowKit
- NFT minting with form validation
- Responsive NFT gallery
- Real-time transaction status updates
- Error handling and loading states

## ⚙️ Development Setup

1. Clone repository

```bash
git clone https://github.com/your-username/frontend-repo.git
```

2. Install dependencies

```bash
npm install
```

3. Start development server

```bash
npm run dev
```

## 🌐 Environment Variables

Create `.env` file:

```env
VITE_API_URL=https://cytric-assessment-backend.onrender.com
VITE_CONTRACT_ADDRESS=0x743f4...............................
VITE_PROJECT_ID=dda2c7...................................
```

## 📄 License

MIT License
