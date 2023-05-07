const User = require("../models/userDB");
const getHome = (req, res) => {
  User.findById(req.session.userId)
    .then((data) => {
      res.render("index", {
        myId: req.session.userId,
        friends: data.freinds,
        reqsNum: data.requests.length,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = { getHome };
