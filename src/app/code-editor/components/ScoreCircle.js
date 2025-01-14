// src/components/ScoreCircle.js
import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ScoreCircle = ({ value }) => {
  // Determine the color based on the score value
  const color = value >= 60 ? '#4caf50' : '#f44336'; // Green for 60% and above, red for below 60%
  const circleClass = value >= 60 ? '' : 'red'; // Apply 'red' class if below 60%

  return (
    <div style={{ width: '150px', margin: '20px auto' }} className={`react-circular-progressbar ${circleClass}`}>
      <CircularProgressbar
        value={value}
        text={`${value}%`}
        styles={buildStyles({
          textSize: '16px',
          pathColor: color, // Dynamic color based on score
          textColor: color, // Same color as path for the score text
          trailColor: '#d6d6d6',
        })}
      />
      <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '16px', color: '#ffffff' }}> {/* Set text color to white */}
        Total Score
      </div>
    </div>
  );
};

export default ScoreCircle;
