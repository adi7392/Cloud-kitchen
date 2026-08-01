import User from "../../models/user.model";
import ApiError from "../../utils/ApiError.util";
import asyncHandler from "../../utils/asyncHandler.util";

const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  if (!user) throw new ApiError(404, "User not found");

  res.status(200).json({ user });
});

export default getProfile;