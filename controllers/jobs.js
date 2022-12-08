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

  // add stuff based on condition

  if (status && status !== "all") {
    queryObject.status = status;
  }
  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }

  //get all job associated to the userId
  // const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");

  // NO AWAIT
  let result = Job.find(queryObject);

  // chain sort conditions

  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("position");
  }
  if (sort === "z-a") {
    result = result.sort("-position");
  }

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const jobs = await result;

  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);

  res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages });
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
