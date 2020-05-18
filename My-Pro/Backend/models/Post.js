const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { ObjectId } = mongoose.Schema;

const PostSchema = mongoose.Schema({
  uniqueId: {
    type: Number,
    required: true,
  },
  content: {
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
      reactionTypeId: { type: Number },
      reactedBy: { type: ObjectId, ref: "User" },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  comments: [
    {
      comment: String,
      createdAt: { type: Date, default: Date.now },
      postedBy: { type: ObjectId, ref: "User" },
    },
  ],
  privacyId: {
    type: Number,
    required: true,
  },
  postTypeId: {
    type: Number,
    required: true,
  },
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

module.exports.getUserPosts = function (postedBy, callback) {
  const query = { postedBy };
  Post.findOne(query, callback);
};

module.exports.getUserTimelinePosts = function (postedTo, callback) {
  const query = { postedTo };
  Post.findOne(query, callback);
};
