import Menu from "../../models/menu.model.js";
import ApiError from "../../utils/ApiError.util.js";
import asyncHandler from "../../utils/asyncHandler.util.js";
import deleteImage from "../../utils/deleteImage.util.js";

const deleteMenuItem = asyncHandler(async (req, res) => {
  const { menuItemId } = req.params;

  const menuItem = await Menu.findById(menuItemId);
  if (!menuItem) throw new ApiError(404, "Menu item not found");

  if (menuItem.kitchen.toString() !== req.kitchen._id.toString()) {
    throw new ApiError(403, "This item does not belong to your kitchen");
  }

  if (menuItem.image.public_id) {
    await deleteImage(menuItem.image.public_id);
  }

  await Menu.findByIdAndDelete(menuItemId);

  // Invalidate menu cache for this kitchen
  await invalidateCache(`cache:*/api/v1/menu/kitchen/${req.kitchen._id}*`);

  res.status(200).json({ message: "Menu item deleted successfully" });
});

export default deleteMenuItem;