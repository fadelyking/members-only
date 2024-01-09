const Message = require("../models/message");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res, next) => {
	const messages = await Message.find().populate("user").exec();
	console.log(messages);
	console.log("hi");
	res.render("index", { messages: messages, user: req.user });
});

exports.message_create_post = [
	body("title", "Title too short (min 1 character)").trim().isLength({ min: 1 }).escape(),
	body("text", "Text too short (min 1 character)").trim().isLength({ min: 1 }).escape(),

	asyncHandler(async (req, res, next) => {
		const users = User.find().exec();
		const messages = Message.find().populate("user").exec();
		const errors = validationResult(req);

		const message = new Message({
			title: req.body.title,
			text: req.body.text,
			time: new Date(),
			user: req.user._id,
		});

		if (!errors.isEmpty()) {
			res.render("index", { messages: messages, errors: errors.array() });
		}

		await message.save();
		res.render("index", { messages: messages, user: users });
	}),
];
