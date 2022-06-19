const { promisify } = require("util");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("./../utils/AppError");

// signup
exports.signup = catchAsync(async (req, res, next) => {
  const body = req.body;
  const newUser = await User.create({
    first_name: body.first_name,
    second_name: body.second_name,
    email: body.email,
    password: body.password,
    passwordConfirm: body.passwordConfirm,
  });

  res.status(201).json({
    status: "success",
    data: {
      user: _.pick(newUser, ["first_name", "second_name", "email", "_id"]),
    },
  });
});

// login
exports.login = catchAsync(async (req, res, next) => {
  console.log("hi");
  const { email, password } = req.body;
  console.log("pass", req.body);
  if (!email || !password) {
    return next(new AppError("Please provide the email and password !", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePasswords(password, user.password))) {
    return next(new AppError("password or email is incorrect", 400));
  }

  // CREATE THE TOKEN FOR THE USER
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  user.password = undefined;
  res.status(200).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
});

// protect middleware
// this middleware will check for jwt and add the user correspondent to the req object
exports.protect = catchAsync(async (req, res, next) => {
  const headers = req.headers;
  if (!headers.authorization && !header.authorization.startsWith("Bearer")) {
    next(new AppError(`You are not logged in ! please login`, 401));
  }

  const token = headers.authorization.split(" ")[1];
  if (!token) {
    next(new AppError(`You are not logged in ! please login`, 401));
  }
  // promisify function return a promise correspond to a callback
  const verifyPromise = promisify(jwt.verify);
  const decodedValueFromJwt = await verifyPromise(
    token,
    process.env.JWT_SECRET_KEY
  );
  const decodedUser = await User.findById(decodedValueFromJwt._id);
  // check if the user still exists(user logged in and  delete his account)
  if (!decodedUser) {
    return next(
      new AppError("The user belongs to this token does no more exists", 404)
    );
  }
  // check if the user changed his password after issuing the token
  if (decodedUser.changedPasswordAfter(decodedValueFromJwt.iat)) {
    return next(
      new AppError("user recently changed his password! please re-login", 401)
    );
  }
  res.user = decodedUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You are not allowed to access this resource", 403)
      );
    }
    next();
  };
};
