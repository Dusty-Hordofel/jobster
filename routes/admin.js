const express = require("express");
const { getAllUserJobs } = require("../controllers/jobs");

const router = express.Router();
// const { getAllUserJobs } = require("../controllers/jobs");

router.route("/all").get(getAllUserJobs);

module.exports = router;
