# 🎵 Music Collab - Decentralized Music Collaboration Platform

A full-stack decentralized application (dApp) built on the Internet Computer Protocol (ICP) that enables musicians and artists to collaborate in real-time, mint NFTs, manage royalties, and participate in decentralized governance.

## 🌟 Key Features

### 🎼 Project Management
- **Create Music Projects**: Musicians can create new collaborative projects with titles, descriptions, and metadata
- **Project Ownership**: Secure ownership management with Internet Identity authentication
- **Contributor Management**: Add and manage contributors to collaborative projects
- **Project Discovery**: Browse and discover music projects created by the community

### 🎧 Track Collaboration
- **Track Upload**: Upload music tracks with IPFS integration for decentralized storage
- **Version Control**: Track different versions and iterations of musical compositions
- **Collaborative Editing**: Real-time collaboration features for music creation
- **Track Management**: Organize and manage tracks within projects

### 🎨 NFT Marketplace
- **NFT Minting**: Convert music projects and tracks into NFTs
- **Marketplace**: Buy, sell, and trade music NFTs
- **Custom Metadata**: Rich metadata support for music NFTs including artwork and descriptions
- **Price Discovery**: Market-driven pricing for music NFTs

### 💰 Royalty Management
- **Revenue Distribution**: Automatic royalty distribution among contributors
- **Smart Contracts**: Transparent and automated payment systems
- **Contributor Rewards**: Fair compensation based on contribution levels
- **Analytics**: Track earnings and royalty distributions

### 🏛️ Decentralized Governance
- **Community Voting**: Participate in platform governance decisions
- **Proposal System**: Submit and vote on platform improvements
- **Transparent Decision Making**: All governance actions recorded on-chain

### 🔐 Authentication & Security
- **Internet Identity**: Secure authentication using ICP's Internet Identity
- **Decentralized Storage**: IPFS integration for secure file storage
- **On-chain Data**: All critical data stored on the Internet Computer blockchain

## 🏗️ Architecture

### Backend (Rust/IC CDK)
```
src/music-collab-backend/
├── src/
│   └── lib.rs              # Main canister logic
├── Cargo.toml              # Rust dependencies
└── music-collab-backend.did # Candid interface
```

**Core Data Structures:**
- `MusicProject`: Project metadata, contributors, tracks
- `Track`: Music file references, IPFS hashes, timestamps
- `NFTMetadata`: NFT information, pricing, ownership
- `RoyaltyDistribution`: Payment and revenue sharing

### Frontend (React/Vite)
```
src/music-collab-frontend/
├── src/
│   ├── App.jsx             # Main application component
│   ├── components/         # React components
│   │   ├── ProjectForm.jsx      # Create new projects
│   │   ├── ProjectList.jsx      # Browse projects
│   │   ├── ProjectDetail.jsx    # Project details view
│   │   ├── TrackUpload.jsx      # Upload music tracks
│   │   ├── TrackList.jsx        # Display tracks
│   │   ├── NFTMarketplace.jsx   # NFT trading
│   │   ├── MintNFTModal.jsx     # NFT creation
│   │   ├── CollaborationHub.jsx # Real-time collaboration
│   │   ├── ChatWindow.jsx       # Communication
│   │   ├── SessionManager.jsx   # Collaboration sessions
│   │   ├── RoyaltyManager.jsx   # Revenue management
│   │   └── Navigation.jsx       # App navigation
│   └── services/
│       └── auth.js         # Internet Identity integration
└── package.json
```

## 🔧 Technical Stack

- **Blockchain**: Internet Computer Protocol (ICP)
- **Backend**: Rust with IC CDK
- **Frontend**: React 18 with Vite
- **Authentication**: Internet Identity
- **Storage**: IPFS for decentralized file storage
- **Styling**: Modern CSS with responsive design
- **Build Tool**: Vite for fast development and building

## 🚀 Getting Started

### Prerequisites
- Node.js (>= 16.0.0)
- NPM (>= 7.0.0)
- DFX (DFINITY Canister SDK)
- Rust (for backend development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd music-collab
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start local ICP environment**
   ```bash
   dfx start --clean --background
   ```

4. **Deploy canisters**
   ```bash
   dfx deploy
   ```

5. **Start frontend development server**
   ```bash
   npm start
   ```

### Development Commands

```bash
# Build all packages
npm run build

# Run tests
npm test

# Deploy backend canister
dfx deploy music-collab-backend

# Deploy frontend canister
dfx deploy music-collab-frontend

# Check canister status
dfx ping

# Generate candid interface
dfx generate music-collab-backend
```

## 📁 Project Structure

```
music-collab/
├── dfx.json                    # DFX configuration
├── package.json               # Root package configuration
├── tsconfig.json              # TypeScript configuration
├── webpack.config.js          # Webpack configuration
├── canister_ids.json          # Canister deployment IDs
├── src/
│   ├── declarations/          # Generated canister interfaces
│   ├── music-collab-backend/  # Rust backend canister
│   └── music-collab-frontend/ # React frontend application
└── README.md                  # This file
```

## 🎯 Use Cases

1. **Independent Musicians**: Create projects, collaborate with other artists, and monetize through NFTs
2. **Record Labels**: Manage multiple artists and projects with transparent royalty distribution
3. **Music Producers**: Collaborate on beats and productions with automatic attribution
4. **Music Collectors**: Discover and collect unique music NFTs from emerging artists
5. **Music Communities**: Participate in governance and shape the platform's future

## 🔐 Security Features

- **Decentralized Authentication**: No passwords, secure Internet Identity
- **On-chain Ownership**: Immutable ownership records on ICP blockchain
- **IPFS Storage**: Decentralized file storage prevents single points of failure
- **Smart Contract Automation**: Trustless royalty distribution and NFT management

## 🌐 Deployment

The application is deployed on the Internet Computer Protocol:

- **Backend Canister**: Handles all business logic and data storage
- **Frontend Canister**: Serves the React application
- **Asset Canister**: Manages static assets and media files

## 📈 Future Roadmap

- [ ] Real-time audio collaboration tools
- [ ] Advanced music mixing and editing features
- [ ] Integration with music streaming platforms
- [ ] Mobile application development
- [ ] Cross-chain NFT compatibility
- [ ] Advanced analytics and insights
- [ ] AI-powered music recommendations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Join our community discussions
- Check the documentation

---

**Built with ❤️ for the decentralized music community**

Which will start a server at `http://localhost:8080`, proxying API requests to the replica at port 4943.

### Note on frontend environment variables

If you are hosting frontend code somewhere without using DFX, you may need to make one of the following adjustments to ensure your project does not fetch the root key in production:

- set`DFX_NETWORK` to `ic` if you are using Webpack
- use your own preferred method to replace `process.env.DFX_NETWORK` in the autogenerated declarations
  - Setting `canisters -> {asset_canister_id} -> declarations -> env_override to a string` in `dfx.json` will replace `process.env.DFX_NETWORK` with the string in the autogenerated declarations
- Write your own `createActor` constructor
