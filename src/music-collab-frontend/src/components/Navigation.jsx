import React, { useState } from 'react';
import './Navigation.css';

const Navigation = ({ currentView, onViewChange, user, onLogout }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'projects', label: 'Projects', icon: '🎵' },
    { id: 'nft', label: 'NFT Market', icon: '💎' },
    { id: 'collaborate', label: 'Collaborate', icon: '🤝' },
  ];

  const handleLogout = async () => {
    setShowUserMenu(false);
    if (onLogout) {
      await onLogout();
    }
  };

  return (
    <nav className="navigation">
      <div className="nav-brand">
        <span className="nav-logo">🎼</span>
        <span className="nav-title">Music Collab Studio</span>
      </div>
      
      <div className="nav-items">
        {navItems.map(item => (
          <button
            key={item.id}
            className={`nav-item ${currentView === item.id ? 'active' : ''}`}
            onClick={() => onViewChange(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </div>
      
      <div className="nav-user">
        {user ? (
          <div className="user-menu">
            <button 
              className="user-info"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <div className="user-avatar">👤</div>
              <span className="user-name">
                {user.principal ? `${user.principal.slice(0, 8)}...` : 'User'}
              </span>
              <span className="dropdown-arrow">{showUserMenu ? '▲' : '▼'}</span>
            </button>
            {showUserMenu && (
              <div className="user-dropdown">
                <div className="user-principal">
                  <small>Principal ID:</small>
                  <code>{user.principal}</code>
                </div>
                <hr />
                <button className="logout-btn" onClick={handleLogout}>
                  🔓 Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button className="btn-login">Connect Wallet</button>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
