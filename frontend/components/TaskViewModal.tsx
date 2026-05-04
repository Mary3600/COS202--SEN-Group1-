"use client";
import { useState } from "react";

export default function TaskViewModal({
  isOpen,
  onClose,
  task,
  onDelete,
  onEdit,
}) {
  if (!isOpen || !task) return null;

  // priority color (soft like we updated)
  const getPriorityColor = () => {
    if (task.priority === "high") return "#fecaca";
    if (task.priority === "medium") return "#fef08a";
    return "#bbf7d0";
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
        background: "rgba(0,0,0,0.4)",
        backdropFilter: "blur(8px)", // ✨ glossy effect
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "420px",
          background: "#ffffff",
          borderRadius: "20px",
          padding: "25px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
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
            padding: "5px 12px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: "600",
          }}
        >
          {task.priority.toUpperCase()} PRIORITY
        </div>

        {/* TITLE */}
        <h2 style={{ margin: 0 }}>{task.title}</h2>

        {/* DESCRIPTION (using aspect as placeholder info) */}
        <p style={{ color: "#64748B", fontSize: "14px" }}>
          Aspect: {task.aspect || "N/A"}
        </p>

        {/* DATE */}
        <div style={{ fontSize: "14px" }}>
          📅 {task.date}
        </div>

        {/* ACTION BUTTONS */}
        <div
          style={{
            display: "flex",
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
              background: "#e5e7eb",
              cursor: "pointer",
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
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}