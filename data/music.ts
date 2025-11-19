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
    id:'3',
    title:'Whispers in the Metal Abyss',
    artist:'Midnight',
    file:'https://pub-702482bca0fa43a2969695fac4f3a877.r2.dev/Whispers%20in%20the%20Metal%20Abyss.mp3',
    duration:'2:24', 
  }
];
