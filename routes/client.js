const express = require("express");
const router = express.Router();
var helper = require("./helper.js");
// const passport = require("passport");
var path = require("path");
var appDir = path.dirname(require.main.filename) + "/public";

router.get("/customer-orders", helper.clientOnly, (req, res) => {
	res.sendFile(appDir + "/customer-orders.html");
});

router.get("/customer-workers", helper.clientOnly, (req, res) => {
	res.sendFile(appDir + "/customer-workers.html");
});

module.exports = router;
