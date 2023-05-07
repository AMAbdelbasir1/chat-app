const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const messageSchema = new Schema({
  senderId: String,
  name: String,
  chatId: String,
  content: String,
  time:String,
});
const message = mongoose.model("message", messageSchema);
module.exports = message;
