"use client";
import { useState } from "react";
import Image from "next/image";

export default function TaskModal({ isOpen, onClose, onAddTask }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("lmedium");
const [aspect, setAspect] = useState("academic"); 

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!title || !date) return;

    onAddTask({
      id: Date.now(),
      title,
      date,
      priority,
    });

    setTitle("");
    setDate("");
    setPriority("low");
    onClose();
  };

  return (
    <div
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
        style={{
          background: "#fff",
          padding: "0 32px 32px 32px",
          
          
          borderRadius: "10px",
          width: "500px",
          height: "600px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
       <h3 style={{ color: '#165A50', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: "bold" }}>New Entry</h3>


      <p style={{ color: "#BFC9C5", fontWeight: "700"}}>What do you need to remember?</p>
       <textarea
  style={{
    background: "#F2F4F3",
    borderRadius: "12px",
    height: "80px",
    border: "none",
    padding: "10px",
    fontSize: "15px",
    resize: "none", // optional: disables dragging to resize
  }}
  placeholder="Description / Notes"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
/>
      <div style={{ display: "flex", gap: "70px", marginTop: "20px" , justifyContent: "center"}}>
  
  {/* PRIORITY */}
  <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
    <p style={{ color: "#BFC9C5", fontWeight: "700"}}>Priority</p>
    <select
      value={priority}
      onChange={(e) => setPriority(e.target.value)}
      style={{
        background: "#F2F4F3",
        border: "none",
        borderRadius: "8px",
        padding: "10px 50px 10px 10px",
        fontSize: "14px",
        outline: "none",
        width: "170px",
      }}
    >
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
  </div>

  {/* ASPECT */}
  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
    <p style={{ color: "#BFC9C5", fontWeight: "700"}}>Aspect</p>
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
        width: "170px",
      }}
    >
      <option value="academic">Academic</option>
      <option value="personal">Personal</option>
      <option value="health">Health</option>
    </select>
  </div>

</div>

      <div>
        <p style={{ color: "#BFC9C5", fontWeight: "700"}}>When?</p>
        <input style={{width: "100%", outline: "none", border: "none", height: "50px",  background: "#F2F4F3", padding: "10px 10px 10px 10px "}}
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
        
<div
  style={{
    width: "100%",
    height: "120px", // 
    borderRadius: "16px",
    overflow: "hidden", // 
    position: "relative",
  }}
>
  {/* IMAGE */}
  <img
    src="/notebook.jpg"
    alt="banner"
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover", 
    }}
  />

  {/* GRADIENT OVERLAY */}
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

        <button onClick={handleSubmit}>Add Task</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}