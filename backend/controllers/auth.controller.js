// * IMPORTS * //
const User = require("../models/User.model");
const Token = require("../models/Token.model");
const crypto = require("crypto");
const { attachCookiesToResponse } = require("../lib/auth/cookie");
const {
  successfulRes,
  unsuccessfulRes,
  unauthorizedRes,
} = require("../lib/utils/res");
const {
  sendVerificationEmail,
  sendResetPasswordEmail,
} = require("../lib/emails/nodemailer");

// * CONTROLLERS * //

// Register User
const registerUser = async (req, res) => {
  // get data from request body
  const {
    firstName,
    lastName,
    middleInitial,
    phoneNumber,
    email,
    password,
    role,
  } = req.body;

  // if no email or password, return error
  if (!email || !password) {
    return unsuccessfulRes({ res });
  }

  // create verification token
  const verificationToken = crypto.randomBytes(40).toString("hex");

  // create new user
  const newUser = await User.create({
    firstName,
    lastName,
    middleInitial,
    phoneNumber,
    email,
    role,
    password,
    verificationToken,
  });

  // ! ONLY FOR TESTING PURPOSES! CHANGE TO PRODUCTION LATER!
  const origin = "https://localhost:4200";

  // send verification email
  await sendVerificationEmail({
    name: newUser.name,
    email: newUser.email,
    verificationToken: newUser.verificationToken,
    origin: origin,
  });

  successfulRes({ res, data: newUser });
};

// Verify User Email
const verifyEmail = async (req, res) => {
  // get data from request body
  const { token, email } = req.body;

  // if no token or email, return error
  if (!token || !email) {
    return unsuccessfulRes({ res });
  }

  // find the user by email
  const foundUserByEmail = await User.findOne({ email: email });

  // if the user isVerified, return success
  if (foundUserByEmail.isVerified === true) {
    return successfulRes({ res, data: foundUserByEmail });
  }

  // find user by email
  const user = await User.findOne({ email });

  // if user not found, return error
  if (!user) {
    return unsuccessfulRes({ res, status: 400, msg: "User not found" });
  }

  // check if token is valid
  if (user.verificationToken !== token) {
    return unsuccessfulRes({ res, status: 400, msg: "Invalid token" });
  }

  // update user
  user.isVerified = true;
  user.verificationToken = null;
  user.save();

  return successfulRes({ res, data: user });
};

// Login User
const loginUser = async (req, res) => {
  // get data from request body
  const { email, password } = req.body;

  // if no email or password, return error
  if (!email || !password) {
    return unsuccessfulRes({ res });
  }

  // find user by email
  const user = await User.findOne({ email });

  // if user not found, return error
  if (!user) {
    return unauthorizedRes({ res });
  }

  // check if password is correct
  const isMatch = await user.comparePassword(password);

  // if password is not correct, return error
  if (!isMatch) {
    return unauthorizedRes({ res });
  }

  // check if user is verified
  if (!user.isVerified) {
    return unsuccessfulRes({
      res,
      status: 400,
      msg: "Please verify your email",
    });
  }

  // construct token
  const tokenUser = {
    name: user.name,
    email: user.email,
    userId: user._id,
    role: user.role,
    org: user.org,
  };

  // create refresh token
  let refreshToken = "";

  // check for exsisiting token
  const exsisitingToken = await Token.findOne({ user: user._id });

  if (exsisitingToken) {
    const { isValid } = exsisitingToken;
    if (!isValid) {
      return unauthorizedRes({ res });
    }
    // If token exsist replace it
    refreshToken = exsisitingToken.refreshToken;

    // attach cookies to response
    attachCookiesToResponse({ res, user: tokenUser, refreshToken });

    // return successful res
    successfulRes({
      res,
      data: {
        name: user.name,
        email: user.email,
        userId: user._id,
        role: user.role,
      },
    });
    return;
  }

  // Construct token
  refreshToken = crypto.randomBytes(40).toString("hex");
  const userAgent = req.headers["user-agent"];
  const ip = req.ip;

  const userToken = {
    refreshToken,
    userAgent,
    ip,
    user: user._id,
  };

  await Token.create(userToken);

  attachCookiesToResponse({ res, user: tokenUser, refreshToken });

  successfulRes({ res, data: { user: tokenUser } });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return unauthorizedRes({ res });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return unauthorizedRes({ res });
  }

  // Generate a unique token
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Set token and expiry on user profile
  user.passwordToken = resetToken;
  user.resetPasswordExpire = Date.now() + 3600000;

  await user.save();

  // Send email with reset token
  await sendResetPasswordEmail({
    name: user.name,
    email: user.email,
    url: `http://localhost:4200`,
    resetToken: resetToken,
  });

  // Send Success Email
  successfulRes({ res, data: { msg: "Reset password email has been sent" } });
};

// Reset Password Controller
const resetPassword = async (req, res) => {
  const { email, token, password } = req.body;

  if (!email || !token || !password) {
    return res.status(400).json({ msg: "Please Provide All Values" });
  }

  const user = await User.findOne({
    email: email,
    passwordToken: token,
  });

  if (!user) {
    return unsuccessfulRes({ res });
  }

  // if the experation date is already passed
  if (user.resetPasswordExpire < Date.now()) {
    return unsuccessfulRes({
      res,
      status: 400,
      msg: "Password reset token is expired",
    });
  }

  user.password = password;
  user.resetPasswordToken = ""; // Clear reset token
  user.resetPasswordExpire = ""; // Clear reset token expiry
  await user.save();

  // send success message
  successfulRes({ res, data: user });
};

// Logout User
const logoutUser = async (req, res) => {
  // get the user and delete the token
  await Token.findOneAndDelete({ user: req.user.userId });

  // clear cookies
  res.cookie("accessToken", "logout", {
    expires: new Date(Date.now()),
    httpOnly: true,
    secure: true,
  });

  res.cookie("refreshToken", "logout", {
    expires: new Date(Date.now()),
    httpOnly: true,
    secure: true,
  });

  return successfulRes({ res });
};

// Get User Profile
const me = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });

  // only return the users { role, name, and email }
  return successfulRes({
    res,
    data: {
      firstName: user.firstName,
      lastName: user.lastName,
      profilePic: user.profilePic,
      email: user.email,
      role: user.role,
    },
  });
};

// * EXPORTS * //
module.exports = {
  loginUser,
  registerUser,
  verifyEmail,
  logoutUser,
  forgotPassword,
  resetPassword,
  me,
};
