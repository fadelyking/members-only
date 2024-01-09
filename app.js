require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const User = require("./models/user.js");
const session = require("express-session");
const passport = require("passport");
require("./config/passport")(passport);
const indexRouter = require("./routes/index");
const mongoose = require("mongoose");
mongoose.set("strictQuery", "false");
const dev_db_url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uwhbfgl.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const mongoDB = process.env.MONGODB_URI || dev_db_url;
main().catch((err) => console.log(err));
async function main() {
	await mongoose.connect(mongoDB);
}

const app = express();
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
