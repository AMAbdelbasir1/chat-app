const User = require("../models/userDB");
const getProfile = (req, res) => {
  let chatId;
  let isReq;
  let isSendReq;
  let isFreind;
  User.findById(req.params.id)
    .then((data) => {
      data.freinds.forEach((use) => {
        //return use.id == data._id.toString();
        if (use.id == req.session.userId) {
          chatId = use.chatId;
          isFreind = true;
        }
      });
      data.sendRequests.forEach((use) => {
        if (use.id == req.session.userId) {
          //console.log("requests found");
          isReq = true;
        }
        //return use.id == data._id.toString();
        if (use.id == req.session.userId) {
          chatId = use.chatId;
        }
      });
      //  console.log(data.sendRequests);
      // console.log(isSendReq);

      data.requests.forEach((use) => {
        if (use.id == req.session.userId) {
          // console.log("requests found");
          isSendReq = true;
        }
        //return use.id == data._id.toString();
      });
      //console.log(chatId);
      res.render("profile", {
        userId: data._id,
        image: data.image,
        myId: req.session.userId,
        myName: req.session.myName,
        myEmail: req.session.myEmail,
        myImage: req.session.myImage,
        chatId: chatId,
        username: data.username,
        email: data.email,
        isOwner: data._id.toString() == req.session.userId,
        isFreind: isFreind || false,
        isSendReq: isSendReq || false,
        isReq: isReq || false,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
const getmyProfile = (req, res) => {
  res.redirect("/profile/" + req.session.userId);
};
module.exports = { getProfile, getmyProfile };
