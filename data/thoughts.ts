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
  id: '1',
  title: 'The Weight of Other People’s Chaos',
  slug: 'the-weight-of-other-peoples-chaos',
  excerpt: 'A reflection on why emotional distance becomes survival when others keep drowning in their own storms.',
  fullContent: `
People say they want honesty, but most of them want a cushion. They want someone to absorb the mess they’ve created inside their own head. They call it vulnerability, but it’s just unloading. They aren’t looking for truth; they’re looking for someone to carry what they refuse to deal with.
Watch people long enough and the pattern is obvious. When emotions spike, their sanity goes haywire. Clarity forces them to see the part they play. What they want is someone who will match their panic or validate the story they’ve built to avoid accountability. And if you don’t do that—if you don’t sink with them—you’re labeled cold.
Some people explode because they can’t handle their own thoughts. Others shut down because dealing with the chaos feels pointless. Psychologists call it hyperactivation and deactivation. I call it a clash between someone drowning in their own noise and someone refusing to be dragged under.
Here’s the truth no one likes: a lot of people don’t want to get better. They want attention, sympathy, or a witness. They want someone next to them when they crash because facing the unknown terrifies them more than staying stuck.
Keeping your distance isn’t cruelty. It’s refusing to become collateral damage. Silence is sometimes the only way to stop people from turning your words into ammunition.
Some people don’t need comfort. They need consequences. They need distance. They need to sit alone with the emptiness they keep running from. That’s the only way they’ll ever hear the truth they avoid.
Not everyone drowning wants a hand. Some just want someone to watch them sink long enough to realise that some battles are fought alone.`,
  date: 'November 17, 2025',
  category: 'thoughts',
  emoji: '🕯️',
}
,
{
  id: '2',
  title: 'The Fantasy That Raised Us',
  slug: 'the-fantasy-that-raised-us',
  excerpt: 'A breakdown of how comfort-first parenting, princess culture, and endless fantasy kept a generation from growing into their own minds.',
  fullContent: `
We grew up in a world where fantasy are easier than responsibility. Parents wanted quiet homes, not stronger kids, so imagination replaced discipline. Instead of teaching boundaries, they handed out comfort. Instead of teaching resilience, they offered bubbles to live in. It felt harmless, but bubbles eventually choke reality.
This is how entire generations learned they were special before they ever learned how to be accountable. The princess stories weren’t just entertainment—they became identity. You’re perfect. You deserve everything. You’re valuable just by existing. It sounds sweet, but it quietly destroys the foundation needed to face adulthood.
When fantasy lingers too long, maturity has no space to grow. Kids raised to believe the world will bend for them end up collapsing when it doesn’t. They carry an inner entitlement they don’t even recognize: expecting people to adjust to their emotions, expecting relationships to survive without effort, expecting life to reward them without contribution.
Responsibility feels foreign to them because no one taught them how to hold their own weight. And when consequences finally arrive, they panic, shut down, or blame whoever is closest. It’s not malice it’s a childhood that refused to end.
The cycle continues because adults raised in fantasy often raise their children the same way. Comfort becomes tradition. Avoidance becomes normal. Reality becomes an intruder.
Here’s the part people don’t like admitting growth doesn’t happen inside a bubble. It happens when the bubble pops. When you face your thoughts without a cushion. When your actions matter because no one is there to clean up after you.
Not every child raised on dreams grows up spoiled. But many grow up unprepared. And unprepared people repeat the very softness that hurt them.
Fantasy isn’t the enemy. Staying in it for too long is.`,
  date: 'November 20, 2025',
  category: 'thoughts',
  emoji: '👁️',
}

];
