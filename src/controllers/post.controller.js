const express = require("express");
const router = express.Router();

const User = require("../models/user.model");
const Post = require("../models/post.model");
const authanticate = require("../middleware/authanticate");
const authorize = require("../middleware/authorize");
const upload = require("../middleware/file-upload");

router.get("/ownPost", authanticate, async function (req, res) {
	try {
		const post = await Post.find({ user_id: req.user.id })
			.select()
			.lean()
			.exec();
		res.status(200).json({ post: post, user: req.user });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

router.get("/", async function (req, res) {
	try {
		const post = await Post.find()
			.select()
			.populate({ path: "user_id", select: "Name email" })
			.lean()
			.exec();
		res.status(200).json({ post: post, user: req.user });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

router.post("/id", async function (req, res) {
	try {
		console.log(req.body);
		const post = await Post.findById(req.body.id)
			.select()
			.populate({ path: "user_id", select: "Name email" })
			.lean()
			.exec();
		res.status(200).json({ post: post, user: req.user });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

router.post("/search", async function (req, res) {
	console.log(req.body);
	try {
		const post = await Post.find({
			from: req.body.search.from,
			to: req.body.search.to,
		})
			.sort({ timestamp: -1 })
			.select()
			.populate({ path: "user_id", select: "Name email" })
			.lean()
			.exec();
		res.status(200).json({ post: post, user: req.user });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

router.post("/create", authanticate, async function (req, res) {
	try {
		let payload = {
			...req.body.data,
			["user_id"]: req.user.id,
		};
		let post = await Post.create(payload);

		res.status(200).json({ post: post });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

module.exports = router;
