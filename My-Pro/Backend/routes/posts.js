const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middlewares/auth");

const User = require("../models/User");
const Post = require("../models/Post");

router.get("/test", (req, res) => {
  res.status(200).json({ msg: "This is Posts home route" });
});

router.post(
  "/",
  auth,
  [
    check("body", "Please add post body").not().isEmpty(),
    check("postedTo", "Please add postedTo ID").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // console.log(req);

    let userId = req.user._id;

    const { body, postedTo } = req.body;
    try {
      let user = await User.findById(postedTo);
      if (!user) {
        res.status(400).json({ msg: "postedTo User Doesn't exist" });
      }

      let post = new Post({
        body,
        postedTo,
        postedBy: userId,
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

module.exports = router;
