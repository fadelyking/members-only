const User = require("../models/user");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
	passport.use(
		new LocalStrategy(async (username, password, done) => {
			try {
				console.log("local strategy works");
				const user = await User.findOne({ username: username });
				if (!user) {
					return done(null, false, { message: "Incorrect username" });
				}
				if (user.password !== password) {
					return done(null, false, { message: "Incorrect password" });
				}
				return done(null, user);
			} catch (err) {
				return done(err);
			}
		})
	);

	passport.serializeUser((user, done) => {
		console.log("Serialize works");
		done(null, user.id);
	});

	passport.deserializeUser(async (id, done) => {
		try {
			console.log("deSerialize works");
			const user = await User.findById(id);
			return done(null, user);
		} catch (err) {
			return done(err);
		}
	});
};
