// app/components/AgeGate/AgeContext.tsx
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type AgeStatus = 'adult' | 'minor' | null;

type AgeContextType = {
  status: AgeStatus;
  isMinor: boolean;
  isReady: boolean;
  setAdult: () => void;
  setMinor: () => void;
};

const AgeContext = createContext<AgeContextType | null>(null);
const AGE_KEY = 'mht_age_status';

export function AgeProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AgeStatus>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const stored = window.localStorage.getItem(AGE_KEY) as AgeStatus | null;
    if (stored === 'adult' || stored === 'minor') {
      setStatus(stored);
    } else {
      setStatus(null);
    }
    setIsReady(true);
  }, []);

  const setAdult = () => {
    window.localStorage.setItem(AGE_KEY, 'adult');
    setStatus('adult');
  };

  const setMinor = () => {
    window.localStorage.setItem(AGE_KEY, 'minor');
    setStatus('minor');
  };

  const isMinor = status !== 'adult';

  return (
    <AgeContext.Provider value={{ status, isMinor, isReady, setAdult, setMinor }}>
      {children}
    </AgeContext.Provider>
  );
}

export function useAge() {
  const ctx = useContext(AgeContext);
  if (!ctx) throw new Error('useAge must be used inside AgeProvider');
  return ctx;
}
