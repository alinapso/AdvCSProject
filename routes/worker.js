const express = require("express");
const router = express.Router();
var helper = require("./helper.js");
// const passport = require("passport");
var path = require("path");
const Tasks = require("../Models/Tasks.js");
const User = require("../Models/User.js");
var appDir = path.dirname(require.main.filename) + "/public";

router.get("/worker/orders", helper.workerOnly, (req, res) => {
	res.sendFile(appDir + "/worker/orders.html");
});

router.post("/worker/orders/", helper.workerOnly, async (req, res) => {
	try {
		const result = await Tasks.findByPk(req.body.taskID);
		result.workerID = req.user.id;
		result.status = req.body.status;
		result.save();
		return res.sendStatus(200);
	} catch (err) {
		return res.status(400).send({ msg: err });
	}
});

module.exports = router;
