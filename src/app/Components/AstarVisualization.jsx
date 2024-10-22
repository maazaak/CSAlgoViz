import React, { useState, useMemo, useCallback } from "react";

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

  const nodes = useMemo(
    () => [
      { id: "S", x: 100, y: 100, status: "unvisited" },
      { id: "A", x: 300, y: 100, status: "unvisited" },
      { id: "B", x: 500, y: 100, status: "unvisited" },
      { id: "C", x: 400, y: 200, status: "unvisited" },
      { id: "D", x: 500, y: 250, status: "unvisited" },
      { id: "G", x: 200, y: 300, status: "unvisited" },
    ],
    []
  );

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

  const handleStartClick = useCallback(() => {
    setIsStarted(true); // Disable inputs when the algorithm starts
    const currentNodes = [...nodes];
    const currentDistances = { ...distances };
    const openList = [];
    const closedList = [];

    const astarStep = () => {
      if (pq.isEmpty()) {
        console.log("A* algorithm completed.");
        const path = getBestPath(currentDistances); // Calculate the best path here after completion
        setBestPath(path); // Immediately update the path after the algorithm finishes

        const pathNodes = path.split(" -> "); // Extract nodes in the best path
        setBestPathNodes(pathNodes); // Update the nodes that should be highlighted
        setOpenNodes(openList.join(", "));
        setClosedNodes(closedList.join(", "));
        return;
      }

      const { node } = pq.dequeue();
      closedList.push(node);
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
            if (targetNode.status !== "closed" && !openList.includes(target)) {
              openList.push(target);
              targetNode.status = "open";
              pq.enqueue({ node: target, distance: newDistance });
            }
          }
        });

      // Update open and closed nodes after each step
      setOpenNodes(openList.join(", "));
      setClosedNodes(closedList.join(", "));
      setDistances(currentDistances);

      setTimeout(astarStep, 1000); // Keep a delay for visualization
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
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
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
        >
          Start Visualization
        </button>
      </div>
      <svg width="600" height="400" style={{ display: "block", margin: "auto" }}>
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
              {/* Weight input */}
              <foreignObject
                x={(sourceNode.x + targetNode.x) / 2 - 10}
                y={(sourceNode.y + targetNode.y) / 2 - 10}
                width="30"
                height="20"
              >
                <input
                  type="number"
                  value={link.weight}
                  style={{ width: "30px", fontSize: "12px", color: "black" }}
                  onChange={(e) => handleWeightChange(index, e.target.value)}
                  disabled={isStarted} // Disable once the algorithm starts
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
                bestPathNodes.includes(node.id) // If the node is part of the best path, make it yellow
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
                value={heuristics[node.id]}
                style={{ width: "50px", fontSize: "12px", color: "black" }}
                onChange={(e) => handleHeuristicChange(node.id, e.target.value)}
                disabled={isStarted} // Disable once the algorithm starts
              />
            </foreignObject>
          </g>
        ))}
      </svg>

      {/* Modified Section for displaying open/closed nodes, heuristics, and best path */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <p>
          Open Nodes: <span>{openNodes}</span>
        </p>
        <p>
          Closed Nodes: <span>{closedNodes}</span>
        </p>
        <p>
          Heuristics:{" "}
          {Object.entries(heuristics)
            .map(([node, hValue]) => `${node}: ${hValue}`)
            .join(", ")}
        </p>
        <p>
          Best Path: <span>{bestPath}</span>
        </p>
      </div>
    </div>
  );
};

export default AStarVisualization;
