import React, { useState, useEffect, useRef } from "react";

const SelectionSortVisualization = () => {
  const [array, setArray] = useState([2, 8, 5, 3, 9, 4, 1]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentMinIndex, setCurrentMinIndex] = useState(0);
  const [currentSubIndex, setCurrentSubIndex] = useState(0);
  const [isSorting, setIsSorting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [iteration, setIteration] = useState(0);
  const [sortedIndex, setSortedIndex] = useState(-1);
  const [newElement, setNewElement] = useState("");
  const [snapshots, setSnapshots] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const isPausedRef = useRef(isPaused);
  const resumeStateRef = useRef({});

  useEffect(() => {
    if (isSorting && !isPaused) {
      const timer = setTimeout(() => {
        performSelectionSortStep();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, currentSubIndex, isSorting, isPaused]);

  const saveSnapshot = () => {
    setSnapshots((prevSnapshots) => [
      ...prevSnapshots,
      { array: [...array], currentIndex, currentMinIndex, currentSubIndex, sortedIndex },
    ]);
    setCurrentStepIndex(snapshots.length);
  };

  const performSelectionSortStep = () => {
    let newArray = [...array];
    let minIndex = currentMinIndex;

    if (currentSubIndex < array.length) {
      // Check if current element is smaller than current minimum
      if (array[currentSubIndex] < array[minIndex]) {
        minIndex = currentSubIndex;
      }
      setCurrentMinIndex(minIndex);
      setCurrentSubIndex((prev) => prev + 1);
    } else {
      // Swap if necessary and move to the next iteration
      if (minIndex !== currentIndex) {
        [newArray[currentIndex], newArray[minIndex]] = [newArray[minIndex], newArray[currentIndex]];
      }
      setArray(newArray);
      setSortedIndex(currentIndex);
      setCurrentIndex((prev) => prev + 1);
      setCurrentSubIndex(currentIndex + 1);
      setCurrentMinIndex(currentIndex + 1);
      setIteration((prev) => prev + 1);

      // Save snapshot
      saveSnapshot();

      // Stop sorting if we reach the end
      if (currentIndex >= array.length - 1) {
        setIsSorting(false);
        setSortedIndex(array.length - 1);
      }
    }
  };

  const startSorting = () => {
    setIsSorting(true);
    setIsPaused(false);
    setCurrentIndex(0);
    setCurrentMinIndex(0);
    setCurrentSubIndex(1);
    setIteration(0);
    setSortedIndex(-1);
    setSnapshots([]);
  };

  const togglePause = () => {
    if (!isPaused) {
      // Save current state for resuming
      resumeStateRef.current = {
        currentIndex,
        currentMinIndex,
        currentSubIndex,
        sortedIndex,
      };
    } else {
      // Restore saved state when resuming
      const { currentIndex, currentMinIndex, currentSubIndex, sortedIndex } = resumeStateRef.current;
      setCurrentIndex(currentIndex);
      setCurrentMinIndex(currentMinIndex);
      setCurrentSubIndex(currentSubIndex);
      setSortedIndex(sortedIndex);
    }
    setIsPaused((prev) => !prev);
    isPausedRef.current = !isPaused;
  };

  const addElement = () => {
    if (!isNaN(newElement) && newElement !== "") {
      setArray((prevArray) => [...prevArray, parseInt(newElement, 10)]);
      setNewElement("");
    }
  };

  const removeLastElement = () => {
    setArray((prevArray) => prevArray.slice(0, -1));
  };

  const viewSnapshot = (index) => {
    const snapshot = snapshots[index];
    if (snapshot) {
      setArray(snapshot.array);
      setCurrentIndex(snapshot.currentIndex);
      setCurrentMinIndex(snapshot.currentMinIndex);
      setCurrentSubIndex(snapshot.currentSubIndex);
      setSortedIndex(snapshot.sortedIndex);
      setCurrentStepIndex(index);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Selection Sort Visualization</h1>
      <div style={styles.arrayContainer}>
        {array.map((value, index) => (
          <div
            key={index}
            style={{
              ...styles.arrayNode,
              backgroundColor:
                index <= sortedIndex
                  ? "green"
                  : index === currentIndex
                  ? "blue"
                  : index === currentMinIndex
                  ? "red"
                  : index === currentSubIndex
                  ? "yellow"
                  : "lightblue",
            }}
          >
            {value}
          </div>
        ))}
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={newElement}
          onChange={(e) => setNewElement(e.target.value)}
          style={styles.input}
          placeholder="Enter new element"
        />
      </div>
      <div style={styles.buttonContainer}>
        <button onClick={addElement} style={{ ...styles.button, backgroundColor: "#28a745" }} disabled={isSorting}>
          Add Element
        </button>
        <button
          onClick={removeLastElement}
          style={{ ...styles.button, backgroundColor: "#dc3545" }}
          disabled={isSorting || array.length === 0}
        >
          Remove Last Element
        </button>
        <button
          onClick={startSorting}
          style={{ ...styles.button, backgroundColor: "#007bff" }}
          disabled={isSorting && !isPaused}
        >
          Start
        </button>
        <button
          onClick={togglePause}
          style={{ ...styles.button, backgroundColor: "#ffc107" }}
          disabled={!isSorting}
        >
          {isPaused ? "Resume" : "Pause"}
        </button>
      </div>
      <div style={styles.iteration}>Iteration: {iteration}</div>
      {(isPaused || !isSorting) && snapshots.length > 0 && (
        <div style={styles.snapshotControls}>
          <label>View Steps:</label>
          <select
            value={currentStepIndex}
            onChange={(e) => viewSnapshot(parseInt(e.target.value))}
            style={styles.select}
          >
            {snapshots.map((_, index) => (
              <option key={index} value={index}>
                Step {index + 1}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "20px",
    color: "#f8f9fa",
    backgroundColor: "#1e1e1e",
    padding: "20px",
    borderRadius: "10px",
    width: "600px",
    margin: "auto",
  },
  arrayContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "15px",
    marginTop: "20px",
  },
  arrayNode: {
    width: "40px",
    height: "40px",
    backgroundColor: "lightblue",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "18px",
    fontWeight: "bold",
    color: "black",
    border: "2px solid #ddd",
  },
  inputContainer: {
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ced4da",
    width: "30%",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  button: {
    padding: "5px 5px",
    fontSize: "12px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    color: "#fff",
    flex: 1,
    margin: "0 5px",
  },
  iteration: {
    marginTop: "20px",
    fontSize: "18px",
    fontWeight: "bold",
  },
  snapshotControls: {
    marginTop: "20px",
  },
  select: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ced4da",
  },
};

export default SelectionSortVisualization;