import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const quotesFile = path.join(process.cwd(), 'quotes.txt');
    const quotes = fs.readFileSync(quotesFile, 'utf-8').split('\n').filter(Boolean);
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    
    const [text, author] = randomQuote.split(';').map(s => s.trim());
    
    res.status(200).json({ quote: text, author: author });
  } catch (error) {
    console.error('Error reading quotes file:', error);
    res.status(500).json({ error: 'Error al obtener la cita' });
  }
}
