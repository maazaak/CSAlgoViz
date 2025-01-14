"use client";

import React, { useState,useEffect } from "react";
import CodeEditor from "@/app/code-editor/components/CodeEditor";
import QuestionDisplay from "@/app/code-editor/components/QuestionDisplay";
import Timer from "@/app/code-editor/components/Timer";
import Report from "@/app/code-editor/components/Report";
import axios from "axios"; // Axios remains the same
import questions from "@/app/code-editor/questions"; // Update the path for questions
import "@/app/code-editor/styles/styles.css"; // Update the path for styles


const calculatePerformance = (results, edgeCaseResults) => {
  const executionThreshold = 100; // Example threshold in milliseconds
  let performanceScore = 100; // Start with a full score
  let regularCount = 0;
  let edgeCount = 0;

  // Evaluate regular test cases
  results.forEach((result) => {
    if (result.executionTime > executionThreshold) {
      performanceScore -= 10; // Deduct points for exceeding time threshold
    } else {
      regularCount++;
    }
  });

  // Evaluate edge cases
  edgeCaseResults.forEach((edgeCase) => {
    if (!edgeCase.passed || edgeCase.executionTime > executionThreshold) {
      performanceScore -= 20; // Deduct more points for failing edge cases or taking too long
    } else {
      edgeCount++;
    }
  });

  if (performanceScore >= 80) {
    return "Good"; // Performance is good
  } else if (performanceScore >= 50) {
    return "Average"; // Performance is average
  } else {
    return "Poor"; // Performance is poor
  }
};

const App = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null); // Initially no question
  const [files, setFiles] = useState([
    { name: 'solution.js', content: '// Write your code here\n' } // Initial template code
  ]);
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const [showReport, setShowReport] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [timerKey, setTimerKey] = useState(null); // Timer key based on question ID
  const [dropdownVisible, setDropdownVisible] = useState(false); // State for dropdown visibility
  const [difficulty, setDifficulty] = useState('medium'); // Difficulty level
  const [username, setUsername] = useState(null);

  

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // The content of the currently selected file
  const selectedFile = files[selectedFileIndex];

  const updateFileContent = (newContent) => {
    const updatedFiles = files.map((file, index) =>
      index === selectedFileIndex ? { ...file, content: newContent } : file
    );
    setFiles(updatedFiles);
  };
  
  
  const processTestCases = (testCases) => {
  return testCases.map(testCase => {
    if (Array.isArray(testCase.input) && testCase.input.length > 1 && !Array.isArray(testCase.input[0])) {
      // Wrap the input in an array if it's not already wrapped
      testCase.input = [testCase.input];
    }
    return testCase;
  });
};

  // Fetch question from OpenAI API
  const fetchQuestion = async () => {
    try {
      const formattedDifficulty = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  
      // Fetch question from your custom model
      const modelRes = await axios.post(
        'https://d9bd-34-169-104-202.ngrok-free.app/generate-question',
        { difficulty: formattedDifficulty }
      );
  
      if (!modelRes.data || !modelRes.data.question) {
        throw new Error("Failed to fetch question from the custom model.");
      }
  
      // Filter out the unwanted introductory text
      const questionText = modelRes.data.question;
      const lines = questionText.split('\n');
      const startIndex = lines.findIndex(line => line.startsWith("Difficulty Level:"));
      const filteredQuestion = lines.slice(startIndex).join('\n');
  
      // Create question object (you'll need to add other properties)
      const question = { 
        description: filteredQuestion, 
        // ... add title, testCases, edgeCases, etc. based on your model's response
      };
  
      // Update state variables
      setSelectedQuestion(question); 
      setShowReport(false);
      setTimerKey(Date.now());
  
      setFiles([
        { name: 'solution.js', content: '// Write your code here\n' }
      ]);
      setSelectedFileIndex(0);
  
    } catch (error) {
      console.error('Error fetching question:', error);
      alert('Failed to fetch question from your model. Please try again.');
    }
  };
  

  // Save the new question to the backend
  const saveQuestionToBackend = async (newQuestion) => {
    try {
      await axios.post('http://localhost:5000/save-question', newQuestion);
      console.log('Question saved to MongoDB database');
    } catch (error) {
      console.error('Error saving question to database:', error);
      alert('Failed to save question to database.');
    }
  };

  const runCode = async () => {
    try {
      const code = selectedFile.content;
      let consoleOutput = "";
      const originalConsoleLog = console.log;
  
      // Capture console.log output
      console.log = (message, ...optionalParams) => {
        const fullMessage = [message, ...optionalParams].join(" ");
        consoleOutput += fullMessage + "\n";
        originalConsoleLog(fullMessage);
      };
  
      // Create function from user-provided code
      const functionToExecute = new Function(
        "...args",
        code + "\nreturn solution(...args);"
      );
  
      const testCases = selectedQuestion.testCases;
      const edgeCases = selectedQuestion.edgeCases;
  
      let passedCount = 0;
      let results = [];
      let edgeCaseResults = [];
      let startTime = Date.now();
  
      const parseInput = (input) => {
        if (Array.isArray(input)) {
          return input;
        } else if (typeof input === "string") {
          return [input];
        } else {
          return [input];
        }
      };
  
      const arraysEqual = (arr1, arr2) => {
        if (arr1.length !== arr2.length) return false;
        for (let i = 0; i < arr1.length; i++) {
          if (Array.isArray(arr1[i]) && Array.isArray(arr2[i])) {
            if (!arraysEqual(arr1[i], arr2[i])) return false;
          } else if (arr1[i] !== arr2[i]) {
            return false;
          }
        }
        return true;
      };
  
      const executeTestCase = (testCase) => {
        try {
          const testStartTime = window.performance.now();
          const parsedInput = parseInput(testCase.input);
  
          const result = functionToExecute(...parsedInput);
  
          const testEndTime = window.performance.now();
          const executionTime = testEndTime - testStartTime;
  
          const passed = Array.isArray(result) && Array.isArray(testCase.expectedOutput)
            ? arraysEqual(result, testCase.expectedOutput)
            : result === testCase.expectedOutput;
  
          return {
            input: testCase.input,
            expected: testCase.expectedOutput,
            result,
            passed,
            executionTime,
          };
        } catch (err) {
          return {
            input: testCase.input,
            expected: testCase.expectedOutput,
            result: `Error: ${err.message}`,
            passed: false,
            executionTime: 0,
          };
        }
      };
  
      for (const testCase of testCases) {
        const result = executeTestCase(testCase);
        if (result.passed) {
          passedCount++;
        }
        results.push(result);
      }
  
      for (const edgeCase of edgeCases) {
        const result = executeTestCase(edgeCase);
        edgeCaseResults.push(result);
      }
  
      let endTime = Date.now();
      let timeSpent = (endTime - startTime) / 1000;
  
      const correctness = (passedCount / testCases.length) * 100;
      const performance = calculatePerformance(results, edgeCaseResults);
  
      setReportData({
        question: selectedQuestion,
        results,
        edgeCaseResults,
        correctness,
        performance,
        timeSpent,
      });
  
      setShowReport(true);
  
      console.log = originalConsoleLog;
  
      // Save the user's score to the database
      const score = Math.round((correctness + performance === "Good" ? 20 : 10));
      await saveUserScore(selectedQuestion.id, score*10);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };
  
  // Function to save the user's score to the database
  const saveUserScore = async (questionId, score) => {
    try {

      if (!username) {
        console.error("Username not found. Ensure the user is authenticated.");
        alert("Failed to save score. Please ensure you are logged in.");
        return;
      }
      const response = await axios.put("http://localhost:5000/user/update-stats", {
        username,
        questionId,
        score,
      });
      console.log("User stats updated:", response.data);
    } catch (error) {
      console.error("Error saving user score:", error);
      alert("Failed to save user score. Please try again.");
    }
  };
  







  // When a new question is chosen, reset the editor and hide the report
  const chooseQuestion = (question) => {
    setSelectedQuestion(question);
    setShowReport(false); // Hide the report when a new question is chosen
    setTimerKey(question.id); // Update the timer key to reset the timer

    // Reset the code editor with initial template code or empty content
    setFiles([
      { name: 'solution.js', content: '// Write your code here\n' } // Set this to '' if you want an empty editor
    ]);
    setSelectedFileIndex(0); // Reset file selection to the first file
    setDropdownVisible(false); // Hide dropdown
  };

  return (
    <div className="main-container">
      <header className="header">
        <div className="header-logo">CSAlgoViz</div>
        <div className="header-timer">
          <Timer key={timerKey} startMinutes={119} /> {/* Use timerKey as key */}
        </div>
        <div className="dropdown-container">
          <button 
            className="submit-button" 
            onClick={() => setDropdownVisible(!dropdownVisible)}
          >
            Choose Another Question
          </button>
          {dropdownVisible && (
            <ul className="dropdown-menu">
              {questions.map((question) => (
                <li 
                  key={question.id}
                  onClick={() => chooseQuestion(question)}
                >
                  {question.title} - {question.difficulty}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="difficulty-selector">
          <label>Choose Difficulty: </label>
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <button 
          className="submit-button" 
          onClick={fetchQuestion}
        >
          Fetch New Question
        </button>
      </header>
      <div className="content-wrapper">
        {showReport ? (
          <Report reportData={reportData} />
        ) : (
          <>
            <div className="left-panel">
              <div className="task-header">
                <span>{selectedQuestion?.id}</span>
                <h3>{selectedQuestion?.title}</h3>
              </div>
              <QuestionDisplay question={selectedQuestion?.description} />
            </div>
            <div className="right-panel">
              <div className="file-explorer">
                <div className="file-header">
                  Files
                </div>
                <ul className="file-list">
                  {files.map((file, index) => (
                    <li
                      key={index}
                      className={index === selectedFileIndex ? 'selected-file' : ''}
                      onClick={() => setSelectedFileIndex(index)}
                    >
                      {file.name}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="code-editor-container">
                <CodeEditor code={selectedFile.content} setCode={updateFileContent} />
              </div>
              <div className="run-code-section">
                <button className="run-code-button" onClick={runCode}>
                  Run code
                </button>
                <div className="language-selector">Language Version: JavaScript ES6</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
