/* DEPENDECIES */
const router = require("express").Router();
const { authenticate } = require("../utils/helpers.js"); // Import authentication middleware
const { Post, User, Comment } = require("../models/index.js"); // Import models

/* ROUTES */
/* Get request for homepage */
router.get("/", async (req, res) => {
  try {
    // Render page
    res.render("home", {
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/posts", async (req, res) => {
  try {
    // Get posts
    postData = await Post.findAll({
      include: [{ model: User, model: Comment }],
    });
    const posts = postData.map((posts) => posts.get({ plain: true }));

    // Render page
    res.render("posts", {
      loggedIn: req.session.loggedIn,
      posts,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/dashboard/username", async (req, res) => {
  try {
    // Get posts
    postData = await Post.findAll({
      where: { username: req.params.name },
      include: [{ model: User, model: Comment }],
    });
    const posts = postData.map((posts) => posts.get({ plain: true }));

    // Render page
    res.render("dashboard", {
      loggedIn: req.session.loggedIn,
      userPosts,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

/* EXPORTS */
module.exports = router;
