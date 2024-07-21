/* DEPENDENCIES */
const Comment = require("../models/Comment");

/* VARIABLES */
const commentData = [
  {
    content: `Users can interact with each other through comments!`,
    date: new Date(),
    user_id: "1",
    post_id: "1",
  },
];

/* FUNCTIONS */
const seedComment = () => Comment.bulkCreate(commentData);

/* EXPORTS */
module.exports = seedComment;
