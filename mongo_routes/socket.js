const express = require('express');
const router = express.Router();
const socketController = require("../controllers/socket-controller");

// Matches with "/user/match"
router.route("/talk")
  .post(socketController.getStaticSocket)

const userController = require("../controllers/mongo-controller");

// Matches with "/user/match"
router.route("/talk")
  .post(userController.getStaticSocket)


module.exports = router;