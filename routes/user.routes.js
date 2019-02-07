const express = require("express");
const user = require("../controller/user.controller");

const route = express.Router();

route.post("/user/signup", user.createUser);

module.exports = route;
