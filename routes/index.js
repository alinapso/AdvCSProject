var express = require("express");
var router = express.Router();
var helper = require("./helper.js");
const registerRouter = require("./register");
const loginRouter = require("./login");
const adminRouter = require("./admin");
const clientRouter = require("./client");

var path = require("path");
var appDir = path.dirname(require.main.filename) + "/public";

router.get("/logout", helper.checkAuthenticated, (req, res) => {
	req.logOut();
	res.redirect("/login");
});

router.use(adminRouter);
router.use(clientRouter);
router.use(registerRouter);
router.use(loginRouter);

router.get("/", helper.checkAuthenticated, (req, res) => {
	if (req.user.groupID === 0) {
		console.log("SHOULD DIRECT TO client");
		res.redirect("/client-orders");
	} else if (req.user.groupID === 1) {
		console.log("SHOULD DIRECT TO WORKER PAGES");
	}
	console.log("SHOULD DIRECT TO ADMIN PAGES");
	return res.redirect("/admin-tasks");
});

router.get("/landing", (req, res) => {
	res.sendFile(appDir + "/landing.html");
});

module.exports = router;
