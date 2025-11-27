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
Hollow Hunger situates the Wendigo within the cultural traditions of Algonquian-speaking Indigenous peoples in northern North America. The figure appears in oral narratives as both a literal threat and a symbolic mechanism for examining extreme behavior under severe winter scarcity.
Most ethnographic accounts describe the Wendigo as emerging from a grave moral violation most commonly cannibalism during starvation. In many Indigenous interpretations, the transformation is not depicted as a sudden supernatural event but as the gradual erosion of ethical judgement. Individuals who demonstrated persistent greed, violence, or antisocial behavior were considered vulnerable to becoming Wendigo, reinforcing community expectations around cooperation, restraint, and collective survival.
A notable area of scholarship involves historical reports labeled by early observers as Wendigo psychosis instances in which individuals believed they were transforming into the creature or feared they would harm others. Although the accuracy of this diagnosis is contested, these accounts reveal how the legend intersected with mental health interpretations, colonial documentation, and Indigenous justice practices. This blend of folklore, social regulation, and recorded cases distinguishes the Wendigo within North American mythological studies.
In the end, the legend raises a broader question: when survival fractures the boundaries of community and morality, how far can a person stray before they are no longer seen as human at all?`,
    imageUrl: '/images/Wendigo.jpg',
    slug: 'whispers-in-dark',
    tags: ['supernatural', 'mystery', 'psychological'],
    publishedDate: 'November 2025',
    month: '2025-11',
    readTime: '7 min read',
  },
  {
    id: '2',
    title: 'The Wailing of the Banshee',
    excerpt: 'In the misty hills of Ireland, her mournful cries foretell death… are you listening?',
    fullContent: `
The Wailing of the Banshee explores one of Ireland’s oldest ghostly legends a spectral woman whose mournful cry foretells death for certain blood bound families.  
The name “Banshee” comes from the Irish bean sídhe (or “woman of the fairy mound”), tying her directly to the ancient Otherworld of the fair folk and the Gaelic tradition of ancestral spirits.
The first known written reference to a Banshee like figure appears in the 14th century chronicle _Cathreim Thoirdhealbhaigh_ ( Triumphs of Torlough ), where OTHERWORLD WOMEN are described lamenting doom before battles a precursor to the wailing spirit motif. 
Over time, the legend evolved. By the 17th century, accounts such as those collected in Irish folk tale compilations described the Banshee as a spectral harbinger of death attached to noble Gaelic families (like the O’Neills, O’Connors, O’Briens, O’Gradys, and Kavanaghs). 
Descriptions vary some remember a sorrowful young maiden drifting along hilltops, others a haggard crone wailing by a window at night, long hair tangled and robes like funeral shrouds. Her cry, known as keening, echoes grief before the final act, a lament that arrives long before word of death reaches the living.
If you ever hear her cry at night would you have the courage to listen, or would you turn away, hoping fate changes its course?  `,
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
The Nets Above the City examines a modern urban horror where the machinery of corporate power turns human life into expendable currency.
High-rise offices and industrial complexes merge into a sprawling labyrinth of glass and steel, where nets are strung not to save lives but to control them. Those who slip, stumble, or falter become grim examples their falls a haunting reminder of the price of obedience.
Inside the reflective towers, figures in polished offices point and laugh, detached from the suffering below, reveling in their dominance. Streets and service roads become stages for the helpless, while the elite, insulated by design and hierarchy, remain unscathed.
The horror is systemic the cold, calculating machinery of greed, ambition, and power, rendered in human form. When the nets begin to fray and their limits reach an end, the real question remains how far will they still go in bathing lives in blood just to feed their pride?`,
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
Eyes from Ashes examines the Aghori, a radical Shaivite sect rooted in the medieval Kāpālika tradition and later shaped by the teachings of Baba Keenaram in 17th-century Varanasi. Their existence is built on a single premise nothing is pure, nothing is impure only the human mind creates fear, filth, and morality to protect itself.
Aghoris dismantle those illusions through practices most people can’t even look at. They meditate in cremation grounds, cover themselves in human ash, use skulls as ritual tools, and confront corpses not for spectacle but for annihilation of the ego. The goal isn’t shock value it’s erasing the boundary between life and death, body and spirit, self and decay.
Their rituals attack selective morality at its roots. The same society that worships gods of destruction calls these ascetics “impure” for touching what everyone eventually becomes. Aghori philosophy exposes this contradiction without apology. Fear, disgust, purity, identity all are attachments that keep the mind chained.
Centered mainly in Varanasi and Northern India, the Aghori lineage has survived because it makes no concessions to comfort or cultural approval. It is a system built on psychological confrontation dissolve fear by walking into it, dissolve mortality by holding it, dissolve illusion by living where the living refuse to look.
This image captures the core of the raw exposure of mortality, vulnerability, and the shadows society hides behind ritual purity.
`,
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
Behind the Ashram’s Gaze exposes Dera Sacha Sauda’s machinery of control.  
Inside, obedience was proof of faith. Devotees endured exploitative rituals, coerced medical procedures, and illegal organ and skin transplants at the Shah Satnam Ji Hospital.  
Nearly 400 male followers were reportedly castrated under the guise of spiritual purification, while trafficking claims reveal infants “donated” to the ashram never returned.  
Secret tunnels, unlicensed facilities, and disappearing records masked a system that monetized devotion.  
Despite these horrors, many still enter, drawn by the charisma and promises of Ram Rahim.  
He used faith as currency, profiting from sacrifice. The purpose of this post is a reminder that blind faith without thought makes one no different from a scapegoat.
`,
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
Wobble Down Within Me is about the folklore of the Krasue, a nocturnal spirit from Southeast Asia, particularly Thailand, Laos, and Cambodia.
Traditionally depicted as a woman’s floating head with trailing internal organs, the Krasue embodies fear, superstition, and moral caution in rural communities.
According to legend, a Krasue is created when a person, often a woman, practices black magic, commits grave sins, or engages in immoral acts such as consuming forbidden substances, killing, or using dark spiritual powers for selfish gain. 
These actions curse her to separate from her body at night and roam as a floating spirit.
The Krasue is mentioned in historical texts such as the “Tamnan Krasue” in Thai folklore, as well as local Laotian and Cambodian oral traditions, which describe her as preying on children, livestock, and the unwary.
Folklore describes the ghost separating its upper body from the lower at night to search for food, and warns that if she does not return before sunrise, her body will burn, killing the spirit.`,
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
The Order of the Solar Temple was a doomsday cult founded in 1984 by Joseph Di Mambro and Luc Jouret in Switzerland, inspired by Templar mysticism and apocalyptic beliefs.  
The group promised spiritual transcendence and eternal life through a ritual called transit, leading followers to participate in secret ceremonies that often ended in mass deaths.  
Between 1994 and 1997, the cult orchestrated ritualistic deaths across Switzerland, France, and Canada, many involving fire inside remote chalets and ceremonial objects, reflecting their obsession with spiritual purification.  
Investigations later revealed the cult’s strict hierarchy, esoteric rituals, and the manipulation of members’ fear and devotion to achieve compliance.  
Both founders died during these mass rituals—Di Mambro and Jouret perished alongside many followers—cementing the cult’s tragic legacy.  
This image reflects the cult’s deadly devotion, the eerie atmosphere of their ceremonies, and the psychological and ritualistic mechanisms that drove ordinary people to fatal obedience.`,
  imageUrl: '/images/cult2.jpg',
    slug: 'order-of-the-solar-temple',
    tags: ['cult', 'true crime', 'ritual', 'psychological horror', 'mass deaths', 'occult'],
    publishedDate: 'October 2025',
    month: '2025-10',
    readTime: '6 min read'
  },
  {
  id: '8',
  title: 'The Bride of Shadows',
  excerpt: 'Bartered before she could even see the sun, she danced in gilded cages while eyes of fathers and boys like kin feasted on her innocence…',
  fullContent: `
The Bride of Shadows explores the horrifying life of a Qing Dynasty Flower House courtesan, sold into a gilded cage before adolescence.
Trained by a matron who masked cruelty with smiles, she was forced to entertain and please men decades her senior while learning the brutal lessons of objectification and betrayal.
The world she entered was one where childhood, family bonds, and morality were stripped away. She was even coerced into pleasing boys her own age, resembling brothers, as part of her training.
Every silk dress, perfumed room, and decorative chamber concealed the rot of exploitation a prison where beauty was weaponized against her.
This story is a meditation on human cruelty, the betrayal of trust, and the moral void of those who profit from another's flesh.
In the end, I believe many of us can’t even come close to such sin in our darkest times, but we must ask ourselves if such deeds are counted, has hell even begun?`,
  imageUrl: '/images/flower_house.jpg',
  slug: 'the-bride-of-shadows',
  tags: ['horror', 'historical horror', 'psychological horror', 'Qing dynasty', 'exploitation', 'dark realism'],
  publishedDate: 'October 2025',
  month: '2025-10',
  readTime: '6 min read'
},{
  id: '9',
  title: 'The Board of Aum',
  excerpt: 'A cult of devotion turned murder, where faith demanded obedience beyond morality, and Tokyo’s subway became a theater of terror…',
  fullContent: `The Board of Aum examines the terrifying rise of Shoko Asahara, a man who cloaked apocalyptic visions in the guise of spiritual enlightenment. He built a cult that demanded absolute obedience, convincing his followers that faith required acts beyond morality.
In March 1995, that obedience became murder. During Tokyo's morning rush hour, five disciples boarded subway trains carrying sarin gas, an invisible weapon of their own creation. With umbrellas sharpened to release the poison, they transformed ordinary commuters into victims of a calculated nightmare. Thirteen died immediately, and thousands more were injured, their lives marked forever by fear, confusion, and physical trauma.
Behind the attack lay years of preparation: chemical experimentation, indoctrination, and the corruption of knowledge to serve fanaticism. Hospitals overflowed, emergency responders were overwhelmed, and a city known for order became a theater of terror.
The aftermath revealed secret laboratories, chemical stockpiles, and a devoted inner circle willing to kill in the name of faith. Asahara and his leaders were tried and eventually executed, but the shadows of their crimes linger.
This story is a meditation on human susceptibility to manipulation, the moral void of unchecked belief, and the devastating consequences when ideology eclipses conscience. We are left to ask how far can devotion go before it consumes everything in its path?`,
  imageUrl: '/images/The_Board_of_Aum.jpg',
  slug: 'the-board-of-aum',
  tags: ['horror', 'historical horror', 'psychological horror', 'true crime', 'cult', 'Aum Shinrikyo'],
  publishedDate: 'October 2025',
  month: '2025-10',
  readTime: '5 min read'
},
{
  id: '10',
  title: 'Fire in the Church',
  excerpt: 'A prophecy twisted into doom, a congregation sealed within its sanctuary, and a fire that turned devotion into mass death…',
  fullContent: `Fire in the Church traces the final hours of the Movement for the Restoration of the Ten Commandments of God a group led by Joseph Kibweteere and Credonia Mwerinde, whose apocalyptic prophecies distorted faith into fatal obedience.

On March 17, 2000, the congregation gathered inside their Kanungu church for what they believed was a sacred sendoff. Windows were barred, doors nailed shut, and the sanctuary packed wall to wall. Moments later, an explosion ignited the building, swallowing the followers in a flash of heat and smoke. The fire consumed the structure within minutes, leaving behind a mass of charred bodies collapsed across pews, aisles, and the altar they trusted.

Investigators soon discovered that this was no accident, nor a spontaneous act of mass suicide. It was a meticulously engineered kill event. Other compound sites revealed shallow graves, poisoned victims, and evidence of systematic elimination of members who questioned the leaders’ predictions of the world’s end. The sect’s prophecies had failed, and the leadership chose annihilation over exposure.

The aftermath exposed the machinery of manipulation false revelations, financial exploitation, psychological isolation, and a doctrine weaponized to maintain control. The church fire was merely the final act of a long descent into fanaticism, where spiritual yearning became a tool for mass murder.

It forces us to ask, when a community surrenders its judgement to a chosen few, who decides how and when faith ends?`,
  imageUrl: '/images/Fire_in_the_church.jpg',
  slug: 'fire-in-the-church',
  tags: ['horror', 'historical horror', 'psychological horror', 'true crime', 'cult', 'Uganda'],
  publishedDate: 'November 2025',
  month: '2025-11',
  readTime: '5 min read'
}
];
