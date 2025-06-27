import React, { useState } from 'react';
import './RoyaltyManager.css';

const RoyaltyManager = ({ project, user }) => {
  const [royaltyData, setRoyaltyData] = useState({
    totalEarnings: 12.45,
    contributors: [
      { name: 'Alice', principal: 'abc123...', share: 40, earnings: 4.98 },
      { name: 'Bob', principal: 'def456...', share: 35, earnings: 4.36 },
      { name: 'You', principal: user?.principal?.slice(0, 8) || 'current', share: 25, earnings: 3.11 }
    ]
  });

  const [newContributor, setNewContributor] = useState({ principal: '', share: '' });

  const handleAddContributor = (e) => {
    e.preventDefault();
    if (newContributor.principal && newContributor.share) {
      // In a real app, this would update the smart contract
      alert(`Added contributor with ${newContributor.share}% share (Demo)`);
      setNewContributor({ principal: '', share: '' });
    }
  };

  const handleWithdraw = () => {
    alert('Withdrawal initiated! (This is a demo)');
  };

  return (
    <div className="royalty-manager">
      <div className="royalty-header">
        <h3>💰 Royalty Management</h3>
        <div className="total-earnings">
          <span className="earnings-label">Total Earnings:</span>
          <span className="earnings-amount">{royaltyData.totalEarnings} ICP</span>
        </div>
      </div>

      <div className="royalty-content">
        <div className="current-split">
          <h4>Current Revenue Split</h4>
          <div className="contributors-list">
            {royaltyData.contributors.map((contributor, index) => (
              <div key={index} className="contributor-row">
                <div className="contributor-info">
                  <span className="contributor-name">{contributor.name}</span>
                  <span className="contributor-id">{contributor.principal}</span>
                </div>
                <div className="contributor-share">
                  <span className="share-percentage">{contributor.share}%</span>
                  <span className="share-earnings">{contributor.earnings} ICP</span>
                </div>
                {contributor.principal === user?.principal && (
                  <button className="btn-small withdraw-btn" onClick={handleWithdraw}>
                    💸 Withdraw
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="add-contributor">
          <h4>Add New Contributor</h4>
          <form onSubmit={handleAddContributor} className="contributor-form">
            <div className="form-row">
              <input
                type="text"
                placeholder="Principal ID"
                value={newContributor.principal}
                onChange={(e) => setNewContributor({...newContributor, principal: e.target.value})}
                className="principal-input"
              />
              <input
                type="number"
                placeholder="Share %"
                value={newContributor.share}
                onChange={(e) => setNewContributor({...newContributor, share: e.target.value})}
                className="share-input"
                min="1"
                max="100"
              />
              <button type="submit" className="btn-primary add-btn">
                ➕ Add
              </button>
            </div>
          </form>
        </div>

        <div className="royalty-chart">
          <h4>Revenue Distribution</h4>
          <div className="chart-placeholder">
            <div className="pie-chart">
              {royaltyData.contributors.map((contributor, index) => (
                <div 
                  key={index} 
                  className="chart-segment"
                  style={{
                    '--percentage': `${contributor.share}%`,
                    '--color': `hsl(${index * 120}, 70%, 50%)`
                  }}
                >
                  {contributor.name}: {contributor.share}%
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="earnings-history">
          <h4>Recent Earnings</h4>
          <div className="history-list">
            <div className="history-item">
              <span className="history-date">2024-01-15</span>
              <span className="history-source">NFT Sale</span>
              <span className="history-amount">+2.1 ICP</span>
            </div>
            <div className="history-item">
              <span className="history-date">2024-01-10</span>
              <span className="history-source">Streaming</span>
              <span className="history-amount">+0.45 ICP</span>
            </div>
            <div className="history-item">
              <span className="history-date">2024-01-05</span>
              <span className="history-source">License</span>
              <span className="history-amount">+1.8 ICP</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoyaltyManager;
