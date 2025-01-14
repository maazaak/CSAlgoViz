import React, { useState, useMemo, useRef, useCallback } from "react";

const AStarVisualization = () => {
  const [openNodes, setOpenNodes] = useState("");
  const [closedNodes, setClosedNodes] = useState("");
  const [distances, setDistances] = useState({
    S: { distance: 0, parent: null },
    A: { distance: Infinity, parent: null },
    B: { distance: Infinity, parent: null },
    C: { distance: Infinity, parent: null },
    D: { distance: Infinity, parent: null },
    G: { distance: Infinity, parent: null },
  });

  const [heuristics, setHeuristics] = useState({
    S: 5,
    A: 3,
    B: 4,
    C: 2,
    D: 6,
    G: 0,
  });

  const [bestPath, setBestPath] = useState("");
  const [bestPathNodes, setBestPathNodes] = useState([]); // Track nodes in the best path
  const [isStarted, setIsStarted] = useState(false); // Track if the algorithm is running
  const [newNode, setNewNode] = useState("");
  const [newNodeHeuristic, setNewNodeHeuristic] = useState(0); // Heuristic value for the new node
  const [isAddingNode, setIsAddingNode] = useState(false);
  const [sourceNode, setSourceNode] = useState("");
  const [destinationNode, setDestinationNode] = useState("");
  const [linkWeight, setLinkWeight] = useState("");
  const [snapshots, setSnapshots] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const isPausedRef = useRef(false);
  const [isPaused, setIsPaused] = useState(false);

  const [nodes, setNodes] = useState([
    { id: "S", x: 100, y: 100, status: "unvisited" },
    { id: "A", x: 300, y: 100, status: "unvisited" },
    { id: "B", x: 500, y: 100, status: "unvisited" },
    { id: "C", x: 400, y: 200, status: "unvisited" },
    { id: "D", x: 500, y: 250, status: "unvisited" },
    { id: "G", x: 200, y: 300, status: "unvisited" },
  ]);

  const [links, setLinks] = useState([
    { source: "S", target: "A", weight: 1 },
    { source: "S", target: "G", weight: 10 },
    { source: "A", target: "C", weight: 1 },
    { source: "A", target: "B", weight: 2 },
    { source: "B", target: "D", weight: 5 },
    { source: "C", target: "D", weight: 3 },
    { source: "C", target: "G", weight: 4 },
    { source: "D", target: "G", weight: 2 },
  ]);

  const pq = useMemo(() => {
    const queue = [];
    queue.push({ node: "S", distance: 0 });
    return {
      enqueue: (element) => {
        queue.push(element);
        queue.sort(
          (a, b) => a.distance + heuristics[a.node] - (b.distance + heuristics[b.node])
        );
      },
      dequeue: () => queue.shift(),
      isEmpty: () => queue.length === 0,
    };
  }, [heuristics]);

  const handleWeightChange = (index, newWeight) => {
    const updatedLinks = [...links];
    updatedLinks[index].weight = parseInt(newWeight, 10);
    setLinks(updatedLinks);
  };

  const handleHeuristicChange = (nodeId, newValue) => {
    setHeuristics((prev) => ({
      ...prev,
      [nodeId]: parseInt(newValue, 10),
    }));
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
      setHeuristics((prevHeuristics) => ({
        ...prevHeuristics,
        [newNode]: newNodeHeuristic,
      })); // Add heuristic value for the new node
      setNewNode("");
      setNewNodeHeuristic(0); // Reset heuristic input
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

  const handleStartClick = useCallback(() => {
    setIsStarted(true); // Disable inputs when the algorithm starts
    const currentNodes = [...nodes];
    const currentDistances = { ...distances };
    const openList = [];
    const closedList = new Set();

    pq.enqueue({ node: "S", distance: 0 });

    // Save the initial state before starting the algorithm
    saveSnapshot(currentNodes, currentDistances, openList, closedList);

    const astarStep = async () => {
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

      const path = getBestPath(currentDistances); // Calculate the best path here after completion
      setBestPath(path); // Immediately update the path after the algorithm finishes
      const pathNodes = path.split(" -> "); // Extract nodes in the best path
      setBestPathNodes(pathNodes); // Update the nodes that should be highlighted
    };

    astarStep();
  }, [nodes, distances, links, pq]);

  const getBestPath = (distances) => {
    let path = [];
    let currentNode = "G";

    while (currentNode) {
      path.unshift(currentNode);
      currentNode = distances[currentNode].parent;
    }

    return path.length > 1 ? path.join(" -> ") : "No path found";
  };

  return (
    <div>
      <h1 style={{ fontWeight: "bold", textAlign: "center" }}>
        A* Algorithm Visualization
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
          <label style={{ display: "block", marginBottom: "5px" }}>Heuristic Value:</label>
          <input
            type="number"
            value={newNodeHeuristic}
            onChange={(e) => setNewNodeHeuristic(parseInt(e.target.value, 10))}
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
            <g key={node.id} className={`node ${node.status}`}>
              <circle
                r={20}
                cx={node.x}
                cy={node.y}
                stroke="black"
                strokeWidth={2}
                fill={
                  bestPathNodes.includes(node.id) // If the node is part of the best path, make it green
                    ? "green"
                    : node.status === "open"
                    ? "#FFA500"
                    : node.status === "closed"
                    ? "#dc3545"
                    : "#999"
                }
              />
              <text x={node.x} y={node.y + 5} textAnchor="middle" fill="white">
                {node.id}
              </text>
              {/* Heuristic input */}
              <foreignObject x={node.x - 20} y={node.y + 25} width="50" height="30">
                <input
                  type="number"
                  value={heuristics[node.id] || 0}
                  style={{ width: "50px", fontSize: "12px", color: "black" }}
                  onChange={(e) => handleHeuristicChange(node.id, e.target.value)}
                  disabled={isStarted}
                />
              </foreignObject>
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
              <th style={{ padding: "5px", border: "1px solid #ccc" }}>Heuristic</th>
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
                <td style={{ padding: "5px", border: "1px solid #ccc", color: "black" }}>
                  {heuristics[node] || 0}
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
        <p>
          Best Path: <span>{bestPath}</span>
        </p>
      </div>
    </div>
  );
};

export default AStarVisualization;
