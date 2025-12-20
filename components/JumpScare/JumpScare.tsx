'use client';

import { useState, useEffect, useCallback ,useRef} from 'react';
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

  const timeoutsRef = useRef<number[]>([]);
  const [isAndroid, setIsAndroid] = useState(false);

  // detect platform once
  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      setIsAndroid(/Android/i.test(navigator.userAgent));
    }
  }, []);

  const isReadingPage =
    pathname?.includes('/stories/') ||
    pathname?.includes('/thoughts/') ||
    pathname?.includes('/story/') ||
    pathname?.includes('/thought/');

  const triggerJumpScare = useCallback(() => {
    if (isMinor || isReadingPage || isScrolling || isAndroid) return;

    const randomText = getScaryMessage(pathname);
    setScaryText(randomText);
    setJumpScare(true);

    const hideId = window.setTimeout(() => {
      setJumpScare(false);
    }, 1200);

    timeoutsRef.current.push(hideId);
  }, [isMinor, isReadingPage, isScrolling, pathname, isAndroid]);

  const scheduleRandomScare = useCallback(() => {
    if (isMinor || isReadingPage || isAndroid) return;

    const minDelay = 30000;
    const maxDelay = 120000;
    const delay = minDelay + Math.random() * (maxDelay - minDelay);

    const id = window.setTimeout(() => {
      triggerJumpScare();
      scheduleRandomScare();
    }, delay);

    timeoutsRef.current.push(id);
  }, [triggerJumpScare, isMinor, isReadingPage, isAndroid]);

  // scrolling listener with cleanup
  useEffect(() => {
    let scrollTimeout: number | undefined;

    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimeout) window.clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => setIsScrolling(false), 2000);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) window.clearTimeout(scrollTimeout);
    };
  }, []);

  // start scheduling & cleanup all timers on unmount / dependency change
  useEffect(() => {
    if (!isMinor && !isReadingPage && !isAndroid) {
      scheduleRandomScare();
    }

    return () => {
      timeoutsRef.current.forEach(id => window.clearTimeout(id));
      timeoutsRef.current = [];
    };
  }, [scheduleRandomScare, isMinor, isReadingPage, isAndroid]);

  if (isMinor || isReadingPage || isAndroid) return null;

  return (
    jumpScare && (
      <div className={styles.jumpscareContainer}>
        <div className={styles.jumpscare}>
          <div className={styles.glitchWrapper}>
            <div className={styles.glitch} data-text={scaryText}>
              {scaryText}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default JumpScare;
