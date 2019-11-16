const express = require('express');
const router = express.Router();
const userController = require("../controllers/mongo-controller");

// Matches with "/user/match"
router.route("/match")
  .post(userController.matchUser)

module.exports = router;