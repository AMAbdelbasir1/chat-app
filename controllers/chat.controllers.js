const Chat = require("../models/chat");
const Message = require("../models/massage");
const User = require("../models/userDB");
const getChat = (req, res) => {
  Chat.findById(req.params.id)
    .then((chat) => {
      if (chat.user.indexOf(req.session.userId) == -1) {
        res.send(`<h1 style="color:red">where you go ya bro</h1>`);
      } else {
        User.findById(
          chat.user.at(!chat.user.indexOf(req.session.userId)),
        ).then((use) => {
          Message.find({ chatId: req.params.id })
            .then((meg) => {
              res.render("chat", {
                friend: use,
                isFriend: true,
                isGroup: false,
                chatId: req.params.id,
                myId: req.session.userId,
                myName: req.session.myName,
                message: meg,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

///to get group chat

const getGroupChat = (req, res) => {
  Chat.findById(req.params.id)
    .then((chat) => {
      if (chat.user.indexOf(req.session.userId) == -1) {
        res.send(`<h1 style="color:red">where you go ya bro</h1>`);
      } else {
        User.find({ _id: chat.user }).then((use) => {
          Message.find({ chatId: req.params.id })
            .then((msg) => {
              res.render("chat", {
                friend: use.filter((d) => {
                  return d._id.toString() != req.session.userId;
                }),
                isFriend: false,
                isGroup: true,
                groupInfo: use[0].groups.filter((d) => {
                  return d.id == req.params.id;
                }),
                chatId: req.params.id,
                myId: req.session.userId,
                myName: req.session.myName,
                message: msg,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
const KickMember = (req, res) => {
  console.log(req.body.idFre);
  res.redirect(`/chat/group/${req.body.chatId}`);
};
//export functions
module.exports = { getChat, getGroupChat,KickMember };
