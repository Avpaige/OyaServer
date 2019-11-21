const path = require("path");
const router = require("express").Router();
const volunteerRoute = require("./volunteer.js");
const userRoutes = require("./user.js");
const socketRoutes = require("./socket.js");


router.use("/volunteer", volunteerRoute);
router.use("/user", userRoutes);


module.exports = router;