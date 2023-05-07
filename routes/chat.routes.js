const router = require("express").Router();
const { isAuth } = require("./guards/isAuth");
const { getChat, getGroupChat,KickMember } = require("../controllers/chat.controllers");
router.get("/:id", isAuth, getChat);
router.get("/group/:id", isAuth, getGroupChat);
router.post("/group/removeMember", isAuth,KickMember);
module.exports = router;
