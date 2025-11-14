'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import StoryCard from '@/components/StoryCard/StoryCard';
import { stories } from '@/data/stories';

export default function StoriesArchivePage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Get all unique tags
  const allTags = Array.from(new Set(stories.flatMap((story) => story.tags)));

  // Filter stories
  const filteredStories = stories.filter((story) => {
    const matchesTag = !selectedTag || story.tags.includes(selectedTag);
    const matchesSearch =
      !searchQuery ||
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '48px 24px' }}>
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: '48px', textAlign: 'center' }}
      >
        <h1 style={{
          fontSize: '48px',
          color: '#E8E4D9',
          marginBottom: '16px',
          textShadow: '0 0 15px rgba(220, 20, 60, 0.5)',
          fontFamily: 'Cinzel, serif',
        }}>
          📖 Story Archive
        </h1>
        <p style={{
          fontSize: '18px',
          color: '#DC143C',
          fontFamily: 'Lora, serif',
        }}>
          All {stories.length} Horror Tales
        </p>
      </motion.header>

      {/* Search & Filter */}
      <div style={{ marginBottom: '32px' }}>
        {/* Search */}
        <input
          type="text"
          placeholder="Search stories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '16px',
            background: 'rgba(28, 28, 28, 0.6)',
            border: '1px solid #8B0000',
            borderRadius: '12px',
            color: '#E8E4D9',
            fontSize: '16px',
            marginBottom: '16px',
          }}
        />

        {/* Tags */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setSelectedTag(null)}
            style={{
              background: !selectedTag ? 'rgba(220, 20, 60, 0.3)' : 'rgba(28, 28, 28, 0.4)',
              color: '#E8E4D9',
              border: !selectedTag ? '1px solid #DC143C' : '1px solid #8B0000',
              padding: '8px 16px',
              borderRadius: '20px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            All Stories
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              style={{
                background: selectedTag === tag ? 'rgba(220, 20, 60, 0.3)' : 'rgba(28, 28, 28, 0.4)',
                color: '#E8E4D9',
                border: selectedTag === tag ? '1px solid #DC143C' : '1px solid #8B0000',
                padding: '8px 16px',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Stories Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '32px',
      }}>
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

      {/* No Results */}
      {filteredStories.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '64px 24px',
          color: '#B8B8B8',
        }}>
          <p style={{ fontSize: '18px' }}>
            No stories found matching your search.
          </p>
        </div>
      )}
    </div>
  );
}
