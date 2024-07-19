/* DEPENDENCIES */
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const path = require("path");

/* PASSPORT */
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: path.join(__dirname, "/auth/google/callback"),
    },
    async function (token, tokenSecret, profile, done) {
      try {
        console.log(profile);
        const [user, created] = await User.findOrCreate({
          where: {
            googleId: profile.id,
          },
          defaults: {
            first: profile.name.givenName,
            last: profile.name.familyName,
            email: profile.emails[0].value,
          },
        });
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

/* EXPORTS */
module.exports = passport;
