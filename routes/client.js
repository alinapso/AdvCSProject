const express = require("express");
const router = express.Router();
var helper = require("./helper.js");
// const passport = require("passport");
var path = require("path");
var appDir = path.dirname(require.main.filename) + "/public";
const Tasks = require("../Models/Tasks");

router.get("/client/orders", helper.clientOnly, (req, res) => {
	console.log("CALLED CLIENMT ORDERS GET");
	return res.sendFile(appDir + "/client/orders.html");
});

router.post("/client/add", helper.clientOnly, async (req, res) => {
	try {
		console.log("RES USER: ", req.user.id);
		console.log("res.body : ", req.body);
		// eslint-disable-next-line no-unused-vars
		const task = await Tasks.create({
			clientID: req.user.id,
			address: req.body.address,
			details: req.body.details,
			presence: req.body.presence,
			groupID: req.body.groupID,
			status: 0,
		});
		console.log("SUCCSEFULLY ADDED NEW Task ");
		return res.redirect("/client/orders");

		// console.log(err);
	} catch (err) {
		console.log("THERE IS ERROR", err);
		return res.sendStatus(400);
	}
});

router.get("/client/add", helper.clientOnly, (req, res) => {
	return res.sendFile(appDir + "/client/add-orders.html");
});

module.exports = router;
