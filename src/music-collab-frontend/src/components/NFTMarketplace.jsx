import React, { useState } from 'react';
import NFTCard from './NFTCard';
import MintNFTModal from './MintNFTModal';
import './NFTMarketplace.css';

const NFTMarketplace = ({ nfts, projects, onRefresh, user }) => {
  const [showMintModal, setShowMintModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'owned', 'available'

  const handleMintNFT = async (nftData) => {
    try {
      // In a real implementation, this would call the backend to mint an NFT
      console.log('Minting NFT:', nftData);
      alert('NFT minting functionality will be implemented with smart contracts');
      setShowMintModal(false);
      onRefresh();
    } catch (error) {
      console.error('Error minting NFT:', error);
      alert('Failed to mint NFT');
    }
  };

  const filteredNFTs = nfts.filter(nft => {
    switch (filter) {
      case 'owned':
        return nft.creator === user?.principal;
      case 'available':
        return nft.creator !== user?.principal;
      default:
        return true;
    }
  });

  return (
    <div className="nft-marketplace">
      <div className="marketplace-header">
        <h2>🎵 Music NFT Marketplace</h2>
        <p>Discover, collect, and trade unique music NFTs</p>
      </div>

      <div className="marketplace-controls">
        <div className="filter-tabs">
          <button 
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All NFTs ({nfts.length})
          </button>
          <button 
            className={`filter-tab ${filter === 'owned' ? 'active' : ''}`}
            onClick={() => setFilter('owned')}
          >
            My NFTs ({nfts.filter(n => n.creator === user?.principal).length})
          </button>
          <button 
            className={`filter-tab ${filter === 'available' ? 'active' : ''}`}
            onClick={() => setFilter('available')}
          >
            Available ({nfts.filter(n => n.creator !== user?.principal).length})
          </button>
        </div>
        
        <button 
          className="btn-primary"
          onClick={() => setShowMintModal(true)}
        >
          💎 Mint New NFT
        </button>
      </div>

      {filteredNFTs.length === 0 ? (
        <div className="empty-marketplace">
          <div className="empty-icon">💎</div>
          <h3>No NFTs Found</h3>
          <p>
            {filter === 'all' 
              ? 'Be the first to mint a music NFT!'
              : filter === 'owned'
              ? 'You haven\'t created any NFTs yet.'
              : 'No NFTs available for purchase.'
            }
          </p>
          {projects.length > 0 && (
            <button 
              className="btn-secondary"
              onClick={() => setShowMintModal(true)}
            >
              Create Your First NFT
            </button>
          )}
        </div>
      ) : (
        <div className="nft-grid">
          {filteredNFTs.map(nft => (
            <NFTCard 
              key={nft.id} 
              nft={nft} 
              user={user}
              onPurchase={() => console.log('Purchase NFT:', nft.id)}
            />
          ))}
        </div>
      )}

      {showMintModal && (
        <MintNFTModal
          projects={projects}
          onMint={handleMintNFT}
          onClose={() => setShowMintModal(false)}
        />
      )}
    </div>
  );
};

export default NFTMarketplace;
