const Message = require("../models/massage");

let joinChat = (socket) => {
  socket.on("joinChat", (id) => {
    socket.join(id);
  });
};
let sendMsg = (socket, io) => {
  socket.on("sendMsg", (data) => {
    // console.log(data);
    let message = new Message({
      senderId: data.myId,
      name: data.myName,
      chatId: data.chatId,
      content: data.content,
      time: data.time,
    });
    message.save().catch(err=>{
      console.log(err);
    });
    io.to(data.chatId).emit("newMsg", data);
  });
};
module.exports = {
  joinChat,
  sendMsg,
};
