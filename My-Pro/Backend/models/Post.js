const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { ObjectId } = mongoose.Schema;

const PostSchema = mongoose.Schema({
  body: {
    type: String,
    required: true,
  },
  postedTo: {
    type: ObjectId,
    ref: "User",
  },
  postedBy: {
    type: ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  reactions: [
    {
      reactionId: { type: Number },
      reactedBy: { type: ObjectId, ref: "User" },
      created: { type: Date, default: Date.now },
    },
  ],
  comments: [
    {
      comment: String,
      created: { type: Date, default: Date.now },
      postedBy: { type: ObjectId, ref: "User" },
    },
  ],
  postStatus: {
    type: String,
    default: "active",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Post = (module.exports = mongoose.model("post", PostSchema));

module.exports.getPostById = function (id, callback) {
  Post.findById(id, callback);
};

module.exports.getUserPosts = function (userId, callback) {
  const query = { userId: userId };
  Post.findOne(query, callback);
};
