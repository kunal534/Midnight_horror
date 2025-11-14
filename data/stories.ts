export interface Story {
  id: string;
  title: string;
  excerpt: string;
  fullContent: string;  // ← New: Full story text
  imageUrl: string;
  slug: string;
  tags: string[];
  publishedDate: string;
  month: string;
  readTime?: string;  // ← New: Reading time
}

export const stories: Story[] = [
  {
    id: '1',
    title: 'Hollow Hunger',
    excerpt: 'A mysterious voice calls from the darkness, and those who answer are never the same...',
    fullContent: `A storm pinned Elias inside the abandoned ranger station, but the footprints outside didn’t belong to any human—too narrow, too deep, too deliberate. They circled the cabin all night, never overlapping, as if the thing outside was studying him.
By dawn, the generator died. The radio followed. Every window showed the same treeline—silent, rigid, watching. When Elias finally stepped out, the air carried a smell like frozen meat turning warm.
He heard his own voice call his name from the forest. Perfect pitch. Perfect breath. Impossible.
He ran.
The voice followed, getting closer, softer, almost sympathetic, until it whispered against his ear: “You already know why I sound like you.”
Elias looked down.
His footprints weren’t behind him—they were ahead of him.
The wendigo had been wearing him long before he started running.`,
    imageUrl: '/images/Wendigo.jpg',
    slug: 'whispers-in-dark',
    tags: ['supernatural', 'mystery', 'psychological'],
    publishedDate: 'November 2025',
    month: '2025-11',
    readTime: '5 min read',
  },
  
  // ✅ ADD MORE STORIES WITH FULL CONTENT
  /*
  {
    id: '2',
    title: 'Your Story Title',
    excerpt: 'Short preview...',
    fullContent: `
Your full story goes here. You can write as much as you want.
Use multiple paragraphs.

Each paragraph will be formatted nicely on the story page.
    `,
    imageUrl: '/images/story2.jpg',
    slug: 'your-story-slug',
    tags: ['horror', 'thriller'],
    publishedDate: 'December 2025',
    month: '2025-12',
    readTime: '8 min read',
  },
  */
];
