const mongoose = require("mongoose");
// const { ObjectId } = mongoose.Schema;

const PostSchema = mongoose.Schema({
  uniquePostId: {
    type: Number,
    index: true,
    required: true,
    unique: true,
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
    type: Number,
    index: true,
  },
  postedBy: {
    type: Number,
    index: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  reactions: [
    {
      reactionTypeId: { type: Number },
      reactedBy: { type: Number },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  comments: [
    {
      comment: String,
      commentedAt: { type: String },
      commentedBy: { type: Number },
      uniqueCommentId: { type: String, index: true },
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
