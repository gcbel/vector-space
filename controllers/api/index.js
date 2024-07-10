/* DEPENDENCIES */
const router = require('express').Router();

/* ROUTES */
const userRoutes = require('./users');

router.use('/users', userRoutes);

/* EXPORTS */
module.exports = router;