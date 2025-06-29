import React, { useState, useEffect } from 'react';
import { authService } from './services/auth';
import ProjectList from './components/ProjectList';
import ProjectForm from './components/ProjectForm';
import ProjectDetail from './components/ProjectDetail';
import NFTMarketplace from './components/NFTMarketplace';
import CollaborationHub from './components/CollaborationHub';
import Navigation from './components/Navigation';
import './App.css';

function App() {
  const [projects, setProjects] = useState([]);
  const [nfts, setNFTs] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard', 'projects', 'create', 'detail', 'nft', 'collaborate'
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    setIsAuthenticating(true);
    try {
      const isAuthenticated = await authService.init();
      if (isAuthenticated) {
        const userInfo = authService.getUserInfo();
        setUser(userInfo);
        await initializeApp();
      }
    } catch (error) {
      console.error('Error initializing authentication:', error);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogin = async () => {
    setIsAuthenticating(true);
    try {
      const userInfo = await authService.login();
      setUser(userInfo);
      await initializeApp();
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please try again.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setProjects([]);
      setNFTs([]);
      setSelectedProject(null);
      setCurrentView('dashboard');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const initializeApp = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      await Promise.all([
        loadProjects(),
        loadNFTs()
      ]);
    } catch (error) {
      console.error('Error initializing app:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadProjects = async () => {
    try {
      const actor = authService.getActor();
      if (!actor) throw new Error('No authenticated actor available');
      
      const projectList = await actor.list_projects();
      console.log('Loaded projects:', projectList);
      setProjects(projectList);
    } catch (error) {
      console.error('Error loading projects:', error);
      setProjects([]);
    }
  };

  const loadNFTs = async () => {
    try {
      const actor = authService.getActor();
      if (!actor) throw new Error('No authenticated actor available');
      
      const nftList = await actor.list_nfts();
      setNFTs(nftList);
    } catch (error) {
      console.error('Error loading NFTs:', error);
      setNFTs([]);
    }
  };

  const handleCreateProject = async (projectData) => {
    console.log('handleCreateProject called with:', projectData);
    if (!user) {
      alert('Please login first to create a project');
      return;
    }

    setLoading(true);
    try {
      console.log('Calling backend create_project...');
      const actor = authService.getActor();
      if (!actor) throw new Error('No authenticated actor available');
      
      const projectId = await actor.create_project(
        projectData.title,
        projectData.description,
        projectData.owner
      );
      console.log('Project created with ID:', projectId);
      await loadProjects();
      setCurrentView('projects');
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Failed to create project. Please check the console for details.');
    } finally {
      setLoading(false);
    }
  };

  const handleMintNFT = async (nftData) => {
    if (!user) {
      alert('Please login first to mint an NFT');
      return;
    }

    setLoading(true);
    try {
      const actor = authService.getActor();
      if (!actor) throw new Error('No authenticated actor available');
      
      const nftId = await actor.mint_nft(
        nftData.name,
        nftData.description,
        nftData.image_url,
        nftData.creator,
        nftData.project_id,
        nftData.price
      );
      console.log('NFT minted with ID:', nftId);
      await loadNFTs();
      return nftId;
    } catch (error) {
      console.error('Error minting NFT:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleSelectProject = async (projectId) => {
    try {
      const actor = authService.getActor();
      if (!actor) throw new Error('No authenticated actor available');
      
      const project = await actor.get_project(projectId);
      if (project && project.length > 0) {
        setSelectedProject(project[0]);
        setCurrentView('detail');
      }
    } catch (error) {
      console.error('Error loading project:', error);
    }
  };

  const renderContent = () => {
    // Show login screen if not authenticated
    if (!user) {
      return (
        <div className="login-screen">
          <div className="login-content">
            <h1>🎵 Music Collab Studio</h1>
            <p>Collaborate, create, and monetize your music on the decentralized web</p>
            <div className="login-features">
              <div className="feature">
                <h3>🎼 Collaborative Creation</h3>
                <p>Work together on music projects in real-time</p>
              </div>
              <div className="feature">
                <h3>💎 NFT Marketplace</h3>
                <p>Mint and trade music NFTs with automatic royalties</p>
              </div>
              <div className="feature">
                <h3>🔒 Decentralized & Secure</h3>
                <p>Your music and rights are protected on the blockchain</p>
              </div>
            </div>
            <button 
              className="btn-primary large login-btn"
              onClick={handleLogin}
              disabled={isAuthenticating}
            >
              {isAuthenticating ? 'Connecting...' : '🔐 Login with Internet Identity'}
            </button>
          </div>
        </div>
      );
    }

    switch (currentView) {
      case 'projects':
        return (
          <ProjectList
            projects={projects}
            onSelectProject={handleSelectProject}
            onCreateNew={() => setCurrentView('create')}
            loading={loading}
          />
        );
      case 'create':
        return (
          <ProjectForm
            onSubmit={handleCreateProject}
            onCancel={() => setCurrentView('projects')}
            loading={loading}
            user={user}
          />
        );
      case 'detail':
        return (
          <ProjectDetail
            project={selectedProject}
            onBack={() => setCurrentView('projects')}
            onUpdate={loadProjects}
            onStartCollaboration={() => setCurrentView('collaborate')}
          />
        );
      case 'nft':
        return (
          <NFTMarketplace
            nfts={nfts}
            projects={projects}
            onRefresh={loadNFTs}
            onMintNFT={handleMintNFT}
            user={user}
          />
        );
      case 'collaborate':
        return (
          <CollaborationHub
            project={selectedProject}
            onBack={() => setCurrentView('detail')}
            user={user}
          />
        );
      default:
        return (
          <div className="dashboard">
            <div className="dashboard-header">
              <h1>Welcome to Music Collab Studio</h1>
              <p>Collaborate, create, and monetize your music on the decentralized web</p>
            </div>
            <div className="dashboard-stats">
              <div className="stat-card">
                <h3>{projects.length}</h3>
                <p>Active Projects</p>
              </div>
              <div className="stat-card">
                <h3>{nfts.length}</h3>
                <p>NFTs Minted</p>
              </div>
              <div className="stat-card">
                <h3>{projects.reduce((sum, p) => sum + (p.tracks ? p.tracks.length : 0), 0)}</h3>
                <p>Total Tracks</p>
              </div>
            </div>
            <div className="dashboard-actions">
              <button 
                className="btn-primary large"
                onClick={() => setCurrentView('create')}
              >
                🎵 Start New Project
              </button>
              <button 
                className="btn-secondary large"
                onClick={() => setCurrentView('projects')}
              >
                📁 Browse Projects
              </button>
              <button 
                className="btn-secondary large"
                onClick={() => setCurrentView('nft')}
              >
                💎 NFT Marketplace
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="App">
      {user && (
        <Navigation 
          currentView={currentView}
          onViewChange={setCurrentView}
          user={user}
          onLogout={handleLogout}
        />
      )}
      <main className="App-main">
        {isAuthenticating && !user ? (
          <div className="loading-screen">
            <div className="loading-spinner"></div>
            <p>Initializing secure connection...</p>
          </div>
        ) : loading && currentView === 'dashboard' ? (
          <div className="loading-screen">
            <div className="loading-spinner"></div>
            <p>Loading your music studio...</p>
          </div>
        ) : (
          renderContent()
        )}
      </main>
    </div>
  );
}

export default App;
