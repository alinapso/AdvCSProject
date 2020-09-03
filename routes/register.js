const express = require("express");
const router = express.Router();
var helper = require("./helper.js");
const User = require("../Models/User");
var path = require("path");
// const { nextTick } = require("process");
var appDir = path.dirname(require.main.filename) + "/public";

// var async  = require('express-async-await');
// var fetch = require('node-fetch');

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
			const users2 = User.build({
				id: Date.now().toString(),
				// name: req.body.name,
				email: req.body.email,
				password: req.body.password, //hashedPassword,
				groupID: 0,
			});
			await users2.save();
			// res.redirect("/login");
			console.log("SUCCSEFULLY ADDED NEW USER ");

			return res.redirect("/login");
			//next();
		} catch (err) {
			console.log("ERROR ADDING NEW USER:", err);
			return;
		}
	} catch {
		res.redirect("/");
	}
});

router.post("/register", helper.checkNotAuthenticated, async (req, res) => {
	return res.redirect("/login");
});

module.exports = router;
