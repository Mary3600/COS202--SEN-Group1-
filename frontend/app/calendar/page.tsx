"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import TaskModal from "../../components/TaskModal";

import Image from "next/image";
import { Bell, Settings, ChevronLeft, ChevronRight, Search, LayoutDashboard, CalendarDays, ArchiveRestore, Menu, Bold  } from "lucide-react";

export default function CalendarView() {
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const [activePage, setActivePage] = useState("calendar");
  // STATE
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
const [tasks, setTasks] = useState([
  { id: 1, title: "Assignment", date: "2026-04-12", priority: "high" },
  { id: 2, title: "Meeting", date: "2026-04-12", priority: "medium" },
  { id: 3, title: "Gym", date: "2026-04-12", priority: "low" },
  { id: 4, title: "Project Review", date: "2026-04-15", priority: "high" },
  { id: 5, title: "Call John", date: "2026-04-16", priority: "medium" },
  { id: 6, title: "Very Long Task Name To Test Overflow UI", date: "2026-04-20", priority: "low" },
  { id: 7, title: "Next Month Task", date: "2026-05-02", priority: "high" },
]);

const [sidebarOpen, setSidebarOpen] = useState(true);
const [collapsed, setCollapsed] = useState(false);
  

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

  const handleAddTask = (newTask) => {
  setTasks((prev) => [...prev, newTask]);
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

            const fullDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(displayDay).padStart(2, "0")}`;

            const dayTasks = tasks.filter(task => task.date === fullDate);

            const visibleTasks = dayTasks.slice(0, 2);
            const remainingCount = dayTasks.length - visibleTasks.length;

            const getColor = (priority) => {
              if (priority === "high") return "#de2e2e";
              if (priority === "medium") return "#fbb128";
              return "#3ceb42";
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
                    style={{
                      backgroundColor: getColor(task.priority),
                      color: "#fff",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      fontSize: "10px",
                      marginTop: "4px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
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
                      fontWeight: "500",
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
      onClose={() => setIsModalOpen(false)}
      onAddTask={handleAddTask}
    />
    </div>
  );
}