const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user.model");
const asyncHandler = require("../lib/async_handler");

exports.getUsers = () => {};

exports.createUser = asyncHandler(async (req, res, next) => {
  let password = await bcrypt.hash(req.body.password, 10);

  const user = await User.create({ ...req.body, password });

  let token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

  res.cookie("kanbanToken", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
  });

  res.json({
    message: "user created successfully",
    user
  });
});
