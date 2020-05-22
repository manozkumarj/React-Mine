const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const PostSchema = mongoose.Schema({
  uniqueId: {
    type: Number,
    index: true,
    required: true,
  },
  postProperties: [
    {
      postContent: { type: String },
      backgroundColor: { type: String },
      textColor: { type: String },
      borderTopColor: { type: String },
      borderRightColor: { type: String },
      borderBottomColor: { type: String },
      borderLeftColor: { type: String },
      borderStyle: { type: String },
      borderStyleSides: { type: String },
      cornerStyle: { type: String },
      cornerStyleSides: { type: String },
      photos: { type: Array },
    },
  ],
  postedTo: {
    type: String,
    index: true,
  },
  postedBy: {
    type: String,
    index: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  reactions: [
    {
      reactionTypeId: { type: Number },
      reactedBy: { type: String },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  comments: [
    {
      comment: String,
      createdAt: { type: Date, default: Date.now },
      postedBy: { type: String },
    },
  ],
  privacyId: {
    type: Number,
    required: true,
  },
  postTypeId: {
    type: Number,
    index: true,
    required: true,
  },
  postStatus: {
    type: String,
    index: true,
    default: "active",
  },
  milliseconds: {
    type: String,
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
