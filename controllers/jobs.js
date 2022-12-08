const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const mongoose = require("mongoose");

const getAllJobs = async (req, res, next) => {
  // console.log(req.user.userId);//from Auth Middleware
  // console.log(req.query);
  const { search, status, jobType, sort } = req.query;

  // protected route
  const queryObject = {
    createdBy: req.user.userId,
  };

  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }

  //get all job associated to the userId
  // const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");

  let result = Job.find(queryObject);
  const jobs = await result;
  res.status(StatusCodes.OK).json({ jobs });
};

const getAllUserJobs = async (req, res, next) => {
  //get all jobs
  const jobs = await Job.find().sort("createdAt");

  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const getJob = async (req, res) => {
  const {
    user: { userId }, //from Auth Middleware
    params: { id: jobId }, //from params
  } = req;

  const job = await Job.findOne({
    _id: jobId,
    createdBy: userId,
  });
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
  console.log(req.user.userId);
  req.body.createdBy = req.user.userId; // it's located in req.body, console.log(req.body) to get information
  try {
    const job = await Job.create(req.body); //create a job
    res.status(StatusCodes.CREATED).json({ job }); //send a response to the client
  } catch (error) {
    console.log("🚀 ~ file: jobs.js:44 ~ createJob ~ error", error);
  }

  // res.json(req.body);
  // res.json(req.user);
};

const updateJob = async (req, res) => {
  const {
    body: { company, position }, //from body
    user: { userId }, //from Auth Middleware
    params: { id: jobId }, //from params
  } = req;

  if (company === "" || position === "") {
    throw new BadRequestError("Company or Position fields cannot be empty");
  }
  const job = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req, res) => {
  //destruction of user abd job values
  const {
    user: { userId }, //from Auth Middleware
    params: { id: jobId }, //from params
  } = req;

  //find a job with userId and jobId
  const job = await Job.findByIdAndRemove({
    _id: jobId,
    createdBy: userId,
  });

  //verify if the job exists
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).send();
};

module.exports = {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  getJob,
  getAllUserJobs,
};
