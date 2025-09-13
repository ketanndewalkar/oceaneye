import User from "../models/user.models.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";

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
  const registerUser = await User.findOne({ email }).select("-password");

  return res
    .status(201)
    .json(new ApiResponse(201, registerUser, "User registerd succesfully"));
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
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  };

  return res
    .status(200)
    .cookie("AccessToken", AccessToken, cookieOptions)
    .json(new ApiResponse(200, user, "User logged In succesfully"));
});

export const getMe = asyncHandler(async (req, res) => {
   const user = req.user
   console.log(user)

  if (!user) {
    throw new ApiError(404, "No user found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, user, "Profile fetched Succesfully"));
});

export const loggedOut = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .clearCookie("AccessToken", {})
    .json(new ApiResponse(200, null, "User logged out Succesfully"));
});
