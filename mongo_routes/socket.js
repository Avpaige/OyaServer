const express = require('express');
const router = express.Router();
const socketController = require("../controllers/socket-controller");

// Matches with "/user/match"
router.route("/talk")
  .post(socketController.getStaticSocket)

module.exports = router;