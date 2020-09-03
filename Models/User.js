const Sequelize = require("sequelize");
var sequelize = require("../sql.js");

// eslint-disable-next-line no-unused-vars
const { v4: uuidv4 } = require("uuid");
const Model = Sequelize.Model;
class User extends Model {}

User.init(
	{
		// attributes
		id: {
			type: Sequelize.UUID,
			allowNull: false,
			primaryKey: true,
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		firstName: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		familyName: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		groupID: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: "user",
		// options
	}
);

module.exports = User;
