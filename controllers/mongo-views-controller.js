const express = require("express");
const router = express.Router();

router.get("/language", (req, res) => res.render("language", { user: req.user }));

router.get("/native", (req, res) => res.render("native", { user: req.user }));

router.get("/", (req, res) => res.render("home", { user: req.user }));

module.exports = router;