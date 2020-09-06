const Sequelize = require("sequelize");
var sequelize = require("../sql.js");

const Model = Sequelize.Model;
class User extends Model {}

User.init(
	{
		// attributes
		id: {
			type: Sequelize.INTEGER,
			allowNull: false,
			autoIncrement: true,
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
