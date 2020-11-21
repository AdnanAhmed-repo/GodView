const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DeviceSchema = Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "user",
		required: true,
	},
	deviceName: {
		type: String,
		required: true,
	},
	port: {
		type: Number,
	},
	ipAddress: {
		type: String,
	},
	macAddress: {
		type: String,
	},
	password: {
		type: String,
	},
});

module.exports = Device = mongoose.model("device", DeviceSchema);
