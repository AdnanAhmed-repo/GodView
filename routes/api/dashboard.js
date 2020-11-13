const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const User = require("../../models/User");


router.get("/", async (req, res) => {

	try {
		
		let users = await User.find();

		// collecting all users
		res.status(200).json({ success: true, users});
	} catch (error) {
		console.log(error.message);
		res.status(500).send("Some error occurred");
	}
});

router.get("/company-details/:id", async (req, res) => {

	try {
		const { id } = req.params;
		const user = await User.findOne({ _id: id });

		if (!user)
		  res.status(400).json({ data: "No user found" });

		return res.status(200).json({ data: user });

	} catch (err) {
		console.log("Error in getcompanydetailsById", err.message);
		res.status(500).json({ message: `Error in getting company details${err.message}` });
	}
});

module.exports = router