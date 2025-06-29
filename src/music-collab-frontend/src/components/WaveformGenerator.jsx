import React, { useState, useRef, useEffect } from 'react';
import './WaveformGenerator.css';

const WaveformGenerator = ({ audioFile, onWaveformGenerated }) => {
  const canvasRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [waveformData, setWaveformData] = useState(null);

  const generateWaveform = async () => {
    if (!audioFile) return;

    setIsGenerating(true);
    try {
      const arrayBuffer = await audioFile.arrayBuffer();
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      
      const rawData = audioBuffer.getChannelData(0);
      const samples = 200; // Number of samples for waveform
      const blockSize = Math.floor(rawData.length / samples);
      const filteredData = [];
      
      for (let i = 0; i < samples; i++) {
        let blockStart = blockSize * i;
        let sum = 0;
        for (let j = 0; j < blockSize; j++) {
          sum += Math.abs(rawData[blockStart + j]);
        }
        filteredData.push(sum / blockSize);
      }
      
      // Normalize data
      const normalizedData = filteredData.map(value => value / Math.max(...filteredData));
      setWaveformData(normalizedData);
      
      // Draw waveform
      drawWaveform(normalizedData);
      
      // Generate image URL for NFT
      const canvas = canvasRef.current;
      const imageUrl = canvas.toDataURL('image/png');
      onWaveformGenerated(imageUrl);
      
    } catch (error) {
      console.error('Error generating waveform:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const drawWaveform = (data) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, width, height);
    
    // Draw waveform
    const barWidth = width / data.length;
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#667eea');
    gradient.addColorStop(0.5, '#764ba2');
    gradient.addColorStop(1, '#667eea');
    
    ctx.fillStyle = gradient;
    
    data.forEach((value, index) => {
      const barHeight = value * height * 0.8;
      const x = index * barWidth;
      const y = (height - barHeight) / 2;
      
      ctx.fillRect(x, y, barWidth - 1, barHeight);
    });
    
    // Add glow effect
    ctx.shadowColor = '#667eea';
    ctx.shadowBlur = 10;
    ctx.fillStyle = 'rgba(102, 126, 234, 0.3)';
    
    data.forEach((value, index) => {
      const barHeight = value * height * 0.8;
      const x = index * barWidth;
      const y = (height - barHeight) / 2;
      
      ctx.fillRect(x, y, barWidth - 1, barHeight);
    });
  };

  useEffect(() => {
    if (audioFile) {
      generateWaveform();
    }
  }, [audioFile]);

  return (
    <div className="waveform-generator">
      <div className="waveform-header">
        <h4>🎵 Audio Waveform Visualization</h4>
        {isGenerating && <span className="generating">Generating...</span>}
      </div>
      
      <canvas
        ref={canvasRef}
        width={800}
        height={200}
        className="waveform-canvas"
      />
      
      {waveformData && (
        <div className="waveform-info">
          <p>✅ Waveform generated successfully</p>
          <small>This visualization will be used as your NFT artwork</small>
        </div>
      )}
    </div>
  );
};

export default WaveformGenerator;
