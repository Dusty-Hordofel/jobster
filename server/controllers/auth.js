const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({ name, email, password: hashedPassword });

  if (user) {
    const { password, ...responseUser } = user._doc;
    return res.status(StatusCodes.CREATED).json({
      user: responseUser,
    });
  }
};

const login = async (req, res, next) => {
  res.send("login user");
};

module.exports = { register, login };
