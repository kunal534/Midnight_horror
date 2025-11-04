// Configuration for music repository
export const musicConfig = {
  // GitHub repository URL for music files
  // Format: https://raw.githubusercontent.com/{username}/{repo}/{branch}/{path}
  githubRepo: {
    username: 'your-username', // Update with your GitHub username
    repo: 'midnight-horror-music', // Update with your music repo name
    branch: 'main', // Update with your branch name
    basePath: 'music', // Path to music files in the repo
  },
  // Full base URL for music files
  getBaseUrl: () => {
    const { username, repo, branch, basePath } = musicConfig.githubRepo;
    return `https://raw.githubusercontent.com/${username}/${repo}/${branch}/${basePath}`;
  },
};

// Music track interface
export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  filename: string;
  duration?: number;
  cover?: string;
}

// Example music tracks - replace with your actual tracks
export const musicTracks: MusicTrack[] = [
  {
    id: '1',
    title: 'Midnight Ambience',
    artist: 'Midnight Horror',
    filename: 'midnight-ambience.mp3',
    cover: 'cover1.jpg',
  },
  {
    id: '2',
    title: 'Dark Forest',
    artist: 'Midnight Horror',
    filename: 'dark-forest.mp3',
    cover: 'cover2.jpg',
  },
  {
    id: '3',
    title: 'Haunted Memories',
    artist: 'Midnight Horror',
    filename: 'haunted-memories.mp3',
    cover: 'cover3.jpg',
  },
];

