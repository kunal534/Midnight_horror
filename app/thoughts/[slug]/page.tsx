'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { thoughtsList } from '@/data/thoughts';
import styles from './thoughtDetail.module.scss';

export default function ThoughtDetailPage({ params }: { params: { slug: string } }) {
  const thought = thoughtsList.find((t) => t.slug === params.slug);

  if (!thought) {
    notFound();
  }

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
    <article className={styles.thoughtDetail}>
      <Link href="/thoughts" className={styles.backButton}>
        ← Back to Thoughts
      </Link>

      <header className={styles.header}>
        <h1 className={styles.title}>{thought.title}</h1>
        
        <div className={styles.meta}>
          <time className={styles.date}>{thought.date}</time>
          {thought.category && (
            <span 
              className={styles.category}
              style={{ backgroundColor: getCategoryColor(thought.category) }}
            >
              {thought.category}
            </span>
          )}
        </div>
      </header>

      <div className={styles.content}>
        {thought.fullContent.split('\n\n').map((paragraph, index) => (
          <p key={index} className={styles.paragraph}>
            {paragraph.trim()}
          </p>
        ))}
      </div>

      <footer className={styles.footer}>
        <Link href="/thoughts" className={styles.backLink}>
          ← Back to all thoughts
        </Link>
      </footer>
    </article>
  );
}
