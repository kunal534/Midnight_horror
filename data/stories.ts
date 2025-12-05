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
    publishedDate: '06 November 2025',
    month: '01-2025-11',
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
    publishedDate: ' 16 November 2025',
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
    publishedDate: '18 November 2025',
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
    publishedDate: '20 November 2025',
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
    publishedDate: '14 November 2025',
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
    publishedDate: '09 November 2025',
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
    publishedDate: '28 October 2025',
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
  publishedDate: ' 24 November 2025',
  month: '2025-11',
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
  publishedDate: '23 October 2025',
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
  publishedDate: ' 26 November 2025',
  month: '2025-11',
  readTime: '5 min read'
},
{
  id: '11',
  title: 'Preta: The Hungry Ghost',
  excerpt: 'A spirit trapped by neglect, insatiable desire, and unperformed rites, wandering between worlds until appeased…',
  fullContent: `
Preta, often called the hungry ghost, is a spirit condemned to endless hunger and longing, a fate described across Hindu and Buddhist texts. In the Garuda Purāṇa’s Preta Khanda and Buddhist Ullambana stories, pretas are depicted with distended bellies and narrow throats, forever craving what they cannot consume. They are born of neglect of funeral rites left incomplete, of offerings (piṇḍa) forgotten, or prayers unsaid—and remain caught between the living and the dead, unable to depart.

Tradition warns that such spirits wander the world at night, invisible yet restless, their cries faintly heard near shrines, cremation grounds, or ancestral homes. In South Asia, families perform Pitru Paksha and tarpana rituals to nourish and release them, while in East and Southeast Asia, the concept appears as gaki or egui, observed in local festivals and temple ceremonies where food offerings are laid to appease the hungry dead.  

Preta are more than folklore they are moral mirrors, showing the consequences of desire, greed, and neglect. Emaciated and insatiable, they remind the living that duties to the dead are not merely custom, but the bridge between worlds. Ignoring those duties risks the dead lingering, hungry and unsettled, haunting both dreams and waking hours.`,
  imageUrl: '/images/Preta_Hungry_Ghost.jpeg',
  slug: 'preta-hungry-ghost',
  tags: ['horror', 'folklore', 'psychological horror', 'spirit', 'Preta', 'ghost', 'dark story', 'ritual','PitruPaksha', 'PretaKhanda'],
  publishedDate: ' 28 November 2025',
  month: '2025-11',
  readTime: '6 min read'
}
,{
  id: '12',
  title: 'Vessel for the Sky',
  excerpt: 'In windswept mountains where the body returns to earth and the mind walks the Bardo alone, devotion becomes a dissection of self…',
  fullContent: `
Vessel for the Sky explores the stark ritual logic behind Tibetan sky burial and the Chöd practice of body offering traditions that strip human identity down to its most fragile boundaries.  

For centuries across the Tibetan plateau, communities carried the deceased to high rock ledges where vultures waited. This was jhator, the sky burial a final release in which the body was cut, opened, and offered to the birds. To outsiders it appears brutal, but within Tibetan Buddhist cosmology it is pragmatic compassion, the recognition that the flesh is only a temporary vessel, and its return to nature eases the soul's passage through the Bardo.

Parallel to this lay Chöd, a meditative ritual born from the teachings of Machig Labdrön. Practitioners visualized offering their own bodies not in self-destruction, but in a symbolic severing of ego. In the ritual imagination, the flesh became food, the bones instruments, and the mind a witness to its own unmaking. The purpose was singular to cut attachment, fear, and self-clinging at their roots.  

Together, these practices form a powerful confrontation with impermanence. Death is not an end but a transition, the body is not sacred but borrowed. Sky burial gives the vessel back to the sky, and Chöd gives the self back to emptiness.  

This story forces a question few dare to face: when the soul walks alone through the intermediate state, and the body lies open on the stone, what truly remains of who we were?`,
  imageUrl: '/images/tibet.jpeg',
  slug: 'vessel-for-the-sky',
  tags: ['horror', 'ritual', 'Buddhism', 'Tibetan', 'psychological horror', 'mortality', 'Chod', 'sky burial'],
  publishedDate: '02 December 2025',
  month: '2025-12',
  readTime: '6 min read'
},
{
  id: '13',
  title: 'In the Flames of Society',
  excerpt: 'I stood among the crowd along the flames, faces lit not by horror or shame. Men and women, sinner or not, all the same, following their acts without any shame…',
  fullContent: 'In the Flames of Society it seen from a scholar’s eye in regards to the horrifying ritual of sati, where a widow is burned alive on her husband’s pyre. The narrative does not center on gore but on the chilling human psychology behind collective complicity. The scholar observes the crowd men, women, elders, and children alike drawn together by tradition yet stripped of empathy. Faces glow with the firelight, but not with horror or grief. Instead, there is a strange detachment, a societal normalization of ritualized death.\n\nThe post examines the tension between individual morality and collective obedience, questioning how social structures and cultural narratives can obscure human cruelty. Flames crackle and rise, yet the true horror is not in the fire itself, but in the minds that watch it, justify it, and return to normalcy once the ritual ends.\n\nThis story forces the reader to confront difficult questions: Who bears responsibility—the victim, the tradition, or the society that silently condones it? How easily do humans rationalize cruelty in the name of culture? Through the lens of the scholar, the fire becomes a mirror reflecting the darkest corners of human conscience.',
  imageUrl:'/images/Sati.jpg',
  slug:'in-the-flames-of-society',
  tags: ["horror", "ritual", "psychological horror", "sati", "society", "historical horror", "dark poetry"],
  publishedDate: "05 December 2025",
  month: "2025-12",
  readTime: "7 min read"
}

];
