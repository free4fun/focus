import fs from 'fs';
import path from 'path';

export const getAudioTracks = async (): Promise<Record<string, string[]>> => {
  const audioDirectory = path.join(process.cwd(), 'public/music');
  const categories = fs.readdirSync(audioDirectory);

  const tracks: Record<string, string[]> = {};

  categories.forEach(category => {
    const categoryPath = path.join(audioDirectory, category);
    if (fs.statSync(categoryPath).isDirectory()) {
      const files = fs.readdirSync(categoryPath);
      tracks[category] = files
        .filter(file => file.endsWith('.mp3'))
        .map(file => `/music/${category}/${file}`);
    }
  });

  return tracks;
};
