const express = require("express");
const router = express.Router();
const db = require("../models_mongo");


module.exports = {

    // (POST) saving VOLUNTEER INFORMATION
    saveVolunteer: function (req, res) {
        const volunteer = {
            mysqlID = req.body.mysqlID,
            language1: req.body.language1,
            language2: req.body.language2,
            language3: req.body.language3,
            language3: req.body.language3,
            proficiency1: req.body.proficiency1,
            proficiency2: req.body.proficiency2,
            proficiency3: req.body.proficiency3,
        };
        db.Volunteer
            .create(volunteer)
            .then(dbVolunteer => res.json(dbVolunteer))
            .catch(err => {
                res.status(422)
                console.log("create volunteer", err)
            });
    },

    // (GET) getting VOLUNTEER INFORMATION // the id will be passed VIA URL
    getVolunteer: function (req, res) {
        // mysqlID will be the /:mysqlID
        const id = req.params.mysqlID
        db.Volunteer
            .find({ mysqlID: id })
            .then(dbVolunteer => res.json(dbVolunteer))
            .catch(err => {
                res.status(422)
                console.log("create volunteer", err)
            });
    },

    // (GET) getting USER native and needed language and logic to MATCH USER
    matchUser: function (req, res) {
        // mysqlID will be the /:mysqlID
        const native = req.body.native
        const languageNeeded = req.body.language

        db.Volunteer
            .find({
                // in the find - this will need to search language1, language2, and language 3 for both native and languageNeeded
                // INSERTCODE HERE
                appavail: true,
                chatavail: true
            })
            .then(volunteers => {
                volunteermatch = volunteers[0]
            })
            .catch(err => {
                res.status(422)
                console.log("create volunteer", err)
            });
    },

    // (GET) getting socket number for VOLUNTEER

    // (PUT) updating message job availibility of volunteer (opens a new socket)
    appAvailUpdate: function (req, res) {
        // update avail and if true set socket
        const mysqlID = req.body.mysqlID
        const appAvail = req.body.massageAvail

        db.Volunteer
            .findOneAndUpdate({
                mysqlID: mysqlID
            }, {
                appavail: appAvail,
                chatavail: appAvail,
            })
            .then(volunteers => {
                volunteermatch = volunteers[0]
            })
            .catch(err => {
                res.status(422)
                console.log("create volunteer", err)
            });
    },

    // (PUT) updating chat availibility of volunteer (prevents other users to connect with them)
    chatAvailUpdate: function (req, res) {
        // if socket is full there is a put call that (triggered by the user) to make chat avail false
        const room = req.body.room
        const currentAvail = req.body.currentAvail

        db.Volunteer
            .findOneAndUpdate({
                room: room
            }, {
                chatavail: currentAvail
            })
            .then(volunteers => {
                volunteermatch = volunteers[0]
            })
            .catch(err => {
                res.status(422)
                console.log("create volunteer", err)
            });
    },

};