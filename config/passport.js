const User = require("../models/user");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
	passport.use(
		new LocalStrategy(async (username, password, done) => {
			try {
				const user = await User.findOne({ email: username });
				if (!user) {
					return done(null, false, { message: "Incorrect username" });
				}
				console.log(user);
				const match = await bcrypt.compare(password, user.password);
				if (!match) {
					console.log("incorrect password");
					// passwords do not match!
					return done(null, false, { message: "Incorrect password" });
				}
				return done(null, user);
			} catch (err) {
				console.log(err);
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
