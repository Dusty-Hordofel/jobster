const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });

  const { password, ...responseUser } = user._doc;
  res.status(StatusCodes.CREATED).json({
    user: responseUser,
  });
};

const login = async (req, res, next) => {
  res.send("login user");
};

module.exports = { register, login };
