//join client by id
const joinApp = (socket) => {
  socket.on("joinApp", (myId) => {
    socket.join(myId);
    //console.log("join by " + myId);
  });
};

module.exports = { joinApp };
