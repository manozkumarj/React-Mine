const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");
const auth = require("../middlewares/auth");
const helpers = require("../helpers/helpers");
const uploadController = require("../middlewares/upload");
const multer = require("multer");
const path = require("path");

const User = require("../models/User");
const Post = require("../models/Post");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    req.body.videos = [];
    cb(null, "./videos/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    let newFilename = uniqueSuffix + "-" + file.originalname;
    req.body.videos.push(newFilename);
    cb(null, newFilename);
  },
});

var upload = multer({ storage: storage });

router.get("/test", (req, res) => {
  res.status(200).json({ msg: "This is Posts home route" });
});

// Normal post end-point
router.post(
  "/create-post/1",
  auth,
  [
    check("postContent", "Please include post postContent").not().isEmpty(),
    check("postedTo", "Please include postedTo ID").not().isEmpty(),
    check("privacyId", "Please include privacyId").not().isEmpty(),
    check("postTypeId", "Please include postTypeId").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errorType: "inputError",
        msg: errors.array(),
      });
    }
    let userId = req.user._id;
    const { postContent, postedTo, postTypeId, privacyId } = req.body;
    try {
      let user = await User.findById(postedTo);
      if (!user) {
        return res.status(400).json({
          success: false,
          errorType: "generalError",
          errorTag: "userNotFound",
          msg: "User not found",
        });
      }

      let getMilliseconds = helpers.getMilliseconds();

      let post = new Post({
        _id: mongoose.Types.ObjectId(),
        postProperties: {
          postContent,
        },
        postedTo,
        postedBy: userId,
        privacyId,
        postTypeId,
        milliseconds: getMilliseconds,
      });

      await post.save();
      // console.log("Post object is below");
      // console.log(post);

      res.json({ success: true, postDetails: post });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        success: false,
        errorType: "serverError",
        msg: err.message,
      });
    }
  }
);

// Colour post end-point
router.post(
  "/create-post/2",
  auth,
  [
    check("postContent", "Please include post postContent").not().isEmpty(),
    check("backgroundColor", "Please include post backgroundColor")
      .not()
      .isEmpty(),
    check("textColor", "Please include post textColor").not().isEmpty(),
    check("borderColor", "Please include post borderColor").not().isEmpty(),
    check("postedTo", "Please include postedTo ID").not().isEmpty(),
    check("privacyId", "Please include privacyId").not().isEmpty(),
    check("postTypeId", "Please include postTypeId").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errorType: "inputError",
        msg: errors.array(),
      });
    }
    let userId = req.user._id;
    const {
      postContent,
      backgroundColor,
      textColor,
      borderColor,
      postedTo,
      postTypeId,
      privacyId,
    } = req.body;
    try {
      let user = await User.findById(postedTo);
      if (!user) {
        return res.status(400).json({
          success: false,
          errorType: "generalError",
          errorTag: "userNotFound",
          msg: "User not found",
        });
      }

      let getMilliseconds = helpers.getMilliseconds();

      let post = new Post({
        _id: mongoose.Types.ObjectId(),
        postProperties: {
          postContent,
          backgroundColor,
          textColor,
          borderColor,
        },
        postedTo,
        postedBy: userId,
        privacyId,
        postTypeId,
        milliseconds: getMilliseconds,
      });

      await post.save();
      // console.log("Post object is below");
      // console.log(post);

      res.json({ success: true, postDetails: post });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        success: false,
        errorType: "serverError",
        msg: err.message,
      });
    }
  }
);

// Letter post end-point
router.post(
  "/create-post/3",
  auth,
  [
    check("postContent", "Please include post postContent").not().isEmpty(),
    check("letterContent", "Please include post letterContent").not().isEmpty(),
    check("postedTo", "Please include postedTo ID").not().isEmpty(),
    check("privacyId", "Please include privacyId").not().isEmpty(),
    check("postTypeId", "Please include postTypeId").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errorType: "inputError",
        msg: errors.array(),
      });
    }
    let userId = req.user._id;
    const {
      postContent,
      letterContent,
      postedTo,
      postTypeId,
      privacyId,
    } = req.body;
    try {
      let user = await User.findById(postedTo);
      if (!user) {
        return res.status(400).json({
          success: false,
          errorType: "generalError",
          errorTag: "userNotFound",
          msg: "User not found",
        });
      }

      let getMilliseconds = helpers.getMilliseconds();

      let post = new Post({
        _id: mongoose.Types.ObjectId(),
        postProperties: {
          postContent,
          letterContent,
        },
        postedTo,
        postedBy: userId,
        privacyId,
        postTypeId,
        milliseconds: getMilliseconds,
      });

      await post.save();
      // console.log("Post object is below");
      // console.log(post);

      res.json({ success: true, postDetails: post });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        success: false,
        errorType: "serverError",
        msg: err.message,
      });
    }
  }
);

// Photos post end-point
router.post(
  "/create-post/4",
  auth,
  uploadController.uploadImages,
  uploadController.resizeImages,
  uploadController.getResult,
  [
    check("postedTo", "Please include postedTo ID").not().isEmpty(),
    check("privacyId", "Please include privacyId").not().isEmpty(),
    check("postTypeId", "Please include postTypeId").not().isEmpty(),
  ],
  async (req, res) => {
    console.log("***********************************************************");
    console.log(req.body);
    console.log(req.files);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errorType: "inputError",
        msg: errors.array(),
      });
    }

    let userId = req.user._id;
    const { postContent, images, postedTo, postTypeId, privacyId } = req.body;
    try {
      let user = await User.findById(postedTo);
      if (!user) {
        return res.status(400).json({
          success: false,
          errorType: "generalError",
          errorTag: "userNotFound",
          msg: "User not found",
        });
      }

      let getMilliseconds = helpers.getMilliseconds();

      let post = new Post({
        _id: mongoose.Types.ObjectId(),
        postProperties: {
          postContent,
          photos: images,
        },
        postedTo,
        postedBy: userId,
        privacyId,
        postTypeId,
        milliseconds: getMilliseconds,
      });

      await post.save();
      // console.log("Post object is below");
      // console.log(post);

      res.json({ success: true, postDetails: post });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        success: false,
        errorType: "serverError",
        msg: err.message,
      });
    }
  }
);

// Flipcard post end-point
router.post(
  "/create-post/5",
  auth,
  uploadController.uploadImages,
  uploadController.resizeImages,
  uploadController.getResult,
  [
    check("postedTo", "Please include postedTo ID").not().isEmpty(),
    check("privacyId", "Please include privacyId").not().isEmpty(),
    check("postTypeId", "Please include postTypeId").not().isEmpty(),
    check("flipDirection", "Please include flipDirection").not().isEmpty(),
  ],
  async (req, res) => {
    console.log("***********************************************************");
    console.log(req.body);
    console.log(req.files);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errorType: "inputError",
        msg: errors.array(),
      });
    }

    let userId = req.user._id;
    const {
      postContent,
      images,
      postedTo,
      postTypeId,
      privacyId,
      flipDirection,
    } = req.body;
    try {
      let user = await User.findById(postedTo);
      if (!user) {
        return res.status(400).json({
          success: false,
          errorType: "generalError",
          errorTag: "userNotFound",
          msg: "User not found",
        });
      }

      let getMilliseconds = helpers.getMilliseconds();

      let post = new Post({
        _id: mongoose.Types.ObjectId(),
        postProperties: {
          postContent,
          photos: images,
          flipDirection,
        },
        postedTo,
        postedBy: userId,
        privacyId,
        postTypeId,
        milliseconds: getMilliseconds,
      });

      await post.save();
      // console.log("Post object is below");
      // console.log(post);

      res.json({ success: true, postDetails: post });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        success: false,
        errorType: "serverError",
        msg: err.message,
      });
    }
  }
);

// Video post end-point
router.post(
  "/create-post/6",
  auth,
  upload.single("videoFile"),
  [
    check("postedTo", "Please include postedTo ID").not().isEmpty(),
    check("privacyId", "Please include privacyId").not().isEmpty(),
    check("postTypeId", "Please include postTypeId").not().isEmpty(),
  ],
  async (req, res) => {
    console.log("***********************************************************");
    console.log(req.body);
    console.log(req.file);
    console.log(req.files);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errorType: "inputError",
        msg: errors.array(),
      });
    }

    let userId = req.user._id;
    const { postContent, postedTo, postTypeId, privacyId, videos } = req.body;
    try {
      let user = await User.findById(postedTo);
      if (!user) {
        return res.status(400).json({
          success: false,
          errorType: "generalError",
          errorTag: "userNotFound",
          msg: "User not found",
        });
      }

      let getMilliseconds = helpers.getMilliseconds();

      let post = new Post({
        _id: mongoose.Types.ObjectId(),
        postProperties: {
          postContent,
          videos,
        },
        postedTo,
        postedBy: userId,
        privacyId,
        postTypeId,
        milliseconds: getMilliseconds,
      });

      await post.save();
      // console.log("Post object is below");
      // console.log(post);

      res.json({ success: true, postDetails: post });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        success: false,
        errorType: "serverError",
        msg: err.message,
      });
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({ postStatus: "active" })
      .sort({ milliseconds: -1 })
      .populate(
        "postedTo",
        "fullName primaryDp secondaryDp username profileCoverPhoto"
      )
      .populate(
        "postedBy",
        "fullName primaryDp secondaryDp username profileCoverPhoto"
      )
      .populate(
        "comments.commentedBy",
        "fullName primaryDp secondaryDp username profileCoverPhoto"
      )
      .populate(
        "reactions.reactedBy",
        "fullName primaryDp secondaryDp username profileCoverPhoto"
      )
      .exec()
      .then((posts) => {
        // console.log("Populated results");
        // console.log(posts);
        res.json({ success: true, posts });
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      errorType: "serverError",
      msg: err.message,
    });
  }
});

// Add User's Reaction
router.put(
  "/addReaction",
  auth,
  [
    check("reactionTypeId", "Please include reactionTypeId").not().isEmpty(),
    check("postId", "Please include postId").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errorType: "inputError",
        msg: errors.array(),
      });
    }

    try {
      const { reactionTypeId, postId } = req.body;
      const post = await Post.findOne({ _id: postId, postStatus: "active" });

      if (!post) {
        return res.status(400).json({
          success: false,
          errorType: "generalError",
          errorTag: "postNotFound",
          msg: "Post not found",
        });
      }

      let userId = req.user._id;
      console.log("postId -> " + postId);
      console.log("userId -> " + userId);
      console.log("reactionTypeId -> " + reactionTypeId);

      await Post.findByIdAndUpdate(postId, {
        $pull: {
          reactions: {
            reactedBy: userId,
          },
        },
      });

      let updatedPost = await Post.findByIdAndUpdate(
        postId,
        {
          $push: {
            reactions: {
              reactionTypeId,
              reactedBy: userId,
            },
          },
        },
        { new: true }
      );

      res.json({ success: true, post: updatedPost });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        success: false,
        errorType: "serverError",
        msg: err.message,
      });
    }
  }
);

// Delete User's Reaction
router.put(
  "/deleteReaction",
  auth,
  [
    check("reactionTypeId", "Please include reactionTypeId").not().isEmpty(),
    check("postId", "Please include postId").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errorType: "inputError",
        msg: errors.array(),
      });
    }

    try {
      const { reactionTypeId, postId } = req.body;
      const post = await Post.findOne({ _id: postId, postStatus: "active" });

      if (!post) {
        return res.status(400).json({
          success: false,
          errorType: "generalError",
          errorTag: "postNotFound",
          msg: "Post not found",
        });
      }

      let userId = req.user._id;
      console.log("postId -> " + postId);
      console.log("userId -> " + userId);
      console.log("reactionTypeId -> " + reactionTypeId);

      let updatedPost = await Post.findByIdAndUpdate(postId, {
        $pull: {
          reactions: {
            reactedBy: userId,
          },
        },
      });

      res.json({ success: true, post: updatedPost });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        success: false,
        errorType: "serverError",
        msg: err.message,
      });
    }
  }
);

// Add comment
router.put(
  "/addComment",
  auth,
  [check("postId", "Please include postId").not().isEmpty()],
  [check("comment", "Please include comment").not().isEmpty()],
  [check("uniqueCommentId", "Please include uniqueCommentId").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errorType: "inputError",
        msg: errors.array(),
      });
    }

    try {
      const { postId, comment, uniqueCommentId } = req.body;
      const post = await Post.findOne({ _id: postId, postStatus: "active" });

      if (!post) {
        return res.status(400).json({
          success: false,
          errorType: "generalError",
          errorTag: "postNotFound",
          msg: "Post not found",
        });
      }

      let userId = req.user._id;
      console.log("postId -> " + postId);
      console.log("userId -> " + userId);

      let getMilliseconds = helpers.getMilliseconds();

      let updatedPost = await Post.findByIdAndUpdate(
        postId,
        {
          $push: {
            comments: {
              comment: comment,
              commentedBy: userId,
              commentedAt: getMilliseconds,
              uniqueCommentId,
            },
          },
        },
        { new: true }
      );

      res.json({ success: true, post: updatedPost });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        success: false,
        errorType: "serverError",
        msg: err.message,
      });
    }
  }
);

// Delete comment
router.put(
  "/deleteComment",
  auth,
  [check("postId", "Please include postId").not().isEmpty()],
  [check("uniqueCommentId", "Please include uniqueCommentId").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errorType: "inputError",
        msg: errors.array(),
      });
    }

    try {
      const { postId, uniqueCommentId } = req.body;
      const post = await Post.findOne({ _id: postId, postStatus: "active" });

      if (!post) {
        return res.status(400).json({
          success: false,
          errorType: "generalError",
          errorTag: "postNotFound",
          msg: "Post not found",
        });
      }

      let userId = req.user._id;
      console.log("postId -> " + postId);
      console.log("userId -> " + userId);

      let updatedPost = await Post.findByIdAndUpdate(
        postId,
        {
          $pull: {
            comments: {
              uniqueCommentId: uniqueCommentId,
              commentedBy: userId,
            },
          },
        },
        { new: true }
      );

      res.json({ success: true, post: updatedPost });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        success: false,
        errorType: "serverError",
        msg: err.message,
      });
    }
  }
);

// Delete Post
router.put(
  "/delete",
  auth,
  [check("postId", "Please include postId").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errorType: "inputError",
        msg: errors.array(),
      });
    }

    const { postId } = req.body;

    try {
      const getPost = await Post.findOne({ _id: postId, postStatus: "active" });
      if (!getPost) {
        return res.status(400).json({
          success: false,
          errorType: "generalError",
          errorTag: "postNotFound",
          msg: "Post not found",
        });
      }

      const post = await Post.findByIdAndUpdate(postId, {
        postStatus: "deleted",
      });

      res.json({ success: true, post });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        success: false,
        errorType: "serverError",
        msg: err.message,
      });
    }
  }
);

module.exports = router;
