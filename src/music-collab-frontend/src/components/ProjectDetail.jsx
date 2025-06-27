import React, { useState } from 'react';
import { music_collab_backend } from 'declarations/music-collab-backend';
import TrackUpload from './TrackUpload';
import TrackList from './TrackList';
import './ProjectDetail.css';

const ProjectDetail = ({ project, onBack, onUpdate }) => {
  const [showUpload, setShowUpload] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddTrack = async (trackData) => {
    setLoading(true);
    try {
      const success = await music_collab_backend.add_track(
        project.id,
        trackData.name,
        trackData.ipfsHash,
        trackData.uploadedBy,
        Date.now()
      );
      if (success) {
        await onUpdate();
        setShowUpload(false);
      }
    } catch (error) {
      console.error('Error adding track:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveTrack = async (trackId) => {
    if (window.confirm('Are you sure you want to remove this track?')) {
      try {
        const success = await music_collab_backend.remove_track(project.id, trackId);
        if (success) {
          await onUpdate();
        }
      } catch (error) {
        console.error('Error removing track:', error);
      }
    }
  };

  const handleAddContributor = async () => {
    const contributor = prompt('Enter contributor name:');
    if (contributor) {
      try {
        const success = await music_collab_backend.add_contributor(project.id, contributor);
        if (success) {
          await onUpdate();
        }
      } catch (error) {
        console.error('Error adding contributor:', error);
      }
    }
  };

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="project-detail">
      <div className="project-header">
        <button className="btn-secondary" onClick={onBack}>
          ← Back to Projects
        </button>
        <div className="project-info">
          <h1>{project.title}</h1>
          <p className="project-description">{project.description}</p>
          <div className="project-meta">
            <span><strong>Owner:</strong> {project.owner}</span>
            <span><strong>Contributors:</strong> {project.contributors.length}</span>
            <span><strong>Tracks:</strong> {project.tracks.length}</span>
          </div>
        </div>
      </div>

      <div className="project-content">
        <div className="contributors-section">
          <div className="section-header">
            <h3>Contributors</h3>
            <button className="btn-small" onClick={handleAddContributor}>
              + Add Contributor
            </button>
          </div>
          <div className="contributors-list">
            {project.contributors.length === 0 ? (
              <p>No contributors yet</p>
            ) : (
              project.contributors.map((contributor, index) => (
                <span key={index} className="contributor-tag">
                  {contributor}
                </span>
              ))
            )}
          </div>
        </div>

        <div className="tracks-section">
          <div className="section-header">
            <h3>Tracks</h3>
            <button 
              className="btn-primary" 
              onClick={() => setShowUpload(true)}
              disabled={loading}
            >
              + Upload Track
            </button>
          </div>
          
          {showUpload && (
            <TrackUpload
              onSubmit={handleAddTrack}
              onCancel={() => setShowUpload(false)}
              loading={loading}
            />
          )}
          
          <TrackList
            tracks={project.tracks}
            onRemoveTrack={handleRemoveTrack}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
