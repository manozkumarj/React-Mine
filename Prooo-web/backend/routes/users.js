const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const helpers = require("../helpers/helpers");
const multer = require("multer");
const auth = require("../middlewares/auth");

const Post = require("../models/Post");
const User = require("../models/User");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    req.body.profilePhotoName = null;
    cb(null, "./pictures/images/");
  },
  filename: function (req, file, cb) {
    console.log(file);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    let newFilename = uniqueSuffix + ".png";
    req.body.profilePhotoName = newFilename;
    cb(null, newFilename);
  },
});

var uploadProfilePhoto = multer({ storage: storage });

// sample test route
router.get("/test", (req, res) => {
  return res.status(200).json({ msg: "This is Users home route" });
});

// @route       POST api/users
// @desc        Register a user
// @access      Public
router.post(
  "/",
  [
    check("fullName", "fullName").not().isEmpty(),
    check("email", "email").isEmail(),
    check("password", "password").isLength({ min: 6, max: 10 }),
    check("genderId", "gender").isNumeric(),
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

    const { fullName, email, password, genderId } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          success: false,
          errorType: "generalError",
          errorTag: "duplicateEmail",
          msg: "User already exists",
        });
      }

      let getMilliseconds = helpers.getMilliseconds();
      let username = helpers.randomString();

      user = new User({
        _id: mongoose.Types.ObjectId(),
        username,
        fullName,
        email,
        password,
        genderId,
        milliseconds: getMilliseconds,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
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
          expiresIn: 604800, // 1 week
        },
        (err, token) => {
          if (err) throw err;

          let randomChars = helpers.randomString();
          token = randomChars + "@@" + token;
          return res.json({
            success: true,
            token,
            userDetails: payload,
          });
        }
      );
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

// @route       PUT api/users/authenticate
// @desc        authenticate a user
// @access      Private
router.post(
  "/authenticate",
  [
    check("email", "email").isEmail(),
    check("password", "password").not().isEmpty(),
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
            return res.status(400).json({
              success: false,
              errorType: "generalError",
              errorTag: "emailNotFound",
              msg: "Email not found",
            });
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
                return res.json({
                  success: true,
                  token: randomChars + "@@" + token,
                  userDetails: user,
                });
              } else {
                return res.status(400).json({
                  success: false,
                  errorType: "generalError",
                  errorTag: "wrongPassword",
                  msg: "Wrong password",
                });
              }
            });
          }
        })
        .catch((err) => {
          console.error(err.message);
          return res.status(500).json({
            success: false,
            errorType: "serverError",
            msg: err.message,
          });
        });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({
        success: false,
        errorType: "serverError",
        msg: err.message,
      });
    }
  }
);

// Profile photo updation end-point
router.post(
  "/update-dp",
  auth,
  uploadProfilePhoto.single("profilePhoto"),
  [check("dpTypeId", "Please include dpType ID").not().isEmpty()],
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

    const { dpTypeId, profilePhotoName } = req.body;

    let getMilliseconds = helpers.getMilliseconds();

    try {
      let updatedUser;

      if (dpTypeId == 1) {
        updatedUser = await User.findByIdAndUpdate(
          userId,
          {
            primaryDp: profilePhotoName,
            $push: {
              profilePhotos: {
                photoName: profilePhotoName,
                createdAt: getMilliseconds,
              },
            },
          },
          { new: true }
        );
      } else if (dpTypeId == 2) {
        updatedUser = await User.findByIdAndUpdate(
          userId,
          {
            secondaryDp: profilePhotoName,
            $push: {
              profilePhotos: {
                photoName: profilePhotoName,
                createdAt: getMilliseconds,
              },
            },
          },
          { new: true }
        );
      } else {
        return res.status(400).json({
          success: false,
          errorType: "inputError",
          msg: "Invalid DP type",
        });
      }

      const payload = {
        username: updatedUser.username,
        fullName: updatedUser.fullName,
        primaryDp: updatedUser.primaryDp,
        secondaryDp: updatedUser.secondaryDp,
        profileCoverPhoto: updatedUser.profileCoverPhoto,
        _id: updatedUser._id,
      };

      jwt.sign(
        { data: payload },
        config.get("jwtSecret"),
        {
          expiresIn: 604800, // 1 week
        },
        (err, token) => {
          if (err) throw err;

          let randomChars = helpers.randomString();
          token = randomChars + "@@" + token;
          return res.json({
            success: true,
            token,
            userDetails: payload,
          });
        }
      );
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

// @route     GET api/users/by-username/:username
// @desc      Get specific user by username
// @access    Public
router.get("/by-username/:username", auth, async (req, res) => {
  let username = req.params.username;
  try {
    let userId = req.user._id;
    let authUserdetails = await User.findById(userId).populate(
      "friends.friendId",
      "fullName primaryDp secondaryDp username friends"
    );
    // console.log(authUserdetails);

    User.getUserByUsername(username, (err, user) => {
      if (err) new Error(err);
      if (!user) {
        return res.status(400).json({
          success: false,
          errorType: "generalError",
          errorTag: "userNotFound",
          msg: "User not found",
        });
      } else {
        let profileUserDetails = user;
        // return res.json({ msg: "User found", user });
        Post.find({ postedTo: user._id })
          .sort({ milliseconds: -1 })
          .populate("postedTo", "fullName primaryDp secondaryDp username")
          .populate("postedBy", "fullName primaryDp secondaryDp username")
          .populate(
            "comments.commentedBy",
            "fullName primaryDp secondaryDp username"
          )
          .populate(
            "reactions.reactedBy",
            "fullName primaryDp secondaryDp username profileCoverPhoto"
          )
          .exec()
          .then((profileUserPosts) => {
            // console.log("Populated results");
            // console.log(posts);
            return res.json({
              success: true,
              profileUserDetails,
              profileUserPosts,
              authUserdetails,
            });
          })
          .catch((err) => {
            console.error(err.message);
            return res.status(500).json({
              success: false,
              errorType: "serverError",
              msg: err.message,
            });
          });
      }
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      success: false,
      errorType: "serverError",
      msg: err.message,
    });
  }
});

// Send Friend Request route
router.put(
  "/send-friend-request",
  auth,
  [check("friendId", "Please add friendId").not().isEmpty()],
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
      let friendId = mongoose.Types.ObjectId(req.body.friendId);
      console.log("friendId --> " + friendId);
      const getUser = await User.findById(friendId);

      if (!getUser) {
        return res.status(400).json({
          success: false,
          errorType: "generalError",
          errorTag: "userNotFound",
          msg: "User not found",
        });
      }

      let userId = req.user._id;
      console.log("friendId -> " + friendId);
      console.log("userId -> " + userId);

      let getMilliseconds = helpers.getMilliseconds();

      let sentUserDetails = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            friends: {
              friendId: friendId,
              friendshipAction: "sent",
              status: "sent",
              createdAt: getMilliseconds,
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
              createdAt: getMilliseconds,
            },
          },
        },
        { new: true }
      );

      return res.json({ success: true, user: sentUserDetails });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({
        success: false,
        errorType: "serverError",
        msg: err.message,
      });
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
      return res.status(400).json({
        success: false,
        errorType: "inputError",
        msg: errors.array(),
      });
    }

    try {
      let friendId = req.body.friendId;
      const getUser = await User.findById(friendId);

      if (!getUser) {
        return res.status(400).json({
          success: false,
          errorType: "generalError",
          errorTag: "userNotFound",
          msg: "User not found",
        });
      }

      let userId = req.user._id;
      console.log("friendId -> " + friendId);
      console.log("userId -> " + userId);

      let cancelledUserDetails = await User.findByIdAndUpdate(
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

      return res.json({ success: true, user: cancelledUserDetails });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({
        success: false,
        errorType: "serverError",
        msg: err.message,
      });
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
      return res.status(400).json({
        success: false,
        errorType: "inputError",
        msg: errors.array(),
      });
    }

    try {
      let friendId = req.body.friendId;
      const getUser = await User.findById(friendId);

      if (!getUser) {
        return res.status(400).json({
          success: false,
          errorType: "generalError",
          errorTag: "userNotFound",
          msg: "User not found",
        });
      }

      let userId = req.user._id;
      console.log("friendId -> " + friendId);
      console.log("userId -> " + userId);

      let deletedUserDetails = await User.findByIdAndUpdate(
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

      let otherUserDetails = await User.findByIdAndUpdate(
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

      return res.json({ success: true, user: deletedUserDetails });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({
        success: false,
        errorType: "serverError",
        msg: err.message,
      });
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
      return res.status(400).json({
        success: false,
        errorType: "inputError",
        msg: errors.array(),
      });
    }

    try {
      let friendId = req.body.friendId;
      const getUser = await User.findById(friendId);

      if (!getUser) {
        return res.status(400).json({
          success: false,
          errorType: "generalError",
          errorTag: "userNotFound",
          msg: "User not found",
        });
      }

      let userId = req.user._id;
      console.log("friendId -> " + friendId);
      console.log("userId -> " + userId);

      let getMilliseconds = helpers.getMilliseconds();

      let acceptedUserDetails = await User.findOneAndUpdate(
        { _id: userId, "friends.friendId": friendId },
        {
          $set: {
            "friends.$.status": "friend",
            becameFriendsAt: getMilliseconds,
          },
        },
        { new: true }
      );

      let otherUserDetails = await User.findOneAndUpdate(
        { _id: friendId, "friends.friendId": userId },
        {
          $set: {
            "friends.$.status": "friend",
            becameFriendsAt: getMilliseconds,
          },
        },
        { new: true }
      );

      return res.json({ success: true, user: acceptedUserDetails });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({
        success: false,
        errorType: "serverError",
        msg: err.message,
      });
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
      return res.status(400).json({
        success: false,
        errorType: "inputError",
        msg: errors.array(),
      });
    }

    try {
      let friendId = req.body.friendId;
      const getUser = await User.findById(friendId);

      if (!getUser) {
        return res.status(400).json({
          success: false,
          errorType: "generalError",
          errorTag: "userNotFound",
          msg: "User not found",
        });
      }

      let userId = req.user._id;
      console.log("friendId -> " + friendId);
      console.log("userId -> " + userId);

      let unfriendUserDetails = await User.findByIdAndUpdate(
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

      return res.json({ success: true, user: unfriendUserDetails });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({
        success: false,
        errorType: "serverError",
        msg: err.message,
      });
    }
  }
);

// Update Profile details
router.put(
  "/update-profile-details",
  auth,
  [check("fullName", "Please include fullName").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errorType: "inputError",
        msg: errors.array(),
      });
    }

    const { fullName } = req.body;

    try {
      let userId = req.user._id;

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          fullName,
        },
        { new: true }
      );

      const payload = {
        username: updatedUser.username,
        fullName: updatedUser.fullName,
        primaryDp: updatedUser.primaryDp,
        secondaryDp: updatedUser.secondaryDp,
        profileCoverPhoto: updatedUser.profileCoverPhoto,
        _id: updatedUser._id,
      };

      jwt.sign(
        { data: payload },
        config.get("jwtSecret"),
        {
          expiresIn: 604800, // 1 week
        },
        (err, token) => {
          if (err) throw err;

          let randomChars = helpers.randomString();
          token = randomChars + "@@" + token;
          return res.json({
            success: true,
            token,
            userDetails: payload,
          });
        }
      );
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
