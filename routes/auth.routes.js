const {
  newUser,
  getSignup,
  getLogin,
  postLogin,
  logout,
  deleteAccount,
} = require("../controllers/auth.controllers");
const { notAuth, isAuth } = require("./guards/isAuth");
const router = require("express").Router();
router.get("/signup", notAuth, getSignup);
router.post("/signup", notAuth, newUser);
router.get("/login", notAuth, getLogin);
router.post("/login", notAuth, postLogin);
router.post("/logout", isAuth, logout);
router.post("/deleteAccount", isAuth, deleteAccount);


module.exports = router;
