"use client";

import BubbleSortViz from "@/app/Components/BubbleSortViz";
import InsertionSortVisualizer from "@/app/Components/InsertionSortVisualizer";
import SelectionSortVisualization from "@/app/Components/SelectionSortVisualization";
import MergeSortVisualizer from "@/app/Components/MergeSortVisualizer";
import Footer from "@/app/Components/Footer";
import PrismLoader from "@/app/Components/PrismLoader";
import BinarySearchTreeVisualization from "@/app/Components/BinarySearchTreeVisualization";
import BinarySearchTreeBFSVisualization from "@/app/Components/BinarySearchTreeBFSVisualization";
import QuickSortVisualization from "@/app/Components/QuicksortVisualization";
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
      name: "Insertion Sort",
      code: `InsertionSort(array):
    for i from 1 to length(array) - 1:
        key = array[i]
        j = i - 1
        while j >= 0 and array[j] > key:
            array[j + 1] = array[j]  // Shift element one position to the right
            j = j - 1
        array[j + 1] = key  // Place key in its correct position`,
        visualizationComponent: InsertionSortVisualizer,
      explanation: `Insertion Sort works by dividing the array into a sorted and an unsorted portion. Starting with the second element, it compares the current element (key) with the elements in the sorted portion. If the key is smaller than any of the previous elements, those elements are shifted one position to the right to make space for the key. This process repeats for each element until the entire array is sorted. It is simple and efficient for small datasets or nearly sorted arrays.`,
    },
    {
      name: "Selection Sort",
      code: `SelectionSort(array):
    for i from 0 to length(array) - 2:
        minIndex = i
        for j from i + 1 to length(array) - 1:
            if array[j] < array[minIndex]:
                minIndex = j
        if minIndex != i:
            swap(array[i], array[minIndex])
`,
        visualizationComponent: SelectionSortVisualization,
      explanation: `Selection Sort is a straightforward algorithm that sorts an array by repeatedly finding the smallest element from the unsorted portion and swapping it with the first element of that portion. It starts by assuming the first element as the smallest and compares it with the rest of the elements in the unsorted section. If a smaller element is found, the algorithm updates the smallest index. Once the inner loop completes, the smallest element is swapped with the first element of the unsorted portion. This process is repeated for all elements until the entire array is sorted.

While it is simple to implement, Selection Sort is not efficient for large datasets due to its O(n^2) time complexity in all cases.`,
    },
    {
      name: "Quick Sort",
      code: `QuickSort(array, low, high):
    if low < high:
        pivotIndex = Partition(array, low, high)  // Find pivot
        QuickSort(array, low, pivotIndex - 1)    // Recursively sort left subarray
        QuickSort(array, pivotIndex + 1, high)   // Recursively sort right subarray

Partition(array, low, high):
    pivot = array[high]                         // Choose the last element as pivot
    i = low - 1                                 // Pointer for elements smaller than pivot
    for j from low to high - 1:
        if array[j] <= pivot:
            i = i + 1
            swap(array[i], array[j])            // Swap smaller element with element at i
    swap(array[i + 1], array[high])             // Place pivot in correct position
    return i + 1                                // Return the pivot index
`,
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
      code: `Dijkstra(graph, source):
    Initialize distances to all nodes as infinity, except the source (distance = 0)
    Initialize a priority queue and add the source with a distance of 0
    while priority queue is not empty:
        currentNode, currentDistance = extract the node with the smallest distance
        if currentDistance > distance[currentNode]:
            continue  // Skip if the distance is outdated
        for each neighbor of currentNode:
            newDistance = currentDistance + weight(currentNode, neighbor)
            if newDistance < distance[neighbor]:
                distance[neighbor] = newDistance  // Update the shortest distance
                add neighbor to priority queue with newDistance
    return distance  // Shortest distances from the source to all nodes

`,
      visualizationComponent: DijkstraVisualization,
      explanation: `Dijkstra's algorithm finds the shortest paths from a source node to all other nodes in a graph with non-negative edge weights. It uses a priority queue to always process the node with the smallest known distance. Starting from the source, the algorithm explores all neighbors, updating their distances if a shorter path is found. Once a node is processed, its shortest distance is finalized. This process repeats until all nodes are visited.`,
    },
    {
      name: "Astar Algorithm",
      code: `AStar(graph, start, goal):
    Initialize openSet with start node
    Initialize gScore (cost from start) for all nodes as infinity, except start (gScore[start] = 0)
    Initialize fScore (estimated total cost) for all nodes as infinity, except start (fScore[start] = heuristic(start, goal))
    while openSet is not empty:
        current = node in openSet with the lowest fScore
        if current == goal:
            return reconstructPath(cameFrom, current)  // Path found
        remove current from openSet
        for each neighbor of current:
            tentative_gScore = gScore[current] + weight(current, neighbor)
            if tentative_gScore < gScore[neighbor]:
                cameFrom[neighbor] = current  // Track the path
                gScore[neighbor] = tentative_gScore
                fScore[neighbor] = gScore[neighbor] + heuristic(neighbor, goal)
                if neighbor not in openSet:
                    add neighbor to openSet
    return failure  // No path exists

reconstructPath(cameFrom, current):
    path = []
    while current in cameFrom:
        path.prepend(current)
        current = cameFrom[current]
    return path

`,
      visualizationComponent: AStarVisualization,
      explanation: `The A* algorithm finds the shortest path from a start node to a goal node using a combination of actual cost (gScore) and a heuristic estimate (hScore). The heuristic estimates the cost to reach the goal from a given node, guiding the search more efficiently than Dijkstra’s algorithm. A priority queue tracks nodes to visit, sorted by their total estimated cost (fScore). Nodes are processed in order of priority, updating their neighbors' scores and tracking the path. The process continues until the goal is reached or all nodes are explored. A* is optimal and complete when the heuristic is admissible (never overestimates the cost).`,
    },
    
    {
      name: "BellmanFord Algorithm",
      code: `BellmanFord(graph, source):
    Initialize distance array with infinity for all nodes except source (distance[source] = 0)
    for i from 1 to number of vertices - 1:
        for each edge (u, v) with weight w:
            if distance[u] + w < distance[v]:
                distance[v] = distance[u] + w  // Relax the edge
    for each edge (u, v) with weight w:
        if distance[u] + w < distance[v]:
            return "Graph contains a negative-weight cycle"
    return distance

`,
      visualizationComponent: BellmanFordVisualization,
      explanation: `Bellman-Ford computes the shortest paths from a single source node to all other nodes in a weighted graph. Unlike Dijkstra's algorithm, it can handle negative weights. The algorithm repeatedly relaxes all edges, ensuring that the shortest distance to each node is updated. It runs 
𝑉
−
1
V−1 iterations (where 
𝑉
V is the number of vertices) to guarantee that all paths are checked. In the end, it checks for negative-weight cycles by seeing if any distance can still be reduced.

`,
    },
    {
      name: "Kruskal Algorithm",
      code: `Kruskal(graph):
    Initialize result as an empty set for edges in the MST
    Sort all edges by weight
    Initialize a disjoint set for all vertices
    for each edge (u, v) in sorted edges:
        if u and v belong to different sets:
            add edge (u, v) to result
            union(u, v)  // Combine sets
    return result  // Minimum Spanning Tree (MST)


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
      code: `Prim(graph, start):
    Initialize visited set as empty
    Initialize priority queue with (0, start)  // Weight and starting node
    Initialize MST weight = 0
    while priority queue is not empty:
        weight, current = extract node with minimum weight
        if current is already visited:
            continue
        add current to visited
        MST weight += weight
        for each neighbor of current:
            if neighbor is not visited:
                add (weight of edge, neighbor) to priority queue
    return MST weight


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
    {
      name: "Binary Search Tree DFS",
      code: `DFS(root):
    if root is null:
        return
    stack = empty stack
    current = root
    while stack is not empty or current is not null:
        while current is not null:
            stack.push(current)       // Push the current node to the stack
            current = current.left    // Move to the left child
        current = stack.pop()         // Backtrack to the last visited node
        process(current)              // Process the current node
        current = current.right       // Move to the right child

`,
      visualizationComponent: BinarySearchTreeVisualization,
      explanation: `Depth-First Search (DFS) in a Binary Search Tree (BST) traverses the tree deeply along one branch before backtracking to explore others. Starting from the root, DFS recursively visits the left subtree, processes the current node, and then visits the right subtree. This traversal is particularly useful for searching or processing nodes in a pre-order, in-order, or post-order sequence, depending on when the current node is processed relative to the recursive calls. DFS is efficient in memory as it only requires stack space proportional to the tree height.`,
    },
    {
      name: "Binary Search Tree BFS",
      code: `BFS(root):
    if root is null:
        return
    queue = empty queue
    enqueue(root)
    while queue is not empty:
        node = dequeue(queue)
        process(node)       // Process the current node
        if node.left is not null:
            enqueue(node.left)  // Add left child to queue
        if node.right is not null:
            enqueue(node.right) // Add right child to queue
`,
      visualizationComponent: BinarySearchTreeBFSVisualization,
      explanation: `Breadth-First Search (BFS) in a Binary Search Tree (BST) explores nodes level by level, starting from the root. It uses a queue to keep track of nodes to visit. The root node is processed first, followed by its children, then their children, and so on. BFS is ideal for finding the shortest path in unweighted trees or for processing all nodes at a particular depth before moving deeper. It requires additional memory to store the queue but ensures that all nodes at the same level are visited before advancing to the next.`,
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
