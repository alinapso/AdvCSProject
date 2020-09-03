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

router.get("/landing", (req, res) => {
	res.sendFile(appDir + "/landing.html");
});

router.get("/", helper.checkAuthenticated, (req, res) => {
	if (req.user.groupID === 0) {
		console.log("SHOULD DIRECT TO client");
		res.sendFile(appDir + "/customer-orders.html");
		return;
	} else if (req.user.groupID === 1) {
		console.log("SHOULD DIRECT TO WORKER PAGES");
		return;
	}
	console.log("SHOULD DIRECT TO ADMIN PAGES");
	// res.sendFile(appDir + "/admin-tasks.html");
	res.redirect("/admin-tasks");
});

module.exports = router;
