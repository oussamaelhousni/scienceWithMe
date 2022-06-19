const factory = require("./factory");
const catchAsync = require("./../utils/catchAsync");
const Message = require("./../models/messageModel");

exports.getAllMessages = factory.getAll(Message);

exports.createMessage = factory.createOne(Message);
