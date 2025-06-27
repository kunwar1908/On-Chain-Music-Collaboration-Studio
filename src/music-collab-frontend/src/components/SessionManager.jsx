import React, { useState } from 'react';
import './SessionManager.css';

const SessionManager = ({ project, user }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [sessionMembers, setSessionMembers] = useState([
    { id: 1, name: 'Alice', status: 'active', instrument: 'Piano' },
    { id: 2, name: 'Bob', status: 'active', instrument: 'Guitar' },
    { id: 3, name: 'You', status: 'active', instrument: 'Vocals' }
  ]);

  const handleStartRecording = () => {
    setIsRecording(true);
    // In a real app, this would start audio recording
    console.log('Started recording session...');
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    // In a real app, this would stop and save the recording
    console.log('Stopped recording session...');
    alert('Recording saved! (This is a demo)');
  };

  const handleInviteMember = () => {
    const email = prompt('Enter collaborator email:');
    if (email) {
      alert(`Invitation sent to ${email}! (This is a demo)`);
    }
  };

  return (
    <div className="session-manager">
      <div className="session-header">
        <h3>🎹 Live Session</h3>
        <div className="session-status">
          <span className={`status-indicator ${isRecording ? 'recording' : 'idle'}`}>
            {isRecording ? '🔴 Recording' : '⚪ Ready'}
          </span>
        </div>
      </div>

      <div className="session-content">
        <div className="session-controls">
          <h4>Session Controls</h4>
          <div className="control-buttons">
            {!isRecording ? (
              <button className="btn-primary record-btn" onClick={handleStartRecording}>
                🎤 Start Recording
              </button>
            ) : (
              <button className="btn-danger record-btn" onClick={handleStopRecording}>
                ⏹️ Stop Recording
              </button>
            )}
            <button className="btn-secondary">
              🎵 Play Track
            </button>
            <button className="btn-secondary">
              ⏸️ Pause
            </button>
          </div>
        </div>

        <div className="session-members">
          <div className="members-header">
            <h4>Session Members ({sessionMembers.length})</h4>
            <button className="btn-secondary invite-btn" onClick={handleInviteMember}>
              ➕ Invite
            </button>
          </div>
          
          <div className="members-list">
            {sessionMembers.map(member => (
              <div key={member.id} className="member-card">
                <div className="member-info">
                  <span className="member-name">{member.name}</span>
                  <span className="member-instrument">{member.instrument}</span>
                </div>
                <div className={`member-status ${member.status}`}>
                  {member.status === 'active' ? '🟢' : '🔴'}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="session-timeline">
          <h4>Recording Timeline</h4>
          <div className="timeline-placeholder">
            <div className="timeline-track">
              <span>🎹 Piano Track</span>
              <div className="track-bar">
                <div className="track-progress" style={{width: '60%'}}></div>
              </div>
            </div>
            <div className="timeline-track">
              <span>🎸 Guitar Track</span>
              <div className="track-bar">
                <div className="track-progress" style={{width: '45%'}}></div>
              </div>
            </div>
            <div className="timeline-track">
              <span>🎤 Vocal Track</span>
              <div className="track-bar">
                <div className="track-progress" style={{width: '30%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionManager;
