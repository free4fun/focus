"use client";

import React, { useState, useEffect } from 'react';
import { loadQuotes, getRandomQuote } from '../../utils/quoteUtils';

const QuoteDisplay: React.FC = () => {
  const [quote, setQuote] = useState({ text: '', author: '' });

  const fetchQuote = async () => {
    await loadQuotes();
    const newQuote = getRandomQuote();
    setQuote(newQuote);
  };

  useEffect(() => {
    fetchQuote();
    const interval = setInterval(fetchQuote, 60000); // New quote every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center bg-blur p-4 sm:p-6 rounded-lg">
    <p className="italic text-shadow text-sm sm:text-base">"{quote.text}"</p>
    <p className="italic text-shadow text-sm sm:text-base text-right">"{quote.author}"</p>
  </div>
  );
};

export default QuoteDisplay;
