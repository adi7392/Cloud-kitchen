import express from "express";
import upload from "../config/multer.config.js";
import addMenuItem from "../controller/admincontroller/addMenuItem.controller.js";
import createKitchen from "../controller/admincontroller/createKitchen.controller.js";
import deleteMenuItem from "../controller/admincontroller/deleteMenuItem.controller.js";
import getKitchenOrders from "../controller/admincontroller/getKitchenOrders.controller.js";
import getMyKitchens from "../controller/admincontroller/getMyKitchens.controller.js";
import updateMenuItem from "../controller/admincontroller/updateMenuItem.controller.js";
import updateOrderStatus from "../controller/admincontroller/updateOrderStatus.controller.js";
import isAdmin from "../middleware/isAdmin.middle.js";
import isKitchenOwner from "../middleware/isKitchenOwner.middle.js";
import verificationToken from "../middleware/verifyToken.middle.js";
import { validateMenuItem } from "../validator/menu.validator.js";

const adminRoute = express.Router();

// All admin routes require auth + admin role
adminRoute.use(verificationToken, isAdmin);

// Kitchen
adminRoute.get("/my-kitchens", getMyKitchens);
adminRoute.post("/kitchen", upload.single("image"), createKitchen);

// Menu CRUD
adminRoute.post(
  "/kitchen/:kitchenId/menu",
  isKitchenOwner,
  upload.single("image"),
  validateMenuItem,
  addMenuItem,
);
adminRoute.put(
  "/kitchen/:kitchenId/menu/:menuItemId",
  isKitchenOwner,
  upload.single("image"),
  updateMenuItem,
);
adminRoute.delete(
  "/kitchen/:kitchenId/menu/:menuItemId",
  isKitchenOwner,
  deleteMenuItem,
);

// Orders
adminRoute.get("/kitchen/:kitchenId/orders", isKitchenOwner, getKitchenOrders);
adminRoute.patch(
  "/kitchen/:kitchenId/orders/:orderId/status",
  isKitchenOwner,
  updateOrderStatus,
);

export default adminRoute;