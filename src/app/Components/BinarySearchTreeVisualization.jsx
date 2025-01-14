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

    insert(value) {
        let newNode = new Node(value);
        if (!this.root) {
            this.root = newNode;
            return this;
        }

        let current = this.root;

        while (current) {
            if (value === current.value) return undefined; // Ignore duplicates

            if (value < current.value) {
                if (current.left === null || current.left.dummy) {
                    current.left = newNode;
                    return this;
                }
                current = current.left;
            } else {
                if (current.right === null || current.right.dummy) {
                    current.right = newNode;
                    return this;
                }
                current = current.right;
            }
        }
    }

    remove(value) {
        this.root = this._removeNode(this.root, value);
    }

    _removeNode(node, value) {
        if (node === null) return null;

        if (value < node.value) {
            node.left = this._removeNode(node.left, value);
        } else if (value > node.value) {
            node.right = this._removeNode(node.right, value);
        } else {
            if (node.left === null) return node.right;
            if (node.right === null) return node.left;

            let temp = this._minValueNode(node.right);
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

    addDummyNodes(node) {
        if (!node || node.dummy) return;

        if (node.left && !node.right) {
            node.right = { value: 'R', dummy: true };
        } else if (!node.left && node.right) {
            node.left = { value: 'L', dummy: true };
        }

        if (node.left) this.addDummyNodes(node.left);
        if (node.right) this.addDummyNodes(node.right);
    }

    prepareForD3(node) {
        if (!node) return null;

        let children = [];
        if (node.left) children.push(this.prepareForD3(node.left));
        if (node.right) children.push(this.prepareForD3(node.right));

        return {
            value: node.value,
            children: children.length ? children : null,
            dummy: !!node.dummy
        };
    }
}

const BSTVisualization = () => {
    const visualizationRef = useRef();
    const [searchValue, setSearchValue] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [highlightedPath, setHighlightedPath] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [bst, setBst] = useState(new BinarySearchTree());

    const initialTreeValues = [8, 7, 22, 4, 12, 15, 25, 6, 3];

    const resetTree = () => {
        const newBst = new BinarySearchTree();
        initialTreeValues.forEach(value => newBst.insert(value));
        newBst.addDummyNodes(newBst.root);
        setBst(newBst);
    };

    const renderTree = () => {
        const svgWidth = 960, svgHeight = 500;
        const margin = { top: 40, right: 50, bottom: 20, left: -50 };
        const width = svgWidth - margin.left - margin.right;
        const height = svgHeight - margin.top - margin.bottom;

        const svg = d3.select(visualizationRef.current).append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight)
            .attr("viewBox", [-width / 6, -margin.top, width, height + margin.top + margin.bottom])
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const treeLayout = d3.tree()
            .size([width / 2, height / 1.5])
            .separation((a, b) => (a.parent === b.parent ? 1 : 2));

        const drawTree = (treeData) => {
            const root = d3.hierarchy(treeData);
            treeLayout(root);

            const linkGroup = svg.selectAll(".linkGroup")
                .data(root.links())
                .enter().append("g")
                .attr("class", "linkGroup");

            linkGroup.append("line")
                .filter(d => !d.target.data.dummy)
                .attr("class", "link")
                .style("stroke", "#555")
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            linkGroup.append("text")
                .filter(d => !d.target.data.dummy)
                .style("fill", "black")
                .attr("x", d => (d.source.x + d.target.x) / 2)
                .attr("y", d => (d.source.y + d.target.y) / 2)
                .attr("dx", d => d.target.x < d.source.x ? "-10" : "10")
                .attr("dy", "-5")
                .attr("text-anchor", "middle")
                .text(d => d.target.x < d.source.x ? "L" : "R");

            const node = svg.selectAll(".node")
                .data(root.descendants())
                .enter().append("g")
                .attr("class", "node")
                .attr("transform", d => `translate(${d.x},${d.y})`);

            node.append("circle")
                .attr("r", 20)
                .style("fill", d => highlightedPath.includes(d.data) ? "orange" : "lightsteelblue")
                .style("opacity", d => d.data.dummy ? 0 : 1);

            node.append("text")
                .attr("dy", "0.35em")
                .style("text-anchor", "middle")
                .text(d => d.data.dummy ? "" : d.data.value);
        };

        const preparedData = bst.prepareForD3(bst.root);
        if (preparedData) {
            drawTree(preparedData);
        }
    };

    useEffect(() => {
        resetTree();
    }, []);

    useEffect(() => {
        d3.select(visualizationRef.current).selectAll("*").remove();
        renderTree();

        return () => {
            d3.select(visualizationRef.current).selectAll("*").remove();
        };
    }, [highlightedPath, bst]);

    const handleAddElement = () => {
        const value = parseInt(inputValue, 10);
        if (!isNaN(value)) {
            bst.insert(value);
            bst.addDummyNodes(bst.root);
            setInputValue("");
            d3.select(visualizationRef.current).selectAll("*").remove();
            renderTree();
        } else {
            alert("Please enter a valid number.");
        }
    };

    const handleRemoveElement = () => {
        const value = parseInt(inputValue, 10);
        if (!isNaN(value)) {
            bst.remove(value);
            d3.select(visualizationRef.current).selectAll("*").remove();
            renderTree();
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
            const found = await dfs(d3.hierarchy(bst.prepareForD3(bst.root)), value);
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

    // Check pause state function to be used anywhere we need to ensure pausing
    const checkPause = async () => {
        while (isPaused) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    };

    const dfs = async (current, value, delay = 1000, path = []) => {
        if (!current || current.data.dummy) return false;

        // Check pause before processing this node
        await checkPause();

        path.push(current);
        await highlightNode(current, 'searching', delay);

        if (current.data.value === value) {
            await highlightNode(current, 'found', delay);
            return true;
        }

        await highlightNode(current, 'checked', delay);

        if (current.children) {
            for (let child of current.children) {
                // Check pause before recursing
                await checkPause();

                let found = await dfs(child, value, delay, path);
                if (found) return true;
            }
        }

        path.pop();
        if (path.length) {
            await highlightNode(path[path.length - 1], 'backtracking', delay);
        }

        return false;
    };

    const highlightNode = async (node, status, delay) => {
        // Check pause at the start
        await checkPause();

        const circle = d3.select(visualizationRef.current)
            .selectAll(".node circle")
            .filter(d => d.data.value === node.data.value);

        circle.transition()
            .duration(delay / 2)
            .style("fill", () => {
                switch (status) {
                    case 'searching':     return "lightblue";
                    case 'found':         return "green";
                    case 'checked':       return "red";
                    case 'backtracking':  return "orange";
                    default:              return "lightsteelblue";
                }
            });

        // Wait in small increments, checking for pause
        let elapsed = 0;
        const interval = 100;
        while (elapsed < delay) {
            await checkPause();
            await new Promise(resolve => setTimeout(resolve, interval));
            elapsed += interval;
        }
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
                <button
                    onClick={() => setIsPaused(prev => !prev)}
                    className="ml-2 px-4 py-1 border rounded bg-yellow-500 text-white"
                >
                    {isPaused ? "Resume" : "Pause"}
                </button>
            </div>
            <div ref={visualizationRef} id="visualization"></div>
        </div>
    );
};

export default BSTVisualization;
