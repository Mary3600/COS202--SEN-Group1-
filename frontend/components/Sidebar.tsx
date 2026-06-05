"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  ArchiveRestore,
  Menu,
} from "lucide-react";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  openModal: () => void;
}

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  collapsed,
  setCollapsed,
  openModal,
}:SidebarProps) {
  const pathname = usePathname();

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
        <Link 
          href="/dashboard" 
          style={{ textDecoration: "none" }} 
        >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            justifyContent: collapsed ? "center" : "flex-start",
            cursor: "pointer",
            color: pathname === "/dashboard" ? "#165A50" : "#64748B",
            fontWeight: pathname === "/dashboard" ? "bold" : "normal",
          }}
        >
          <LayoutDashboard size={20} />
          {!collapsed && <span>Dashboard</span>}
        </div>
        </Link>
        {/* CALENDAR */}
        <Link href="/calendar" style={{ textDecoration: "none" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            justifyContent: collapsed ? "center" : "flex-start",
            cursor: "pointer",
            color: pathname === "/calendar" ? "#165A50" : "#64748B",
            fontWeight: pathname === "/calendar" ? "bold" : "normal",
          }}
        >
          <CalendarDays size={20} />
          {!collapsed && <span>Calendar</span>}
        </div>
        </Link>
        {/* ARCHIVE */}
        <Link href="/archive" style={{ textDecoration: "none" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            justifyContent: collapsed ? "center" : "flex-start",
            cursor: "pointer",
            color: pathname === "/archive" ? "#165A50" : "#64748B",
              fontWeight: pathname === "/archive" ? "bold" : "normal",
          }}
        >
          <ArchiveRestore size={20} />
          {!collapsed && <span>Archive</span>}
        </div>
        </Link>
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