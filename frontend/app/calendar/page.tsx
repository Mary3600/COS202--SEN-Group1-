"use client";

import { useState, useEffect } from "react";
import TaskViewModal from "../../components/TaskViewModal";

import {
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";

interface Task {
  id: number;
  title: string;
  date: string;
  priority: string;
}

export default function CalendarView() {
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [activePage, setActivePage] = useState("calendar");
  const [currentDate, setCurrentDate] = useState(new Date());

  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);

  // FETCH TASKS
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("http://localhost:5000/tasks");
        const data = await res.json();

        const formatted = data.map((task: any) => ({
          ...task,
          date: task.dueDate.split("T")[0],
        }));

        setTasks(formatted.filter((task: any) => !task.completed));
      } catch (err) {
        console.log("Error fetching tasks:", err);
      }
    };

    fetchTasks();
  }, []);

  // CALENDAR CALCS
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));

  // TASK MODAL ACTIONS
  const deleteTask = async (id: number) => {
    try {
      await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "DELETE",
      });

      setIsViewOpen(false);

      // refresh
      const res = await fetch("http://localhost:5000/tasks");
      const data = await res.json();

      const formatted = data.map((task: any) => ({
        ...task,
        date: task.dueDate.split("T")[0],
      }));

      setTasks(formatted.filter((t: any) => !t.completed));
    } catch (err) {
      console.log(err);
    }
  };

  const completeTask = async (task: Task) => {
    try {
      await fetch(`http://localhost:5000/tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...task,
          completed: true,
        }),
      });

      setIsViewOpen(false);

      // refresh
      const res = await fetch("http://localhost:5000/tasks");
      const data = await res.json();

      const formatted = data.map((task: any) => ({
        ...task,
        date: task.dueDate.split("T")[0],
      }));

      setTasks(formatted.filter((t: any) => !t.completed));
    } catch (err) {
      console.log(err);
    }
  };

  // COLORS
  const getColor = (priority: string) => {
    if (priority === "high") return "#FFDAD6";
    if (priority === "medium") return "#FDF2D0";
    return "#bbf7d0";
  };

  const getFontColor = (priority: string) => {
    if (priority === "high") return "#93000A";
    if (priority === "medium") return "#D4980A";
    return "#2E9E5B";
  };

  return (
    <div style={{ padding: "30px", backgroundColor: "#fff", minHeight: "100vh" }}>
      
      {/* TOP BAR */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "40px" }}>
        
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button onClick={prevMonth} style={{ background: "none", border: "none" }}>
            <ChevronLeft size={20} />
          </button>

          <h2 style={{ fontWeight: "bold", fontSize: "20px" }}>
            {monthName}
          </h2>

          <button onClick={nextMonth} style={{ background: "none", border: "none" }}>
            <ChevronRight size={20} />
          </button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Search size={16} />
          <Bell size={18} />
          <Settings size={18} />
        </div>
      </div>

      {/* DAYS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", textAlign: "center", marginBottom: "10px" }}>
        {days.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* GRID */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "10px" }}>
        {[...Array(35)].map((_, index) => {
          const currentDay = index - firstDay + 1;

          const prevMonthDays = new Date(year, month, 0).getDate();

          let displayDay;
          let cellMonth = month;
          let cellYear = year;

          if (currentDay <= 0) {
            displayDay = prevMonthDays + currentDay;
            cellMonth = month - 1;
          } else if (currentDay > daysInMonth) {
            displayDay = currentDay - daysInMonth;
            cellMonth = month + 1;
          } else {
            displayDay = currentDay;
          }

          const fullDate = `${cellYear}-${String(cellMonth + 1).padStart(2, "0")}-${String(displayDay).padStart(2, "0")}`;

          const dayTasks = tasks.filter((t) => t.date === fullDate);
          const visibleTasks = dayTasks.slice(0, 2);
          const remaining = dayTasks.length - visibleTasks.length;

          return (
            <div key={index} style={{ border: "1px solid #eee", padding: "10px", minHeight: "100px" }}>
              
              <div style={{ fontWeight: "bold" }}>{displayDay}</div>

              {visibleTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => {
                    setSelectedTask(task);
                    setIsViewOpen(true);
                  }}
                  style={{
                    backgroundColor: getColor(task.priority),
                    color: getFontColor(task.priority),
                    fontSize: "10px",
                    marginTop: "5px",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  {task.title}
                </div>
              ))}

              {remaining > 0 && (
                <div style={{ fontSize: "10px", marginTop: "5px" }}>
                  +{remaining} more
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* VIEW MODAL */}
      <TaskViewModal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        task={selectedTask}
        onDelete={deleteTask}
        onComplete={completeTask}
        onEdit={() => {}}
      />
    </div>
  );
}