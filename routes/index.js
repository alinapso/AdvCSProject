// var bodyParser = require('body-parser');
var express = require("express");
var router = express.Router();
var helper = require("./helper.js");
const registerRouter = require("./regitser");
const User = require("../Models/User");

// router.use(bodyParser.urlencoded());

const passport = require("passport");
var path = require("path");
var appDir = path.dirname(require.main.filename) + "/public";

router.use(registerRouter);

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

// router.get("/register", helper.checkNotAuthenticated, (req, res) => {
//   res.sendFile(appDir + "/register.html");
// });

// router.post("/register", helper.checkNotAuthenticated, async (req, res) => {
//   console.log();
//   try {
//     //const hashedPassword = await bcrypt.hash(req.body.password, 10);
//     console.log(req.body);

//     try{
//       const users2 = User.build({
//         id: Date.now().toString(),
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password, //hashedPassword,
//         groupID: 0,
//       });
//       await users2.save();
//       console.log("SUCCSEFULLY ADDED NEW USER ");
//     }
//     catch(err)
//     {
//       console.log("ERROR ADDING NEW USER:", err);
//       return;
//     }
//     res.redirect("/login");
//   } catch {
//     res.redirect("/");
//   }
// });

router.delete("/logout", (req, res) => {
  req.logOut();
  res.redirect("/login");
});

router.get("/landing", (req, res) => {
  res.sendFile(appDir + "/landing.html");
});

module.exports = router;
