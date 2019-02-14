const express = require("express");
const task = require("../controller/task.controller");

const route = express.Router();

route.post("/:processId/task/create", task.createTask);
route.delete("/task/:processId/:taskId", task.deleteTask);

module.exports = route;
