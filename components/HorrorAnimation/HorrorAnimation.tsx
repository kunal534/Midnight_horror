'use client';

import { useEffect, useState } from 'react';
import './HorrorAnimation.css';

export default function HorrorAnimation() {
  const [showAnimation, setShowAnimation] = useState(true);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase(1), 300);
    const timer2 = setTimeout(() => setPhase(2), 800);
    const timer3 = setTimeout(() => setPhase(3), 1300);
    const timer4 = setTimeout(() => {
      setPhase(4);
      setTimeout(() => setShowAnimation(false), 300);
    }, 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  if (!showAnimation) return null;

  return (
    <div className={`horror-animation ${phase >= 4 ? 'fade-out' : ''}`}>
      <div className="animation-overlay">
        <div className={`animation-content ${phase >= 1 ? 'show' : ''}`}>
          {phase === 0 && (
            <div className="flicker-text">WELCOME...</div>
          )}
          {phase === 1 && (
            <div className="glitch-text">
              <span className="glitch" data-text="MIDNIGHT">MIDNIGHT</span>
            </div>
          )}
          {phase === 2 && (
            <div className="glitch-text">
              <span className="glitch" data-text="HORROR">HORROR</span>
            </div>
          )}
          {phase === 3 && (
            <div className="glitch-text">
              <span className="glitch" data-text="TALES">TALES</span>
            </div>
          )}
        </div>
        <div className={`blood-drips ${phase >= 2 ? 'show' : ''}`}>
          <div className="drip drip-1"></div>
          <div className="drip drip-2"></div>
          <div className="drip drip-3"></div>
          <div className="drip drip-4"></div>
          <div className="drip drip-5"></div>
        </div>
        <div className={`eyes ${phase >= 3 ? 'show' : ''}`}>
          <div className="eye eye-left"></div>
          <div className="eye eye-right"></div>
        </div>
        <div className="static-noise"></div>
      </div>
    </div>
  );
}

