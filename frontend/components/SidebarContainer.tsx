"use client";
import { useState } from "react";
import Sidebar from "./Sidebar"; 
import TaskModal from "./TaskModal"; 

export default function SidebarContainer() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        openModal={() => setIsModalOpen(true)}
      />

      <TaskModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTask={(task) => {console.log("New global task added:", task)
          if (window.location.pathname === "/calendar") {
            window.location.reload();
          }
        }}
        editingTask={null}
      />
    </>
  );
}