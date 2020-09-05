const express = require("express");
const router = express.Router();
var helper = require("./helper.js");
var path = require("path");
const User = require("../Models/User");
const Group = require("../Models/Group");
const Task = require("../Models/Tasks");
const { Op } = require("sequelize");
router.get("/groups", helper.checkAuthenticated, async (req, res) => {
  const result = await Group.findAll({ where: { id: { [Op.gt]: 1 } } });
  return res.json(result);
});

router.get("/client/tasks", helper.checkAuthenticated, async (req, res) => {
  const result = await Task.findAll({ where: { clientID: req.user.id } });
  return res.json(result);
});

module.exports = router;
