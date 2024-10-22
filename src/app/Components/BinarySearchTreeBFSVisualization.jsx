"use client";
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

// Node class for Binary Search Tree
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

// Binary Search Tree implementation
class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    // Insert new node in the tree
    insert(value) {
        const newNode = new Node(value);
        if (this.root === null) {
            this.root = newNode;
            return this;
        }
        let current = this.root;
        while (true) {
            if (value < current.value) {
                if (current.left === null || current.left.dummy) {
                    current.left = newNode;
                    return this;
                }
                current = current.left;
            } else if (value > current.value) {
                if (current.right === null || current.right.dummy) {
                    current.right = newNode;
                    return this;
                }
                current = current.right;
            } else {
                return undefined; // Ignore duplicates
            }
        }
    }

    // Remove a node from the tree
    remove(value) {
        this.root = this._removeNode(this.root, value);
    }

    _removeNode(node, value) {
        if (!node) return null;

        if (value < node.value) {
            node.left = this._removeNode(node.left, value);
        } else if (value > node.value) {
            node.right = this._removeNode(node.right, value);
        } else {
            if (!node.left) return node.right;
            if (!node.right) return node.left;

            const temp = this._minValueNode(node.right);
            node.value = temp.value;
            node.right = this._removeNode(node.right, temp.value);
        }
        return node;
    }

    _minValueNode(node) {
        let current = node;
        while (current.left !== null) {
            current = current.left;
        }
        return current;
    }

    // Add dummy nodes where necessary (this is for maintaining structure but not for rendering)
    addDummyNodes(node) {
        if (!node || node.dummy) return; // Skip if node is null or already a dummy

        if (node.left && !node.right) {
            node.right = { value: 'R', dummy: true }; // Only for maintaining structure
        } else if (!node.left && node.right) {
            node.left = { value: 'L', dummy: true }; // Only for maintaining structure
        }

        if (node.left) this.addDummyNodes(node.left);
        if (node.right) this.addDummyNodes(node.right);
    }

    // Prepare tree data for D3 visualization (dummy nodes are included but will be hidden visually)
    prepareForD3(node) {
        if (!node) return null; // Ignore empty nodes

        let children = [];
        if (node.left) children.push(this.prepareForD3(node.left));
        if (node.right) children.push(this.prepareForD3(node.right));

        return {
            value: node.value,
            children: children.length ? children : null, // If no children, set it to null
            dummy: !!node.dummy // Track if it's a dummy node
        };
    }
}

const BSTVisualization = () => {
    const visualizationRef = useRef();
    const [searchValue, setSearchValue] = useState("");
    const [inputValue, setInputValue] = useState(""); // New state to track input value for adding/removing
    const [isSearching, setIsSearching] = useState(false);
    const [bst, setBst] = useState(new BinarySearchTree()); // New state to track BinarySearchTree instance

    // Default values for the tree
    const initialTreeValues = [8, 7, 22, 4, 12, 15, 25, 6];

    // Reset the tree to initial values on component mount or page refresh
    const resetTree = () => {
        const newBst = new BinarySearchTree();
        initialTreeValues.forEach(value => newBst.insert(value));
        newBst.addDummyNodes(newBst.root); // Add dummy nodes for structure (invisible)
        setBst(newBst); // Update the bst state
    };

    // Function to render the tree using D3
    const renderTree = () => {
        const svgWidth = 960, svgHeight = 500;
        const margin = { top: 40, right: 120, bottom: 20, left: 120 };
        const width = svgWidth - margin.left - margin.right;
        const height = svgHeight - margin.top - margin.bottom;

        const svg = d3.select(visualizationRef.current).append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight)
            .attr("viewBox", [-width / 12, -margin.top, width, height + margin.top + margin.bottom])
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const treeLayout = d3.tree()
            .size([width / 2, height / 1.5])
            .separation((a, b) => (a.parent == b.parent ? 1 : 2));

        const drawTree = (treeData) => {
            const root = d3.hierarchy(treeData);
            treeLayout(root);

            const linkGroup = svg.selectAll(".linkGroup")
                .data(root.links())
                .enter().append("g")
                .attr("class", "linkGroup");

            // Drawing the links between nodes, but filtering out dummy node links
            linkGroup.append("line")
                .filter(d => !d.target.data.dummy) // Filter out links leading to dummy nodes
                .attr("class", "link")
                .style("stroke", "#555")
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            // Add L/R labels to the links, but only for non-dummy nodes
            linkGroup.append("text")
                .filter(d => !d.target.data.dummy) // Filter out dummy node labels
                .style("fill", "black")
                .attr("x", d => (d.source.x + d.target.x) / 2)
                .attr("y", d => (d.source.y + d.target.y) / 2)
                .attr("dx", d => d.target.x < d.source.x ? "-10" : "10")
                .attr("dy", "-5")
                .attr("text-anchor", "middle")
                .text(d => d.target.x < d.source.x ? "L" : "R");

            // Nodes in the tree
            const node = svg.selectAll(".node")
                .data(root.descendants())
                .enter().append("g")
                .attr("class", "node")
                .attr("transform", d => `translate(${d.x},${d.y})`);

            // Drawing node circles (dummy nodes are invisible)
            node.append("circle")
                .attr("r", 20)
                .style("fill", d => d.data.dummy ? "green" : "lightsteelblue")
                .style("opacity", d => d.data.dummy ? 0 : 1); // Hide dummy nodes

            // Display node values (only if not a dummy)
            node.append("text")
                .attr("dy", "0.35em")
                .style("text-anchor", "middle")
                .text(d => d.data.dummy ? "" : d.data.value); // Do not display text for dummy nodes
        };

        // Prepare the data and draw the tree
        const preparedData = bst.prepareForD3(bst.root);
        if (preparedData) {
            drawTree(preparedData); // Only draw if we have valid data
        }
    };

    useEffect(() => {
        resetTree(); // Reset the tree to the initial values on mount
    }, []); // Run this effect once on mount

    useEffect(() => {
        renderTree();

        // Cleanup function
        return () => {
            d3.select(visualizationRef.current).selectAll("*").remove();
        };
    }, [bst]); // Add `bst` as a dependency so that it re-renders when the tree is reset

    // Handle adding a new element
    const handleAddElement = () => {
        const value = parseInt(inputValue, 10);
        if (!isNaN(value)) {
            bst.insert(value);
            bst.addDummyNodes(bst.root); // Re-add dummy nodes for structure
            setInputValue("");
            d3.select(visualizationRef.current).selectAll("*").remove();
            renderTree(); // Re-render the tree with the new node
        } else {
            alert("Please enter a valid number.");
        }
    };

    // Handle removing an element
    const handleRemoveElement = () => {
        const value = parseInt(inputValue, 10);
        if (!isNaN(value)) {
            bst.remove(value);
            d3.select(visualizationRef.current).selectAll("*").remove();
            renderTree(); // Re-render the tree after removal
            setInputValue("");
        } else {
            alert("Please enter a valid number.");
        }
    };

    const handleSearchNode = async () => {
        const value = parseInt(searchValue, 10);
        if (!isNaN(value)) {
            highlightAllNodesPending();
            setIsSearching(true);
            const found = await bfs(value);
            setIsSearching(false);
            if (!found) {
                alert("Value not found in the tree.");
            } else {
                alert("Value found in the tree!");
            }
            setSearchValue("");
        } else {
            alert("Please enter a valid number.");
        }
    };

    const highlightAllNodesPending = () => {
        d3.select(visualizationRef.current).selectAll(".node circle")
            .classed("pending", true)
            .style("fill", "lightgrey");
    };

    const bfs = async (searchValue, delay = 1000) => {
        highlightAllNodesPending();

        const queue = [{ node: d3.hierarchy(bst.prepareForD3(bst.root)), depth: 0 }];
        while (queue.length > 0) {
            const { node } = queue.shift();

            await highlightNode(node, 'searching', delay);

            if (node.data.value == searchValue) {
                await highlightNode(node, 'found', delay);
                return true;
            }

            if (node.children) {
                node.children.forEach(child => {
                    if (child) queue.push({ node: child });
                });
            }
        }

        return false;
    };

    const highlightNode = async (node, status, delay) => {
        const circle = d3.select(visualizationRef.current).selectAll(".node circle").filter(d => d.data.value === node.data.value);

        circle.transition().duration(delay / 2).style("fill", () => {
            switch (status) {
                case 'searching':
                    return "lightsteelblue";
                case 'found':
                    return "green";
                default:
                    return "lightgrey";
            }
        }).style('stroke', (status === 'searching') ? 'blue' : 'none')
            .style('stroke-width', (status === 'searching') ? '3px' : '0');

        if (status === 'searching') {
            await new Promise(resolve => setTimeout(resolve, delay));
            if (status !== 'found') {
                circle.transition().duration(delay / 2).style("fill", "lightgrey").style('stroke', 'none');
            }
        }

        await new Promise(resolve => setTimeout(resolve, delay / 1));
    };

    return (
        <div>
            <h1 className="font-bold text-secondary text-center">Binary Search Tree</h1>
            <div className="text-center my-4">
                <input
                    type="number"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    placeholder="Enter Value"
                    className="px-2 py-1 border rounded"
                />
                <button 
                    onClick={handleAddElement}
                    className="ml-2 px-4 py-1 border rounded bg-green-500 text-white"
                >
                    Add Element
                </button>
                <button 
                    onClick={handleRemoveElement}
                    className="ml-2 px-4 py-1 border rounded bg-red-500 text-white"
                >
                    Remove Element
                </button>
            </div>
            <div className="text-center my-4">
                <input
                    type="number"
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)}
                    placeholder="Enter Value to Search"
                    className="px-2 py-1 border rounded"
                    disabled={isSearching}
                />
                <button 
                    onClick={handleSearchNode}
                    className="ml-2 px-4 py-1 border rounded bg-blue-500 text-white"
                    disabled={isSearching}
                >
                    {isSearching ? "Searching..." : "Start Search"}
                </button>
            </div>
            <div ref={visualizationRef} id="visualization"></div>
        </div>
    );
};

export default BSTVisualization;
