const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
	title: String,
	timestamp: Timestamp,
	text: String,
	user: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Message", MessageSchema);
