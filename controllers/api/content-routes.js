/* DEPENDENCIES */
const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

/* Post route to /api/content/post, creates a new post */
router.post("/post", async (req, res) => {
  try {
    // Get user
    const user = await User.findOne({
      where: { username: req.session.username },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Create a new post
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      date: new Date(),
      user_id: user.id,
    });

    res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to create a new post.", error: err });
  }
});

/* EXPORTS */
module.exports = router;
