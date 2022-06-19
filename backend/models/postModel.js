const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  room: {
    type: mongoose.Schema.ObjectId,
    ref: "Room",
    required: [true, "tour must created by a user"],
  },
  category: {
    type: String,
    default: "mathematics",
    enum: ["mathematics", "physics", "Computer science", "Biology"],
  },
  description: {
    type: String,
    required: [true, "post must have a description"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "tour must created by a user"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

postSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "first_name second_name photo",
  });
  next();
});

const postModel = mongoose.model("Post", postSchema);

module.exports = postModel;
