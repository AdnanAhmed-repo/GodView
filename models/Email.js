const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmailSchema = Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "user",
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
});

module.exports = Email = mongoose.model("email", EmailSchema);