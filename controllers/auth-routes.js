/* DEPENDENCIES */
const router = require("express").Router();
const passport = require("../config/passport");

/* ROUTES */
/* Get route to /auth/google, route to start OAuth2 authentication */
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login", "email"],
  })
);

/* Get route to /auth/google/callback, callback route for OAuth2 authentication */
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication
    req.session.save(() => {
      req.session.signedIn = true;
      req.session.username = true;
      res.redirect("/feed");
    });
  }
);

/* EXPORTS */
module.exports = router;
