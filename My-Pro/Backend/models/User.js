const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { ObjectId } = mongoose.Schema;

const UserSchema = mongoose.Schema({
  uniqueId: {
    type: Number,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  friends: [
    {
      friendId: { type: ObjectId, ref: "User" },
      friendshipAction: { type: String },
      status: { type: String },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  genderId: {
    type: Number,
    default: null,
  },
  phoneNumber: {
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
  emailStatus: {
    type: String,
    default: "active",
  },
  accountStatus: {
    type: String,
    default: "active",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = (module.exports = mongoose.model("user", UserSchema));

module.exports.getUserById = function (id, callback) {
  User.findById(id, callback);
};

module.exports.getUserByEmail = function (email, callback) {
  const query = { email: email };
  User.findOne(query, callback);
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
