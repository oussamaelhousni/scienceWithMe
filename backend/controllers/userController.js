const User = require("../models/userModel");
const Room = require("../models/roomModel");
const catchAsync = require("../utils/catchAsync");
const factory = require("./factory");
const AppError = require("../utils/AppError");

// get all the users on the database
exports.getAllUsers = factory.getAll(User);

// get user by id
exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    next(
      new AppError(`we can't find a user with this id : ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

// add a chatroom to user
exports.addRoom = catchAsync(async (req, res, next) => {
  const room = await Room.findById(req.body.room);
  if (!room) {
    return next(new AppError("There is no room with that ID", 404));
  }
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { $push: { rooms: room } },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(201).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      $push: { rooms: req.body.rooms },
    },
    { new: true }
  );
  if (!user) {
    next(
      new AppError(`we can't find a user with this id : ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
