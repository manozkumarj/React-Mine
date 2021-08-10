const mongoose = require("mongoose");
// const { ObjectId } = mongoose.Schema;

const PostSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  postProperties: [
    {
      postContent: { type: String },
      letterContent: { type: String },
      backgroundColor: { type: String },
      textColor: { type: String },
      borderColor: { type: String },
      flipDirection: { type: Number },
      photos: { type: Array },
      videos: { type: Array },
    },
  ],
  postedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  reactions: [
    {
      reactionTypeId: { type: Number, required: true },
      reactedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  comments: [
    {
      comment: { type: String, required: true },
      commentedAt: { type: String },
      commentedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      uniqueCommentId: {
        type: String,
        required: true,
      },
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
    required: true,
  },
});

const Post = (module.exports = mongoose.model("Post", PostSchema));

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
