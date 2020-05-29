const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const auth = require("../middlewares/auth");
const helpers = require("../helpers/helpers");
const mongoose = require("mongoose");

const User = require("../models/User");
const Post = require("../models/Post");

// sample test route
router.get("/test/", (req, res) => {
  res.status(200).json({ msg: "This is Users home route" });
});

// @route       POST api/users
// @desc        Register a user
// @access      Public
router.post(
  "/",
  [
    check("fullName", "Please add full name").not().isEmpty(),
    check("email", "Please include valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }

    const { fullName, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        res.status(400).json({ msg: "User already exists" });
      }

      let getMilliseconds = helpers.getMilliseconds();
      let username = helpers.randomString();

      user = new User({
        _id: mongoose.Types.ObjectId(),
        username,
        fullName,
        email,
        password,
        milliseconds: getMilliseconds,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      // console.log("User object is below");
      // console.log(user);
      const payload = {
        username,
        fullName,
        email,
        primaryDp: user.primaryDp,
        secondaryDp: user.secondaryDp,
        _id: user._id,
      };

      jwt.sign(
        { data: payload },
        config.get("jwtSecret"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;

          let randomChars = helpers.randomString();
          token = randomChars + "@@" + token;
          res.json({
            token,
            user: payload,
            success: true,
          });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route     GET api/users
// @desc      Get all users
// @access    Public
router.get("/", async (req, res) => {
  try {
    const users = await User.find().sort({
      milliseconds: -1,
    });
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     GET api/users/:id
// @desc      Get specific user by ID
// @access    Public
router.get("/:username", async (req, res) => {
  let username = req.params.username;
  try {
    User.getUserByUsername(username, (err, user) => {
      if (err) new Error(err);
      if (!user) {
        return res.json({ success: false, msg: "User not found" });
      } else {
        let userProfileDetails = user;
        // return res.json({ msg: "User found", user });
        Post.find({ postedTo: user._id })
          .sort({ milliseconds: -1 })
          .populate("postedTo", "fullName primaryDp username")
          .populate("postedBy", "fullName primaryDp username")
          .populate("comments.commentedBy", "fullName primaryDp username")
          .exec()
          .then((posts) => {
            console.log("Populated results");
            console.log(posts);
            res.json({ success: true, userProfileDetails, posts });
          })
          .catch((err) => {
            console.error(err.message);
            res.status(500).send("Server Error");
          });
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     Delete api/users/
// @desc      Delete all users
// @access    Public
router.delete("/", async (req, res) => {
  try {
    const deletedUsers = await User.deleteMany();
    res.json(deletedUsers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     Delete api/users/:id
// @desc      Delete specific user by ID
// @access    Public
router.delete("/:id", async (req, res) => {
  let _id = req.params.id;
  try {
    let getUser = await User.findById(_id);
    if (!getUser) {
      res.status(400).json({ msg: "User doesn't exist" });
    }

    const user = await User.findByIdAndDelete(_id);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route       PUT api/users
// @desc        Update a user
// @access      Public
router.put(
  "/:id",
  auth,
  [check("name", "Please add name").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let _id = req.params.id;
      const { name } = req.body;

      let user = await User.findById(_id);
      if (!user) {
        res.status(400).json({ msg: "User doesn't exist" });
      }

      // Build user object
      let userFields = {};
      if (name) userFields.name = name;

      let updatedUser = await User.findByIdAndUpdate(
        _id,
        { $set: userFields },
        { new: true }
      );

      res.json(updatedUser);
    } catch (err) {
      console.error(err.message);
      res
        .status(500)
        .json({ msg: "User doesn't exist", error: "Server Error" });
    }
  }
);

// @route       PUT api/users/authenticate
// @desc        authenticate a user
// @access      Private
router.post(
  "/authenticate",
  [
    check("email", "Please include valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more charactors"
    ).isLength({ min: 6 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }

    const email = req.body.email;
    const password = req.body.password;

    User.getUserByEmail(email, (err, user) => {
      if (err) new Error(err);
      if (!user) {
        return res.json({ success: false, msg: "User not found" });
      }

      User.comparePassword(password, user.password, (err, isMatch) => {
        if (err) new Error(err);
        if (isMatch) {
          const token = jwt.sign({ data: user }, config.jwtSecret, {
            expiresIn: 604800, // 1 week
          });
          let randomChars = helpers.randomString();
          res.json({
            success: true,
            token: randomChars + "@@" + token,
            user: {
              _id: user._id,
              username: user.username,
              fullName: user.fullName,
              email: user.email,
              primaryDp: user.primaryDp,
              secondaryDp: user.secondaryDp,
            },
          });
        } else {
          return res.json({ success: false, msg: "Wrong password" });
        }
      });
    });
  }
);

// Send Friend Request route
router.put("/send-friend-request/:userId/:friendId", async (req, res) => {
  try {
    let friendId = req.params.friendId;
    const getUser = await User.findById(friendId);

    if (!getUser) {
      res.status(400).json({ msg: "User doesn't exist" });
    }

    let userId = req.params.userId;
    console.log("friendId -> " + friendId);
    console.log("userId -> " + userId);

    let sentUserDetails = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          friends: {
            friendId: friendId,
            friendshipAction: "sent",
            status: "sent",
          },
        },
      },
      { new: true }
    );

    let receivedUserDetails = await User.findByIdAndUpdate(
      friendId,
      {
        $push: {
          friends: {
            friendId: userId,
            friendshipAction: "received",
            status: "pending",
          },
        },
      },
      { new: true }
    );

    res.json(sentUserDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Accept Friend Request route
router.put("/accept-friend-request/:userId/:friendId", async (req, res) => {
  try {
    let friendId = req.params.friendId;
    const getUser = await User.findById(friendId);

    if (!getUser) {
      res.status(400).json({ msg: "User doesn't exist" });
    }

    let userId = req.params.userId;
    console.log("friendId -> " + friendId);
    console.log("userId -> " + userId);

    let sentUserDetails = await User.findOneAndUpdate(
      { _id: userId, "friends.friendId": friendId },
      {
        $set: {
          "friends.$.status": "friend",
        },
      },
      { new: true }
    );

    let receivedUserDetails = await User.findOneAndUpdate(
      { _id: friendId, "friends.friendId": userId },
      {
        $set: {
          "friends.$.status": "friend",
        },
      },
      { new: true }
    );

    res.json(sentUserDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Delete Friend Request route
router.put("/delete-friend-request/:userId/:friendId", async (req, res) => {
  try {
    let friendId = req.params.friendId;
    const getUser = await User.findById(friendId);

    if (!getUser) {
      res.status(400).json({ msg: "User doesn't exist" });
    }

    let userId = req.params.userId;
    console.log("friendId -> " + friendId);
    console.log("userId -> " + userId);

    let sentUserDetails = await User.findByIdAndUpdate(
      userId,
      {
        $pull: {
          friends: {
            friendId: friendId,
            status: "sent",
          },
        },
      },
      { new: true }
    );

    let receivedUserDetails = await User.findByIdAndUpdate(
      friendId,
      {
        $pull: {
          friends: {
            friendId: userId,
            status: "pending",
          },
        },
      },
      { new: true }
    );

    res.json(sentUserDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     GET api/users/drop
// @desc      Drop users collection
// @access    public
router.get("/drop", async (req, res) => {
  try {
    const users = await User.drop();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
