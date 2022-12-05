const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });

  // const token = user.createJWT();
  const token = jwt.sign({ userId: user._id, name: user.name }, "jwtSecret", {
    expiresIn: "30d",
  });

  const { password, _id, __v, ...responseUser } = user._doc;
  res.status(StatusCodes.CREATED).json({
    user: { responseUser, token },
  });
};

const login = async (req, res, next) => {
  res.send("login user");
};

module.exports = { register, login };
