const express = require("express");
const router = express.Router();
var helper = require("./helper.js");
const passport = require("passport");
var path = require("path");
var appDir = path.dirname(require.main.filename) + "/public";

router.get("/login", helper.checkNotAuthenticated, (req, res) => {
	res.sendFile(appDir + "/login.html");
});

router.post(
	"/login",
	helper.checkNotAuthenticated,
	passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/login",
		failureFlash: true,
	})
);

module.exports = router;
