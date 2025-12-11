'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { stories } from '@/data/stories';
import { useState, useEffect, useRef } from 'react';
import { useAge } from '@/components/AgeGate/AgeContext';
import styles from './storyDetail.module.scss';

function getStoryDate(publishedDate: string): Date {
  return new Date(publishedDate.trim());
}

export default function StoryPage({ params }: { params: { slug: string } }) {
  const [isStickyVisible, setIsStickyVisible] = useState(false);
  const [isTitleOverflowing, setIsTitleOverflowing] = useState(false);
  const [scrollDistance, setScrollDistance] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const { isMinor, isReady } = useAge();
  const story = stories.find((s) => s.slug === params.slug);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroBottom = heroRef.current.getBoundingClientRect().bottom;
        setIsStickyVisible(heroBottom < 0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isStickyVisible && titleRef.current) {
      setTimeout(() => {
        if (titleRef.current) {
          const titleWidth = titleRef.current.scrollWidth;
          const containerWidth = titleRef.current.parentElement?.clientWidth || 0;
          const isOverflowing = titleWidth > containerWidth;
          
          setIsTitleOverflowing(isOverflowing);
          
          if (isOverflowing) {
            // Calculate exact distance needed + 50px safety margin for last character
            const distance = titleWidth - containerWidth + 50;
            setScrollDistance(distance);
          }
        }
      }, 100);
    }
  }, [isStickyVisible, story?.title]);

  if (!story) {
    notFound();
  }

  if (!isReady) return null;

  // Minor lock screen
  if (isMinor) {
    return (
      <div className={styles.lockScreen}>
        <Link href="/stories" className={styles.backButton}>
          ← Back to Stories
        </Link>

        <h1 className={styles.lockTitle}>
          Story Locked for Under‑18 Visitors
        </h1>
        <p className={styles.lockMessage}>
          Individual horror tales are available only to readers who are 18 or
          older. You can still enjoy our music player, affiliate products, and
          feedback page while story content remains protected.
        </p>
      </div>
    );
  }

  // Adult view
  const relatedStories = stories
    .filter(
      (s) =>
        s.id !== story.id &&
        s.tags.some((tag) => story.tags.includes(tag))
    )
    .sort((a, b) => {
      const dateA = getStoryDate(a.publishedDate);
      const dateB = getStoryDate(b.publishedDate);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, 3);

  return (
    <>
      {/* Sticky Title Bar */}
      <div className={`${styles.stickyHeader} ${isStickyVisible ? styles.visible : styles.hidden}`}>
        <div className={styles.stickyContent}>
          <Link href="/stories" className={styles.stickyBackButton}>
            ← Back
          </Link>

          <div className={`${styles.stickyTitleContainer} ${isTitleOverflowing ? styles.marquee : ''}`}>
            <h2
              ref={titleRef}
              className={`${styles.stickyTitle} ${isTitleOverflowing ? styles.scrolling : ''}`}
              style={
                isTitleOverflowing
                  ? ({ '--scroll-distance': `-${scrollDistance}px` } as React.CSSProperties)
                  : undefined
              }
            >
              {story.title}
            </h2>
          </div>

          {story.readTime && (
            <div className={styles.stickyReadTime}>
              ⏱️ {story.readTime}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.container}>
        <Link href="/stories" className={styles.backButton}>
          ← Back to Stories
        </Link>

        {/* Story Header */}
        <div ref={heroRef} className={styles.hero}>
          <Image
            src={story.imageUrl}
            alt={story.title}
            fill
            style={{ objectFit: 'cover' }}
          />
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>{story.title}</h1>
            <div className={styles.heroMeta}>
              <span>{story.publishedDate}</span>
              {story.readTime && <span>⏱️ {story.readTime}</span>}
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className={styles.tags}>
          {story.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              #{tag}
            </span>
          ))}
        </div>

        {/* Full Story Content */}
        <article className={styles.article}>
          {story.fullContent.split('\n').map((paragraph, index) =>
            paragraph.trim() ? (
              <p key={index}>{paragraph.trim()}</p>
            ) : null
          )}
        </article>

        {/* Related Stories */}
        {relatedStories.length > 0 && (
          <div className={styles.relatedSection}>
            <h2 className={styles.relatedTitle}>More Horror Tales</h2>
            <div className={styles.relatedGrid}>
              {relatedStories.map((related) => (
                <Link
                  key={related.id}
                  href={`/stories/${related.slug}`}
                  className={styles.relatedCard}
                >
                  <div className={styles.relatedImage}>
                    <Image
                      src={related.imageUrl}
                      alt={related.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className={styles.relatedContent}>
                    <h3 className={styles.relatedCardTitle}>
                      {related.title}
                    </h3>
                    <p className={styles.relatedExcerpt}>
                      {related.excerpt.substring(0, 80)}...
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
