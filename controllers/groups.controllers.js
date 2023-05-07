const User = require("../models/userDB");
const Chat = require("../models/chat");
const getGroupPage = (req, res) => {
  User.findById(req.session.userId).then((data) => {
    res.render("CreateGroup", {
      freinds: data.freinds,
    });
  });
};
const postGroupPage = (req, res) => {
  //console.log(req.body.groupMember);
  let member = req.body.groupMember;
  //console.log(member);
  if (typeof member == "string") {
    member = new Array(member);
  }else if(!member){
  res.redirect("/CreateGroup");
  }

  member.push(req.session.userId);
let chat = new Chat({
  user:member,
});
chat.save().then(sa=>{
User.updateMany(
  { _id: member },
  {
    $push: {
      groups: {
        id: sa._id,
        name: req.body.groupName,
        adminId: req.session.userId,
        adminName: req.session.myName,
      },
    },
  }
)
  .then((data) => {
    res.redirect("/");
  })
  .catch((err) => {
    console.log(err);
  });
}).catch(err=>{
  console.log(err);
})

};
module.exports = { getGroupPage, postGroupPage };
