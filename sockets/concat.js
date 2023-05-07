const User = require("../models/userDB");
const Chat = require("../models/chat");

const sendConcat = (socket, io) => {
  socket.on("sendConcat", (data) => {
    Promise.all([
      User.updateOne(
        { _id: data.myId },
        {
          $push: {
            sendRequests: {
              id: data.userId,
              name: data.userName,
              email: data.userEmail,
              image: data.userImage,
            },
          },
        }
      ),
      User.updateOne(
        { _id: data.userId },
        {
          $push: {
            requests: {
              id: data.myId,
              name: data.myName,
              email: data.myEmail,
              image: data.myImage,
            },
          },
        }
      ),
    ])
      .then(() => {
        socket.emit("conncatSend");
        io.to(data.userId).emit("userNeedCon");
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
///cancle conect function
const cancleConcat = (socket, io) => {
  socket.on("cancleConcat", (data) => {
    Promise.all([
      User.updateOne(
        { _id: data.myId },
        {
          $pull: {
            sendRequests: {
              id: data.userId,
            },
          },
        }
      ),
      User.updateOne(
        { _id: data.userId },
        {
          $pull: {
            requests: {
              id: data.myId,
            },
          },
        }
      ),
    ])
      .then(() => {
        socket.emit("conncatCancel");
        io.to(data.userId).emit("userCancleCon");
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
///reject conect function

const rejectConcat = (socket, io) => {
  socket.on("rejectConcat", (data) => {
    Promise.all([
      User.updateOne(
        { _id: data.userId },
        {
          $pull: {
            sendRequests: {
              id: data.myId,
            },
          },
        }
      ),
      User.updateOne(
        { _id: data.myId },
        {
          $pull: {
            requests: {
              id: data.userId,
            },
          },
        }
      ),
    ])
      .then(() => {
        socket.emit("conncatRejected");
        io.to(data.userId).emit("userRejectCon");
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

///accept conect function
let acceptConcat = (socket, io) => {
  socket.on("acceptConcat", (data) => {
    let chat = new Chat({
      user: [data.myId, data.userId],
    });
    chat.save().then((chat) => {
      Promise.all([
        User.updateOne(
          { _id: data.myId },
          {
            $push: {
              freinds: {
                id: data.userId,
                name: data.userName,
                email: data.userEmail,
                image: data.userImage,
                chatId: chat._id,
              },
            },
            $pull: {
              requests: {
                id: data.userId,
              },
            },
          }
        ),
        User.updateOne(
          { _id: data.userId },
          {
            $push: {
              freinds: {
                id: data.myId,
                name: data.myName,
                email: data.myEmail,
                image: data.myImage,
                chatId: chat._id,
              },
            },
            $pull: {
              sendRequests: {
                id: data.myId,
              },
            },
          }
        ),
      ])
        .then(() => {
          socket.emit("conncatAccpted", chat._id);
          io.to(data.userId).emit("userAccptedCon", chat._id);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
};

//DisConcat function
let DisConcat = (socket, io) => {
  socket.on("DisConcat", (data) => {
    Promise.all([
      User.updateOne(
        { _id: data.myId },
        {
          $pull: {
            freinds: {
              id: data.userId,
            },
          },
        }
      ),
      User.updateOne(
        { _id: data.userId },
        {
          $pull: {
            freinds: {
              id: data.myId,
            },
          },
        }
      ),
      Chat.findByIdAndDelete(data.chatId),
    ])
      .then(() => {
        socket.emit("conncatDisMatch");
        io.to(data.userId).emit("userDisConcat");
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
module.exports = {
  sendConcat,
  cancleConcat,
  rejectConcat,
  acceptConcat,
  DisConcat,
};
