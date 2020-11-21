const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const User = require("../../models/User");
const Device = require("../../models/Device");
const Email = require("../../models/Email");
const Password = require("../../models/Password");
const Url = require("../../models/Url");
const Vulnerability = require("../../models/Vulnerability");

router.get("/", async (req, res) => {
	try {
		let users = await User.find();

		// collecting all users
		res.status(200).json({ success: true, users });
	} catch (error) {
		console.log(error.message);
		res.status(500).send("Some error occurred");
	}
});

router.get("/company-details/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findOne({ _id: id });

		if (!user) res.status(400).json({ data: "No user found" });

		return res.status(200).json({ data: user });
	} catch (err) {
		console.log("Error in getcompanydetailsById", err.message);
		res
			.status(500)
			.json({ message: `Error in getting company details${err.message}` });
	}
});

router.post("/get-vulnerabilities", async (req, res) => {
	try {
		const { userId } = req.body;
		const user = await User.findOne({ _id: userId });

		if (!user) return res.status(400).send({ data: "No user found" });

		const vulnerabilities = await Vulnerability.find({ user: userId });
		return res.status(200).json({ vulnerabilities });
	} catch (err) {
		console.log("Error in getting vulnerability", err.message);
		res
			.status(500)
			.send({ message: `Error in getting vulnerability${err.message}` });
	}
});

router.post("/add-vulnerability", async (req, res) => {
	try {
		const { userId, vulName, vulDesc, vulType } = req.body;
		const user = await User.findOne({ _id: userId });

		if (!user) return res.status(400).send({ data: "No user found" });

		const vulnerability = new Vulnerability({
			user: userId,
			vulName,
			vulDesc,
			vulType,
		});

		const vulAdded = await vulnerability.save();
		return res.status(200).json({ vulnerability: vulAdded });
	} catch (err) {
		console.log("Error in adding vulnerability", err.message);
		res
			.status(500)
			.send({ message: `Error in adding vulnerability${err.message}` });
	}
});

router.post("/switchstatus/:userId/:id", async (req, res) => {
	try {
		const { userId, id } = req.params;
		const vulnerability = await Vulnerability.findOne({ _id: id });
		const user = await User.findOne({ _id: userId });

		if (!user) {
			return res.status(400).send({ data: "No User" });
		}
		if (!vulnerability) {
			return res.status(400).send({ data: "No vulnerability found" });
		}

		if (vulnerability.status === "In Progress") {
			user.riskScore += 2;
			vulnerability.status = "Patched";
		} else {
			user.riskScore -= 2;
			vulnerability.status = "In Progress";
		}
		if (user.riskScore < 0) {
			user.riskScore = 0;
		} else if (user.riskScore > 80) {
			user.riskScore = 80;
		}
		await user.save();
		let response = await vulnerability.save();

		return res.status(200).json({ switchedStatus: response });
	} catch (err) {
		console.log("Error in switching status of vulnerability", err.message);
		res
			.status(500)
			.send({
				message: `Error in switching status of vulnerability${err.message}`,
			});
	}
});

router.post("/editscore", async (req, res) => {
	try {
		const { id, newScore } = req.body;

		const user = await User.findOne({ _id: id });

		if (!user) {
			return res.status(400).send({ data: "No User" });
		}

		user.riskScore = newScore;

		await user.save();

		return res.status(200).json({ success: true });
	} catch (err) {
		console.log("Error in Editing Score from ADMIN", err.message);
		res
			.status(500)
			.send({ message: `Error in Editing Score from ADMIN:  ${err.message}` });
	}
});

router.delete("/deleteuser/:id", async (req, res) => {
	try {
		const { id } = req.params;

		await User.findOneAndDelete({ _id: id });
		await Vulnerability.deleteMany({ _id: id });
		await Device.deleteMany({ _id: id });
		await Password.deleteMany({ _id: id });
		await Url.deleteMany({ _id: id });
		await Email.deleteMany({ _id: id });

		return res.status(200).json({ success: "User and its data, all deleted" });
	} catch (err) {
		console.log("Error in Deleting user records", err.message);
		res
			.status(500)
			.send({ message: `Error in Deleting user records:  ${err.message}` });
	}
});

module.exports = router;
