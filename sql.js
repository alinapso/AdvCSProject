const Sequelize = require("sequelize");
var dbConnection =
	"mysql://ug1to2qz4ugqe986:u185d2t3f370kxg8@zpfp07ebhm2zgmrm.chr7pe7iynqr.eu-west-1.rds.amazonaws.com:3306/e1qzak9scht1u3aq";
const sequelize = new Sequelize(process.env.JAWSDB_URL || dbConnection, {
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
});

module.exports = sequelize;
