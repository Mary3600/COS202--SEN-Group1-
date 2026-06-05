"use client";

import { useEffect, useState } from "react";

type Task = {
  id: string | number;
  title: string;
  completed: boolean;
};

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("http://localhost:5000/tasks");

        if (!res.ok) {
          throw new Error("Failed to fetch tasks");
        }

        const data: Task[] = await res.json();

        const completedTasks = data.filter(task => task.completed);

        setTasks(completedTasks);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Completed Tasks</h1>

      {tasks.length === 0 ? (
        <p>No completed tasks found.</p>
      ) : (
        tasks.map(task => (
          <div key={task.id} className="p-4 rounded-lg bg-gray-100 shadow">
            {task.title}
          </div>
        ))
      )}
    </div>
  );
}