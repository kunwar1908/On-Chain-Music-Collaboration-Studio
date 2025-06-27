import { AuthClient } from '@dfinity/auth-client';
import { Actor, HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';

// Import your backend canister
import { idlFactory, canisterId } from 'declarations/music-collab-backend';

class AuthService {
  constructor() {
    this.authClient = null;
    this.actor = null;
    this.identity = null;
    this.principal = null;
  }

  async init() {
    this.authClient = await AuthClient.create();
    this.identity = this.authClient.getIdentity();
    this.principal = this.identity.getPrincipal();
    
    // Create the actor with the current identity
    await this.createActor();
    
    return this.isAuthenticated();
  }

  async createActor() {
    const agent = new HttpAgent({
      identity: this.identity,
      host: process.env.DFX_NETWORK === "local" ? "http://127.0.0.1:4943" : "https://ic0.app",
    });

    // Fetch root key for local development
    if (process.env.DFX_NETWORK === "local") {
      agent.fetchRootKey().catch(err => {
        console.warn("Unable to fetch root key. Check to ensure that your local replica is running");
        console.error(err);
      });
    }

    this.actor = Actor.createActor(idlFactory, {
      agent,
      canisterId,
    });
  }

  async login() {
    if (!this.authClient) {
      await this.init();
    }

    return new Promise((resolve, reject) => {
      this.authClient.login({
        identityProvider: process.env.DFX_NETWORK === "local" 
          ? `http://uxrrr-q7777-77774-qaaaq-cai.localhost:4943/`
          : "https://identity.ic0.app",
        onSuccess: async () => {
          this.identity = this.authClient.getIdentity();
          this.principal = this.identity.getPrincipal();
          await this.createActor();
          resolve(this.getUserInfo());
        },
        onError: reject,
      });
    });
  }

  async logout() {
    if (this.authClient) {
      await this.authClient.logout();
      this.identity = this.authClient.getIdentity();
      this.principal = this.identity.getPrincipal();
      await this.createActor();
    }
  }

  isAuthenticated() {
    return this.authClient ? !this.authClient.getIdentity().getPrincipal().isAnonymous() : false;
  }

  getUserInfo() {
    if (!this.isAuthenticated()) {
      return null;
    }

    return {
      principal: this.principal.toString(),
      isAuthenticated: true,
    };
  }

  getActor() {
    return this.actor;
  }

  getPrincipal() {
    return this.principal;
  }
}

export const authService = new AuthService();
