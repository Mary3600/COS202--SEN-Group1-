"use client";
import { useState, useEffect } from "react";
import { Bell, Settings, Search, CheckCircle2, Clock } from "lucide-react";

interface Task {
  id: string | number;
  title: string;
  date: string;
  priority: string;
  aspect?: string;
}

export default function DashboardView() {
  const [tasks, setTasks] = useState<Task[]>([]);

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
        setTasks(formatted);
      } catch (err) {
        console.log("Error fetching tasks:", err);
      }
    };
    fetchTasks();
  }, []);

  // Time Helpers
  const todayDate = new Date();
  const todayStr = todayDate.toISOString().split("T")[0];
  
  const tomorrowDate = new Date(todayDate);
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrowStr = tomorrowDate.toISOString().split("T")[0];

  const endOfWeekDate = new Date(todayDate);
  endOfWeekDate.setDate(endOfWeekDate.getDate() + 7);
  const endOfWeekStr = endOfWeekDate.toISOString().split("T")[0];

  // Group Tasks
  const todayTasks = tasks.filter((t) => t.date === todayStr);
  const tomorrowTasks = tasks.filter((t) => t.date === tomorrowStr);
  const thisWeekTasks = tasks.filter((t) => t.date > tomorrowStr && t.date <= endOfWeekStr);

  const getPriorityColor = (priority: string) => {
    if (priority === "high") return { bg: "#FFDAD6", text: "#93000A" };
    if (priority === "medium") return { bg: "#FDF2D0", text: "#D4980A" };
    return { bg: "#bbf7d0", text: "#2E9E5B" };
  };

  const TaskCard = ({ task }: { task: Task }) => {
    const colors = getPriorityColor(task.priority);
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 20px",
          backgroundColor: "#fff",
          border: "1px solid #f1f5f9",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
          marginBottom: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <CheckCircle2 size={24} color="#cbd5e1" style={{ cursor: "pointer" }} />
          <div>
            <h4 style={{ margin: 0, fontSize: "16px", fontWeight: "600", color: "#1e293b" }}>
              {task.title}
            </h4>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "4px" }}>
              <span style={{ fontSize: "12px", color: "#64748b", display: "flex", alignItems: "center", gap: "4px" }}>
                <Clock size={12} /> {task.date}
              </span>
              <span style={{ fontSize: "12px", color: "#94a3b8" }}>•</span>
              <span style={{ fontSize: "12px", color: "#64748b" }}>{task.aspect}</span>
            </div>
          </div>
        </div>
        <div
          style={{
            backgroundColor: colors.bg,
            color: colors.text,
            padding: "4px 12px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: "bold",
            textTransform: "capitalize",
          }}
        >
          {task.priority}
        </div>
      </div>
    );
  };

  return (
    <div style={{ flex: 1, padding: "30px 50px", backgroundColor: "#ffffff", minHeight: "100vh" }}>
      
      {/* TOP HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
        <div>
          <p style={{ margin: 0, color: "#64748b", fontSize: "14px" }}>Hi there,</p>
          <h1 style={{ margin: 0, fontSize: "28px", fontWeight: "bold", color: "#165A50" }}>Upcoming Tasks</h1>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <Bell size={20} color="#64748b" style={{ cursor: "pointer" }} />
          <Settings size={20} color="#64748b" style={{ cursor: "pointer" }} />
          <div style={{ width: "35px", height: "35px", borderRadius: "50%", backgroundColor: "#165A50", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>
            A
          </div>
        </div>
      </div>

      {/* TASK LISTS (Taking full width) */}
      <div style={{ maxWidth: "900px" }}>
        
        {/* TODAY */}
        <div style={{ marginBottom: "30px" }}>
          <h3 style={{ fontSize: "16px", color: "#1e293b", borderBottom: "1px solid #e2e8f0", paddingBottom: "10px", marginBottom: "15px" }}>
            Today
          </h3>
          {todayTasks.length === 0 ? <p style={{ color: "#94a3b8", fontSize: "14px" }}>No tasks for today. Take a breather!</p> : todayTasks.map(t => <TaskCard key={t.id} task={t} />)}
        </div>

        {/* TOMORROW */}
        <div style={{ marginBottom: "30px" }}>
          <h3 style={{ fontSize: "16px", color: "#1e293b", borderBottom: "1px solid #e2e8f0", paddingBottom: "10px", marginBottom: "15px" }}>
            Tomorrow
          </h3>
          {tomorrowTasks.length === 0 ? <p style={{ color: "#94a3b8", fontSize: "14px" }}>Nothing scheduled for tomorrow yet.</p> : tomorrowTasks.map(t => <TaskCard key={t.id} task={t} />)}
        </div>

        {/* THIS WEEK */}
        <div>
          <h3 style={{ fontSize: "16px", color: "#1e293b", borderBottom: "1px solid #e2e8f0", paddingBottom: "10px", marginBottom: "15px" }}>
            Later This Week
          </h3>
          {thisWeekTasks.length === 0 ? <p style={{ color: "#94a3b8", fontSize: "14px" }}>Your week looks clear!</p> : thisWeekTasks.map(t => <TaskCard key={t.id} task={t} />)}
        </div>

      </div>
    </div>
  );
}