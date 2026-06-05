
"use client";

import { useEffect, useState } from "react";

type Task = {
  id: number;
  title: string;
  completed: boolean;
  category?: string;
  dueDate?: string;
};

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("http://localhost:5000/tasks");

        if (!res.ok) throw new Error("Failed to fetch tasks");

        const data: Task[] = await res.json();

        const completedTasks = data.filter((task) => task.completed);

        setTasks(completedTasks);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Completed Tasks</h1>

      {tasks.length === 0 ? (
        <p>No completed tasks yet.</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.category}</p>
          </div>
        ))
      )}
    </div>
  );
}