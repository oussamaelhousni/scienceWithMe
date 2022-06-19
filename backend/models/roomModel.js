const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "room must have a name"],
    unique: true,
  },
});

const roomModel = mongoose.model("Room", roomSchema);

module.exports = roomModel;
