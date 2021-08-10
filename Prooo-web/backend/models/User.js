const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
// const { ObjectId } = mongoose.Schema;

const UserSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    index: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  genderId: {
    type: Number,
    default: null,
  },
  primaryDp: {
    type: String,
    default: null,
  },
  secondaryDp: {
    type: String,
    default: null,
  },
  profilePhotos: [
    {
      photoName: { type: String, required: true },
      createdAt: { type: String, required: true },
    },
  ],
  profileCoverPhoto: {
    type: String,
    default: null,
  },
  coverPhotos: [
    {
      photoName: { type: String, required: true },
      createdAt: { type: String, required: true },
    },
  ],
  friends: [
    {
      friendId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      friendshipAction: { type: String },
      status: { type: String, index: true },
      createdAt: {
        type: String,
        required: true,
      },
      becameFriendsAt: {
        type: String,
      },
    },
  ],
  emailStatus: {
    type: String,
    default: "active",
  },
  accountStatus: {
    type: String,
    default: "active",
  },
  milliseconds: {
    type: String,
    required: true,
  },
});

const User = (module.exports = mongoose.model("User", UserSchema));

module.exports.getUserByUsername = async (username, callback) => {
  // User.findOne({ username }, callback);
  let userDetails = await User.findOne({ username }).populate(
    "friends.friendId",
    "fullName primaryDp secondaryDp username"
  );
  callback(null, userDetails);
};

module.exports.addUser = function (newUser, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) new Error(err);
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

module.exports.comparePassword = function (candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) new Error(err);
    callback(null, isMatch);
  });
};
