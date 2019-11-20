const express = require('express');
const router = express.Router();
const volunteerController = require("../controllers/mongo-controller");

// Matches with "/volunteer" ( post in form, put in account)
router.route("/")
    .post(volunteerController.saveVolunteer) // FE: form
    .put(volunteerController.appAvailUpdate) // FE: account

// Matches with "/volunteer/:mysqlID" (in login)
router
    .route("/:mysqlID")
    .get(volunteerController.getVolunteer) // FE: login

// Matches with "/volunteer/notification/:mysqlID" (in login)
router
    .route("notification/:mysqlID")
    .get(volunteerController.getMessageVolunteer) // FE: account

// Matches with "/volunteer/avail/chat" (in jobs (in users))
router
    .route("/avail/chat")
    .put(volunteerController.chatAvailUpdate)

// Matches with "/volunteer/stop/chat" (in v-messages)
router
    .route("/stop/chat")
    .put(volunteerController.finishChat)

module.exports = router;