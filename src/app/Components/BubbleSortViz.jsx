import React, { useEffect, useRef } from "react";
import './BubbleSortViz.css';

const BubbleSortViz = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // HTML structure as a string
    const htmlContent = `
      <h1>Bubble Sort</h1>
      <div id="iterationCounter">Iteration: 0</div>
      <div id="visualization"></div>
      <input type="number" id="newElement" placeholder="Enter new element">
      <div class="button-container">
          <button class="button" id="addElement">Add Element</button>
          <button class="button" id="removeElement">Remove Last Element</button>
          <button class="button" id="startButton">Start</button>
          <button class="button" id="pauseResumeButton">Pause</button>
          <button class="button" id="backButton" style="display: none;">Back</button> <!-- Initially hidden -->
          <button class="button" id="forwardButton" style="display: none;">Forward</button> <!-- Initially hidden -->
          <button class="button" id="restartButton" style="display: none;">Restart</button> <!-- Initially hidden -->
      </div>
    `;

    // Inject HTML content into the component
    containerRef.current.innerHTML = htmlContent;

    // Add your existing JavaScript code here
    let iteration = 0;
    let isSortedComplete = false;
    let i = 0;
    let data = [5, 3, 8, 10, 4, 2];
    let intervalId;
    let isPaused = false;
    let states = [];
    let currentStateIndex = -1;

    const visualization = document.getElementById('visualization');
    const iterationCounter = document.getElementById('iterationCounter');
    const newElementInput = document.getElementById('newElement');
    const addElementButton = document.getElementById('addElement');
    const removeElementButton = document.getElementById('removeElement');
    const startButton = document.getElementById('startButton');
    const pauseResumeButton = document.getElementById('pauseResumeButton');
    const restartButton = document.getElementById('restartButton');
    const backButton = document.getElementById('backButton');
    const forwardButton = document.getElementById('forwardButton');

    const render = () => {
      visualization.innerHTML = '';
      data.forEach((value, index) => {
        const circle = document.createElement("div");
        circle.className = "circle";
        circle.textContent = value;
        if (index < i) {
          circle.classList.add('lightgreen');
        }
        visualization.appendChild(circle);
      });
      iterationCounter.textContent = `Iteration: ${iteration}`;
    };

    const swapElements = (idx1, idx2) => {
      if (data[idx1] > data[idx2]) {
        const temp = data[idx1];
        data[idx1] = data[idx2];
        data[idx2] = temp;
      }
    };

    const isSorted = () => {
      for (let j = 0; j < data.length - 1; j++) {
        if (data[j] > data[j + 1]) {
          return false;
        }
      }
      return true;
    };

    const handleNextStep = () => {
      if (isPaused) return;

      if (i < data.length - 1) {
        swapElements(i, i + 1);
        i++;
      } else {
        if (isSorted()) {
          isSortedComplete = true;
          clearInterval(intervalId);
          restartButton.style.display = 'block'; // Show the restart button only when sorting is complete
        }
        i = 0;
        iteration++;
      }
      render();
      states.push([...data]);
      currentStateIndex = states.length - 1;
    };

    addElementButton.addEventListener('click', () => {
      const newElement = parseInt(newElementInput.value);
      if (!isNaN(newElement)) {
        data.push(newElement);
        newElementInput.value = '';
        render();
        states.push([...data]);
        currentStateIndex = states.length - 1;
      }
    });

    removeElementButton.addEventListener('click', () => {
      if (data.length > 1) {
        data.pop();
        render();
        states.push([...data]);
        currentStateIndex = states.length - 1;
      }
    });

    startButton.addEventListener('click', () => {
      if (intervalId) return;
      addElementButton.style.display = 'none';
      removeElementButton.style.display = 'none';
      newElementInput.style.display = 'none';
      backButton.style.display = 'block'; // Show the back button when sorting starts
      forwardButton.style.display = 'block'; // Show the forward button when sorting starts
      intervalId = setInterval(handleNextStep, 1000);
    });

    pauseResumeButton.addEventListener('click', () => {
      if (isPaused) {
        isPaused = false;
        pauseResumeButton.textContent = 'Pause';
      } else {
        isPaused = true;
        pauseResumeButton.textContent = 'Resume';
      }
    });

    backButton.addEventListener('click', () => {
      if (currentStateIndex > 0) {
        currentStateIndex--;
        data = states[currentStateIndex];
        render();
        isPaused = true;
        pauseResumeButton.textContent = 'Resume';
      }
    });

    forwardButton.addEventListener('click', () => {
      if (currentStateIndex < states.length - 1) {
        currentStateIndex++;
        data = states[currentStateIndex];
        render();
        isPaused = true;
        pauseResumeButton.textContent = 'Resume';
      }
    });

    restartButton.addEventListener('click', () => {
      iteration = 0;
      isSortedComplete = false;
      i = 0;
      data = [5, 3, 8, 10, 4, 2];
      newElementInput.value = '';
      restartButton.style.display = 'none'; // Hide the restart button after reset
      addElementButton.style.display = 'inline-block';
      removeElementButton.style.display = 'inline-block';
      newElementInput.style.display = 'inline-block';
      backButton.style.display = 'none'; // Hide the back button after reset
      forwardButton.style.display = 'none'; // Hide the forward button after reset
      clearInterval(intervalId);
      intervalId = null;
      states = [];
      currentStateIndex = -1;
      render();
    });

    render(); // Initial render
  }, []); // Empty dependency array to run once on mount

  return (
    <div className="bubble-sort" ref={containerRef}></div> // Attach ref to the container
  );
};

export default BubbleSortViz;
