import fs from 'fs';
import path from 'path';

export function getBackgroundImages() {
  const imageDirectory = path.join(process.cwd(), 'public/backgrounds');
  const imageFilenames = fs.readdirSync(imageDirectory);
  
  return imageFilenames
    .filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif'].includes(ext);
    })
    .map(filename => `/backgrounds/${filename}`);
}
