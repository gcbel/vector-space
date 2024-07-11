/* DEPENDENCIES */
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

/* CLASS */
class Post extends Model {}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
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
                model: 'users', // Name of the table
                key: 'id' // Key in the `users` table that we are referencing
              }
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        modelName: 'post'
    }
);

/* EXPORTS */
module.exports = Post;