

"use client";

import { useEffect, useState } from "react";

type Task = {
  id: number;
  title: string;
  category: string;
  dueDate: string;
};

export default function CompletedTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchCompleted = async () => {
      const res = await fetch(
        "http://localhost:5000/tasks?completed=true"
      );

      const data = await res.json();
      setTasks(data);
    };

    fetchCompleted();
  }, []);

  return (
    <div>
      <h1>Completed Tasks</h1>

      {tasks.map((task) => (
        <div key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.category}</p>
        </div>
      ))}
    </div>
  );
}