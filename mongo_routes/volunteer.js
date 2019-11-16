const express = require('express');
const router = express.Router();
const volunteerController = require("../controllers/mongo-controller");

// Matches with "/volunteer"
router.route("/")
    .get(volunteerController.saveVolunteer)
    .post(volunteerController.getVolunteer)

// Matches with "/volunteer/room"
router.route("/room")
    .get(volunteerController.volunteerRoom)

// Matches with "/volunteer/:mysqlID"
router
    .route("/:mysqlID")
    .put(volunteerController.appAvailUpdate)
    
// Matches with "/volunteer/avail/chat"
router
    .route("/avail/chat")
    .put(volunteerController.chatAvailUpdate)

module.exports = router;