const express = require("express");
const ControllerTasks = require("../controller/tasks.controller");
const router = express.Router();
const tasksController = new ControllerTasks();

router.get("/", tasksController.getTasks);

router.get("/:id", tasksController.getTaskById);

router.post("/adicionar", tasksController.createTask);

router.put("/editar/:id", tasksController.editTask);

router.delete("/deletar/:id", tasksController.deleteTask);

module.exports = router;
