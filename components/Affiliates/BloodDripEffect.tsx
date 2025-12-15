'use client';

import './BloodDrip.css'; // Changed from CategoryFilter.css

interface BloodDripEffectProps {
  isActive: boolean;
  effect: 'drip' | 'liquid';
}

export function BloodDripEffect({ isActive, effect }: BloodDripEffectProps) {
  if (effect === 'drip') {
    return (
      <>
        <div className="drip-1"></div>
        <div className="drip-2"></div>
        <div className="drip-3"></div>
      </>
    );
  }

  if (effect === 'liquid') {
    return <div className="liquid"></div>;
  }

  return null;
}

export function LiquidFilter() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      style={{ position: 'absolute', width: 0, height: 0 }}
    >
      <defs>
        <filter id="liquid">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
            result="liquid"
          />
        </filter>
      </defs>
    </svg>
  );
}
