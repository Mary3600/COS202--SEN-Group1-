"use client";
import { useState, useEffect } from "react";
import { CheckCircle2, Bell, Settings, Filter } from "lucide-react";

interface Task {
  id: string | number;
  title: string;
  date: string;
  priority: string;
  aspect?: string;
}

export default function ArchiveView() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeFilter, setActiveFilter] = useState("All Courses");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("http://localhost:5000/tasks");
        const data = await res.json();
        const formatted = data.map((task: any) => ({
          ...task,
          id: task.id || task._id,
          aspect: task.category || task.aspect || "Academic",
          date: task.dueDate ? task.dueDate.split("T")[0] : task.date,
        }));
        
        // Only keep tasks in the past (Archived)
        const todayStr = new Date().toISOString().split("T")[0];
        const pastTasks = formatted.filter((t: Task) => t.date < todayStr);
        
        // Sort newest first
        pastTasks.sort((a: Task, b: Task) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
        setTasks(pastTasks);
      } catch (err) {
        console.log("Error fetching tasks:", err);
      }
    };
    fetchTasks();
  }, []);

  // Automatically find all unique courses/aspects to build the filter menu
  const uniqueCourses = ["All Courses", ...Array.from(new Set(tasks.map(t => t.aspect || "Other")))];

  // Filter the tasks before grouping them
  const filteredTasks = activeFilter === "All Courses" 
    ? tasks 
    : tasks.filter(t => t.aspect === activeFilter);

  // Group tasks by Month (e.g., "October", "September")
  const groupedTasks = filteredTasks.reduce((acc: any, task) => {
    const dateObj = new Date(task.date);
    const month = dateObj.toLocaleString("default", { month: "long" });
    if (!acc[month]) acc[month] = [];
    acc[month].push(task);
    return acc;
  }, {});

  return (
    <div style={{ flex: 1, padding: "30px 50px", backgroundColor: "#ffffff", minHeight: "100vh" }}>
      
      {/* TOP HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "28px", fontWeight: "bold", color: "#1e293b" }}>Completed Tasks</h1>
          <p style={{ margin: "5px 0 0 0", color: "#64748b", fontSize: "14px" }}>A curated collection of your academic milestones.</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <Bell size={20} color="#64748b" style={{ cursor: "pointer" }} />
          <Settings size={20} color="#64748b" style={{ cursor: "pointer" }} />
          <span style={{ fontSize: "14px", fontWeight: "600", color: "#165A50" }}>Fall Semester</span>
        </div>
      </div>

      {/* FILTER BUTTONS */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "40px", flexWrap: "wrap" }}>
        {uniqueCourses.map((course) => (
          <button
            key={course}
            onClick={() => setActiveFilter(course)}
            style={{
              padding: "8px 16px",
              borderRadius: "20px",
              border: activeFilter === course ? "none" : "1px solid #e2e8f0",
              backgroundColor: activeFilter === course ? "#f1f5f9" : "#fff",
              color: activeFilter === course ? "#165A50" : "#64748b",
              fontWeight: activeFilter === course ? "bold" : "normal",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            {course}
          </button>
        ))}
      </div>

      {/* RENDER GROUPED TASKS */}
      <div style={{ maxWidth: "1000px" }}>
        {Object.keys(groupedTasks).length === 0 && (
          <p style={{ color: "#94a3b8" }}>No completed tasks found for this filter.</p>
        )}

        {Object.keys(groupedTasks).map((month) => (
          <div key={month} style={{ marginBottom: "40px" }}>
            
            {/* MONTH HEADER */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e2e8f0", paddingBottom: "10px", marginBottom: "20px" }}>
              <h2 style={{ margin: 0, fontSize: "20px", color: "#b91c1c" }}>{month}</h2>
              <span style={{ fontSize: "12px", color: "#94a3b8", fontWeight: "bold", letterSpacing: "1px" }}>
                {groupedTasks[month].length} TASKS DONE
              </span>
            </div>

            {/* COLUMN LABELS */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", padding: "0 20px", marginBottom: "10px", fontSize: "12px", color: "#cbd5e1", fontWeight: "bold", letterSpacing: "1px" }}>
              <span>TASK NAME</span>
              <span>COURSE NAME</span>
              <span style={{ textAlign: "right" }}>DATE COMPLETED</span>
            </div>

            {/* TASKS IN THIS MONTH */}
            {groupedTasks[month].map((task: Task) => {
              const formattedDate = new Date(task.date).toLocaleString("default", { month: "short", day: "numeric" });
              
              return (
                <div
                  key={task.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr 1fr",
                    alignItems: "center",
                    padding: "16px 20px",
                    backgroundColor: "#fff",
                    border: "1px solid #f1f5f9",
                    borderRadius: "12px",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.02)",
                    marginBottom: "10px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                    <CheckCircle2 size={20} color="#10b981" />
                    <span style={{ fontSize: "15px", fontWeight: "500", color: "#1e293b" }}>{task.title}</span>
                  </div>

                  <div>
                    <span style={{ backgroundColor: "#ecfdf5", color: "#059669", padding: "4px 12px", borderRadius: "15px", fontSize: "12px", fontWeight: "600" }}>
                      {task.aspect}
                    </span>
                  </div>

                  <div style={{ textAlign: "right", fontSize: "14px", color: "#64748b" }}>
                    {formattedDate}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}