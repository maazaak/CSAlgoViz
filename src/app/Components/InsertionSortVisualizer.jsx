import React, { useEffect, useRef } from "react";
import './InsertionSortViz.css';

const InsertionSortViz = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // HTML structure as a string
    const htmlContent = `
      <h1>Insertion Sort</h1>
      <div id="iterationCounter">Iteration: 0</div>
      <div id="visualization"></div>
      <input type="number" id="newElement" placeholder="Enter new element">
      <div class="button-container">
          <button class="button" id="addElement">Add Element</button>
          <button class="button" id="removeElement">Remove Last Element</button>
          <button class="button" id="startButton">Start</button>
          <button class="button" id="pauseResumeButton">Pause</button>
          <button class="button" id="backButton" style="display: none;">Back</button>
          <button class="button" id="forwardButton" style="display: none;">Forward</button>
          <button class="button" id="restartButton" style="display: none;">Restart</button>
      </div>
    `;

    // Inject HTML content into the component
    containerRef.current.innerHTML = htmlContent;

    // JavaScript logic for Insertion Sort Visualization
    let iteration = 0;
    let data = [2, 8, 5, 3, 9, 4];
    let currentIndex = 1;
    let intervalId;
    let isPaused = false;
    let snapshots = [];
    let currentSnapshotIndex = -1;

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

    const saveSnapshot = () => {
      snapshots.push({
        data: [...data],
        iteration,
        currentIndex,
      });
      currentSnapshotIndex = snapshots.length - 1;
    };

    const render = () => {
      visualization.innerHTML = '';
      data.forEach((value, index) => {
        const circle = document.createElement("div");
        circle.className = "circle";
        circle.textContent = value;
        if (index === currentIndex) {
          circle.classList.add('yellow');
        } else if (index < currentIndex) {
          circle.classList.add('green');
        }
        visualization.appendChild(circle);
      });
      iterationCounter.textContent = `Iteration: ${iteration}`;
    };

    const performInsertionSortStep = () => {
      if (isPaused) return;

      if (currentIndex < data.length) {
        let j = currentIndex;
        while (j > 0 && data[j - 1] > data[j]) {
          [data[j], data[j - 1]] = [data[j - 1], data[j]]; // Swap
          j--;
        }
        currentIndex++;
        iteration++;
        saveSnapshot();
      } else {
        clearInterval(intervalId);
        restartButton.style.display = 'block'; // Show the restart button when sorting is complete
      }
      render();
    };

    const navigateToSnapshot = (index) => {
      if (index >= 0 && index < snapshots.length) {
        const snapshot = snapshots[index];
        data = [...snapshot.data];
        iteration = snapshot.iteration;
        currentIndex = snapshot.currentIndex;
        currentSnapshotIndex = index;
        render();
      }
    };

    addElementButton.addEventListener('click', () => {
      const newElement = parseInt(newElementInput.value);
      if (!isNaN(newElement)) {
        data.push(newElement);
        newElementInput.value = '';
        render();
      }
    });

    removeElementButton.addEventListener('click', () => {
      if (data.length > 1) {
        data.pop();
        render();
      }
    });

    startButton.addEventListener('click', () => {
      if (intervalId) return;
      addElementButton.style.display = 'none';
      removeElementButton.style.display = 'none';
      newElementInput.style.display = 'none';
      backButton.style.display = 'block';
      forwardButton.style.display = 'block';
      intervalId = setInterval(performInsertionSortStep, 1000);
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
      if (currentSnapshotIndex > 0) {
        navigateToSnapshot(currentSnapshotIndex - 1);
      }
    });

    forwardButton.addEventListener('click', () => {
      if (currentSnapshotIndex < snapshots.length - 1) {
        navigateToSnapshot(currentSnapshotIndex + 1);
      }
    });

    restartButton.addEventListener('click', () => {
      iteration = 0;
      currentIndex = 1;
      data = [2, 8, 5, 3, 9, 4];
      newElementInput.value = '';
      restartButton.style.display = 'none';
      addElementButton.style.display = 'block';
      removeElementButton.style.display = 'block';
      newElementInput.style.display = 'block';
      backButton.style.display = 'none';
      forwardButton.style.display = 'none';
      clearInterval(intervalId);
      intervalId = null;
      snapshots = [];
      currentSnapshotIndex = -1;
      render();
    });

    render(); // Initial render
    saveSnapshot(); // Save the initial state
  }, []); // Empty dependency array to run once on mount

  return (
    <div className="insertion-sort" ref={containerRef}></div>
  );
};

export default InsertionSortViz;
