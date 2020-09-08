const express = require("express");
const router = express.Router();
var helper = require("./helper.js");
// var path = require("path");
const User = require("../Models/User");
const Group = require("../Models/Group");
const Task = require("../Models/Tasks");
var sequelize = require("../sql.js");
const { Op, QueryTypes } = require("sequelize");
// const Tasks = require("../Models/Tasks");

router.get("/groups", helper.checkAuthenticated, async (req, res) => {
	const result = await Group.findAll({ where: { id: { [Op.gt]: 1 } } });
	return res.json(result);
});

router.get("/tasks", helper.checkAuthenticated, async (req, res) => {
	const result = await Task.findAll();
	return res.json(result);
});

router.get("/client/tasks", helper.checkAuthenticated, async (req, res) => {
	const result = await sequelize.query(
		`Select users.email ,tasks.id, tasks.details,tasks.status,tasks.address,tasks.presence ,groups.name from  tasks inner join groups  on groups.id = tasks.groupID left join users on  tasks.workerID = users.id where tasks.clientId =  ${req.user.id}`,
		{ type: QueryTypes.SELECT }
	);

	return res.json(result);
});

router.get(
	"/users/worker/tasks",
	helper.checkAuthenticated,
	async (req, res) => {
		const result = await sequelize.query(
			`Select users.email ,tasks.id, tasks.details,tasks.status,tasks.address,tasks.presence, tasks.clientID ,groups.name from  tasks inner join groups  on groups.id = tasks.groupID left join users on  tasks.clientID = users.id where tasks.groupID =  ${req.user.groupID} AND  tasks.status = 0`,
			{ type: QueryTypes.SELECT }
		);
		return res.json(result);
	}
);

router.get(
	"/users/get-workers",
	helper.checkAuthenticated,
	async (req, res) => {
		const result = await sequelize.query(
			"SELECT users.id,users.email,users.firstName,users.familyName,groups.name as groupname from users inner join groups on users.groupID = groups.id where users.groupID > 1;",
			{ type: QueryTypes.SELECT }
		);
		console.log(result);
		return res.json(result);
	}
);

router.get("/users/getall", helper.adminOnly, async (req, res) => {
	const result = await sequelize.query(
		"SELECT users.id,users.email,users.firstName,users.familyName,groups.name as groupname from users inner join groups on users.groupID = groups.id where groups.id > 1;",
		{ type: QueryTypes.SELECT }
	);
	console.log(result);
	return res.json(result);
});

router.get(
	"/users/workerEmail",
	helper.checkAuthenticated,
	async (req, res) => {
		const result = await User.findByPk(req.user.id);
		return res.json(result);
	}
);

router.get("/users/workers", helper.checkAuthenticated, async (req, res) => {
	const result = await sequelize.query(
		`SELECT users.id,users.email,users.firstName,users.familyName,groups.name as groupname from users inner join groups on users.groupID = groups.id where users.id = ${req.user.id};`,
		{ type: QueryTypes.SELECT }
	);
	console.log(result);
	return res.json(result);
});

router.get(
	"/worker/presonal-tasks",
	helper.checkAuthenticated,
	async (req, res) => {
		const result = await sequelize.query(
			`Select users.email ,tasks.id, tasks.details,tasks.status,tasks.address,tasks.presence,tasks.clientID ,groups.name from  tasks inner join groups  on groups.id = tasks.groupID left join users on  tasks.clientID = users.id where tasks.workerID=  ${req.user.id}`,
			{ type: QueryTypes.SELECT }
		);
		return res.json(result);
	}
);

module.exports = router;
