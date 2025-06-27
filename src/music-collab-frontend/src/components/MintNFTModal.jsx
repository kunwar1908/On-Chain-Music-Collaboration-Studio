import React, { useState } from 'react';
import './MintNFTModal.css';

const MintNFTModal = ({ projects, onMint, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    projectId: '',
    price: '',
    imageUrl: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.description && formData.projectId && formData.price) {
      onMint({
        name: formData.name,
        description: formData.description,
        project_id: parseInt(formData.projectId),
        price: parseFloat(formData.price),
        image_url: formData.imageUrl || ''
      });
    } else {
      alert('Please fill in all required fields');
    }
  };

  return (
    <div className="mint-modal-overlay">
      <div className="mint-modal">
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
              {projects.map(project => (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="price">Price (ICP) *</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.1"
              step="0.001"
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="imageUrl">Image URL (optional)</label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              💎 Mint NFT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MintNFTModal;
