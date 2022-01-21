const mongoose = require("mongoose");

const TaskService = require("../service/tasks.service");

const taskService = new TaskService();

class ControllerTasks {
  getTasks = async (req, res) => {
    const tasks = await taskService.findAll();

    res.status(200).send(tasks);
  };

  createTask = async (req, res) => {
    const task = req.body;
    const salveTask = await taskService
      .createTask(task)
      .then(() =>
        res.status(200).send({ message: "Tarefa adicionada com sucesso!" })
      )
      .catch((err) =>
        res.status(500).send({ message: `Erro no servidor ${err}` })
      );
  };

  deleteTask = async (req, res) => {
    const id = req.params.id;
    await taskService
      .deleteTask(id)
      .then(() =>
        res.status(200).send({ message: "Tarefa apagada com sucesso!" })
      )
      .catch((err) =>
        res.status(500).send({ message: `Erro no servidor ${err}` })
      );
  };

  editTask = async (req, res) => {
    const id = req.params.id;
    const task = req.body;
    await taskService
      .editTask(id, task)
      .then(() =>
        res.status(200).send({ message: "Tarefa atualizado com sucesso!" })
      )
      .catch((err) =>
        res.status(500).send({ message: `Erro no servidor: ${err}` })
      );
  };

  getTaskById = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).send({ message: "ID invalido!" });
      return;
    }

    const task = await taskService.findById(id);

    if (!task) {
      res.status(404).send({ message: "Tarefa não encontrada!" });
    }

    res.status(200).send(task);
  };
}

module.exports = ControllerTasks;
