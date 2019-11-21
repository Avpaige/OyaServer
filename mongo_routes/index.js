const path = require("path");
const router = require("express").Router();
const volunteerRoute = require("./volunteer.js");
const userRoutes = require("./user.js");
const socketRoutes = require("./socket.js");

// Routes
router.use("/volunteer", volunteerRoute);
router.use("/user", userRoutes);
// router.use("/socket", socketRoutes);

module.exports = router;