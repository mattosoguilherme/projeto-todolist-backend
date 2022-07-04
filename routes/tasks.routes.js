const express = require("express");
const ControllerTasks = require("../controller/tasks.controller");
const router = express.Router();
const tasksController = new ControllerTasks();

router.get("", tasksController.getTasks);

router.post("", tasksController.createTask);

router.put("/:id", tasksController.editTask);

router.delete("/:id", tasksController.deleteTask);

router.get("/:id", tasksController.getTaskById);

module.exports = router;
