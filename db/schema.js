const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
	uname: {
		type: String,
		unique: true,
	},
	email: {
		type: String,
	},
	password: {
		type: String,
	},
	identification: {
		type: String,
	},
});

module.exports = model("User", UserSchema);
