require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const user_route = require("./routes/user.routes");

mongoose
  .connect(process.env.DATABASE_URL, { useNewUrlParser: true, useCreateIndex: true })
  .then(res => console.log("database is connected..."))
  .catch(error => console.log(error));
mongoose.Promise = global.Promise;

const app = express();
app.use(cookieParser());

app.use(async (req, res, next) => {
  const { kanboardToken } = req.cookies;
  /* if (token) {
    const { userId } = await jwt.verify(token, process.env.JWT_SECRET);
    req.userId = userId;
  } */
  next();
});

app.use(async (req, res, next) => {
  if (!req.userId) return next();

  //   const user = await db.query.user({ where: { id: req.userId } }, "{id, name, email, permissions}");
  //   req.user = user;
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", user_route);

const port = process.env.PORT || 4500;
app.listen(port, () => console.log(`server running on port ${port}`));
