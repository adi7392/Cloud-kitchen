import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/axios";

const ManageMenu = () => {
  const [kitchens, setKitchens] = useState([]);
  const [selectedKitchen, setSelectedKitchen] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "veg",
    foodType: "main-course",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchKitchens();
  }, []);

  useEffect(() => {
    if (selectedKitchen) fetchMenu();
  }, [selectedKitchen]);

  const fetchKitchens = async () => {
    const { data } = await api.get("/admin/my-kitchens");
    setKitchens(data.kitchens);
    if (data.kitchens.length > 0) setSelectedKitchen(data.kitchens[0]._id);
  };

  const fetchMenu = async () => {
    const { data } = await api.get(`/menu/kitchen/${selectedKitchen}`);
    setMenuItems(data.menuItems);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    if (image) formData.append("image", image);

    try {
      await api.post(`/admin/kitchen/${selectedKitchen}/menu`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Menu item added");
      setForm({
        name: "",
        description: "",
        price: "",
        category: "veg",
        foodType: "main-course",
      });
      setImage(null);
      setShowForm(false);
      fetchMenu();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add item");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (menuItemId) => {
    if (!confirm("Delete this item?")) return;
    try {
      await api.delete(`/admin/kitchen/${selectedKitchen}/menu/${menuItemId}`);
      toast.success("Item deleted");
      fetchMenu();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Manage Menu</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
        >
          {showForm ? "Cancel" : "+ Add Item"}
        </button>
      </div>

      {/* Kitchen Selector */}
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

      {/* Add Item Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Item name *"
                value={form.name}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
              <input
                type="number"
                name="price"
                placeholder="Price *"
                value={form.price}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-4 py-2"
              >
                <option value="veg">Veg</option>
                <option value="non-veg">Non-Veg</option>
                <option value="egg">Egg</option>
                <option value="vegan">Vegan</option>
              </select>
              <select
                name="foodType"
                value={form.foodType}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-4 py-2"
              >
                <option value="starter">Starter</option>
                <option value="main-course">Main Course</option>
                <option value="dessert">Dessert</option>
                <option value="beverage">Beverage</option>
                <option value="snack">Snack</option>
                <option value="thali">Thali</option>
              </select>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Item"}
            </button>
          </form>
        </div>
      )}

      {/* Menu Items List */}
      {menuItems.length === 0 ? (
        <p className="text-gray-500 text-center">No menu items yet. Add one!</p>
      ) : (
        <div className="space-y-3">
          {menuItems.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-sm p-4 flex justify-between items-center"
            >
              <div className="flex gap-4 items-center">
                <img
                  src={item.image?.url || "https://via.placeholder.com/60"}
                  alt={item.name}
                  className="w-14 h-14 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    {item.category} • {item.foodType} • ₹{item.price}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleDelete(item._id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageMenu;