const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	first_name: String,
	last_name: String,
	email: String,
	password: String,
	membership_status: Number,
	admin: Boolean,
});

UserSchema.virtual("full_name").get(function () {
	return `${this.first_name} ${this.last_name}`;
});

module.exports = mongoose.model("User", UserSchema);
