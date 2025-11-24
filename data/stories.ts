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
    fullContent: `
Hollow Hunger explores the legend of the Wendigo, a creature from Algonquian speaking Indigenous peoples of North America.  
The Wendigo is associated with insatiable greed, cannibalism, and the consequences of moral transgression, particularly in harsh winter environments where survival is scarce.  
It embodies both physical horror and psychological terror, representing the human fear of isolation, starvation, and the loss of moral control.  
Historically, stories of the Wendigo were used as cautionary tales to discourage selfishness and antisocial behavior in communities, emphasizing cultural ethics and survival rules.  
The legend is most prevalent in regions of Canada and the northern United States, influencing oral storytelling, literature, and modern horror interpretations.`,
    imageUrl: '/images/Wendigo.jpg',
    slug: 'whispers-in-dark',
    tags: ['supernatural', 'mystery', 'psychological'],
    publishedDate: 'November 2025',
    month: '2025-11',
    readTime: '5 min read',
  },
  {
    id: '2',
    title: 'The Wailing of the Banshee',
    excerpt: 'In the misty hills of Ireland, her mournful cries foretell death… are you listening?',
    fullContent: `
The Wailing of the Banshee examines one of Ireland’s most iconic ghostly figures, a female spirit whose mournful cry foretells death in specific families.  
In Irish folklore, Banshees are described as ethereal or terrifying women, often appearing near windows, doorways, or graveyards at night.  
The legend dates back centuries and is tied to clan-based lineages families believed to have a Banshee are warned of imminent death through her wail rather than physical attack.  
Her presence reflects deep cultural beliefs about mortality, fate, and the connection between the living and the spirit world.  
Primarily famous in rural Ireland, the Banshee influenced storytelling, oral tradition, and literature, reinforcing the psychological weight of death and the inevitability of fate.`,
    imageUrl: '/images/Banshree.jpg',
    slug: 'the-wailing-of-the-banshee',
    tags: ['horror', 'supernatural', 'Irish folklore', 'ghost stories', 'wailing spirit'],
    publishedDate: 'November 2025',
    month: '2025-11',
    readTime: '6 min read'
  },
  {
    id: '3',
    title: 'The Nets Above the City',
    excerpt: 'In the neon-lit towers of Japan, bodies fall… and the powerful laugh from above.',
    fullContent: `
The Nets Above the City explores modern urban horror rooted in social commentary, set against the backdrop of Japan’s highly industrialized megacities.  
It imagines corporate environments where safety measures, such as nets, are deployed not for protection but to maintain productivity, highlighting the dehumanization of workers.  
The story reflects real-world issues like workplace exploitation, class disparity, and urban anonymity, where the powerless are vulnerable and the elite remain indifferent.  
While fictional, the narrative draws inspiration from societal pressures in Japan’s urban centers, including overwork culture, hierarchical control, and the psychological toll of industrialization.  
It portrays a chilling environment where human life is secondary to efficiency, and horror arises from systemic neglect rather than supernatural forces.  
`,
    imageUrl: '/images/Japan_netting.jpg',
    slug: 'the-nets-above-the-city',
    tags: ['horror', 'corporate dystopia', 'psychological horror', 'urban terror', 'dark modern myth'],
    publishedDate: 'November 2025',
    month: '2025-11',
    readTime: '7 min read'
  },
  {
    id: '4',
    title: 'Eyes from Ashes',
    excerpt: 'Among the burning dead, selective morality finally shows its true cost.',
    fullContent: `
Eyes from Ashes highlights the Aghori, an extreme sect in Hinduism known for confronting death, decay, and taboo rituals.  
Members engage with ashes, corpses, and cremation grounds to symbolize the impermanence of life and detach from fear, attachment, and societal norms.  
These rituals are intended to confront mortality directly, cultivate spiritual transcendence, and embrace what others find abhorrent.  
Found primarily in Varanasi and Northern India, the Aghori have fascinated locals and outsiders alike, representing a philosophical approach to death and human vulnerability.  
This image captures their intense practices, the eerie atmosphere of cremation grounds, and the unsettling psychological horror of facing mortality head-on, emphasizing dark realism over sensationalism.`,
    imageUrl: '/images/Aghoni.jpg',
    slug: 'eyes-from-ashes',
    tags: ['horror', 'selective morality', 'psychological horror', 'dark realism', 'mortality'],
    publishedDate: 'November 2025',
    month: '2025-11',
    readTime: '6 min read'
  },
  {
    id: '5',
    title: 'Behind the Ashram’s Gaze',
    excerpt: 'Within the Dera’s high walls, he used faith as a tool of domination, obedience a currency for unspeakable acts.',
    fullContent: `
Behind the Ashram’s Gaze examines the Dera Sacha Sauda, a real-world sect in India with a history of strict hierarchy and reported abuse.  
The story highlights how spiritual authority can be weaponized to control followers, using obedience, ritual, and secrecy as tools of domination.  
It situates the ashram within its cultural, social, and ethical context, showing the psychological impact of coercion and fear on devotees.  
While the Dera is known for charity and spiritual practices to outsiders, the narrative explores the hidden layers of power, exploitation, and manipulation that often remain invisible.  
This story provides readers with insight into the mechanisms of control within secluded religious communities, emphasizing dark realism and psychological horror over sensationalism.  
It reflects on broader human behaviors, morality, and the consequences of blind faith in hierarchical structures.`,
    imageUrl: '/images/Ashram.jpg',
    slug: 'through-the-lattice-of-sin',
    tags: ['horror', 'cult', 'psychological horror', 'ritual abuse', 'dark realism'],
    publishedDate: 'November 2025',
    month: '2025-11',
    readTime: '7 min read'
  },
  {
    id: '6',
    title: 'Wobble Down Within Me',
    excerpt: 'I drift above the village, a severed head hung with flesh, eyes hollow and hungry, waiting for those who stray.',
    fullContent: `
Wobble Down Within Me explores the folklore of the Krasue, a nocturnal spirit from Southeast Asia, particularly Thailand, Laos, and Cambodia. Traditionally depicted as a woman’s floating head with dangling internal organs, the Krasue embodies fear, superstition, and moral caution in rural communities. Mentioned in historical texts and local scriptures, the Krasue is often said to prey on children and innocents. Folklore describes the ghost separating its upper body from the lower at night to search for food. Legends also warn that if the Krasue does not return to its body before sunrise, the body will burn, killing the spirit.`,
    imageUrl: '/images/japenese.jpg',
    slug: 'wobble-down-within-me',
    tags: ['horror', 'folklore', 'psychological horror', 'supernatural', 'dark realism'],
    publishedDate: 'November 2025',
    month: '2025-11',
    readTime: '3 min read'
  },
  {
    id: '7',
    title: 'Order of the Solar Temple: The Ember Concord',
    excerpt: 'In remote chalets across Europe and Canada, devotion turned fatal, leaving charred halls and silent witnesses…',
    fullContent: `
The Order of the Solar Temple was a doomsday cult founded by Joseph Di Mambro and Luc Jouret.  
Between 1994 and 1997, the cult orchestrated mass ritual deaths in Switzerland, France, and Canada.  
Members participated in ceremonies inside remote chalets, often wearing crimson-and-gold robes and following Templar-inspired symbolism.  
The group believed in “transit” to a higher plane, which led followers to participate in fatal rituals involving fire and ceremonial objects.  
This image reflects the cult’s obsessive devotion, ritualistic practices, and the tragic events that resulted from blind faith.`,    
  imageUrl: '/images/cult2.jpg',
    slug: 'order-of-the-solar-temple',
    tags: ['cult', 'true crime', 'ritual', 'psychological horror', 'mass deaths', 'occult'],
    publishedDate: 'October 2025',
    month: '2025-10',
    readTime: '6 min read'
  }
];
