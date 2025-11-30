// 'use client';

// import { musicPlaylist } from '@/data/music';
// import { useState, useEffect, useRef, useCallback } from 'react';

// export default function EnhancedMusicPlayer() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isExpanded, setIsExpanded] = useState(true);
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [isDragging, setIsDragging] = useState(false);
//   const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
//   const [showPlayer, setShowPlayer] = useState(false);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [isMobile, setIsMobile] = useState(false);
//   const audioRef = useRef<HTMLAudioElement>(null);
//   const hasUserInteractedRef = useRef(false);
//   const shouldContinuePlayingRef = useRef(false);
//   const touchStartPosRef = useRef({ x: 0, y: 0 });
//   const hasDraggedRef = useRef(false);
//   const isTouchingPlayerRef = useRef(false);
//   const playerRef = useRef<HTMLDivElement>(null);
//   const dragHeaderRef = useRef<HTMLDivElement>(null);

//   const currentTrack = musicPlaylist[currentIndex];

//   // Get current player width based on state
//   const getPlayerWidth = useCallback(() => {
//     return isExpanded ? 380 : (isMobile ? 56 : 240);
//   }, [isExpanded, isMobile]);

//   // Detect mobile/desktop
//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 768);
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   // Mouse dragging
//   const handleMouseDown = (e: React.MouseEvent) => {
//     const target = e.target as HTMLElement;
//     if (target.tagName === 'BUTTON' || target.tagName === 'AUDIO' || target.closest('button') || target.closest('audio')) {
//       return;
//     }
    
//     e.preventDefault();
//     setIsDragging(true);
//     setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
//   };

//   const handleMouseMove = useCallback((e: MouseEvent) => {
//     if (!isDragging) return;
//     e.preventDefault();
//     let newX = e.clientX - dragStart.x;
//     let newY = e.clientY - dragStart.y;
//     const playerWidth = getPlayerWidth();
//     const maxX = window.innerWidth - playerWidth;
//     const maxY = window.innerHeight - 150;
//     newX = Math.max(0, Math.min(newX, maxX));
//     newY = Math.max(0, Math.min(newY, maxY));
//     setPosition({ x: newX, y: newY });
//   }, [isDragging, dragStart.x, dragStart.y, getPlayerWidth]);

//   const handleMouseUp = useCallback(() => {
//     if (isDragging) {
//       setIsDragging(false);
//       localStorage.setItem('musicPlayerPos', JSON.stringify(position));
//     }
//   }, [isDragging, position]);

//   // Touch dragging - ONLY from header/drag handle
//   const handleTouchStart = (e: React.TouchEvent) => {
//     const target = e.target as HTMLElement;
    
//     // Don't allow dragging if touching buttons or audio controls
//     if (target.tagName === 'BUTTON' || 
//         target.tagName === 'AUDIO' || 
//         target.closest('button') || 
//         target.closest('audio') ||
//         target.getAttribute('type') === 'range') {
//       isTouchingPlayerRef.current = false;
//       return;
//     }

//     // ONLY allow dragging from the header area
//     if (dragHeaderRef.current && dragHeaderRef.current.contains(target)) {
//       isTouchingPlayerRef.current = true;
//       const touch = e.touches[0];
//       touchStartPosRef.current = { x: touch.clientX, y: touch.clientY };
//       hasDraggedRef.current = false;
//       setDragStart({ x: touch.clientX - position.x, y: touch.clientY - position.y });
//     } else {
//       isTouchingPlayerRef.current = false;
//     }
//   };

//   const handleTouchMove = useCallback((e: TouchEvent) => {
//     // Only process if touch started on the drag handle
//     if (!isTouchingPlayerRef.current) return;
    
//     const touch = e.touches[0];
//     const deltaX = Math.abs(touch.clientX - touchStartPosRef.current.x);
//     const deltaY = Math.abs(touch.clientY - touchStartPosRef.current.y);
    
//     // Increased threshold to 20px for better scroll vs drag detection
//     if (deltaX > 20 || deltaY > 20) {
//       hasDraggedRef.current = true;
//       setIsDragging(true);
      
//       // Only prevent default if we're actually dragging
//       e.preventDefault();
      
//       let newX = touch.clientX - dragStart.x;
//       let newY = touch.clientY - dragStart.y;
//       const playerWidth = getPlayerWidth();
//       const maxX = window.innerWidth - playerWidth;
//       const maxY = window.innerHeight - 150;
//       newX = Math.max(0, Math.min(newX, maxX));
//       newY = Math.max(0, Math.min(newY, maxY));
//       setPosition({ x: newX, y: newY });
//     }
//   }, [dragStart.x, dragStart.y, getPlayerWidth]);

//   const handleTouchEnd = useCallback(() => {
//     // Only process if touch started on the drag handle
//     if (!isTouchingPlayerRef.current) return;
    
//     if (isDragging) {
//       setIsDragging(false);
//       localStorage.setItem('musicPlayerPos', JSON.stringify(position));
//     }
    
//     // If it was a tap (not a drag) and player is minimized, expand it
//     if (!hasDraggedRef.current && !isExpanded) {
//       setIsExpanded(true);
//     }
    
//     hasDraggedRef.current = false;
//     isTouchingPlayerRef.current = false;
//   }, [isDragging, position, isExpanded]);

//   // Manage event listeners for drag
//   useEffect(() => {
//     if (isDragging) {
//       window.addEventListener('mousemove', handleMouseMove);
//       window.addEventListener('mouseup', handleMouseUp);
//     } else {
//       window.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('mouseup', handleMouseUp);
//     }
    
//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('mouseup', handleMouseUp);
//     };
//   }, [isDragging, handleMouseMove, handleMouseUp]);

//   // Touch event listeners
//   useEffect(() => {
//     window.addEventListener('touchmove', handleTouchMove, { passive: false });
//     window.addEventListener('touchend', handleTouchEnd);
    
//     return () => {
//       window.removeEventListener('touchmove', handleTouchMove);
//       window.removeEventListener('touchend', handleTouchEnd);
//     };
//   }, [handleTouchMove, handleTouchEnd]);

//   // Adjust position when player size changes
//   useEffect(() => {
//     const playerWidth = getPlayerWidth();
//     const maxX = window.innerWidth - playerWidth;
//     const maxY = window.innerHeight - 150;
    
//     setPosition(prev => ({
//       x: Math.max(0, Math.min(prev.x, maxX)),
//       y: Math.max(0, Math.min(prev.y, maxY)),
//     }));
//   }, [isExpanded, isMobile, getPlayerWidth]);

//   // Initial position, animation handling
//   useEffect(() => {
//     const saved = localStorage.getItem('musicPlayerPos');
//     if (saved) {
//       try {
//         const savedPos = JSON.parse(saved);
//         const maxX = window.innerWidth - 400;
//         const maxY = window.innerHeight - 150;
//         setPosition({
//           x: Math.max(0, Math.min(savedPos.x, maxX)),
//           y: Math.max(0, Math.min(savedPos.y, maxY)),
//         });
//       } catch {}
//     } else {
//       setPosition({
//         x: window.innerWidth - 400,
//         y: window.innerHeight - 100,
//       });
//     }
//     const hasSeenAnimation = sessionStorage.getItem('hasSeenAnimation');
//     if (hasSeenAnimation) {
//       setShowPlayer(true);
//     } else {
//       setTimeout(() => setShowPlayer(true), 3500);
//     }
//   }, []);

//   // Audio event listeners
//   useEffect(() => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     const handleEnded = () => {
//       shouldContinuePlayingRef.current = true;
//       const nextIndex = (currentIndex + 1) % musicPlaylist.length;
//       setCurrentIndex(nextIndex);
//     };
//     const handlePlay = () => {
//       setIsPlaying(true);
//       hasUserInteractedRef.current = true;
//     };
//     const handlePause = () => {
//       setIsPlaying(false);
//     };
//     const handleTimeUpdate = () => {
//       setCurrentTime(audio.currentTime);
//     };

//     audio.addEventListener('ended', handleEnded);
//     audio.addEventListener('play', handlePlay);
//     audio.addEventListener('pause', handlePause);
//     audio.addEventListener('timeupdate', handleTimeUpdate);

//     return () => {
//       audio.removeEventListener('ended', handleEnded);
//       audio.removeEventListener('play', handlePlay);
//       audio.removeEventListener('pause', handlePause);
//       audio.removeEventListener('timeupdate', handleTimeUpdate);
//     };
//   }, [currentIndex, currentTrack.title]);

//   // Load track when index changes
//   useEffect(() => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     audio.src = currentTrack.file;
//     audio.load();
//     setCurrentTime(0);

//     if (shouldContinuePlayingRef.current && hasUserInteractedRef.current) {
//       const attemptPlay = () => {
//         audio.play()
//           .then(() => { shouldContinuePlayingRef.current = false; })
//           .catch(() => { shouldContinuePlayingRef.current = false; });
//       };
//       audio.addEventListener('canplay', attemptPlay, { once: true });
//       return () => {
//         audio.removeEventListener('canplay', attemptPlay);
//       };
//     }
//   }, [currentIndex, currentTrack.file, currentTrack.title]);

//   // Snap to nearest corner
//   const snapToCorner = () => {
//     const playerWidth = getPlayerWidth();
//     const corners = [
//       { x: 20, y: 100 },
//       { x: Math.max(20, window.innerWidth - playerWidth - 20), y: 100 },
//       { x: 20, y: Math.max(100, window.innerHeight - 150) },
//       { x: Math.max(20, window.innerWidth - playerWidth - 20), y: Math.max(100, window.innerHeight - 150) },
//     ];
//     let nearest = corners[3];
//     let minDist = Infinity;
//     corners.forEach(corner => {
//       const dist = Math.hypot(corner.x - position.x, corner.y - position.y);
//       if (dist < minDist) {
//         minDist = dist;
//         nearest = corner;
//       }
//     });
//     setPosition(nearest);
//     localStorage.setItem('musicPlayerPos', JSON.stringify(nearest));
//   };

//   const formatTime = (seconds: number) => {
//     if (!seconds || isNaN(seconds)) return '0:00';
//     const mins = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   if (!showPlayer) return null;

//   return (
//     <div
//       ref={playerRef}
//       style={{
//         position: 'fixed',
//         left: `${position.x}px`,
//         top: `${position.y}px`,
//         width: isExpanded ? '380px' : (isMobile ? '56px' : '240px'),
//         background: 'linear-gradient(135deg, #4d0000 0%, #6b0000 100%)',
//         border: '3px solid #2d0000',
//         borderRadius: '16px',
//         boxShadow: '0 12px 48px rgba(0, 0, 0, 0.9), inset 0 0 60px rgba(139, 0, 0, 0.3)',
//         zIndex: 11000,
//         cursor: 'default',
//         animation: 'fadeInUp 0.5s ease-out',
//         transition: 'width 0.3s ease',
//         userSelect: 'none',
//         WebkitUserSelect: 'none',
//         overflow: 'hidden', // ADDED: Prevent content overflow
//       }}
//     >
//       <style>{`
//         @keyframes fadeInUp {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes marquee {
//           0% { transform: translateX(100%); }
//           100% { transform: translateX(-150%); }
//         }
//         .marquee-container {
//           overflow: hidden;
//           position: relative;
//           width: 100%;
//         }
//         .marquee-text {
//           display: inline-block;
//           white-space: nowrap;
//           padding-right: 50px;
//           animation: marquee 15s linear infinite;
//         }
//         /* ADDED: Webkit scrollbar styling for playlist */
//         .playlist-scroll::-webkit-scrollbar {
//           width: 6px;
//         }
//         .playlist-scroll::-webkit-scrollbar-track {
//           background: rgba(0, 0, 0, 0.3);
//           border-radius: 3px;
//         }
//         .playlist-scroll::-webkit-scrollbar-thumb {
//           background: #8B0000;
//           border-radius: 3px;
//         }
//         .playlist-scroll::-webkit-scrollbar-thumb:hover {
//           background: #DC143C;
//         }
//       `}</style>

//       {/* Header - DRAG HANDLE ONLY */}
//       <div 
//         ref={dragHeaderRef}
//         onMouseDown={handleMouseDown}
//         onTouchStart={handleTouchStart}
//         style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           padding: isExpanded ? '12px 16px' : (isMobile ? '12px' : '10px 12px'),
//           borderBottom: isExpanded ? '2px solid #2d0000' : 'none',
//           cursor: isDragging ? 'grabbing' : 'grab',
//           touchAction: 'none', // Prevent scroll only on header
//         }}
//       >
//         {isExpanded ? (
//           <>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', pointerEvents: 'none' }}>
//               <span style={{ fontSize: '20px' }}>🎵</span>
//               <span style={{
//                 fontFamily: 'Creepster, cursive',
//                 color: '#E8E4D9',
//                 fontSize: '16px',
//                 fontWeight: 700,
//                 textShadow: '0 0 10px rgba(220, 20, 60, 0.8)',
//               }}>
//                 MIDNIGHT SOUNDS
//               </span>
//             </div>
//             <div style={{ display: 'flex', gap: '8px', pointerEvents: 'auto' }}>
//               <button onClick={(e) => {
//                 e.stopPropagation();
//                 setIsExpanded(!isExpanded);
//               }} style={{
//                 background: 'transparent',
//                 border: '2px solid #E8E4D9',
//                 color: '#E8E4D9',
//                 padding: '4px 10px',
//                 borderRadius: '6px',
//                 cursor: 'pointer',
//                 fontSize: '16px',
//                 fontWeight: 'bold',
//               }}>
//                 −
//               </button>
//               <button onClick={(e) => {
//                 e.stopPropagation();
//                 snapToCorner();
//               }} style={{
//                 background: 'transparent',
//                 border: '2px solid #E8E4D9',
//                 color: '#E8E4D9',
//                 padding: '4px 10px',
//                 borderRadius: '6px',
//                 cursor: 'pointer',
//                 fontSize: '16px',
//               }}>⚓</button>
//             </div>
//           </>
//         ) : (
//           // Minimized view
//           <div style={{ 
//             width: '100%', 
//             display: 'flex', 
//             alignItems: 'center',
//             justifyContent: isMobile ? 'center' : 'space-between',
//             gap: '6px',
//           }}>
//             {isMobile ? (
//               <div
//                 style={{
//                   fontSize: '28px',
//                   padding: '4px',
//                   cursor: 'pointer',
//                   pointerEvents: 'none',
//                 }}
//               >
//                 🎵
//               </div>
//             ) : (
//               <>
//                 <div className="marquee-container" style={{ 
//                   flex: 1,
//                   minWidth: 0,
//                   pointerEvents: 'none',
//                 }}>
//                   <div className="marquee-text" style={{
//                     color: '#E8E4D9',
//                     fontSize: '12px',
//                     fontWeight: 'bold',
//                   }}>
//                     {isPlaying && '▶ '}{currentTrack.title} - {currentTrack.artist}
//                   </div>
//                 </div>
//                 <div style={{ display: 'flex', gap: '4px', flexShrink: 0, pointerEvents: 'auto' }}>
//                   <button onClick={(e) => {
//                     e.stopPropagation();
//                     setIsExpanded(true);
//                   }} style={{
//                     background: 'transparent',
//                     border: '2px solid #E8E4D9',
//                     color: '#E8E4D9',
//                     padding: '2px 6px',
//                     borderRadius: '4px',
//                     cursor: 'pointer',
//                     fontSize: '12px',
//                     fontWeight: 'bold',
//                   }}>
//                     +
//                   </button>
//                   <button onClick={(e) => {
//                     e.stopPropagation();
//                     snapToCorner();
//                   }} style={{
//                     background: 'transparent',
//                     border: '2px solid #E8E4D9',
//                     color: '#E8E4D9',
//                     padding: '2px 6px',
//                     borderRadius: '4px',
//                     cursor: 'pointer',
//                     fontSize: '12px',
//                   }}>⚓</button>
//                 </div>
//               </>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Content area - FULLY SCROLLABLE, NO DRAGGING */}
//       <div style={{ 
//         padding: isExpanded ? '16px' : '0',
//         paddingTop: isExpanded ? '16px' : '0',
//         overflowY: 'auto', // ADDED: Allow scrolling in content area
//         maxHeight: isExpanded ? 'calc(100vh - 200px)' : '0', // ADDED: Limit height
//       }}>
//         {/* NOW PLAYING info */}
//         {isExpanded && (
//           <div style={{
//             marginBottom: '12px',
//             padding: '12px',
//             background: 'rgba(0, 0, 0, 0.4)',
//             borderRadius: '8px',
//             border: '2px solid #8B0000',
//           }}>
//             <div style={{
//               fontSize: '10px',
//               color: '#DC143C',
//               marginBottom: '4px',
//               textTransform: 'uppercase',
//               letterSpacing: '1px',
//               fontWeight: 'bold',
//             }}>
//               NOW PLAYING {isPlaying && '• ▶'}
//             </div>
//             <div style={{
//               fontSize: '14px',
//               color: '#E8E4D9',
//               fontWeight: 'bold',
//               marginBottom: '2px',
//             }}>
//               {currentTrack.title}
//             </div>
//             <div style={{ fontSize: '11px', color: '#B8B8B8' }}>
//               {currentTrack.artist} • {formatTime(currentTime)}
//             </div>
//           </div>
//         )}

//         {/* Audio element */}
//         <audio
//           ref={audioRef}
//           controls
//           src={currentTrack.file}
//           style={{
//             width: isExpanded ? '100%' : '0',
//             height: isExpanded ? '40px' : '0',
//             marginBottom: isExpanded ? '12px' : '0',
//             borderRadius: '8px',
//             display: isExpanded ? 'block' : 'none',
//           }}
//           preload="auto"
//         />

//         {/* Controls and Playlist */}
//         {isExpanded && (
//           <>
//             <div style={{
//               display: 'flex',
//               justifyContent: 'center',
//               gap: '12px',
//               marginBottom: '12px',
//             }}>
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   hasUserInteractedRef.current = true;
//                   if (audioRef.current && !audioRef.current.paused) {
//                     shouldContinuePlayingRef.current = true;
//                   }
//                   setCurrentIndex((currentIndex - 1 + musicPlaylist.length) % musicPlaylist.length);
//                 }}
//                 style={{
//                   background: 'rgba(0, 0, 0, 0.4)',
//                   border: '2px solid #8B0000',
//                   color: '#E8E4D9',
//                   padding: '8px 20px',
//                   borderRadius: '8px',
//                   cursor: 'pointer',
//                   fontSize: '13px',
//                   fontWeight: 'bold',
//                 }}
//               >
//                 ⏮ Prev
//               </button>
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   if (audioRef.current) {
//                     if (audioRef.current.paused) {
//                       hasUserInteractedRef.current = true;
//                       audioRef.current.play();
//                     } else {
//                       audioRef.current.pause();
//                     }
//                   }
//                 }}
//                 style={{
//                   background: isPlaying ? 'rgba(220, 20, 60, 0.6)' : 'rgba(0, 0, 0, 0.4)',
//                   border: '2px solid #DC143C',
//                   color: '#E8E4D9',
//                   padding: '8px 20px',
//                   borderRadius: '8px',
//                   cursor: 'pointer',
//                   fontSize: '13px',
//                   fontWeight: 'bold',
//                 }}
//               >
//                 {isPlaying ? '⏸ Pause' : '▶ Play'}
//               </button>
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   hasUserInteractedRef.current = true;
//                   if (audioRef.current && !audioRef.current.paused) {
//                     shouldContinuePlayingRef.current = true;
//                   }
//                   setCurrentIndex((currentIndex + 1) % musicPlaylist.length);
//                 }}
//                 style={{
//                   background: 'rgba(0, 0, 0, 0.4)',
//                   border: '2px solid #8B0000',
//                   color: '#E8E4D9',
//                   padding: '8px 20px',
//                   borderRadius: '8px',
//                   cursor: 'pointer',
//                   fontSize: '13px',
//                   fontWeight: 'bold',
//                 }}
//               >
//                 Next ⏭
//               </button>
//             </div>

//             <div>
//               <div style={{
//                 fontSize: '10px',
//                 color: '#DC143C',
//                 marginBottom: '8px',
//                 textTransform: 'uppercase',
//                 letterSpacing: '1px',
//                 fontWeight: 'bold',
//               }}>
//                 PLAYLIST ({musicPlaylist.length} TRACKS)
//               </div>
//               {/* CHANGED: Added className for scrollbar styling */}
//               <div 
//                 className="playlist-scroll"
//                 style={{
//                   maxHeight: '120px',
//                   overflowY: 'auto',
//                   overflowX: 'hidden', // ADDED: Prevent horizontal scroll
//                   fontSize: '12px',
//                 }}
//               >
//                 {musicPlaylist.map((track, index) => (
//                   <div
//                     key={track.id}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       hasUserInteractedRef.current = true;
//                       if (audioRef.current && !audioRef.current.paused) {
//                         shouldContinuePlayingRef.current = true;
//                       }
//                       setCurrentIndex(index);
//                     }}
//                     style={{
//                       padding: '8px',
//                       marginBottom: '4px',
//                       background: index === currentIndex
//                         ? 'rgba(220, 20, 60, 0.3)'
//                         : 'rgba(0, 0, 0, 0.3)',
//                       borderRadius: '6px',
//                       cursor: 'pointer',
//                       border: index === currentIndex
//                         ? '2px solid #DC143C'
//                         : '2px solid transparent',
//                     }}
//                   >
//                     <div style={{ color: '#E8E4D9', marginBottom: '2px', fontSize: '12px', fontWeight: 'bold' }}>
//                       {index === currentIndex && '▶ '}{track.title}
//                     </div>
//                     <div style={{ color: '#B8B8B8', fontSize: '10px' }}>
//                       {track.artist} • {track.duration}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }


// WITH COLOR CHANING ICON


'use client';

import { musicPlaylist } from '@/data/music';
import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './MusicPlayer.module.scss';

export default function EnhancedMusicPlayer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showPlayer, setShowPlayer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const hasUserInteractedRef = useRef(false);
  const shouldContinuePlayingRef = useRef(false);
  const touchStartPosRef = useRef({ x: 0, y: 0 });
  const hasDraggedRef = useRef(false);
  const isTouchingPlayerRef = useRef(false);
  const playerRef = useRef<HTMLDivElement>(null);
  const dragHeaderRef = useRef<HTMLDivElement>(null);

  const currentTrack = musicPlaylist[currentIndex];

  const getPlayerWidth = useCallback(() => {
    return isExpanded ? 380 : isMobile ? 56 : 240;
  }, [isExpanded, isMobile]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
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
    if (isDragging) {
      setIsDragging(false);
      localStorage.setItem('musicPlayerPos', JSON.stringify(position));
    }
  }, [isDragging, position]);

  const handleTouchStart = (e: React.TouchEvent) => {
    const target = e.target as HTMLElement;

    if (
      target.tagName === 'BUTTON' ||
      target.tagName === 'AUDIO' ||
      target.closest('button') ||
      target.closest('audio') ||
      target.getAttribute('type') === 'range'
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

      if (deltaX > 20 || deltaY > 20) {
        hasDraggedRef.current = true;
        setIsDragging(true);
        e.preventDefault();

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
      { x: Math.max(20, window.innerWidth - playerWidth - 20), y: Math.max(100, window.innerHeight - 150) },
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
      ref={playerRef}
      className={styles.musicPlayer}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: isExpanded ? '380px' : isMobile ? '56px' : '240px',
      }}
    >
      <div
        ref={dragHeaderRef}
        className={styles.header}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
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
                className={styles.controlBtn}
                onClick={e => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
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

      {/* CRITICAL FIX: Audio always rendered, just hidden when minimized */}
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
  );
}




// WITH ICON

// 'use client';

// import { musicPlaylist } from '@/data/music';
// import { useState, useEffect, useRef, useCallback } from 'react';

// export default function EnhancedMusicPlayer() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isExpanded, setIsExpanded] = useState(true);
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [isDragging, setIsDragging] = useState(false);
//   const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
//   const [showPlayer, setShowPlayer] = useState(false);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [isMobile, setIsMobile] = useState(false);
//   const audioRef = useRef<HTMLAudioElement>(null);
//   const hasUserInteractedRef = useRef(false);
//   const shouldContinuePlayingRef = useRef(false);
//   const touchStartPosRef = useRef({ x: 0, y: 0 });
//   const hasDraggedRef = useRef(false);
//   const isTouchingPlayerRef = useRef(false);
//   const playerRef = useRef<HTMLDivElement>(null);
//   const dragHeaderRef = useRef<HTMLDivElement>(null);

//   const currentTrack = musicPlaylist[currentIndex];

//   // Get current player width based on state
//   const getPlayerWidth = useCallback(() => {
//     return isExpanded ? 380 : (isMobile ? 56 : 240);
//   }, [isExpanded, isMobile]);

//   // Detect mobile/desktop
//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 768);
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   // Mouse dragging
//   const handleMouseDown = (e: React.MouseEvent) => {
//     const target = e.target as HTMLElement;
//     if (
//       target.tagName === 'BUTTON' ||
//       target.tagName === 'AUDIO' ||
//       target.closest('button') ||
//       target.closest('audio')
//     ) {
//       return;
//     }

//     e.preventDefault();
//     setIsDragging(true);
//     setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
//   };

//   const handleMouseMove = useCallback(
//     (e: MouseEvent) => {
//       if (!isDragging) return;
//       e.preventDefault();
//       let newX = e.clientX - dragStart.x;
//       let newY = e.clientY - dragStart.y;
//       const playerWidth = getPlayerWidth();
//       const maxX = window.innerWidth - playerWidth;
//       const maxY = window.innerHeight - 150;
//       newX = Math.max(0, Math.min(newX, maxX));
//       newY = Math.max(0, Math.min(newY, maxY));
//       setPosition({ x: newX, y: newY });
//     },
//     [isDragging, dragStart.x, dragStart.y, getPlayerWidth],
//   );

//   const handleMouseUp = useCallback(() => {
//     if (isDragging) {
//       setIsDragging(false);
//       localStorage.setItem('musicPlayerPos', JSON.stringify(position));
//     }
//   }, [isDragging, position]);

//   // Touch dragging - ONLY from header/drag handle
//   const handleTouchStart = (e: React.TouchEvent) => {
//     const target = e.target as HTMLElement;

//     if (
//       target.tagName === 'BUTTON' ||
//       target.tagName === 'AUDIO' ||
//       target.closest('button') ||
//       target.closest('audio') ||
//       target.getAttribute('type') === 'range'
//     ) {
//       isTouchingPlayerRef.current = false;
//       return;
//     }

//     if (dragHeaderRef.current && dragHeaderRef.current.contains(target)) {
//       isTouchingPlayerRef.current = true;
//       const touch = e.touches[0];
//       touchStartPosRef.current = { x: touch.clientX, y: touch.clientY };
//       hasDraggedRef.current = false;
//       setDragStart({ x: touch.clientX - position.x, y: touch.clientY - position.y });
//     } else {
//       isTouchingPlayerRef.current = false;
//     }
//   };

//   const handleTouchMove = useCallback(
//     (e: TouchEvent) => {
//       if (!isTouchingPlayerRef.current) return;

//       const touch = e.touches[0];
//       const deltaX = Math.abs(touch.clientX - touchStartPosRef.current.x);
//       const deltaY = Math.abs(touch.clientY - touchStartPosRef.current.y);

//       if (deltaX > 20 || deltaY > 20) {
//         hasDraggedRef.current = true;
//         setIsDragging(true);
//         e.preventDefault();

//         let newX = touch.clientX - dragStart.x;
//         let newY = touch.clientY - dragStart.y;
//         const playerWidth = getPlayerWidth();
//         const maxX = window.innerWidth - playerWidth;
//         const maxY = window.innerHeight - 150;
//         newX = Math.max(0, Math.min(newX, maxX));
//         newY = Math.max(0, Math.min(newY, maxY));
//         setPosition({ x: newX, y: newY });
//       }
//     },
//     [dragStart.x, dragStart.y, getPlayerWidth],
//   );

//   const handleTouchEnd = useCallback(
//     () => {
//       if (!isTouchingPlayerRef.current) return;

//       if (isDragging) {
//         setIsDragging(false);
//         localStorage.setItem('musicPlayerPos', JSON.stringify(position));
//       }

//       if (!hasDraggedRef.current && !isExpanded) {
//         setIsExpanded(true);
//       }

//       hasDraggedRef.current = false;
//       isTouchingPlayerRef.current = false;
//     },
//     [isDragging, position, isExpanded],
//   );

//   // Manage event listeners for drag
//   useEffect(() => {
//     if (isDragging) {
//       window.addEventListener('mousemove', handleMouseMove);
//       window.addEventListener('mouseup', handleMouseUp);
//     } else {
//       window.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('mouseup', handleMouseUp);
//     }

//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('mouseup', handleMouseUp);
//     };
//   }, [isDragging, handleMouseMove, handleMouseUp]);

//   // Touch event listeners
//   useEffect(() => {
//     window.addEventListener('touchmove', handleTouchMove, { passive: false });
//     window.addEventListener('touchend', handleTouchEnd);

//     return () => {
//       window.removeEventListener('touchmove', handleTouchMove);
//       window.removeEventListener('touchend', handleTouchEnd);
//     };
//   }, [handleTouchMove, handleTouchEnd]);

//   // Adjust position when player size changes
//   useEffect(() => {
//     const playerWidth = getPlayerWidth();
//     const maxX = window.innerWidth - playerWidth;
//     const maxY = window.innerHeight - 150;

//     setPosition(prev => ({
//       x: Math.max(0, Math.min(prev.x, maxX)),
//       y: Math.max(0, Math.min(prev.y, maxY)),
//     }));
//   }, [isExpanded, isMobile, getPlayerWidth]);

//   // Initial position, animation handling
//   useEffect(() => {
//     const saved = localStorage.getItem('musicPlayerPos');
//     if (saved) {
//       try {
//         const savedPos = JSON.parse(saved);
//         const maxX = window.innerWidth - 400;
//         const maxY = window.innerHeight - 150;
//         setPosition({
//           x: Math.max(0, Math.min(savedPos.x, maxX)),
//           y: Math.max(0, Math.min(savedPos.y, maxY)),
//         });
//       } catch {}
//     } else {
//       setPosition({
//         x: window.innerWidth - 400,
//         y: window.innerHeight - 100,
//       });
//     }
//     const hasSeenAnimation = sessionStorage.getItem('hasSeenAnimation');
//     if (hasSeenAnimation) {
//       setShowPlayer(true);
//     } else {
//       setTimeout(() => setShowPlayer(true), 3500);
//     }
//   }, []);

//   // Audio event listeners - FIXED to properly detect play/pause
//   useEffect(() => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     const handleEnded = () => {
//       shouldContinuePlayingRef.current = true;
//       const nextIndex = (currentIndex + 1) % musicPlaylist.length;
//       setCurrentIndex(nextIndex);
//     };
    
//     const handlePlay = () => {
//       setIsPlaying(true);
//       hasUserInteractedRef.current = true;
//     };
    
//     const handlePause = () => {
//       setIsPlaying(false);
//     };
    
//     const handleTimeUpdate = () => {
//       setCurrentTime(audio.currentTime);
//       // Also check if playing (some browsers don't fire play event reliably)
//       if (!audio.paused && !isPlaying) {
//         setIsPlaying(true);
//       }
//     };

//     // Also listen to 'playing' event for better reliability
//     const handlePlaying = () => {
//       setIsPlaying(true);
//     };

//     audio.addEventListener('ended', handleEnded);
//     audio.addEventListener('play', handlePlay);
//     audio.addEventListener('playing', handlePlaying);
//     audio.addEventListener('pause', handlePause);
//     audio.addEventListener('timeupdate', handleTimeUpdate);

//     return () => {
//       audio.removeEventListener('ended', handleEnded);
//       audio.removeEventListener('play', handlePlay);
//       audio.removeEventListener('playing', handlePlaying);
//       audio.removeEventListener('pause', handlePause);
//       audio.removeEventListener('timeupdate', handleTimeUpdate);
//     };
//   }, [currentIndex, isPlaying]);

//   // Load track when index changes
//   useEffect(() => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     audio.src = currentTrack.file;
//     audio.load();
//     setCurrentTime(0);

//     if (shouldContinuePlayingRef.current && hasUserInteractedRef.current) {
//       const attemptPlay = () => {
//         audio
//           .play()
//           .then(() => {
//             shouldContinuePlayingRef.current = false;
//           })
//           .catch(() => {
//             shouldContinuePlayingRef.current = false;
//           });
//       };
//       audio.addEventListener('canplay', attemptPlay, { once: true });
//       return () => {
//         audio.removeEventListener('canplay', attemptPlay);
//       };
//     }
//   }, [currentIndex, currentTrack.file, currentTrack.title]);

//   // Snap to nearest corner
//   const snapToCorner = () => {
//     const playerWidth = getPlayerWidth();
//     const corners = [
//       { x: 20, y: 100 },
//       { x: Math.max(20, window.innerWidth - playerWidth - 20), y: 100 },
//       { x: 20, y: Math.max(100, window.innerHeight - 150) },
//       { x: Math.max(20, window.innerWidth - playerWidth - 20), y: Math.max(100, window.innerHeight - 150) },
//     ];
//     let nearest = corners[3];
//     let minDist = Infinity;
//     corners.forEach(corner => {
//       const dist = Math.hypot(corner.x - position.x, corner.y - position.y);
//       if (dist < minDist) {
//         minDist = dist;
//         nearest = corner;
//       }
//     });
//     setPosition(nearest);
//     localStorage.setItem('musicPlayerPos', JSON.stringify(nearest));
//   };

//   const formatTime = (seconds: number) => {
//     if (!seconds || isNaN(seconds)) return '0:00';
//     const mins = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   if (!showPlayer) return null;

//   return (
//     <div
//       ref={playerRef}
//       style={{
//         position: 'fixed',
//         left: `${position.x}px`,
//         top: `${position.y}px`,
//         width: isExpanded ? '380px' : isMobile ? '56px' : '240px',
//         background: 'linear-gradient(135deg, #4d0000 0%, #6b0000 100%)',
//         border: '3px solid #2d0000',
//         borderRadius: '16px',
//         boxShadow: '0 12px 48px rgba(0, 0, 0, 0.9), inset 0 0 60px rgba(139, 0, 0, 0.3)',
//         zIndex: 11000,
//         cursor: 'default',
//         animation: 'fadeInUp 0.5s ease-out',
//         transition: 'width 0.3s ease',
//         userSelect: 'none',
//         WebkitUserSelect: 'none',
//         overflow: 'hidden',
//       }}
//     >
//       <style>{`
//         @keyframes fadeInUp {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes marquee {
//           0% { transform: translateX(100%); }
//           100% { transform: translateX(-150%); }
//         }
//         @keyframes pulse {
//           0%, 100% { 
//             transform: scale(1); 
//             filter: brightness(1) drop-shadow(0 0 4px rgba(220, 20, 60, 0.5));
//           }
//           50% { 
//             transform: scale(1.1); 
//             filter: brightness(1.4) drop-shadow(0 0 12px rgba(220, 20, 60, 0.9));
//           }
//         }
//         .marquee-container {
//           overflow: hidden;
//           position: relative;
//           width: 100%;
//         }
//         .marquee-text {
//           display: inline-block;
//           white-space: nowrap;
//           padding-right: 50px;
//           animation: marquee 15s linear infinite;
//         }
//         .playlist-scroll::-webkit-scrollbar {
//           width: 6px;
//         }
//         .playlist-scroll::-webkit-scrollbar-track {
//           background: rgba(0, 0, 0, 0.3);
//           border-radius: 3px;
//         }
//         .playlist-scroll::-webkit-scrollbar-thumb {
//           background: #8B0000;
//           border-radius: 3px;
//         }
//         .playlist-scroll::-webkit-scrollbar-thumb:hover {
//           background: #DC143C;
//         }
//         .note-icon {
//           width: 36px;
//           height: 36px;
//           background-size: contain;
//           background-repeat: no-repeat;
//           background-position: center;
//           transition: all 0.3s ease;
//         }
//         .note-icon.idle {
//           background-image: url('/icons/note-idle.png');
//           opacity: 0.85;
//         }
//         .note-icon.playing {
//           background-image: url('/icons/note-playing.png');
//           animation: pulse 1.5s ease-in-out infinite;
//           opacity: 1;
//         }
//       `}</style>

//       {/* Header - DRAG HANDLE ONLY */}
//       <div
//         ref={dragHeaderRef}
//         onMouseDown={handleMouseDown}
//         onTouchStart={handleTouchStart}
//         style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           padding: isExpanded ? '12px 16px' : isMobile ? '12px' : '10px 12px',
//           borderBottom: isExpanded ? '2px solid #2d0000' : 'none',
//           cursor: isDragging ? 'grabbing' : 'grab',
//           touchAction: 'none',
//         }}
//       >
//         {isExpanded ? (
//           <>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', pointerEvents: 'none' }}>
//               <div className={`note-icon ${isPlaying ? 'playing' : 'idle'}`} />
//               <span
//                 style={{
//                   fontFamily: 'Creepster, cursive',
//                   color: '#E8E4D9',
//                   fontSize: '16px',
//                   fontWeight: 700,
//                   textShadow: '0 0 10px rgba(220, 20, 60, 0.8)',
//                 }}
//               >
//                 MIDNIGHT SOUNDS
//               </span>
//             </div>
//             <div style={{ display: 'flex', gap: '8px', pointerEvents: 'auto' }}>
//               <button
//                 onClick={e => {
//                   e.stopPropagation();
//                   setIsExpanded(!isExpanded);
//                 }}
//                 style={{
//                   background: 'transparent',
//                   border: '2px solid #E8E4D9',
//                   color: '#E8E4D9',
//                   padding: '4px 10px',
//                   borderRadius: '6px',
//                   cursor: 'pointer',
//                   fontSize: '16px',
//                   fontWeight: 'bold',
//                 }}
//               >
//                 −
//               </button>
//               <button
//                 onClick={e => {
//                   e.stopPropagation();
//                   snapToCorner();
//                 }}
//                 style={{
//                   background: 'transparent',
//                   border: '2px solid #E8E4D9',
//                   color: '#E8E4D9',
//                   padding: '4px 10px',
//                   borderRadius: '6px',
//                   cursor: 'pointer',
//                   fontSize: '16px',
//                 }}
//               >
//                 ⚓
//               </button>
//             </div>
//           </>
//         ) : (
//           // Minimized view
//           <div
//             style={{
//               width: '100%',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: isMobile ? 'center' : 'space-between',
//               gap: '6px',
//             }}
//           >
//             {isMobile ? (
//               <div
//                 style={{
//                   padding: '4px',
//                   pointerEvents: 'none',
//                 }}
//               >
//                 <div className={`note-icon ${isPlaying ? 'playing' : 'idle'}`} />
//               </div>
//             ) : (
//               <>
//                 <div
//                   style={{
//                     padding: '4px',
//                     marginRight: '4px',
//                     pointerEvents: 'none',
//                   }}
//                 >
//                   <div className={`note-icon ${isPlaying ? 'playing' : 'idle'}`} />
//                 </div>
//                 <div
//                   className="marquee-container"
//                   style={{
//                     flex: 1,
//                     minWidth: 0,
//                     pointerEvents: 'none',
//                   }}
//                 >
//                   <div
//                     className="marquee-text"
//                     style={{
//                       color: '#E8E4D9',
//                       fontSize: '12px',
//                       fontWeight: 'bold',
//                     }}
//                   >
//                     {currentTrack.title} - {currentTrack.artist}
//                   </div>
//                 </div>
//                 <div
//                   style={{
//                     display: 'flex',
//                     gap: '4px',
//                     flexShrink: 0,
//                     pointerEvents: 'auto',
//                   }}
//                 >
//                   <button
//                     onClick={e => {
//                       e.stopPropagation();
//                       setIsExpanded(true);
//                     }}
//                     style={{
//                       background: 'transparent',
//                       border: '2px solid #E8E4D9',
//                       color: '#E8E4D9',
//                       padding: '2px 6px',
//                       borderRadius: '4px',
//                       cursor: 'pointer',
//                       fontSize: '12px',
//                       fontWeight: 'bold',
//                     }}
//                   >
//                     +
//                   </button>
//                   <button
//                     onClick={e => {
//                       e.stopPropagation();
//                       snapToCorner();
//                     }}
//                     style={{
//                       background: 'transparent',
//                       border: '2px solid #E8E4D9',
//                       color: '#E8E4D9',
//                       padding: '2px 6px',
//                       borderRadius: '4px',
//                       cursor: 'pointer',
//                       fontSize: '12px',
//                     }}
//                   >
//                     ⚓
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Content area */}
//       <div
//         style={{
//           padding: isExpanded ? '16px' : '0',
//           paddingTop: isExpanded ? '16px' : '0',
//           overflowY: 'auto',
//           maxHeight: isExpanded ? 'calc(100vh - 200px)' : '0',
//         }}
//       >
//         {/* NOW PLAYING info */}
//         {isExpanded && (
//           <div
//             style={{
//               marginBottom: '12px',
//               padding: '12px',
//               background: 'rgba(0, 0, 0, 0.4)',
//               borderRadius: '8px',
//               border: `2px solid ${isPlaying ? '#DC143C' : '#8B0000'}`,
//             }}
//           >
//             <div
//               style={{
//                 fontSize: '10px',
//                 color: isPlaying ? '#DC143C' : '#8B0000',
//                 marginBottom: '4px',
//                 textTransform: 'uppercase',
//                 letterSpacing: '1px',
//                 fontWeight: 'bold',
//               }}
//             >
//               NOW PLAYING {isPlaying ? '• LIVE' : ''}
//             </div>
//             <div
//               style={{
//                 fontSize: '14px',
//                 color: '#E8E4D9',
//                 fontWeight: 'bold',
//                 marginBottom: '2px',
//               }}
//             >
//               {currentTrack.title}
//             </div>
//             <div style={{ fontSize: '11px', color: '#B8B8B8' }}>
//               {currentTrack.artist} • {formatTime(currentTime)}
//             </div>
//           </div>
//         )}

//         {/* Audio element */}
//         <audio
//           ref={audioRef}
//           controls
//           src={currentTrack.file}
//           style={{
//             width: isExpanded ? '100%' : '0',
//             height: isExpanded ? '40px' : '0',
//             marginBottom: isExpanded ? '12px' : '0',
//             borderRadius: '8px',
//             display: isExpanded ? 'block' : 'none',
//           }}
//           preload="auto"
//         />

//         {/* Controls and Playlist */}
//         {isExpanded && (
//           <>
//             <div
//               style={{
//                 display: 'flex',
//                 justifyContent: 'center',
//                 gap: '12px',
//                 marginBottom: '12px',
//               }}
//             >
//               <button
//                 onClick={e => {
//                   e.stopPropagation();
//                   hasUserInteractedRef.current = true;
//                   if (audioRef.current && !audioRef.current.paused) {
//                     shouldContinuePlayingRef.current = true;
//                   }
//                   setCurrentIndex((currentIndex - 1 + musicPlaylist.length) % musicPlaylist.length);
//                 }}
//                 style={{
//                   background: 'rgba(0, 0, 0, 0.4)',
//                   border: '2px solid #8B0000',
//                   color: '#E8E4D9',
//                   padding: '8px 20px',
//                   borderRadius: '8px',
//                   cursor: 'pointer',
//                   fontSize: '13px',
//                   fontWeight: 'bold',
//                 }}
//               >
//                 ⏮ Prev
//               </button>
//               <button
//                 onClick={e => {
//                   e.stopPropagation();
//                   if (audioRef.current) {
//                     if (audioRef.current.paused) {
//                       hasUserInteractedRef.current = true;
//                       audioRef.current.play();
//                     } else {
//                       audioRef.current.pause();
//                     }
//                   }
//                 }}
//                 style={{
//                   background: isPlaying ? 'rgba(220, 20, 60, 0.6)' : 'rgba(0, 0, 0, 0.4)',
//                   border: '2px solid #DC143C',
//                   color: '#E8E4D9',
//                   padding: '8px 20px',
//                   borderRadius: '8px',
//                   cursor: 'pointer',
//                   fontSize: '13px',
//                   fontWeight: 'bold',
//                 }}
//               >
//                 {isPlaying ? '⏸ Pause' : '▶ Play'}
//               </button>
//               <button
//                 onClick={e => {
//                   e.stopPropagation();
//                   hasUserInteractedRef.current = true;
//                   if (audioRef.current && !audioRef.current.paused) {
//                     shouldContinuePlayingRef.current = true;
//                   }
//                   setCurrentIndex((currentIndex + 1) % musicPlaylist.length);
//                 }}
//                 style={{
//                   background: 'rgba(0, 0, 0, 0.4)',
//                   border: '2px solid #8B0000',
//                   color: '#E8E4D9',
//                   padding: '8px 20px',
//                   borderRadius: '8px',
//                   cursor: 'pointer',
//                   fontSize: '13px',
//                   fontWeight: 'bold',
//                 }}
//               >
//                 Next ⏭
//               </button>
//             </div>

//             <div>
//               <div
//                 style={{
//                   fontSize: '10px',
//                   color: '#DC143C',
//                   marginBottom: '8px',
//                   textTransform: 'uppercase',
//                   letterSpacing: '1px',
//                   fontWeight: 'bold',
//                 }}
//               >
//                 PLAYLIST ({musicPlaylist.length} TRACKS)
//               </div>
//               <div
//                 className="playlist-scroll"
//                 style={{
//                   maxHeight: '120px',
//                   overflowY: 'auto',
//                   overflowX: 'hidden',
//                   fontSize: '12px',
//                 }}
//               >
//                 {musicPlaylist.map((track, index) => (
//                   <div
//                     key={track.id}
//                     onClick={e => {
//                       e.stopPropagation();
//                       hasUserInteractedRef.current = true;
//                       if (audioRef.current && !audioRef.current.paused) {
//                         shouldContinuePlayingRef.current = true;
//                       }
//                       setCurrentIndex(index);
//                     }}
//                     style={{
//                       padding: '8px',
//                       marginBottom: '4px',
//                       background:
//                         index === currentIndex ? 'rgba(220, 20, 60, 0.3)' : 'rgba(0, 0, 0, 0.3)',
//                       borderRadius: '6px',
//                       cursor: 'pointer',
//                       border:
//                         index === currentIndex ? '2px solid #DC143C' : '2px solid transparent',
//                     }}
//                   >
//                     <div
//                       style={{
//                         color: '#E8E4D9',
//                         marginBottom: '2px',
//                         fontSize: '12px',
//                         fontWeight: 'bold',
//                       }}
//                     >
//                       {track.title}
//                     </div>
//                     <div style={{ color: '#B8B8B8', fontSize: '10px' }}>
//                       {track.artist} • {track.duration}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// 'use client';

// import { musicPlaylist } from '@/data/music';
// import { useState, useEffect, useRef, useCallback } from 'react';

// export default function EnhancedMusicPlayer() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isExpanded, setIsExpanded] = useState(true);
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [isDragging, setIsDragging] = useState(false);
//   const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
//   const [showPlayer, setShowPlayer] = useState(false);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [isMobile, setIsMobile] = useState(false);
//   const audioRef = useRef<HTMLAudioElement>(null);
//   const shouldAutoPlayRef = useRef(false);
//   const isPlayingRef = useRef(false);
//   const touchStartPosRef = useRef({ x: 0, y: 0 });
//   const hasDraggedRef = useRef(false);
//   const isTouchingPlayerRef = useRef(false);
//   const playerRef = useRef<HTMLDivElement>(null);
//   const dragHeaderRef = useRef<HTMLDivElement>(null);

//   const currentTrack = musicPlaylist[currentIndex];

//   useEffect(() => {
//     isPlayingRef.current = isPlaying;
//   }, [isPlaying]);

//   const getPlayerWidth = useCallback(() => {
//     return isExpanded ? 380 : (isMobile ? 56 : 240);
//   }, [isExpanded, isMobile]);

//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 768);
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   const handleMouseDown = (e: React.MouseEvent) => {
//     const target = e.target as HTMLElement;
//     if (
//       target.tagName === 'BUTTON' ||
//       target.tagName === 'AUDIO' ||
//       target.closest('button') ||
//       target.closest('audio')
//     ) {
//       return;
//     }

//     e.preventDefault();
//     setIsDragging(true);
//     setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
//   };

//   const handleMouseMove = useCallback(
//     (e: MouseEvent) => {
//       if (!isDragging) return;
//       e.preventDefault();
//       let newX = e.clientX - dragStart.x;
//       let newY = e.clientY - dragStart.y;
//       const playerWidth = getPlayerWidth();
//       const maxX = window.innerWidth - playerWidth;
//       const maxY = window.innerHeight - 150;
//       newX = Math.max(0, Math.min(newX, maxX));
//       newY = Math.max(0, Math.min(newY, maxY));
//       setPosition({ x: newX, y: newY });
//     },
//     [isDragging, dragStart.x, dragStart.y, getPlayerWidth],
//   );

//   const handleMouseUp = useCallback(() => {
//     if (isDragging) {
//       setIsDragging(false);
//       localStorage.setItem('musicPlayerPos', JSON.stringify(position));
//     }
//   }, [isDragging, position]);

//   const handleTouchStart = (e: React.TouchEvent) => {
//     const target = e.target as HTMLElement;

//     if (
//       target.tagName === 'BUTTON' ||
//       target.tagName === 'AUDIO' ||
//       target.closest('button') ||
//       target.closest('audio') ||
//       target.getAttribute('type') === 'range'
//     ) {
//       isTouchingPlayerRef.current = false;
//       return;
//     }

//     if (dragHeaderRef.current && dragHeaderRef.current.contains(target)) {
//       isTouchingPlayerRef.current = true;
//       const touch = e.touches[0];
//       touchStartPosRef.current = { x: touch.clientX, y: touch.clientY };
//       hasDraggedRef.current = false;
//       setDragStart({ x: touch.clientX - position.x, y: touch.clientY - position.y });
//     } else {
//       isTouchingPlayerRef.current = false;
//     }
//   };

//   const handleTouchMove = useCallback(
//     (e: TouchEvent) => {
//       if (!isTouchingPlayerRef.current) return;

//       const touch = e.touches[0];
//       const deltaX = Math.abs(touch.clientX - touchStartPosRef.current.x);
//       const deltaY = Math.abs(touch.clientY - touchStartPosRef.current.y);

//       if (deltaX > 20 || deltaY > 20) {
//         hasDraggedRef.current = true;
//         setIsDragging(true);
//         e.preventDefault();

//         let newX = touch.clientX - dragStart.x;
//         let newY = touch.clientY - dragStart.y;
//         const playerWidth = getPlayerWidth();
//         const maxX = window.innerWidth - playerWidth;
//         const maxY = window.innerHeight - 150;
//         newX = Math.max(0, Math.min(newX, maxX));
//         newY = Math.max(0, Math.min(newY, maxY));
//         setPosition({ x: newX, y: newY });
//       }
//     },
//     [dragStart.x, dragStart.y, getPlayerWidth],
//   );

//   const handleTouchEnd = useCallback(
//     () => {
//       if (!isTouchingPlayerRef.current) return;

//       if (isDragging) {
//         setIsDragging(false);
//         localStorage.setItem('musicPlayerPos', JSON.stringify(position));
//       }

//       if (!hasDraggedRef.current && !isExpanded) {
//         setIsExpanded(true);
//       }

//       hasDraggedRef.current = false;
//       isTouchingPlayerRef.current = false;
//     },
//     [isDragging, position, isExpanded],
//   );

//   useEffect(() => {
//     if (isDragging) {
//       window.addEventListener('mousemove', handleMouseMove);
//       window.addEventListener('mouseup', handleMouseUp);
//     } else {
//       window.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('mouseup', handleMouseUp);
//     }

//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('mouseup', handleMouseUp);
//     };
//   }, [isDragging, handleMouseMove, handleMouseUp]);

//   useEffect(() => {
//     window.addEventListener('touchmove', handleTouchMove, { passive: false });
//     window.addEventListener('touchend', handleTouchEnd);

//     return () => {
//       window.removeEventListener('touchmove', handleTouchMove);
//       window.removeEventListener('touchend', handleTouchEnd);
//     };
//   }, [handleTouchMove, handleTouchEnd]);

//   useEffect(() => {
//     const playerWidth = getPlayerWidth();
//     const maxX = window.innerWidth - playerWidth;
//     const maxY = window.innerHeight - 150;

//     setPosition(prev => ({
//       x: Math.max(0, Math.min(prev.x, maxX)),
//       y: Math.max(0, Math.min(prev.y, maxY)),
//     }));
//   }, [isExpanded, isMobile, getPlayerWidth]);

//   useEffect(() => {
//     const saved = localStorage.getItem('musicPlayerPos');
//     if (saved) {
//       try {
//         const savedPos = JSON.parse(saved);
//         const maxX = window.innerWidth - 400;
//         const maxY = window.innerHeight - 150;
//         setPosition({
//           x: Math.max(0, Math.min(savedPos.x, maxX)),
//           y: Math.max(0, Math.min(savedPos.y, maxY)),
//         });
//       } catch {}
//     } else {
//       setPosition({
//         x: window.innerWidth - 400,
//         y: window.innerHeight - 100,
//       });
//     }
//     const hasSeenAnimation = sessionStorage.getItem('hasSeenAnimation');
//     if (hasSeenAnimation) {
//       setShowPlayer(true);
//     } else {
//       setTimeout(() => setShowPlayer(true), 3500);
//     }
//   }, []);

//   // CRITICAL FIX: Separate effect for audio events (never reload)
//   useEffect(() => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     const handleEnded = () => {
//       console.log('🎵 Track ENDED! Setting autoplay...');
//       shouldAutoPlayRef.current = true;
//       const nextIndex = (currentIndex + 1) % musicPlaylist.length;
//       console.log('Advancing to track:', nextIndex);
//       setCurrentIndex(nextIndex);
//     };
    
//     const handlePlay = () => {
//       console.log('▶️ Play');
//       setIsPlaying(true);
//     };
    
//     const handlePause = () => {
//       console.log('⏸️ Pause');
//       setIsPlaying(false);
//     };
    
//     const handlePlaying = () => {
//       console.log('🎶 Playing');
//       setIsPlaying(true);
//     };
    
//     const handleTimeUpdate = () => {
//       setCurrentTime(audio.currentTime);
//       const nowPlaying = !audio.paused && !audio.ended;
//       if (nowPlaying !== isPlayingRef.current) {
//         setIsPlaying(nowPlaying);
//       }
//     };

//     audio.addEventListener('ended', handleEnded);
//     audio.addEventListener('play', handlePlay);
//     audio.addEventListener('playing', handlePlaying);
//     audio.addEventListener('pause', handlePause);
//     audio.addEventListener('timeupdate', handleTimeUpdate);

//     return () => {
//       audio.removeEventListener('ended', handleEnded);
//       audio.removeEventListener('play', handlePlay);
//       audio.removeEventListener('playing', handlePlaying);
//       audio.removeEventListener('pause', handlePause);
//       audio.removeEventListener('timeupdate', handleTimeUpdate);
//     };
//   }, [currentIndex]); // Only depend on currentIndex

//   // CRITICAL FIX: Separate effect for loading tracks
//   useEffect(() => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     console.log(`📀 Loading track ${currentIndex}: ${currentTrack.title}`);
//     console.log('Should autoplay?', shouldAutoPlayRef.current);
    
//     audio.src = currentTrack.file;
//     audio.load();
//     setCurrentTime(0);

//     // SIMPLE APPROACH: Try to play after a delay if shouldAutoPlay is true
//     if (shouldAutoPlayRef.current) {
//       console.log('🔄 Will attempt autoplay...');
      
//       const tryPlay = () => {
//         console.log('Attempting to play NOW...');
//         audio.play()
//           .then(() => {
//             console.log('✅✅ AUTOPLAY SUCCESS!');
//             shouldAutoPlayRef.current = false;
//           })
//           .catch((err) => {
//             console.error('❌ Autoplay failed:', err);
//             shouldAutoPlayRef.current = false;
//           });
//       };

//       // Try multiple times with different delays for reliability
//       const timer1 = setTimeout(tryPlay, 200);
//       const timer2 = setTimeout(tryPlay, 500);
//       const timer3 = setTimeout(tryPlay, 1000);

//       return () => {
//         clearTimeout(timer1);
//         clearTimeout(timer2);
//         clearTimeout(timer3);
//       };
//     }
//   }, [currentIndex, currentTrack.file, currentTrack.title]);

//   const snapToCorner = () => {
//     const playerWidth = getPlayerWidth();
//     const corners = [
//       { x: 20, y: 100 },
//       { x: Math.max(20, window.innerWidth - playerWidth - 20), y: 100 },
//       { x: 20, y: Math.max(100, window.innerHeight - 150) },
//       { x: Math.max(20, window.innerWidth - playerWidth - 20), y: Math.max(100, window.innerHeight - 150) },
//     ];
//     let nearest = corners[3];
//     let minDist = Infinity;
//     corners.forEach(corner => {
//       const dist = Math.hypot(corner.x - position.x, corner.y - position.y);
//       if (dist < minDist) {
//         minDist = dist;
//         nearest = corner;
//       }
//     });
//     setPosition(nearest);
//     localStorage.setItem('musicPlayerPos', JSON.stringify(nearest));
//   };

//   const formatTime = (seconds: number) => {
//     if (!seconds || isNaN(seconds)) return '0:00';
//     const mins = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   if (!showPlayer) return null;

//   return (
//     <div
//       ref={playerRef}
//       style={{
//         position: 'fixed',
//         left: `${position.x}px`,
//         top: `${position.y}px`,
//         width: isExpanded ? '380px' : isMobile ? '56px' : '240px',
//         background: 'linear-gradient(135deg, #4d0000 0%, #6b0000 100%)',
//         border: '3px solid #2d0000',
//         borderRadius: '16px',
//         boxShadow: '0 12px 48px rgba(0, 0, 0, 0.9), inset 0 0 60px rgba(139, 0, 0, 0.3)',
//         zIndex: 11000,
//         cursor: 'default',
//         animation: 'fadeInUp 0.5s ease-out',
//         transition: 'width 0.3s ease',
//         userSelect: 'none',
//         WebkitUserSelect: 'none',
//         overflow: 'hidden',
//       }}
//     >
//       <style>{`
//         @keyframes fadeInUp {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes marquee {
//           0% { transform: translateX(100%); }
//           100% { transform: translateX(-150%); }
//         }
//         @keyframes pulse {
//           0%, 100% { 
//             transform: scale(1); 
//             filter: brightness(1) drop-shadow(0 0 4px rgba(220, 20, 60, 0.5));
//           }
//           50% { 
//             transform: scale(1.1); 
//             filter: brightness(1.4) drop-shadow(0 0 12px rgba(220, 20, 60, 0.9));
//           }
//         }
//         .marquee-container {
//           overflow: hidden;
//           position: relative;
//           width: 100%;
//         }
//         .marquee-text {
//           display: inline-block;
//           white-space: nowrap;
//           padding-right: 50px;
//           animation: marquee 15s linear infinite;
//         }
//         .playlist-scroll::-webkit-scrollbar {
//           width: 6px;
//         }
//         .playlist-scroll::-webkit-scrollbar-track {
//           background: rgba(0, 0, 0, 0.3);
//           border-radius: 3px;
//         }
//         .playlist-scroll::-webkit-scrollbar-thumb {
//           background: #8B0000;
//           border-radius: 3px;
//         }
//         .playlist-scroll::-webkit-scrollbar-thumb:hover {
//           background: #DC143C;
//         }
//         .note-icon {
//           width: 36px;
//           height: 36px;
//           background-size: contain;
//           background-repeat: no-repeat;
//           background-position: center;
//           transition: all 0.3s ease;
//         }
//         .note-icon.idle {
//           background-image: url('/icons/note-idle.png');
//           opacity: 0.85;
//         }
//         .note-icon.playing {
//           background-image: url('/icons/note-playing.png');
//           animation: pulse 1.5s ease-in-out infinite;
//           opacity: 1;
//         }
//       `}</style>

//       <div
//         ref={dragHeaderRef}
//         onMouseDown={handleMouseDown}
//         onTouchStart={handleTouchStart}
//         style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           padding: isExpanded ? '12px 16px' : isMobile ? '12px' : '10px 12px',
//           borderBottom: isExpanded ? '2px solid #2d0000' : 'none',
//           cursor: isDragging ? 'grabbing' : 'grab',
//           touchAction: 'none',
//         }}
//       >
//         {isExpanded ? (
//           <>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', pointerEvents: 'none' }}>
//               {isPlaying ? (
//                 <div className="note-icon playing" />
//               ) : (
//                 <div className="note-icon idle" />
//               )}
//               <span
//                 style={{
//                   fontFamily: 'Creepster, cursive',
//                   color: '#E8E4D9',
//                   fontSize: '16px',
//                   fontWeight: 700,
//                   textShadow: '0 0 10px rgba(220, 20, 60, 0.8)',
//                 }}
//               >
//                 MIDNIGHT SOUNDS
//               </span>
//             </div>
//             <div style={{ display: 'flex', gap: '8px', pointerEvents: 'auto' }}>
//               <button
//                 onClick={e => {
//                   e.stopPropagation();
//                   setIsExpanded(!isExpanded);
//                 }}
//                 style={{
//                   background: 'transparent',
//                   border: '2px solid #E8E4D9',
//                   color: '#E8E4D9',
//                   padding: '4px 10px',
//                   borderRadius: '6px',
//                   cursor: 'pointer',
//                   fontSize: '16px',
//                   fontWeight: 'bold',
//                 }}
//               >
//                 −
//               </button>
//               <button
//                 onClick={e => {
//                   e.stopPropagation();
//                   snapToCorner();
//                 }}
//                 style={{
//                   background: 'transparent',
//                   border: '2px solid #E8E4D9',
//                   color: '#E8E4D9',
//                   padding: '4px 10px',
//                   borderRadius: '6px',
//                   cursor: 'pointer',
//                   fontSize: '16px',
//                 }}
//               >
//                 ⚓
//               </button>
//             </div>
//           </>
//         ) : (
//           <div
//             style={{
//               width: '100%',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: isMobile ? 'center' : 'space-between',
//               gap: '6px',
//             }}
//           >
//             {isMobile ? (
//               <div style={{ padding: '4px', pointerEvents: 'none' }}>
//                 {isPlaying ? (
//                   <div className="note-icon playing" />
//                 ) : (
//                   <div className="note-icon idle" />
//                 )}
//               </div>
//             ) : (
//               <>
//                 <div style={{ padding: '4px', marginRight: '4px', pointerEvents: 'none' }}>
//                   {isPlaying ? (
//                     <div className="note-icon playing" />
//                   ) : (
//                     <div className="note-icon idle" />
//                   )}
//                 </div>
//                 <div className="marquee-container" style={{ flex: 1, minWidth: 0, pointerEvents: 'none' }}>
//                   <div className="marquee-text" style={{ color: '#E8E4D9', fontSize: '12px', fontWeight: 'bold' }}>
//                     {currentTrack.title} - {currentTrack.artist}
//                   </div>
//                 </div>
//                 <div style={{ display: 'flex', gap: '4px', flexShrink: 0, pointerEvents: 'auto' }}>
//                   <button
//                     onClick={e => {
//                       e.stopPropagation();
//                       setIsExpanded(true);
//                     }}
//                     style={{
//                       background: 'transparent',
//                       border: '2px solid #E8E4D9',
//                       color: '#E8E4D9',
//                       padding: '2px 6px',
//                       borderRadius: '4px',
//                       cursor: 'pointer',
//                       fontSize: '12px',
//                       fontWeight: 'bold',
//                     }}
//                   >
//                     +
//                   </button>
//                   <button
//                     onClick={e => {
//                       e.stopPropagation();
//                       snapToCorner();
//                     }}
//                     style={{
//                       background: 'transparent',
//                       border: '2px solid #E8E4D9',
//                       color: '#E8E4D9',
//                       padding: '2px 6px',
//                       borderRadius: '4px',
//                       cursor: 'pointer',
//                       fontSize: '12px',
//                     }}
//                   >
//                     ⚓
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         )}
//       </div>

//       <div
//         style={{
//           padding: isExpanded ? '16px' : '0',
//           paddingTop: isExpanded ? '16px' : '0',
//           overflowY: 'auto',
//           maxHeight: isExpanded ? 'calc(100vh - 200px)' : '0',
//         }}
//       >
//         {isExpanded && (
//           <div
//             style={{
//               marginBottom: '12px',
//               padding: '12px',
//               background: 'rgba(0, 0, 0, 0.4)',
//               borderRadius: '8px',
//               border: `2px solid ${isPlaying ? '#DC143C' : '#8B0000'}`,
//             }}
//           >
//             <div
//               style={{
//                 fontSize: '10px',
//                 color: isPlaying ? '#DC143C' : '#8B0000',
//                 marginBottom: '4px',
//                 textTransform: 'uppercase',
//                 letterSpacing: '1px',
//                 fontWeight: 'bold',
//               }}
//             >
//               NOW PLAYING {isPlaying ? '• LIVE' : ''}
//             </div>
//             <div
//               style={{
//                 fontSize: '14px',
//                 color: '#E8E4D9',
//                 fontWeight: 'bold',
//                 marginBottom: '2px',
//               }}
//             >
//               {currentTrack.title}
//             </div>
//             <div style={{ fontSize: '11px', color: '#B8B8B8' }}>
//               {currentTrack.artist} • {formatTime(currentTime)}
//             </div>
//           </div>
//         )}

//         <audio
//           ref={audioRef}
//           controls
//           src={currentTrack.file}
//           style={{
//             width: isExpanded ? '100%' : '0',
//             height: isExpanded ? '40px' : '0',
//             marginBottom: isExpanded ? '12px' : '0',
//             borderRadius: '8px',
//             display: isExpanded ? 'block' : 'none',
//           }}
//           preload="auto"
//         />

//         {isExpanded && (
//           <>
//             <div
//               style={{
//                 display: 'flex',
//                 justifyContent: 'center',
//                 gap: '12px',
//                 marginBottom: '12px',
//               }}
//             >
//               <button
//                 onClick={e => {
//                   e.stopPropagation();
//                   if (audioRef.current && !audioRef.current.paused) {
//                     shouldAutoPlayRef.current = true;
//                   }
//                   setCurrentIndex((currentIndex - 1 + musicPlaylist.length) % musicPlaylist.length);
//                 }}
//                 style={{
//                   background: 'rgba(0, 0, 0, 0.4)',
//                   border: '2px solid #8B0000',
//                   color: '#E8E4D9',
//                   padding: '8px 20px',
//                   borderRadius: '8px',
//                   cursor: 'pointer',
//                   fontSize: '13px',
//                   fontWeight: 'bold',
//                 }}
//               >
//                 ⏮ Prev
//               </button>
//               <button
//                 onClick={e => {
//                   e.stopPropagation();
//                   if (audioRef.current) {
//                     if (audioRef.current.paused) {
//                       audioRef.current.play().catch(err => console.log('Play failed:', err));
//                     } else {
//                       audioRef.current.pause();
//                     }
//                   }
//                 }}
//                 style={{
//                   background: isPlaying ? 'rgba(220, 20, 60, 0.6)' : 'rgba(0, 0, 0, 0.4)',
//                   border: '2px solid #DC143C',
//                   color: '#E8E4D9',
//                   padding: '8px 20px',
//                   borderRadius: '8px',
//                   cursor: 'pointer',
//                   fontSize: '13px',
//                   fontWeight: 'bold',
//                 }}
//               >
//                 {isPlaying ? '⏸ Pause' : '▶ Play'}
//               </button>
//               <button
//                 onClick={e => {
//                   e.stopPropagation();
//                   if (audioRef.current && !audioRef.current.paused) {
//                     shouldAutoPlayRef.current = true;
//                   }
//                   setCurrentIndex((currentIndex + 1) % musicPlaylist.length);
//                 }}
//                 style={{
//                   background: 'rgba(0, 0, 0, 0.4)',
//                   border: '2px solid #8B0000',
//                   color: '#E8E4D9',
//                   padding: '8px 20px',
//                   borderRadius: '8px',
//                   cursor: 'pointer',
//                   fontSize: '13px',
//                   fontWeight: 'bold',
//                 }}
//               >
//                 Next ⏭
//               </button>
//             </div>

//             <div>
//               <div
//                 style={{
//                   fontSize: '10px',
//                   color: '#DC143C',
//                   marginBottom: '8px',
//                   textTransform: 'uppercase',
//                   letterSpacing: '1px',
//                   fontWeight: 'bold',
//                 }}
//               >
//                 PLAYLIST ({musicPlaylist.length} TRACKS)
//               </div>
//               <div
//                 className="playlist-scroll"
//                 style={{
//                   maxHeight: '120px',
//                   overflowY: 'auto',
//                   overflowX: 'hidden',
//                   fontSize: '12px',
//                 }}
//               >
//                 {musicPlaylist.map((track, index) => (
//                   <div
//                     key={track.id}
//                     onClick={e => {
//                       e.stopPropagation();
//                       if (audioRef.current && !audioRef.current.paused) {
//                         shouldAutoPlayRef.current = true;
//                       }
//                       setCurrentIndex(index);
//                     }}
//                     style={{
//                       padding: '8px',
//                       marginBottom: '4px',
//                       background: index === currentIndex ? 'rgba(220, 20, 60, 0.3)' : 'rgba(0, 0, 0, 0.3)',
//                       borderRadius: '6px',
//                       cursor: 'pointer',
//                       border: index === currentIndex ? '2px solid #DC143C' : '2px solid transparent',
//                     }}
//                   >
//                     <div style={{ color: '#E8E4D9', marginBottom: '2px', fontSize: '12px', fontWeight: 'bold' }}>
//                       {track.title}
//                     </div>
//                     <div style={{ color: '#B8B8B8', fontSize: '10px' }}>
//                       {track.artist} • {track.duration}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
