'use client';

import { musicPlaylist } from '@/data/music';
import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './MusicPlayer.module.scss';

export default function EnhancedMusicPlayer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showPlayer, setShowPlayer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTabletOrPhone, setIsTabletOrPhone] = useState(false);
  const [showScrollWarning, setShowScrollWarning] = useState(false);
  const [showMinimizeGlow, setShowMinimizeGlow] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);
  const hasUserInteractedRef = useRef(false);
  const shouldContinuePlayingRef = useRef(false);
  const touchStartPosRef = useRef({ x: 0, y: 0 });
  const hasDraggedRef = useRef(false);
  const isTouchingPlayerRef = useRef(false);
  const playerRef = useRef<HTMLDivElement>(null);
  const dragHeaderRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const isExpandedRef = useRef(false);
  const glowSequenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const glowSequenceTimeoutRef2 = useRef<NodeJS.Timeout | null>(null);

  const currentTrack = musicPlaylist[currentIndex];

  const getPlayerWidth = useCallback(
    () => (isExpanded ? 380 : isMobile ? 56 : 240),
    [isExpanded, isMobile],
  );

  useEffect(() => {
    isExpandedRef.current = isExpanded;
  }, [isExpanded]);

  useEffect(() => {
    isDraggingRef.current = isDragging;
  }, [isDragging]);

  // ENHANCED SCROLL PREVENTION WITH AUTO-MINIMIZE
useEffect(() => {
  if (!isTabletOrPhone) return;

  // Capture ref values at the start
  const glowTimeout = glowSequenceTimeoutRef.current;
  const glowTimeout2 = glowSequenceTimeoutRef2.current;

  let scrollAttempts = 0;
  let touchStartTime = 0;
  let initialTouchY = 0;

  const handleTouchStart = (e: TouchEvent) => {
    touchStartTime = Date.now();
    initialTouchY = e.touches[0].clientY;
  };

  const preventScroll = (e: TouchEvent) => {
    if (isDraggingRef.current) {
      const target = e.target as HTMLElement;
      const playlistElement = document.querySelector('.playlist-scroll');
      const audioEl = audioRef.current;

      // Allow playlist scrolling
      if (playlistElement && playlistElement.contains(target)) {
        e.stopPropagation();
        return;
      }

      // CRITICAL: Allow all audio control interactions (including progress bar)
      if (audioEl && (audioEl === target || target.closest('audio'))) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();
      return;
    }

    if (!isExpandedRef.current && !isDraggingRef.current) return;

    const target = e.target as HTMLElement;
    const playlistElement = document.querySelector('.playlist-scroll');
    const audioEl = audioRef.current;
    const playerElement = playerRef.current;

    // Allow playlist scrolling
    if (playlistElement && playlistElement.contains(target)) {
      e.stopPropagation();
      return;
    }

    // CRITICAL: Never block audio controls or progress bar
    if (audioEl && (audioEl === target || target.closest('audio'))) {
      return;
    }

    // Detect scroll intent: vertical movement > 15px
    const currentTouchY = e.touches[0].clientY;
    const verticalMovement = Math.abs(currentTouchY - initialTouchY);

    // If touching outside player while expanded
    if (isExpandedRef.current && playerElement && !playerElement.contains(target)) {
      // Only count as scroll attempt if significant vertical movement detected
      if (verticalMovement > 15) {
        scrollAttempts++;

        // Auto-minimize after 1 scroll attempt (smooth UX)
        if (scrollAttempts >= 1) {
          setIsExpanded(false);
          scrollAttempts = 0;

          // Clear any active warnings/glows
          setShowScrollWarning(false);
          setShowMinimizeGlow(false);
          if (glowSequenceTimeoutRef.current) clearTimeout(glowSequenceTimeoutRef.current);
          if (glowSequenceTimeoutRef2.current) clearTimeout(glowSequenceTimeoutRef2.current);

          return; // Allow scroll after minimizing
        }
      }

      e.preventDefault();
      e.stopPropagation();

      // Show warning on first scroll attempt
      if (scrollAttempts === 0 && verticalMovement > 15) {
        setShowScrollWarning(true);
        setTimeout(() => setShowScrollWarning(false), 800);
      }
    } else {
      // Touching inside player - prevent background scroll
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const resetAttempts = () => {
    scrollAttempts = 0;
    touchStartTime = 0;
    initialTouchY = 0;
  };

  window.addEventListener('touchstart', handleTouchStart, { passive: true });
  window.addEventListener('touchmove', preventScroll, { passive: false });
  window.addEventListener('touchend', resetAttempts);

  return () => {
    window.removeEventListener('touchstart', handleTouchStart);
    window.removeEventListener('touchmove', preventScroll);
    window.removeEventListener('touchend', resetAttempts);
    // Use captured values in cleanup
    if (glowTimeout) clearTimeout(glowTimeout);
    if (glowTimeout2) clearTimeout(glowTimeout2);
  };
}, [isTabletOrPhone]);


  useEffect(() => {
    const checkDeviceSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTabletOrPhone(window.innerWidth < 1024);
    };
    checkDeviceSize();
    window.addEventListener('resize', checkDeviceSize);
    return () => window.removeEventListener('resize', checkDeviceSize);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.tagName === 'BUTTON' ||
      target.tagName === 'AUDIO' ||
      target.closest('button') ||
      target.closest('audio')
    ) {
      return;
    }
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      let newX = e.clientX - dragStart.x;
      let newY = e.clientY - dragStart.y;
      const playerWidth = getPlayerWidth();
      const maxX = window.innerWidth - playerWidth;
      const maxY = window.innerHeight - 150;
      newX = Math.max(0, Math.min(newX, maxX));
      newY = Math.max(0, Math.min(newY, maxY));
      setPosition({ x: newX, y: newY });
    },
    [isDragging, dragStart.x, dragStart.y, getPlayerWidth],
  );

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    localStorage.setItem('musicPlayerPos', JSON.stringify(position));
  }, [isDragging, position]);

  const handleTouchStart = (e: React.TouchEvent) => {
    const target = e.target as HTMLElement;
    const audioEl = audioRef.current;

    // Completely ignore touches on audio + its internal controls (slider, buttons)
    if (
      target.tagName === 'BUTTON' ||
      target.closest('button') ||
      target.getAttribute('type') === 'range' ||
      (audioEl && (audioEl === target || audioEl.contains(target)))
    ) {
      isTouchingPlayerRef.current = false;
      return;
    }

    if (dragHeaderRef.current && dragHeaderRef.current.contains(target)) {
      isTouchingPlayerRef.current = true;
      const touch = e.touches[0];
      touchStartPosRef.current = { x: touch.clientX, y: touch.clientY };
      hasDraggedRef.current = false;
      setDragStart({ x: touch.clientX - position.x, y: touch.clientY - position.y });
    } else {
      isTouchingPlayerRef.current = false;
    }
  };

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isTouchingPlayerRef.current) return;

      const touch = e.touches[0];
      const deltaX = Math.abs(touch.clientX - touchStartPosRef.current.x);
      const deltaY = Math.abs(touch.clientY - touchStartPosRef.current.y);

      if (deltaX > 10 || deltaY > 10) {
        hasDraggedRef.current = true;
        setIsDragging(true);

        if (isExpandedRef.current) {
          e.preventDefault();
        }

        let newX = touch.clientX - dragStart.x;
        let newY = touch.clientY - dragStart.y;
        const playerWidth = getPlayerWidth();
        const maxX = window.innerWidth - playerWidth;
        const maxY = window.innerHeight - 150;
        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));
        setPosition({ x: newX, y: newY });
      }
    },
    [dragStart.x, dragStart.y, getPlayerWidth],
  );

  const handleTouchEnd = useCallback(() => {
    if (!isTouchingPlayerRef.current) return;

    if (isDragging) {
      setIsDragging(false);
      localStorage.setItem('musicPlayerPos', JSON.stringify(position));
    }

    if (!hasDraggedRef.current && !isExpanded) {
      setIsExpanded(true);
    }

    hasDraggedRef.current = false;
    isTouchingPlayerRef.current = false;
  }, [isDragging, position, isExpanded]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  useEffect(() => {
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchMove, handleTouchEnd]);

  useEffect(() => {
    const playerWidth = getPlayerWidth();
    const maxX = window.innerWidth - playerWidth;
    const maxY = window.innerHeight - 150;
    setPosition(prev => ({
      x: Math.max(0, Math.min(prev.x, maxX)),
      y: Math.max(0, Math.min(prev.y, maxY)),
    }));
  }, [isExpanded, isMobile, getPlayerWidth]);

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
      } catch {}
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
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      shouldContinuePlayingRef.current = true;
      const nextIndex = (currentIndex + 1) % musicPlaylist.length;
      setCurrentIndex(nextIndex);
    };

    const handlePlay = () => {
      setIsPlaying(true);
      hasUserInteractedRef.current = true;
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (!audio.paused && !isPlaying) {
        setIsPlaying(true);
      }
    };

    const handlePlaying = () => {
      setIsPlaying(true);
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('playing', handlePlaying);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('playing', handlePlaying);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [currentIndex, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = currentTrack.file;
    audio.load();
    setCurrentTime(0);

    if (shouldContinuePlayingRef.current && hasUserInteractedRef.current) {
      const attemptPlay = () => {
        audio
          .play()
          .then(() => {
            shouldContinuePlayingRef.current = false;
          })
          .catch(() => {
            shouldContinuePlayingRef.current = false;
          });
      };
      audio.addEventListener('canplay', attemptPlay, { once: true });
      return () => {
        audio.removeEventListener('canplay', attemptPlay);
      };
    }
  }, [currentIndex, currentTrack.file, currentTrack.title]);

  const snapToCorner = () => {
    const playerWidth = getPlayerWidth();
    const corners = [
      { x: 20, y: 100 },
      { x: Math.max(20, window.innerWidth - playerWidth - 20), y: 100 },
      { x: 20, y: Math.max(100, window.innerHeight - 150) },
      {
        x: Math.max(20, window.innerWidth - playerWidth - 20),
        y: Math.max(100, window.innerHeight - 150),
      },
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
    <>
      <style>{`
        @keyframes pulseWarning {
          0% {
            border-color: #DC143C;
            box-shadow: 0 0 20px rgba(220, 20, 60, 0.8);
          }
          50% {
            border-color: #FF6B6B;
            box-shadow: 0 0 40px rgba(220, 20, 60, 1);
          }
          100% {
            border-color: #DC143C;
            box-shadow: 0 0 20px rgba(220, 20, 60, 0.8);
          }
        }

        @keyframes glowMinimizeButton {
          0% {
            box-shadow: 0 0 5px rgba(220, 20, 60, 0.3);
            background: rgba(220, 20, 60, 0.1);
            border: 2px solid rgba(220, 20, 60, 0.3);
          }
          50% {
            box-shadow: 0 0 25px rgba(220, 20, 60, 1);
            background: rgba(220, 20, 60, 0.4);
            border: 2px solid #DC143C;
          }
          100% {
            box-shadow: 0 0 5px rgba(220, 20, 60, 0.3);
            background: rgba(220, 20, 60, 0.1);
            border: 2px solid rgba(220, 20, 60, 0.3);
          }
        }

        .music-player-pulse {
          animation: pulseWarning 0.8s ease-in-out;
        }

        .minimize-button-glow {
          animation: glowMinimizeButton 1.5s ease-in-out !important;
          border-radius: 4px;
        }
      `}</style>

     <div
  key={`player-${animationKey}`}
  ref={playerRef}
  className={`${styles.musicPlayer} ${showScrollWarning ? 'music-player-pulse' : ''} ${isDragging ? styles.noDragTransition : ''}`}
  style={{
    left: `${position.x}px`,
    top: `${position.y}px`,
    width: isExpanded ? '380px' : isMobile ? '56px' : '240px',
    border: showScrollWarning ? '3px solid #DC143C' : undefined,
    // Only apply transition when NOT dragging
    transition: isDragging ? 'none' : 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  }}
>

        <div
          ref={dragHeaderRef}
          className={styles.header}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          style={{
            touchAction: 'none',
            userSelect: 'none',
            cursor: 'grab',
          }}
        >
          {isExpanded ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', pointerEvents: 'none' }}>
                <div
                  className={
                    isPlaying
                      ? `${styles.noteIcon} ${styles.noteIconPlaying}`
                      : `${styles.noteIcon} ${styles.noteIconIdle}`
                  }
                />
                <span className={styles.title}>MIDNIGHT SOUNDS</span>
              </div>
              <div className={styles.controls}>
                <button
                  key={`minimize-${animationKey}`}
                  className={`${styles.controlBtn} ${showMinimizeGlow ? 'minimize-button-glow' : ''}`}
                  onClick={e => {
                    e.stopPropagation();
                    setIsExpanded(!isExpanded);
                    setShowMinimizeGlow(false);
                    setShowScrollWarning(false);
                  }}
                >
                  −
                </button>
                <button
                  className={styles.controlBtn}
                  onClick={e => {
                    e.stopPropagation();
                    snapToCorner();
                  }}
                >
                  ⚓
                </button>
              </div>
            </>
          ) : (
            <div
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: isMobile ? 'center' : 'space-between',
                gap: '6px',
              }}
            >
              {isMobile ? (
                <div style={{ padding: '4px', pointerEvents: 'none' }}>
                  <div
                    className={
                      isPlaying
                        ? `${styles.noteIcon} ${styles.noteIconPlaying}`
                        : `${styles.noteIcon} ${styles.noteIconIdle}`
                    }
                  />
                </div>
              ) : (
                <>
                  <div style={{ padding: '4px', marginRight: '4px', pointerEvents: 'none' }}>
                    <div
                      className={
                        isPlaying
                          ? `${styles.noteIcon} ${styles.noteIconPlaying}`
                          : `${styles.noteIcon} ${styles.noteIconIdle}`
                      }
                    />
                  </div>
                  <div className="marquee-container" style={{ flex: 1, minWidth: 0, pointerEvents: 'none' }}>
                    <div className="marquee-text" style={{ color: '#E8E4D9', fontSize: '12px', fontWeight: 'bold' }}>
                      {currentTrack.title} - {currentTrack.artist}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '4px', flexShrink: 0, pointerEvents: 'auto' }}>
                    <button
                      className={styles.controlBtn}
                      onClick={e => {
                        e.stopPropagation();
                        setIsExpanded(true);
                      }}
                    >
                      +
                    </button>
                    <button
                      className={styles.controlBtn}
                      onClick={e => {
                        e.stopPropagation();
                        snapToCorner();
                      }}
                    >
                      ⚓
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <audio
          ref={audioRef}
          controls={isExpanded}
          src={currentTrack.file}
          className={styles.audioElement}
          preload="auto"
          style={{
            display: isExpanded ? 'block' : 'none',
            width: '100%',
            marginBottom: isExpanded ? '12px' : '0',
          }}
        />

        {isExpanded && (
          <div className={styles.content}>
            <div
              style={{
                marginBottom: '12px',
                padding: '12px',
                background: 'rgba(0, 0, 0, 0.4)',
                borderRadius: '8px',
                border: `2px solid ${isPlaying ? '#DC143C' : '#8B0000'}`,
              }}
            >
              <div
                style={{
                  fontSize: '10px',
                  color: isPlaying ? '#DC143C' : '#8B0000',
                  marginBottom: '4px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  fontWeight: 'bold',
                }}
              >
                NOW PLAYING {isPlaying ? '• LIVE' : ''}
              </div>
              <div
                style={{
                  fontSize: '14px',
                  color: '#E8E4D9',
                  fontWeight: 'bold',
                  marginBottom: '2px',
                }}
              >
                {currentTrack.title}
              </div>
              <div style={{ fontSize: '11px', color: '#B8B8B8' }}>
                {currentTrack.artist} • {formatTime(currentTime)}
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '12px',
                marginBottom: '12px',
              }}
            >
              <button
                className={styles.controlBtn}
                onClick={e => {
                  e.stopPropagation();
                  hasUserInteractedRef.current = true;
                  if (audioRef.current && !audioRef.current.paused) {
                    shouldContinuePlayingRef.current = true;
                  }
                  setCurrentIndex((currentIndex - 1 + musicPlaylist.length) % musicPlaylist.length);
                }}
              >
                ⏮ Prev
              </button>
              <button
                className={styles.controlBtn}
                onClick={e => {
                  e.stopPropagation();
                  if (audioRef.current) {
                    if (audioRef.current.paused) {
                      hasUserInteractedRef.current = true;
                      audioRef.current.play();
                    } else {
                      audioRef.current.pause();
                    }
                  }
                }}
              >
                {isPlaying ? '⏸ Pause' : '▶ Play'}
              </button>
              <button
                className={styles.controlBtn}
                onClick={e => {
                  e.stopPropagation();
                  hasUserInteractedRef.current = true;
                  if (audioRef.current && !audioRef.current.paused) {
                    shouldContinuePlayingRef.current = true;
                  }
                  setCurrentIndex((currentIndex + 1) % musicPlaylist.length);
                }}
              >
                Next ⏭
              </button>
            </div>

            <div>
              <div
                style={{
                  fontSize: '10px',
                  color: '#DC143C',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  fontWeight: 'bold',
                }}
              >
                PLAYLIST ({musicPlaylist.length} TRACKS)
              </div>
              <div
                className="playlist-scroll"
                style={{
                  maxHeight: '120px',
                  overflowY: 'auto',
                  overflowX: 'hidden',
                  fontSize: '12px',
                }}
              >
                {musicPlaylist.map((track, index) => (
                  <div
                    key={track.id}
                    onClick={e => {
                      e.stopPropagation();
                      hasUserInteractedRef.current = true;
                      if (audioRef.current && !audioRef.current.paused) {
                        shouldContinuePlayingRef.current = true;
                      }
                      setCurrentIndex(index);
                    }}
                    style={{
                      padding: '8px',
                      marginBottom: '4px',
                      background: index === currentIndex ? 'rgba(220, 20, 60, 0.3)' : 'rgba(0, 0, 0, 0.3)',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      border: index === currentIndex ? '2px solid #DC143C' : '2px solid transparent',
                    }}
                  >
                    <div style={{ color: '#E8E4D9', marginBottom: '2px', fontSize: '12px', fontWeight: 'bold' }}>
                      {track.title}
                    </div>
                    <div style={{ color: '#B8B8B8', fontSize: '10px' }}>
                      {track.artist} • {track.duration}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
