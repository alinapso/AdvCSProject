const express = require("express");
const router = express.Router();
var helper = require("./helper.js");
var path = require("path");
const { adminOnly } = require("./helper.js");
const User = require("../Models/User");

var appDir = path.dirname(require.main.filename) + "/public";

router.get("/admin-tasks", adminOnly, (req, res) => {
	return res.sendFile(appDir + "/admin-tasks.html");
});

router.get("/admin-workers", helper.adminOnly, (req, res) => {
	return res.sendFile(appDir + "/admin-workers.html");
});

router.post("/admin-workers", helper.adminOnly, async (req, res) => {
	try {
		console.log(req.body);
		if (!req.body.email || !req.body.password) {
			return res.sendStatus(400);
		}
		try {
			const users2 = User.build({
				id: Date.now().toString(),
				email: req.body.email,
				password: req.body.password,
				groupID: 1,
			});
			await users2.save();
			console.log("SUCCSEFULLY ADDED NEW WORKER ");

			return res.sendStatus(200);
		} catch (err) {
			console.log("ERROR ADDING NEW USER:", err);
			return res.sendStatus(400);
		}
	} catch {
		res.redirect("/");
	}
});

module.exports = router;
