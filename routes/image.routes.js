const router = require("express").Router();
const multer = require("multer");
const { isAuth } = require("./guards/isAuth");
const { getImage, saveImage,saveImage2 } = require("../controllers/image.controllers");
////////////////////upolad to drive

/******************* */
router.get("/changeImage", isAuth, getImage);

router.post(
  "/saveImage",
  isAuth,
  multer({
    storage: multer.diskStorage({
      destination: (req, res, cb) => {
        cb(null, "images/profilesImages");
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
      },
    }),
  }).single("imgUp"),
  saveImage,
);

module.exports = router;
