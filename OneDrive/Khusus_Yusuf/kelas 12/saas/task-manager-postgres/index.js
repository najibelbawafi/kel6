require("dotenv").config();
const express = require("express");

const app = express();

// middleware
app.use(express.json());

// ROUTES
const taskRoutes = require("./src/routes/taskRoutes");
app.use("/api/tasks", taskRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API TASK MANAGER OK");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
