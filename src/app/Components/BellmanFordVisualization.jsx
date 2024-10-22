import React, { useState, useMemo } from "react";

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
  const [isStarted, setIsStarted] = useState(false); // Tracks if visualization has started
  const [resultMessage, setResultMessage] = useState("");
  const [currentNode, setCurrentNode] = useState(null); // Track the current node being checked
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
  const [newConnection, setNewConnection] = useState({
    source: "",
    target: "",
    weight: "",
  });

  const handleWeightChange = (index, newWeight) => {
    const updatedLinks = [...links];
    updatedLinks[index].weight = parseInt(newWeight, 10);
    setLinks(updatedLinks);
  };

  const handleAddNode = () => {
    if (!newNode || nodes.find((n) => n.id === newNode)) {
      alert("Node already exists or invalid node name.");
      return;
    }

    const newX = Math.random() * 600;
    const newY = Math.random() * 400;

    setNodes([...nodes, { id: newNode, x: newX, y: newY }]);
    setDistances({
      ...distances,
      [newNode]: { distance: Infinity, parent: null },
    });

    setNewNode(""); // Clear input
  };

  const handleAddConnection = () => {
    // Ensure both source and target nodes exist
    const sourceNode = nodes.find((n) => n.id === newConnection.source);
    const targetNode = nodes.find((n) => n.id === newConnection.target);

    if (!sourceNode || !targetNode) {
      alert("Invalid connection: One of the nodes does not exist.");
      return;
    }

    // Proceed only if both nodes have valid coordinates
    if (sourceNode.x && sourceNode.y && targetNode.x && targetNode.y) {
      const updatedLinks = [
        ...links,
        {
          source: newConnection.source,
          target: newConnection.target,
          weight: parseInt(newConnection.weight, 10),
        },
      ];
      setLinks(updatedLinks);
    } else {
      alert("One of the nodes does not have valid coordinates.");
    }

    // Reset input values
    setNewConnection({ source: "", target: "", weight: "" });
  };

  const handleDeleteNode = (nodeId) => {
    // Remove the node from the nodes array
    const updatedNodes = nodes.filter((node) => node.id !== nodeId);
    setNodes(updatedNodes);

    // Remove all links associated with the node
    const updatedLinks = links.filter(
      (link) => link.source !== nodeId && link.target !== nodeId
    );
    setLinks(updatedLinks);

    // Remove the node from the distances
    const updatedDistances = { ...distances };
    delete updatedDistances[nodeId];
    setDistances(updatedDistances);
  };

  const handleStartClick = () => {
    setIsStarted(true); // Disable input fields after starting
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
        const { source, target, weight } = links[j];
        setCurrentNode(source); // Highlight the current source node
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
      setTimeout(bellmanFordStep, 2000); // Keep delay for visualization
    };

    bellmanFordStep();
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
    <div>
      <h1 style={{ fontWeight: "bold", textAlign: "center" }}>
        Bellman-Ford Algorithm Visualization
      </h1>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        {/* Add Node Section */}
        {!isStarted && (
          <>
            <div>
              <label>
                Add Node:
                <input
                  type="text"
                  value={newNode}
                  onChange={(e) => setNewNode(e.target.value)}
                  style={{ marginLeft: "10px", marginRight: "10px" }}
                />
                <button onClick={handleAddNode}>Add Node</button>
              </label>
            </div>
            <div>
              <label>
                Add Connection:
                <input
                  type="text"
                  placeholder="Source"
                  value={newConnection.source}
                  onChange={(e) =>
                    setNewConnection({
                      ...newConnection,
                      source: e.target.value,
                    })
                  }
                  style={{ marginLeft: "10px", marginRight: "10px" }}
                />
                <input
                  type="text"
                  placeholder="Target"
                  value={newConnection.target}
                  onChange={(e) =>
                    setNewConnection({
                      ...newConnection,
                      target: e.target.value,
                    })
                  }
                  style={{ marginRight: "10px" }}
                />
                <input
                  type="number"
                  placeholder="Weight"
                  value={newConnection.weight}
                  onChange={(e) =>
                    setNewConnection({
                      ...newConnection,
                      weight: e.target.value,
                    })
                  }
                  style={{ marginRight: "10px", width: "50px" }}
                />
                <button onClick={handleAddConnection}>Submit Connection</button>
              </label>
            </div>

            {/* List of Nodes with Delete Button */}
            <div>
              <h3>Nodes:</h3>
              <ul>
                {nodes.map((node) => (
                  <li key={node.id}>
                    {node.id}{" "}
                    <button
                      onClick={() => handleDeleteNode(node.id)}
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        border: "none",
                        borderRadius: "3px",
                        padding: "2px 5px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        <button
          style={{
            backgroundColor: "#007bff",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "20px",
          }}
          onClick={handleStartClick}
        >
          Start Visualization
        </button>
      </div>

      <svg
        width="600"
        height="400"
        style={{ display: "block", margin: "auto", borderStyle: "dashed" }}
      >
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
              fill={currentNode === node.id ? "green" : "#999"} // Highlight the current node
            />
            <text x={node.x} y={node.y + 5} textAnchor="middle" fill="white">
              {node.id}
            </text>
          </g>
        ))}
      </svg>

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
