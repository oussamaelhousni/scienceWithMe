const factory = require("./factory");
const Post = require("./../models/postModel");

exports.getAllPost = factory.getAll(Post);
exports.createPost = factory.createOne(Post);
exports.deleteAllPosts = factory.deleteAll(Post);
