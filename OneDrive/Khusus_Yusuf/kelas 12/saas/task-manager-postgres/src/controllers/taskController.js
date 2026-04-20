const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET
exports.getTasks = async (req, res) => {
  const tasks = await prisma.task.findMany();
  res.json(tasks);
};

// POST
exports.createTask = async (req, res) => {
  const { title, description } = req.body;

  const task = await prisma.task.create({
    data: { title, description },
  });

  res.json(task);
};

// PUT
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const task = await prisma.task.update({
    where: { id: Number(id) },
    data: req.body,
  });

  res.json(task);
};

// DELETE
exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  await prisma.task.delete({
    where: { id: Number(id) },
  });

  res.json({ message: "Task deleted" });
};
