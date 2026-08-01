import Kitchen from "../../models/kitchen.model.js";
import asyncHandler from "../../utils/asyncHandler.util.js";

const getMyKitchens = asyncHandler(async (req, res) => {
  const kitchens = await Kitchen.find({ owner: req.user.id }).sort({
    createdAt: -1,
  });

  res.status(200).json({ kitchens });
});

export default getMyKitchens;