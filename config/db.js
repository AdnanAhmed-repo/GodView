const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");
const uri =
	"mongodb+srv://prime:prime@cluster0.etv5r.gcp.mongodb.net/testing?retryWrites=true&w=majority";
const connectDB = async () => {
	try {
		await mongoose.connect(uri, {
			useNewUrlParser: true,
			useCreateIndex: true,
		});
		console.log("mongoDB connected");
	} catch (err) {
		console.log(err.message);
		process.exit(1);
	}
};

module.exports = connectDB;
