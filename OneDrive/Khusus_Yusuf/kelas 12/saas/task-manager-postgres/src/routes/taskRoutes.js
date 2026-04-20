const express = require("express");
const router = express.Router();

const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

// GET
router.get("/", getTasks);

// POST
router.post("/", createTask);

// PUT
router.put("/:id", updateTask);

// DELETE
router.delete("/:id", deleteTask);

module.exports = router;
