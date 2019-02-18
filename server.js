require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const user_route = require("./routes/user.routes");
const process_route = require("./routes/process.routes");
const task_route = require("./routes/task.routes");
const User = require("./model/user.model");

mongoose
  .connect(process.env.DATABASE_URL, { useNewUrlParser: true, useCreateIndex: true })
  .then(res => console.log("database is connected..."))
  .catch(error => console.log(error));
mongoose.Promise = global.Promise;

const app = express();

app.use(function(req, res, next) {
  // This cors setting makes sure that cookie is set on the client's device
  // In the frontend make sure to set withCredentials: true, so that cookie can be sent along on network request
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cookieParser());

app.use(async (req, res, next) => {
  const { kanboardToken } = req.cookies;
  if (kanboardToken) {
    try {
      const { userId } = await jwt.verify(kanboardToken, process.env.JWT_SECRET);
      req.userId = userId;
    } catch (err) {
      res.clearCookie("kanboardToken");
      next(err);
    }
  }
  next();
});

app.use(async (req, res, next) => {
  if (!req.userId) return next();

  const user = await User.findById(req.userId, "name email username _id");
  req.user = user;
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", user_route);
app.use("/api", process_route);
app.use("/api", task_route);

app.use((err, req, res, next) => {
  res.json({
    error: err.message
  });
});

const port = process.env.PORT || 4500;
app.listen(port, () => console.log(`server running on port ${port}`));
