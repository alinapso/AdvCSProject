const express = require("express");
const router = express.Router();
var helper = require("./helper.js");
// const passport = require("passport");
var path = require("path");
var appDir = path.dirname(require.main.filename) + "/public";
const Tasks = require("../Models/Tasks");

router.get("/client-orders", helper.clientOnly, (req, res) => {
	return res.sendFile(appDir + "/client-orders.html");
});

router.get("/client-add-orders", helper.clientOnly, (req, res) => {
	return res.sendFile(appDir + "/client-add-orders.html");
});

router.post(
	"/client-add-orders/add-order",
	helper.clientOnly,
	async (req, res) => {
		try {
			try {
				console.log("RES: ", req);
				console.log("res.body : ", req.body);
				// eslint-disable-next-line no-unused-vars
				// const task = await Tasks.create({
				//   clientID: req.body.name,
				//   clientID: email,
				//   address: address,
				//   details: details,
				//   presence: false,
				//   groupID: opt.value,
				// });
				console.log("SUCCSEFULLY ADDED NEW Task ");

				return res.send(200).send({ msg: "SUCCEFULY added issue" });
			} catch (err) {
				// console.log(err);
				return res.sendStatus(400).send({ msg: "Something went wrong adding" });
			}
		} catch {
			return res.sendStatus(400);
		}
	}
);

module.exports = router;
