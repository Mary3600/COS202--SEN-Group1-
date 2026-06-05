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
    <div className="flex-1 bg-[#f7f8f7] p-10 overflow-y-auto min-h-screen">

      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-12">
        <div className="w-44 h-8 rounded-full bg-gray-200"></div>

        <span className="text-sm font-medium text-[#0f5d52]">
          Fall Semester 2024
        </span>
      </div>

      {/* PAGE HEADER */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Completed Tasks
        </h1>

        <p className="text-gray-500">
          A curated collection of your academic milestones.
        </p>
      </div>

      {/* TASK SECTIONS */}
      {completedTasks.map((section) => (
        <div key={section.month} className="mb-14">

          {/* MONTH HEADER (UPDATED TO TEAL) */}
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-semibold text-[#0f5d52] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0f5d52]"></span>
              {section.month}
            </h2>

            <span className="text-xs uppercase tracking-widest text-gray-400">
              {section.total}
            </span>
          </div>

          {/* TABLE HEADERS */}
          <div className="grid grid-cols-[2fr_1fr_120px] px-6 mb-3 text-[11px] uppercase tracking-widest text-gray-400">
            <span>Task Name</span>
            <span>Course Name</span>
            <span className="text-right">Date Completed</span>
          </div>

          {/* TASK LIST */}
          <div className="space-y-3">
            {section.tasks.map((task, index) => (
              <div
                key={index}
                className="grid grid-cols-[2fr_1fr_120px] items-center bg-white rounded-2xl px-6 py-5 border border-gray-100 shadow-sm hover:shadow-md transition"
              >

                {/* TASK NAME */}
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full border border-[#0f5d52]/20 flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-[#0f5d52]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>

                  <span className="font-medium text-gray-800">
                    {task.name}
                  </span>
                </div>

                {/* COURSE */}
                <div>
                  <span className="bg-[#e7f4ef] text-[#0f5d52] text-xs px-3 py-1 rounded-full">
                    {task.course}
                  </span>
                </div>

                {/* DATE */}
                <div className="text-right text-sm text-gray-500">
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