const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UrlSchema = Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "user",
		required: true,
	},
	url: {
		type: String,
		required: true,
	},
});

module.exports = Url = mongoose.model("url", UrlSchema);

