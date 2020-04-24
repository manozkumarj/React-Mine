const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const auth = require("../middlewares/auth");
const randomString = require("../helpers/helpers");

const User = require("../models/User");

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
    check("name", "Please add name").not().isEmpty(),
    check("email", "Please include valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more charactors"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        res.status(400).json({ msg: "User already exists" });
      }

      user = new User({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      console.log("User object is below");
      console.log(user);
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;

          let randomChars = randomString();
          token = randomChars + "-" + token;
          res.json({ token });
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
// @access    Private
router.get("/", async (req, res) => {
  try {
    const users = await User.find().sort({
      date: -1,
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
router.get("/:id", async (req, res) => {
  let userId = req.params.id;
  try {
    const user = await User.findById(userId).sort({
      date: -1,
    });
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     Delete api/users/:id
// @desc      Delete specific user by ID
// @access    Public
router.delete("/:id", async (req, res) => {
  let userId = req.params.id;
  try {
    let getUser = await User.findById(userId);
    if (!getUser) {
      res.status(400).json({ msg: "User doesn't exist" });
    }

    const user = await User.findByIdAndDelete(userId);
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
      let userId = req.params.id;
      const { name } = req.body;

      let user = await User.findById(userId);
      if (!user) {
        res.status(400).json({ msg: "User doesn't exist" });
      }

      // Build user object
      let userFields = {};
      if (name) userFields.name = name;

      let updatedUser = await User.findByIdAndUpdate(
        userId,
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
router.post("/authenticate", (req, res) => {
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
        let randomChars = randomString();
        res.json({
          success: true,
          token: randomChars + "-" + token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
          },
        });
      } else {
        return res.json({ success: false, msg: "Wrong password" });
      }
    });
  });
});

module.exports = router;
