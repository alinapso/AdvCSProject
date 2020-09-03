const express = require("express");
const router = express.Router();
var helper = require("./helper.js");
// const passport = require("passport");
var path = require("path");
var appDir = path.dirname(require.main.filename) + "/public";

// router.get("/worker", helper.clientOnly, (req, res) => {
// 	res.sendFile(appDir + "/worker-orders.html");
// });

router.get("/worker-orders", helper.workerOnly, (req, res) => {
	res.sendFile(appDir + "/worker-orders.html");
});

router.get("/worker-profile", helper.workerOnly, (req, res) => {
	res.sendFile(appDir + "/worker-profile.html");
});

module.exports = router;
