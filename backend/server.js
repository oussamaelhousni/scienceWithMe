const mongoose = require("mongoose");
const socket = require("socket.io");
const app = require("./app");
const namespaces = require("./data/namespaces");
const port = 3300;

// Connecting to the local database
const DB = process.env.DATABASE_LOCAL;

mongoose
  .connect(DB)
  .then(() => {
    console.log("Connected to the local database successfully");
  })
  .catch(() => {
    console.log("error in connecting to local database");
    process.exit(1);
  });

// Start the server

app.get("/", (req, res, next) => {
  res.send("hi");
});
const server = app.listen(port, () => {
  console.log("start listening on port " + port);
});

const io = socket(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const Message = require("./models/messageModel");

io.on("connect", (socket) => {
  socket.on("joinRoom", async (room) => {
    console.log("joined room", room);
    const leavedRoom = [...socket.rooms][1];
    socket.leave(leavedRoom);
    console.log("leaved room", leavedRoom);
    socket.join(room.name);
    const messages = await Message.find({ room: room._id });
    console.log("message", messages);
    socket.emit("history", messages);
  });
  socket.on("messageToServer", async (message) => {
    console.log("received", message);
    let newMessage = await Message.create(message);
    newMessage = await Message.findOne({
      user: newMessage.user,
      chatroom: newMessage.room,
    });
    console.log("newMessage", newMessage);
    const room = [...socket.rooms][1];
    console.log("hadi", room);
    io.of("/").to(room).emit("messageFromServer", newMessage);
  });
});
