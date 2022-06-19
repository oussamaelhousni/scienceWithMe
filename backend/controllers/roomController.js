const factory = require("./factory");
const Room = require("./../models/roomModel");

exports.getRoom = factory.getOne(Room);
exports.getAllRooms = factory.getAll(Room);
exports.createRoom = factory.createOne(Room);
exports.deleteAllRooms = factory.deleteAll(Room);
exports.deleteRoom = factory.deleteOne(Room);
