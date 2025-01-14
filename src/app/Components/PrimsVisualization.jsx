import React, { useState, useCallback, useRef } from "react";

const PrimsVisualization = () => {
  const initialNodes = [
    { id: 'A', x: 100, y: 100 },
    { id: 'D', x: 300, y: 100 },
    { id: 'C', x: 200, y: 200 },
    { id: 'B', x: 100, y: 300 },
    { id: 'F', x: 400, y: 180 },
    { id: 'E', x: 400, y: 300 },
    { id: 'G', x: 500, y: 150 }
  ];

  const initialLinks = [
    { source: 'A', target: 'D', weight: 3 },
    { source: 'A', target: 'B', weight: 2 },
    { source: 'A', target: 'C', weight: 3 },
    { source: 'B', target: 'C', weight: 4 },
    { source: 'B', target: 'E', weight: 3 },
    { source: 'C', target: 'D', weight: 5 },
    { source: 'C', target: 'F', weight: 6 },
    { source: 'C', target: 'E', weight: 1 },
    { source: 'D', target: 'F', weight: 7 },
    { source: 'E', target: 'F', weight: 8 },
    { source: 'F', target: 'G', weight: 9 }
  ];

  const [nodes, setNodes] = useState(initialNodes);
  const [links, setLinks] = useState(initialLinks);
  const [mstEdges, setMstEdges] = useState([]);
  const [mstNodes, setMstNodes] = useState([]);
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showMST, setShowMST] = useState(false);
  const [isAddingNode, setIsAddingNode] = useState(false);
  const [newNode, setNewNode] = useState("");
  const [sourceNode, setSourceNode] = useState("");
  const [destinationNode, setDestinationNode] = useState("");
  const [linkWeight, setLinkWeight] = useState("");
  const [deleteNodeId, setDeleteNodeId] = useState("");
  const [snapshots, setSnapshots] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const isPausedRef = useRef(isPaused);

  const prim = useCallback(async () => {
    const nodesInTree = new Set();
    const edgesInMST = [];
    const availableEdges = [];

    const startNode = nodes[0].id;
    nodesInTree.add(startNode);

    links.forEach((link) => {
      if (link.source === startNode || link.target === startNode) {
        availableEdges.push(link);
      }
    });

    while (nodesInTree.size < nodes.length) {
      if (isPausedRef.current) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        continue;
      }

      availableEdges.sort((a, b) => a.weight - b.weight);

      const selectedEdge = availableEdges.shift();
      const sourceInTree = nodesInTree.has(selectedEdge.source);
      const targetInTree = nodesInTree.has(selectedEdge.target);

      if (sourceInTree && !targetInTree) {
        edgesInMST.push(selectedEdge);
        nodesInTree.add(selectedEdge.target);
      } else if (!sourceInTree && targetInTree) {
        edgesInMST.push(selectedEdge);
        nodesInTree.add(selectedEdge.source);
      } else {
        continue;
      }

      links.forEach((link) => {
        if (
          (nodesInTree.has(link.source) && !nodesInTree.has(link.target)) ||
          (nodesInTree.has(link.target) && !nodesInTree.has(link.source))
        ) {
          availableEdges.push(link);
        }
      });

      setMstEdges([...edgesInMST]);
      setMstNodes([...nodesInTree]);
      saveSnapshot(nodes, edgesInMST, nodesInTree);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    setShowMST(true);
    setIsStarted(false);
  }, [links, nodes]);

  const startVisualization = () => {
    setIsStarted(true);
    prim();
  };

  const handlePauseResumeClick = () => {
    setIsPaused((prev) => {
      const newPausedState = !prev;
      isPausedRef.current = newPausedState;
      return newPausedState;
    });
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

  const handleSVGClick = (e) => {
    if (isAddingNode && newNode) {
      const svgRect = e.target.getBoundingClientRect();
      const newX = e.clientX - svgRect.left;
      const newY = e.clientY - svgRect.top;
      const newNodes = [...nodes, { id: newNode, x: newX, y: newY }];
      setNodes(newNodes);
      setNewNode("");
      setIsAddingNode(false);
    }
  };

  const handleDeleteNodeClick = () => {
    if (deleteNodeId) {
      const updatedNodes = nodes.filter((node) => node.id !== deleteNodeId);
      const updatedLinks = links.filter(
        (link) => link.source !== deleteNodeId && link.target !== deleteNodeId
      );
      setNodes(updatedNodes);
      setLinks(updatedLinks);
      setDeleteNodeId("");
    }
  };

  const saveSnapshot = (currentNodes, currentEdges, currentMstNodes) => {
    setSnapshots((prevSnapshots) => [
      ...prevSnapshots,
      {
        nodes: JSON.parse(JSON.stringify(currentNodes)),
        edges: JSON.parse(JSON.stringify(currentEdges)),
        mstNodes: JSON.parse(JSON.stringify([...currentMstNodes])),
      },
    ]);
    setCurrentStepIndex(snapshots.length);
  };

  const handleSnapshotChange = (e) => {
    const selectedStepIndex = parseInt(e.target.value, 10);
    if (snapshots[selectedStepIndex]) {
      const snapshot = snapshots[selectedStepIndex];
      setNodes(snapshot.nodes);
      setMstEdges(snapshot.edges);
      setMstNodes(snapshot.mstNodes);
      setCurrentStepIndex(selectedStepIndex);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <h1 style={{ color: "#f8f9fa", marginBottom: "20px" }}>Kruskal's Algorithm Visualization</h1>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px",
        marginBottom: "20px",
        width: "80%",
      }}
    >
      <div>
        <label style={{ color: "#f8f9fa" }}>Node Name:</label>
        <input
          type="text"
          value={newNode}
          onChange={(e) => setNewNode(e.target.value)}
          style={{ width: "100%", padding: "10px", marginTop: "5px", color: "black" }}
        />
        <button
          onClick={handleAddNodeClick}
          style={{
            backgroundColor: "#28a745",
            color: "white",
            padding: "10px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            width: "100%",
            marginTop: "10px",
          }}
        >
          Add Node
        </button>
      </div>
      <div>
        <label style={{ color: "#f8f9fa" }}>Source:</label>
        <input
          type="text"
          value={sourceNode}
          onChange={(e) => setSourceNode(e.target.value)}
          style={{ width: "100%", padding: "10px", marginTop: "5px", color: "black" }}
        />
        <label style={{ color: "#f8f9fa", marginTop: "10px", display: "block" }}>Destination:</label>
        <input
          type="text"
          value={destinationNode}
          onChange={(e) => setDestinationNode(e.target.value)}
          style={{ width: "100%", padding: "10px", marginTop: "5px", color: "black" }}
        />
        <label style={{ color: "#f8f9fa", marginTop: "10px", display: "block" }}>Weight:</label>
        <input
          type="number"
          value={linkWeight}
          onChange={(e) => setLinkWeight(e.target.value)}
          style={{ width: "100%", padding: "10px", marginTop: "5px", color: "black" }}
        />
        <button
          onClick={handleAddLinkClick}
          style={{
            backgroundColor: "#28a745",
            color: "white",
            padding: "10px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            width: "100%",
            marginTop: "10px",
          }}
        >
          Add Link
        </button>
      </div>
      <div>
        <label style={{ color: "#f8f9fa" }}>Node to Delete:</label>
        <input
          type="text"
          value={deleteNodeId}
          onChange={(e) => setDeleteNodeId(e.target.value)}
          style={{ width: "100%", padding: "10px", marginTop: "5px", color: "black" }}
        />
        <button
          onClick={handleDeleteNodeClick}
          style={{
            backgroundColor: "#dc3545",
            color: "white",
            padding: "10px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            width: "100%",
            marginTop: "10px",
          }}
        >
          Delete Node
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
          onClick={startVisualization}
        >
          Start Visualization
        </button>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          border: "2px dashed #007bff",
          padding: "20px",
          borderRadius: "10px",
        }}
        onClick={handleSVGClick}
      >
        <svg width="600" height="400">
          <defs>
            <marker
              id="arrow"
              markerWidth="10"
              markerHeight="7"
              refX="10"
              refY="3.5"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="#000" />
            </marker>
          </defs>

          {(showMST ? mstEdges : links).map((link, index) => {
            const sourceNode = nodes.find((n) => n.id === link.source);
            const targetNode = nodes.find((n) => n.id === link.target);
            const isMSTEdge = mstEdges.some(
              (e) => e.source === link.source && e.target === link.target
            );
            return (
              <g key={index}>
                <line
                  x1={sourceNode.x}
                  y1={sourceNode.y}
                  x2={targetNode.x}
                  y2={targetNode.y}
                  stroke={isMSTEdge ? "green" : "#aaa"}
                  strokeWidth="2"
                  markerEnd="url(#arrow)"
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
                cx={node.x}
                cy={node.y}
                r={20}
                stroke="black"
                strokeWidth={2}
                fill={mstNodes.includes(node.id) ? "green" : "white"}
              />
              <text x={node.x} y={node.y + 5} textAnchor="middle" fill="black">
                {node.id}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h3 style={{ color: "#f8f9fa" }}>Edges in MST:</h3>
        <ul style={{ listStyleType: "none", padding: 0, color: "#f8f9fa" }}>
          {mstEdges.map((edge, index) => (
            <li key={index}>
              {edge.source} &rarr; {edge.target} ({edge.weight})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PrimsVisualization;
