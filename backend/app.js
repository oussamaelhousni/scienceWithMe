const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const userRouter = require("./routers/userRouter");
const postRouter = require("./routers/postRouter");
const roomRouter = require("./routers/roomRouter");
const messageRouter = require("./routers/messageRouter");
// MENTION THE ENVIRONMENT PATH
dotenv.config({
  path: "./config.env",
});

// REQUIRING THE APP(httpServer) after mentioning the env path
const app = express();
app.use(express.json());
app.use(cors(corsOptions));
// MIDDLEWARE
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// Mounting routes
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/messages", messageRouter);

// Global error handler middleware
app.use((err, req, res, next) => {
  // if the error is not trusted then it a internal server error
  err.statusCode = err.statusCode ? err.statusCode : 500;
  err.status = err.status ? err.status : "error";

  // sending the message to the user
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err.stack,
  });
});

module.exports = app;
