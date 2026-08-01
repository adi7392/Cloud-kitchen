import Order from "../../models/order.model.js";
import ApiError from "../../utils/ApiError.util.js";
import asyncHandler from "../../utils/asyncHandler.util.js";

const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { orderStatus } = req.body;

  const validStatuses = [
    "confirmed",
    "preparing",
    "out_for_delivery",
    "delivered",
    "cancelled",
  ];
  if (!orderStatus || !validStatuses.includes(orderStatus)) {
    throw new ApiError(
      400,
      `Status must be one of: ${validStatuses.join(", ")}`,
    );
  }

  const order = await Order.findById(orderId);
  if (!order) throw new ApiError(404, "Order not found");

  if (order.kitchen.toString() !== req.kitchen._id.toString()) {
    throw new ApiError(403, "This order does not belong to your kitchen");
  }

  if (order.orderStatus === "delivered" || order.orderStatus === "cancelled") {
    throw new ApiError(
      400,
      `Cannot update order that is already ${order.orderStatus}`,
    );
  }

  // Validate status transitions (must follow sequential flow, or cancel from any state)
  const statusFlow = [
    "placed",
    "confirmed",
    "preparing",
    "out_for_delivery",
    "delivered",
  ];
  if (orderStatus !== "cancelled") {
    const currentIdx = statusFlow.indexOf(order.orderStatus);
    const nextIdx = statusFlow.indexOf(orderStatus);
    if (nextIdx <= currentIdx) {
      throw new ApiError(
        400,
        `Cannot move from "${order.orderStatus}" to "${orderStatus}". Status can only move forward.`,
      );
    }
  }

  order.orderStatus = orderStatus;

  if (orderStatus === "delivered") {
    order.deliveredAt = new Date();
    order.paymentStatus = "paid";
  }

  if (orderStatus === "cancelled") {
    order.paymentStatus = "refunded";
  }

  await order.save();

  res.status(200).json({ message: "Order status updated", order });
});

export default updateOrderStatus;