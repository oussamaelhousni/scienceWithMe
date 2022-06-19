const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");
const validator = require("validator");

// CREATE THE USER SCHEMA
// NOTE : Validators only works on create and save() methods
const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "Please provide a name"],
    trim: true,
    validate: [validator.isAlpha, "The name should only contains characters"],
  },
  second_name: {
    type: String,
    required: [true, "Please provide a name"],
    trim: true,
    validate: [validator.isAlpha, "The name should only contains characters"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "please enter the email"],
    lowercase: true,
    validate: [validator.isEmail, "please provide a valid email"],
  },
  photo: {
    type: String,
    default:
      "https://cours-informatique-gratuit.fr/wp-content/uploads/2017/10/avatar.png",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    select: false,
  },
  rooms: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Chatroom",
    },
  ],
  password: {
    type: String,
    required: [true, "please enter a password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "please enter a password"],
    validate: {
      // this only works on create or save
      validator: function (val) {
        // this keyword point to current document
        return this.password === val;
      },
      message: "passwords are not the same",
    },
    select: false,
  },
  passwordChangedAt: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

// INSTANCE METHODS

// CHECK IF THE TOKEN EXPIRED
userSchema.methods.changedPasswordAfter = function (jwtExpiresIn) {
  // we turn the time into seconds because the jwt issue ein in seconds
  if (this.passwordChangedAt) {
    return jwtExpiresIn < this.passwordChangedAt.getTime();
  }
  return false;
};

// COMPARE THE PASSWORDS
userSchema.methods.comparePasswords = async (password, userPassword) => {
  return await bcryptjs.compare(password, userPassword);
};
// MIDDLEWARE

// encrypt the password of the user before save it to DB
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcryptjs.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

// Update password changed at
userSchema.pre("save", function (next) {
  if (this.isNew || !this.isModified("password")) return next();
  this.passwordChangedAt = Date.now();
  next();
});

// hide inactive users
userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

// g
userSchema.pre(/^find/, function (next) {
  this.populate("rooms");
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
