import React, { useState, useMemo, useCallback } from "react";

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

  const [isStarted, setIsStarted] = useState(false); // To track if the visualization has started

  const nodes = useMemo(
    () => [
      { id: "A", x: 100, y: 100, status: "unvisited" },
      { id: "B", x: 300, y: 100, status: "unvisited" },
      { id: "D", x: 500, y: 100, status: "unvisited" },
      { id: "C", x: 200, y: 300, status: "unvisited" },
      { id: "E", x: 400, y: 300, status: "unvisited" },
      { id: "F", x: 500, y: 250, status: "unvisited" },
    ],
    []
  );

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

  const handleStartClick = useCallback(() => {
    setIsStarted(true);
    const currentNodes = [...nodes];
    const currentDistances = { ...distances };
    const openList = [];
    const closedList = [];

    const dijkstraStep = () => {
      if (pq.isEmpty()) {
        console.log("Dijkstra's algorithm completed.");
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

      setDistances(currentDistances);
      setOpenNodes(openList.join(", "));
      setClosedNodes(closedList.join(", "));
      setTimeout(dijkstraStep, 2000);
    };

    dijkstraStep();
  }, [nodes, distances, links, pq]);

  return (
    <div>
      <h1 style={{ fontWeight: "bold", textAlign: "center" }}>
        Dijkstra's Algorithm Visualization
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
      <div style={{ display: "flex", justifyContent: "center" }}>
        <svg width="600" height="400">
          {/* Arrowhead marker definition */}
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
                  markerEnd="url(#arrowhead)" // Add arrowhead at the end of the line
                />
                {!isStarted ? (
                  <foreignObject
                    x={(sourceNode.x + targetNode.x) / 2 - 10}
                    y={(sourceNode.y + targetNode.y) / 2 - 10}
                    width="30"
                    height="20"
                  >
                    <input
                      type="number"
                      value={link.weight}
                      style={{ width: "30px", 
                        color: "black",  
                        backgroundColor: "white"  }}
                      onChange={(e) => handleWeightChange(index, e.target.value)}
                    />
                  </foreignObject>
                ) : (
                  <text
                    x={(sourceNode.x + targetNode.x) / 2}
                    y={(sourceNode.y + targetNode.y) / 2 - 5}
                    textAnchor="middle"
                    fill="white"
                  >
                    {link.weight}
                  </text>
                )}
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
      {/* Table positioned below the graph */}
      <div style={{ marginTop: "40px", display: "flex", justifyContent: "center" }}>
        <table
          style={{
            width: "50%", // Adjust table width as needed
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
