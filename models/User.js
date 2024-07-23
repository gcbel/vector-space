/* DEPENDENCIES */
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

/* CLASS */
class User extends Model {
  checkPassword(pw) {
    return bcrypt.compareSync(pw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    first: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true, // Allows Google OAuth
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: true, // Only OAuth users will have this field populated
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 8);
        }
        return user;
      },
    },
    sequelize,
    freezeTableName: true,
    tableName: "user",
    modelName: "user",
  }
);

/* EXPORTS */
module.exports = User;
