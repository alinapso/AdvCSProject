const Sequelize = require("sequelize");
var sequelize = require("../sql.js");

// eslint-disable-next-line no-unused-vars
const { v4: uuidv4 } = require("uuid");
const Model = Sequelize.Model;
class JobType extends Model {}

JobType.init(
	{
		// attributes
		id: {
			type: Sequelize.UUID,
			allowNull: false,
			primaryKey: true,
		},
		jobType: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		workerList: {
			type: Sequelize.STRING,
			allowNull: true,
		},
	},
	{
		sequelize,
		modelName: "jobtype",
		// options
	}
);

module.exports = JobType;
