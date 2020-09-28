const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.JAWSDB_URL, {
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
});
//if you want to restart run in console "npm run resetdb"
module.exports = sequelize;
