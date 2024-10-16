import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const audioDirectory = path.join(process.cwd(), 'public/music');
    const categories = fs.readdirSync(audioDirectory);

    const tracks: Record<string, string[]> = {};

    categories.forEach((category) => {
      const categoryPath = path.join(audioDirectory, category);
      if (fs.statSync(categoryPath).isDirectory()) {
        tracks[category.toLowerCase()] = fs.readdirSync(categoryPath)
          .filter(file => file.endsWith('.mp3'))
          .map(file => `/music/${category}/${file}`);
      }
    });

    console.log('API response:', tracks);  // Para depuración
    res.status(200).json(tracks);
  } catch (error) {
    console.error('Error in API:', error);
    res.status(500).json({ error: 'Error al leer los archivos de audio' });
  }
}
