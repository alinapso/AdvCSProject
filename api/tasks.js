const express = require("express");
const router = express.Router();
var helper = require("../routes/helper");

const Task = require("../Models/Tasks");
var sequelize = require("../sql.js");
const { Op, QueryTypes } = require("sequelize");

router.get("/", helper.checkAuthenticated, async (req, res) => {
  if (req.user.groupID === 0) {
    const result = await sequelize.query(
      `Select users.email ,tasks.id, tasks.details,tasks.status,tasks.address,tasks.presence ,groups.name from  tasks inner join groups  on groups.id = tasks.groupID left join users on  tasks.workerID = users.id where tasks.clientId =  ${req.user.id}`,
      { type: QueryTypes.SELECT }
    );
    return res.json(result);
  }
  if (req.user.groupID === 1) {
    const result = await Task.findAll();
    return res.json(result);
  }
  const result = await sequelize.query(
    `Select tasks.id,users.email, tasks.details,tasks.status,tasks.address,tasks.presence, tasks.clientID ,groups.name,tasks.workerID from  tasks inner join groups on groups.id = tasks.groupID left join users on  tasks.clientID = users.id where tasks.groupID = ${req.user.groupID} AND tasks.status = 0 or tasks.workerID= ${req.user.id} and tasks.status = 1`,
    { type: QueryTypes.SELECT }
  );
  return res.json(result);
});

module.exports = router;
