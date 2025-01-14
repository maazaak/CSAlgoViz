// src/components/Report.js
import React from 'react';
import TaskDetails from './TaskDetails';
import TestCaseList from './TestCaseList';
import ScoreCircle from './ScoreCircle';

const Report = ({ reportData }) => {
  if (!reportData) return <div>No report data available.</div>;

  const { question, correctness, performance, timeSpent, results, edgeCaseResults } = reportData;

  // Convert performance rating to a numerical score
  const performanceScore = performance === "Good" ? 100 : performance === "Average" ? 70 : 40;

  // Calculate total score
  const totalScore = Math.round((correctness + performanceScore) / 2);

  return (
    <div className="report-container">
      <h2>Task Details</h2>
      <TaskDetails question={question} correctness={correctness} performance={performance} timeSpent={timeSpent} />
      <ScoreCircle value={totalScore} /> {/* Display the total score */}
      <h3>Test Cases</h3>
      <TestCaseList results={results} />
      <h3>Edge Cases</h3>
      <TestCaseList results={edgeCaseResults} /> {/* Display edge case results */}
    </div>
  );
};

export default Report;
