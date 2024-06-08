"use client";
import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';

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

  search(value, setHighlightedPath) {
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
    this.animateSearch(searchPath, setHighlightedPath);
    return current;
  }

  animateSearch(searchPath, setHighlightedPath) {
    searchPath.forEach((node, index) => {
      setTimeout(() => {
        setHighlightedPath(prev => [...prev, node]);
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
  const [highlightedPath, setHighlightedPath] = useState([]);
  const visualizationRef = useRef();

  useEffect(() => {
    const bst = new BinarySearchTree();
    [15, 10, 20, 8, 12, 17, 25].forEach(value => bst.insert(value));
    const { nodes, links } = bst.getNodesAndLinks();
    setNodes(nodes);
    setLinks(links);

    const svg = d3
      .select(visualizationRef.current)
      .append("svg")
      .attr("width", 960)
      .attr("height", 500)
      .style("display", "block")
      .style("margin", "auto");

    return () => {
      svg.selectAll("*").remove();
    };
  }, []);

  useEffect(() => {
    render();
  }, [nodes, links, highlightedPath]);

  const render = () => {
    const svg = d3.select(visualizationRef.current).select("svg");
    svg.selectAll("line")
      .data(links)
      .join("line")
      .attr("x1", d => d.x1)
      .attr("y1", d => d.y1)
      .attr("x2", d => d.x2)
      .attr("y2", d => d.y2)
      .attr("stroke", d => highlightedPath.some(node => node.x === d.x2 && node.y === d.y2) ? 'red' : 'black');

    svg.selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", 15)
      .attr("fill", d => highlightedPath.includes(d) ? 'red' : 'lightblue');

    svg.selectAll("text")
      .data(nodes)
      .join("text")
      .attr("x", d => d.x)
      .attr("y", d => d.y + 5)
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("fill", "black")
      .text(d => d.value);
  };

  const handleSearch = () => {
    setHighlightedPath([]);
    const bst = new BinarySearchTree();
    [15, 10, 20, 8, 12, 17, 25].forEach(value => bst.insert(value));
    const result = bst.search(parseInt(searchValue, 10), setHighlightedPath);
    if (result) {
      setTimeout(() => alert(`Value ${searchValue} found in the tree!`), 1000 * highlightedPath.length);
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
      <div ref={visualizationRef}></div>
    </div>
  );
};

export default BinarySearchTreeVisualization;
