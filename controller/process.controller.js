const asyncHandler = require("../lib/async_handler");
const Process = require("../model/process.model");
const Task = require("../model/task.model");
const Board = require("../model/board.model");
const capitalize = require("../lib/capitalize");

exports.createProcess = asyncHandler(async (req, res, next) => {
  if (!req.user) throw new Error("You need to log in to create a process");

  if (!req.body.title.trim().length > 0) throw new Error("Process title should not be empty");

  let title = capitalize(req.body.title);
  let processExist = await Process.findOne({ title, user: req.userId });
  if (processExist) throw new Error("Process with this title already created by this user, try another one");

  const process = await Process.create({ title: req.body.title, board: req.params.boardId });
  const board = await Board.findById(req.params.boardId);
  board.processes.push(process._id);

  board.save(err => {
    if (err) next(err);

    res.json({
      message: "Process created successfully",
      process
    });
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

exports.getProcessByBoard = asyncHandler(async (req, res, next) => {
  if (!req.user) throw new Error("You need to log in first");

  const processes = await Process.find({ board: req.params.boardId }).populate("tasks");
  res.json({
    count: processes.length,
    processes
  });
});

exports.deleteUserProcess = asyncHandler(async (req, res, next) => {
  if (!req.user) throw new Error("Please log in to perform this operation");

  const board = await Board.findById(req.params.boardId);
  if (!board) throw new Error("Board deleted or does not exist");

  board.processes = board.processes.filter(process => process.toString() !== req.params.processId.toString());

  const process = await Process.findById(req.params.processId);
  // if (process.user.toString() !== req.userId.toString()) throw new Error("You are not the owner of this process");

  const done = process.tasks.map(async (task, index, array) => {
    const deletedTask = await Task.findByIdAndDelete(task);

    if (deletedTask) {
      if (index == array.length - 1) return true;

      return false;
    }
  });

  if (done) {
    board.save(async err => {
      if (err) next(err);

      const deletedProcess = await Process.findByIdAndDelete(req.params.processId);
      if (deletedProcess) res.json({ message: "Process deleted successfully!" });
    });
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
