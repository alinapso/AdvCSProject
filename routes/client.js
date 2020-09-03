const express = require("express");
const router = express.Router();
var helper = require("./helper.js");
// const passport = require("passport");
var path = require("path");
var appDir = path.dirname(require.main.filename) + "/public";

router.get("/client-orders", helper.clientOnly, (req, res) => {
	return res.sendFile(appDir + "/client-orders.html");
});

router.get("/client-add-orders", helper.clientOnly, (req, res) => {
	return res.sendFile(appDir + "/client-add-orders.html");
});

module.exports = router;
