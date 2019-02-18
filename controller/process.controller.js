const asyncHandler = require("../lib/async_handler");
const Process = require("../model/process.model");
const Task = require("../model/task.model");
const capitalize = require("../lib/capitalize");

exports.createProcess = asyncHandler(async (req, res, next) => {
  if (!req.user) throw new Error("You need to log in to create a process");

  if (!req.body.title.trim().length > 0) throw new Error("Process title should not be empty");

  let title = capitalize(req.body.title);
  let processExist = await Process.findOne({ title, user: req.user._id });
  if (processExist) throw new Error("Process with this title already created by this user, try another one");

  const process = await Process.create({ title: req.body.title, user: req.user._id });
  res.json({
    message: "Process created successfully",
    process
  });
});

exports.getProcess = asyncHandler(async (req, res, next) => {
  const process = await Process.findById(req.params.processId);
  res.json({ process });
});

exports.getAllProcesses = asyncHandler(async (req, res, next) => {
  const processes = await Process.find({});
  res.json({ count: processes.length, processes });
});

exports.getProcessByUser = asyncHandler(async (req, res, next) => {
  if (!req.user) throw new Error("You need to log in first");

  const processes = await Process.find({ user: req.user._id }).populate("tasks");
  res.json({
    processes
  });
});

exports.deleteUserProcess = asyncHandler(async (req, res, next) => {
  if (!req.user) throw new Error("Please log in to perform this operation");

  const process = await Process.findById(req.params.processId);
  if (process.user.toString() !== req.user._id.toString()) throw new Error("You are not the owner of this process");

  const done = process.tasks.map(async (task, index, array) => {
    const deletedTask = await Task.findByIdAndDelete(task);

    if (deletedTask) {
      if (index == array.length - 1) return true;

      return false;
    }
  });

  if (done) {
    const deletedProcess = await Process.findByIdAndDelete(req.params.processId);
    if (deletedProcess) res.json({ message: "Process deleted successfully!" });
  }
});

exports.modifyProcess = asyncHandler(async (req, res, next) => {
  if (!req.user) throw new Error("To modify your process, you need to log in");

  const process = await Process.findById(req.params.processId);
  if (!process) throw new Error("Process does not exist");

  process.title = req.body.title;
  process.save((err, result) => {
    if (err) next(err);

    res.json({ message: "Process updated successfully", result });
  });
});
