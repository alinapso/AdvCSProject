const express = require("express");
const router = express.Router();
var helper = require("../routes/helper");
const Group = require("../Models/Group");
const { Op } = require("sequelize");

router.get("/", helper.checkAuthenticated, async (req, res) => {
  const result = await Group.findAll({ where: { id: { [Op.gt]: 1 } } });
  return res.json(result);
});
module.exports = router;
