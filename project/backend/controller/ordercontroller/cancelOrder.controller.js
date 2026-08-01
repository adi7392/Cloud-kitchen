import Order from "../../models/order.model.js";
import ApiError from "../../utils/ApiError.util.js";
import asyncHandler from "../../utils/asyncHandler.util.js";

const cancelOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { reason } = req.body;

  const order = await Order.findById(orderId);
  if (!order) throw new ApiError(404, "Order not found");

  if (order.user.toString() !== req.user.id) {
    throw new ApiError(403, "Access denied");
  }

  const nonCancellable = [
    "preparing",
    "out_for_delivery",
    "delivered",
    "cancelled",
  ];
  if (nonCancellable.includes(order.orderStatus)) {
    throw new ApiError(400, `Cannot cancel order that is ${order.orderStatus}`);
  }

  order.orderStatus = "cancelled";
  order.cancelReason = reason || "";

  if (order.paymentStatus === "paid") {
    order.paymentStatus = "refunded";
  }

  await order.save();

  res.status(200).json({ message: "Order cancelled successfully", order });
});

export default cancelOrder;