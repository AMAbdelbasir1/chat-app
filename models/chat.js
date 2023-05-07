const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  user: [{ type: String }],
});

const chat = mongoose.model("chat", chatSchema);
module.exports = chat;
