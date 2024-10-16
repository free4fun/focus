let quotes: { text: string; author: string }[] = [];

export const loadQuotes = async () => {
  try {
    const response = await fetch('/api/quote');
    const data = await response.json();
    quotes = [{ text: data.quote, author: data.author }];
  } catch (error) {
    console.error('Error loading quotes:', error);
    quotes = [];
  }
};

export const getRandomQuote = () => {
  if (quotes.length === 0) {
    return { text: 'No hay citas disponibles', author: 'Sistema' };
  }
  return quotes[Math.floor(Math.random() * quotes.length)];
};
