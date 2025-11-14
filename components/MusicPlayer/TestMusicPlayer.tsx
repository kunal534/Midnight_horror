'use client';

import { useState } from 'react';
import { musicPlaylist } from '@/data/music';

export default function TestMusicPlayer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const currentTrack = musicPlaylist[currentIndex];
  
  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '400px',
      padding: '20px',
      background: '#2d0000',
      border: '3px solid #8B0000',
      borderRadius: '12px',
      zIndex: 11000,
    }}>
      <h3 style={{ color: '#E8E4D9', margin: '0 0 10px 0' }}>
        🎵 TEST PLAYER
      </h3>
      
      <div style={{ color: '#E8E4D9', marginBottom: '10px', fontSize: '14px' }}>
        <strong>Now Playing:</strong><br/>
        {currentTrack.title}
      </div>
      
      {/* Native HTML5 Audio Controls */}
      <audio 
        key={currentIndex}
        controls 
        autoPlay={false}
        style={{ width: '100%' }}
        onError={(e) => console.error('Audio error:', e)}
        onPlay={() => console.log('Playing')}
        onPause={() => console.log('Paused')}
      >
        <source src={currentTrack.file} type="audio/mpeg" />
      </audio>
      
      <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
        <button 
          onClick={() => setCurrentIndex((currentIndex - 1 + musicPlaylist.length) % musicPlaylist.length)}
          style={{
            flex: 1,
            padding: '10px',
            background: '#8B0000',
            color: '#E8E4D9',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          ⏮ Prev
        </button>
        <button 
          onClick={() => setCurrentIndex((currentIndex + 1) % musicPlaylist.length)}
          style={{
            flex: 1,
            padding: '10px',
            background: '#8B0000',
            color: '#E8E4D9',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Next ⏭
        </button>
      </div>
      
      <div style={{ 
        marginTop: '10px', 
        fontSize: '11px', 
        color: '#B8B8B8',
        fontFamily: 'monospace' 
      }}>
        File: {currentTrack.file}
      </div>
    </div>
  );
}
