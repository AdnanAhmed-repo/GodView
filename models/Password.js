const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PasswordSchema = Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "user",
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

module.exports = Password = mongoose.model("password", PasswordSchema);