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
      signedIn: req.session.signedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/feed", async (req, res) => {
  try {
    // Get posts
    const postData = await Post.findAll({
      include: [
        { model: User },
        { model: Comment, include: [{ model: User }] },
      ],
    });
    const posts = postData.map((posts) => posts.get({ plain: true }));

    // Render page
    res.render("feed", {
      signedIn: req.session.signedIn,
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
      signedIn: req.session.signedIn,
      userPosts,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

/* Get request for login page */
router.get("/login", async (req, res) => {
  try {
    if (req.session.signedIn) {
      res.redirect("/locations");
      return;
    }
    // Render
    res.render("login", {
      signedIn: req.session.signedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

/* Get request, if not found above, route to 404 page */
router.get("*", async (req, res) => {
  try {
    // Render
    res.render("404", {
      signedIn: req.session.signedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

/* EXPORTS */
module.exports = router;
