# Midnight Horror Tales

A modular website for Midnight Horror Tales featuring an affiliate area and a prominent music player with search functionality.

## Features

- **Modular Architecture**: Easy to extend with new features
- **Music Player**: Prominent, searchable music player that loads tracks from GitHub
- **Affiliate Area**: Dedicated section for affiliate links and recommendations
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Theme**: Horror-themed dark aesthetic

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure music repository:
   - Edit `config/music.config.ts`
   - Update the GitHub repository details (username, repo name, branch)
   - Update the `musicTracks` array with your actual music tracks

3. Run development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Music Configuration

To set up your music:

1. Create a GitHub repository for your music files
2. Upload your music files to the repository
3. Update `config/music.config.ts` with your repository details:
   ```typescript
   githubRepo: {
     username: 'your-username',
     repo: 'your-music-repo',
     branch: 'main',
     basePath: 'music',
   }
   ```
4. Update the `musicTracks` array with your track information

## Deployment

### Netlify

1. Build the project:
```bash
npm run build
```

2. Deploy to Netlify:
   - Connect your GitHub repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `.next`

Or use Netlify CLI:
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

Or connect your GitHub repository directly on [Vercel](https://vercel.com)

## Customization

### Adding New Components

1. Create a new folder in `components/`
2. Add your component files (e.g., `ComponentName.tsx` and `ComponentName.css`)
3. Import and use in `app/page.tsx` or other pages

### Modifying Affiliate Links

Edit `components/AffiliateArea/AffiliateArea.tsx` or pass custom links as props.

### Styling

- Global styles: `app/globals.css`
- Component styles: Individual CSS files in each component folder
- CSS Variables: Modify `:root` in `globals.css` for theme colors

## Project Structure

```
midnight_page/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── page.css
├── components/
│   ├── MusicPlayer/
│   │   ├── MusicPlayer.tsx
│   │   └── MusicPlayer.css
│   └── AffiliateArea/
│       ├── AffiliateArea.tsx
│       └── AffiliateArea.css
├── config/
│   └── music.config.ts
├── package.json
├── tsconfig.json
└── next.config.js
```

## errors
```
   1. It working for the laptop not for tablets and phones
```



## Current things to do:
```
   1. Add support for the mobile and tablet
   2. See for affliliates 
```