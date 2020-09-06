const express = require("express");
const router = express.Router();
var helper = require("./helper.js");
// var path = require("path");
// const User = require("../Models/User");
const Group = require("../Models/Group");
const Task = require("../Models/Tasks");
var sequelize = require("../sql.js");
const { Op, QueryTypes } = require("sequelize");

router.get("/groups", helper.checkAuthenticated, async (req, res) => {
  const result = await Group.findAll({ where: { id: { [Op.gt]: 1 } } });
  return res.json(result);
});

router.get("/client/tasks", helper.checkAuthenticated, async (req, res) => {
  const result = await Task.findAll({ where: { clientID: req.user.id } });
  return res.json(result);
});
router.get("/users/getall", helper.adminOnly, async (req, res) => {
  const result = await sequelize.query(
    "SELECT users.id,users.email,users.firstName,users.familyName,groups.name as groupname from users inner join groups on users.groupID = groups.name;",
    { type: QueryTypes.SELECT }
  );
  console.log(result);
  return res.json(result);
});
module.exports = router;
