import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import Instructions from './Instructions';
import StatusImage from './StatusImage';
import Timer from './Timer';
import './style.css';

const App = () => {
  const [time, setTime] = useState(5);
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState('off');

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    let timeGo;

    if (isRunning) {
      timeGo = setInterval(() => {
        setTime((prevValue) => {
          if (prevValue <= 0) {
            setIsRunning(false);
            setStatus('rest');
            return 0;
          }
          return prevValue - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timeGo);
  }, [isRunning]);

  useEffect(() => {
    let restTimer;
    if (status === 'rest') {
      setTime(20);
      restTimer = setInterval(() => {
        setTime((prevValue) => {
          if (prevValue <= 0) {
            setStatus('work');
            setIsRunning(true);
            return 1200;
          }
          return prevValue - 1;
        });
      }, 1000);
    }
    return () => clearInterval(restTimer);
  }, [status]);

  const handleStart = () => {
    setIsRunning(true);
    setStatus('work');
  };

  const handleStop = () => {
    setIsRunning(false);
    setStatus('off');
    setTime(1200);
  };

  const closeApp = () => {
    window.close();
  };

  const playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  };

  useEffect(() => {
    if ((status === 'rest' || status === 'work') && time === 0) {
      playBell();
    }
  }, [status, time]);

  return (
    <div>
      <h1>Protect your eyes</h1>
      <Instructions status={status} />
      <StatusImage status={status} />
      {status !== 'off' && <Timer time={time} formatTime={formatTime} />}
      {status === 'off' && <button className="btn" onClick={handleStart}>Start</button>}
      {status !== 'off' && <button className="btn" onClick={handleStop}>Stop</button>}
      <button className="btn btn-close" onClick={closeApp}>X</button>
    </div>
  );
};

render(<App />, document.querySelector('#app'));
