require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const { v4 } = require("uuid");
const User = require("../models/user.model");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // https://glamorous-frog-cummerbund.cyclic.cloud
      callbackURL:
        "https://perfect-foal-underwear.cyclic.cloud/auth/google/callback",
      // "http://localhost:2345/auth/google/callback",
      scope: ["profile", "email"],
    },
    async function (request, accessToken, refreshToken, profile, done) {
      let user = await User.findOne({ email: profile?.email }).lean().exec();

      if (!user) {
        let nickName = profile?.email.split("@")[0];
        user = await User.create({
          email: profile?.email,
          password: v4(),
          name: nickName,
          profileImage: profile?.photos[0].value,
        });
      }
      return done(null, user);
    }
  )
);

module.exports = passport;
