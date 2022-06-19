const mongoose = require("mongoose");
const messageSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "a message must belong to a user"],
  },
  room: {
    type: mongoose.Schema.ObjectId,
    ref: "Room",
    required: [true, "a message must belongs to a room"],
  },
  content: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

messageSchema.pre(/^find/, function (next) {
  this.populate("user").populate("room");
  next();
});

const messageModel = mongoose.model("Message", messageSchema);
module.exports = messageModel;
