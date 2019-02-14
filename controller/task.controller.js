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
