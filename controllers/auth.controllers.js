const User = require("../models/userDB");
const bcrypt = require("bcrypt");
const Chat = require("../models/chat");
const Message = require("../models/massage");
//login auth
const getLogin = (req, res) => {
  res.render("Login", {
    error: false,
    email: "",
    password: "",
  });
};
const postLogin = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        res.render("Login", {
          error: "E-mail Not founded",
          email: req.body.email,
          password: req.body.password,
        });
      } else {
        bcrypt.compare(req.body.password, user.password).then((pass) => {
          if (pass) {
            req.session.myName = user.username;
            req.session.myEmail = user.email;
            req.session.myImage = user.image;
            req.session.userId = user._id.toString();
            res.redirect("/");
          } else {
            res.render("Login", {
              error: "Password not correct",
              email: req.body.email,
              password: req.body.password,
            });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.render("Login", {
        error: "some error occurred",
        email: req.body.email,
        password: req.body.password,
      });
    });
};
//signup auth   <input type="password" name="confirmpassword" id="inpemlog" placeholder="Confirm Password" required>

const getSignup = (req, res) => {
  res.render("signup",{
    error:false,
    username: "",
    email:"",
    password: "",
  });
};
const newUser = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        res.render("signup",{
          error:"found E-mail",
          username: req.body.userName,
          email: req.body.email,
          password: req.body.password,
        });
      } else {
        bcrypt
          .hash(req.body.password, 10)
          .then((result) => {
            let user = new User({
              username: req.body.userName,
              email: req.body.email,
              password: result,
            });
            user
              .save()
              .then((data) => {
                res.redirect("/login");
              })
              .catch((err) => {
                console.log(err);
                res.render("signup",{
                  error:"some error occured",
                  username: req.body.userName,
                  email: req.body.email,
                  password: req.body.password,
                });
              });
          })
          .catch((err) => {
            console.log(err);
            res.render("signup",{
              error:"some error occured",
              username: req.body.userName,
              email: req.body.email,
              password: req.body.password,
            });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.render("signup",{
        error:"some error occured",
        username: req.body.userName,
        email: req.body.email,
        password: req.body.password,
      });
    });
};
const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};

///delete account

const deleteAccount = (req, res) => {
  User.findById(req.session.userId)
    .then((myData) => {
      let friends = [];
      let chats = [];
      let groups = [];
      let groupA = [];
      myData.freinds.forEach((fre) => {
        friends.push(fre.id);
        chats.push(fre.chatId);
      });
      myData.groups.forEach((gr) => {
        if (gr.id == req.session.userId) {
          groupA.push(gr.id);
        } else {
          groups.push(gr.id);
        }
      });
      Promise.all([
        User.deleteOne({ _id: req.session.userId }),
        User.updateMany(
          { _id: friends },
          {
            $pull: {
              freinds: {
                id: req.session.userId,
              },
            },
          },
        ),
        Chat.deleteMany({ _id: chats }),
        Chat.updateMany(
          { _id: groups },
          {
            $pull: {
              user: req.session.userId,
            },
          },
        ),
        Message.deleteMany({ chatId: chats }),
      ])
        .then((d) => {
          console.log(d[2]);
          req.session.destroy(() => {
            res.redirect("/login");
          });
        })
        .catch((err) => {
          console.log("DeleteAccount error " + err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = {
  newUser,
  getSignup,
  getLogin,
  postLogin,
  logout,
  deleteAccount,
};
