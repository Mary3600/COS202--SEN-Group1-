"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  LayoutDashboard,
  Calendar,
  ClipboardList,
  CheckCircle2,
  Archive,
} from "lucide-react";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen w-full flex p-6 gap-6 bg-teal-700">
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

          <Link href="/dashboard" className="flex items-center gap-3 hover:text-green-700 cursor-pointer">
            <LayoutDashboard size={18} />
            {!collapsed && <span>Dashboard</span>}
          </Link>

          <Link href="/calendar" className="flex items-center gap-3 hover:text-green-700 cursor-pointer">
            <Calendar size={18} />
            {!collapsed && <span>Calendar</span>}
          </Link>

          <Link href="/tasklist" className="flex items-center gap-3 hover:text-green-700 cursor-pointer">
            <ClipboardList size={18} />
            {!collapsed && <span>Tasklist</span>}
          </Link>

          <Link href="/completed" className="flex items-center gap-3 text-[#0f5d52] font-medium border-l-4 border-[#0f5d52] pl-2 cursor-pointer">
            <CheckCircle2 size={18} />
            {!collapsed && <span>Completed Tasks</span>}
          </Link>

          <Link href="/archive" className="flex items-center gap-3 hover:text-green-700 cursor-pointer">
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
      <div className="flex-1 bg-white rounded-2xl p-6 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}