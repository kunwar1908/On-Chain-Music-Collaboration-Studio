import React from 'react';
import './NFTCard.css';

const NFTCard = ({ nft, user, onPurchase }) => {
  const isOwned = nft.creator === user?.principal;

  const handleAction = () => {
    if (isOwned) {
      // Show options for owned NFT (list for sale, transfer, etc.)
      alert('NFT management features coming soon!');
    } else {
      onPurchase(nft);
    }
  };

  return (
    <div className="nft-card">
      <div className="nft-image">
        {nft.image_url ? (
          <img src={nft.image_url} alt={nft.name} />
        ) : (
          <div className="nft-placeholder">
            <span className="music-note">🎵</span>
          </div>
        )}
        {isOwned && <div className="owned-badge">Owned</div>}
      </div>
      
      <div className="nft-info">
        <h3 className="nft-name">{nft.name}</h3>
        <p className="nft-description">{nft.description}</p>
        
        <div className="nft-meta">
          <div className="creator">
            <span className="label">Creator:</span>
            <span className="value">{nft.creator.slice(0, 8)}...</span>
          </div>
          <div className="project">
            <span className="label">Project ID:</span>
            <span className="value">#{nft.project_id}</span>
          </div>
        </div>
        
        <div className="nft-price">
          <span className="price-label">Price:</span>
          <span className="price-value">{nft.price} ICP</span>
        </div>
        
        <div className="nft-actions">
          <button 
            className={`btn-${isOwned ? 'secondary' : 'primary'} nft-action-btn`}
            onClick={handleAction}
          >
            {isOwned ? '⚙️ Manage' : '🛒 Buy Now'}
          </button>
          {!isOwned && (
            <button className="btn-secondary nft-action-btn">
              👀 View Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
