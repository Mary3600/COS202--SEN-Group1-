"use client";
import { useState } from "react";
import {  CalendarDays  } from "lucide-react";

export default function TaskViewModal({
  isOpen,
  onClose,
  task,
  onDelete,
  onEdit,
  onComplete,
}) {
  if (!isOpen || !task) return null;

  // priority color (soft like we updated)
  const getPriorityColor = () => {
    if (task.priority === "high") return "#FFDAD6";
    if (task.priority === "medium") return "#FDF2D0";
    return "#bbf7d0";
  };

  const getPriorityFontColor = () => {
    if (task.priority === "high") return "#93000A";
    if (task.priority === "medium") return "#D4980A";
    return "#2E9E5B";
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "384px",
          
          background: "rgba(255, 255, 255, 0.4)",
          backdropFilter: "blur(3px)",
          border: "8px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
          borderRadius: "20px",
          padding: "25px",
          
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        {/* PRIORITY TAG */}
        <div
          style={{
            alignSelf: "flex-start",
            background: getPriorityColor(),
            color: getPriorityFontColor(),
            padding: "5px 12px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: "600",
          }}
        >
          {task.priority.toUpperCase()} PRIORITY
        </div>

        {/* TITLE */}
        <h2 style={{ margin: 0, color:"#191C1C", fontSize:"24px", fontWeight:"700", fontFamily:"Plus Jakarta Sans", lineHeight:"32px" }}>{task.title}</h2>

        {/* DESCRIPTION (using aspect as placeholder info) */}
        <p style={{ color: "#64748B", fontSize: "14px", fontWeight:"400" }}>
          Aspect: {task.aspect || "N/A"}
        </p>

        {/* DATE */}
        <div style={{ fontSize: "14px", display:"flex", gap:"12px", color:"#191C1C" }}>
          <CalendarDays size={20} color="#165A50"  display= "block"/>{task.date}
        </div>

        {/* ACTION BUTTONS */}
        <div
          style={{
            display: "flex",
            width:"100%",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <button
            onClick={() => onEdit(task)}
            style={{
              padding: "10px 15px",
              borderRadius: "10px",
              border: "none",
              background: "#165A50",
              cursor: "pointer",
              width:"25%",
              height:"30%",
            }}
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(task.id)}
            style={{
              padding: "10px 15px",
              borderRadius: "10px",
              border: "none",
              background: "#ef4444",
              color: "#fff",
              cursor: "pointer",
              width:"25%",
              height:"30%",
            }}
          >
            Delete
          </button>

          <button
  onClick={() => onComplete(task)}
  style={{
    padding: "10px 15px",
              borderRadius: "10px",
              border: "none",
              background: "#22c55e",
              color: "#fff",
              cursor: "pointer",
              width:"40%",
              height:"30%",
  }}
>
   Complete
</button>
        </div>
      </div>
    </div>
  );
}