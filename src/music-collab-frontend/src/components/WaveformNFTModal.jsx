import React, { useState, useEffect } from 'react';
import WaveformGenerator from './WaveformGenerator';
import './WaveformNFTModal.css';

const WaveformNFTModal = ({ projects, onSubmit, onClose, user }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    projectId: '',
    price: '',
    audioFile: null
  });
  const [waveformImage, setWaveformImage] = useState(null);
  const [step, setStep] = useState(1); // 1: Form, 2: Audio Upload, 3: Waveform

  // Auto-select project if only one exists
  useEffect(() => {
    if (projects && projects.length === 1 && !formData.projectId) {
      setFormData(prev => ({
        ...prev,
        projectId: String(projects[0].id || 0)
      }));
    }
  }, [projects, formData.projectId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('audio/')) {
      setFormData({
        ...formData,
        audioFile: file
      });
      setStep(3);
    } else {
      alert('Please select a valid audio file');
    }
  };

  const handleWaveformGenerated = (imageUrl) => {
    setWaveformImage(imageUrl);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.description && formData.projectId && formData.price && waveformImage) {
      const nftData = {
        name: formData.name,
        description: formData.description,
        image_url: waveformImage,
        creator: user?.principal || 'anonymous',
        project_id: parseInt(formData.projectId),
        price: Math.round(parseFloat(formData.price) * 1000000) // Convert ICP to smallest unit
      };
      onSubmit(nftData);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="step-content">
            <h3>🎵 Create Audio NFT - Step 1</h3>
            <div className="form-group">
              <label htmlFor="name">NFT Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., 'Epic Beat Drop #1'"
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
                placeholder="Describe your audio NFT..."
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
                className="project-select"
              >
                <option value="">Select a project</option>
                {projects && projects.length > 0 ? (
                  projects.map((project, index) => {
                    const projectId = project.id !== undefined ? String(project.id) : String(index);
                    const projectTitle = project.title || `Project ${index + 1}`;
                    return (
                      <option key={projectId} value={projectId}>
                        {projectTitle}
                      </option>
                    );
                  })
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

            <div className="step-actions">
              <button type="button" className="btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button 
                type="button" 
                className="btn-primary"
                onClick={() => setStep(2)}
                disabled={!formData.name || !formData.description || !formData.projectId || !formData.price}
              >
                Next: Upload Audio
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="step-content">
            <h3>🎵 Create Audio NFT - Step 2</h3>
            <div className="audio-upload">
              <div className="upload-area">
                <input
                  type="file"
                  id="audioFile"
                  accept="audio/*"
                  onChange={handleFileChange}
                  className="file-input"
                />
                <label htmlFor="audioFile" className="upload-label">
                  <div className="upload-icon">🎵</div>
                  <p>Click to upload audio file</p>
                  <small>Supports MP3, WAV, M4A formats</small>
                </label>
              </div>
            </div>

            <div className="step-actions">
              <button type="button" className="btn-secondary" onClick={() => setStep(1)}>
                Back
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="step-content">
            <h3>🎵 Create Audio NFT - Step 3</h3>
            <WaveformGenerator
              audioFile={formData.audioFile}
              onWaveformGenerated={handleWaveformGenerated}
            />

            <div className="step-actions">
              <button type="button" className="btn-secondary" onClick={() => setStep(2)}>
                Back
              </button>
              <button 
                type="button" 
                className="btn-primary"
                onClick={handleSubmit}
                disabled={!waveformImage}
              >
                Mint Audio NFT
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="modal-overlay">
      <div className="waveform-nft-modal">
        <div className="modal-header">
          <h3>💎 Create Audio NFT with Waveform</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        
        <div className="step-indicator">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>1</div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>2</div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>3</div>
        </div>
        
        <form className="waveform-form">
          {renderStep()}
        </form>
      </div>
    </div>
  );
};

export default WaveformNFTModal;
