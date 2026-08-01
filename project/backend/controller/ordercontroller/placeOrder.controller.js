import Kitchen from "../../models/kitchen.model.js";
import Menu from "../../models/menu.model.js";
import Order from "../../models/order.model.js";
import { createRazorpayOrder } from "../../services/payment.service.js";
import ApiError from "../../utils/ApiError.util.js";
import asyncHandler from "../../utils/asyncHandler.util.js";

const placeOrder = asyncHandler(async (req, res) => {
  const { kitchenId, items, deliveryAddress, paymentMethod } = req.body;

  const kitchen = await Kitchen.findById(kitchenId);
  if (!kitchen) throw new ApiError(404, "Kitchen not found");
  if (!kitchen.isOpen) throw new ApiError(400, "Kitchen is currently closed");

  let subtotal = 0;
  const orderItems = [];

  for (const item of items) {
    const menuItem = await Menu.findById(item.menuItem);
    if (!menuItem)
      throw new ApiError(404, `Menu item ${item.menuItem} not found`);
    if (!menuItem.isAvailable)
      throw new ApiError(400, `${menuItem.name} is currently unavailable`);
    if (menuItem.kitchen.toString() !== kitchenId) {
      throw new ApiError(
        400,
        `${menuItem.name} does not belong to this kitchen`,
      );
    }

    const itemTotal = menuItem.price * item.quantity;
    subtotal += itemTotal;

    orderItems.push({
      menuItem: menuItem._id,
      name: menuItem.name,
      price: menuItem.price,
      quantity: item.quantity,
    });
  }

  const totalAmount = subtotal + kitchen.deliveryCharge;

  const order = new Order({
    user: req.user.id,
    kitchen: kitchenId,
    items: orderItems,
    deliveryAddress,
    subtotal,
    deliveryCharge: kitchen.deliveryCharge,
    totalAmount,
    paymentMethod: paymentMethod || "cod",
  });

  await order.save();

  for (const item of items) {
    await Menu.findByIdAndUpdate(item.menuItem, {
      $inc: { totalOrders: item.quantity },
    });
  }

  if (paymentMethod === "online" || paymentMethod === "upi") {
    const razorpayOrder = await createRazorpayOrder(
      totalAmount,
      order._id.toString(),
    );

    return res.status(201).json({
      message: "Order placed. Complete payment.",
      order,
      razorpayOrder: {
        id: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
      },
      key: process.env.RAZORPAY_KEY_ID,
    });
  }

  res.status(201).json({ message: "Order placed successfully", order });
});

export default placeOrder;