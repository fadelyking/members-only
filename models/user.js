const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: String,
	last_name: String,
	email: String,
	membership_status: Number,
});

module.exports = mongoose.model("User", UserSchema);
