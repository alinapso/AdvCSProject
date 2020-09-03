const express = require("express");
const router = express.Router();
var helper = require("./helper.js");
var path = require("path");
var appDir = path.dirname(require.main.filename) + "/public";

router.get("/admin-tasks", helper.adminOnly, (req, res) => {
	res.sendFile(appDir + "/admin-tasks.html");
});

router.get("/admin-workers", helper.adminOnly, (req, res) => {
	res.sendFile(appDir + "/admin-workers.html", { name: req.user.name });
});

module.exports = router;
