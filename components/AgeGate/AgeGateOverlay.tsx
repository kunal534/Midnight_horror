// app/components/AgeGate/AgeGateOverlay.tsx
'use client';

import { useAge } from './AgeContext';
import styles from './ageGate.module.scss';

export default function AgeGateOverlay() {
  const { status, isReady, setAdult, setMinor } = useAge();

  if (!isReady) return null;

  // Hide overlay after ANY choice
  if (status === 'adult' || status === 'minor') return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.card}>
        <h2>🔞 Age Restricted Content</h2>

        <p>
          Our horror stories contain mature and disturbing themes.
          You must be 18+ to view story content.
        </p>

        <p className={styles.subtext}>
          If you are under 18, you can still listen to our music,
          explore products, and send feedback while stories stay blurred.
        </p>

        <div className={styles.buttons}>
          <button onClick={setAdult} className={styles.btnPrimary}>
            I am 18 or older (unlock stories)
          </button>

          <button onClick={setMinor} className={styles.btnSecondary}>
            I am under 18 (music & products only)
          </button>
        </div>
      </div>
    </div>
  );
}
