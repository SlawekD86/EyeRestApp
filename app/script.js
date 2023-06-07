import React, { useEffect } from 'react';
import { render } from 'react-dom';
import { useState } from 'react';


const App = () => {
  const [time, setTime ] = useState(5)
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
  }

  const handleStop = () => {
    setIsRunning(false);
    setStatus('off')
    setTime(1200)
  };

  const closeApp = () => {
    window.close();
  }

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
      {status === 'off' && 
        <div>
          <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
          <p>This app will help you track your time and inform you when it's time to rest.</p>
        </div>
      }
      { status === 'work' && <img src="./images/work.png" /> }
      { status === 'rest' && <img src="./images/rest.png" />}
      { status !== 'off' && <div className="timer">{formatTime(time)}</div>}
      { status === 'off' && <button className="btn" onClick={handleStart}>Start</button>}
      { status !== 'off' && <button className="btn" onClick={handleStop}>Stop</button> }
      <button className="btn btn-close" onClick={closeApp}>X</button>
    </div>
  )
};

render(<App />, document.querySelector('#app'));
