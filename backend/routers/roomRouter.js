const express = require("express");
const roomController = require("../controllers/roomController");
const messageRouter = require("./messageRouter");
const router = express.Router({ mergeParams: true });

router.use("/:roomId/messages", messageRouter);

router
  .route("/")
  .get(roomController.getAllRooms)
  .post(roomController.createRoom);

module.exports = router;
