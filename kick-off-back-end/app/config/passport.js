const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/userBase.model');

passport.use(new GoogleStrategy({
	clientID: '20376785289-5vuov1uen2dmjsspihskcmbuvrvgs828.apps.googleusercontent.com',
	clientSecret: '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',
	callbackURL: 'http://localhost:3000/auth/google/callback', 
	scope: ['profile', 'email'] 
},  async (accessToken, refreshToken, profile, done) => {
	try {
		// if the user already exists in the database
		let user = await User.findOne({ email: profile.emails[0].value });

    	if (!user) {
			const generatedPassword = generateRandomPassword();
			const hashedPassword = await bcrypt.hash(generatedPassword, 10);

			user = new User({
				role: profile.role || 'default', // Set a default role if not provided
				firstName: profile.name.givenName,
				lastName: profile.name.familyName,
				email: profile.emails[0].value,
				password: hashedPassword,
			});

			await user.save();
		}
		done(null, user);
	} catch (error) {
		done(error);
	}
}));

// Function to generate a random password
function generateRandomPassword() {
  const length = 12; 
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;

