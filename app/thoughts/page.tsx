'use client';

import MusicPlayer from '@/components/MusicPlayer/MusicPlayer';
import './page.css';

interface Thought {
  id: string;
  title: string;
  content: string;
  date: string;
  tags: string[];
}

const thoughts: Thought[] = [
  {
    id: '1',
    title: 'On the Nature of Fear',
    content: 'Fear is not something to be conquered, but something to be understood. It is the shadow that defines the light, the darkness that makes the stars visible...',
    date: '2024-01-20',
    tags: ['Philosophy', 'Fear', 'Darkness'],
  },
  {
    id: '2',
    title: 'The Beauty in Horror',
    content: 'There is an undeniable beauty in horror. It reminds us of our mortality, our fragility, and in doing so, makes us appreciate the moments of light even more...',
    date: '2024-02-15',
    tags: ['Beauty', 'Horror', 'Reflection'],
  },
  {
    id: '3',
    title: 'Midnight Thoughts on Mortality',
    content: 'At midnight, when the world sleeps, we are most alone with our thoughts. It is in these moments that we confront the ultimate truth: we are finite, temporary, and that makes every moment precious...',
    date: '2024-03-10',
    tags: ['Mortality', 'Midnight', 'Philosophy'],
  },
];

export default function Thoughts() {
  return (
    <main className="main-container">
      <MusicPlayer />
      
      <div className="content-wrapper">
        <header className="page-header">
          <h1>My Thoughts</h1>
          <p className="page-subtitle">Reflections on darkness, fear, and the human condition</p>
        </header>

        <div className="thoughts-grid">
          {thoughts.map((thought) => (
            <article key={thought.id} className="thought-card">
              <div className="thought-header">
                <span className="thought-date">{thought.date}</span>
                <div className="thought-tags">
                  {thought.tags.map((tag, index) => (
                    <span key={index} className="thought-tag">{tag}</span>
                  ))}
                </div>
              </div>
              <h2>{thought.title}</h2>
              <p className="thought-content">{thought.content}</p>
              <div className="thought-glow"></div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

