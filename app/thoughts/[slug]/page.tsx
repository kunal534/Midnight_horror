// use=> Route: /thoughts/[slug] (individual thought)

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
      case 'Self Realization': return '#FF8C00';
      case 'social critique': return '#B8860B';
      default: return '#DC143C';
    }
  };

  const renderContent = (content: string) => {
    const sections = content.split('\n\n');
    
    return sections.map((section, idx) => {
      const trimmed = section.trim();
      
      // Check if section contains bullet points
      if (trimmed.includes('\n- ')) {
        const lines = trimmed.split('\n');
        const bulletItems = lines.filter(line => line.trim().startsWith('- '));
        
        if (bulletItems.length > 0) {
          return (
            <ul key={idx} className={styles.bulletList}>
              {bulletItems.map((item, i) => (
                <li key={i}>{item.replace(/^- /, '').trim()}</li>
              ))}
            </ul>
          );
        }
      }
      
      // Regular paragraph
      if (trimmed) {
        return <p key={idx} className={styles.paragraph}>{trimmed}</p>;
      }
      
      return null;
    });
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

      <div className={styles.content+' content-text'}>
        {renderContent(thought.fullContent)}
      </div>

      <footer className={styles.footer}>
        <Link href="/thoughts" className={styles.backLink}>
          ← Back to all thoughts
        </Link>
      </footer>
    </article>
  );
}
