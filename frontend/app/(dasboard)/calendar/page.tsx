"use client";
import { useState, useEffect } from "react";
import TaskModal from "../../../components/TaskModal";
import TaskViewModal from "../../../components/TaskViewModal";
import { Bell, Settings, ChevronLeft, ChevronRight, Search } from "lucide-react";

// 1. Fully defined Task interface matching your backend fields
interface Task {
  id: number;
  _id?: string; // added optional string for backend compatibility
  title: string;
  date: string;
  dueDate: string; // added to satisfy the typescript mapper safely
  priority: "high" | "medium" | "low" | string;
  
}

export default function CalendarView() {
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 2. Strongly typed the tasks state array
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);  

  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:5000/tasks");
      const data = await res.json();

      // Normalize data safely with TypeScript type assertion
      const formatted = data.map((task: Task) => ({
        ...task,
        date: task.dueDate ? task.dueDate.split("T")[0] : "", 
      }));

      setTasks(formatted);
    } catch (err) {
      console.log("Error fetching tasks:", err);
    }
  };

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

  useEffect(() => {
    fetchTasks();
  }, []);

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

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsViewOpen(false);
    setIsModalOpen(true);
  };

  return (
    // 3. Removed full screen outer wrappers and Sidebar component
    <div style={{ flex: 1, padding: "30px", backgroundColor: "#ffffff" }}>
      
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
          <button onClick={prevMonth} style={{ border: "none", background: "none", cursor: "pointer" }}>
            <ChevronLeft size={20} color="#165A50" />
          </button>

          <h2 style={{ fontWeight: "bold", fontSize: "20px", color: "#165A50" }}>
            {monthName}
          </h2>

          <button onClick={nextMonth} style={{ border: "none", background: "none", cursor: "pointer" }}>
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

          <Bell size={20} color="black" style={{ cursor: "pointer" }} />
          <Settings size={20} color="black" style={{ cursor: "pointer" }} />
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
          background: "transparent"
        }}
      >
        {[...Array(35)].map((_, index) => {
          const startDay = firstDay;
          const currentDay = index - startDay + 1;
          const prevMonthDays = new Date(year, month, 0).getDate();

          let displayDay: number;
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
          const dayTasks = tasks.filter((task) => task.date === fullDate);

          const visibleTasks = dayTasks.slice(0, 2);
          const remainingCount = dayTasks.length - visibleTasks.length;

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
                maxWidth: "150px",
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
                    fontWeight: "bold",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    fontSize: "10px",
                    marginTop: "4px",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  }}
                >
                  {task.title}
                </div>
              ))}

              {remainingCount > 0 && (
                <div
                  style={{
                    fontSize: "10px",
                    color: isToday ? "#fff" : "#555",
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
      />
    </div>
  );
}