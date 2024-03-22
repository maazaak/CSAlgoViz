"use client";

import BubbleSortViz from "@/app/Components/BubbleSortViz";
import Footer from "@/app/Components/Footer";
import PrismLoader from "@/app/Components/PrismLoader";
import Link from "next/link";
import React from "react";

const course = {
  title: "Data Structures",
  concepts: [
    "Arrays",
    "Linked-Lists",
    "Stacks and Queues",
    "Graphs, Tress and Heaps",
    "Hash Tables",
  ],
};

const code = `function bubbleSort(arr) {
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
}
`;

const page = ({ params }) => {
  const [currentConcept, setCurrentConcept] = React.useState(
    course.concepts[0]
  );

  return (
    <>
      <section className="text-[#f7f8d7]">
        <div>
          <section className="pl-20 h-32 bg-gray-300 flex justify-start items-center text-black text-3xl font-semibold">
            ranamaaz2001
          </section>
          <section className="grid grid-cols-12 py-10 px-5">
            <div className="col-span-2 pt-10 flex flex-col justify-start gap-10 items-end border-r border-gray-800">
              <h1 className="text-3xl text-start w-2/3 font-semibold">
                {params.title.replace("%20", " ")}
              </h1>

              {course.concepts.map((concept) => (
                <button
                  onClick={(e) => setCurrentConcept(concept)}
                  className={`text-lg w-2/3 p-2 rounded-sm  text-start font-semibold ${
                    currentConcept == concept ? "bg-[#c7795a]" : ""
                  }`}
                >
                  {concept}
                </button>
              ))}
            </div>
            <section className="col-span-9">
              <h1 className="text-6xl text-center font-bold text-[#f0916c] ">
                {currentConcept}
              </h1>

              <div className="mt-14 gap-10 grid grid-cols-2">
                <div className="col-span-1">
                  <h1 className="text-3xl text-center font-bold text-[#f0916c] ">
                    Code
                  </h1>
                  <div className="pl-10">
                    <pre className="language-js">
                      <code className="language-js ">{code}</code>
                    </pre>
                    <PrismLoader />
                  </div>
                </div>
                <div className="col-span-1">
                  <h1 className="text-3xl text-center font-bold text-[#f0916c] ">
                    Visualizations
                  </h1>
                  <div className="">
                    <BubbleSortViz />
                  </div>
                </div>
                <div className="col-span-2">
                  <h1 className="text-3xl text-center font-bold text-[#f0916c] ">
                    Explanation
                  </h1>
                  <div className="p-5 mt-10 bg-[#272822]">
                    Bubble Sort is a simple sorting algorithm that repeatedly
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
                    an educational tool to introduce sorting algorithms.
                  </div>
                </div>
              </div>
            </section>
          </section>
        </div>
      </section>
    </>
  );
};

export default page;
