const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middlewares/auth");
const helpers = require("../helpers/helpers");

const User = require("../models/User");
const Post = require("../models/Post");

router.get("/test", (req, res) => {
  res.status(200).json({ msg: "This is Posts home route" });
});

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({
      date: -1,
    });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post(
  "/",
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

    // console.log(req);

    let userId = req.user._id;

    const { postContent, postedTo, postTypeId, privacyId } = req.body;
    try {
      let user = await User.findById(postedTo);
      if (!user) {
        res.status(400).json({ msg: "postedTo User Doesn't exist" });
      }

      let uniqueId = helpers.generateUniqueId();

      let post = new Post({
        postContent,
        postedTo,
        postedBy: userId,
        uniqueId,
        privacyId,
        postTypeId,
      });

      await post.save();
      console.log("Post object is below");
      console.log(post);

      res.json({ post });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.get("/:id", async (req, res) => {
  let postId = req.params.id;
  try {
    const posts = await Post.findById(postId).sort({
      date: -1,
    });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/postedTo/:id", async (req, res) => {
  let userId = req.params.id;
  try {
    const posts = await Post.find({ postedTo: userId }).sort({
      date: -1,
    });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/postedBy/:id", async (req, res) => {
  let userId = req.params.id;
  try {
    const posts = await Post.find({ postedBy: userId }).sort({
      date: -1,
    });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.put(
  "/addReaction/:id",
  auth,
  [check("reactionTypeId", "Please include reactionTypeId").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let postId = req.params.id;
    try {
      const post = await Post.findById(postId);

      if (!post) {
        res.status(400).json({ msg: "Post doesn't exist" });
      }

      let userId = req.user._id;
      console.log("postId -> " + postId);
      console.log("userId -> " + userId);
      const { reactionTypeId } = req.body;

      let updatedPost = await Post.findByIdAndUpdate(
        postId,
        {
          $push: {
            reactions: {
              reactionTypeId: reactionTypeId,
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

router.put("/deleteReaction/:id", auth, async (req, res) => {
  let postId = req.params.id;
  try {
    const post = await Post.findById(postId);

    if (!post) {
      res.status(400).json({ msg: "Post doesn't exist" });
    }

    let userId = req.user._id;
    console.log("postId -> " + postId);
    console.log("userId -> " + userId);
    const { reactionTypeId } = req.body;

    let updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: {
          reactions: {
            reactionTypeId: reactionTypeId,
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
});

router.put(
  "/addComment/:id",
  auth,
  [check("comment", "Please include comment").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let postId = req.params.id;
    try {
      const post = await Post.findById(postId);

      if (!post) {
        res.status(400).json({ msg: "Post doesn't exist" });
      }

      let userId = req.user._id;
      console.log("postId -> " + postId);
      console.log("userId -> " + userId);
      const { comment } = req.body;

      let updatedPost = await Post.findByIdAndUpdate(
        postId,
        {
          $push: {
            comments: {
              comment: comment,
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

router.put("/deleteComment/:id", auth, async (req, res) => {
  let postId = req.params.id;
  try {
    const post = await Post.findById(postId);

    if (!post) {
      res.status(400).json({ msg: "Post doesn't exist" });
    }

    let userId = req.user._id;
    console.log("postId -> " + postId);
    console.log("userId -> " + userId);
    const { comment } = req.body;

    let updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: {
          comments: {
            comment: comment,
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
});

router.delete("/:id", async (req, res) => {
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
      date: -1,
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
      date: -1,
    });
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
