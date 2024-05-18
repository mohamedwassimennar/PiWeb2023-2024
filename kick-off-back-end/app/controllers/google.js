const User = require('../models/userBase.model.js');

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

class AuthGoogle {
    async loginGoogle(req, res) {
        passport.use(
            new GoogleStrategy(
                {
                    clientID: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET,
                    callbackURL: process.env.CALL_BACKURL,
                    userProfileURL: 'https://www.googleapis.com/oauth20/v3/userinfo',
                    passReqToCallback: true,
                },
                async function (req, accessToken, refreshToken, profile, done) {
                    try {
                        console.log(profile);
                        const existingUser = await User.findOne({ googleId: profile.id });
                        if (existingUser) {
                            return done(null, existingUser);
                        }
                        const randomPassword = Math.random().toString(36).slice(-8);
                        const newUser = new User({
                            googleId: profile.id,
                            //   username:profile.displayName,
                            firstName: profile.name.givenName,
                            lastName: profile.name.familyName,
                            email: profile.emails[0].value,
                            role: 'default',
                            password: randomPassword,
                            profileImage:profile.photos[0].value,
                            confirmedEmail: true
                        });
                        await newUser.save();
                        done(null, newUser);
                    } catch (err) {
                        done(err, false);
                    }
                }
            )
        );

        passport.authenticate("google", { scope: ["profile", "email"] })(req, res);
    }

    async callbackGoogle(req, res) { }
}


module.exports = new AuthGoogle();