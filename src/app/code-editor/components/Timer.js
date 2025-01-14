// src/components/Timer.js
import React, { useEffect, useState } from 'react';

const Timer = ({ startMinutes }) => {
  const [time, setTime] = useState(startMinutes * 60);

  useEffect(() => {
    setTime(startMinutes * 60); // Reset the timer when startMinutes or key changes
  }, [startMinutes]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return <div>{formatTime(time)}</div>;
};

export default Timer;
