'use client';

import { useState, useEffect, useRef } from 'react';
import { musicTracks, musicConfig, type MusicTrack } from '@/config/music.config';
import './MusicPlayer.css';

export default function MusicPlayer() {
  const [tracks, setTracks] = useState<MusicTrack[]>(musicTracks);
  const [currentTrack, setCurrentTrack] = useState<MusicTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hoveredTrack, setHoveredTrack] = useState<string | null>(null);
  const [showVolume, setShowVolume] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const [filteredTracks, setFilteredTracks] = useState<MusicTrack[]>(tracks);

  // Filter tracks based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredTracks(tracks);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredTracks(
        tracks.filter(
          (track) =>
            track.title.toLowerCase().includes(query) ||
            track.artist.toLowerCase().includes(query)
        )
      );
    }
  }, [searchQuery, tracks]);

  // Update current time
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [currentTrack]);

  // Handle play/pause
  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Handle track selection
  const selectTrack = (track: MusicTrack) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    setIsExpanded(true);
    setIsMinimized(false);
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.play().catch(console.error);
    }
  };

  // Handle seek
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // Format time
  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Get track URL
  const getTrackUrl = (filename: string) => {
    return `${musicConfig.getBaseUrl()}/${filename}`;
  };

  // Get track cover image URL
  const getCoverUrl = (cover?: string) => {
    if (!cover) return null;
    return `${musicConfig.getBaseUrl()}/${cover}`;
  };

  const handleToggle = () => {
    if (isMinimized) {
      setIsMinimized(false);
      setIsExpanded(true);
    } else if (isExpanded) {
      setIsExpanded(false);
      setIsMinimized(true);
    } else {
      setIsExpanded(true);
    }
  };

  return (
    <>
      {/* Minimized Player - Show when minimized or when no track is selected */}
      {(isMinimized || (!isExpanded && !currentTrack)) && (
        <div className="music-player-minimized" onClick={() => { setIsMinimized(false); setIsExpanded(true); }}>
          {currentTrack ? (
            <>
              <div className="minimized-track-info">
                <div className="minimized-track-cover">
                  {currentTrack.cover ? (
                    <img src={getCoverUrl(currentTrack.cover) || ''} alt={currentTrack.title} />
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                    </svg>
                  )}
                </div>
                <div className="minimized-info">
                  <span className="minimized-title">{currentTrack.title}</span>
                  <span className="minimized-artist">{currentTrack.artist}</span>
                </div>
              </div>
              <button 
                className="minimized-play-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlayPause();
                }}
              >
                {isPlaying ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                )}
              </button>
              <button 
                className="minimized-expand-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMinimized(false);
                  setIsExpanded(true);
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                </svg>
              </button>
            </>
          ) : (
            <div className="minimized-placeholder">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
              </svg>
              <span>Click to open player</span>
            </div>
          )}
        </div>
      )}

      {/* Expanded Player - Show when expanded */}
      {isExpanded && !isMinimized && (
      <div className="music-player expanded">
        <div className="music-player-header">
          <div className="header-left">
            <button 
              className="back-to-library-btn"
              onClick={() => {
                setCurrentTrack(null);
                setIsPlaying(false);
              }}
              aria-label="Back to Library"
              title="Back to Library"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
              </svg>
            </button>
            <div className="music-icon">🎵</div>
            <h2>Your Library</h2>
          </div>
          <button
            className="toggle-btn"
            onClick={handleToggle}
            aria-label={isMinimized ? 'Expand' : 'Minimize'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13H5v-2h14v2z"/>
            </svg>
          </button>
        </div>

      {isExpanded && (
        <>
          {/* Search Bar */}
          <div className="music-search">
            <svg className="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M7 12A5 5 0 1 0 7 2a5 5 0 0 0 0 10zm0 1A6 6 0 1 1 7 1a6 6 0 0 1 0 12z" fill="currentColor"/>
              <path d="M11.354 11.354l-.707-.707 3-3 .707.707-3 3z" fill="currentColor"/>
            </svg>
            <input
              type="text"
              placeholder="Search music..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Current Track Display - Spotify Style */}
          {currentTrack && (
            <div className="current-track">
              <div className="track-cover-container">
                {currentTrack.cover ? (
                  <img 
                    src={getCoverUrl(currentTrack.cover) || ''} 
                    alt={currentTrack.title}
                    className="track-cover"
                  />
                ) : (
                  <div className="track-cover-placeholder">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                    </svg>
                  </div>
                )}
              </div>
              <div className="track-info">
                <h3 className="track-title">{currentTrack.title}</h3>
                <p className="track-artist">{currentTrack.artist}</p>
              </div>
              <div className="track-controls">
                <button 
                  onClick={togglePlayPause} 
                  className="play-pause-btn"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                    </svg>
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  )}
                </button>
                <div className="progress-container">
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleSeek}
                    className="progress-bar"
                  />
                  <div className="time-display">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
                <div className="volume-control-container">
                  <button 
                    className="volume-btn"
                    onClick={() => setShowVolume(!showVolume)}
                    aria-label="Volume"
                  >
                    {volume === 0 ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38.31 2.63.95 3.69 1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                      </svg>
                    )}
                  </button>
                  {showVolume && (
                    <div className="volume-control">
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="volume-bar"
                      />
                    </div>
                  )}
                </div>
              </div>
              <audio
                ref={audioRef}
                src={currentTrack ? getTrackUrl(currentTrack.filename) : ''}
                onEnded={() => setIsPlaying(false)}
              />
            </div>
          )}

          {/* Track List - Spotify Style */}
          <div className="track-list">
            {filteredTracks.length === 0 ? (
              <p className="no-results">No tracks found</p>
            ) : (
              filteredTracks.map((track, index) => (
                <div
                  key={track.id}
                  className={`track-item ${
                    currentTrack?.id === track.id ? 'active' : ''
                  }`}
                  onMouseEnter={() => setHoveredTrack(track.id)}
                  onMouseLeave={() => setHoveredTrack(null)}
                  onClick={() => selectTrack(track)}
                >
                  <div className="track-item-number">
                    {hoveredTrack === track.id ? (
                      <button 
                        className="play-track-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          selectTrack(track);
                        }}
                        aria-label="Play"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </button>
                    ) : currentTrack?.id === track.id && isPlaying ? (
                      <div className="equalizer">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  {track.cover ? (
                    <img 
                      src={getCoverUrl(track.cover) || ''} 
                      alt={track.title}
                      className="track-item-cover"
                    />
                  ) : (
                    <div className="track-item-cover-placeholder">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                      </svg>
                    </div>
                  )}
                  <div className="track-item-info">
                    <h4 className={currentTrack?.id === track.id ? 'playing' : ''}>{track.title}</h4>
                    <p>{track.artist}</p>
                  </div>
                  {hoveredTrack === track.id && (
                    <button 
                      className="more-options-btn"
                      onClick={(e) => e.stopPropagation()}
                      aria-label="More options"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="12" r="1.5"/>
                        <circle cx="6" cy="12" r="1.5"/>
                        <circle cx="18" cy="12" r="1.5"/>
                      </svg>
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </>
      )}
      </div>
      )}
    </>
  );
}

