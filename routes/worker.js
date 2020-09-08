const express = require("express");
const router = express.Router();
var helper = require("./helper.js");
// const passport = require("passport");
var path = require("path");
const Tasks = require("../Models/Tasks.js");
const User = require("../Models/User.js");
var appDir = path.dirname(require.main.filename) + "/public";

// router.get("/worker", helper.clientOnly, (req, res) => {
// 	res.sendFile(appDir + "/worker-orders.html");
// });

router.get("/worker-orders", helper.workerOnly, (req, res) => {
	res.sendFile(appDir + "/worker-orders.html");
});

router.get("/worker-profile", helper.workerOnly, (req, res) => {
	res.sendFile(appDir + "/worker-profile.html");
});

router.post(
	"/worker-tasks/update-task",
	helper.workerOnly,
	async (req, res) => {
		try {
			const result = await Tasks.findByPk(req.body.taskID);
			result.workerID = req.user.id;
			result.status = req.body.status;
			result.save();
			return res.sendStatus(200);
		} catch (err) {
			return res.status(400).send({ msg: err });
		}
	}
);

router.post(
	"/worker-profile/set-profile",
	helper.workerOnly,
	async (req, res) => {
		try {
			console.log("CALLED SET PROFILE");
			const result = await User.findByPk(req.user.id);
			result.firstName = req.body.firstName;
			result.familyName = req.body.familyName;
			result.save();
			return res.sendStatus(200);
		} catch (err) {
			return res.status(400).send({ msg: err });
		}
	}
);

module.exports = router;
