import Menu from "../../models/menu.model.js";
import ApiError from "../../utils/ApiError.util.js";
import asyncHandler from "../../utils/asyncHandler.util.js";
import deleteImage from "../../utils/deleteImage.util.js";
import uploadImage from "../../utils/uploadImage.util.js";

const updateMenuItem = asyncHandler(async (req, res) => {
  const { menuItemId } = req.params;
  const { name, description, price, category, foodType, isAvailable } =
    req.body;

  const menuItem = await Menu.findById(menuItemId);
  if (!menuItem) throw new ApiError(404, "Menu item not found");

  if (menuItem.kitchen.toString() !== req.kitchen._id.toString()) {
    throw new ApiError(403, "This item does not belong to your kitchen");
  }

  if (name) menuItem.name = name;
  if (description !== undefined) menuItem.description = description;
  if (price !== undefined) menuItem.price = price;
  if (category) menuItem.category = category;
  if (foodType) menuItem.foodType = foodType;
  if (isAvailable !== undefined) menuItem.isAvailable = isAvailable;

  if (req.file) {
    if (menuItem.image.public_id) {
      await deleteImage(menuItem.image.public_id);
    }
    const imageResult = await uploadImage(req.file.buffer, "menu-items");
    menuItem.image = imageResult;
  }

  await menuItem.save();

  res.status(200).json({ message: "Menu item updated successfully", menuItem });
});

export default updateMenuItem;