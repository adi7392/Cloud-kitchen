import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
    clearCart,
    removeFromCart,
    updateQuantity,
} from "../redux/slices/cartSlice";
import { placeOrder } from "../redux/slices/orderSlice";

const Cart = () => {
  const { items, kitchenId, kitchenName } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });
  const [showAddress, setShowAddress] = useState(false);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handlePlaceOrder = async () => {
    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }
    if (
      !address.street ||
      !address.city ||
      !address.state ||
      !address.pincode ||
      !address.phone
    ) {
      toast.error("Please fill all address fields");
      return;
    }

    const result = await dispatch(
      placeOrder({
        kitchenId,
        items: items.map((i) => ({
          menuItem: i.menuItem,
          quantity: i.quantity,
        })),
        deliveryAddress: address,
        paymentMethod: "cod",
      }),
    );

    if (result.meta.requestStatus === "fulfilled") {
      toast.success("Order placed successfully!");
      dispatch(clearCart());
      navigate("/my-orders");
    } else {
      toast.error(result.payload || "Failed to place order");
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">
          Add items from a kitchen to get started
        </p>
        <Link
          to="/kitchens"
          className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
        >
          Browse Kitchens
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Your Cart</h1>
      <p className="text-gray-500 mb-6">
        From: <span className="font-medium text-gray-700">{kitchenName}</span>
      </p>

      {/* Cart Items */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.menuItem}
              className="flex justify-between items-center border-b pb-3"
            >
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">₹{item.price} each</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          menuItem: item.menuItem,
                          quantity: item.quantity - 1,
                        }),
                      )
                    }
                    className="px-3 py-1 text-lg hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 font-medium">{item.quantity}</span>
                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          menuItem: item.menuItem,
                          quantity: item.quantity + 1,
                        }),
                      )
                    }
                    className="px-3 py-1 text-lg hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <span className="font-semibold w-16 text-right">
                  ₹{item.price * item.quantity}
                </span>
                <button
                  onClick={() => dispatch(removeFromCart(item.menuItem))}
                  className="text-red-500 text-sm hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t mt-4 pt-4 flex justify-between text-lg font-bold">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>
      </div>

      {/* Delivery Address */}
      {!showAddress ? (
        <button
          onClick={() => setShowAddress(true)}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
        >
          Proceed to Checkout
        </button>
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Delivery Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Street *"
              value={address.street}
              onChange={(e) =>
                setAddress({ ...address, street: e.target.value })
              }
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="text"
              placeholder="City *"
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="text"
              placeholder="State *"
              value={address.state}
              onChange={(e) =>
                setAddress({ ...address, state: e.target.value })
              }
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="text"
              placeholder="Pincode *"
              value={address.pincode}
              onChange={(e) =>
                setAddress({ ...address, pincode: e.target.value })
              }
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="text"
              placeholder="Phone *"
              value={address.phone}
              onChange={(e) =>
                setAddress({ ...address, phone: e.target.value })
              }
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 md:col-span-2"
            />
          </div>
          <button
            onClick={handlePlaceOrder}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
          >
            Place Order (COD) — ₹{subtotal}
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;