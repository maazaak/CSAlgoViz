import React from 'react';

const RunButton = ({ onRun }) => (
  <div className="run-button-container">
    <button onClick={onRun}>Run Code</button>
  </div>
);

export default RunButton;
