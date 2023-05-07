const User = require("../models/userDB");
let getGroups = (socket) => {
  socket.on("getGroups", (id) => {
    User.findById(id)
      .then((data) => {
        socket.emit("groupsGet", data.groups);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
module.exports = { getGroups };
