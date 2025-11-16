export interface Thought {
  id: string;
  title: string;
  excerpt: string; // Short preview
  fullContent: string; // Full 2-3 paragraphs
  date: string;
  slug: string; // URL friendly
  category?: 'horror' | 'writing' | 'personal' | 'thoughts';
  emoji?: string;
}

export const thoughtsList: Thought[] = [
  {
  id: '2',
  title: 'The Weight of Other People’s Chaos',
  slug: 'the-weight-of-other-peoples-chaos',
  excerpt: 'A reflection on why emotional distance becomes survival when others keep drowning in their own storms.',
  fullContent: `
People think they want honesty, but most of them really want a place to collapse. They call it vulnerability, expression, or being “emotional,” but underneath it all is a simple truth: they want someone else to hold the weight they refuse to face alone.

The more I watch people spiral into their own intensity, the more obvious the pattern becomes. They don’t want clarity. Clarity exposes them. They want someone who mirrors their panic, feeds their narrative, or becomes the villain when the story needs one. And if you don’t play along, if you stay still while they thrash, you become the cold one.

Some minds erupt to soothe themselves. Others detach to survive. Psychology calls it hyperactivation and deactivation. I call it two incompatible worlds: one drowning, the other watching the water rise without stepping in.

I’ve learned that not every sinking ship wants to be saved. Most just want company on the way down. They’ll call it connection, but it’s really escape—an attempt to avoid the mirror waiting in the quiet.

Distance isn’t cruelty. It’s self-preservation. And sometimes silence speaks the only truth people can’t manipulate.

This is the part no one says out loud: some people don’t need comfort. They need distance, consequences, or darkness deep enough to finally hear themselves.
  `,
  date: 'November 17, 2025',
  category: 'thoughts',
  emoji: '🕯️',
}
,
];
