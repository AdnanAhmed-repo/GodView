const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema({
	bname: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	exposedPasswords:[],
	exposedNumber:{
		type: String,
		default: "00"
	},
	riskHistory:[],
	riskScore:{
		type: Number,
		default: 100
	},
	stripeDetails: {},
	lastActive:{
		type: Number,
		default:0
	},
	token: {
		type: String,
		default: null,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	addedEmails: [
		{
			type: Schema.Types.ObjectId,
			ref: "email",
		},
	],
	addedPasswords: [
		{
			type: Schema.Types.ObjectId,
			ref: "password",
		},
	],
	addedDevices: [
		{
			type: Schema.Types.ObjectId,
			ref: "device",
		},
	],
	addedUrls: [
		{
			type: Schema.Types.ObjectId,
			ref: "url",
		},
	],
});

module.exports = User = mongoose.model("user", UserSchema);