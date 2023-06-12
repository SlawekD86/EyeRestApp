import React from 'react';

const StatusImage = ({ status }) => {
  if (status === 'work') {
    return <img src="./images/work.png" alt="Work" />;
  }
  if (status === 'rest') {
    return <img src="./images/rest.png" alt="Rest" />;
  }
  return null;
};

export default StatusImage;
