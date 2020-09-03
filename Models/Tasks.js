const Sequelize = require("sequelize");
var sequelize = require("../sql.js");

// eslint-disable-next-line no-unused-vars
const { v4: uuidv4 } = require("uuid");
const Model = Sequelize.Model;
class Tasks extends Model {}

Task.init(
	{
		// attributes
		taskID: {
			type: Sequelize.UUID,
			allowNull: false,
			primaryKey: true,
		},
		clientID: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		workerID: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		time: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		firstName: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		familyName: {
			type: Sequelize.STRING,
			allowNull: true,
        },
        details:{
            type: Sequelize.STRING,
            allowNull: true,
        },
        presence: {
			type: Sequelize.BOOLEAN,
			allowNull: true,
		}, 
		groupID: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: "tasks",
		// options
	}
);

module.exports = Tasks;
