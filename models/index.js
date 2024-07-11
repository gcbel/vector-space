/* DEPENDENCIES */
const User = require('./User.js');
const Post = require('./Post.js');

/* ASSOCIATIONS */
User.hasMany(Post, {
  foreignKey: 'user_id',
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
});

/* EXPORTS */
module.exports = { User, Post };