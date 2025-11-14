import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { stories } from '@/data/stories';

export function generateStaticParams() {
  return stories.map((story) => ({
    slug: story.slug,
  }));
}

export default function StoryPage({ params }: { params: { slug: string } }) {
  const story = stories.find((s) => s.slug === params.slug);

  if (!story) {
    notFound();
  }

  // Get related stories (same tags)
  const relatedStories = stories
    .filter((s) => s.id !== story.id && s.tags.some((tag) => story.tags.includes(tag)))
    .slice(0, 3);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '48px 24px' }}>
      {/* Back Button */}
      <Link
        href="/"
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
      <div style={{
        position: 'relative',
        width: '100%',
        height: '400px',
        borderRadius: '12px',
        overflow: 'hidden',
        marginBottom: '32px',
      }}>
        <Image
          src={story.imageUrl}
          alt={story.title}
          fill
          style={{ objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '32px',
          left: '32px',
          right: '32px',
        }}>
          <h1 style={{
            fontSize: '48px',
            color: '#E8E4D9',
            marginBottom: '16px',
            fontFamily: 'Cinzel, serif',
            textShadow: '0 0 20px rgba(0,0,0,0.8)',
          }}>
            {story.title}
          </h1>
          <div style={{
            display: 'flex',
            gap: '16px',
            fontSize: '14px',
            color: '#B8B8B8',
          }}>
            <span>📅 {story.publishedDate}</span>
            <span>⏱️ {story.readTime}</span>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', flexWrap: 'wrap' }}>
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
      <article style={{
        fontSize: '18px',
        lineHeight: '1.8',
        color: '#E8E4D9',
        marginBottom: '64px',
      }}>
        {story.fullContent.split('\n').map((paragraph, index) => (
          paragraph.trim() && (
            <p key={index} style={{ marginBottom: '24px' }}>
              {paragraph.trim()}
            </p>
          )
        ))}
      </article>

      {/* Related Stories */}
      {relatedStories.length > 0 && (
        <div>
          <h2 style={{
            fontSize: '32px',
            color: '#E8E4D9',
            marginBottom: '24px',
            fontFamily: 'Cinzel, serif',
            borderBottom: '2px solid #8B0000',
            paddingBottom: '16px',
          }}>
            More Horror Tales
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '24px',
          }}>
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
                <div style={{ position: 'relative', width: '100%', height: '150px' }}>
                  <Image
                    src={related.imageUrl}
                    alt={related.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '16px' }}>
                  <h3 style={{ color: '#E8E4D9', fontSize: '16px', marginBottom: '8px' }}>
                    {related.title}
                  </h3>
                  <p style={{ color: '#B8B8B8', fontSize: '14px', lineHeight: '1.4' }}>
                    {related.excerpt.substring(0, 80)}...
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
