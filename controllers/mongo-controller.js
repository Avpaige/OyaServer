const uuidv4 = require('uuid/v4');
const db = require("../models_mongo")

module.exports = {

    // (POST) - VOLUNTEER - saving VOLUNTEER INFORMATION
    saveVolunteer: function (req, res) {
        const volunteer = {
            mysqlID: req.body.mysqlID,
            language1: req.body.language1,
            language2: req.body.language2,
            language3: req.body.language3,
            language3: req.body.language3,
            proficiency1: req.body.proficiency1,
            proficiency2: req.body.proficiency2,
            proficiency3: req.body.proficiency3,
            socket: uuidv4(),
            appavail: false,
            chatavail: false

        };

        // console.log(volunteer)
        db.Volunteer
            .create(volunteer)
            .then(dbVolunteer => {
                res.json({socket: dbVolunteer.socket})
                // console.log(dbVolunteer)
            })
            .catch(err => {
                res.status(422)
                console.log("create volunteer", err)
            });
    },

    // (GET) - VOLUNTEER - getting VOLUNTEER INFORMATION // the id will be passed VIA URL
    getVolunteer: function (req, res) {
        // mysqlID will be the /:mysqlID
        const id = req.params.mysqlID
        // console.log(id)
        db.Volunteer
            .find({ mysqlID: id })
            .then(dbVolunteer => {
                res.json(dbVolunteer)
                console.log(dbVolunteer)
            })
            .catch(err => {
                res.status(422)
                console.log("get volunteer", err)
            });
    },

    // (POST) - USER - getting USER native and needed language and logic to MATCH USER
    matchUser: function (req, res) {
        const native = req.body.native
        const languageNeeded = req.body.language
        db.Volunteer
            .find({
                $or: [
                    { "language1": { "$in": [languageNeeded] } },
                    { "language2": { "$in": [languageNeeded] } },
                    { "language3": { "$in": [languageNeeded] } },
                ],
                $or: [
                    { "language1": { "$in": [native] } },
                    { "language2": { "$in": [native] } },
                    { "language3": { "$in": [native] } },
                ],
                appavail: true,
                chatavail: true
            })
            .then(volunteers => {
                res.json({socket: volunteers[0].socket})
            })
            .catch(err => {
                res.status(422)
                console.log("match user", err)
            });
    },

    // (PUT) - VOLUNTEER - updating message job availibility of volunteer (opens a new socket)
    appAvailUpdate: function (req, res) {
        // update avail and if true set socket
        const mysqlID = req.body.mysqlID
        const appAvail = req.body.massageAvail
        // console.log(mysqlID)

        db.Volunteer
            .updateOne({
                mysqlID: mysqlID
            }, {
                // We want to update that if they toggle the messages on set everything on or off
                appavail: appAvail,
                chatavail: appAvail,

            })
            .then(volunteers => {
                console.log("app status of volunteer changed")
                // console.log(volunteers)

            })
            .catch(err => {
                res.status(422)
                console.log("volunteer app update", err)
            });
    },

    // (PUT) - VOLUNTEER -  updating chat availibility of volunteer (prevents other users to connect with them) - seeing if they are with someone
    chatAvailUpdate: function (req, res) {
        // if socket is full there is a put call that (triggered by the user) to make chat avail false
        const room = req.body.socket

        db.Volunteer
            .findOneAndUpdate({
                socket: room
            }, {
                chatavail: false
            })
            .then(volunteers => {
                res.json(volunteers)
                console.log(volunteers)
            })
            .catch(err => {
                res.status(422)
                console.log("volunteer chat avail", err)
            });
    },

    // (PUT) - VOLUNTEER - that pushes the user out of the chat when it's done (but it is done from the volunteer when conversation is done)
    finishChat: function (req, res) {
        // if socket is full there is a put call that (triggered by the user) to make chat avail false
        const room = req.body.socket

        db.Volunteer
            .findOneAndUpdate({
                socket: room
            }, {
                chatavail: true
            })
            .then(volunteers => {
                res.json(volunteers)
                console.log(volunteers)
            })
            .catch(err => {
                res.status(422)
                console.log("volunteer chat avail", err)
            });
    },

    // (GET) - VOLUNTEER - get call to trigger Front end(FE) notification
    getMessageVolunteerAlert: function (req, res) {
        // mysqlID will be the /:mysqlID
        const id = req.params.mysqlID
        db.Volunteer
            .find({ mysqlID: id })
            .then(dbVolunteer => res.json(dbVolunteer))
            .catch(err => {
                res.status(422)
                console.log("volunteer notification", err)
            });
    },

};