/* DEPENDENCIES */
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const { TABLES } = require("./constants");

/* CLASS */
class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: TABLES.USER,
        key: "id",
      },
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: TABLES.POST,
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    modelName: "comment",
    tableName: "comment",
  }
);

/* EXPORTS */
module.exports = Comment;
