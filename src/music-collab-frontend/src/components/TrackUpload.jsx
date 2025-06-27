import React, { useState } from 'react';
import './TrackUpload.css';

const TrackUpload = ({ onSubmit, onCancel, loading }) => {
  const [trackData, setTrackData] = useState({
    name: '',
    uploadedBy: '',
    ipfsHash: ''
  });

  const handleChange = (e) => {
    setTrackData({
      ...trackData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you would upload to IPFS here
      // For now, we'll simulate with a placeholder hash
      const simulatedHash = `QmSimulated${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
      setTrackData({
        ...trackData,
        ipfsHash: simulatedHash
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (trackData.name && trackData.uploadedBy && trackData.ipfsHash) {
      onSubmit(trackData);
    }
  };

  return (
    <div className="track-upload">
      <div className="upload-header">
        <h4>Upload New Track</h4>
      </div>
      
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          <label htmlFor="trackName">Track Name *</label>
          <input
            type="text"
            id="trackName"
            name="name"
            value={trackData.name}
            onChange={handleChange}
            placeholder="Enter track name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="uploadedBy">Uploaded By *</label>
          <input
            type="text"
            id="uploadedBy"
            name="uploadedBy"
            value={trackData.uploadedBy}
            onChange={handleChange}
            placeholder="Your name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="audioFile">Audio File *</label>
          <input
            type="file"
            id="audioFile"
            accept="audio/*"
            onChange={handleFileChange}
            required
          />
          {trackData.ipfsHash && (
            <p className="file-info">
              File ready for upload (IPFS Hash: {trackData.ipfsHash})
            </p>
          )}
        </div>

        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button 
            type="submit" 
            className="btn-primary"
            disabled={loading || !trackData.name || !trackData.uploadedBy || !trackData.ipfsHash}
          >
            {loading ? 'Uploading...' : 'Upload Track'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TrackUpload;
