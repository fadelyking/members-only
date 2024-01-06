const Message = require("../models/message");
const User = require("../models/user");
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

	asyncHandler(async (req, res, next) => {
		const errors = validationResult(req);

		const user = new User({
			first_name: req.body.name,
			last_name: req.body.name,
			email: req.body.email,
			password: req.body.password,
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
	}),
];
