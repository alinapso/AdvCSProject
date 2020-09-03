const express = require("express");
const router = express.Router();
var helper = require("./helper.js");
var path = require("path");
const { adminOnly } = require("./helper.js");

var appDir = path.dirname(require.main.filename) + "/public";

router.get("/admin-tasks", adminOnly, (req, res) => {
	return res.sendFile(appDir + "/admin-tasks.html");
});

// router.get("/admin-tasks", checkAuthenticated, (req, res) => {
// 	res.sendFile(appDir + "/admin-tasks.html");
// });

router.get("/admin-workers", helper.adminOnly, (req, res) => {
	return res.sendFile(appDir + "/admin-workers.html");
});

module.exports = router;
