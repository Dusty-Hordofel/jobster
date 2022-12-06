const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const mongoose = require("mongoose");

const getAllJobs = async (req, res, next) => {
  res.send("get all jobs");
};
const getJob = async (req, res, next) => {
  res.send("get job");
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId; // it's located in req.body, console.log(req.body) to get information
  const job = await Job.create(req.body); //create a job
  res.status(StatusCodes.CREATED).json({ job }); //send a response to the client

  // res.json(req.body);
  // res.json(req.user);
};

const updateJob = async (req, res, next) => {
  res.send("update job");
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
