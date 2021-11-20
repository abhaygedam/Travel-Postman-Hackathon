const express = require("express");
const GoogleStrategy = require("passport-google-oauth2");
const passport = require("./confix/passort");
const connect = require("./confix/db");
const cors = require("cors");

const app = new express();
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

const { register, login } = require("./controllers/user.controller");
const userActivityController = require("./controllers/userActivity.controller");
const postController = require("./controllers/post.controller");

passport.serializeUser(function (user, done) {
	done(null, { user });
});

passport.deserializeUser(function (id, done) {
	done(null, user);
});

app.get("/auth/google/failure", function (req, res) {
	return res.send("Something went wrong");
});

app.get(
	"/auth/google",
	passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
	"/auth/google/callback",
	passport.authenticate("google", {
		failureRedirect: "/auth/google/failure",
	}),
	function (req, res) {
		return res.send(req.user);
	}
);

app.post("/register", register);
app.post("/login", login);
app.use("/user", userActivityController);

app.use("/post", postController);

app.listen(2345, async () => {
	await connect();
	console.log("listening on port 2345");
});
