const express = require("express");
const { taskController } = require("../controllers");
const authMiddleware = require("../middleware/auth");
const validateRequest = require("../validators");
const { taskSchema } = require("../validators/taskValidator");

const router = express.Router();

router.get("/tasks", taskController.getTasks);
router.post(
  "/tasks",
  authMiddleware,
  validateRequest(taskSchema, "body"),
  taskController.createTask
);
router.get("/tasks/:id", authMiddleware, taskController.getTask);
router.put(
  "/tasks/:id",
  authMiddleware,
  validateRequest(taskSchema, "body"),
  taskController.updateTask
);
router.patch("/tasks/:id", authMiddleware, taskController.patchTask);
router.delete("/tasks/:id", authMiddleware, taskController.deleteTask);

module.exports = router;
