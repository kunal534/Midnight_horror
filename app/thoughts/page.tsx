'use client';

import Link from 'next/link';
import { thoughtsList } from '@/data/thoughts';
import styles from './thoughts.module.scss';

export default function ThoughtsPage() {
  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'horror': return '#DC143C';
      case 'writing': return '#8B4789';
      case 'personal': return '#4B7F89';
      case 'updates': return '#8B8B00';
      default: return '#DC143C';
    }
  };

  return (
    <div className={styles.thoughtsContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <span className={styles.emoji}>💭</span>
          Midnight Musings
        </h1>
        <p className={styles.subtitle}>
          Random thoughts, horror insights, and creative ramblings from the darkest hours
        </p>
      </header>

      <div className={styles.thoughtsGrid}>
        {thoughtsList.map((thought) => (
          <Link 
            key={thought.id} 
            href={`/thoughts/${thought.slug}`}
            className={styles.thoughtCard}
          >
            <div className={styles.cardHeader}>
              <h2 className={styles.thoughtTitle}>{thought.title}</h2>
            </div>

            {thought.category && (
              <span 
                className={styles.category}
                style={{ backgroundColor: getCategoryColor(thought.category) }}
              >
                {thought.category}
              </span>
            )}

            <p className={styles.thoughtExcerpt}>{thought.excerpt}</p>

            <footer className={styles.thoughtFooter}>
              <time className={styles.date}>{thought.date}</time>
              <span className={styles.readMore}>Read More →</span>
            </footer>
          </Link>
        ))}
      </div>
    </div>
  );
}
