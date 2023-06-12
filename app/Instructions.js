import React from 'react';

const Instructions = ({ status }) => {
  if (status === 'off') {
    return (
      <div>
        <p>According to optometrists, in order to protect your eyes, you should follow the 20/20/20 rule. It means you should rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
        <p>This app will help you track your time and inform you when it's time to rest.</p>
      </div>
    );
  }
  return null;
};

export default Instructions;
