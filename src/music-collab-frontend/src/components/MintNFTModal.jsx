import React, { useState } from 'react';
import './MintNFTModal.css';

const MintNFTModal = ({ projects, onSubmit, onClose, user }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUrl: '',
    projectId: '',
    price: ''
  });

  console.log('MintNFTModal received projects:', projects);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.description && formData.projectId && formData.price) {
      const nftData = {
        name: formData.name,
        description: formData.description,
        image_url: formData.imageUrl || `https://picsum.photos/400/400?random=${Date.now()}`,
        creator: user?.principal || 'anonymous',
        project_id: parseInt(formData.projectId),
        price: parseInt(formData.price) * 1000000 // Convert ICP to smallest unit
      };
      onSubmit(nftData);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="mint-nft-modal">
        <div className="modal-header">
          <h3>💎 Mint Music NFT</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        
        <form onSubmit={handleSubmit} className="mint-form">
          <div className="form-group">
            <label htmlFor="name">NFT Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., 'Cosmic Melody #1'"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your NFT..."
              rows="3"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="projectId">Source Project *</label>
            <select
              id="projectId"
              name="projectId"
              value={formData.projectId}
              onChange={handleChange}
              required
            >
              <option value="">Select a project</option>
              {projects && projects.length > 0 ? (
                projects.map(project => (
                  <option key={project.id} value={project.id}>
                    {project.title}
                  </option>
                ))
              ) : (
                <option value="" disabled>No projects available - Create a project first</option>
              )}
            </select>
            {(!projects || projects.length === 0) && (
              <small className="helper-text">
                You need to create a music project first before minting NFTs. 
                <a href="#" onClick={(e) => { e.preventDefault(); onClose(); }}>
                  Go to Projects
                </a>
              </small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="imageUrl">Image URL (Optional)</label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/artwork.jpg"
            />
            <small>Leave empty to generate a random image</small>
          </div>

          <div className="form-group">
            <label htmlFor="price">Price (ICP) *</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.5"
              step="0.01"
              min="0"
              required
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-primary"
              disabled={!formData.name || !formData.description || !formData.projectId || !formData.price}
            >
              Mint NFT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MintNFTModal;
