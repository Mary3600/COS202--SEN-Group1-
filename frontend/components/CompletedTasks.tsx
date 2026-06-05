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

export default function CompletedTasks() {
  return (
    <div className="w-full">

      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-10">
        <div className="w-40 h-8 rounded-full bg-gray-200"></div>

        <span className="text-sm font-medium text-[#0f5d52]">
          Fall Semester 2024
        </span>
      </div>

      {/* HEADER */}
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-[#0f5d52] mb-4">
          Completed Tasks
        </h1>

        <p className="text-gray-500 text-lg">
          A curated collection of your academic milestones.
        </p>
      </div>

      {/* TASK SECTIONS */}
      {completedTasks.map((section, index) => (
        <div key={index} className="mb-14">

          {/* MONTH HEADER */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-semibold text-[#0f5d52]">
              {section.month}
            </h2>

            <span className="text-xs tracking-widest text-gray-400">
              {section.total}
            </span>
          </div>

          {/* TABLE HEADER */}
          <div className="grid grid-cols-3 px-6 mb-4 text-xs uppercase tracking-widest text-gray-400">
            <p>Task Name</p>
            <p>Course</p>
            <p className="text-right">Date Completed</p>
          </div>

          {/* TASK CARDS */}
          <div className="space-y-4">
            {section.tasks.map((task, i) => (
              <div
                key={i}
                className="grid grid-cols-3 items-center bg-white rounded-2xl px-6 py-5 shadow-sm"
              >

                {/* TASK NAME */}
                <div>
                  <p className="font-semibold text-gray-800">
                    {task.name}
                  </p>
                </div>

                {/* COURSE */}
                <div>
                  <span className="bg-[#dff5ee] text-[#0f5d52] text-sm px-4 py-1 rounded-full">
                    {task.course}
                  </span>
                </div>

                {/* DATE */}
                <div className="text-right text-gray-500 font-medium">
                  {task.date}
                </div>

              </div>
            ))}
          </div>

        </div>
      ))}
    </div>
  );
}