const mongoose = require("mongoose");
require("dotenv").config();

const connect = () => {
	return mongoose.connect(
		`mongodb+srv://abhaygedam:${process.env.DB_PASS}@cluster0.fiaow.mongodb.net/saveTravelMOney?retryWrites=true&w=majority`
	);
};

module.exports = connect;
