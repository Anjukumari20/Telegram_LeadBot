// routes/authRoutes.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { register, login } = require("../controllers/authController");
const {registerValidator, loginValidator } = require("../middleware/authValidator.js");



const router = express.Router();

router.post("/register", registerValidator, register);

router.post("/login", loginValidator, login);

module.exports = router;