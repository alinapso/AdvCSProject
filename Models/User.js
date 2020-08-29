const Sequelize = require("sequelize");
var sequelize = require("../sql.js");

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
      allowNull: false,
    },
    familyName: {
      type: Sequelize.STRING,
      allowNull: false,
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
