const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");


const User = require("../../models/Admin");
// @route POST api/users
// @desc Register User
// @access Public
router.post(
	"/register",
	// validation
	[
		check("name", "business name is required").not().isEmpty(),
		check("email", "email needs to be vlaid").isEmail(),
		check("password", "valid password please").isLength({ min: 6 }),
	],
	async (req, res) => {
		// handling validation error
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, password } = req.body;
		console.log("WE ARe INSIDE BACKEND NOW");
		try {
			// checking email already exist or not
			let user = await User.findOne({ email });

			if (user) {
				return res
					.status(400)
					.json({ errors: [{ msg: "User already exists" }] });
			}

			
			// creating new user body
			user = new User({
				name,
				email,
				password,
			});

			// hashing password
			const salt = await bcrypt.genSalt(10);

			user.password = await bcrypt.hash(password, salt);

			// payload for signing jwt
			const payload = {
				user: {
					id: user.id,
				},
			};

			// creating token
			const token = await jwt.sign(payload, config.get("jwtSecret"), {
				expiresIn: 360000000,
			});

			if (!token) {
				throw new Error();
			}

			// assigning token
			user.token = token;
			const registeredUser = await user.save();
			console.log("registered user-----", registeredUser);
			res
				.header("x-auth-token", token)
				.json({
					registerSuccess: true,
					id: registeredUser.id,
					token,
					name: user.name,
				});
		} catch (err) {
			console.log(err.message);
			res.status(500).send("Server error");
		}
	}
);

// Login Route

router.post(
	"/login",
	// validation
	[
		check("email", "email needs to be vlaid").isEmail(),
		check("password", "valid password please").isLength({ min: 6 }),
	],
	async (req, res) => {
		// handling validation error
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;

		try {
			// finding the user with email
			let user = await User.findOne({ email });

			if (!user) {
				return res
					.status(401)
					.json({
					loginSuccess: false,
					message: "Auth failed, email not found",
				});
			}

			// verifying password
			const isPasswordMatched = await bcrypt.compare(password, user.password);

			if (!isPasswordMatched) {
				return res
					.status(401)
					.json({ loginSuccess: false, message: "Invalid Credentials." });
			}

			// payload for signing jwt token
			console.log("USER__ID______", user.id);
			const payload = {
				user: {
					id: user.id,
				},
			};

			// assigning token
			const token = await jwt.sign(payload, config.get("jwtSecret"), {
				expiresIn: 360000000,
			});

			if (!token) {
				throw new Error();
			}

			// assigning token to user
			user.token = token;
			await user.save();

			res
				.header("x-auth-token", token)
				.json({ loginSuccess: true, id: user.id, token, name: user.name });
		} catch (err) {
			console.log(err.message);
			res.status(500).send("Server error");
		}
	}
);

// Logout Route(delete Route)

router.get("/logout", auth, async (req, res) => {
	try {
		// finding the user by id and nullifying the token
		await User.findOneAndUpdate({ _id: req.user.id }, { token: null });

		// removing the auth header
		delete req.headers["x-auth-token"];

		return res.status(200).send({
			success: true,
			message: "Logged Out",
		});
	} catch (err) {
		console.log(err.message);
		res.status(500).send("Server error");
	}
});

module.exports = router;
