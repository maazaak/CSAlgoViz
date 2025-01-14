"use client";
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const QuickSortVisualization = () => {
    const visualizationRef = useRef();
    const [intervalSpeed, setIntervalSpeed] = useState(1000);
    const [isSorting, setIsSorting] = useState(false);

    const data = [3, 2, 5, 0, 1, 8, 7, 6, 9, 4].map((d, i) => ({ value: d, index: i, position: i }));

    const startSort = () => {
        if (!isSorting) {
            setIsSorting(true);
            quickSortVisual(data, 0, true);
        }
    };

    const speedUp = () => {
        setIntervalSpeed(Math.max(100, intervalSpeed - 200));
    };

    const slowDown = () => {
        setIntervalSpeed(intervalSpeed + 200);
    };

    useEffect(() => {
        const width = 620;
        const height = 1000;

        const svg = d3.select(visualizationRef.current)
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
            .attr("transform", "translate(50, 50)");

        let greenPointer = svg.append("path")
            .attr("d", pointerPath)
            .attr("fill", "green")
            .attr("transform", "translate(50, 110)");

        const render = (data, offsetY) => {
            const update = svg.selectAll(`circle.iteration${data[0].iteration}`)
                .data(data, d => d.index);

            update.enter()
                .append("circle")
                .attr("class", d => d.isPivot ? "circle-pivot" : "circle-default")
                .attr("r", 20)
                .attr("cx", d => d.position * 60 + 50)
                .attr("cy", 80 + offsetY)
                .style("fill", "lightgrey");

            update.transition()
                .duration(500)
                .attr("cx", d => d.position * 60 + 50)
                .attr("class", d => d.isPivot ? "circle-pivot" : "circle-default")
                .style("fill", "lightgrey");

            const textUpdate = svg.selectAll(`text.iteration${data[0].iteration}`)
                .data(data, d => d.index);

            textUpdate.enter()
                .append("text")
                .attr("x", d => d.position * 60 + 50)
                .attr("y", 85 + offsetY)
                .attr("text-anchor", "middle")
                .text(d => d.value);

            textUpdate.transition()
                .duration(500)
                .attr("x", d => d.position * 60 + 50);
        };

        const updateSubArrayPositions = (subArray, startOffset) => {
            return subArray.map((item, index) => ({
                ...item,
                position: startOffset + index  // Adjust position based on offset
            }));
        };

        quickSortVisual(svg, data, 0, true, intervalSpeed, render, updateSubArrayPositions, redPointer, greenPointer);

        return () => {
            d3.select(visualizationRef.current).selectAll("*").remove();
        };
    }, [intervalSpeed, isSorting]);

    const quickSortVisual = (svg, data, offsetY, firstCall, intervalSpeed, render, updateSubArrayPositions, redPointer, greenPointer) => {
        let queue = [{ array: data, offsetY, firstCall }];
        let finalPositions = Array(data.length).fill(null);

        const processQueue = () => {
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
        redPointer.attr("transform", `translate(${array[start].position * 60 + 50}, ${offsetY + 50})`);
        greenPointer.attr("transform", `translate(${array[start].position * 60 + 50}, ${offsetY + 110})`);
    
        
        
        let i = start, j = start;
        let interval = setInterval(() => {
            if (i <= end) {
                if (i === end) {
                    array[i].isPivot = true; // Ensure the pivot is always highlighted
                }
                render([...array], offsetY); // Update visual state
    
                // Move red pointer to the current element being compared
                redPointer.transition().duration(500)
                    .attr("transform", `translate(${array[i].position * 60 + 50}, ${offsetY + 50})`);
    
                if (array[i].value <= pivotValue) {
                    if (i != j) {
                        [array[j], array[i]] = [array[i], array[j]]; // Swap elements
                        [array[j].position, array[i].position] = [array[i].position, array[j].position]; // Correct positions after swap
                    }
                    render([...array], offsetY);
    
                    greenPointer.transition().duration(500)
                        .attr("transform", `translate(${array[j].position * 60 + 50}, ${offsetY + 110})`);
                    
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
            finalPositions = finalPositions.filter(el => el !== null);
            finalPositions.sort((a, b) => a.value - b.value);

            console.log("Sorted final positions array:", finalPositions.map(item => item.value));

            svg.selectAll("*").remove();

            svg.append("text")
                .attr("x", 620 / 2)
                .attr("y", 50)
                .attr("text-anchor", "middle")
                .attr("font-size", "24px")
                .attr("fill", "black")
                .text("Sorting Completed");

            render(finalPositions, 100);
        }
        processQueue();
    }

    return (
        <div>
            <h1 className="font-bold text-secondary text-center">QuickSort Visualization</h1>
            <div className="text-center my-4">
                <button 
                    onClick={startSort}
                    className="ml-2 px-4 py-1 border rounded bg-blue-500 text-white"
                    disabled={isSorting}
                >
                    Start Sort
                </button>
                <button 
                    onClick={speedUp}
                    className="ml-2 px-4 py-1 border rounded bg-green-500 text-white"
                    disabled={!isSorting}
                >
                    Speed Up
                </button>
                <button 
                    onClick={slowDown}
                    className="ml-2 px-4 py-1 border rounded bg-red-500 text-white"
                    disabled={!isSorting}
                >
                    Slow Down
                </button>
            </div>
            <div ref={visualizationRef} id="visualization"></div>
        </div>
    );
};

export default QuickSortVisualization;
