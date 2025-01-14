// src/components/TaskDetails.js
import React from 'react';

const TaskDetails = ({ question, correctness, performance, timeSpent }) => {
  return (
    <div className="task-details">
      <h3>{question.title}</h3>
      <p>{question.description}</p>
      <div className="task-score">
        <div><strong>Correctness:</strong> {correctness}%</div>
        <div><strong>Performance:</strong> {performance}</div> {/* Display performance */}
        <div><strong>Time Spent:</strong> {timeSpent} seconds</div>
      </div>
    </div>
  );
};

export default TaskDetails;
