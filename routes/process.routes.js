const express = require("express");
const process = require("../controller/process.controller");

const route = express.Router();

route.post("/process/create", process.createProcess);
route.get("/process/:processId", process.getProcess);
route.delete("/process/:processId", process.deleteUserProcess);
route.get("/processes", process.getAllProcesses);
route.get("/user/processes", process.getProcessByUser);

module.exports = route;
