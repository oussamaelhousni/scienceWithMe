const express = require("express");
const postController = require("./../controllers/postController");

const router = express.Router({ mergeParams: true });
router
  .route("/")
  .get(postController.getAllPost)
  .post(postController.createPost)
  .delete(postController.deleteAllPosts);

module.exports = router;
