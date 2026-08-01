import Order from "../../models/order.model.js";
import asyncHandler from "../../utils/asyncHandler.util.js";

const getMyOrders = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 10 } = req.query;

  const filter = { user: req.user.id };
  if (status) filter.orderStatus = status;

  const orders = await Order.find(filter)
    .populate("kitchen", "name image")
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const total = await Order.countDocuments(filter);

  res.status(200).json({
    orders,
    pagination: {
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    },
  });
});

export default getMyOrders;