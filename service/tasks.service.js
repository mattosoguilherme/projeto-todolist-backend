const Task = require("../model/tasks");

class TaskService {
  findAll = async () => await Task.find();

  createTask = async (task) => {
    return await Task.create(task);
  };

  editTask = async (id, task) => {
    return await Task.updateOne({ _id: id }, task);
  };

  findById = async (id) => await Task.findById(id);

  deleteTask = async (id) => {
    return await Task.deleteOne({ _id: id });
  };
}

module.exports = TaskService;
