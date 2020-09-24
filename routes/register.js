const express = require("express");
const router = express.Router();
var helper = require("./helper.js");
const User = require("../Models/User");
var path = require("path");
var appDir = path.dirname(require.main.filename) + "/public";
const bcrypt = require("bcrypt");

router.get("/register", helper.checkNotAuthenticated, (req, res) => {
	res.sendFile(appDir + "/register.html");
});

router.post("/register", helper.checkNotAuthenticated, async (req, res) => {
	console.log();
	try {
		console.log(req.body);
		if (!req.body.email || !req.body.password) {
			return res.sendStatus(400);
		}
		try {
			if (!(await User.findOne({ where: { email: req.body.email } }))) {
				bcrypt.hash(req.body.password, 10, function (err, hash) {
					console.log(hash);
					User.create({
						email: req.body.email,
						password: hash, //hashedPassword,
						groupID: 0,
					});
					console.log("SUCCSEFULLY ADDED NEW USER ");
					return res.redirect("/login");
				});
			} else {
				console.log("ERROR ADDING NEW USER: EMAIL TAKEN");
				return res.sendStatus(400);
			}
		} catch (err) {
			console.log("ERROR ADDING NEW USER:", err);
			return res.sendStatus(400);
		}
	} catch {
		res.redirect("/");
	}
});

router.post("/register", helper.checkNotAuthenticated, async (req, res) => {
	return res.redirect("/login");
});

module.exports = router;
