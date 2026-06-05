"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import TaskModal from "./TaskModal";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [activePage, setActivePage] = useState("tasklist");

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        activePage={activePage}
        setActivePage={setActivePage}
        openModal={() => setIsModalOpen(true)}
      />

      <main style={{ flex: 1 }}>
        {children}
      </main>

      {/* GLOBAL MODAL (WORKS EVERYWHERE) */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTask={() => {
          setIsModalOpen(false);
        }}
        editingTask={null}
      />
    </div>
  );
}