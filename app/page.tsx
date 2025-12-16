// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import MonthSelector from '@/components/MonthSelector/MonthSelector';
import styles from './page.module.scss';
import { format } from 'date-fns';
import { stories } from '@/data/stories';
import { useAge } from '@/components/AgeGate/AgeContext';

const HorrorAnimation = dynamic(
  () => import('@/components/HorrorAnimation/HorrorAnimation'),
  { ssr: false }
);


const HomeStoryGrid = dynamic(
  () => import('./HomeStoryGrid'),
  { ssr: false }
);

function getStoryDate(publishedDate: string): Date {
  return new Date(publishedDate.trim());
}

export default function HomePage() {
  const { isMinor, isReady } = useAge();

  const [selectedMonth, setSelectedMonth] = useState(
    format(new Date(), 'yyyy-MM')
  );
  const [filteredStories, setFilteredStories] = useState(stories);

  useEffect(() => {
    const filtered = stories
      .filter((story) => story.month === selectedMonth)
      .sort((a, b) => {
        const timeA = getStoryDate(a.publishedDate).getTime();
        const timeB = getStoryDate(b.publishedDate).getTime();
        if (timeA < timeB) return 1;
        if (timeA > timeB) return -1;
        return 0;
      });

    setFilteredStories(filtered);
  }, [selectedMonth]);

  if (!isReady) return null;

  return (
    <>
      <HorrorAnimation />

      <div className={styles.homePage}>
        <div className={isMinor ? styles.blurredContent : ''}>
          <header className={styles.header}>
            <div className={styles.titleSection}>
              <h1 className={styles.title}>Midnight Horror Tales</h1>
              <p className={styles.subtitle}>
                Curated stories for the witching hour
              </p>
            </div>
            <MonthSelector onMonthChange={setSelectedMonth} />
          </header>

          <div className={styles.container}>
            <HomeStoryGrid stories={filteredStories} />
          </div>
        </div>
      </div>
    </>
  );
}
