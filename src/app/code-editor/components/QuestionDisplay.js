import React from 'react';

const QuestionDisplay = ({ question }) => (
  <div className="question-display">
    <h3>Problem Statement</h3>
    <p>{question}</p>
  </div>
);

export default QuestionDisplay;
