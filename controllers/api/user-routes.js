/* DEPENDENCIES */
const router = require('express').Router();
const { User } = require('../../models');

/* ROUTES */
/* Post route to /api/users, creates a new user upon signup */
router.post('/', async (req, res) => {
  try {
    // Create credentials
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    // Sign in user
    req.session.save(() => {
      req.session.signedIn = true;
      res.status(200).json(user);
    });
  } catch (err) {res.status(500).json(err)}
});

/* Post route to /api/users/login, signs a user in */
router.post('/login', async (req, res) => {
  try {
    // Search for email in database
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    // If email is found in database, check if password matches
    let correctPassword = false;
    if (user) {
      correctPassword = await user.checkPassword(req.body.password);
    }

    // If email not found or password doesn't match, reject
    if (!user || !correctPassword) {
        res.status(400).json({ message: 'Incorrect email or password.' });
    } else {
        req.session.save(() => {
            req.session.loggedIn = true;
            res.status(200).json({ user: user, message: 'Success!' });
        });
    }
  } catch (err) {res.status(500).json(err)}
});

/* Post route to /api/users/logout, logs user out */
router.post('/logout', (req, res) => {
  if (req.session.signedIn) {
    req.session.destroy(() => {
      res.status(200).end();
    });
  } else {
    res.status(404).end();
  }
});

/* EXPORTS */
module.exports = router;
