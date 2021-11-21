const express = require("express");
var jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/user.model");

const newToken = (user) => {
	return jwt.sign({ id: user._id }, process.env.JWT_SCERET_KEY);
};

const register = async (req, res) => {
	console.log(req.body);
	try {
		let user = await User.findOne({ email: req.body.email }).lean().exec();

		if (user) {
			return res.status(200).json({ message: "User already exists" });
		}

		user = await User.create(req.body);

		const token = newToken(req.body);

		return res.status(201).json({ user, token });
	} catch (e) {
		return res.status(400).send(e.message);
	}
};

const login = async (req, res) => {
	try {
		console.log(req.body);
		let user = await User.findOne({ email: req.body.data.email }).exec();

		if (!user) {
			return res.status(400).send("User not exists");
		}
		const match = user.checkPassword(req.body.data.password);

		if (!match)
			return res
				.status(400)
				.json({ status: "error", message: "password wrong" });

		const token = newToken(user);

		// console.log(user);
		return res.status(201).json({ user, token });
	} catch (e) {
		return res.status(400).send(e.message);
	}
};

module.exports = { register, login, newToken };
