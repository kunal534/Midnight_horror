'use client';

import MusicPlayer from '@/components/MusicPlayer/MusicPlayer';
import './page.css';

interface Story {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  collection: string;
}

const previousStories: Story[] = [
  {
    id: '1',
    title: 'The Last Door',
    excerpt: 'There were 99 doors in the mansion, but the 100th appeared only at midnight...',
    content: 'Full story content here...',
    date: '2024-01-20',
    readTime: '7 min',
    collection: 'Does it exists?',
  },
  {
    id: '2',
    title: 'The Midnight Ritual',
    excerpt: 'They said it was just a legend, but the symbols appeared on their skin...',
    content: 'Full story content here...',
    date: '2024-02-01',
    readTime: '6 min',
    collection: 'The Veiled Circle',
  },
  {
    id: '3',
    title: 'The Whisper in the Woods',
    excerpt: 'Lost in the forest, she heard her name called from the darkness...',
    content: 'Full story content here...',
    date: '2024-02-10',
    readTime: '8 min',
    collection: 'Tails',
  },
];

export default function PreviousStories() {
  return (
    <main className="main-container">
      <MusicPlayer />
      
      <div className="content-wrapper">
        <header className="page-header">
          <h1>Previous Stories</h1>
          <p className="page-subtitle">Tales from the past, waiting to be rediscovered</p>
        </header>

        <div className="stories-grid">
          {previousStories.map((story) => (
            <article key={story.id} className="story-card">
              <div className="story-card-header">
                <span className="story-collection">{story.collection}</span>
                <span className="story-date">{story.date}</span>
              </div>
              <h2>{story.title}</h2>
              <p className="story-excerpt">{story.excerpt}</p>
              <div className="story-card-footer">
                <span className="read-time">{story.readTime} read</span>
                <button className="read-btn">Read Story →</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

