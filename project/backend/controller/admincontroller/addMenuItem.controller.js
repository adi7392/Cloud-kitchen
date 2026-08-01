import Menu from "../../models/menu.model.js";
import asyncHandler from "../../utils/asyncHandler.util.js";
import uploadImage from "../../utils/uploadImage.util.js";

const addMenuItem = asyncHandler(async (req, res) => {
  const { name, description, price, category, foodType } = req.body;
  const kitchenId = req.params.kitchenId || req.body.kitchenId;

  const menuData = {
    name,
    description: description || "",
    price,
    category,
    foodType,
    kitchen: kitchenId,
  };

  if (req.file) {
    const imageResult = await uploadImage(req.file.buffer, "menu-items");
    menuData.image = imageResult;
  }

  const menuItem = new Menu(menuData);
  await menuItem.save();

  // Invalidate menu cache for this kitchen
  await invalidateCache(`cache:*/api/v1/menu/kitchen/${kitchenId}*`);

  res.status(201).json({ message: "Menu item added successfully", menuItem });
});

export default addMenuItem;