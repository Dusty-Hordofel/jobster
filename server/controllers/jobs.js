const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const mongoose = require("mongoose");

const getAllJobs = async (req, res, next) => {
  // console.log(req.user.userId);

  //get all job associated to the userId
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");

  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
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
    body: { company, position },
    user: { userId },
    params: { id: jobId },
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

const deleteJob = async (req, res, next) => {
  res.send("delete job");
};

module.exports = {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  getJob,
};
