const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

// Creating a new user with more restrictions
// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: {
//     type: String,
//     unique: true,
//     trim: true,
//     lowercase: true,
//     required: true,
//   },
//   password: {
//     type: String,
//     trim: true,
//     minLength: 5,
//     required: true,
//   },
//   timestamp: true,
//   toJSON: {
//     transform: function (doc, ret) {
//       delete ret.password;
//       return ret;
//     },
//   },
// });

// Hash password before saving to database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Generate JWT token
userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
};

module.exports = mongoose.model("User", userSchema);
