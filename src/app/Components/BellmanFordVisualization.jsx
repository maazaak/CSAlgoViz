import React, { useState, useRef } from "react";

const BellmanFordVisualization = () => {
  const [distances, setDistances] = useState({
    S: { distance: 0, parent: null },
    A: { distance: Infinity, parent: null },
    B: { distance: Infinity, parent: null },
    C: { distance: Infinity, parent: null },
    D: { distance: Infinity, parent: null },
    E: { distance: Infinity, parent: null },
  });

  const [iteration, setIteration] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [currentNode, setCurrentNode] = useState(null);
  const [nodes, setNodes] = useState([
    { id: "S", x: 100, y: 100 },
    { id: "A", x: 300, y: 100 },
    { id: "B", x: 500, y: 100 },
    { id: "E", x: 100, y: 300 },
    { id: "C", x: 500, y: 250 },
    { id: "D", x: 300, y: 300 },
  ]);

  const [links, setLinks] = useState([
    { source: "S", target: "A", weight: 10 },
    { source: "S", target: "E", weight: 8 },
    { source: "A", target: "C", weight: 2 },
    { source: "B", target: "A", weight: 1 },
    { source: "C", target: "B", weight: -2 },
    { source: "D", target: "C", weight: -1 },
    { source: "D", target: "A", weight: -4 },
    { source: "E", target: "D", weight: 1 },
  ]);

  const [newNode, setNewNode] = useState("");
  const [isAddingNode, setIsAddingNode] = useState(false);
  const [newConnection, setNewConnection] = useState({ source: "", target: "", weight: "" });
  const [snapshots, setSnapshots] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const isPausedRef = useRef(isPaused);

  const handleSVGClick = (e) => {
    if (isAddingNode && newNode) {
      const svgRect = e.target.getBoundingClientRect();
      const newX = e.clientX - svgRect.left;
      const newY = e.clientY - svgRect.top;
      const newNodes = [...nodes, { id: newNode, x: newX, y: newY }];
      setNodes(newNodes);
      setDistances((prevDistances) => ({
        ...prevDistances,
        [newNode]: { distance: Infinity, parent: null },
      }));
      setNewNode("");
      setIsAddingNode(false);
    }
  };

  const handleAddNodeClick = () => {
    setIsAddingNode(true);
  };

  const handleAddConnection = () => {
    const sourceNode = nodes.find((n) => n.id === newConnection.source);
    const targetNode = nodes.find((n) => n.id === newConnection.target);

    if (!sourceNode || !targetNode) {
      alert("Invalid connection: One of the nodes does not exist.");
      return;
    }

    const updatedLinks = [
      ...links,
      {
        source: newConnection.source,
        target: newConnection.target,
        weight: parseInt(newConnection.weight, 10),
      },
    ];
    setLinks(updatedLinks);
    setNewConnection({ source: "", target: "", weight: "" });
  };

  const handleStartClick = async () => {
    setIsStarted(true);
    const currentDistances = { ...distances };
    const V = nodes.length;
    const E = links.length;
    let iterationCounter = 0;

    const bellmanFordStep = async () => {
      if (iterationCounter >= V - 1) {
        setResultMessage("Shortest Distances Found");
        checkNegativeCycle(currentDistances, links);
        return;
      }

      for (let j = 0; j < E; j++) {
        if (isPausedRef.current) {
          await new Promise((resolve) => setTimeout(resolve, 500));
          j--;
          continue;
        }

        const { source, target, weight } = links[j];
        setCurrentNode(source);
        if (
          currentDistances[source].distance !== Infinity &&
          currentDistances[source].distance + weight <
            currentDistances[target].distance
        ) {
          currentDistances[target] = {
            distance: currentDistances[source].distance + weight,
            parent: source,
          };
        }
        setDistances({ ...currentDistances });
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      iterationCounter++;
      setIteration(iterationCounter);
      saveSnapshot(nodes, currentDistances);
      setTimeout(bellmanFordStep, 2000);
    };

    bellmanFordStep();
  };

  const handlePauseResumeClick = () => {
    setIsPaused((prev) => {
      const newPausedState = !prev;
      isPausedRef.current = newPausedState;
      return newPausedState;
    });
  };

  const handleSnapshotChange = (e) => {
    const selectedStepIndex = parseInt(e.target.value, 10);
    if (snapshots[selectedStepIndex]) {
      const snapshot = snapshots[selectedStepIndex];
      setNodes(snapshot.nodes);
      setDistances(snapshot.distances);
      setCurrentStepIndex(selectedStepIndex);
    }
  };

  const saveSnapshot = (currentNodes, currentDistances) => {
    setSnapshots((prevSnapshots) => [
      ...prevSnapshots,
      {
        nodes: JSON.parse(JSON.stringify(currentNodes)),
        distances: JSON.parse(JSON.stringify(currentDistances)),
      },
    ]);
    setCurrentStepIndex(snapshots.length);
  };

  const checkNegativeCycle = (currentDistances, links) => {
    for (let i = 0; i < links.length; i++) {
      const { source, target, weight } = links[i];
      if (
        currentDistances[source].distance !== Infinity &&
        currentDistances[source].distance + weight <
          currentDistances[target].distance
      ) {
        setResultMessage("Graph contains negative weight cycle");
        return;
      }
    }
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#1e1e1e", color: "white" }}>
      <h1 style={{ fontWeight: "bold", textAlign: "center" }}>Visualizations</h1>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Bellman-Ford Algorithm Visualization</h2>

      <div style={{ display: "flex", justifyContent: "center", gap: "40px", marginBottom: "20px" }}>
        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>Node Name:</label>
          <input
            type="text"
            value={newNode}
            onChange={(e) => setNewNode(e.target.value)}
            style={{ marginBottom: "10px", color: "black", padding: "5px", width: "100%" }}
            disabled={isStarted}
          />
          <button
            onClick={handleAddNodeClick}
            style={{
              backgroundColor: "#28a745",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              width: "100%",
            }}
            disabled={isStarted}
          >
            Add Node
          </button>
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>Source:</label>
          <input
            type="text"
            placeholder="Source"
            value={newConnection.source}
            onChange={(e) =>
              setNewConnection({ ...newConnection, source: e.target.value })
            }
            style={{ marginBottom: "10px", color: "black", padding: "5px", width: "100%" }}
            disabled={isStarted}
          />
          <label style={{ display: "block", marginBottom: "5px" }}>Destination:</label>
          <input
            type="text"
            placeholder="Target"
            value={newConnection.target}
            onChange={(e) =>
              setNewConnection({ ...newConnection, target: e.target.value })
            }
            style={{ marginBottom: "10px", color: "black", padding: "5px", width: "100%" }}
            disabled={isStarted}
          />
          <label style={{ display: "block", marginBottom: "5px" }}>Weight:</label>
          <input
            type="number"
            placeholder="Weight"
            value={newConnection.weight}
            onChange={(e) =>
              setNewConnection({ ...newConnection, weight: e.target.value })
            }
            style={{ marginBottom: "10px", color: "black", padding: "5px", width: "100%" }}
            disabled={isStarted}
          />
          <button
            onClick={handleAddConnection}
            style={{
              backgroundColor: "#28a745",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              width: "100%",
            }}
            disabled={isStarted}
          >
            Add Link
          </button>
        </div>
      </div>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button
          style={{
            backgroundColor: isPaused ? "#28a745" : "#ffc107",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginRight: "10px",
          }}
          onClick={handlePauseResumeClick}
          disabled={!isStarted}
        >
          {isPaused ? "Resume" : "Pause"}
        </button>
        <select
          value={currentStepIndex}
          onChange={handleSnapshotChange}
          style={{ marginRight: "10px", padding: "10px", color: "black" }}
          disabled={snapshots.length === 0}
        >
          {snapshots.map((_, index) => (
            <option key={index} value={index}>
              Step {index + 1}
            </option>
          ))}
        </select>
        <button
          style={{
            backgroundColor: "#007bff",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={handleStartClick}
          disabled={isStarted}
        >
          Start Visualization
        </button>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "10px",
          border: "2px solid #ccc",
          borderRadius: "8px",
          margin: "20px auto",
          width: "max-content",
          backgroundColor: "#1e1e1e",
        }}
        onClick={handleSVGClick}
      >
        <svg width="600" height="400">
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="0"
              refY="3.5"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="#abb" />
            </marker>
          </defs>
          {links.map((link, index) => {
            const sourceNode = nodes.find((n) => n.id === link.source);
            const targetNode = nodes.find((n) => n.id === link.target);
            return (
              <g key={index}>
                <line
                  x1={sourceNode.x}
                  y1={sourceNode.y}
                  x2={targetNode.x}
                  y2={targetNode.y}
                  stroke="#abb"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                />
                <text
                  x={(sourceNode.x + targetNode.x) / 2}
                  y={(sourceNode.y + targetNode.y) / 2 - 5}
                  textAnchor="middle"
                  fill="white"
                >
                  {link.weight}
                </text>
              </g>
            );
          })}
          {nodes.map((node) => (
            <g key={node.id}>
              <circle
                r={20}
                cx={node.x}
                cy={node.y}
                stroke="black"
                strokeWidth={2}
                fill={currentNode === node.id ? "green" : "#999"}
              />
              <text x={node.x} y={node.y + 5} textAnchor="middle" fill="white">
                {node.id}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <p>
          Iteration: <span>{iteration}</span>
        </p>
        <p>Distances:</p>
        <table
          style={{
            margin: "auto",
            borderCollapse: "collapse",
            width: "50%",
            border: "1px solid #ccc",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Node</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Distance
              </th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Parent</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(distances).map(([node, info]) => (
              <tr key={node}>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {node}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {info.distance === Infinity ? "Infinity" : info.distance}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {info.parent || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h2>{resultMessage}</h2>
      </div>
    </div>
  );
};

export default BellmanFordVisualization;
