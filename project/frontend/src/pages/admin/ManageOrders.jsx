import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/axios";

const statusFlow = [
  "placed",
  "confirmed",
  "preparing",
  "out_for_delivery",
  "delivered",
];

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [kitchens, setKitchens] = useState([]);
  const [selectedKitchen, setSelectedKitchen] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchKitchens();
  }, []);

  useEffect(() => {
    if (selectedKitchen) fetchOrders();
  }, [selectedKitchen]);

  const fetchKitchens = async () => {
    const { data } = await api.get("/admin/my-kitchens");
    setKitchens(data.kitchens);
    if (data.kitchens.length > 0) setSelectedKitchen(data.kitchens[0]._id);
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(
        `/admin/kitchen/${selectedKitchen}/orders`,
      );
      setOrders(data.orders);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      await api.patch(
        `/admin/kitchen/${selectedKitchen}/orders/${orderId}/status`,
        { orderStatus: newStatus },
      );
      toast.success(`Order marked as ${newStatus}`);
      fetchOrders();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update");
    }
  };

  const getNextStatus = (current) => {
    const idx = statusFlow.indexOf(current);
    if (idx === -1 || idx >= statusFlow.length - 1) return null;
    return statusFlow[idx + 1];
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Manage Orders</h1>

      {kitchens.length > 1 && (
        <select
          value={selectedKitchen}
          onChange={(e) => setSelectedKitchen(e.target.value)}
          className="mb-6 border border-gray-300 rounded-lg px-4 py-2"
        >
          {kitchens.map((k) => (
            <option key={k._id} value={k._id}>
              {k.name}
            </option>
          ))}
        </select>
      )}

      {orders.length === 0 ? (
        <p className="text-gray-500 text-center">No orders yet</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const nextStatus = getNextStatus(order.orderStatus);
            return (
              <div
                key={order._id}
                className="bg-white rounded-xl shadow-sm p-5"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-mono text-xs text-gray-400">
                      #{order._id.slice(-8)}
                    </p>
                    <p className="font-semibold mt-1">
                      {order.user?.username || "Customer"} — {order.user?.email}
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
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 inline-block mt-1">
                      {order.orderStatus.replace(/_/g, " ")}
                    </span>
                    <p className="text-xs text-gray-400 mt-1">
                      {order.paymentMethod.toUpperCase()}
                    </p>
                  </div>
                </div>

                {order.orderStatus !== "delivered" &&
                  order.orderStatus !== "cancelled" && (
                    <div className="mt-4 flex gap-2">
                      {nextStatus && (
                        <button
                          onClick={() => updateStatus(order._id, nextStatus)}
                          className="bg-blue-500 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-blue-600"
                        >
                          Mark as {nextStatus.replace(/_/g, " ")}
                        </button>
                      )}
                      <button
                        onClick={() => updateStatus(order._id, "cancelled")}
                        className="bg-red-100 text-red-600 px-4 py-1.5 rounded-lg text-sm hover:bg-red-200"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ManageOrders;