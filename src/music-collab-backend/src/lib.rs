// (But for Rust, use: DKeeper-App-Blockchain/src/dkeeper_backend/lib.rs)

use candid::{CandidType, Deserialize};
use std::collections::HashMap;

#[derive(CandidType, Deserialize, Clone)]
pub struct MusicProject {
    pub id: u64,
    pub title: String,
    pub description: String,
    pub owner: String,
    pub contributors: Vec<String>,
    pub tracks: Vec<Track>,
}

#[derive(CandidType, Deserialize, Clone)]
pub struct Track {
    pub id: u64,
    pub name: String,
    pub ipfs_hash: String, // Store music file on IPFS, save hash here
    pub uploaded_by: String,
    pub timestamp: u64,
}

#[derive(CandidType, Deserialize, Clone)]
pub struct NFTMetadata {
    pub id: u64,
    pub name: String,
    pub description: String,
    pub image_url: String,
    pub creator: String,
    pub project_id: u64,
    pub price: u64,
}

thread_local! {
    static PROJECTS: std::cell::RefCell<HashMap<u64, MusicProject>> = std::cell::RefCell::new(HashMap::new());
    static NFTS: std::cell::RefCell<HashMap<u64, NFTMetadata>> = std::cell::RefCell::new(HashMap::new());
    static NEXT_ID: std::cell::RefCell<u64> = std::cell::RefCell::new(1);
    static NEXT_NFT_ID: std::cell::RefCell<u64> = std::cell::RefCell::new(1);
}

#[ic_cdk::update]
fn create_project(title: String, description: String, owner: String) -> u64 {
    let id = NEXT_ID.with(|id| {
        let mut id = id.borrow_mut();
        let current = *id;
        *id += 1;
        current
    });
    let project = MusicProject {
        id,
        title,
        description,
        owner,
        contributors: vec![],
        tracks: vec![],
    };
    PROJECTS.with(|projects| {
        projects.borrow_mut().insert(id, project);
    });
    id
}

#[ic_cdk::update]
fn add_track(project_id: u64, name: String, ipfs_hash: String, uploaded_by: String, timestamp: u64) -> bool {
    PROJECTS.with(|projects| {
        let mut projects = projects.borrow_mut();
        if let Some(project) = projects.get_mut(&project_id) {
            let track = Track {
                id: project.tracks.len() as u64 + 1,
                name,
                ipfs_hash,
                uploaded_by,
                timestamp,
            };
            project.tracks.push(track);
            true
        } else {
            false
        }
    })
}

#[ic_cdk::query]
fn get_project(project_id: u64) -> Option<MusicProject> {
    PROJECTS.with(|projects| projects.borrow().get(&project_id).cloned())
}

#[ic_cdk::query]
fn list_projects() -> Vec<MusicProject> {
    PROJECTS.with(|projects| {
        projects.borrow().values().cloned().collect()
    })
}

#[ic_cdk::update]
fn add_contributor(project_id: u64, contributor: String) -> bool {
    PROJECTS.with(|projects| {
        let mut projects = projects.borrow_mut();
        if let Some(project) = projects.get_mut(&project_id) {
            if !project.contributors.contains(&contributor) {
                project.contributors.push(contributor);
            }
            true
        } else {
            false
        }
    })
}

#[ic_cdk::update]
fn remove_track(project_id: u64, track_id: u64) -> bool {
    PROJECTS.with(|projects| {
        let mut projects = projects.borrow_mut();
        if let Some(project) = projects.get_mut(&project_id) {
            project.tracks.retain(|track| track.id != track_id);
            true
        } else {
            false
        }
    })
}

#[ic_cdk::query]
fn get_project_tracks(project_id: u64) -> Vec<Track> {
    PROJECTS.with(|projects| {
        projects.borrow()
            .get(&project_id)
            .map(|project| project.tracks.clone())
            .unwrap_or_default()
    })
}

#[ic_cdk::update]
fn mint_nft(name: String, description: String, image_url: String, creator: String, project_id: u64, price: u64) -> u64 {
    let id = NEXT_NFT_ID.with(|id| {
        let mut id = id.borrow_mut();
        let current = *id;
        *id += 1;
        current
    });
    
    let nft = NFTMetadata {
        id,
        name,
        description,
        image_url,
        creator,
        project_id,
        price,
    };
    
    NFTS.with(|nfts| {
        nfts.borrow_mut().insert(id, nft);
    });
    
    id
}

#[ic_cdk::query]
fn list_nfts() -> Vec<NFTMetadata> {
    NFTS.with(|nfts| {
        nfts.borrow().values().cloned().collect()
    })
}

#[ic_cdk::query]
fn get_nft(nft_id: u64) -> Option<NFTMetadata> {
    NFTS.with(|nfts| nfts.borrow().get(&nft_id).cloned())
}