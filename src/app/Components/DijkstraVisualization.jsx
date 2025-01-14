import React, { useState, useMemo, useRef } from "react";

const DijkstraVisualization = () => {
  const [openNodes, setOpenNodes] = useState("");
  const [closedNodes, setClosedNodes] = useState("");
  const [distances, setDistances] = useState({
    A: { distance: 0, parent: null },
    B: { distance: Infinity, parent: null },
    C: { distance: Infinity, parent: null },
    D: { distance: Infinity, parent: null },
    E: { distance: Infinity, parent: null },
    F: { distance: Infinity, parent: null },
  });
  const [nodes, setNodes] = useState([
    { id: "A", x: 100, y: 100, status: "unvisited" },
    { id: "B", x: 300, y: 100, status: "unvisited" },
    { id: "D", x: 500, y: 100, status: "unvisited" },
    { id: "C", x: 200, y: 300, status: "unvisited" },
    { id: "E", x: 400, y: 300, status: "unvisited" },
    { id: "F", x: 500, y: 250, status: "unvisited" },
  ]);
  const [links, setLinks] = useState([
    { source: "A", target: "B", weight: 5 },
    { source: "B", target: "D", weight: 4 },
    { source: "A", target: "C", weight: 2 },
    { source: "B", target: "C", weight: 1 },
    { source: "C", target: "E", weight: 7 },
    { source: "D", target: "E", weight: 6 },
    { source: "B", target: "E", weight: 2 },
    { source: "E", target: "F", weight: 1 },
    { source: "D", target: "F", weight: 3 },
  ]);
  const [newNode, setNewNode] = useState("");
  const [isAddingNode, setIsAddingNode] = useState(false);
  const [sourceNode, setSourceNode] = useState("");
  const [destinationNode, setDestinationNode] = useState("");
  const [linkWeight, setLinkWeight] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [snapshots, setSnapshots] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const isPausedRef = useRef(isPaused);

  const pq = useMemo(() => {
    const queue = [];
    queue.push({ node: "A", distance: 0 });
    return {
      enqueue: (element) => {
        queue.push(element);
        queue.sort((a, b) => a.distance - b.distance);
      },
      dequeue: () => queue.shift(),
      isEmpty: () => queue.length === 0,
    };
  }, []);

  const handleWeightChange = (index, newWeight) => {
    const updatedLinks = [...links];
    updatedLinks[index].weight = parseInt(newWeight, 10);
    setLinks(updatedLinks);
  };

  const handleSVGClick = (e) => {
    if (isAddingNode && newNode) {
      const svgRect = e.target.getBoundingClientRect();
      const newX = e.clientX - svgRect.left;
      const newY = e.clientY - svgRect.top;
      const newNodes = [...nodes, { id: newNode, x: newX, y: newY, status: "unvisited" }];
      setNodes(newNodes);
      setDistances((prevDistances) => ({
        ...prevDistances,
        [newNode]: { distance: Infinity, parent: null },
      }));
      setNewNode("");
      setIsAddingNode(false); // Reset flag after adding node
    }
  };

  const handleAddNodeClick = () => {
    setIsAddingNode(true);
  };

  const handleAddLinkClick = () => {
    if (sourceNode && destinationNode && linkWeight) {
      const newLink = {
        source: sourceNode,
        target: destinationNode,
        weight: parseFloat(linkWeight),
      };
      setLinks([...links, newLink]);
      setSourceNode("");
      setDestinationNode("");
      setLinkWeight("");
    }
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
      setOpenNodes(snapshot.openNodes);
      setClosedNodes(snapshot.closedNodes);
      setCurrentStepIndex(selectedStepIndex);
    }
  };

  const saveSnapshot = (currentNodes, currentDistances, openList, closedList) => {
    setSnapshots((prevSnapshots) => [
      ...prevSnapshots,
      {
        nodes: JSON.parse(JSON.stringify(currentNodes)),
        distances: JSON.parse(JSON.stringify(currentDistances)),
        openNodes: openList.join(", "),
        closedNodes: Array.from(closedList).join(", "),
      },
    ]);
    setCurrentStepIndex(snapshots.length);
  };

  const handleStartClick = async () => {
    setIsStarted(true);
    const currentNodes = [...nodes];
    const currentDistances = { ...distances };
    const openList = [];
    const closedList = new Set();

    pq.enqueue({ node: "A", distance: 0 });

    // Save the initial state before starting the algorithm
    saveSnapshot(currentNodes, currentDistances, openList, closedList);

    while (!pq.isEmpty()) {
      if (isPausedRef.current) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        continue;
      }

      const { node } = pq.dequeue();

      if (closedList.has(node)) {
        continue;
      }

      closedList.add(node);
      const currentNode = currentNodes.find((n) => n.id === node);
      currentNode.status = "closed";

      links
        .filter((link) => link.source === node)
        .forEach((link) => {
          const target = link.target;
          const newDistance = currentDistances[node].distance + link.weight;

          if (newDistance < currentDistances[target].distance) {
            currentDistances[target] = { distance: newDistance, parent: node };

            const targetNode = currentNodes.find((n) => n.id === target);
            if (!closedList.has(target)) {
              openList.push(target);
              targetNode.status = "open";
              pq.enqueue({ node: target, distance: newDistance });
            }
          }
        });

      setDistances({ ...currentDistances });
      setOpenNodes(openList.join(", "));
      setClosedNodes(Array.from(closedList).join(", "));
      setNodes([...currentNodes]);

      // Save the current step to snapshots after each major state change
      saveSnapshot(currentNodes, currentDistances, openList, closedList);

      await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay for visualization
    }
  };

  return (
    <div>
      <h1 style={{ fontWeight: "bold", textAlign: "center" }}>
        Dijkstra's Algorithm Visualization
      </h1>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <div style={{ marginRight: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Node Name:</label>
          <input
            type="text"
            value={newNode}
            onChange={(e) => setNewNode(e.target.value)}
            style={{ marginBottom: "10px", color: "black", padding: "5px" }}
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
            value={sourceNode}
            onChange={(e) => setSourceNode(e.target.value)}
            style={{ marginBottom: "10px", color: "black", padding: "5px" }}
            disabled={isStarted}
          />
          <label style={{ display: "block", marginBottom: "5px" }}>Destination:</label>
          <input
            type="text"
            value={destinationNode}
            onChange={(e) => setDestinationNode(e.target.value)}
            style={{ marginBottom: "10px", color: "black", padding: "5px" }}
            disabled={isStarted}
          />
          <label style={{ display: "block", marginBottom: "5px" }}>Weight:</label>
          <input
            type="number"
            value={linkWeight}
            onChange={(e) => setLinkWeight(e.target.value)}
            style={{ marginBottom: "10px", color: "black", padding: "5px" }}
            disabled={isStarted}
          />
          <button
            onClick={handleAddLinkClick}
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
      {/* Visualization Container with a Border */}
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
                <foreignObject
                  x={(sourceNode.x + targetNode.x) / 2 - 10}
                  y={(sourceNode.y + targetNode.y) / 2 - 15}
                  width="40"
                  height="20"
                >
                  <input
                    type="number"
                    value={link.weight}
                    onChange={(e) => handleWeightChange(index, e.target.value)}
                    style={{
                      width: "40px",
                      height: "20px",
                      fontSize: "12px",
                      textAlign: "center",
                      backgroundColor: "white",
                      color: "black",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      padding: "0",
                    }}
                    disabled={isStarted}
                  />
                </foreignObject>
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
                fill={
                  node.status === "open"
                    ? "#28a745"
                    : node.status === "closed"
                    ? "#dc3545"
                    : "#999"
                }
              />
              <text x={node.x} y={node.y + 5} textAnchor="middle" fill="white">
                {node.id}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <div style={{ marginTop: "40px", display: "flex", justifyContent: "center" }}>
        <table
          style={{
            width: "50%",
            borderCollapse: "collapse",
            backgroundColor: "#ffffff",
            textAlign: "center",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#000", color: "white" }}>
              <th style={{ padding: "5px", border: "1px solid #ccc" }}>Node</th>
              <th style={{ padding: "5px", border: "1px solid #ccc" }}>Distance</th>
              <th style={{ padding: "5px", border: "1px solid #ccc" }}>Parent</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(distances).map(([node, info]) => (
              <tr key={node}>
                <td style={{ padding: "5px", border: "1px solid #ccc", color: "black" }}>
                  {node}
                </td>
                <td style={{ padding: "5px", border: "1px solid #ccc", color: "black" }}>
                  {info.distance === Infinity ? "Infinity" : info.distance}
                </td>
                <td style={{ padding: "5px", border: "1px solid #ccc", color: "black" }}>
                  {info.parent || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <p>
          Open Nodes: <span>{openNodes}</span>
        </p>
        <p>
          Closed Nodes: <span>{closedNodes}</span>
        </p>
      </div>
    </div>
  );
};

export default DijkstraVisualization;
