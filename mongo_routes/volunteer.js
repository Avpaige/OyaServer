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

// Matches with "/volunteer/notification/:mysqlID" (in account)
router
    .route("notification/:mysqlID")
    .get(volunteerController.getMessageVolunteerAlert) // FE: account

// Matches with "/volunteer/avail/chat" (in jobs (in users))
router
    .route("/busy/chat")
    .put(volunteerController.chatAvailUpdate)

// Matches with "/volunteer/done/chat" (in v-messages)
router
    .route("/done/chat")
    .put(volunteerController.finishChat)

module.exports = router;