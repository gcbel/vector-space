/* DEPENDENCIES */
const router = require('express').Router();

/* ROUTES */
const postRoutes = require('./posts.js');
const userRoutes = require('./users');

router.use('/posts', postRoutes);
router.use('/users', userRoutes);

/* EXPORTS */
module.exports = router;