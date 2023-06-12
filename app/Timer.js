import React, { useEffect } from 'react';

const Timer = ({ time, formatTime }) => {
  const playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  };

  useEffect(() => {
    if (time === 0) {
      playBell();
    }
  }, [time]);

  return <div className="timer">{formatTime(time)}</div>;
};

export default Timer;
