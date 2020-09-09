var express = require("express");
var router = express.Router();

const groupsRouter = require("./groups");
const tasksRouter = require("./tasks");
const usersRouter = require("./users");

router.use("/groups", groupsRouter);
router.use("/tasks", tasksRouter);
router.use("/users", usersRouter);

module.exports = router;
