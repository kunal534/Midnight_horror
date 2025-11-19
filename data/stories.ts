export interface Story {
  id: string;
  title: string;
  excerpt: string;
  fullContent: string;  
  imageUrl: string;
  slug: string;
  tags: string[];
  publishedDate: string;
  month: string;
  readTime?: string;  
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
 {
  id: '2',
  excerpt: 'In the misty hills of Ireland, her mournful cries foretell death… are you listening?',
  title: 'The Wailing of the Banshee',
  fullContent: `
In the ancient hills of Ireland, certain families are bound by fate to a ghostly herald: the Banshee.  
She is a female spirit, sometimes young and ethereal, sometimes old and terrifying, her long hair flowing like silver threads in the wind. Pale, almost translucent skin clings to her form, her eyes wide with sorrow or horror. She appears near windows, doorways, or graveyards at night, her mournful wail piercing the silence.  
The Banshee does not seek to harm; she warns. Her presence signals that a death approaches within a family tied to her curse. Those who hear her wail feel a cold dread, a premonition of loss, as if the air itself mourns in her absence.  
Some see her reflected in water, or as a ghostly silhouette against the moonlight. Her hands may reach toward the living, trembling with sorrow, her voice a lament carried by the wind. In Ireland, to see the Banshee is to confront fate itself. Will you hear her cry before it is too late?  
  `,
  imageUrl: '/images/Banshree.jpg',
  slug: 'the-wailing-of-the-banshee',
  tags: ['horror', 'supernatural', 'Irish folklore', 'ghost stories', 'wailing spirit'],
  publishedDate: 'Nov 2025',
  month: '2025-11',
  readTime: '6 min read'
}
,
{
  id: '3',
  title: 'The Nets Above the City',
  excerpt: 'In the neon-lit towers of Japan, bodies fall… and the powerful laugh from above.',
  fullContent: `
In the corporate depths of a Japanese megacity, the line between factory and office has finally collapsed.  
Glass towers shimmer in the dark, masks for the ruthless machinery within. Skybridges hum with cold light, and beneath them hang metal nets—installed not for compassion, but to protect productivity.  
Workers inside glow behind reflective windows, shadows hunched over screens, their faces hollow. Below, bodies sometimes slip past the netting—crashing onto the concrete with a final, helpless bloom of red. Those watching from rooftop lounges seldom flinch. Some even point. Some laugh. They are the architects of this system—the ones who forged the rules that keep everyone else obedient, silent, and replaceable.  
Every fall is a reminder of the hierarchy they built: steel above flesh, greed above life. In this city, the night carries more than smog—it carries the quiet certainty that no one mourns the fallen.  
Here, the nets do not save. They only catch what the powerful aren’t finished using. And for those who slip through… the street below becomes their last lesson in how the world truly works.  
  `,
  imageUrl: '/images/Japan_netting.jpg',
  slug: 'the-nets-above-the-city',
  tags: ['horror', 'corporate dystopia', 'psychological horror', 'urban terror', 'dark modern myth'],
  publishedDate: 'Nov 2025',
  month: '2025-11',
  readTime: '7 min read'
}

];
