'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import './Navigation.css';

interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: string;
}

const navItems: NavItem[] = [
  { id: '1', label: 'Previous Stories', path: '/previous-stories', icon: '📚' },
  { id: '2', label: 'Affiliate Page', path: '/affiliate', icon: '💰' },
  { id: '3', label: 'Longer Stories', path: '/longer-stories', icon: '📖' },
  { id: '4', label: 'My Thoughts', path: '/thoughts', icon: '💭' },
  { id: '5', label: 'Feedback Form', path: '/feedback', icon: '📝' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [musicPlayerExpanded, setMusicPlayerExpanded] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Check if music player is expanded
  useEffect(() => {
    const checkMusicPlayer = () => {
      const musicPlayer = document.querySelector('.music-player.expanded');
      setMusicPlayerExpanded(!!musicPlayer);
    };

    checkMusicPlayer();
    const observer = new MutationObserver(checkMusicPlayer);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = () => {
    if (isOpen) {
      // Closing animation
      setIsAnimating(true);
      setIsOpen(false);
      setTimeout(() => setIsAnimating(false), 500);
    } else {
      // Opening animation
      setIsAnimating(true);
      setIsOpen(true);
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const handleNavigate = (path: string) => {
    // Closing animation when navigating
    setIsAnimating(true);
    setIsOpen(false);
    setTimeout(() => {
      setIsAnimating(false);
      router.push(path);
    }, 400);
  };

  return (
    <div 
      className={`navigation-container ${musicPlayerExpanded ? 'music-player-open' : ''}`} 
      ref={dropdownRef}
      style={{ right: musicPlayerExpanded ? '420px' : '20px' }}
    >
      <button
        className={`nav-toggle ${isOpen ? 'open' : ''} ${isAnimating ? 'animating' : ''}`}
        onClick={handleToggle}
        aria-label="Toggle navigation"
      >
        <span className="nav-icon-line"></span>
        <span className="nav-icon-line"></span>
        <span className="nav-icon-line"></span>
        <span className="nav-icon-glow"></span>
      </button>

      <div className={`nav-dropdown ${isOpen ? 'open' : ''}`}>
        <div className="nav-dropdown-content">
          <div className="nav-header">
            <h3>Navigate</h3>
            <span className="nav-header-glow"></span>
          </div>
          <ul className="nav-list">
            {navItems.map((item, index) => (
              <li key={item.id}>
                <button
                  className={`nav-item ${pathname === item.path ? 'active' : ''}`}
                  onClick={() => handleNavigate(item.path)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                  <span className="nav-hover-effect"></span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

