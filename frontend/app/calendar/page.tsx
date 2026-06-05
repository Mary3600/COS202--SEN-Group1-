"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import TaskModal from "../../components/TaskModal";
import TaskViewModal from "../../components/TaskViewModal";

import Image from "next/image";
import { Bell, Settings, ChevronLeft, ChevronRight, Search, LayoutDashboard, CalendarDays, ArchiveRestore, Menu, Bold  } from "lucide-react";

interface Task {
  id: number;
  title: string;
  date: string;
  priority: string;
}

export default function CalendarView() {
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const [activePage, setActivePage] = useState("calendar");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

const [tasks, setTasks] = useState([]);

const deleteTask = async (id: number) => {
  try {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });

    fetchTasks(); // refresh from backend
    setIsViewOpen(false); // close modal after delete
  } catch (err) {
    console.log("Error deleting task:", err);
  }
};

const completeTask = async (task) => {
  try {
    await fetch(`http://localhost:5000/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...task,
        completed: true,
      }),
    });

    fetchTasks();
    setIsViewOpen(false);
  } catch (err) {
    console.log("Error completing task:", err);
  }
};

useEffect(() => {
  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:5000/tasks");
      const data = await res.json();

      // ✅ NORMALIZE DATA HERE
      const formatted = data.map((task) => ({
        ...task,
        date: task.dueDate.split("T")[0], // convert to YYYY-MM-DD
      }));

      setTasks(formatted);
    } catch (err) {
      console.log("Error fetching tasks:", err);
    }
  };
  
  fetchTasks();
}, []);

const fetchTasks = async () => {
  try {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();

    const formatted = data.map((task) => ({
      ...task,
      date: task.dueDate.split("T")[0],
    }));

    setTasks(
  formatted.filter((task) => !task.completed)
);
  } catch (err) {
    console.log(err);
  }
};

const [sidebarOpen, setSidebarOpen] = useState(true);
const [collapsed, setCollapsed] = useState(false);
const [selectedTask, setSelectedTask] = useState<Task | null>(null);
const [isViewOpen, setIsViewOpen] = useState(false);  

  // CALCULATIONS
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  // FUNCTIONS
  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

 const handleAddTask = (newTask:Task) => {
  setTasks((prev) => {
    const existingTask = prev.find(
      (task) => task.id === newTask.id
    );

    // EDIT existing task
    if (existingTask) {
      return prev.map((task) =>
        task.id === newTask.id ? newTask : task
      );
    }

    // ADD new task
    return [...prev, newTask];
  });
};


const handleEdit = (task:Task) => {
  setEditingTask(task);
  setIsViewOpen(false);
  setIsModalOpen(true);
};

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>

   <Sidebar
  sidebarOpen={sidebarOpen}
  setSidebarOpen={setSidebarOpen}
  collapsed={collapsed}
  setCollapsed={setCollapsed}
  activePage={activePage}
  setActivePage={setActivePage}
  openModal={() => setIsModalOpen(true)}
/>

      {/* 🟩 MAIN CONTENT */}
      <div
        style={{
          flex: 1,
          padding: "30px",
          backgroundColor: "#ffffff",
          
        }}
      >
        {/* OPEN SIDEBAR BUTTON */}
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            style={{ 
              marginBottom: "20px",
              padding: "6px 10px",
              cursor: "pointer",
            }}
          >
            Open Menu
          </button>
        )}

        {/* TOP BAR */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "50px",
          }}
        >
          {/* LEFT */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button onClick={prevMonth} style={{ border: "none", background: "none" }}>
              <ChevronLeft size={20} color="#165A50" />
            </button>

            <h2 style={{ fontWeight: "bold", fontSize: "20px", color: "#165A50" }}>
              {monthName}
            </h2>

            <button onClick={nextMonth} style={{ border: "none", background: "none" }}>
              <ChevronRight size={20} color="#165A50" />
            </button>
          </div>

          {/* RIGHT */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#f9f9f9",
                borderRadius: "20px",
                padding: "6px 10px",
                border: "1px solid #ddd",
              }}
            >
              <Search size={16} color="#888" />
              <input
                type="text"
                placeholder="Search tasks..."
                style={{
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  marginLeft: "8px",
                }}
              />
            </div>

            <Bell size={20} color="black" />
            <Settings size={20} color="black" />
          </div>
        </div>

        {/* DAYS ROW */}
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

        {/* CALENDAR GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: "15px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {[...Array(35)].map((_, index) => {
            const startDay = firstDay;
            const currentDay = index - startDay + 1;

            const prevMonthDays = new Date(year, month, 0).getDate();

            let displayDay;
            let isCurrentMonth = true;

            if (currentDay <= 0) {
              displayDay = prevMonthDays + currentDay;
              isCurrentMonth = false;
            } else if (currentDay > daysInMonth) {
              displayDay = currentDay - daysInMonth;
              isCurrentMonth = false;
            } else {
              displayDay = currentDay;
            }

let cellMonth = month;
let cellYear = year;

if (currentDay <= 0) {
  cellMonth = month - 1;
} else if (currentDay > daysInMonth) {
  cellMonth = month + 1;
}

const fullDate = `${cellYear}-${String(cellMonth + 1).padStart(2, "0")}-${String(displayDay).padStart(2, "0")}`;
            const dayTasks = tasks.filter(task => task.date === fullDate);

            const visibleTasks = dayTasks.slice(0, 2);
            const remainingCount = dayTasks.length - visibleTasks.length;

            const getColor = (priority:string) => {
  if (priority === "high") return "#FFDAD6";
  if (priority === "medium") return "#FDF2D0";
  return "#bbf7d0";
};

const getFontColor = (priority:string) => {
  if (priority === "high") return "#93000A";
  if (priority === "medium") return "#D4980A";
  return "#2E9E5B";
};

            const isToday =
              isCurrentMonth &&
              displayDay === new Date().getDate() &&
              month === new Date().getMonth() &&
              year === new Date().getFullYear();

            return (
              <div
                key={index}
                style={{
                  height: "100px",
                  maxWidth:"150px",
                  border: "1px solid #eee",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                  borderRadius: "12px",
                  padding: "10px",
                  display: "flex",
                  flexDirection: "column",
                  opacity: isCurrentMonth ? 1 : 0.4,
                  backgroundColor: isToday ? "#165A50" : "#f5f5f5",
                }}
              >
                <div
                  style={{
                    fontWeight: "600",
                    fontSize: "14px",
                    color: isToday ? "#fff" : "#333",
                  }}
                >
                  {displayDay}
                </div>

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
      fontWeight:"bold",
      padding: "2px 6px",
      borderRadius: "4px",
      fontSize: "10px",
      marginTop: "4px",
      cursor: "pointer",
    }}
  >
    {task.title}
  </div>
))}

                {remainingCount > 0 && (
                  <div
                    style={{
                      fontSize: "10px",
                      color: isToday ? "#ffff" : "#555",
                      marginTop: "4px",
                      
                    }}
                  >
                    +{remainingCount} more
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
       <TaskModal
  isOpen={isModalOpen}
  onClose={() => {
    setIsModalOpen(false);
    setEditingTask(null);
  }}
  onAddTask={fetchTasks}
  editingTask={editingTask}
/>
 <TaskViewModal
  isOpen={isViewOpen}
  onClose={() => setIsViewOpen(false)}
  task={selectedTask}
  onDelete={deleteTask}
  onEdit={handleEdit}
  onComplete={completeTask}

/>

    
    </div>
  );
}