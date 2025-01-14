import React, { useEffect } from 'react';
import './QuicksortVisualization.css';

const QuicksortVisualization = () => {
  useEffect(() => {
    const addQuicksortScript = () => {
      if (!document.getElementById("quicksort-script")) {
        const script = document.createElement("script");
        script.id = "quicksort-script";
        script.text = `
          (() => {
            let qsData = [3, 21, 5, 0, 11, 8, 7, 6, 9, 4];
            let qsIteration = 0;
            let qsSortedPivots = [];
            let qsVisualizationStarted = false;
            let qsIsPaused = false;
            let qsFinalRendered = false; // Track if the final sorted state has been rendered

            const resetVisualization = () => {
              qsIteration = 0;
              qsSortedPivots = [];
              qsVisualizationStarted = false;
              qsIsPaused = false;
              qsFinalRendered = false; // Reset final render flag
              document.getElementById("addElement").disabled = false;
              document.getElementById("removeElement").disabled = false;
              document.getElementById("newElement").disabled = false;
              document.getElementById("pauseButton").disabled = true;
              document.getElementById("pauseButton").textContent = "Pause";
              document.getElementById("visualization").innerHTML = "";
            };

            resetVisualization();

            document.getElementById("addElement").addEventListener("click", () => {
              if (qsVisualizationStarted) return;
              const newElementValue = document.getElementById("newElement").value;
              if (newElementValue === "") return;
              qsData.push(parseInt(newElementValue));
              qsRenderInitialArray(qsData);
            });

            document.getElementById("removeElement").addEventListener("click", () => {
              if (qsVisualizationStarted) return;
              if (qsData.length > 0) {
                qsData.pop();
                qsRenderInitialArray(qsData);
              }
            });

            document.getElementById("startButton").addEventListener("click", async () => {
              resetVisualization();
              qsVisualizationStarted = true;

              document.getElementById("addElement").disabled = true;
              document.getElementById("removeElement").disabled = true;
              document.getElementById("newElement").disabled = true;
              document.getElementById("pauseButton").disabled = false;

              qsRenderInitialArray(qsData);
              const sortedArray = qsData.slice();
              await qsQuicksort(sortedArray, 0, sortedArray.length - 1);
              qsRenderFinalArray(sortedArray); // Render the final sorted array after sorting
            });

            document.getElementById("pauseButton").addEventListener("click", () => {
              qsIsPaused = !qsIsPaused;
              document.getElementById("pauseButton").textContent = qsIsPaused ? "Resume" : "Pause";
            });

            function qsRenderInitialArray(arr) {
              const qsVisualizationContainer = document.getElementById("visualization");
              if (!qsVisualizationContainer) return;

              qsVisualizationContainer.innerHTML = "";
              const iterationDiv = document.createElement("div");
              iterationDiv.className = "iteration";

              const label = document.createElement("span");
              label.className = "iteration-label";
              label.textContent = "Initial Array:";
              iterationDiv.appendChild(label);

              const arrayDiv = document.createElement("div");
              arr.forEach((value, index) => {
                const node = document.createElement("div");
                node.className = "circle-default";
                node.textContent = value;
                node.dataset.index = index;
                arrayDiv.appendChild(node);
              });

              iterationDiv.appendChild(arrayDiv);
              qsVisualizationContainer.appendChild(iterationDiv);
            }

            async function qsQuicksort(arr, left, right) {
  if (left < right) {
    const pivotIndex = await qsPartition(arr, left, right);
    qsSortedPivots.push(pivotIndex);

    qsIteration++;
    await qsRenderMainIteration(arr, left, right, pivotIndex, "Iteration " + qsIteration + ":");

    await qsQuicksort(arr, left, pivotIndex - 1);
    await qsQuicksort(arr, pivotIndex + 1, right);
  } else if (left === right) {
    // Handle single-element case
    qsSortedPivots.push(left);
  }
}


            async function qsPartition(arr, left, right) {
              let pivot = arr[right];
              let i = left;
              for (let j = left; j < right; j++) {
                await qsPauseCheck();
                await qsRenderChecking(arr, j, right);
                if (arr[j] < pivot) {
                  [arr[i], arr[j]] = [arr[j], arr[i]];
                  await qsRenderSwapping(arr, i, j);
                  i++;
                }
              }
              [arr[i], arr[right]] = [arr[right], arr[i]];
              await qsRenderSwapping(arr, i, right);

              return i;
            }

            async function qsRenderMainIteration(arr, left, right, pivotIndex, description) {
              await qsPauseCheck();
              const qsVisualizationContainer = document.getElementById("visualization");
              if (!qsVisualizationContainer) return;

              // Skip rendering if the array is fully sorted or already rendered
              if (qsSortedPivots.length === arr.length || qsFinalRendered) return;

              if (
                qsVisualizationContainer.lastElementChild &&
                qsVisualizationContainer.lastElementChild.querySelector(".iteration-label").textContent === description
              ) {
                return;
              }

              const iterationDiv = document.createElement("div");
              iterationDiv.className = "iteration";

              const label = document.createElement("span");
              label.className = "iteration-label";
              label.textContent = description;
              iterationDiv.appendChild(label);

              const arrayDiv = document.createElement("div");
              arr.forEach((value, index) => {
                const node = document.createElement("div");
                if (qsSortedPivots.includes(index)) {
                  node.className = "circle-sorted-pivot";
                } else if (index >= left && index <= right) {
                  if (index === pivotIndex) {
                    node.className = "circle-sorted-pivot";
                  } else if (index < pivotIndex) {
                    node.className = "circle-left-partition";
                  } else {
                    node.className = "circle-right-partition";
                  }
                } else {
                  node.className = "circle-default";
                }
                node.textContent = value;
                arrayDiv.appendChild(node);
              });

              iterationDiv.appendChild(arrayDiv);
              qsVisualizationContainer.appendChild(iterationDiv);
            }

            async function qsRenderChecking(arr, checkIndex, pivotIndex) {
              await qsPauseCheck();
              const qsVisualizationContainer = document.getElementById("visualization");
              if (!qsVisualizationContainer) return;

              const arrayDiv = qsVisualizationContainer.lastElementChild?.querySelector("div");
              if (!arrayDiv) return;

              const checkNode = arrayDiv.children[checkIndex];
              const pivotNode = arrayDiv.children[pivotIndex];

              if (!checkNode || !pivotNode) return;

              checkNode.className = "circle-checking";
              pivotNode.className = "circle-sorted-pivot";

              await qsDelay(500);

              if (!qsSortedPivots.includes(checkIndex)) {
                checkNode.className = "circle-default";
              }
            }

            async function qsRenderSwapping(arr, index1, index2) {
              await qsPauseCheck();
              const qsVisualizationContainer = document.getElementById("visualization");
              if (!qsVisualizationContainer) return;

              const arrayDiv = qsVisualizationContainer.lastElementChild?.querySelector("div");
              if (!arrayDiv) return;

              const node1 = arrayDiv.children[index1];
              const node2 = arrayDiv.children[index2];

              if (!node1 || !node2) return;

              node1.className = "circle-swapping";
              node2.className = "circle-swapping";

              await qsDelay(500);

              [node1.textContent, node2.textContent] = [node2.textContent, node1.textContent];

              if (!qsSortedPivots.includes(index1)) {
                node1.className = "circle-default";
              }
              if (!qsSortedPivots.includes(index2)) {
                node2.className = "circle-default";
              }
            }

            function qsDelay(ms) {
              return new Promise(resolve => setTimeout(resolve, ms));
            }

            async function qsPauseCheck() {
              while (qsIsPaused) {
                await qsDelay(200);
              }
            }

            function qsRenderFinalArray(arr) {
              const qsVisualizationContainer = document.getElementById("visualization");
              if (!qsVisualizationContainer || qsFinalRendered) return; // Skip if already rendered
              qsFinalRendered = true;

              const iterationDiv = document.createElement("div");
              iterationDiv.className = "iteration";

              const label = document.createElement("span");
              label.className = "iteration-label";
              label.textContent = "Final Sorted Array:";
              iterationDiv.appendChild(label);

              const arrayDiv = document.createElement("div");
              arr.forEach(value => {
                const node = document.createElement("div");
                node.className = "circle-sorted-pivot";
                node.textContent = value;
                arrayDiv.appendChild(node);
              });
              iterationDiv.appendChild(arrayDiv);

              qsVisualizationContainer.appendChild(iterationDiv);
            }
          })();
        `;
        document.body.appendChild(script);
      }
    };

    addQuicksortScript();

    return () => {
      const script = document.getElementById("quicksort-script");
      if (script) {
        script.remove();
      }
    };
  }, []);

  return (
    <div>
      <div
        dangerouslySetInnerHTML={{
          __html: `
            <div class="buttons-container">
                <input type="number" id="newElement" placeholder="Enter new element">
                <button id="addElement">Add Element</button>
                <button id="removeElement">Remove Last Element</button>
                <button id="startButton">Start</button>
                <button id="pauseButton" disabled>Pause</button>
            </div>
            <div id="visualization"></div>
          `,
        }}
      />
    </div>
  );
};

export default QuicksortVisualization;
