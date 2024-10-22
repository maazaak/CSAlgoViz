"use client";

import BubbleSortViz from "@/app/Components/BubbleSortViz";
import Footer from "@/app/Components/Footer";
import PrismLoader from "@/app/Components/PrismLoader";
import BinarySearchTreeVisualization from "@/app/Components/BinarySearchTreeVisualization";
import BinarySearchTreeBFSVisualization from "@/app/Components/BinarySearchTreeBFSVisualization";
import QuickSortVisualization from "@/app/Components/QuickSort";
import Link from "next/link";
import React from "react";
import AStarVisualization from "@/app/Components/AstarVisualization";
import KruskalVisualization from "@/app/Components/KruskalVisualization";
import { useSession } from "next-auth/react";
import DijkstraVisualization from "@/app/Components/DijkstraVisualization";
import PrimsVisualization from "@/app/Components/PrimsVisualization";
import BellmanFordVisualization from "@/app/Components/BellmanFordVisualization";

const course = {
  title: "Data Structures",
  concepts: [
    {
      name: "Bubble Sort",
      code: `function bubbleSort(arr) {
        let n = arr.length;
        let swapped;
        do {
            swapped = false;
            for (let i = 0; i < n - 1; i++) {
                if (arr[i] > arr[i + 1]) {
                    // Swap the elements
                    let temp = arr[i];
                    arr[i] = arr[i + 1];
                    arr[i + 1] = temp;
                    swapped = true;
                }
            }
            // Reduce n because the last element is already in place
            n--;
        } while (swapped);
      }`,
      visualizationComponent: BubbleSortViz,
      explanation: `Bubble Sort is a simple sorting algorithm that repeatedly
                    steps through the list to be sorted, compares each pair of
                    adjacent items, and swaps them if they are in the wrong
                    order. The pass through the list is repeated until no swaps
                    are needed, which means the list is sorted. The algorithm
                    gets its name because smaller elements "bubble" to the top
                    of the list (beginning of the list) with each iteration,
                    while the larger elements sink to the bottom (end of the
                    list). Despite its simplicity, Bubble Sort is not suitable
                    for large datasets as its average and worst-case complexity
                    are both quadratic, making it inefficient compared to more
                    advanced sorting algorithms like quicksort or mergesort.
                    However, its simplicity and the fact that it makes no more
                    than \(n-1\) swaps in the best case (when the list is
                    already sorted) can make it useful for small datasets or as
                    an educational tool to introduce sorting algorithms.`,
    },
    {
      name: "Binary Search Tree DFS",
      code: `class Node {
        constructor(value) {
          this.value = value;
          this.left = null;
          this.right = null;
        }
      }
      
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
          while (true) {
            if (value === current.value) return undefined; // Ignore duplicates
            if (value < current.value) {
              if (current.left === null) {
                current.left = newNode;
                return this;
              }
              current = current.left;
            } else {
              if (current.right === null) {
                current.right = newNode;
                return this;
              }
              current = current.right;
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
      }`,
      visualizationComponent: BinarySearchTreeVisualization,
      explanation: `A Binary Search Tree (BST) is a node-based binary tree data structure which has the following properties:
                    - The left subtree of a node contains only nodes with keys less than the node’s key.
                    - The right subtree of a node contains only nodes with keys greater than the node’s key.
                    - The left and right subtree each must also be a binary search tree.`,
    },
    {
      name: "Binary Search Tree BFS",
      code: `class Node {
        constructor(value) {
          this.value = value;
          this.left = null;
          this.right = null;
        }
      }
      
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
          while (true) {
            if (value === current.value) return undefined; // Ignore duplicates
            if (value < current.value) {
              if (current.left === null) {
                current.left = newNode;
                return this;
              }
              current = current.left;
            } else {
              if (current.right === null) {
                current.right = newNode;
                return this;
              }
              current = current.right;
            }
          }
        }
      
        bfs(value, setHighlightedPath) {
          const queue = [this.root];
          const searchPath = [];
          while (queue.length) {
            const node = queue.shift();
            searchPath.push(node);
            if (node.value === value) {
              break;
            }
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
          }
          this.animateSearch(searchPath, setHighlightedPath);
          return searchPath[searchPath.length - 1];
        }
      
        animateSearch(searchPath, setHighlightedPath) {
          searchPath.forEach((node, index) => {
            setTimeout(() => {
              setHighlightedPath(prev => [...prev, node]);
            }, index * 1000);
          });
        }
      }`,
      visualizationComponent: BinarySearchTreeBFSVisualization,
      explanation: `Breadth First Search (BFS) is an algorithm for traversing or searching tree or graph data structures. 
                    It starts at the tree root (or some arbitrary node of a graph, sometimes referred to as a 'search key') 
                    and explores the neighbor nodes at the present depth prior to moving on to the nodes at the next depth level.`,
    },
    {
      name: "Quick Sort",
      code: `const data = [3, 2, 5, 0, 1, 8, 7, 6, 9, 4].map((d, i) => ({ value: d, index: i, position: i }));
const width = 620;
const height = 1000;

const svg = d3.select("#visualization")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("display", "block")
    .style("margin", "auto");

// Define pointer paths for visual indicators
const pointerPath = "M0,0 L10,10 L5,5 L5,-5 L-5,-5 L-5,5 L-10,10 Z";
let redPointer = svg.append("path")
    .attr("d", pointerPath)
    .attr("fill", "red")
    .attr("transform", "translate(50, 50)"); // Initial position of red pointer

let greenPointer = svg.append("path")
    .attr("d", pointerPath)
    .attr("fill", "green")
    .attr("transform", "translate(50, 110)"); // Initial position of green pointer

// Initial rendering of the unsorted array
render(data, 0);

function render(data, offsetY) {
    const update = svg.selectAll(\`circle.iteration\${data[0].iteration}\`)
        .data(data, d => d.index);

   
        update.enter()
        .append("circle")
        .attr("class", d => d.isPivot ? "circle-pivot" : "circle-default")
        .attr("r", 20)
        .attr("cx", d => d.position * 60 + 50 )
        .attr("cy", 80 + offsetY)
        

    update.transition()
        .duration(500)
        .attr("cx", d => d.position * 60 + 50)
        .attr("class", d => d.isPivot ? "circle-pivot" : "circle-default")

    const textUpdate = svg.selectAll(\`text.iteration\${data[0].iteration}\`)
        .data(data, d => d.index);

    textUpdate.enter()
        .append("text")
        .attr("x", d => d.position * 60 + 50 )
        .attr("y", 85 + offsetY)
        .attr("text-anchor", "middle")
        .text(d => d.value);

    textUpdate.transition()
        .duration(500)
        .attr("x", d => d.position * 60 + 50 );
}

function updateSubArrayPositions(subArray, startOffset) {
    return subArray.map((item, index) => ({
        ...item,
        position: startOffset + index  // Adjust position based on offset
    }));
}

let intervalSpeed = 1000;  // Default speed
let finalPositions = Array(data.length).fill(null);  // Array to store the final positions of elements
let timeoutHandle;  // Global handle for the timeout


function quickSortVisual(array, offsetY, firstCall = true) {
    let queue = [{ array, offsetY, firstCall }];

    function processQueue() {
        if (queue.length === 0) {
            
            setTimeout(() => {  // Use setTimeout to allow the current rendering to complete before clearing             
            
                renderFinalSortedArray();
            console.log("All sorting complete.");
        }, intervalSpeed);
            return;
        }

    let { array, offsetY, firstCall } = queue.shift();
    const start = 0;
    const end = array.length - 1;
    let baseOffset = start * 60;

    if (end === start) { // Special case for single-element arrays
       
        array[start].isPivot = true; // Mark the single element as pivot
        finalPositions[array[start].index] = array[start];  // Store the final position

        render([...array], offsetY);
        processQueue();
        return;
    }

    if (end <= start) {
        if (firstCall) {
            alert("First iteration complete.");
        }
        finalPositions[array[start].index] = array[start];  // Store the final position
        processQueue();
        return;
    }

    

    const pivotValue = array[end].value;
    array[end].isPivot = true;
    finalPositions[array[end].index] = array[end];  // Immediately store the pivot in the final positions array
    console.log("Pivot set for value:", array[end].value);
    render([...array], offsetY); // Ensure pivot is highlighted right at the start
    // Position pointers at the start of the sorting process
    redPointer.attr("transform", \`translate(\${array[start].position * 60 + 50}, \${offsetY + 50})\`);
    greenPointer.attr("transform", \`translate(\${array[start].position * 60 + 50}, \${offsetY + 110})\`);

    
    
    let i = start, j = start;
    let interval = setInterval(() => {
        if (i <= end) {
            if (i === end) {
                array[i].isPivot = true; // Ensure the pivot is always highlighted
            }
            render([...array], offsetY); // Update visual state

            // Move red pointer to the current element being compared
            redPointer.transition().duration(500)
                .attr("transform", \`translate(\${array[i].position * 60 + 50}, \${offsetY + 50})\`);

            if (array[i].value <= pivotValue) {
                if (i != j) {
                    [array[j], array[i]] = [array[i], array[j]]; // Swap elements
                    [array[j].position, array[i].position] = [array[i].position, array[j].position]; // Correct positions after swap
                }
                render([...array], offsetY);

                greenPointer.transition().duration(500)
                    .attr("transform", \`translate(\${array[j].position * 60 + 50}, \${offsetY + 110})\`);
                
                j++;
            }
            i++;
        } else {
            clearInterval(interval);
            [array[j], array[end]] = [array[end], array[j]]; // Swap pivot to correct position
            [array[j].position, array[end].position] = [array[end].position, array[j].position]; // Correct positions for pivot
            finalPositions[array[j].index] = array[j];  // Store the final position
            console.log(finalPositions[array[j]]);
            array[j].isPivot = false; // Unhighlight the pivot

            let pivotPosition = array[j].position; // Position of the pivot after the swap
            let leftSubArray = array.slice(start, j-1);
            let rightSubArray = array.slice(j, end+1);
            
            let temp = rightSubArray[0];
            rightSubArray[0] = rightSubArray[rightSubArray.length - 1];
            rightSubArray[rightSubArray.length - 1] = temp;
            
            
            console.log("Right sub array values:");
            rightSubArray.forEach(item => console.log(item.value));
            console.log("No of elements in left sub array:");
            console.log(leftSubArray.length);

            let leftOffset = pivotPosition-leftSubArray.length; // Left sub-array starts where the original started
            let rightOffset = pivotPosition; // Right sub-array starts right after the left


            leftSubArray=updateSubArrayPositions(leftSubArray,leftOffset-1);
            rightSubArray=updateSubArrayPositions(rightSubArray,rightOffset);

           //render(leftSubArray, offsetY + 100); // Render the left sub-array below the original
           //render(rightSubArray, offsetY + 100); // Render right sub-array next to the left
                
            // Recursively sort the sub-arrays
            if (leftSubArray.length > 0)
                queue.push({ array: leftSubArray, offsetY: offsetY + 100, firstCall: false });
            if (rightSubArray.length > 0)
                queue.push({ array: rightSubArray, offsetY: offsetY + 100, firstCall: false });
            processQueue();
        }
    }, intervalSpeed);
}
function renderFinalSortedArray() {
    // Ensure no null entries and sort by value
    finalPositions = finalPositions.filter(el => el !== null);
    finalPositions.sort((a, b) => a.value - b.value);  // Sort by value

    console.log("Sorted final positions array:", finalPositions.map(item => item.value));

    // Clear the previous visualizations
    svg.selectAll("*").remove();

    // Add a label "Sorting Completed"
    svg.append("text")
        .attr("x", width / 2)  // Center the text horizontally
        .attr("y", 50)          // Set vertical position, adjust as necessary
        .attr("text-anchor", "middle")  // Center the text by its middle
        .attr("font-size", "24px")  // Set the font size
        .attr("fill", "black")      // Set the text color
        .text("Sorting Completed");

    // Render sorted array
    render(finalPositions, 100);  // Adjust the offsetY if needed
}
processQueue();
}

document.getElementById("startSort").addEventListener("click", () => {
    quickSortVisual(data, 0, true);
});

document.getElementById("speedUp").addEventListener("click", () => {
    intervalSpeed = Math.max(100, intervalSpeed - 200);  // Decrease delay, minimum 100ms
    console.log("Speed increased, current speed:", intervalSpeed, "ms");
});

document.getElementById("slowDown").addEventListener("click", () => {
    intervalSpeed += 200;  // Increase delay
    console.log("Speed decreased, current speed:", intervalSpeed, "ms");
});`,
      visualizationComponent: QuickSortVisualization,
      explanation: `Quick Sort is a highly efficient sorting algorithm and is based on partitioning an array into sub-arrays. It follows the divide-and-conquer approach.

                    Here is how it works:

                    - A pivot element is chosen from the array.
                    - The array is partitioned into two sub-arrays: elements less than the pivot and elements greater than or equal to the pivot.
                    - The pivot element is placed in its correct position in the sorted array.
                    - The above steps are recursively applied to the sub-arrays formed.

                    Quick Sort is faster in practice compared to other O(n log n) algorithms like Merge Sort or Heap Sort. It also has an average-case time complexity of O(n log n). However, its worst-case time complexity is O(n^2), which occurs when the smallest or largest element is always chosen as the pivot.

                    Quick Sort is widely used due to its in-place sorting (it doesn't require additional storage) and cache efficiency.`,
    },
    {
      name: "Dijkstra Algorithm",
      code: `class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(val, priority) {
    this.values.push({ val, priority });
    this.sort();
  }

  dequeue() {
    return this.values.shift();
  }

  sort() {
    this.values.sort((a, b) => a.priority - b.priority);
  }
}

class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }

  addEdge(vertex1, vertex2, weight) {
    this.adjacencyList[vertex1].push({ node: vertex2, weight });
    this.adjacencyList[vertex2].push({ node: vertex1, weight }); // Assuming undirected graph
  }

  dijkstra(start, finish) {
    const nodes = new PriorityQueue();
    const distances = {};
    const previous = {};
    let path = []; // To return at the end
    let smallest;

    // Initialize distances and priority queue
    for (let vertex in this.adjacencyList) {
      if (vertex === start) {
        distances[vertex] = 0;
        nodes.enqueue(vertex, 0);
      } else {
        distances[vertex] = Infinity;
        nodes.enqueue(vertex, Infinity);
      }
      previous[vertex] = null;
    }

    // As long as there are nodes to process
    while (nodes.values.length) {
      smallest = nodes.dequeue().val;

      if (smallest === finish) {
        // Build path to return
        while (previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }
        break;
      }

      if (smallest || distances[smallest] !== Infinity) {
        for (let neighbor in this.adjacencyList[smallest]) {
          let nextNode = this.adjacencyList[smallest][neighbor];
          
          // Calculate new distance
          let candidate = distances[smallest] + nextNode.weight;
          let nextNeighbor = nextNode.node;
          
          if (candidate < distances[nextNeighbor]) {
            // Update new smallest distance to neighbor
            distances[nextNeighbor] = candidate;
            // Update previous - how we got to neighbor
            previous[nextNeighbor] = smallest;
            // Enqueue in priority queue with new priority
            nodes.enqueue(nextNeighbor, candidate);
          }
        }
      }
    }

    return path.concat(smallest).reverse();
  }
}

// Example usage
const graph = new WeightedGraph();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");

graph.addEdge("A", "B", 4);
graph.addEdge("A", "C", 2);
graph.addEdge("B", "E", 3);
graph.addEdge("C", "D", 2);
graph.addEdge("C", "F", 4);
graph.addEdge("D", "E", 3);
graph.addEdge("D", "F", 1);
graph.addEdge("E", "F", 1);

// Find the shortest path from A to E
const shortestPath = graph.dijkstra("A", "E");
console.log(shortestPath); // Output: [ 'A', 'C', 'D', 'F', 'E' ]
`,
      visualizationComponent: DijkstraVisualization,
      explanation: `Dijkstra's Algorithm is a shortest-path algorithm used to find the shortest path between two nodes in a weighted graph. It is especially useful when all edge weights are non-negative. The algorithm ensures that the path with the smallest cumulative distance is chosen at each step.`,
    },
    {
      name: "Astar Algorithm",
      code: `class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(val, priority) {
    this.values.push({ val, priority });
    this.sort();
  }

  dequeue() {
    return this.values.shift();
  }

  sort() {
    this.values.sort((a, b) => a.priority - b.priority);
  }
}

class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }

  addEdge(vertex1, vertex2, weight) {
    this.adjacencyList[vertex1].push({ node: vertex2, weight });
    this.adjacencyList[vertex2].push({ node: vertex1, weight }); // Assuming undirected graph
  }

  dijkstra(start, finish) {
    const nodes = new PriorityQueue();
    const distances = {};
    const previous = {};
    let path = []; // To return at the end
    let smallest;

    // Initialize distances and priority queue
    for (let vertex in this.adjacencyList) {
      if (vertex === start) {
        distances[vertex] = 0;
        nodes.enqueue(vertex, 0);
      } else {
        distances[vertex] = Infinity;
        nodes.enqueue(vertex, Infinity);
      }
      previous[vertex] = null;
    }

    // As long as there are nodes to process
    while (nodes.values.length) {
      smallest = nodes.dequeue().val;

      if (smallest === finish) {
        // Build path to return
        while (previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }
        break;
      }

      if (smallest || distances[smallest] !== Infinity) {
        for (let neighbor in this.adjacencyList[smallest]) {
          let nextNode = this.adjacencyList[smallest][neighbor];
          
          // Calculate new distance
          let candidate = distances[smallest] + nextNode.weight;
          let nextNeighbor = nextNode.node;
          
          if (candidate < distances[nextNeighbor]) {
            // Update new smallest distance to neighbor
            distances[nextNeighbor] = candidate;
            // Update previous - how we got to neighbor
            previous[nextNeighbor] = smallest;
            // Enqueue in priority queue with new priority
            nodes.enqueue(nextNeighbor, candidate);
          }
        }
      }
    }

    return path.concat(smallest).reverse();
  }
}

// Example usage
const graph = new WeightedGraph();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");

graph.addEdge("A", "B", 4);
graph.addEdge("A", "C", 2);
graph.addEdge("B", "E", 3);
graph.addEdge("C", "D", 2);
graph.addEdge("C", "F", 4);
graph.addEdge("D", "E", 3);
graph.addEdge("D", "F", 1);
graph.addEdge("E", "F", 1);

// Find the shortest path from A to E
const shortestPath = graph.dijkstra("A", "E");
console.log(shortestPath); // Output: [ 'A', 'C', 'D', 'F', 'E' ]
`,
      visualizationComponent: AStarVisualization,
      explanation: `Dijkstra's Algorithm is a shortest-path algorithm used to find the shortest path between two nodes in a weighted graph. It is especially useful when all edge weights are non-negative. The algorithm ensures that the path with the smallest cumulative distance is chosen at each step.`,
    },
    
    {
      name: "BellmanFord Algorithm",
      code: `class Graph {
  constructor(vertices) {
    this.V = vertices;
    this.edges = [];
  }

  addEdge(u, v, w) {
    this.edges.push([u, v, w]);
  }

  bellmanFord(src) {
    const dist = Array(this.V).fill(Infinity);
    dist[src] = 0;

    for (let i = 1; i < this.V; i++) {
      for (let [u, v, w] of this.edges) {
        if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
          dist[v] = dist[u] + w;
        }
      }
    }

    // Check for negative-weight cycles
    for (let [u, v, w] of this.edges) {
      if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
        console.log("Graph contains negative weight cycle");
        return;
      }
    }

    console.log("Vertex distances from source:", dist);
  }
}
`,
      visualizationComponent: BellmanFordVisualization,
      explanation: `he Bellman-Ford algorithm is used for finding the shortest paths from a single source vertex to all other vertices in a graph. It can handle graphs with negative weight edges, unlike Dijkstra's algorithm. The algorithm works by repeatedly relaxing all edges in the graph, updating the shortest path estimates. It runs in 
𝑂
(
𝑉
×
𝐸
)
O(V×E) time, where 
𝑉
V is the number of vertices and 
𝐸
E is the number of edges.

It also checks for negative-weight cycles, which are cycles that reduce the total path weight indefinitely. If such a cycle is detected, the algorithm reports its presence.`,
    },
    {
      name: "Kruskal Algorithm",
      code: `class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = Array(n).fill(0);
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]); // Path compression
    }
    return this.parent[x];
  }

  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX !== rootY) {
      if (this.rank[rootX] > this.rank[rootY]) {
        this.parent[rootY] = rootX;
      } else if (this.rank[rootX] < this.rank[rootY]) {
        this.parent[rootX] = rootY;
      } else {
        this.parent[rootY] = rootX;
        this.rank[rootX]++;
      }
    }
  }
}

function kruskal(n, edges) {
  // Sort edges by weight
  edges.sort((a, b) => a[2] - b[2]);

  const uf = new UnionFind(n);
  const mst = [];
  let mstWeight = 0;

  for (let [u, v, weight] of edges) {
    if (uf.find(u) !== uf.find(v)) {
      uf.union(u, v);
      mst.push([u, v, weight]);
      mstWeight += weight;
    }
  }

  return { mst, mstWeight };
}

// Example usage:
const edges = [
  [0, 1, 10],
  [0, 2, 6],
  [0, 3, 5],
  [1, 3, 15],
  [2, 3, 4]
];
const n = 4; // Number of nodes
const result = kruskal(n, edges);
console.log("Minimum Spanning Tree:", result.mst);
console.log("Total weight of MST:", result.mstWeight);

`,
      visualizationComponent: KruskalVisualization,
      explanation: `Kruskal's Algorithm is a greedy algorithm used to find the Minimum Spanning Tree (MST) of a connected, undirected graph. The algorithm starts by sorting all the edges of the graph in increasing order based on their weights. Then, it iteratively adds edges to the MST, ensuring that no cycles are formed. To efficiently check if two nodes are already connected (i.e., to avoid cycles), Kruskal's Algorithm employs a Union-Find (or Disjoint Set) data structure. The find operation helps determine the set a node belongs to, using path compression for optimization, while the union operation merges two sets, ensuring that the resulting set remains valid without creating cycles.

The process begins by selecting the smallest edge and checking if the nodes it connects belong to different sets. If they do, the edge is added to the MST, and the sets containing the nodes are merged. This continues until the MST has 
𝑛
−
1
n−1 edges, where 
𝑛
n is the number of nodes in the graph. Kruskal’s Algorithm is particularly efficient for sparse graphs and has a time complexity of 
𝑂
(
𝐸
log
⁡
𝐸
)
O(ElogE), where 
𝐸
E is the number of edges, due to the sorting step. The result is an MST that spans all the vertices with the minimum possible total weight.`,
    },
    {
      name: "Prims Algorithm",
      code: `class Graph {
  constructor(vertices) {
    this.V = vertices;
    this.adjList = new Array(vertices).fill(null).map(() => []);
  }

  addEdge(u, v, weight) {
    this.adjList[u].push({ vertex: v, weight });
    this.adjList[v].push({ vertex: u, weight });
  }

  primMST() {
    let parent = new Array(this.V).fill(-1);  // Array to store the MST
    let key = new Array(this.V).fill(Infinity); // To store the minimum edge weight
    let inMST = new Array(this.V).fill(false); // To check if vertex is included in MST

    key[0] = 0; // Start from the first vertex
    parent[0] = -1;

    for (let count = 0; count < this.V - 1; count++) {
      let u = this.minKey(key, inMST); // Pick the vertex with minimum key value
      inMST[u] = true;

      for (let neighbor of this.adjList[u]) {
        let v = neighbor.vertex;
        let weight = neighbor.weight;

        if (!inMST[v] && weight < key[v]) {
          key[v] = weight;
          parent[v] = u;
        }
      }
    }

    this.printMST(parent);
  }

  minKey(key, inMST) {
    let min = Infinity, minIndex = -1;
    for (let v = 0; v < this.V; v++) {
      if (!inMST[v] && key[v] < min) {
        min = key[v];
        minIndex = v;
      }
    }
    return minIndex;
  }

`,
      visualizationComponent: PrimsVisualization,
      explanation: `Prim's Algorithm is another popular greedy algorithm for finding the Minimum Spanning Tree (MST) of a connected, undirected graph. Unlike Kruskal's Algorithm, which works by adding edges, Prim's Algorithm builds the MST by growing it one vertex at a time. The algorithm begins at an arbitrary node and adds the smallest edge that connects a new vertex to the growing MST.

The algorithm uses a key[] array to store the minimum weight edge that connects a vertex to the MST and an inMST[] array to keep track of the vertices already included in the MST. It repeatedly selects the vertex with the smallest key value (i.e., the closest vertex to the MST) and adds it to the MST. For each added vertex, the algorithm updates the key values of its adjacent vertices to ensure that they reflect the smallest edge connecting them to the growing MST.

This process continues until all vertices are included in the MST. The time complexity of Prim’s Algorithm is 
𝑂
(
𝑉
2
)
O(V 
2
 ) when implemented with an adjacency matrix, but it can be improved to 
𝑂
(
𝐸
log
⁡
𝑉
)
O(ElogV) using a priority queue. The result is a tree that spans all vertices with the minimum possible total weight.`,
    },
  ],
};

const Page = ({ params }) => {
  const [currentConcept, setCurrentConcept] = React.useState(
    course.concepts[0]
  );
  const session = useSession();

  if (session.status === "loading") return <div>Loading...</div>;
  if (session.status === "unauthenticated") return <div>Unauthenticated</div>;

  return (
    <>
      <section className="text-secondary">
        <div>
          <section className="pl-20 h-32 bg-gray-300 flex justify-start items-center text-secondary text-3xl font-semibold">
            {session?.data?.user?.name}
          </section>
          <section className="grid grid-cols-12 py-10 px-5">
            <div className="col-span-2 pt-10 flex flex-col justify-start gap-10 items-end border-r border-gray-800">
              <h1 className="text-3xl text-start w-2/3 font-semibold">
                {params.title.replace("%20", " ")}
              </h1>

              {course.concepts.map((concept) => (
                <button
                  key={concept.name}
                  onClick={(e) => setCurrentConcept(concept)}
                  className={`text-lg w-2/3 p-2 rounded-sm text-start font-semibold ${
                    currentConcept.name === concept.name ? "bg-primary" : ""
                  }`}
                >
                  {concept.name}
                </button>
              ))}
            </div>
            <section className="col-span-9">
              <h1 className="text-6xl text-center font-bold text-secondary ">
                {currentConcept.name}
              </h1>

              <div className="mt-14 gap-10 grid grid-cols-2">
                <div className="col-span-1">
                  <h1 className="text-3xl text-center font-bold text-secondary ">
                    Code
                  </h1>
                  <div className="pl-10">
                    <pre className="language-js">
                      <code className="language-js ">
                        {currentConcept.code}
                      </code>
                    </pre>
                    <PrismLoader />
                  </div>
                </div>
                <div className="col-span-1">
                  <h1 className="text-3xl text-center font-bold text-secondary ">
                    Visualizations
                  </h1>
                  <div className="">
                    {currentConcept.visualizationComponent &&
                      React.createElement(
                        currentConcept.visualizationComponent
                      )}
                  </div>
                </div>
                <div className="col-span-2">
                  <h1 className="text-3xl text-center font-bold text-secondary ">
                    Explanation
                  </h1>
                  <div className="p-5 mt-10 bg-[#272822]">
                    {currentConcept.explanation}
                  </div>
                </div>
                {/* Add Code Editor Button Here */}
              <div className="col-span-2 mt-10 flex justify-center">
                <Link href="/code-editor">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Go to Code Editor
                  </button>
                </Link>
              </div>
              </div>
            </section>
          </section>
        </div>
      </section>
    </>
  );
};

export default Page;
