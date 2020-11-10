const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const cors = require("cors");
require('dotenv').config()

const app = express();
app.use(cors());
// Connect Database
connectDB();

// init Middleware

app.use(express.json({extended:false}));
app.use(express.urlencoded({extended:true}))

//Define routes
app.use("/api/admin", require("./routes/api/admin"));

//Serve static assets in production
if (process.env.NODE_ENV === "production") {
	// set static folder
	app.use(express.static("client/build"));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

// Serving to PORT
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log("Server Started"));
