import cors from "cors";
import "dotenv/config";
import express from "express";
import prisma from "./prisma";


const app = express();
app.use(cors());

app.use(express.json());

// Test route
app.get("/tasks", async (req, res) => {
  try {
    const {
      completed,
      priority,
      category,
    } = req.query;

    const tasks = await prisma.task.findMany({
      where: {
        ...(completed !== undefined && {
          completed: completed === "true",
        }),

        ...(priority && {
          priority: String(priority),
        }),

        ...(category && {
          category: String(category),
        }),
      },
    });

    res.json(tasks);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch tasks",
    });
  }
});

app.use(express.json());
// CREATE TASK
app.post("/tasks", async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const {
      title,
      priority,
      category,
      dueDate,
    } = req.body;

    const task = await prisma.task.create({
      data: {
        title,

        completed: false,

        priority: priority || "medium",

        category,

        dueDate: dueDate
          ? new Date(dueDate)
          : null,
      },
    });

    res.json(task);
  } catch (error) {
    console.error("ERROR:", error);

    res.status(500).json({
      error: "Something went wrong",
    });
  }
});




app.put("/tasks/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const {
      title,
      completed,
      priority,
      category,
      dueDate,
    } = req.body;

    const updatedTask = await prisma.task.update({
      where: { id },

      data: {
        ...(title !== undefined && { title }),

        ...(completed !== undefined && {
          completed,
        }),

        ...(priority !== undefined && {
          priority,
        }),

        ...(category !== undefined && {
          category,
        }),

        ...(dueDate !== undefined && {
          dueDate: new Date(dueDate),
        }),
      },
    });

    res.json(updatedTask);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to update task",
    });
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