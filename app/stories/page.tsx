// //use => LIST
'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import StoryCard from '@/components/StoryCard/StoryCard';
import { stories } from '@/data/stories';
import { useAge } from '@/components/AgeGate/AgeContext';

function getStoryDate(publishedDate: string): Date {
  return new Date(publishedDate.trim());
}

export default function StoriesArchivePage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // age hook – still a hook, must stay before any early return
  const { isMinor, isReady } = useAge();

  // Stories filtered by tag + search, then sorted newest → oldest
  const filteredStories = useMemo(() => {
    return stories
      .filter((story) => {
        const matchesTag = !selectedTag || story.tags.includes(selectedTag);
        const matchesSearch =
          !searchQuery ||
          story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          story.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTag && matchesSearch;
      })
      .sort((a, b) => {
        const timeA = getStoryDate(a.publishedDate).getTime();
        const timeB = getStoryDate(b.publishedDate).getTime();
        if (timeA < timeB) return 1;
        if (timeA > timeB) return -1;
        return 0;
      });
  }, [selectedTag, searchQuery]);

  // Tag counts only from currently visible stories
  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredStories.forEach((story) => {
      story.tags.forEach((tag) => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });
    return counts;
  }, [filteredStories]);

  // Visible tags sorted by frequency (most used first)
  const visibleTags = useMemo(
    () => Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a]),
    [tagCounts]
  );

  // Now it's safe to early-return
  if (!isReady) return null;

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '48px 24px' }}>
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: '48px', textAlign: 'center' }}
      >
        <h1
          style={{
            fontSize: '48px',
            color: '#E8E4D9',
            marginBottom: '16px',
            textShadow: '0 0 15px rgba(220, 20, 60, 0.5)',
            fontFamily: 'Cinzel, serif',
          }}
        >
          📖 Story Archive
        </h1>
        <p
          style={{
            fontSize: '18px',
            color: '#DC143C',
            fontFamily: 'Lora, serif',
          }}
        >
          All {stories.length} Horror Tales
        </p>

        {isMinor && (
          <p
            style={{
              marginTop: '12px',
              fontSize: '14px',
              color: '#fca5a5',
            }}
          >
            Story archive is blurred for under‑18 visitors. You can still enjoy
            music, affiliate products, and feedback.
          </p>
        )}
      </motion.header>

      {/* Everything below is blurred / disabled for minors */}
      <div
        style={
          isMinor
            ? {
                filter: 'blur(14px)',
                pointerEvents: 'none',
                userSelect: 'none',
              }
            : {}
        }
      >
        {/* Search & Tags */}
        <div style={{ marginBottom: '32px' }}>
          {/* Search + Clear */}
          <div
            style={{
              display: 'flex',
              gap: '8px',
              marginBottom: '16px',
            }}
          >
            <input
              type="text"
              placeholder="Search stories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                padding: '16px',
                background: 'rgba(28, 28, 28, 0.6)',
                border: '1px solid #8B0000',
                borderRadius: '12px',
                color: '#E8E4D9',
                fontSize: '16px',
              }}
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                style={{
                  padding: '0 16px',
                  borderRadius: '12px',
                  border: '1px solid #8B0000',
                  background: 'rgba(220, 20, 60, 0.2)',
                  color: '#E8E4D9',
                  fontSize: '14px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                Clear
              </button>
            )}
          </div>

          {/* Tags Container with 3 rows max + vertical scroll */}
          <div
            style={{
              maxHeight: '140px', // Approximately 3 rows (each ~44-48px)
              overflowY: 'auto',
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap',
              padding: '4px 0',
              // Custom scrollbar styling
              scrollbarWidth: 'thin',
              scrollbarColor: '#DC143C rgba(28, 28, 28, 0.4)',
            }}
            className="tags-scroll-container"
          >
            <button
              onClick={() => setSelectedTag(null)}
              style={{
                background: !selectedTag
                  ? 'rgba(220, 20, 60, 0.3)'
                  : 'rgba(28, 28, 28, 0.4)',
                color: '#E8E4D9',
                border: !selectedTag
                  ? '1px solid #DC143C'
                  : '1px solid #8B0000',
                padding: '8px 16px',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '14px',
                height: 'fit-content',
              }}
            >
              All Stories
            </button>

            {visibleTags.map((tag) => (
              <button
                key={tag}
                onClick={() =>
                  setSelectedTag(selectedTag === tag ? null : tag)
                }
                style={{
                  background:
                    selectedTag === tag
                      ? 'rgba(220, 20, 60, 0.3)'
                      : 'rgba(28, 28, 28, 0.4)',
                  color: '#E8E4D9',
                  border:
                    selectedTag === tag
                      ? '1px solid #DC143C'
                      : '1px solid #8B0000',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  height: 'fit-content',
                }}
              >
                #{tag}
              </button>
            ))}
          </div>

          {/* Add custom scrollbar styles */}
          <style jsx>{`
            .tags-scroll-container::-webkit-scrollbar {
              width: 6px;
            }
            .tags-scroll-container::-webkit-scrollbar-track {
              background: rgba(28, 28, 28, 0.4);
              border-radius: 10px;
            }
            .tags-scroll-container::-webkit-scrollbar-thumb {
              background: #DC143C;
              border-radius: 10px;
            }
            .tags-scroll-container::-webkit-scrollbar-thumb:hover {
              background: #FF1744;
            }
          `}</style>
        </div>

        {/* Stories Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '32px',
          }}
        >
          {filteredStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <StoryCard {...story} />
            </motion.div>
          ))}
        </div>

        {filteredStories.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '64px 24px',
              color: '#B8B8B8',
            }}
          >
            <p style={{ fontSize: '18px' }}>
              No stories found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
