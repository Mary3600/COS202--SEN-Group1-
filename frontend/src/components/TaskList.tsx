"use client";

import {
  Menu,
  LayoutDashboard,
  Calendar,
  ClipboardList,
  CheckCircle2,
  Archive,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function TaskList() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen w-full flex p-6 gap-6 bg-teal-50">

      {/* SIDEBAR */}
      <div
        className={`bg-white rounded-2xl shadow-lg transition-all duration-300 flex flex-col ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        {/* TOP */}
        <div className="p-4 flex justify-between items-center">
          {!collapsed && (
            <div>
              <h1 className="font-bold text-teal-700 text-lg">
                Momento
              </h1>
              <p className="text-xs text-gray-400">
                THE MINDFUL SCHOLAR
              </p>
            </div>
          )}

          <button onClick={() => setCollapsed(!collapsed)}>
            <Menu />
          </button>
        </div>

        {/* MENU */}
        <div className="flex flex-col gap-5 text-gray-600 px-4 mt-6">

          <Link href="/dashboard" className="flex items-center gap-3 hover:text-green-700">
            <LayoutDashboard size={18} />
            {!collapsed && <span>Dashboard</span>}
          </Link>

          <Link href="/calendar" className="flex items-center gap-3 hover:text-green-700">
            <Calendar size={18} />
            {!collapsed && <span>Calendar</span>}
          </Link>

          <Link href="/tasklist" className="flex items-center gap-3 hover:text-green-700">
            <ClipboardList size={18} />
            {!collapsed && <span>Tasklist</span>}
          </Link>

          <Link href="/completed" className="flex items-center gap-3 hover:text-green-700">
            <CheckCircle2 size={18} />
            {!collapsed && <span>Completed</span>}
          </Link>

          <Link href="/archive" className="flex items-center gap-3 hover:text-green-700">
            <Archive size={18} />
            {!collapsed && <span>Archive</span>}
          </Link>
        </div>

        {/* BOTTOM */}
        <div className="mt-auto p-4">
          {!collapsed && (
            <button className="bg-teal-700 text-white w-full py-2 rounded-lg">
              + Add Task
            </button>
          )}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1">
        
        
        <div className="flex gap-6">

          {/* LEFT */}
          <div className="flex-1">
            <h1 className="text-5xl font-bold text-teal-700 mb-4">
              Upcoming Tasks
            </h1>

            <div className="mb-6">
              <h2 className=    "text-black mb-2 text-3x1 font-bold">Today</h2>

              <div className="bg-gray-100 p-4 rounded-xl mb-3 flex justify-between">
                <div>
                  <p className="font-semibold">
                    BIO 201: Molecular Lab Report
                  </p>
                  <p className="text-sm text-gray-400">
                    Due today, 11:59 PM
                  </p>
                </div>
                <span className="text-red-500 text-sm">HIGH</span>
              </div>

              <div className="bg-gray-100 p-4 rounded-xl flex justify-between">
                <div>
                  <p className="font-semibold">
                    HIST 105: Weekly Reflection
                  </p>
                  <p className="text-sm text-gray-400">
                    Due today, 6:00 PM
                  </p>
                </div>
                <span className="text-orange-500 text-sm">MEDIUM</span>
              </div>
            </div>

            <div className="mb-6">
              <h2 className=    "text-black mb-2 text-3x1 font-bold">Tomorrow</h2>

              <div className="bg-gray-100 p-4 rounded-xl flex justify-between">
                <div>
                  <p className="font-semibold">
                    MATH 302: Problem Set 4
                  </p>
                  <p className="text-sm text-gray-400">
                    Due Nov 14, 5:00 PM
                  </p>
                </div>
                <span className="text-green-500 text-sm">LOW</span>
              </div>
            </div>

            <div>
              <h2 className=    "text-black mb-2 text-3x1 font-bold">This week</h2>

              <div className="bg-gray-100 p-4 rounded-xl flex justify-between">
                <div>
                  <p className="font-semibold">
                    ENG 210: Essay Rough Draft
                  </p>
                  <p className="text-sm text-gray-400">
                    Due Friday, Nov 17
                  </p>
                </div>
                <span className="text-orange-500 text-sm">MEDIUM</span>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="w-80">

            <div className="bg-green-700 text-white p-6 rounded-2xl mb-6">
              <p className="text-sm opacity-80">ACADEMIC MOMENTUM</p>
              <h2 className="text-3xl font-bold">84% Focused</h2>
              <p className="text-sm mt-2 opacity-80">
                You've completed 12 tasks this week. Keep it up!
              </p>
            </div>

            <div className="bg-gray-100 p-4 rounded-2xl">
              <p className="font-semibold mb-2">Course Load</p>

              <div className="flex justify-between text-sm">
                <span>BIO 201</span>
                <span>3 Tasks</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>HIST 105</span>
                <span>1 Task</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}