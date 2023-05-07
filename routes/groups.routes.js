const {
  getGroupPage,
  postGroupPage,
} = require("../controllers/groups.controllers");
const {  isAuth } = require("./guards/isAuth");
const router = require("express").Router();
router.get("/createGroup", isAuth, getGroupPage);
router.post("/createGroup", isAuth, postGroupPage);


module.exports = router;
