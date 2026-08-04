import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { cancelOrder, fetchMyOrders } from "../redux/slices/orderSlice";

const statusColors = {
  placed: "bg-blue-100 text-blue-700",
  confirmed: "bg-indigo-100 text-indigo-700",
  preparing: "bg-yellow-100 text-yellow-700",
  out_for_delivery: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const MyOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  const handleCancel = async (orderId) => {
    if (!confirm("Are you sure you want to cancel?")) return;
    const result = await dispatch(
      cancelOrder({ orderId, reason: "Changed my mind" }),
    );
    if (result.meta.requestStatus === "fulfilled") {
      toast.success("Order cancelled");
    } else {
      toast.error(result.payload || "Cannot cancel");
    }
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-center">No orders yet</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-xl shadow-sm p-5">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">
                    {order.kitchen?.name || "Kitchen"}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {order.items
                      .map((i) => `${i.name} x${i.quantity}`)
                      .join(", ")}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">₹{order.totalAmount}</p>
                  <span
                    className={`inline-block mt-1 text-xs px-2 py-1 rounded-full ${statusColors[order.orderStatus] || "bg-gray-100"}`}
                  >
                    {order.orderStatus.replace(/_/g, " ")}
                  </span>
                </div>
              </div>
              {(order.orderStatus === "placed" ||
                order.orderStatus === "confirmed") && (
                <button
                  onClick={() => handleCancel(order._id)}
                  className="mt-3 text-red-500 text-sm hover:underline"
                >
                  Cancel Order
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;