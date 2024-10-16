import { useState, useEffect, useRef } from 'react';

const useAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [tracks, setTracks] = useState<Record<string, string[]>>({});
  const [selectedCategory, setSelectedCategory] = useState('focus');
  const [quote, setQuote] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await fetch('/api/audioTracks');
        const data = await response.json();
        setTracks(data);
        const categoryList = Object.keys(data);
        setCategories(categoryList);

        if (data['focus'] && data['focus'].length > 0) {
          const randomIndex = Math.floor(Math.random() * data['focus'].length);
          const selectedTrack = data['focus'][randomIndex];
          setCurrentTrack(selectedTrack);
          
          if (audioRef.current) {
            audioRef.current.src = selectedTrack;
          }
        }
      } catch (error) {
        console.error('Error fetching tracks:', error);
      }
    };

    const fetchQuote = async () => {
      try {
        const response = await fetch('/api/quote');
        const data = await response.json();
        setQuote(data.quote);
      } catch (error) {
        console.error('Error fetching quote:', error);
      }
    };

    fetchTracks();
    fetchQuote();
  }, []);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => console.error('Error al reproducir:', error));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const changeCategory = (category: string) => {
    setSelectedCategory(category);
    if (tracks[category] && tracks[category].length > 0) {
      const randomIndex = Math.floor(Math.random() * tracks[category].length);
      const newTrack = tracks[category][randomIndex];
      setCurrentTrack(newTrack);
      if (audioRef.current) {
        audioRef.current.src = newTrack;
        if (isPlaying) {
          audioRef.current.play().catch(error => console.error('Error al reproducir:', error));
        }
      }
    }
  };

  return { isPlaying, currentTrack, togglePlayPause, changeCategory, audioRef, categories, selectedCategory, quote };
};

export default useAudioPlayer;
