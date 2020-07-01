const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");
const auth = require("../middlewares/auth");
const helpers = require("../helpers/helpers");
const uploadController = require("../middlewares/upload");

const User = require("../models/User");
const Post = require("../models/Post");

router.get("/test", auth, (req, res) => {
  res.status(200).json({ msg: "This is Posts home route" });
});

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
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
        res.json(posts);
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

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
      return res.status(400).json({ errors: errors.array() });
    }
    let userId = req.user._id;
    const { postContent, postedTo, postTypeId, privacyId } = req.body;
    try {
      let user = await User.findById(postedTo);
      if (!user) {
        res.status(400).json({ msg: "postedTo User Doesn't exist" });
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

      res.json({ post });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.post(
  "/create-post/2",
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("req.body are below");
      console.log(req.body);

      console.log("validationResult errors are below");
      console.log(errors);
      return res.status(400).json({ errors: errors.array() });
    }
    let userId = req.user._id;
    const { postContent, postedTo, postTypeId, privacyId } = req.body;
    try {
      let user = await User.findById(postedTo);
      if (!user) {
        res.status(400).json({ msg: "postedTo User Doesn't exist" });
      }

      console.log("req.body are below");
      console.log(req.body);

      let getMilliseconds = helpers.getMilliseconds();

      let post = new Post({
        _id: mongoose.Types.ObjectId(),
        postProperties: {
          postContent,
          photos: req.body.images,
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

      res.json({ post });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.post(
  "/create-post/3",
  auth,
  [
    check("postContent", "Please include post postContent").not().isEmpty(),
    check("postedTo", "Please include postedTo ID").not().isEmpty(),
    check("privacyId", "Please include privacyId").not().isEmpty(),
    check("postTypeId", "Please include postTypeId").not().isEmpty(),
    check("backgroundColor", "Please include backgroundColor").not().isEmpty(),
    check("textColor", "Please include textColor").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let userId = req.user._id;
    const {
      postContent,
      postedTo,
      postTypeId,
      privacyId,
      backgroundColor,
      textColor,
    } = req.body;
    try {
      let user = await User.findById(postedTo);
      if (!user) {
        res.status(400).json({ msg: "postedTo User Doesn't exist" });
      }

      let getMilliseconds = helpers.getMilliseconds();

      let post = new Post({
        _id: mongoose.Types.ObjectId(),
        postProperties: {
          postContent,
          backgroundColor,
          textColor,
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

      res.json({ post });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.post(
  "/create-post/4",
  auth,
  [
    check("postContent", "Please include post postContent").not().isEmpty(),
    check("postedTo", "Please include postedTo ID").not().isEmpty(),
    check("privacyId", "Please include privacyId").not().isEmpty(),
    check("postTypeId", "Please include postTypeId").not().isEmpty(),
    check("backgroundColor", "Please include backgroundColor").not().isEmpty(),
    check("textColor", "Please include textColor").not().isEmpty(),
    check("borderColor", "Please include borderColor").not().isEmpty(),
    check("borderStyle", "Please include borderStyle").not().isEmpty(),
    check("borderStyleSides", "Please include borderStyleSides")
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let userId = req.user._id;

    const {
      postContent,
      postedTo,
      postTypeId,
      privacyId,
      backgroundColor,
      textColor,
      borderColor,
      borderStyle,
      borderStyleSides,
    } = req.body;
    try {
      let user = await User.findById(postedTo);
      if (!user) {
        res.status(400).json({ msg: "postedTo User Doesn't exist" });
      }

      let getMilliseconds = helpers.getMilliseconds();
      let getBorderColors = helpers.setBorderColors(
        borderColor,
        borderStyleSides
      );
      let borderTopColor = getBorderColors.borderTopColor;
      let borderRightColor = getBorderColors.borderRightColor;
      let borderBottomColor = getBorderColors.borderBottomColor;
      let borderLeftColor = getBorderColors.borderLeftColor;

      let post = new Post({
        _id: mongoose.Types.ObjectId(),
        postProperties: {
          postContent,
          backgroundColor,
          textColor,
          borderTopColor,
          borderRightColor,
          borderBottomColor,
          borderLeftColor,
          borderStyle,
          borderStyleSides,
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

      res.json({ post });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.post(
  "/create-post/5",
  auth,
  [
    check("postContent", "Please include post postContent").not().isEmpty(),
    check("postedTo", "Please include postedTo ID").not().isEmpty(),
    check("privacyId", "Please include privacyId").not().isEmpty(),
    check("postTypeId", "Please include postTypeId").not().isEmpty(),
    check("backgroundColor", "Please include backgroundColor").not().isEmpty(),
    check("textColor", "Please include textColor").not().isEmpty(),
    check("cornerStyle", "Please include cornerStyle").not().isEmpty(),
    check("cornerStyleSides", "Please include cornerStyleSides")
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let userId = req.user._id;

    const {
      postContent,
      postedTo,
      postTypeId,
      privacyId,
      backgroundColor,
      textColor,
      cornerStyle,
      cornerStyleSides,
    } = req.body;
    try {
      let user = await User.findById(postedTo);
      if (!user) {
        res.status(400).json({ msg: "postedTo User Doesn't exist" });
      }

      let getMilliseconds = helpers.getMilliseconds();

      let post = new Post({
        _id: mongoose.Types.ObjectId(),
        postProperties: {
          postContent,
          backgroundColor,
          textColor,
          cornerStyle,
          cornerStyleSides,
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

      res.json({ post });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.get("/:postId", async (req, res) => {
  let postId = req.params.postId;
  try {
    const posts = await Post.findById(postId)
      .populate("postedTo", "fullName primaryDp username profileCoverPhoto")
      .populate("postedBy", "fullName primaryDp username profileCoverPhoto")
      .populate(
        "comments.commentedBy",
        "fullName primaryDp username profileCoverPhoto"
      )
      .exec()
      .then((result) => {
        // console.log("Populated results");
        // console.log(result);
        let post = [];
        post.push(result);
        res.json(post);
      })
      .catch((err) => {
        console.error(err.message);
        res.status(500).send("Server Error");
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Fetches all posts which are postedTo a user
router.get("/postedTo/:id", (req, res) => {
  let uniqueUserId = mongoose.Types.ObjectId(req.params.id);
  try {
    Post.find({ postedTo: uniqueUserId })
      .sort({ milliseconds: -1 })
      .populate("postedTo", "fullName primaryDp username profileCoverPhoto")
      .populate("postedBy", "fullName primaryDp username profileCoverPhoto")
      .populate(
        "comments.commentedBy",
        "fullName primaryDp username profileCoverPhoto"
      )
      .exec()
      .then((posts) => {
        // console.log("Populated results");
        // console.log(posts);
        res.json(posts);
      })
      .catch((err) => {
        console.error(err.message);
        res.status(500).send("Server Error");
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Fetches all posts which are postedBy a user
router.get("/postedBy/:id", async (req, res) => {
  let uniqueUserId = req.params.id;
  try {
    const posts = await Post.find({ postedBy: +uniqueUserId }).sort({
      milliseconds: -1,
    });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

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
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { reactionTypeId, postId } = req.body;
      const post = await Post.findById(postId);

      if (!post) {
        res.status(400).json({ msg: "Post doesn't exist" });
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

      res.json(updatedPost);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.put(
  "/deleteReaction",
  auth,
  [check("postId", "Please include postId").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { postId } = req.body;
      const post = await Post.findById(postId);

      if (!post) {
        res.status(400).json({ msg: "Post doesn't exist" });
      }

      let userId = req.user._id;
      console.log("postId -> " + postId);
      console.log("userId -> " + userId);

      let updatedPost = await Post.findByIdAndUpdate(
        postId,
        {
          $pull: {
            reactions: {
              reactedBy: userId,
            },
          },
        },
        { new: true }
      );

      res.json(updatedPost);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.put(
  "/addComment",
  auth,
  [check("postId", "Please include postId").not().isEmpty()],
  [check("comment", "Please include comment").not().isEmpty()],
  [check("uniqueCommentId", "Please include uniqueCommentId").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { postId, comment, uniqueCommentId } = req.body;
      const post = await Post.findById(postId);

      if (!post) {
        res.status(400).json({ msg: "Post doesn't exist" });
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

      res.json(updatedPost);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.put(
  "/deleteComment",
  auth,
  [check("postId", "Please include postId").not().isEmpty()],
  [check("uniqueCommentId", "Please include uniqueCommentId").not().isEmpty()],
  async (req, res) => {
    try {
      const { postId, uniqueCommentId } = req.body;
      const post = await Post.findById(postId);

      if (!post) {
        res.status(400).json({ msg: "Post doesn't exist" });
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

      res.json(updatedPost);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.delete("/", async (req, res) => {
  try {
    const posts = await Post.deleteMany();
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", auth, async (req, res) => {
  let postId = req.params.id;
  try {
    let getPost = await Post.findById(postId);
    if (!getPost) {
      res.status(400).json({ msg: "Post doesn't exist" });
    }

    const post = await Post.findByIdAndDelete(postId);
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/comment/:commentId", async (req, res) => {
  let commentId = req.params.commentId;
  try {
    const post = await Post.find({
      comments: { $elemMatch: { _id: commentId } },
    }).sort({
      milliseconds: -1,
    });
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/reaction/:reactionId", async (req, res) => {
  let reactionId = req.params.reactionId;
  try {
    const post = await Post.find({
      reactions: { $elemMatch: { _id: reactionId } },
    }).sort({
      milliseconds: -1,
    });
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
