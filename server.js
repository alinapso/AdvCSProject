const express = require("express");
const cors = require("cors");
var cookieParser = require("cookie-parser");
var path = require("path");
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const initializePassport = require("./passport-config");
initializePassport(
  passport,
  (email) => users.find((user) => user.email === email),
  (id) => users.find((user) => user.id === id)
);

const users = [];

app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "a!asjsjdmc2sad213123sad213123",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

app.get("/", checkAuthenticated, (req, res) => {
  res.sendFile(__dirname + "/public/index.htm", { name: req.user.name });
});

app.get("/login", checkNotAuthenticated, (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});

app.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

app.get("/register", checkNotAuthenticated, (req, res) => {
  res.sendFile(__dirname + "/public/register.html");
});

app.post("/register", checkNotAuthenticated, async (req, res) => {
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
    res.redirect("/register");
  }
});

app.delete("/logout", (req, res) => {
  req.logOut();
  res.redirect("/login");
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/login");
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}
app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);
