const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
	{
		from: { type: String, required: true },
		to: { type: String, required: true },
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "userauth",
			required: true,
		},
		date: { type: String, required: true },
		size: { type: String, required: true },
		details: { type: String },
		preference: { type: String, required: true },
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

module.exports = mongoose.model("post", postSchema);
