export interface Thought {
  id: string;
  title: string;
  excerpt: string; // Short preview
  fullContent: string; // Full 2-3 paragraphs
  date: string;
  slug: string; // URL friendly
  category?: 'horror' | 'writing' | 'personal' | 'thoughts';
  // emoji?: string;
}

export const thoughtsList: Thought[] = [
  {
  id: '1',
  title: 'The Weight of Other People’s Chaos',
  slug: 'the-weight-of-other-peoples-chaos',
  excerpt: 'A reflection on why emotional distance becomes survival when others keep drowning in their own storms.',
  fullContent: `
People say they want honesty, but most of them want a cushion. They want someone to absorb the mess they’ve created inside their own head. 
And I don't understand how can this be termed as being emotional I mean it's just being unreliable as they are asking other to help fight a 
issue which didn't exist unless there mind created it. 
They aren’t looking for truth they’re looking for someone to carry what they refuse to deal with.
Watch people long enough and the pattern is obvious. When emotions spike, their sanity goes haywire. 
They hate clarity at that time as it forces them to see the part they play. 
What they want is someone who will match their chaos level or validate the story they’ve built to avoid accountability. 
And if you don’t sink with them you'r somehow cold heartless.
These people explode because they can’t handle their own thoughts. 
Others shut down because dealing with the chaos feels pointless. 
Psychologists call it hyperactivation and deactivation. 
I call it a clash between someone drowning in their own noise and someone refusing to be dragged under.
Here’s a brittle truth a lot of people don’t want to get better. They want attention, sympathy, or a witness but never the solution. 
They want someone next to them when they crash because facing the unknown terrifies them more than staying stuck.
Keeping your distance isn’t cruelty. It’s refusing to become collateral damage. 
Silence is sometimes the only way to stop these people from turning your words into ammunition.
They don’t need comfort. They need consequences. They need distance. 
 They need to sit alone with the emptiness they keep running from. That’s the only way they’ll ever hear the truth they avoid.
Not everyone drowning wants a hand. Some just want someone to watch them sink long enough to realise that some battles are fought alone.`,
  date: 'November 17, 2025',
  category: 'thoughts',
  // emoji: '🕯️',
}
,
{
  id: '2',
  title: 'The Fantasy That Raised Us',
  slug: 'the-fantasy-that-raised-us',
  excerpt: 'A breakdown of how comfort-first parenting, princess culture, and endless fantasy kept a generation from growing into their own minds.',
  fullContent: `
We grew up in a world where fantasy are easier than responsibility. Parents wanted quiet homes,
obidient kids, so replaced imagination with discipline. 
Instead of teaching life, they handed out comfort bubbles to live in. It felt harmless, but bubbles eventually choke reality.
This is how entire generations learned they were special before they ever learned how to be accountable. 
The princess stories weren’t just entertainment they became identity. You’re perfect. You deserve everything. 
Boys getting respect while not being held against the level one needs to earn to become respected.
You’re valuable just by existinsg. It sounds sweet, but it quietly destroys the foundation needed to face adulthood.
When fantasy lingers too long, maturity has no space to grow. 
Kids raised to believe the world will bend for them end up collapsing when it doesn’t. 
They carry an inner entitlement they don’t even recognize expecting people to adjust to their emotions, 
expecting relationships to survive without effort, expecting life to reward them without contribution.
Responsibility feels foreign to them because no one taught them how to hold their own weight. 
And when consequences finally arrive, they panic, shut down, or blame whoever is closest. 
It’s not malice it’s a childhood that refused to end.
The cycle continues because adults raised in fantasy often raise their children the same way. 
Comfort becomes tradition. Avoidance becomes normal. Reality becomes an intruder.
Here’s the part people don’t like admitting growth doesn’t happen inside a bubble.
It happens when the bubble pops. When you face your thoughts without a safety net. 
When your actions matter because no one is there to clean up after you.
Not every child raised on dreams grows up spoiled. But many grow up unprepared. And unprepared people repeat the very softness that hurt them.
Fantasy isn’t the enemy. Staying in it for too long is.`,
  date: 'November 20, 2025',
  category: 'thoughts',
  // emoji: '👁️',
}
,
{
  id: '3',
  title: 'When Biology Gets Rewired by Trauma',
  slug: 'when-biology-gets-rewired-by-trauma',
  excerpt: 'A breakdown of how collective trauma disrupts endocrine systems, attachment patterns, and natural behavioral biology.',
  fullContent: `
People forget that human behavior is regulated by neurobiology long before any cultural idea enters the picture. 
When a society experiences extreme violence r**e based terror, practices like sati, generational fear conditioning 
it produces collective trauma. This trauma alters gene expression (epigenetic methylation), disrupts the HPA-axis, 
and rewires the autonomic nervous system toward chronic threat detection.
Women who went through or inherited these conditions didn’t become strong protagonists. 
Their bodies shifted into persistent sympathetic dominance: elevated cortisol, hyperactivation of the amygdala, 
reduced oxytocin signaling, and increased vigilance circuits.
This creates trauma-induced hyper-independence a defensive phenotype, not empowerment.
Meanwhile, many men experienced chronic social shaming around androgen driven behaviors like assertiveness and boundary-setting. 
Instead of developing mature prefrontal regulation of aggression, they adapted through the freeze appease response: 
dopamine suppression, increased serotonin-mediated compliance, and inhibition of risk circuitry. 
This isn’t healthy softness it’s stress induced behavioral downregulation.
These patterns represent neuroendocrine dysregulation, not natural masculinity or femininity.
When these trauma coded adaptations are passed down across generations, the family system begins to degrade at the neurological level,
Oxytocin mediated bonding and ventral vagal engagement collapse when a woman stays in chronic hyperarousal.
Testosterone modulated stability, agency, and goal-directed drive collapse when a man remains in hypoarousal or appeasement mode.
Children lose access to models of secure attachment because both caregivers operate under HPA-axis dysregulation, 
limbic hijack, or dorsal vagal shutdown.
Relationships lose their function as co-regulation systems and instead become two nervous systems stuck in survival physiology.
A functional family doesn’t require traditional rules. It requires two adults with intact autonomic regulation:  
a prefrontal cortex capable of overriding limbic impulses,  
a stable HPA-axis,  
and endocrine systems not hijacked by inherited trauma responses.
If trauma isn’t addressed, the family structure collapses into biological pointlessness 
two dysregulated organisms sharing a home, mislabeled as a modern relationship.
Real strength is not toughness or softness.  
Real strength is a nervous system that isn’t being run by trauma
where biology operates as designed, without chronic hyperarousal, hypoarousal, or shame-based inhibition corrupting the system.
`,
date: 'November 22, 2025',
  category: 'personal',
  // emoji: '',
}

];
