const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  image: {
    type: String,
    default: "print-185575506.jpg",
  },
  freinds: {
    type: [
      {
        id: String,
        name: String,
        email: String,
        image: String,
        chatId: String,
        newMsq: {
          type: Number,
          default: 0,
        },
      },
    ],
    default: [],
  },
  requests: {
    type: [{ id: String, name: String, email: String, image: String }],
    default: [],
  },
  sendRequests: {
    type: [{ id: String, name: String, email: String, image: String }],
    default: [],
  },
  groups: {
    type: [
      {
        id: String,
        name: String,
        adminId: String,
        adminName: String,
        image: {
          type: String,
          default: "print-185575506.jpg",
        },
        newMsq: {
          type: Number,
          default: 0,
        },
      },
    ],
    default: [],
  },
});
const user = mongoose.model("user", userSchema);
module.exports = user;
