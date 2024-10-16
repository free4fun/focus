"use client";

import React, { useState, useEffect } from 'react';
import styles from './BackgroundChanger.module.css';

interface BackgroundChangerProps {
  backgrounds: string[];
  interval?: number;
}

const BackgroundChanger: React.FC<BackgroundChangerProps> = ({ backgrounds, interval = 30000 }) => {
  const [currentBackground, setCurrentBackground] = useState(0);

  useEffect(() => {
    if (backgrounds.length === 0) return;

    const changeBackground = () => {
      setCurrentBackground((prev) => (prev + 1) % backgrounds.length);
    };

    const timer = setInterval(changeBackground, interval);

    return () => clearInterval(timer);
  }, [backgrounds, interval]);

  if (backgrounds.length === 0) return null;

  return (
    <div
      className={styles.background}
      style={{
        backgroundImage: `url(${backgrounds[currentBackground]})`,
      }}
    />
  );
};

export default BackgroundChanger;
