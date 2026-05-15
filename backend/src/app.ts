import "dotenv/config";
import express from "express";
import prisma from "./prisma";

const app = express();

app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.use(express.json());
// CREATE TASK
app.post("/tasks", async (req, res) => {
  try {
    console.log("BODY:", req.body); // 👈 ADD THIS
 
    const { title } = req.body;

    const task = await prisma.task.create({
      data: {
        title,
        completed: false,
      },
    });

    res.json(task);
  } catch (error) {
    console.error("ERROR:", error); // 👈 IMPORTANT
    res.status(500).json({ error: "Something went wrong" });
  }
});


app.get("/tasks", async (req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});


app.put("/tasks/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { title, completed } = req.body;

    const updatedTask = await prisma.task.update({
      where: { id },
      data: { title, completed },
    });

    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update task" });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.task.delete({
      where: { id },
    });

    res.json({ message: "Task deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete task" });
  }
});


const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});