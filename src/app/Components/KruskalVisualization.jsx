import React, { useState, useCallback } from "react";

const KruskalVisualization = () => {
  const initialNodes = [
    { id: "A", x: 100, y: 100 },
    { id: "B", x: 300, y: 100 },
    { id: "C", x: 500, y: 100 },
    { id: "D", x: 200, y: 300 },
    { id: "E", x: 400, y: 300 },
  ];

  const initialLinks = [
    { source: "A", target: "B", weight: 4 },
    { source: "A", target: "D", weight: 2 },
    { source: "B", target: "C", weight: 6 },
    { source: "B", target: "D", weight: 5 },
    { source: "B", target: "E", weight: 3 },
    { source: "C", target: "E", weight: 7 },
    { source: "D", target: "E", weight: 3 },
  ];

  const [nodes, setNodes] = useState(initialNodes);
  const [links, setLinks] = useState(initialLinks);
  const [mstEdges, setMstEdges] = useState([]);
  const [mstNodes, setMstNodes] = useState([]);
  const [isStarted, setIsStarted] = useState(false);
  const [showMST, setShowMST] = useState(false);
  const [isAddingNode, setIsAddingNode] = useState(false);
  const [newNode, setNewNode] = useState("");
  const [sourceNode, setSourceNode] = useState("");
  const [destinationNode, setDestinationNode] = useState("");
  const [linkWeight, setLinkWeight] = useState("");
  const [deleteNodeId, setDeleteNodeId] = useState("");

  const handleWeightChange = (index, newWeight) => {
    const updatedLinks = [...links];
    updatedLinks[index].weight = parseFloat(newWeight);
    setLinks(updatedLinks);
  };

  const find = (parent, i) => {
    if (parent[i] === i) return i;
    return find(parent, parent[i]);
  };

  const union = (parent, rank, x, y) => {
    const xroot = find(parent, x);
    const yroot = find(parent, y);
    if (rank[xroot] < rank[yroot]) parent[xroot] = yroot;
    else if (rank[xroot] > rank[yroot]) parent[yroot] = xroot;
    else {
      parent[yroot] = xroot;
      rank[xroot]++;
    }
  };

  const kruskal = useCallback(async () => {
    const V = nodes.length;
    let edges = [...links].sort((a, b) => a.weight - b.weight);

    const parent = Array(V)
      .fill(0)
      .map((_, i) => i);
    const rank = Array(V).fill(0);
    let e = 0;
    let i = 0;
    const mstEdgesResult = [];
    const mstNodesResult = new Set();

    while (e < V - 1 && i < edges.length) {
      const { source, target, weight } = edges[i++];
      const x = find(parent, nodes.findIndex((n) => n.id === source));
      const y = find(parent, nodes.findIndex((n) => n.id === target));

      if (x !== y) {
        mstEdgesResult.push({ source, target, weight });
        mstNodesResult.add(source);
        mstNodesResult.add(target);
        union(parent, rank, x, y);
        setMstEdges([...mstEdgesResult]);
        setMstNodes([...mstNodesResult]);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
    setShowMST(true); // Show only MST edges
    setIsStarted(false);
  }, [links, nodes]);

  const startVisualization = () => {
    setIsStarted(true);
    kruskal();
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
      setIsAddingNode(false); // Reset flag after adding node
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

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1>Kruskal's Algorithm Visualization</h1>
      <div style={{ marginBottom: "20px" }}>
        <label>
          Node Name:
          <input
            type="text"
            value={newNode}
            onChange={(e) => setNewNode(e.target.value)}
            style={{ marginRight: "10px" ,color: "black"}}
          />
        </label>
        <button onClick={handleAddNodeClick} style={{ marginRight: "10px" }}>
          Add Node
        </button>
        <br />
        <label>
          Source:
          <input
            type="text"
            value={sourceNode}
            onChange={(e) => setSourceNode(e.target.value)}
            style={{ marginRight: "10px", marginTop: "10px" ,color: "black" }}
          />
        </label>
        <label>
          Destination:
          <input
            type="text"
            value={destinationNode}
            onChange={(e) => setDestinationNode(e.target.value)}
            style={{ marginRight: "10px", marginTop: "10px" ,color: "black" }}
          />
        </label>
        <label>
          Weight:
          <input
            type="number"
            value={linkWeight}
            onChange={(e) => setLinkWeight(e.target.value)}
            style={{ marginRight: "10px", marginTop: "10px" ,color: "black"}}
          />
        </label>
        <button onClick={handleAddLinkClick} style={{ marginTop: "10px" }}>
          Add Link
        </button>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>
          Node to Delete:
          <input
            type="text"
            value={deleteNodeId}
            onChange={(e) => setDeleteNodeId(e.target.value)}
            style={{ marginRight: "10px", marginTop: "10px", color: "black" }}
          />
        </label>
        <button onClick={handleDeleteNodeClick} style={{ marginTop: "10px" }}>
          Delete Node
        </button>
      </div>

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
          {/* Define arrowhead marker */}
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
                  markerEnd="url(#arrow)" // Attach the arrowhead marker
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
        <h3>Edges in MST:</h3>
        <ul style={{ listStyleType: "none", padding: 0 }}>
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

export default KruskalVisualization;
