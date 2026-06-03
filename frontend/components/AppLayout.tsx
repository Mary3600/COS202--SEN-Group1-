"use client";

import { useState } from "react";
import Link from "next/link";

import {
  Menu,
  ClipboardList,
  CheckCircle2,
} from "lucide-react";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen w-full flex p-6 gap-6 bg-[#0f5d52]">

      {/* SIDEBAR */}
      <div
        className={`bg-white rounded-3xl shadow-lg transition-all duration-300 flex flex-col ${
          collapsed ? "w-20" : "w-64"
        }`}
      >

        {/* TOP */}
        <div className="p-5 flex justify-between items-center border-b border-gray-100">

          {!collapsed && (
            <div>
              <h1 className="font-bold text-2xl text-[#0f5d52]">
                Momento
              </h1>

              <p className="text-xs text-gray-400 tracking-widest">
                THE MINDFUL SCHOLAR
              </p>
            </div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-600 hover:text-[#0f5d52]"
          >
            <Menu size={22} />
          </button>
        </div>

        {/* MENU */}
        <div className="flex flex-col gap-3 px-4 py-6 text-gray-600">

          <Link
            href="/tasklist"
            className="flex items-center gap-3 hover:bg-[#e7f4ef] hover:text-[#0f5d52] px-3 py-3 rounded-xl transition"
          >
            <ClipboardList size={18} />

            {!collapsed && <span>Tasklist</span>}
          </Link>

          <Link
            href="/completed"
            className="flex items-center gap-3 hover:bg-[#e7f4ef] hover:text-[#0f5d52] px-3 py-3 rounded-xl transition"
          >
            <CheckCircle2 size={18} />

            {!collapsed && <span>Completed Tasks</span>}
          </Link>
        </div>

        {/* BUTTON */}
        <div className="mt-auto p-4">
          {!collapsed && (
            <button className="bg-[#0f5d52] hover:bg-[#0c4c43] text-white w-full py-3 rounded-xl font-medium transition">
              + Add Task
            </button>
          )}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 bg-white rounded-3xl p-6 overflow-y-auto shadow-lg">
        {children}
      </div>
    </div>
  );
}