import React from 'react';
import './TrackList.css';

const TrackList = ({ tracks, onRemoveTrack }) => {
  const formatDate = (timestamp) => {
    return new Date(Number(timestamp)).toLocaleDateString();
  };

  if (tracks.length === 0) {
    return (
      <div className="empty-tracks">
        <div className="empty-icon">🎵</div>
        <p>No tracks uploaded yet</p>
      </div>
    );
  }

  return (
    <div className="track-list">
      {tracks.map((track) => (
        <div key={track.id} className="track-item">
          <div className="track-info">
            <h4 className="track-name">{track.name}</h4>
            <div className="track-meta">
              <span>Uploaded by: {track.uploaded_by}</span>
              <span>Date: {formatDate(track.timestamp)}</span>
              <span>IPFS: {track.ipfs_hash.substring(0, 20)}...</span>
            </div>
          </div>
          <div className="track-actions">
            <button 
              className="btn-play"
              onClick={() => alert('Play functionality would be implemented here')}
            >
              ▶️ Play
            </button>
            <button 
              className="btn-download"
              onClick={() => alert('Download functionality would be implemented here')}
            >
              📥 Download
            </button>
            <button 
              className="btn-danger btn-small"
              onClick={() => onRemoveTrack(track.id)}
            >
              🗑️ Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrackList;
