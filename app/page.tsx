'use client';

import { useState } from 'react';
import MusicPlayer from '@/components/MusicPlayer/MusicPlayer';
import './page.css';

interface MonthlyPost {
  id: string;
  month: string;
  year: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  image?: string;
}

const monthlyPosts: MonthlyPost[] = [
  {
    id: '1',
    month: 'January',
    year: '2024',
    title: 'The First Midnight',
    excerpt: 'As the clock struck midnight, the whispers began. They said it was just the wind, but I knew better...',
    content: 'Full monthly post content here...',
    date: '2024-01-15',
    readTime: '10 min',
  },
  {
    id: '2',
    month: 'February',
    year: '2024',
    title: 'Dark Reflections',
    excerpt: 'The mirror showed something different tonight. Something that wasn\'t me, but looked exactly like me...',
    content: 'Full monthly post content here...',
    date: '2024-02-15',
    readTime: '12 min',
  },
  {
    id: '3',
    month: 'March',
    year: '2024',
    title: 'The Shadow\'s Embrace',
    excerpt: 'They warned me not to go into the old house at midnight. I should have listened...',
    content: 'Full monthly post content here...',
    date: '2024-03-15',
    readTime: '15 min',
  },
];

export default function Home() {
  const [selectedPost, setSelectedPost] = useState<MonthlyPost | null>(null);

  const handlePostClick = (post: MonthlyPost) => {
    setSelectedPost(post);
  };

  const handleBack = () => {
    setSelectedPost(null);
  };

  return (
    <main className="main-container">
      <MusicPlayer />
      
      <div className="content-wrapper">
        <header className="site-header">
          <h1>Midnight Horror Tales</h1>
          <p className="tagline">Lost in the woods. Haunted by memories. Craving love. Becoming legend.</p>
        </header>

        {selectedPost ? (
          <article className="post-reader">
            <button className="back-btn" onClick={handleBack}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
              </svg>
              Back to Monthly Posts
            </button>
            <div className="post-header">
              <div className="post-meta-header">
                <span className="post-month">{selectedPost.month} {selectedPost.year}</span>
                <span className="post-date">{selectedPost.date}</span>
              </div>
              <h2>{selectedPost.title}</h2>
              <div className="post-meta">
                <span>{selectedPost.readTime} read</span>
              </div>
            </div>
            <div className="post-content-full">
              {selectedPost.content}
            </div>
          </article>
        ) : (
          <section className="monthly-posts-section">
            <h2 className="section-title">Monthly Posts</h2>
            <p className="section-subtitle">Tales from the darkness, one month at a time</p>
            
            <div className="posts-grid">
              {monthlyPosts.map((post) => (
                <div
                  key={post.id}
                  className="post-card"
                  onClick={() => handlePostClick(post)}
                >
                  <div className="post-card-header">
                    <div className="post-month-badge">{post.month} {post.year}</div>
                    <div className="post-card-meta">
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <h3>{post.title}</h3>
                  <p className="post-excerpt">{post.excerpt}</p>
                  <div className="post-card-footer">
                    <span className="read-more">Read Post →</span>
                    <span className="post-date">{post.date}</span>
                  </div>
                  <div className="post-card-glow"></div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
