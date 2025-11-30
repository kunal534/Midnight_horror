// app/stories/[slug]/page.tsx
'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { stories } from '@/data/stories';
import { useState, useEffect, useRef } from 'react';

function getStoryDate(publishedDate: string): Date {
  return new Date(publishedDate.trim());
}

export default function StoryPage({ params }: { params: { slug: string } }) {
  const [isStickyVisible, setIsStickyVisible] = useState(false);
  const [isTitleOverflowing, setIsTitleOverflowing] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

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

  // Check if title overflows - wait for sticky to be visible
  useEffect(() => {
    if (isStickyVisible && titleRef.current) {
      setTimeout(() => {
        if (titleRef.current) {
          const isOverflowing =
            titleRef.current.scrollWidth > titleRef.current.clientWidth;
          setIsTitleOverflowing(isOverflowing);
        }
      }, 100);
    }
  }, [isStickyVisible, story?.title]);

  if (!story) {
    notFound();
  }

  // Related stories: same tags, sorted newest first
  const relatedStories = stories
    .filter(
      (s) =>
        s.id !== story.id &&
        s.tags.some((tag) => story.tags.includes(tag))
    )
    .sort((a, b) => {
      const dateA = getStoryDate(a.publishedDate);
      const dateB = getStoryDate(b.publishedDate);
      return dateB.getTime() - dateA.getTime(); // newest first
    })
    .slice(0, 3);

  return (
    <>
      {/* Inline CSS for marquee animation */}
      <style jsx>{`
        @keyframes marquee {
          0%,
          100% {
            transform: translateX(0%);
          }
          90% {
            transform: translateX(-50%);
          }
        }

        .marquee-title {
          display: inline-block;
          animation: marquee 10s linear infinite;
          animation-delay: 0s;
        }

        .marquee-container {
          overflow: hidden;
          position: relative;
          width: 100%;
        }

        .marquee-container:hover .marquee-title {
          animation-play-state: paused;
        }
      `}</style>

      {/* Sticky Title Bar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background:
            'linear-gradient(135deg, rgba(26, 0, 0, 0.98) 0%, rgba(45, 0, 0, 0.98) 100%)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '2px solid #8B0000',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.9)',
          opacity: isStickyVisible ? 1 : 0,
          transform: isStickyVisible ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: isStickyVisible ? 'auto' : 'none',
        }}
      >
        <div
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          <Link
            href="/stories"
            style={{
              fontFamily: 'Lora, serif',
              color: '#E8E4D9',
              fontSize: '14px',
              textDecoration: 'none',
              padding: '6px 12px',
              border: '1px solid rgba(139, 0, 0, 0.5)',
              borderRadius: '6px',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            ← Back
          </Link>

          {/* Title with marquee animation for long titles */}
          <div
            className={isTitleOverflowing ? 'marquee-container' : ''}
            style={{
              flex: 1,
              minWidth: 0,
              overflow: 'hidden',
            }}
          >
            <h2
              ref={titleRef}
              style={{
                fontFamily: 'Cinzel, serif',
                color: '#E8E4D9',
                fontSize: '20px',
                margin: 0,
                textShadow: '0 2px 8px rgba(220, 20, 60, 0.6)',
                whiteSpace: 'nowrap',
                display: isTitleOverflowing ? 'inline-block' : 'block',
                animation: isTitleOverflowing ? 'marquee 10s linear infinite' : 'none',
              }}
            >
              {story.title}
            </h2>
          </div>

          {story.readTime && (
            <div
              style={{
                color: '#B8B8B8',
                fontSize: '14px',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              ⏱️ {story.readTime}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '48px 24px' }}>
        {/* Back Button */}
        <Link
          href="/stories"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#DC143C',
            marginBottom: '24px',
            fontSize: '16px',
            textDecoration: 'none',
          }}
        >
          ← Back to Stories
        </Link>

        {/* Story Header */}
        <div
          ref={heroRef}
          style={{
            position: 'relative',
            width: '100%',
            height: '400px',
            borderRadius: '12px',
            overflow: 'hidden',
            marginBottom: '32px',
          }}
        >
          <Image
            src={story.imageUrl}
            alt={story.title}
            fill
            style={{ objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '32px',
              left: '32px',
              right: '32px',
            }}
          >
            <h1
              style={{
                fontSize: '48px',
                color: '#E8E4D9',
                marginBottom: '16px',
                fontFamily: 'Cinzel, serif',
                textShadow: '0 0 20px rgba(0,0,0,0.8)',
              }}
            >
              {story.title}
            </h1>
            <div
              style={{
                display: 'flex',
                gap: '16px',
                fontSize: '14px',
                color: '#B8B8B8',
              }}
            >
              <span>{story.publishedDate}</span>
              {story.readTime && <span>⏱️ {story.readTime}</span>}
            </div>
          </div>
        </div>

        {/* Tags */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '32px',
            flexWrap: 'wrap',
          }}
        >
          {story.tags.map((tag) => (
            <span
              key={tag}
              style={{
                background: 'rgba(220, 20, 60, 0.2)',
                color: '#DC143C',
                padding: '6px 16px',
                borderRadius: '20px',
                fontSize: '14px',
                border: '1px solid #8B0000',
              }}
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Full Story Content */}
        <article
          style={{
            fontSize: '18px',
            lineHeight: '1.8',
            color: '#E8E4D9',
            marginBottom: '64px',
          }}
        >
          {story.fullContent.split('\n').map((paragraph, index) =>
            paragraph.trim() ? (
              <p key={index} style={{ marginBottom: '24px' }}>
                {paragraph.trim()}
              </p>
            ) : null
          )}
        </article>

        {/* Related Stories */}
        {relatedStories.length > 0 && (
          <div>
            <h2
              style={{
                fontSize: '32px',
                color: '#E8E4D9',
                marginBottom: '24px',
                fontFamily: 'Cinzel, serif',
                borderBottom: '2px solid #8B0000',
                paddingBottom: '16px',
              }}
            >
              More Horror Tales
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '24px',
              }}
            >
              {relatedStories.map((related) => (
                <Link
                  key={related.id}
                  href={`/stories/${related.slug}`}
                  style={{
                    textDecoration: 'none',
                    display: 'block',
                    border: '1px solid #8B0000',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '150px',
                    }}
                  >
                    <Image
                      src={related.imageUrl}
                      alt={related.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ padding: '16px' }}>
                    <h3
                      style={{
                        color: '#E8E4D9',
                        fontSize: '16px',
                        marginBottom: '8px',
                      }}
                    >
                      {related.title}
                    </h3>
                    <p
                      style={{
                        color: '#B8B8B8',
                        fontSize: '14px',
                        lineHeight: '1.4',
                      }}
                    >
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
