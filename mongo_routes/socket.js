const express = require('express');
const router = express.Router();
const userController = require("../controllers/mongo-controller");

// Matches with "/user/match"
router.route("/talk")
  .post(userController.getStaticSocket)

module.exports = router;