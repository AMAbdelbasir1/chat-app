const User = require("../models/userDB");
const fs = require("fs");
const path = require("path");
const getImage = (req, res) => {
  User.findById(req.session.userId)
    .then((data) => {
      res.render("Image_Upload", {
        image: data.image,
        error: false,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
const saveImage = (req, res) => {
  User.findByIdAndUpdate(req.session.userId, {
    image: "profilesImages/" + req.file.filename,
  })
    .then((data) => {
      if (data.image != "print-185575506.jpg") {
        Promise.all([
          User.updateMany(
            { "freinds.id": req.session.userId },
            {
              $set: {
                "freinds.$.image": "profilesImages/" + req.file.filename,
              },
            },
          ),
          User.updateMany(
            { "requests.id": req.session.userId },
            {
              $set: {
                "requests.$.image": "profilesImages/" + req.file.filename,
              },
            },
          ),
          fs.unlink(
            `${path.join(__dirname, "..", "images", data.image)}`,
            (err) => {
              if (err) {
                console.log(err);
                res.render("Image_Upload", {
                  image: data.image,
                  error: "some error occured",
                });
              } else {
                console.log("successfully deleted");
              }
            },
          ),
        ])
          .then(() => {
            res.redirect("/profile");
          })
          .catch((err) => {
            console.log(err);
            res.render("Image_Upload", {
              image: req.body.oldImg,
              error: "some error occured",
            });
          });
      } else {
        User.updateMany(
          { "freinds.id": req.session.userId },
          {
            $set: {
              "freinds.$.image": "profilesImages/" + req.file.filename,
            },
          },
        )
          .then((da) => {
            console.log(da);
            res.redirect("/profile");
          })
          .catch((err) => {
            console.log(err);
            res.render("Image_Upload", {
              image:  req.body.oldImg,
              error: "some error occured",
            });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.render("Image_Upload", {
        image:  req.body.oldImg,
        error: "some error occured",
      });
    });
};


module.exports = { getImage, saveImage };
