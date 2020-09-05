const Sequelize = require("sequelize");
var sequelize = require("../sql.js");

const Model = Sequelize.Model;
class Group extends Model {}

Group.init(
  {
    // attributes
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "group",
    // options
  }
);

module.exports = Group;
