const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authentication");

const { register, login } = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);

module.exports = router;
