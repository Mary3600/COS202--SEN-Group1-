import React from "react";

interface Props {
  title: string;
  priority: "High" | "Medium" | "Low";
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High":
      return "#e74c3c"; 
    case "Medium":
      return "#f39c12"; 
    case "Low":
      return "#2ecc71"; 
    default:
      return "#347368"; 
  }
};

const TaskCard = ({ title, priority }: Props) => {
  return (
    <div
      style={{
        border: "1px solid #ffffff",
        borderRadius: "10px",
        padding: "12px",
        margin: "10px 0",
        backgroundColor: "#ffffff",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      }}
    >
      <h4
        style={{
          margin: "0 0 8px 0",
          color: "#000000",      // ✅ force black
          fontWeight: "600",     // ✅ slightly bold
        }}
      >
        {title}
      </h4>

      <p
        style={{
          margin: 0,
          color: getPriorityColor(priority),
          fontWeight: "bold",
        }}
      >
        {priority} Priority
      </p>
    </div>
  );
};

export default TaskCard;