var express = require("express");
var router = express.Router();

const message_controller = require("../controllers/message");
const user_controller = require("../controllers/user");

router.get("/", message_controller.index);
router.post("/", message_controller.message_create_post);
router.get("/sign-up", user_controller.user_create_get);
router.post("/sign-up", user_controller.user_create_post);
router.get("/login", user_controller.user_login_get);
router.post("/login", user_controller.user_login_post);
router.get("/club", user_controller.user_club_get);
router.post("/club", user_controller.user_club_post);
module.exports = router;
