var express = require("express");
var router = express.Router();
var helper = require("./helper.js");

const passport = require("passport");
var path = require("path");
var appDir = path.dirname(require.main.filename) + "/public";

router.get("/", helper.checkAuthenticated, (req, res) => {
  res.sendFile(appDir + "/workerOrders.html", { name: req.user.name });
});

router.get("/login", helper.checkNotAuthenticated, (req, res) => {
  res.sendFile(appDir + "/login.html");
});

router.post(
  "/login",
  helper.checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

router.get("/register", helper.checkNotAuthenticated, (req, res) => {
  res.sendFile(appDir + "/register.html");
});

router.post("/register", helper.checkNotAuthenticated, async (req, res) => {
  console.log();
  try {
    //const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log(req.body);
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: req.body.password, //hashedPassword,
    });
    res.redirect("/login");
  } catch {
    res.redirect("/");
  }
});

router.delete("/logout", (req, res) => {
  req.logOut();
  res.redirect("/login");
});
module.exports = router;
