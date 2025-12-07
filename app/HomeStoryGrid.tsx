'use client';

import { motion } from 'framer-motion';
import StoryCard from '@/components/StoryCard/StoryCard';
import styles from './page.module.scss';
import type { Story } from '@/data/stories'; // adjust to your type

export default function HomeStoryGrid({ stories }: { stories: Story[] }) {
  if (!stories.length) {
    return (
      <motion.div
        className={styles.noStories}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <p>No stories available for this month. Check back soon...</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={styles.storiesGrid}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {stories.map((story, index) => (
        <motion.div
          key={story.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.3 }}
        >
          <StoryCard {...story} />
        </motion.div>
      ))}
    </motion.div>
  );
}
