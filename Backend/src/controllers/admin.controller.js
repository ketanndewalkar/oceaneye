import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import User from "../models/user.models.js";

export const changeRole = asyncHandler(async (req, res) => {
  const UserRole = req.user.role

  if(UserRole!= "admin"){
    throw new ApiError(400,"You do not have permission to change role of user")
  }
  const { email, role } = req.body;

  if (!email || !role) {
    throw new ApiError("Both fields are required");
  }

  const user = await User.findOne({ email }).select("-password");

  if (!user) {
    throw new ApiError(404, "No user found");
  }
  if (user.role === role) {
    throw new ApiError("User already have that role");
  }
  user.role = role;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Users role updated Succesfully"));
});
