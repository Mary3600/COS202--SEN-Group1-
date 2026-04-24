"use client";
import { Bell, Settings, ChevronLeft, ChevronRight } from "lucide-react";

export default function CalendarView() {
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#ffffff",
        minHeight: "100vh",
        
      }}
    >

      {/* 🔝 TOP BAR */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "50px", // 👈 space UNDER the top bar
        }}
      >
        {/* Left side */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button style={{ border: "none", background: "none" }}>
  <ChevronLeft size={20} color="black" />
</button>

          <h2 style={{ fontWeight: "bold", fontSize: "18px", color: "#165A50" }}>
            April 2026
          </h2>

          <button style={{ border: "none", background: "none" }}>
  <ChevronRight size={20} color="black" />
</button>
        </div>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <input
            type="text"
            placeholder="Search tasks..."
            style={{
              padding: "8px 12px",
              borderRadius: "20px",
              width: "300px",
              border: "1px solid #ddd",
              outline: "none",
            }}
          />

          <Bell size={20} color="black" />
          <Settings size={20} color="black" />
        </div>
      </div>

      {/*  DAYS ROW */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          maxWidth: "1200px",
          margin: "0 auto",
          marginBottom: "10px",
          textAlign: "center",
          color: "#64748B",
          fontSize: "12px",
        }}
      >
        {days.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* 📆 CALENDAR GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "15px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {[...Array(31)].map((_, index) => (
          <div
            key={index}
            style={{
              height: "100px",
              border: "1px solid #eee",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              borderRadius: "12px",
              backgroundColor: "#f5f5f5",
              padding: "10px",
              fontSize: "14px",
            }}
          >
            {index + 1}
          </div>
        ))}
      </div>

    </div>
  );
}