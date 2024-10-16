"use client";

import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipForward } from 'lucide-react';
import useAudioPlayer from '../../hooks/useAudioPlayer';
import Select from './Select';

const AudioPlayer: React.FC = () => {
  const {
    isPlaying,
    togglePlayPause,
    changeCategory,
    audioRef,
    categories,
    selectedCategory,
    currentTrack,
    quote
  } = useAudioPlayer();

  const [userInteracted, setUserInteracted] = useState(false);

  const handlePlayPauseClick = () => {
    if (!userInteracted) {
      setUserInteracted(true);
    }
    togglePlayPause();
  };

  const handleNextClick = () => {
    if (!userInteracted) {
      setUserInteracted(true);
    }
    changeCategory(selectedCategory);
  };

  const handleCategoryChange = (value: string) => {
    if (!userInteracted) {
      setUserInteracted(true);
    }
    changeCategory(value);
  };

  useEffect(() => {
    if (userInteracted && audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(error => console.error("Error playing audio:", error));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, userInteracted, currentTrack]);

  return (
    <div className="text-center bg-blur p-4 sm:p-6 rounded-lg audio-controls">
    <Select
      options={categories}
      onValueChange={handleCategoryChange}
      placeholder="Selecciona una categoría"
      value={selectedCategory}
    />

    <audio ref={audioRef} className="hidden" />

    <div className="flex justify-center space-x-4 audio-buttons">
      <button
        onClick={handlePlayPauseClick}
        className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-bold p-2 sm:p-3 rounded-full transition duration-300"
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>
      <button
        onClick={handleNextClick}
        className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-bold p-2 sm:p-3 rounded-full transition duration-300"
        aria-label="Siguiente"
      >
        <SkipForward size={20} />
      </button>
    </div>
  </div>
  );
};

export default AudioPlayer;
