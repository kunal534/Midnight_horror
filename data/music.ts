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
    title: 'Ethereal Rites of Shadows Made',
    artist: 'music',
    file: '/music/Ethereal_Rites_of_Shadows_Made.mp3',
    duration: '3:23',
  }
];
