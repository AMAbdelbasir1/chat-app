const router = require("express").Router();
const { isAuth } = require("./guards/isAuth");
const { getHome } = require("../controllers/home.controllers");
router.get("/", isAuth, getHome);
module.exports = router;
