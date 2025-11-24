export interface Track {
  id: string;
  title: string;
  artist?: string;
  file: string;
  duration?: string;
}

export const musicPlaylist: Track[] = [
  {
    id: '1',
    title: 'Dread Whispers',
    artist: 'Midnight',
    file: 'https://pub-702482bca0fa43a2969695fac4f3a877.r2.dev/Dread%20Whispers.mp3',
    duration: '2:04',
  },
  {
    id:'2',
    title: 'Whimsical Haunt',
    artist: 'Midnight',
    file: 'https://pub-702482bca0fa43a2969695fac4f3a877.r2.dev/Whimsical%20Haunt.mp3',
    duration: '1:30',
  },
  {
    id:'3',
    title:'Ethereal Shadowscape',
    artist:'Midnight',
    file:'https://pub-702482bca0fa43a2969695fac4f3a877.r2.dev/Ethereal%20Shadowscape.mp3',
    duration:'2:00',
  },
  {
    id:'4',
    title:'Whispers in the Metal Abyss',
    artist:'Midnight',
    file:'https://pub-702482bca0fa43a2969695fac4f3a877.r2.dev/Whispers%20in%20the%20Metal%20Abyss.mp3',
    duration:'2:24', 
  },
  {
    id:'5',
    title:'Pulse Beneath the Floor',
    artist:'Midnight',
    file:'https://pub-702482bca0fa43a2969695fac4f3a877.r2.dev/Pulse%20Beneath%20the%20Floor.mp3',
    duration:'2:13',
  },
  {
    id:'6',
    title:'Frozen Floor',
    artist:'Midnight',
    file:'https://pub-702482bca0fa43a2969695fac4f3a877.r2.dev/Frozen%20Floor.mp3',
    duration:'1:35',
  },
  {
    id:'7',
    title:'Twisted Roots',
    artist:'Midnight',
    file:'https://pub-702482bca0fa43a2969695fac4f3a877.r2.dev/Twisted%20Roots.mp3',
    duration:'1:32',
  },
  {
    id:'8',
    title:'Ghosts of Your Touch',
    artist:'Midnight',
    file:'https://pub-702482bca0fa43a2969695fac4f3a877.r2.dev/Ghosts%20of%20Your%20Touch.mp3',
    duration:'2:11'
  }
];
