const bcrypt = require("bcrypt");

const validation = require("../utility/validation");

const generateToken = require("../utility/generate-token");

const User = require("../models/user.model");

const userRegister = async (req, res, next) => {
	const {
		nim,
		password,
		confirmPassword,
		name,
		faculty,
		major,
		entryYear,
		phone,
	} = req.body;
	const kpm = req.file.filename;

	//check if password and confirmPassword are the same
	if (password !== confirmPassword) {
		return next(
			new Error("Password and Confirm Password are not the same")
		);
	}

	const { error } = validation.registerValidation({
		nim,
		password,
		name,
		faculty,
		major,
		entryYear,
		phone,
	});
	if (error) return next(error.details[0].message);

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	const user = new User({
		nim,
		password: hashedPassword,
		name,
		faculty,
		major,
		entryYear,
		phone,
		kpm,
	});

	try {
		await user.save();
		res.json({ message: "User created successfully" });
	} catch (err) {
		return next(err);
	}
};

const userLogin = async (req, res, next) => {
	const { nim, password } = req.body;

	const { error } = validation.loginValidation({
		nim,
		password,
	});
	if (error) return next(error.details[0].message);

	try {
		const user = await User.findOne({ nim });
		if (!user) return next(new Error("User not found"));

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return next(new Error("Password is incorrect"));

		const token = generateToken(user.nim);

		res.json({
			message: "User logged in successfully",
			token,
		});
	} catch (err) {
		return next(err);
	}
};

module.exports = {
	register: userRegister,
	login: userLogin,
};
