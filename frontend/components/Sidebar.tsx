"use client";
import Image from "next/image";
import {
  LayoutDashboard,
  CalendarDays,
  ArchiveRestore,
  Menu,
} from "lucide-react";

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  collapsed,
  setCollapsed,
  activePage,
  setActivePage,
  openModal,
}) {

    if (!sidebarOpen) return null;

  return (
    <div
      style={{
        width: collapsed ? "70px" : "280px",
        transition: "0.3s",
        backgroundColor: "#F1F5F9",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      {/* TOP (Logo + toggle) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          padding: "10px 0px 20px 0px",
        }}
      >
        {!collapsed && (
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Image src="/Momento.jpeg" alt="Logo" width={50} height={50} />
            <div>
              <p style={{ fontWeight: "bold", color: "#165A50" }}>Momento</p>
              <p
                style={{
                  fontSize: "11px",
                  paddingTop: "3px",
                  color: "#64748B",
                }}
              >
                THE MINDFUL SCHOLAR
              </p>
            </div>
          </div>
        )}

        <Menu
          size={22}
          style={{ cursor: "pointer", color: "#165A50" }}
          onClick={() => setCollapsed(!collapsed)}
        />
      </div>

      {/* NAV ITEMS */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* DASHBOARD */}
        <div
          onClick={() => setActivePage("dashboard")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            justifyContent: collapsed ? "center" : "flex-start",
            cursor: "pointer",
            color: activePage === "dashboard" ? "#165A50" : "#64748B",
            fontWeight: activePage === "dashboard" ? "bold" : "normal",
          }}
        >
          <LayoutDashboard size={20} />
          {!collapsed && <span>Dashboard</span>}
        </div>

        {/* CALENDAR */}
        <div
          onClick={() => setActivePage("calendar")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            justifyContent: collapsed ? "center" : "flex-start",
            cursor: "pointer",
            color: activePage === "calendar" ? "#165A50" : "#64748B",
            fontWeight: activePage === "calendar" ? "bold" : "normal",
          }}
        >
          <CalendarDays size={20} />
          {!collapsed && <span>Calendar</span>}
        </div>

        {/* ARCHIVE */}
        <div
          onClick={() => setActivePage("archive")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            justifyContent: collapsed ? "center" : "flex-start",
            cursor: "pointer",
            color: activePage === "archive" ? "#165A50" : "#64748B",
            fontWeight: activePage === "archive" ? "bold" : "normal",
          }}
        >
          <ArchiveRestore size={20} />
          {!collapsed && <span>Archive</span>}
        </div>
      </div>

      {/* ADD TASK BUTTON */}
      <div style={{ marginTop: "auto" }}>
        <button
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "none", // 👈 FIXED (you had "20px" which is wrong)
            backgroundColor: "#165A50",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
          }}
         onClick={openModal}
        >
          {collapsed ? "+" : "+ Add Task"}
          
        </button>
      </div>
    </div>
  );
}