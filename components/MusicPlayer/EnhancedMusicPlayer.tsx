'use client';

import { musicPlaylist } from '@/data/music';
import { useState, useEffect, useRef, useCallback } from 'react';
export default function EnhancedMusicPlayer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showPlayer, setShowPlayer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const currentTrack = musicPlaylist[currentIndex];

  useEffect(() => {
    const saved = localStorage.getItem('musicPlayerPos');
    if (saved) {
      try {
        const savedPos = JSON.parse(saved);
        const maxX = window.innerWidth - 400;
        const maxY = window.innerHeight - 150;
        setPosition({
          x: Math.max(0, Math.min(savedPos.x, maxX)),
          y: Math.max(0, Math.min(savedPos.y, maxY)),
        });
      } catch (e) {}
    } else {
      setPosition({
        x: window.innerWidth - 400,
        y: window.innerHeight - 100,
      });
    }

    const hasSeenAnimation = sessionStorage.getItem('hasSeenAnimation');
    if (hasSeenAnimation) {
      setShowPlayer(true);
    } else {
      setTimeout(() => setShowPlayer(true), 3500);
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = currentTrack.file;
      audioRef.current.load();
      setCurrentTime(0);
    }
  }, [currentIndex, currentTrack.file]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current && !audioRef.current.paused) {
        setCurrentTime(audioRef.current.currentTime);
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.no-drag')) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
  if (!isDragging) return;
  
  let newX = e.clientX - dragStart.x;
  let newY = e.clientY - dragStart.y;
  
  const maxX = window.innerWidth - 400;
  const maxY = window.innerHeight - 150;
  
  newX = Math.max(0, Math.min(newX, maxX));
  newY = Math.max(0, Math.min(newY, maxY));
  
  setPosition({ x: newX, y: newY });
}, [isDragging, dragStart.x, dragStart.y]);


  const handleMouseUp = useCallback(() => {
  if (isDragging) {
    setIsDragging(false);
    localStorage.setItem('musicPlayerPos', JSON.stringify(position));
  }
}, [isDragging, position]);


  useEffect(() => {
  if (isDragging) {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }
  }, [isDragging, dragStart, position, handleMouseMove, handleMouseUp]); // ← Added these

  const snapToCorner = () => {
    const corners = [
      { x: 20, y: 100 },
      { x: Math.max(20, window.innerWidth - 400), y: 100 },
      { x: 20, y: Math.max(100, window.innerHeight - 100) },
      { x: Math.max(20, window.innerWidth - 400), y: Math.max(100, window.innerHeight - 100) },
    ];
    
    let nearest = corners[3];
    let minDist = Infinity;
    
    corners.forEach(corner => {
      const dist = Math.hypot(corner.x - position.x, corner.y - position.y);
      if (dist < minDist) {
        minDist = dist;
        nearest = corner;
      }
    });
    
    setPosition(nearest);
    localStorage.setItem('musicPlayerPos', JSON.stringify(nearest));
  };

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!showPlayer) return null;

  return (
    <div
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '380px',
        background: 'linear-gradient(135deg, #4d0000 0%, #6b0000 100%)',
        border: '3px solid #2d0000',
        borderRadius: '16px',
        boxShadow: '0 12px 48px rgba(0, 0, 0, 0.9), inset 0 0 60px rgba(139, 0, 0, 0.3)',
        zIndex: 11000,
        cursor: isDragging ? 'grabbing' : 'grab',
        animation: 'fadeInUp 0.5s ease-out',
      }}
      onMouseDown={handleMouseDown}
    >
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 16px',
        borderBottom: isExpanded ? '2px solid #2d0000' : 'none',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '20px' }}>🎵</span>
          <span style={{
            fontFamily: 'Creepster, cursive',
            color: '#E8E4D9',
            fontSize: '16px',
            fontWeight: 700,
            textShadow: '0 0 10px rgba(220, 20, 60, 0.8)',
          }}>
            MIDNIGHT SOUNDS
          </span>
        </div>
        
        <div className="no-drag" style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => setIsExpanded(!isExpanded)} style={{
            background: 'transparent',
            border: '2px solid #E8E4D9',
            color: '#E8E4D9',
            padding: '4px 10px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
          }}>
            {isExpanded ? '−' : '+'}
          </button>
          
          <button onClick={snapToCorner} style={{
            background: 'transparent',
            border: '2px solid #E8E4D9',
            color: '#E8E4D9',
            padding: '4px 10px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px',
          }}>⚓</button>
        </div>
      </div>

      {/* Content Area - Always rendered */}
      <div className="no-drag" style={{ padding: '16px' }}>
        {/* Now Playing - Always visible */}
        <div style={{
          marginBottom: '12px',
          padding: '12px',
          background: 'rgba(0, 0, 0, 0.4)',
          borderRadius: '8px',
          border: '2px solid #8B0000',
        }}>
          <div style={{
            fontSize: '10px',
            color: '#DC143C',
            marginBottom: '4px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            fontWeight: 'bold',
          }}>
            NOW PLAYING {isPlaying && '• ▶'}
          </div>
          <div style={{
            fontSize: '14px',
            color: '#E8E4D9',
            fontWeight: 'bold',
            marginBottom: '2px',
          }}>
            {currentTrack.title}
          </div>
          <div style={{ fontSize: '11px', color: '#B8B8B8' }}>
            {currentTrack.artist} • {formatTime(currentTime)}
          </div>
        </div>

        {/* Audio Element - Always rendered, visibility controlled by CSS */}
        <audio
          ref={audioRef}
          controls
          style={{
            width: '100%',
            height: '40px',
            marginBottom: '12px',
            borderRadius: '8px',
            display: isExpanded ? 'block' : 'none', // Hide visually but keep in DOM
          }}
        >
          <source src={currentTrack.file} type="audio/mpeg" />
        </audio>

        {/* Track Controls */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: isExpanded ? '12px' : '0',
        }}>
          <button
            onClick={() => setCurrentIndex((currentIndex - 1 + musicPlaylist.length) % musicPlaylist.length)}
            style={{
              background: 'rgba(0, 0, 0, 0.4)',
              border: '2px solid #8B0000',
              color: '#E8E4D9',
              padding: '8px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 'bold',
            }}
          >
            ⏮ Prev
          </button>
          
          {/* Play/Pause button - always visible */}
          <button
            onClick={() => {
              if (audioRef.current) {
                if (audioRef.current.paused) {
                  audioRef.current.play();
                } else {
                  audioRef.current.pause();
                }
              }
            }}
            style={{
              background: isPlaying ? 'rgba(220, 20, 60, 0.6)' : 'rgba(0, 0, 0, 0.4)',
              border: '2px solid #DC143C',
              color: '#E8E4D9',
              padding: '8px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 'bold',
            }}
          >
            {isPlaying ? '⏸ Pause' : '▶ Play'}
          </button>
          
          <button
            onClick={() => setCurrentIndex((currentIndex + 1) % musicPlaylist.length)}
            style={{
              background: 'rgba(0, 0, 0, 0.4)',
              border: '2px solid #8B0000',
              color: '#E8E4D9',
              padding: '8px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 'bold',
            }}
          >
            Next ⏭
          </button>
        </div>

        {/* Playlist - Only when expanded */}
        {isExpanded && (
          <div>
            <div style={{
              fontSize: '10px',
              color: '#DC143C',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontWeight: 'bold',
            }}>
              PLAYLIST ({musicPlaylist.length} TRACKS)
            </div>
            <div style={{
              maxHeight: '120px',
              overflowY: 'auto',
              fontSize: '12px',
            }}>
              {musicPlaylist.map((track, index) => (
                <div
                  key={track.id}
                  onClick={() => setCurrentIndex(index)}
                  style={{
                    padding: '8px',
                    marginBottom: '4px',
                    background: index === currentIndex 
                      ? 'rgba(220, 20, 60, 0.3)' 
                      : 'rgba(0, 0, 0, 0.3)',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    border: index === currentIndex 
                      ? '2px solid #DC143C' 
                      : '2px solid transparent',
                  }}
                >
                  <div style={{ color: '#E8E4D9', marginBottom: '2px', fontSize: '12px', fontWeight: 'bold' }}>
                    {index === currentIndex && '▶ '}{track.title}
                  </div>
                  <div style={{ color: '#B8B8B8', fontSize: '10px' }}>
                    {track.artist} • {track.duration}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
