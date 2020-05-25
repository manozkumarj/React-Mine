const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middlewares/auth");
const helpers = require("../helpers/helpers");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const uploadController = require("../middlewares/upload");

const User = require("../models/User");
const Post = require("../models/Post");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dir = "../pictures";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// Check File Type
const checkFileType = (file, cb) => {
  console.log("inside of checkFileType func");
  // Allowed ext
  const filetypes = /jpeg|jpg|png|webp/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
};

router.get("/test", (req, res) => {
  res.status(200).json({ msg: "This is Posts home route" });
});

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({
      milliseconds: -1,
    });
    res.json(posts);
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
    let userId = req.user.uniqueUserId;
    const { postContent, postedTo, postTypeId, privacyId } = req.body;
    try {
      let user = await User.findOne({ uniqueUserId: postedTo });
      if (!user) {
        res.status(400).json({ msg: "postedTo User Doesn't exist" });
      }

      let uniquePostId = helpers.generateUniqueId();
      let getMilliseconds = helpers.getMilliseconds();

      let post = new Post({
        postProperties: {
          postContent,
        },
        postedTo,
        postedBy: userId,
        uniquePostId,
        privacyId,
        postTypeId,
        milliseconds: getMilliseconds,
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

router.post(
  "/create-post/2",
  uploadController.uploadImages,
  uploadController.resizeImages,
  uploadController.getResult,
  async (req, res) => {
    console.log("req.body");
    console.log(req.body);

    console.log("req.files");
    console.log(req.files);
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
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let userId = req.user.uniqueUserId;
    const {
      postContent,
      postedTo,
      postTypeId,
      privacyId,
      backgroundColor,
      textColor,
    } = req.body;
    try {
      let user = await User.findOne({ uniqueUserId: postedTo });
      if (!user) {
        res.status(400).json({ msg: "postedTo User Doesn't exist" });
      }

      let uniquePostId = helpers.generateUniqueId();
      let getMilliseconds = helpers.getMilliseconds();

      let post = new Post({
        postProperties: {
          postContent,
          backgroundColor,
          textColor,
        },
        postedTo,
        postedBy: userId,
        uniquePostId,
        privacyId,
        postTypeId,
        milliseconds: getMilliseconds,
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

    let userId = req.user.uniqueUserId;

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
      let user = await User.findOne({ uniqueUserId: postedTo });
      if (!user) {
        res.status(400).json({ msg: "postedTo User Doesn't exist" });
      }

      let uniquePostId = helpers.generateUniqueId();
      let getMilliseconds = helpers.getMilliseconds();
      let borderTopColor = borderColor;
      let borderRightColor = borderColor;
      let borderBottomColor = borderColor;
      let borderLeftColor = borderColor;

      let post = new Post({
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
        uniquePostId,
        privacyId,
        postTypeId,
        milliseconds: getMilliseconds,
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

router.post(
  "/create-post/6",
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

    let userId = req.user.uniqueUserId;

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
      let user = await User.findOne({ uniqueUserId: postedTo });
      if (!user) {
        res.status(400).json({ msg: "postedTo User Doesn't exist" });
      }

      let uniquePostId = helpers.generateUniqueId();
      let getMilliseconds = helpers.getMilliseconds();

      let post = new Post({
        postProperties: {
          postContent,
          backgroundColor,
          textColor,
          cornerStyle,
          cornerStyleSides,
        },
        postedTo,
        postedBy: userId,
        uniquePostId,
        privacyId,
        postTypeId,
        milliseconds: getMilliseconds,
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
      milliseconds: -1,
    });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Fetches all posts which are postedTo a user
router.get("/postedTo/:id", async (req, res) => {
  let uniqueUserId = req.params.id;
  try {
    const posts = await Post.aggregate([
      { $match: { postedTo: +uniqueUserId } },
      {
        $lookup: {
          from: "users",
          localField: "postedTo",
          foreignField: "uniqueUserId",
          as: "userDetails",
        },
      },
    ]).sort({
      milliseconds: -1,
    });
    res.json(posts);
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

router.delete("/", async (req, res) => {
  try {
    const posts = await Post.deleteMany();
    res.json(posts);
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
