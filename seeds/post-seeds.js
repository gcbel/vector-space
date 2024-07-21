/* DEPENDENCIES */
const Post = require("../models/Post");

/* VARIABLES */
const postData = [
  {
    title: "Welcome to VectorSpace!",
    content: `We’re thrilled to have you join our community of tech enthusiasts and innovators. Share your tech ideas, ask questions, and connect with others. Start contributing to the conversation!

    Best,
    The VectorSpace Team`,
    date: new Date(),
    user_id: "1",
  },
];

/* FUNCTIONS */
const seedPost = () => Post.bulkCreate(postData);

/* EXPORTS */
module.exports = seedPost;
