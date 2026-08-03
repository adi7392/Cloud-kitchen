import express from "express";
import cancelOrder from "../controller/ordercontroller/cancelOrder.controller.js";
import getMyOrders from "../controller/ordercontroller/getMyOrders.controller.js";
import getOrderById from "../controller/ordercontroller/getOrderById.controller.js";
import placeOrder from "../controller/ordercontroller/placeOrder.controller.js";
import verifyPayment from "../controller/ordercontroller/verifyPayment.controller.js";
import verificationToken from "../middleware/verifyToken.middle.js";
import { validateOrder } from "../validator/order.validator.js";

const orderRoute = express.Router();

// All order routes require authentication
orderRoute.use(verificationToken);

orderRoute.post("/place", validateOrder, placeOrder);
orderRoute.get("/my-orders", getMyOrders);
orderRoute.get("/:orderId", getOrderById);
orderRoute.patch("/:orderId/cancel", cancelOrder);
orderRoute.post("/verify-payment", verifyPayment);

export default orderRoute;