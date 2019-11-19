const express = require('express');
const router = express.Router();
const socketController = require("../controllers/socket-contoller");

// Matches with "/user/match"
router.route("socket/talk")
  .get(socketController.getStaticSocket)

module.exports = router;