const Sequelize = require("sequelize");
var sequelize = require("../sql.js");

const Model = Sequelize.Model;
class Tasks extends Model {}

Tasks.init(
  {
    // attributes
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    clientID: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    workerID: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    time: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    details: {
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
