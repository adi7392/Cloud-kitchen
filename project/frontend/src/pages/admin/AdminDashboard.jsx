import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [kitchen, setKitchen] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const loadDashboard = async () => {
      try {
        const { data } = await api.get("/admin/my-kitchens");
        if (ignore) return;
        if (data.kitchens.length > 0) {
          setKitchen(data.kitchens[0]);
          const ordersRes = await api.get(
            `/admin/kitchen/${data.kitchens[0]._id}/orders`,
          );
          if (ignore) return;
          setOrders(ordersRes.data.orders);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    loadDashboard();

    return () => {
      ignore = true;
    };
  }, []);

  if (loading) return <p className="text-center py-10">Loading...</p>;

  if (!kitchen) {
    return (
      <div className="text-center py-10">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <p className="text-gray-500 mb-4">You haven't created a kitchen yet.</p>
        <Link
          to="/admin/kitchen"
          className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
        >
          Create Your Kitchen
        </Link>
      </div>
    );
  }

  const pendingOrders = orders.filter((o) => o.orderStatus === "placed").length;
  const preparingOrders = orders.filter(
    (o) => o.orderStatus === "preparing",
  ).length;
  const deliveredOrders = orders.filter(
    (o) => o.orderStatus === "delivered",
  ).length;
  const totalRevenue = orders
    .filter((o) => o.orderStatus === "delivered")
    .reduce((sum, o) => sum + o.totalAmount, 0);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500">New Orders</p>
          <p className="text-3xl font-bold text-blue-600">{pendingOrders}</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500">Preparing</p>
          <p className="text-3xl font-bold text-yellow-600">
            {preparingOrders}
          </p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500">Delivered</p>
          <p className="text-3xl font-bold text-green-600">{deliveredOrders}</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500">Revenue</p>
          <p className="text-3xl font-bold text-orange-600">₹{totalRevenue}</p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Link
          to="/admin/kitchen"
          className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition text-center"
        >
          <div className="text-3xl mb-2">🏪</div>
          <p className="font-semibold">Manage Kitchen</p>
        </Link>
        <Link
          to="/admin/menu"
          className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition text-center"
        >
          <div className="text-3xl mb-2">📋</div>
          <p className="font-semibold">Manage Menu</p>
        </Link>
        <Link
          to="/admin/orders"
          className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition text-center"
        >
          <div className="text-3xl mb-2">📦</div>
          <p className="font-semibold">Manage Orders</p>
        </Link>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-bold mb-4">Recent Orders</h2>
        {orders.length === 0 ? (
          <p className="text-gray-500">No orders yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-3">Order ID</th>
                  <th className="text-left p-3">Customer</th>
                  <th className="text-left p-3">Items</th>
                  <th className="text-left p-3">Amount</th>
                  <th className="text-left p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((order) => (
                  <tr key={order._id} className="border-t">
                    <td className="p-3 font-mono text-xs">
                      {order._id.slice(-8)}
                    </td>
                    <td className="p-3">{order.user?.username || "N/A"}</td>
                    <td className="p-3">{order.items.length} items</td>
                    <td className="p-3 font-semibold">₹{order.totalAmount}</td>
                    <td className="p-3">
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100">
                        {order.orderStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;