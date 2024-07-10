/* DEPENDECIES */
const router = require('express').Router();
const authorized = require('../utils/auth.js')  // Import authentication middleware
const { Post, User } = require('../models');    // Import models

/* ROUTES */
/* Get request for homepage, gets all posts */
router.get('/', authorized, async (req, res) => {
    try {
        // Get all posts
        const posts = await Post.findAll({
            include: [{ model: User }]
        });

        // Map data

        // Render posts
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn,
          });
    } catch (err) {res.status(500).json(err)};
});

/* EXPORTS */
module.exports = router;