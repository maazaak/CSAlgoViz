"use client";
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const BubbleSortViz = () => {
  const visualizationRef = useRef();
  const pointerRef = useRef();
  const [iteration, setIteration] = useState(0);
  const [isSortedComplete, setIsSortedComplete] = useState(false);
  const [isSwapped, setIsSwapped] = useState(false);
  const [i, setI] = useState(0);
  const [data, setData] = useState(
    [5, 3, 8, 10, 4, 2].map((d, i) => ({ value: d, index: i, position: i }))
  );

  useEffect(() => {
    if (!visualizationRef.current) return;

    const width = 450;
    const height = 150; // Increased for visibility of the downward arrow

    const svg = d3
      .select(visualizationRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("display", "block") // Centering the SVG
      .style("margin", "auto");

    // Downward arrow for the pointer
    const pointerPath = "M0,0 L10,10 L5,5 L5,-10 L-5,-10 L-5,5 L-10,10 Z"; // Downward arrow shape
    pointerRef.current = svg
      .append("path")
      .attr("d", pointerPath)
      .attr("fill", "red")
      // Adjust the initial position of the pointer
      .attr("transform", `translate(${30}, ${10})`);

    // Remember to cleanup on component unmount
    return () => {
      // Remove svg or any other elements added to the DOM
      svg.selectAll("*").remove();
    };
  }, []);

  useEffect(() => {
    render();
    console.log(data);
  }, [data, i, iteration]); // Re-render on data, iteration, and i change

  const render = () => {
    const svg = d3.select(visualizationRef.current).select("svg");
    svg
      .selectAll("circle")
      .data(data, (d) => d.index)
      .join("circle")
      .transition()
      .duration(500)
      .attr("r", 20)
      .attr("cx", (d) => d.position * 60 + 50) // Adjust spacing for centering
      .attr("cy", 80) // Lower circles to accommodate arrow
      .attr("fill", "steelblue");

    svg
      .selectAll("text")
      .data(data, (d) => d.index)
      .join("text")
      .transition()
      .duration(500)
      .attr("x", (d) => d.position * 60 + 50) // Adjust spacing for centering
      .attr("y", 85) // Align text with circles
      .attr("text-anchor", "middle")
      .text((d) => d.value);
  };

  const swapElements = (newData, idx1, idx2) => {
    if (newData[idx1].value > newData[idx2].value) {
      let tmp = newData[idx2].position;
      newData[idx2].position = newData[idx1].position;
      newData[idx1].position = tmp;

      [newData[idx1], newData[idx2]] = [newData[idx2], newData[idx1]];
      // isSwapped = true;
      // swapsInThisIteration = true;
    }
  };

  // Check if the array is sorted
  const isSorted = () => {
    for (let j = 0; j < data.length - 1; j++) {
      if (data[j].value > data[j + 1].value) {
        return false;
      }
    }
    alert("Sorting Completed");
    return true;
  };

  const handleNextStep = () => {
    let newData = [...data];

    if (i < newData.length - 1) {
      if (newData[i].value > newData[i + 1].value) {
        swapElements(newData, i, i + 1);
      }

      let targetPosition =
        data[i].value > data[i + 1].value
          ? data[i].position
          : data[i + 1].position;
      pointerRef.current
        .transition()
        .duration(500)
        .attr("transform", `translate(${targetPosition * 60 + 50}, ${10})`);

      setI((prev) => prev + 1);
    } else {
      if (isSorted()) {
        setIsSortedComplete(true);
      }
      setI(0);
      setIteration((prev) => prev + 1);
    }

    setData(newData);
  };

  return (
    <div>
      <h1 className="font-bold text-[#f0916c]">Bubble Sort</h1>
      <div
        className="font-bold text-[#f0916c]"
        id="iterationCounter"
        style={{ textAlign: "center", marginBottom: "10px" }}
      >
        Iteration: {iteration}
      </div>
      <div ref={visualizationRef} id="visualization"></div>
      {/* Move the button inside the component */}
      <div
        className={`flex justify-center items-center cursor-pointer ${
          isSortedComplete ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={!isSortedComplete ? handleNextStep : undefined}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-12 h-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default BubbleSortViz;
