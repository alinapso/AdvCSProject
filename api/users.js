const express = require("express");
const router = express.Router();
var helper = require("../routes//helper.js");
// var path = require("path");
const User = require("../Models/User");
//const Group = require("../Models/Group");
//const Task = require("../Models/Tasks");
var sequelize = require("../sql.js");
const { QueryTypes } = require("sequelize");

//const passport = require("passport");

router.get("/", helper.adminOnly, async (req, res) => {
	return res.json(await User.findAll());
});

router.get("/profile", helper.checkAuthenticated, async (req, res) => {
	const result = await sequelize.query(
		`SELECT users.id,users.email,users.firstName,users.familyName,groups.name as groupname,groups.id from users left join groups on users.groupID = groups.id where users.id = ${req.user.id};`,
		{ type: QueryTypes.SELECT }
	);
	return res.json(result[0]);
});

router.get("/workers", helper.checkAuthenticated, async (req, res) => {
	const result = await sequelize.query(
		"SELECT users.id,users.email,users.firstName,users.familyName,groups.name as groupname from users inner join groups on users.groupID = groups.id where users.groupID > 1;",
		{ type: QueryTypes.SELECT }
	);
	console.log(result);
	return res.json(result);
});

router.post("/workers", helper.adminOnly, async (req, res) => {
	if (!(req.body.email && req.body.password)) {
		return res
			.status(400)
			.send({ msg: "you need an email and password to register" });
	}
	try {
		const result = await User.insert({
			email: req.body.email,
			password: req.body.password,
		});
		console.log(result);
		return res.json(result);
	} catch (err) {
		return res.status(500).send({ msg: err.message });
	}
});

module.exports = router;
