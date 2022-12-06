const User = require("../models/User");
const jwt = require("jsonwebtoken"); //to verify the token
const { UnauthenticatedError } = require("../errors"); //handle errors
const { request } = require("express");

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization; //
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication invalid");
  } //check if authorization header has the required value

  const token = authHeader.split(" ")[1]; //retrieve the token value in authHeader witch is after the "Bearer"

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET); //verify the token value

    // attach the user to the job routes
    // const testUser = payload.userId === "638e13e5d5b81bfa972cc35c";

    // const user = User.findById(payload.id).select("-password");//look for the user int the database
    // request.user = user;
    req.user = { userId: payload.userId, name: payload.name };
    // req.user = { userId: payload.userId, testUser }; //get the id from the token make us sure there is a user logged in alcontrary of to get id from the database.

    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

module.exports = auth;
