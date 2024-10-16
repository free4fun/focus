"use client";

import React, { useState, useEffect } from 'react';

const Timer: React.FC = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return [hours, minutes, remainingSeconds]
      .map((v) => v.toString().padStart(2, '0'))
      .join(':');
  };

  return (
    <div className="text-center bg-blur p-4 sm:p-6 rounded-lg">
    <div className="text-4xl sm:text-5xl font-bold mb-2 sm:mb-4 text-shadow">{formatTime(time)}</div>
  </div>
  );
};

export default Timer;
