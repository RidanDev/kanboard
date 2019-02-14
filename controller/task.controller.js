const asyncHandler = require("../lib/async_handler");
const Task = require("../model/task.model");
const Process = require("../model/process.model");

exports.createTask = asyncHandler(async (req, res, next) => {
  if (!req.user) throw new Error("Hey, you need to sign in for this");

  const task = await Task.create({ task: req.body.task, process: req.params.processId });
  const process = await Process.findById(req.params.processId);
  process.tasks.push(task._id);
  process.save(err => {
    if (err) throw new Error(err);

    res.json({ message: "task created", task });
  });
});

exports.deleteTask = asyncHandler(async (req, res, next) => {
  if (!req.user) throw new Error("Hey, are you sure you are logged in");

  const process = await Process.findById(req.params.processId);
  if (!process) throw new Error("This process does not exist");

  if (process.user.toString() !== req.user._id.toString()) throw new Error("You are not the owner of this process");

  const task = await Task.findByIdAndDelete(req.params.taskId);
  if (task) {
    process.tasks = process.tasks.filter(task => task.toString() !== req.params.taskId.toString());
    process.save((err, result) => {
      if (err) throw new Error(err);
      res.json({ message: "task deleted successfully" });
    });
  } else {
    res.json({ message: "task already deleted!" });
  }
});

exports.modifyTask = asyncHandler(async (req, res, next) => {
  if (!req.user) throw new Error("Hey, are you sure you are logged in");

  // check if the task is existing in the database
  const task = await Task.findById(req.params.taskId);
  if (!task) throw new Error("Task does not exist, try another one");

  // check if the user is the owner of the old process
  const oldProcess = await Process.findById(task.process);
  if (oldProcess.user.toString() !== req.user._id.toString()) throw new Error("Hey, it seems you are not the owner of this process");

  // check if the user is the owner of the new process
  const newProcess = await Process.findById(req.params.processId);
  if (!newProcess) throw new Error("This process does not exist");
  if (newProcess.user.toString() !== req.user._id.toString()) throw new Error("Hey, it seems you are not the owner of this process");

  // add the task to the new process
  if (newProcess.tasks.indexOf(req.params.taskId) >= 0) throw new Error(`Task with the id ${req.params.taskId} already exist in this process`);

  // remove the task from the previous process
  oldProcess.tasks = oldProcess.tasks.filter(task => task.toString() !== req.params.taskId.toString());

  newProcess.tasks.push(req.params.taskId);

  // add the new process to the task
  task.process = newProcess._id;
  task.save((err, result) => {
    if (err) next(err);

    oldProcess.save(err => {
      if (err) next(err);

      newProcess.save(err => {
        if (err) next(err);

        res.json({ message: "Task modification complete and successful", result });
      });
    });
  });
});
