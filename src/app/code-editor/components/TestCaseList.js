// src/components/TestCaseList.js
import React from 'react';

const TestCaseList = ({ results }) => {
  return (
    <div className="test-case-list">
      {results.map((result, index) => (
        <div key={index} className={`test-case ${result.passed ? 'pass' : 'fail'}`}>
          <div><strong>Input:</strong> {JSON.stringify(result.input)}</div>
          <div><strong>Expected Output:</strong> {JSON.stringify(result.expected)}</div>
          <div><strong>Actual Output:</strong> {JSON.stringify(result.result)}</div>
          <div><strong>Execution Time:</strong> {result.executionTime.toFixed(2)} ms</div> {/* Show execution time */}
          <div><strong>Status:</strong> {result.passed ? 'Passed' : 'Failed'}</div>
        </div>
      ))}
    </div>
  );
};

export default TestCaseList;
