const express = require("express");
const messageController = require("./../controllers/messageController");
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(messageController.getAllMessages)
  .post(messageController.createMessage);
module.exports = router;
