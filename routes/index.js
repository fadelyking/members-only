var express = require("express");
var router = express.Router();

const message_controller = require("../controllers/message");
const user_controller = require("../controllers/user");

router.get("/", function (req, res, next) {
	res.render("index");
});

router.get("/sign-up", user_controller.user_create_get);
router.post("/sign-up", user_controller.user_create_post);
router.get("/login", user_controller.user_login_get);
router.post("/login", user_controller.user_login_post);
module.exports = router;
