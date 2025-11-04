'use client';

import { useState } from 'react';
import MusicPlayer from '@/components/MusicPlayer/MusicPlayer';
import './page.css';

interface LongStory {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  chapters: number;
}

const longerStories: LongStory[] = [
  {
    id: '1',
    title: 'The Midnight Chronicles',
    excerpt: 'A series of interconnected tales spanning decades, exploring the darkness that lurks in the shadows of time...',
    content: 'Full longer story content here...',
    date: '2024-01-01',
    readTime: '45 min',
    chapters: 5,
  },
  {
    id: '2',
    title: 'Echoes of the Forgotten',
    excerpt: 'When the past refuses to stay buried, it comes back with a vengeance. A tale of memory, loss, and what lies beyond...',
    content: 'Full longer story content here...',
    date: '2024-02-01',
    readTime: '60 min',
    chapters: 7,
  },
  {
    id: '3',
    title: 'The Last Witness',
    excerpt: 'In a world where the dead don\'t stay dead, one person holds the key to understanding the truth...',
    content: 'Full longer story content here...',
    date: '2024-03-01',
    readTime: '50 min',
    chapters: 6,
  },
];

export default function LongerStories() {
  const [selectedStory, setSelectedStory] = useState<LongStory | null>(null);

  const handleStoryClick = (story: LongStory) => {
    setSelectedStory(story);
  };

  const handleBack = () => {
    setSelectedStory(null);
  };

  return (
    <main className="main-container">
      <MusicPlayer />
      
      <div className="content-wrapper">
        <header className="page-header">
          <h1>Longer Stories</h1>
          <p className="page-subtitle">Extended tales that dive deep into the darkness</p>
        </header>

        {selectedStory ? (
          <article className="story-reader">
            <button className="back-btn" onClick={handleBack}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
              </svg>
              Back to Stories
            </button>
            <div className="story-header">
              <div className="story-meta-header">
                <span>{selectedStory.chapters} Chapters</span>
                <span>•</span>
                <span>{selectedStory.readTime}</span>
              </div>
              <h2>{selectedStory.title}</h2>
              <div className="story-meta">
                <span>{selectedStory.date}</span>
              </div>
            </div>
            <div className="story-content-full">
              {selectedStory.content}
            </div>
          </article>
        ) : (
          <div className="stories-grid">
            {longerStories.map((story) => (
              <article
                key={story.id}
                className="long-story-card"
                onClick={() => handleStoryClick(story)}
              >
                <div className="story-card-header">
                  <div className="story-badge">
                    <span>{story.chapters} Chapters</span>
                  </div>
                  <span className="story-date">{story.date}</span>
                </div>
                <h2>{story.title}</h2>
                <p className="story-excerpt">{story.excerpt}</p>
                <div className="story-card-footer">
                  <span className="read-time">{story.readTime}</span>
                  <span className="read-more">Read Story →</span>
                </div>
                <div className="story-card-glow"></div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

