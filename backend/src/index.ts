import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import taskRoutes from "./routes/taskRoutes";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("Server is working");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});