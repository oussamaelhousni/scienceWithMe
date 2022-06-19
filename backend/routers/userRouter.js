const express = require("express");
const userController = require("../controllers/userController");
const authController = require("./../controllers/authController");
const postRouter = require("./../routers/postRouter");
const router = express.Router();
router.use("/:userId/posts", postRouter);

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/:id/addroom", userController.addRoom);
// mounting routes
router.route("/").get(userController.getAllUsers);
router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser);
module.exports = router;
