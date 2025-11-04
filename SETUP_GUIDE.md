# Setup Guide for Midnight Horror Tales

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Music Repository

#### Option A: Using GitHub Repository

1. Create a new GitHub repository (e.g., `midnight-horror-music`)
2. Upload your music files to the repository
3. Edit `config/music.config.ts`:
   ```typescript
   githubRepo: {
     username: 'your-github-username',
     repo: 'midnight-horror-music',
     branch: 'main', // or 'master'
     basePath: 'music', // folder where music files are stored
   }
   ```

4. Update the `musicTracks` array with your actual tracks:
   ```typescript
   export const musicTracks: MusicTrack[] = [
     {
       id: '1',
       title: 'Your Track Title',
       artist: 'Artist Name',
       filename: 'track-file.mp3', // must match the file in your repo
       cover: 'cover.jpg', // optional
     },
     // ... more tracks
   ];
   ```

#### Option B: Using Raw File URLs

If you prefer to host music elsewhere, you can modify the `getTrackUrl` function in `MusicPlayer.tsx` to use direct URLs instead of GitHub.

### 3. Customize Affiliate Links

Edit `components/AffiliateArea/AffiliateArea.tsx` or pass custom links:

```typescript
<AffiliateArea 
  links={[
    {
      id: '1',
      title: 'Product Name',
      description: 'Product description',
      url: 'https://your-affiliate-link.com',
      image: 'image-url.jpg', // optional
      category: 'Category Name', // optional
    }
  ]}
/>
```

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 5. Build for Production

```bash
npm run build
npm start
```

## GitHub Music Repository Structure

Your GitHub repository should look like this:

```
midnight-horror-music/
├── music/
│   ├── track1.mp3
│   ├── track2.mp3
│   ├── track3.mp3
│   └── covers/
│       ├── cover1.jpg
│       └── cover2.jpg
```

The file paths in `musicTracks` should match the actual file names in your repository.

## Deployment

### Netlify

1. Push your code to GitHub
2. Go to [Netlify](https://netlify.com)
3. Connect your GitHub repository
4. Netlify will auto-detect Next.js and use the `netlify.toml` configuration
5. Deploy!

### Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your GitHub repository
4. Vercel will auto-detect Next.js
5. Deploy!

Both platforms support automatic deployments on git push.

## Customization

### Adding New Features

The project is modular. To add new features:

1. Create a new component in `components/YourFeature/`
2. Add the component to `app/page.tsx`
3. Style with CSS in the component folder

### Changing Colors/Theming

Edit CSS variables in `app/globals.css`:

```css
:root {
  --bg-primary: #0a0a0a;
  --bg-secondary: #1a1a1a;
  --accent: #8b0000;
  /* ... modify these to change the theme */
}
```

### Music Player Position

The music player is positioned fixed on the right side. To change position, edit `components/MusicPlayer/MusicPlayer.css`:

```css
.music-player {
  position: fixed;
  right: 20px; /* change to left: 20px for left side */
  top: 20px;
}
```

## Troubleshooting

### Music not loading?

1. Check that your GitHub repository is public (or use GitHub tokens for private repos)
2. Verify the file paths in `musicTracks` match your repository structure
3. Check browser console for CORS errors
4. Ensure audio files are in supported formats (MP3, OGG, etc.)

### Build errors?

1. Make sure all dependencies are installed: `npm install`
2. Check TypeScript errors: `npm run lint`
3. Verify all imports are correct

### Styling issues?

1. Clear browser cache
2. Check that CSS files are imported correctly
3. Verify CSS variables are defined in `globals.css`

## Support

For issues or questions, check the main README.md file or create an issue in your repository.

