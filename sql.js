const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "mysql://ug1to2qz4ugqe986:u185d2t3f370kxg8@zpfp07ebhm2zgmrm.chr7pe7iynqr.eu-west-1.rds.amazonaws.com:3306/e1qzak9scht1u3aq",
  {
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);
//if you want to restart run in console "npm run resetdb"
module.exports = sequelize;
