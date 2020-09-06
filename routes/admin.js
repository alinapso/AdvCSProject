/* eslint-disable no-unused-vars */
const express = require("express");
const router = express.Router();
var helper = require("./helper.js");
var path = require("path");
//const { adminOnly } = require("./helper.js");
const User = require("../Models/User");
const Group = require("../Models/Group");
const { Op } = require("sequelize");
// const Task = require("../Models/Tasks");

var appDir = path.dirname(require.main.filename) + "/public";

router.post(
	"/admin-workers/create-job-type",
	helper.adminOnly,
	async (req, res) => {
		try {
			console.log(req.body);
			if (!req.body.name) {
				return res.sendStatus(400);
			}
			const rslt = await Group.findAll({ where: { name: req.body.name } });
			console.log("RESULT OF SEARCH ", rslt);

			if (rslt.length < 1) {
				try {
					const user = await Group.create({
						name: req.body.name,
					});
					console.log("SUCCSEFULLY ADDED NEW JOB ");

					return res.send(200).send({ msg: "SUCCEFULY added new type" });
				} catch (err) {
					// console.log(err);
					return res
						.sendStatus(400)
						.send({ msg: "Something went wrong adding" });
				}
			}
			return res.status(400).send({ msg: "Type Already Exist" });
		} catch {
			return res.sendStatus(400);
		}
	}
);

router.get("/admin-tasks", helper.adminOnly, (req, res) => {
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

// router.get("/admin", helper.adminOnly, (req, res) => {
// 	console.log("HEY IM HERE1");
// 	return res.sendFile(appDir + "/admin-workers.html");
// });

module.exports = router;
