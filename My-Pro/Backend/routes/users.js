const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const auth = require("../middlewares/auth");
const helpers = require("../helpers/helpers");
const mongoose = require("mongoose");
const uploadController = require("../middlewares/upload");

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
        profileCoverPhoto: user.profileCoverPhoto,
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

// @route     GET api/users/search/:searchWord
// @desc      Get specific users with regex
// @access    Public
router.get("/search/:searchWord", async (req, res) => {
  let searchWord = req.params.searchWord;
  try {
    const users = await User.find({
      fullName: { $regex: searchWord, $options: "i" },
    }).sort({
      milliseconds: -1,
    });
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     GET api/users/by-username/:username
// @desc      Get specific user by username
// @access    Public
router.get("/by-username/:username", auth, async (req, res) => {
  let username = req.params.username;
  try {
    let userId = req.user._id;
    let authUserdetails = await User.findById(userId).populate(
      "friends.friendId",
      "fullName primaryDp username"
    );
    // console.log(authUserdetails);

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
          .populate(
            "reactions.reactedBy",
            "fullName primaryDp secondaryDp username profileCoverPhoto"
          )
          .exec()
          .then((posts) => {
            // console.log("Populated results");
            // console.log(posts);
            return res.json({
              success: true,
              userProfileDetails,
              posts,
              authUserdetails,
            });
          })
          .catch((err) => {
            console.error(err.message);
            return res.status(500).send("Server Error");
          });
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     Update api/users/
// @desc      Update user's primary DP
// @access    Private
router.post(
  "/update-user-photo",
  auth,
  uploadController.uploadImages,
  uploadController.resizeImages,
  uploadController.getResult,
  [
    check("photoType", "Please include photoType in request body")
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let userId = req.user._id;
    const { photoType } = req.body;
    try {
      console.log("req.body.images are below");
      console.log(req.body.images);

      let photoName = req.body.images[0];

      if (photoType === "primaryDp") {
        await User.findByIdAndUpdate(userId, { primaryDp: photoName })
          .exec()
          .then((result) => {
            return res.json({ success: true, user: result });
          })
          .catch((error) => {
            return res.json({ success: false, msg: "something went wrong" });
          });
      } else if (photoType === "secondaryDp") {
        await User.findByIdAndUpdate(userId, { secondaryDp: photoName })
          .exec()
          .then((result) => {
            return res.json({ success: true, user: result });
          })
          .catch((error) => {
            return res.json({ success: false, msg: "something went wrong" });
          });
      } else if (photoType === "profileCoverPhoto") {
        await User.findByIdAndUpdate(userId, { profileCoverPhoto: photoName })
          .exec()
          .then((result) => {
            return res.json({ success: true, user: result });
          })
          .catch((error) => {
            return res.json({ success: false, msg: "something went wrong" });
          });
      }

      // console.log("Post object is below");
      // console.log(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

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
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }

    const email = req.body.email;
    const password = req.body.password;

    try {
      User.findOne({ email })
        .sort({ milliseconds: -1 })
        .populate(
          "friends.friendId",
          "fullName primaryDp username profileCoverPhoto"
        )
        .exec()
        .then((user) => {
          if (!user) {
            return res.json({ success: false, msg: "User not found" });
          } else {
            User.comparePassword(password, user.password, (err, isMatch) => {
              if (err) new Error(err);
              if (isMatch) {
                let userPayload = {
                  _id: user._id,
                  username: user.username,
                  fullName: user.fullName,
                  email: user.email,
                  primaryDp: user.primaryDp,
                  secondaryDp: user.secondaryDp,
                  profileCoverPhoto: user.profileCoverPhoto,
                };

                const token = jwt.sign(
                  { data: userPayload },
                  config.jwtSecret,
                  {
                    expiresIn: 604800, // 1 week
                  }
                );
                let randomChars = helpers.randomString();
                res.json({
                  success: true,
                  token: randomChars + "@@" + token,
                  user,
                });
              } else {
                return res.json({ success: false, msg: "Wrong password" });
              }
            });
          }
        })
        .catch((err) => {
          console.error(err.message);
          res.status(500).send("Server Error");
        });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// Send Friend Request route
router.put(
  "/send-friend-request",
  auth,
  [check("friendId", "Please add friendId").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let friendId = mongoose.Types.ObjectId(req.body.friendId);
      console.log("friendId --> " + friendId);
      const getUser = await User.findById(friendId);

      if (!getUser) {
        return res.status(400).json({ msg: "User doesn't exist" });
      }

      let userId = req.user._id;
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

      return res.json(sentUserDetails);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

// Accept Friend Request route
router.put(
  "/accept-friend-request",
  auth,
  [check("friendId", "Please add friendId").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let friendId = req.body.friendId;
      const getUser = await User.findById(friendId);

      if (!getUser) {
        return res.status(400).json({ msg: "User doesn't exist" });
      }

      let userId = req.user._id;
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

      return res.json(sentUserDetails);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

// cancel Friend Request route
router.put(
  "/cancel-friend-request",
  auth,
  [check("friendId", "Please add friendId").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let friendId = req.body.friendId;
      const getUser = await User.findById(friendId);

      if (!getUser) {
        return res.status(400).json({ msg: "User doesn't exist" });
      }

      let userId = req.user._id;
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

      return res.json(sentUserDetails);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

// Delete Friend Request route
router.put(
  "/delete-friend-request",
  auth,
  [check("friendId", "Please add friendId").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let friendId = req.body.friendId;
      const getUser = await User.findById(friendId);

      if (!getUser) {
        return res.status(400).json({ msg: "User doesn't exist" });
      }

      let userId = req.user._id;
      console.log("friendId -> " + friendId);
      console.log("userId -> " + userId);

      let sentUserDetails = await User.findByIdAndUpdate(
        userId,
        {
          $pull: {
            friends: {
              friendId: friendId,
              status: "pending",
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
              status: "sent",
            },
          },
        },
        { new: true }
      );

      return res.json(sentUserDetails);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

// Unfriend route
router.put(
  "/unfriend",
  auth,
  [check("friendId", "Please add friendId").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let friendId = req.body.friendId;
      const getUser = await User.findById(friendId);

      if (!getUser) {
        return res.status(400).json({ msg: "User doesn't exist" });
      }

      let userId = req.user._id;
      console.log("friendId -> " + friendId);
      console.log("userId -> " + userId);

      let sentUserDetails = await User.findByIdAndUpdate(
        userId,
        {
          $pull: {
            friends: {
              friendId: friendId,
              status: "friend",
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
              status: "friend",
            },
          },
        },
        { new: true }
      );

      return res.json(sentUserDetails);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

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

// @route     GET api/users/:id
// @desc      Get specific user by ID
// @access    Public
router.get("/by-id/:id", async (req, res) => {
  let userId = req.params.id;
  try {
    User.findById(userId)
      .sort({ milliseconds: -1 })
      .populate(
        "friends.friendId",
        "fullName primaryDp username profileCoverPhoto"
      )
      .exec()
      .then((user) => {
        if (!user) {
          return res.json({ success: false, msg: "User not found" });
        } else {
          let userProfileDetails = user;
          return res.json({
            success: true,
            userProfileDetails,
          });
        }
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

module.exports = router;
