const Message = require("../models/message");
const User = require("../models/user");
const passport = require("passport");
const bcryptjs = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.user_create_get = (req, res, next) => {
	res.render("user_form");
};

exports.user_create_post = [
	body("first_name", "First name Must contain at least 3 characters")
		.trim()
		.isLength({ min: 3 })
		.escape(),
	body("last_name", "Last name Must contain at least 3 characters")
		.trim()
		.isLength({ min: 3 })
		.escape(),
	body("email", "Please correct email").trim().isEmail().escape(),
	body("password", "Password Must contain at least 3 characters").trim().escape(),
	body("confirmPassword", "Passwords do not match").custom((value, { req }) => {
		return value === req.body.password;
	}),

	asyncHandler(async (req, res, next) => {
		bcryptjs.hash(req.body.password, 10, async (err, hashedPassword) => {
			try {
				const errors = validationResult(req);

				const user = new User({
					first_name: req.body.name,
					last_name: req.body.name,
					email: req.body.email,
					password: hashedPassword,
					membership_status: 0,
				});

				if (!errors.isEmpty()) {
					res.render("user_form", { errors: errors.array() });
					return;
				} else {
					const userExists = await User.findOne({ first_name: req.body.first_name });

					if (userExists) {
						res.render("user_form", { errors: "User Already Exists !" });
					} else {
						await user.save();
						res.render("user_form");
					}
				}
			} catch (err) {
				return next(err);
			}
		});
	}),
];

exports.user_club_get = (req, res, next) => {
	res.render("club.ejs");
};

exports.user_club_post = [
	body("password", "You entered the secret pass code wrong").custom((value) => {
		return value === "meow";
	}),

	asyncHandler(async (req, res, next) => {
		errors = validationResult(errors);
	}),
];

exports.user_login_get = asyncHandler(async (req, res, next) => {
	const user = await User.find().exec();

	res.render("login", { users: user });
});

exports.user_login_post = [
	body("username").trim().isLength({ min: 3 }).escape(),
	body("password").trim().isLength({ min: 3 }).escape(),
	asyncHandler(async (req, res, next) => {
		const errors = validationResult(req);
		const user = new User({
			username: req.body.user,
			password: req.body.password,
		});

		if (!errors.isEmpty()) {
			res.render("login", { user: user, errors: errors.array() });
		} else {
			console.log("success");
			return passport.authenticate("local", {
				successRedirect: "/sign-up",
				failureRedirect: "/login",
				failureMessage: true,
			});
		}
	}),
];
