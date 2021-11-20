const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		Name: { type: String, required: true },
		avtar: { type: String },
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

// dont use arrow fun bcoz this is globally that the reason
userSchema.pre("save", function (next) {
	if (!this.isModified("password")) return next();
	console.log("before", this.password);
	const hash = bcrypt.hashSync(this.password, 8);
	this.password = hash;
	console.log("after", this.password);
	return next();
});

userSchema.methods.checkPassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("userauth", userSchema);
