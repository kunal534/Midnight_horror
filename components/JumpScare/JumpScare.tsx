'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAge } from '@/components/AgeGate/AgeContext';
import { usePathname } from 'next/navigation';
import styles from './JumpScare.module.scss';

// Page-aware scare pools with psychological progression
const scarePoolsByPage = {
  home: {
    low: [
      'STILL HERE',
      'DONT BLINK',
      'YOU FELT THAT',
      'LISTEN CLOSER',
      'DID YOU HEAR IT'
    ],
    medium: [
      'IT KNOWS YOU',
      'YOU MISSED IT',
      'NOT ALONE',
      'THEY SEE YOU'
    ],
    high: [
      'THIS WASNT RANDOM',
      'IT CHOSE YOU',
      'YOURE EXPECTED'
    ]
  },

  archive: {
    low: [
      'TURN AROUND',
      'STILL HERE',
      'KEEP LOOKING',
      'DONT STOP NOW'
    ],
    medium: [
      'IT FOLLOWED YOU',
      'YOU LEFT IT OPEN',
      'GETTING CLOSER',
      'ITS BEHIND YOU'
    ],
    high: [
      'YOU SHOULDNT BE HERE',
      'IT REMEMBERS YOU',
      'TOO LATE TO LEAVE',
      'YOUVE BEEN MARKED'
    ]
  },

  collection: {
    low: [
      'WHICH ONE CALLED YOU',
      'THEY ALL WATCH',
      'PICK CAREFULLY'
    ],
    medium: [
      'ONE ISNT LIKE THE OTHERS',
      'SOMETHING MOVED',
      'YOU CHOSE WRONG'
    ],
    high: [
      'THEY CHOSE YOU FIRST',
      'THIS WAS A TRAP',
      'NO GOING BACK'
    ]
  }
};

// Detect page type from pathname
const getPageType = (pathname: string | null): 'home' | 'archive' | 'collection' => {
  if (!pathname) return 'home';
  
  if (pathname === '/' || pathname === '/home') return 'home';
  if (pathname.includes('/collections') || pathname.includes('/categories')) return 'collection';
  return 'archive'; // listings, indexes, boards, etc.
};

// Weighted selector with psychological progression
const getScaryMessage = (pathname: string | null): string => {
  const pageType = getPageType(pathname);
  const pools = scarePoolsByPage[pageType];

  // 60% low intensity, 30% medium, 10% high - creates unpredictability
  const roll = Math.random();

  if (roll < 0.6) {
    return pools.low[Math.floor(Math.random() * pools.low.length)];
  } else if (roll < 0.9) {
    return pools.medium[Math.floor(Math.random() * pools.medium.length)];
  } else {
    return pools.high[Math.floor(Math.random() * pools.high.length)];
  }
};

const JumpScare = () => {
  const { isMinor } = useAge();
  const pathname = usePathname();
  const [jumpScare, setJumpScare] = useState(false);
  const [scaryText, setScaryText] = useState('');
  const [isScrolling, setIsScrolling] = useState(false);

  // Check if user is on a reading page (story or thought detail page)
  const isReadingPage = pathname?.includes('/stories/') || 
                        pathname?.includes('/thoughts/') || 
                        pathname?.includes('/story/') || 
                        pathname?.includes('/thought/');

  const triggerJumpScare = useCallback(() => {
    // Don't trigger if user is a minor, reading, or scrolling
    if (isMinor || isReadingPage || isScrolling) return;

    // Get page-aware scary message
    const randomText = getScaryMessage(pathname);
    setScaryText(randomText);
    setJumpScare(true);

    setTimeout(() => {
      setJumpScare(false);
    }, 1200);
  }, [isMinor, isReadingPage, isScrolling, pathname]);

  const scheduleRandomScare = useCallback(() => {
    // Don't schedule if user is a minor or on reading page
    if (isMinor || isReadingPage) return;

    const minDelay = 30000;  // 30 seconds
    const maxDelay = 120000; // 2 minutes
    const delay = minDelay + Math.random() * (maxDelay - minDelay);

    setTimeout(() => {
      triggerJumpScare();
      scheduleRandomScare();
    }, delay);
  }, [triggerJumpScare, isMinor, isReadingPage]);

  // Detect scrolling
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      setIsScrolling(true);
      
      // Clear existing timeout
      clearTimeout(scrollTimeout);
      
      // Set scrolling to false after 2 seconds of no scrolling
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 2000);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  useEffect(() => {
    // Only start scheduling if user is NOT a minor and NOT on reading page
    if (!isMinor && !isReadingPage) {
      scheduleRandomScare();
    }
  }, [scheduleRandomScare, isMinor, isReadingPage]);

  // Don't render anything if user is a minor or on reading page
  if (isMinor || isReadingPage) return null;

  return (
    <>
      {jumpScare && (
        <div className={styles.jumpscareContainer}>
          <div className={styles.jumpscare}>
            <div className={styles.glitchWrapper}>
              <div className={styles.glitch} data-text={scaryText}>
                {scaryText}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JumpScare;
