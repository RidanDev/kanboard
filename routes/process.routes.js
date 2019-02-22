const express = require("express");
const process = require("../controller/process.controller");

const route = express.Router();

route.post("/process/:boardId/create", process.createProcess);
route.get("/process/:processId", process.getProcess);
route.put("/process/:processId", process.modifyProcess);
route.delete("/process/:boardId/:processId", process.deleteUserProcess);
route.get("/processes", process.getAllProcesses);
route.get("/processes/:boardId", process.getProcessByBoard);

module.exports = route;
