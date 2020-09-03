const express = require("express");
const router = express.Router();
var helper = require("./helper.js");
// const passport = require("passport");
var path = require("path");
var appDir = path.dirname(require.main.filename) + "/public";

// router.get("/worker", helper.clientOnly, (req, res) => {
// 	res.sendFile(appDir + "/worker-orders.html");
// });

router.get("/worker-orders", helper.clientOnly, (req, res) => {
	res.sendFile(appDir + "/worker-orders.html");
});

router.get("/worker-profiles", helper.clientOnly, (req, res) => {
	res.sendFile(appDir + "/customer-workers.html");
});

module.exports = router;
