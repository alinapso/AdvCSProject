const express = require("express");
const cors = require("cors");
var cookieParser = require("cookie-parser");
var path = require("path");
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");

const db = require("./sql.js");
const app = express();
const User = require("./Models/User.js");

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/public")));

function findUserByID(id) {
  User.findOne({ where: { id: id } })
    .then((user) => {
      return user;
    })
    .catch((err) => {
      return null;
    });
}

function findUserByEmail(email) {
  User.findOne({ where: { email: email } })
    .then((user) => {
      return user;
    })
    .catch((err) => {
      return null;
    });
}

const initializePassport = require("./passport-config");
initializePassport(passport, findUserByEmail, findUserByID);

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

var indexRouter = require("./routes/index");
app.use("/", indexRouter);

app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);
