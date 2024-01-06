var express = require("express");
var router = express.Router();

const message_controller = require("../controllers/message");
const user_controller = require("../controllers/user");

router.get("/", function (req, res, next) {
	res.render("index");
});

router.get("/sign-up", user_controller.user_create_get);
router.post("/sign-up", user_controller.user_create_post);

module.exports = router;
