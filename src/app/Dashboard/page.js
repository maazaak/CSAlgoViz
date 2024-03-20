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
    ],
  },
  {
    title: "Theory of Automata",
    concepts: ["State Machines:Diagrams and Tabels"],
  },
  {
    title: "Database Systems",
    concepts: ["ER Modeling", "Relation Tables", "Normalization"],
  },
];

const page = () => {
  return (
    <div className="p-10">
      <h1 className=" text-2xl font-bold">My Courses</h1>

      <section className=" grid gap-x-16 grid-cols-2">
        {Courses.map((course, index) => (
          <div className="mt-10 col-span-1">
            <h1 className="text-base font-semibold pb-5 border-b-2">
              {course.title}
            </h1>
            <div className="mt-5 pl-10 flex flex-col gap-5">
              {course.concepts.map((concept) => (
                <div>{concept}</div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default page;
