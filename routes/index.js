var express = require("express");
var router = express.Router();
var helper = require("./helper.js");
const registerRouter = require("./register");
const loginRouter = require("./login");
const adminRouter = require("./admin");
const clientRouter = require("./client");
const workerRouter = require("./worker");
const profileRouter = require("./profile");
const apiRouter = require("../api/");
var path = require("path");
var appDir = path.dirname(require.main.filename) + "/public";

router.get("/logout", helper.checkAuthenticated, (req, res) => {
	req.logOut();
	res.redirect("/login");
});

router.use(workerRouter);
router.use(adminRouter);
router.use(clientRouter);
router.use(registerRouter);
router.use(loginRouter);
router.use("/profile", profileRouter);

router.use("/api", apiRouter);

router.get("/", helper.checkAuthenticated, (req, res) => {
	if (req.user.groupID === 0) {
		console.log("SHOULD DIRECT TO client");
		return res.redirect("/client/orders");
	} else if (req.user.groupID > 1) {
		console.log("SHOULD DIRECT TO WORKER PAGES");
		return res.redirect("/worker/orders");
	}
	console.log("SHOULD DIRECT TO ADMIN PAGES");
	return res.redirect("/admin/tasks");
});

router.get("/landing", (req, res) => {
	res.sendFile(appDir + "/landing.html");
});

module.exports = router;
