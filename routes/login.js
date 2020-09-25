const express = require("express");
const router = express.Router();
var helper = require("./helper.js");
const passport = require("passport");
var path = require("path");
var appDir = path.dirname(require.main.filename) + "/public";
const User = require("../Models/User");

router.get("/login", helper.checkNotAuthenticated, (req, res) => {
	res.sendFile(appDir + "/login.html");
});

router.post(
	"/login",
	helper.checkNotAuthenticated,
	passport.authenticate("local", {
		successRedirect: "/",
	})
);
router.post("/check", helper.checkNotAuthenticated, async (req, res) => {
	console.log();
	try {
		console.log(req.body);
		if (!req.body.email || !req.body.password) {
			return res.sendStatus(400);
		}
		try {
			var a = await User.findOne({ where: { email: req.body.email } });
			console.log("EMAIL OF A", a.email, "PASSWORD", a.password);
			if (!a && a.password === req.body.password) {
				console.log("SUCCSEFULLY LOGGED IN.");
				return;
			} else {
				console.log("ERROR: INCORRECT PASSWORD/EMAIL.");
				return res.sendStatus(400);
			}
		} catch (err) {
			console.log("ERROR:", err);
			return res.sendStatus(400);
		}
	} catch {
		console.log("ERROR:CATCH");
		res.redirect("/login");
	}
});

module.exports = router;
