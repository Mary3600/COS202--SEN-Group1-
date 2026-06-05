"use client";
import { useState, useEffect } from "react";

// 1. Prisma Task Type Definition
interface Task {
  id: string | number; // Prisma objects use clean string hashes or auto-incrementing ints
  title: string;
  priority: "low" | "medium" | "high" | string;
  category: string;    
  dueDate: string;     
  date?: string;       
}

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (taskData: any) => void; 
  editingTask: any | null; 
}

export default function TaskModal({
  isOpen,
  onClose,
  onAddTask,
  editingTask,
}: TaskModalProps)  {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("medium"); 
  const [aspect, setAspect] = useState("academic");
  const [error, setError] = useState(""); 

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDate(editingTask.date || editingTask.dueDate?.split("T")[0] || "");
      setPriority(editingTask.priority);
      setAspect(editingTask.category || editingTask.aspect || "academic");
    }
  }, [editingTask]);

  if (!isOpen) return null;

  // 2. Prisma Create Expectation: Omit the database-managed 'id'
  const createTask = async (taskData: Omit<Task, "id">) => {
    try {
      const res = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      return await res.json();
    } catch (err) {
      console.log("Prisma Create error:", err);
    }
  };

  // 3. Prisma Update Expectation: Match target ID and supply partial details
  const updateTask = async (id: string | number, taskData: Partial<Omit<Task, "id">>) => {
    try {
      const res = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      return await res.json();
    } catch (err) {
      console.log("Prisma Update error:", err);
    }
  };

  const handleSubmit = async () => {
    if (!title || !date) {
      setError("Please fill all fields");
      return;
    }

    setError("");

    // Your Prisma-mapped request body variables 
    const taskPayload = {
      title,
      priority,
      category: aspect,
      dueDate: date,
    };

    let taskResult;

    try {
      if (editingTask) {
        const taskId = editingTask.id; // Prisma unifies identifiers under '.id'
        if (!taskId) {
          setError("Task ID not found.");
          return;
        }
        taskResult = await updateTask(taskId, taskPayload);
      } else {
        taskResult = await createTask(taskPayload);
      }

      if (!taskResult) {
        setError("Something went wrong. Try again.");
        return;
      }

      onAddTask({
        ...taskResult,
        date: taskResult.dueDate?.split("T")[0],
      });

      setTitle("");
      setDate("");
      setPriority("medium");
      setAspect("academic");

      onClose();
    } catch (err) {
      console.log("Submit error:", err);
      setError("Network error");
    }
  };

  return (
    <div
      onClick={onClose} 
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        color: "black",
        height: "100%",
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
          padding: "20px 32px 32px 32px",
          boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
          borderRadius: "10px",
          width: "500px",
          height: "600px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <h3 style={{ color: '#165A50', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: "bold" }}>
          New Entry
        </h3>

        <p style={{ color: "#BFC9C5", fontWeight: "700" }}>
          What do you need to remember?
        </p>

        <textarea
          style={{
            background: "#F2F4F3",
            borderRadius: "12px",
            height: "80px",
            border: "none",
            padding: "10px",
            fontSize: "15px",
            resize: "none",
          }}
          placeholder="Description / Notes"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {error && (
          <p style={{ color: "red", fontSize: "12px", marginTop: "-10px" }}>
            {error}
          </p>
        )}

        {/* PRIORITY */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <p style={{ color: "#BFC9C5", fontWeight: "700" }}>Priority</p>

          <div style={{ display: "flex", gap: "10px" }}>
            {["low", "medium", "high"].map((level) => (
              <div
                key={level}
                onClick={() => setPriority(level)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "6px 10px",
                  borderRadius: "20px",
                  border: "1.5px solid #e2e8f0",
                  cursor: "pointer",
                  backgroundColor: priority === level ? "#e2e8f0" : "transparent",
                }}
              >
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor:
                      level === "high"
                        ? "#de2e2e"
                        : level === "medium"
                        ? "#fbb128"
                        : "#3ceb42",
                  }}
                />
                <span style={{ fontSize: "14px" }}>{level}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ASPECT */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <p style={{ color: "#BFC9C5", fontWeight: "700" }}>Aspect</p>
          <select
            value={aspect}
            onChange={(e) => setAspect(e.target.value)}
            style={{
              background: "#F2F4F3",
              border: "none",
              borderRadius: "8px",
              padding: "8px",
              fontSize: "14px",
              outline: "none",
              width: "100%",
            }}
          >
            <option value="academic">Academic</option>
            <option value="personal">Personal</option>
          </select>
        </div>

        {/* DATE */}
        <div>
          <p style={{ color: "#BFC9C5", fontWeight: "700" }}>When?</p>
          <input
            style={{
              width: "100%",
              outline: "none",
              border: "none",
              height: "50px",
              background: "#F2F4F3",
              padding: "10px",
            }}
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* BANNER IMAGE */}
        <div
          style={{
            width: "100%",
            height: "120px",
            borderRadius: "16px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <img
            src="/notebook.jpg"
            alt="banner"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(to right, rgba(22,90,80,0.6), rgba(0,0,0,0.2))",
            }}
          />
        </div>

        {/* BUTTONS */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "5px",
          }}
        >
          <button
            onClick={onClose}
            type="button"
            style={{
              padding: "5px 20px",
              borderRadius: "15px",
              background: "#FF4B33",
              color: "white",
              cursor: "pointer",
              border: "none"
            }}
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            type="button"
            style={{
              padding: "5px 20px",
              borderRadius: "15px",
              background: "#165A50",
              color: "white",
              cursor: "pointer",
              border: "none"
            }}
          >
            {editingTask ? "Update Task" : "Add Task"}
          </button>
        </div>
      </div>
    </div>
  );
}