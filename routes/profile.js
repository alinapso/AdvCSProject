const express = require("express");
const router = express.Router();
var helper = require("./helper.js");
// const passport = require("passport");
var path = require("path");

const User = require("../Models/User.js");
var appDir = path.dirname(require.main.filename) + "/public";

router.get("/", helper.checkAuthenticated, (req, res) => {
  res.sendFile(appDir + "/profile.html");
});

router.post("/update", helper.checkAuthenticated, async (req, res) => {
  try {
    console.log("CALLED SET PROFILE");
    const result = await User.findByPk(req.user.id);
    result.firstName = req.body.firstName;
    result.familyName = req.body.familyName;
    result.save();
    return res.sendStatus(200);
  } catch (err) {
    return res.status(400).send({ msg: err });
  }
});
module.exports = router;
