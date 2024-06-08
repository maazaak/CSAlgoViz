import React, { useEffect, useState } from 'react';

class Node {
  constructor(value, x, y) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.x = x;
    this.y = y;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
    this.nodePositions = [];
    this.linkPositions = [];
  }

  insert(value, x = 480, y = 50, level = 1) {
    const dx = 240 / (2 ** level);
    let newNode = new Node(value, x, y);
    if (!this.root) {
      this.root = newNode;
      this.nodePositions.push(newNode);
      return this;
    }
    let current = this.root;
    while (true) {
      if (value === current.value) return undefined;
      if (value < current.value) {
        if (current.left === null) {
          current.left = newNode;
          this.nodePositions.push(newNode);
          this.linkPositions.push({
            x1: current.x,
            y1: current.y,
            x2: x - dx,
            y2: y + 50
          });
          return this;
        }
        current = current.left;
        x -= dx;
        y += 50;
      } else {
        if (current.right === null) {
          current.right = newNode;
          this.nodePositions.push(newNode);
          this.linkPositions.push({
            x1: current.x,
            y1: current.y,
            x2: x + dx,
            y2: y + 50
          });
          return this;
        }
        current = current.right;
        x += dx;
        y += 50;
      }
    }
  }

  search(value, setHighlightedNode) {
    let current = this.root;
    const searchPath = [];
    while (current) {
      searchPath.push(current);
      if (value === current.value) {
        break;
      }
      if (value < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    this.animateSearch(searchPath, setHighlightedNode);
    return current;
  }

  animateSearch(searchPath, setHighlightedNode) {
    searchPath.forEach((node, index) => {
      setTimeout(() => {
        setHighlightedNode(node);
      }, index * 1000);
    });
  }

  getNodesAndLinks() {
    return { nodes: this.nodePositions, links: this.linkPositions };
  }
}

const BinarySearchTreeVisualization = () => {
  const [searchValue, setSearchValue] = useState('');
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [highlightedNode, setHighlightedNode] = useState(null);

  useEffect(() => {
    const bst = new BinarySearchTree();
    [15, 10, 20, 8, 12, 17, 25].forEach(value => bst.insert(value));
    const { nodes, links } = bst.getNodesAndLinks();
    setNodes(nodes);
    setLinks(links);
  }, []);

  const handleSearch = () => {
    setHighlightedNode(null);
    const bst = new BinarySearchTree();
    [15, 10, 20, 8, 12, 17, 25].forEach(value => bst.insert(value));
    const result = bst.search(parseInt(searchValue, 10), setHighlightedNode);
    if (result) {
      setTimeout(() => alert(`Value ${searchValue} found in the tree!`), 1000 * result.level);
    } else {
      setTimeout(() => alert(`Value ${searchValue} not found in the tree.`), 1000 * bst.nodePositions.length);
    }
  };

  return (
    <div>
      <input
        type="number"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Enter a value to search"
      />
      <button onClick={handleSearch}>Start Search</button>
      <svg width="960" height="500" style={{ border: '1px solid black' }}>
        {links.map((link, index) => (
          <line
            key={index}
            x1={link.x1}
            y1={link.y1}
            x2={link.x2}
            y2={link.y2}
            stroke="black"
          />
        ))}
        {nodes.map((node, index) => (
          <g key={index} transform={`translate(${node.x}, ${node.y})`}>
            <circle r="15" fill={highlightedNode === node ? 'red' : 'lightblue'} />
            <text dy=".35em" textAnchor="middle">{node.value}</text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default BinarySearchTreeVisualization;
