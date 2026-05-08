"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen w-full flex p-6 gap-6">
      
      {/* SIDEBAR */}
      <div
        className={`bg-white rounded-2xl shadow-lg transition-all duration-300 flex flex-col ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        {/* TOP */}
        <div className="p-4 flex justify-between items-center">
          {!collapsed && (
            <h1 className="font-bold text-green-700 text-lg">Momento</h1>
          )}
          <button onClick={() => setCollapsed(!collapsed)}>
            <Menu />
          </button>
        </div>

        {/* MENU */}
        <div className="flex flex-col gap-4 p-4 text-gray-600">
          <div className="hover:text-green-700 cursor-pointer">
            {collapsed ? "🏠" : "Dashboard"}
          </div>
          <div className="hover:text-green-700 cursor-pointer">
            {collapsed ? "📅" : "Calendar"}
          </div>
          <div className="hover:text-green-700 cursor-pointer">
            {collapsed ? "📋" : "Tasklist"}
          </div>
          <div className="hover:text-green-700 cursor-pointer">
            {collapsed ? "✅" : "Completed Tasks"}
          </div>
          <div className="hover:text-green-700 cursor-pointer">
            {collapsed ? "📁" : "Archive"}
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-auto p-4">
          {!collapsed && (
            <button className="bg-green-700 text-white w-full py-2 rounded-lg">
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