const router = require("express").Router();
const { isAuth } = require("./guards/isAuth");
const {
  getProfile,
  getmyProfile,
} = require("../controllers/profile.controllers");
router.get("/", isAuth, getmyProfile);
router.post("/", isAuth, getmyProfile);
router.get("/:id", isAuth, getProfile);

module.exports = router;
