/* DEPENDENCIES */
const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

/* Post route to /api/content/newpost, creates a new post */
router.post("/signup", async (req, res) => {
  try {
    // Create credentials
    const user = await User.create({
      first: req.body.first,
      last: req.body.last,
      username: req.body.user,
      email: req.body.email,
      password: req.body.password,
    });

    // Sign in user
    req.session.save(() => {
      req.session.signedIn = true;
      req.session.username = req.body.user;
      res.status(200).json(user);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

/* EXPORTS */
module.exports = router;
