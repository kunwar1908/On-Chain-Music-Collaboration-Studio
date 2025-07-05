// Direct test - paste this in browser console at http://localhost:3000

async function directPinataTest() {
  console.log('🔧 Direct Pinata Test Starting...');
  
  const API_KEY = 'b49dea9ed88bf6e5387b';
  const SECRET_KEY = '7d200add512fa6bb8195f67430485ee6c96bab07d5080dd9d4a89398d857e6a2';
  
  // Create a simple test file
  const testContent = 'Hello from Music Collab Studio!';
  const file = new File([testContent], 'test.txt', { type: 'text/plain' });
  
  console.log('📄 Created test file:', file.name, file.size, 'bytes');
  
  // Create form data
  const formData = new FormData();
  formData.append('file', file);
  
  // Add minimal metadata
  formData.append('pinataMetadata', JSON.stringify({
    name: 'test-upload',
    keyvalues: {
      type: 'test',
      timestamp: new Date().toISOString()
    }
  }));
  
  try {
    console.log('📤 Uploading to Pinata...');
    
    const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        'pinata_api_key': API_KEY,
        'pinata_secret_api_key': SECRET_KEY
      },
      body: formData
    });
    
    console.log('📊 Response status:', response.status, response.statusText);
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ Upload successful!', result);
      console.log('🔗 IPFS Hash:', result.IpfsHash);
      console.log('🌐 Gateway URL:', `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`);
      
      // Test retrieval
      setTimeout(async () => {
        try {
          console.log('🔍 Testing file retrieval...');
          const fileResponse = await fetch(`https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`);
          const fileContent = await fileResponse.text();
          console.log('📥 Retrieved content:', fileContent);
        } catch (error) {
          console.error('❌ Retrieval failed:', error);
        }
      }, 2000);
      
    } else {
      const errorText = await response.text();
      console.error('❌ Upload failed:', errorText);
    }
    
  } catch (error) {
    console.error('❌ Network error:', error);
    
    if (error.message.includes('Failed to fetch')) {
      console.log('🔧 This looks like a CORS error. Try:');
      console.log('1. Check browser network tab for details');
      console.log('2. Try disabling browser security (for testing only)');
      console.log('3. Use the local storage fallback in the app');
    }
  }
}

// Auto-run the test
directPinataTest();
