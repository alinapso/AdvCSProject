var sequelize = require("./sql.js");
const User = require("./Models/User");
const Group = require("./Models/Group");
const Task = require("./Models/Tasks");

sequelize.sync({ force: true }).then(() => {
  try {
    const g1 = Group.create({
      name: "Admin",
    });
    const g3 = Group.create({
      name: "electric",
    });
    const g4 = Group.create({
      name: "gardining",
    });
    User.create({
      email: "admin@admin.com",
      password: "admin", //hashedPassword,
      groupID: 1,
    });
    User.create({
      email: "user@user.com",
      password: "user", //hashedPassword,
      groupID: 0,
    });
    User.create({
      email: "electric@worker.com",
      password: "electric", //hashedPassword,
      groupID: 2,
    });
    User.create({
      email: "garden@worker.com",
      password: "garden", //hashedPassword,
      groupID: 3,
    });
  } catch (err) {
    console.log(err);
  }
});
