import Order from "../../models/order.model.js";
import ApiError from "../../utils/ApiError.util.js";
import asyncHandler from "../../utils/asyncHandler.util.js";

const getOrderById = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  const order = await Order.findById(orderId)
    .populate("kitchen", "name image address")
    .populate("user", "username email");

  if (!order) throw new ApiError(404, "Order not found");

  if (order.user._id.toString() !== req.user.id) {
    throw new ApiError(403, "Access denied");
  }

  res.status(200).json({ order });
});

export default getOrderById;