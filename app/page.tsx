// 'use client';

// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import MonthSelector from '@/components/MonthSelector/MonthSelector';
// import StoryCard from '@/components/StoryCard/StoryCard';
// import HorrorAnimation from '@/components/HorrorAnimation/HorrorAnimation';
// import styles from './page.module.scss';
// import { format } from 'date-fns';
// import { stories } from '@/data/stories';

// function getStoryDate(publishedDate: string): Date {
//   return new Date(publishedDate.trim());
// }

// export default function HomePage() {
//   const [selectedMonth, setSelectedMonth] = useState(
//     format(new Date(), 'yyyy-MM')
//   );
//   const [filteredStories, setFilteredStories] = useState(stories);

//   useEffect(() => {
//     const filtered = stories
//       .filter((story) => story.month === selectedMonth)
//       .sort((a, b) => {
//         const timeA = getStoryDate(a.publishedDate).getTime();
//         const timeB = getStoryDate(b.publishedDate).getTime();

//         if (timeA < timeB) return 1;   // newest first
//         if (timeA > timeB) return -1;
//         return 0;
//       });

//     setFilteredStories(filtered);
//   }, [selectedMonth]);

//   return (
//     <>
//       <HorrorAnimation />

//       <motion.div
//         className={styles.homePage}
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5, delay: 0.3 }}
//       >
//         <motion.header
//           className={styles.header}
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.5 }}
//         >
//           <div className={styles.titleSection}>
//             <h1 className={styles.title}>Midnight Horror Tales</h1>
//             <p className={styles.subtitle}>
//               Curated stories for the witching hour
//             </p>
//           </div>
//           <MonthSelector onMonthChange={setSelectedMonth} />
//         </motion.header>

//         <div className={styles.container}>
//           {filteredStories.length > 0 ? (
//             <motion.div
//               className={styles.storiesGrid}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.3 }}
//             >
//               {filteredStories.map((story, index) => (
//                 <motion.div
//                   key={story.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
//                 >
//                   <StoryCard {...story} />
//                 </motion.div>
//               ))}
//             </motion.div>
//           ) : (
//             <motion.div
//               className={styles.noStories}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//             >
//               <p>No stories available for this month. Check back soon...</p>
//             </motion.div>
//           )}
//         </div>
//       </motion.div>
//     </>
//   );
// }
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import MonthSelector from '@/components/MonthSelector/MonthSelector';
import StoryCard from '@/components/StoryCard/StoryCard';
import styles from './page.module.scss';
import { format } from 'date-fns';
import { stories } from '@/data/stories';

// Lazy-load HorrorAnimation since it's not critical for first paint
const HorrorAnimation = dynamic(
  () => import('@/components/HorrorAnimation/HorrorAnimation'),
  { ssr: false }
);

function getStoryDate(publishedDate: string): Date {
  return new Date(publishedDate.trim());
}

export default function HomePage() {
  const [selectedMonth, setSelectedMonth] = useState(
    format(new Date(), 'yyyy-MM')
  );
  const [filteredStories, setFilteredStories] = useState(stories);

  useEffect(() => {
    const filtered = stories
      .filter((story) => story.month === selectedMonth)
      .sort((a, b) => {
        const timeA = getStoryDate(a.publishedDate).getTime();
        const timeB = getStoryDate(b.publishedDate).getTime();

        if (timeA < timeB) return 1;   // newest first
        if (timeA > timeB) return -1;
        return 0;
      });

    setFilteredStories(filtered);
  }, [selectedMonth]);

  return (
    <>
      <HorrorAnimation />

      <motion.div
        className={styles.homePage}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.header
          className={styles.header}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className={styles.titleSection}>
            <h1 className={styles.title}>Midnight Horror Tales</h1>
            <p className={styles.subtitle}>
              Curated stories for the witching hour
            </p>
          </div>
          <MonthSelector onMonthChange={setSelectedMonth} />
        </motion.header>

        <div className={styles.container}>
          {filteredStories.length > 0 ? (
            <motion.div
              className={styles.storiesGrid}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {filteredStories.map((story, index) => (
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
          ) : (
            <motion.div
              className={styles.noStories}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p>No stories available for this month. Check back soon...</p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </>
  );
}
