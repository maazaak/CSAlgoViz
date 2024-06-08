import Link from "next/link";
import React from "react";

const Courses = [
  {
    title: "Data Structures",
    concepts: [
      "Arrays",
      "Linked-Lists",
      "Stacks and Queues",
      "Graphs, Tress and Heaps",
      "Hash Tables",
      "Binary Search Tree",
      "Binary Search Tree BFS"
    ],
  },
  {
    title: "Theory of Automata",
    concepts: ["State Machines: Diagrams and Tables"],
  },
  {
    title: "Database Systems",
    concepts: ["ER Modeling", "Relation Tables", "Normalization"],
  },
];

const page = () => {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">My Courses</h1>
      <section className="grid gap-x-16 grid-cols-2">
        {Courses.map((course, index) => (
          <div key={index} className="mt-10 col-span-1">
            <div className="flex justify-evenly items-center">
              <h1 className="text-base font-semibold pb-5 border-b-2">
                {course.title}
              </h1>
              <Link
                href={`/Course/${course.title}`}
                className="text-[#f7f8d7] bg-[#f0916c] hover:bg-[#c7795a] focus:ring-4 focus:ring-[#f0916c] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              >
                Start
              </Link>
            </div>
            <div className="mt-5 pl-10 flex flex-col gap-5">
              {course.concepts.map((concept, i) => (
                <div key={i}>{concept}</div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default page;
