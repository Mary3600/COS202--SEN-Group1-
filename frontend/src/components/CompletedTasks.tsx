"use client";

import React from "react";

const completedTasks = [
  {
    month: "October",
    total: "12 TASKS DONE",
    tasks: [
      {
        name: "Microeconomics Final Thesis Draft",
        course: "Economy 101",
        date: "Oct 15",
      },
      {
        name: "Weekly Case Study Analysis",
        course: "Economy 101",
        date: "Oct 12",
      },
      {
        name: "The Renaissance Quiz",
        course: "Modern History",
        date: "Oct 08",
      },
    ],
  },
  {
    month: "September",
    total: "28 TASKS DONE",
    tasks: [
      {
        name: "Literature Review: Industrial Revolution",
        course: "Modern History",
        date: "Sep 28",
      },
      {
        name: "Statistical Methods Homework",
        course: "Economy 101",
        date: "Sep 21",
      },
    ],
  },
];

const CompletedTasks = () => {
  return (
    <div className="flex min-h-screen bg-teal-50 text-[#1f1f1f]">
      <main className="flex-1 px-14 py-10">

        <div className="flex justify-between items-center mb-12">
          <div className="w-40 h-8 rounded-full bg-gray-200"></div>

          <div className="flex items-center gap-5 text-gray-500">
            <span className="text-sm text-[#0f5d52] font-medium">
              Fall Semester 2024
            </span>
          </div>
        </div>

        <div className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-5xl font-bold mb-3">
              Completed Tasks
            </h1>

            <p className="text-black text-lg">
              A curated collection of your academic milestones.
            </p>
          </div>
        </div>

        {completedTasks.map((section, index) => (
          <div key={index} className="mb-14">

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-semibold text-[#0f5d52]">
                {section.month}
              </h2>

              <span className="text-xs tracking-widest text-gray-400">
                {section.total}
              </span>
            </div>

            <div className="space-y-4">
              {section.tasks.map((task, i) => (
                <div
                  key={i}
                  className="grid grid-cols-3 items-center bg-white rounded-2xl px-6 py-5 shadow-sm"
                >
                  <div className="font-medium">{task.name}</div>

                  <div>
                    <span className="bg-[#dff5ee] text-[#0f5d52] text-sm px-4 py-1 rounded-full">
                      {task.course}
                    </span>
                  </div>

                  <div className="text-right text-gray-500 font-medium">
                    {task.date}
                  </div>
                </div>
              ))}
            </div>

          </div>
        ))}

      </main>
    </div>
  );
};

export default CompletedTasks;