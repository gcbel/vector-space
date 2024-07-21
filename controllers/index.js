/* DEPENDENCIES */
const router = require("express").Router();

/* ROUTES */
const homeRoutes = require("./home-routes.js");
const authRoutes = require("./auth-routes.js");
const apiRoutes = require("./api");

router.use("/", homeRoutes);
router.use("/auth", authRoutes);
router.use("/api", apiRoutes);

/* EXPORTS */
module.exports = router;
