import User from "../models/user.models.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import {
  emailVerificationMailgenContent,
  forgotPasswordMailgenContent,
  sendEmail,
} from "../utils/mail.js";
import crypto from "crypto";

export const register = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, phoneNo, password, role } = req.body;

  if (!firstName || !email || !phoneNo || !password) {
    throw new ApiError(401, "All fields are required");
  }
  const existingUser = await User.findOne({
    email,
  });
  if (existingUser) {
    throw new ApiError(401, "User Already exists");
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    phoneNo,
    role,
  });

  if (!user) {
    throw new ApiError(500, "Issue while registering");
  }
  const emailVerificationToken = crypto.randomBytes(32).toString("hex");
  console.log(emailVerificationToken);
  const hashedToken = crypto
    .createHash("sha256")
    .update(emailVerificationToken)
    .digest("hex");

  user.emailVerificationToken = hashedToken;
  user.emailVerificationExpiry = Date.now() + 10 * 60 * 1000;
  await user.save({ validateBeforeSave: false });
  const emailUrl = `${process.env.BASE_URL}/api/v1/users/verify-email/${emailVerificationToken}`;
  
  const registerUser = await User.findOne({ email }).select("-password");

  res
    .status(201)
    .json(new ApiResponse(201, registerUser, "User registerd succesfully"));
    await sendEmail({
    email: user.email,
    subject: "Please verify your email",
    mailgenContent: emailVerificationMailgenContent(
      user?.username,
      `${emailUrl}`
    ),
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(401, "All fields are required");
  }
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    throw new ApiError(404, "No User Found!Please register first!!");
  }
  const isMatched = await existingUser.isPasswordCorrect(password);

  if (!isMatched) {
    throw new ApiError(401, "Invalid credientials either email or password");
  }
  const AccessToken = existingUser.generateAccessToken();
  const user = await User.findOne({ email }).select("-password");
  const cookieOptions = {
    httpOnly: true,
    sameSite : "none",
    secure: false,
    path : '/',
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    
  };

  return res
    .status(200)
    .cookie("token", AccessToken, cookieOptions)
    .json(new ApiResponse(200, user, "User logged In succesfully"));
});

export const getMe = asyncHandler(async (req, res) => {
  const user = req.user;
  console.log(user);

  if (!user) {
    throw new ApiError(404, "No user found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, user, "Profile fetched Succesfully"));
});

export const logOut = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .clearCookie("AccessToken", {})
    .json(new ApiResponse(200, null, "User logged out Succesfully"));
});
export const verifyEmail = asyncHandler(async (req, res) => {
  const { emailVerificationToken } = req.params;

  const token = emailVerificationToken.trim();

  console.log("token in verify controller", token);
  if (!emailVerificationToken) {
    throw new ApiError(401, "no token found");
  }
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    $and: [
      { emailVerificationToken: hashedToken },
      { emailVerificationExpiry: { $gt: Date.now() } },
    ],
  });

  if (!user) {
    throw new ApiError(401, "Invalid token");
  }
  user.isEmailVerified = true;
  user.emailVerificationToken = undefined;
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Email verified Succesfully"));
});

export const forgotPasswordRequest = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, "Invalid token");
  }
  const unhashedToken = crypto.randomBytes(32).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(unhashedToken)
    .digest("hex");

  user.forgotPasswordToken = hashedToken;
  user.forgotPasswordExpiry = Date.now() + 10 * 60 * 1000;

  user.save({ validateBeforeSave: false });
  const resetUrl = `${process.env.BASE_URL}/api/v1/auth/reset-password/${unhashedToken}`;
  // console.log(unhashedToken)
  await sendEmail({
    email: user.email,
    subject: "Please click button to reset password",
    mailgenContent: forgotPasswordMailgenContent(user?.username, `${resetUrl}`),
  });
  res
    .status(200)
    .json(new ApiResponse(200, null, "Check your inbox for reset url"));
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { resetToken } = req.params;

  const { password, confirmPassword } = req.body;

  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user = await User.findOne({
    forgotPasswordToken: hashedToken,
    forgotPasswordExpiry: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(401, "Invalid token");
  }

  if (password !== confirmPassword) {
    throw new ApiError(400, "Password and confirm password do not match");
  }

  user.password = password;
  user.forgotPassword = undefined;
  user.forgotPasswordExpiry = undefined;

  await user.save({ validateBeforeSave: false });

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "",
        "Password reset successfully. You can log in now."
      )
    );
});
