"use client";

import { useState, useEffect } from "react";

export default function TaskModal({
  isOpen,
  onClose,
  onAddTask,
  editingTask,
}: any) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [aspect, setAspect] = useState("academic");
  const [error, setError] = useState("");

  // ✅ FIX: properly sync edit vs create mode
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || "");
      setDate(editingTask.date || "");
      setPriority(editingTask.priority || "medium");
      setAspect(editingTask.aspect || editingTask.category || "academic");
    } else {
      // reset when switching to "add mode"
      setTitle("");
      setDate("");
      setPriority("medium");
      setAspect("academic");
      setError("");
    }
  }, [editingTask, isOpen]);

  if (!isOpen) return null;

  const createTask = async (taskData: any) => {
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    });

    return await res.json();
  };

  const updateTask = async (id: number, taskData: any) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    });

    return await res.json();
  };

  const handleSubmit = async () => {
    if (!title || !date) {
      setError("Please fill all fields");
      return;
    }

    setError("");

    const taskPayload = {
      title,
      priority,
      aspect, // ✅ FIX: use consistent field name
      dueDate: date,
    };

    try {
      let result;

      if (editingTask) {
        result = await updateTask(editingTask.id, taskPayload);
      } else {
        result = await createTask(taskPayload);
      }

      if (!result) {
        setError("Something went wrong");
        return;
      }

      onAddTask({
        ...result,
        date: result.dueDate?.split("T")[0],
      });

      onClose();
    } catch (err) {
      console.log(err);
      setError("Network error");
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          padding: "24px",
          borderRadius: "12px",
          width: "500px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <h3 style={{ color: "#165A50", fontWeight: "bold" }}>
          {editingTask ? "Update Task" : "New Task"}
        </h3>

        <textarea
          placeholder="Description"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError("");
          }}
          style={{
            background: "#F2F4F3",
            border: "none",
            padding: "10px",
            borderRadius: "10px",
          }}
        />

        {error && (
          <p style={{ color: "red", fontSize: "12px" }}>{error}</p>
        )}

        {/* PRIORITY */}
        <div style={{ display: "flex", gap: "10px" }}>
          {["low", "medium", "high"].map((level) => (
            <div
              key={level}
              onClick={() => setPriority(level)}
              style={{
                padding: "6px 10px",
                borderRadius: "20px",
                cursor: "pointer",
                background:
                  priority === level ? "#e2e8f0" : "transparent",
                border: "1px solid #ddd",
              }}
            >
              {level}
            </div>
          ))}
        </div>

        {/* ASPECT */}
        <select
          value={aspect}
          onChange={(e) => setAspect(e.target.value)}
          style={{
            padding: "8px",
            background: "#F2F4F3",
            border: "none",
            borderRadius: "8px",
          }}
        >
          <option value="academic">Academic</option>
          <option value="personal">Personal</option>
        </select>

        {/* DATE */}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{
            padding: "10px",
            background: "#F2F4F3",
            border: "none",
            borderRadius: "8px",
          }}
        />

        {/* BUTTONS */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button onClick={onClose} style={{ color: "red" }}>
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            style={{
              background: "#165A50",
              color: "white",
              padding: "8px 16px",
              borderRadius: "10px",
            }}
          >
            {editingTask ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}