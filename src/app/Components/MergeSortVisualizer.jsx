import React, { useState, useEffect } from "react";

const MergeSortVisualizer = () => {
  const [array] = useState([2, 8, 5, 3, 9, 4, 1, 7]);
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);

  useEffect(() => {
    if (currentStepIndex >= 0 && currentStepIndex < steps.length) {
      const timer = setTimeout(() => {
        setCurrentStepIndex((prevIndex) => prevIndex + 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [currentStepIndex, steps]);

  const mergeSort = (arr) => {
    const steps = [];

    const divide = (arr, level = 0) => {
      if (steps[level] === undefined) steps[level] = [];

      const mid = Math.floor(arr.length / 2);

      const stepLine = Array.from({ length: array.length }, (_, index) => {
        return index < arr.length ? arr[index] : null;
      });

      steps[level].push(stepLine);

      if (arr.length <= 1) return;

      const left = arr.slice(0, mid);
      const right = arr.slice(mid);

      divide(left, level + 1);
      divide(right, level + 1);
    };

    const merge = (left, right) => {
      let sorted = [];
      let i = 0,
        j = 0;

      while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
          sorted.push(left[i++]);
        } else {
          sorted.push(right[j++]);
        }
      }

      return [...sorted, ...left.slice(i), ...right.slice(j)];
    };

    const sortRecursive = (arr) => {
      if (arr.length <= 1) return arr;

      const mid = Math.floor(arr.length / 2);
      const left = sortRecursive(arr.slice(0, mid));
      const right = sortRecursive(arr.slice(mid));

      const merged = merge(left, right);
      steps.push([...merged]);
      return merged;
    };

    // Divide step
    divide(arr);

    // Flatten and adjust for visualization
    const visualSteps = steps.map((levelSteps, levelIndex) => {
      const adjustedStep = Array.from({ length: array.length }, () => null);
      levelSteps.forEach((step, subarrayIndex) => {
        const offset =
          subarrayIndex * Math.ceil(array.length / levelSteps.length) +
          subarrayIndex * 1 +
          levelIndex * 3; // Add increasing offset for each level
        step.forEach((value, index) => {
          adjustedStep[offset + index] = value;
        });
      });
      return adjustedStep;
    });

    // Add conquer steps
    sortRecursive(arr);

    return visualSteps;
  };

  const handleStart = () => {
    const steps = mergeSort(array);
    setSteps(steps);
    setCurrentStepIndex(0);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", border: "2px solid black", borderRadius: "10px",width: "120%" }}> {/* Added border and rounded corners */}
      <h1>Visualizations</h1>
      <button
        onClick={handleStart}
        style={{ margin: "20px", padding: "10px 20px", fontSize: "16px" }}
      >
        Start Merge Sort Visualization
      </button>
      <div style={{ marginTop: "20px" }}>
        {steps.slice(0, currentStepIndex + 1).map((step, index) => (
          <div style={{ marginBottom: "20px" }} key={index}> {/* Added margin for spacing between subarrays */}
            <div
              style={{
                display: "flex",
                gap: "5px",
                justifyContent: "center",
                flexWrap: "nowrap", // Prevent wrapping
              }}
            >
              {step.map((value, idx) => (
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    backgroundColor: value === null ? "transparent" : "lightblue",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "14px",
                    fontWeight: "bold",
                    flexShrink: 0, // Prevent shrinking of nodes
                  }}
                  key={idx}
                >
                  {value === null ? "" : value}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MergeSortVisualizer;