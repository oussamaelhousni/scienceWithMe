const mongoose = require("mongoose");

const namespaceSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "namespace must have a name"],
  },
  //  child referencing
  room: [
    {
      type: mongoose.Schema.objectId,
      ref: "Room",
    },
  ],
});
