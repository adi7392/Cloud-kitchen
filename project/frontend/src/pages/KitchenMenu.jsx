import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import api from "../api/axios";
import { addToCart, updateQuantity } from "../redux/slices/cartSlice";

const KitchenMenu = () => {
  const { kitchenId } = useParams();
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const [kitchen, setKitchen] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchData();
  }, [kitchenId, category]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [kitchenRes, menuRes] = await Promise.all([
        api.get(`/kitchens/${kitchenId}`),
        api.get(`/menu/kitchen/${kitchenId}`, {
          params: category ? { category } : {},
        }),
      ]);
      setKitchen(kitchenRes.data.kitchen);
      setMenuItems(menuRes.data.menuItems);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (item) => {
    dispatch(
      addToCart({
        menuItem: item._id,
        name: item.name,
        price: item.price,
        kitchenId,
        kitchenName: kitchen.name,
      }),
    );
    toast.success(`${item.name} added to cart`);
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!kitchen) return <p className="text-center py-10">Kitchen not found</p>;

  const categories = ["", "veg", "non-veg", "egg", "vegan"];
  const cartItemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Kitchen Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8 flex gap-6 items-center">
        <img
          src={kitchen.image?.url || "https://via.placeholder.com/120"}
          alt={kitchen.name}
          className="w-28 h-28 rounded-lg object-cover"
        />
        <div>
          <h1 className="text-3xl font-bold">{kitchen.name}</h1>
          <p className="text-gray-500 mt-1">{kitchen.cuisine?.join(", ")}</p>
          <div className="flex gap-4 mt-2 text-sm text-gray-600">
            <span>⭐ {kitchen.rating}</span>
            <span>🕒 {kitchen.deliveryTime} min</span>
            <span>
              {kitchen.deliveryCharge === 0
                ? "Free Delivery"
                : `₹${kitchen.deliveryCharge} delivery`}
            </span>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm border ${category === cat ? "bg-orange-500 text-white border-orange-500" : "border-gray-300 text-gray-600 hover:border-orange-400"}`}
          >
            {cat || "All"}
          </button>
        ))}
      </div>

      {/* Menu Items */}
      {menuItems.length === 0 ? (
        <p className="text-gray-500">No items available</p>
      ) : (
        <div className="space-y-4">
          {menuItems.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-sm p-4 flex justify-between items-center"
            >
              <div className="flex gap-4 items-center">
                <img
                  src={item.image?.url || "https://via.placeholder.com/80"}
                  alt={item.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded ${item.category === "veg" || item.category === "vegan" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                  >
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">₹{item.price}</p>
                {(() => {
                  const cartItem = items.find((ci) => ci.menuItem === item._id);
                  if (cartItem) {
                    return (
                      <div className="mt-2 flex items-center border border-orange-500 rounded-lg overflow-hidden">
                        <button
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                menuItem: item._id,
                                quantity: cartItem.quantity - 1,
                              }),
                            )
                          }
                          className="px-3 py-1 text-orange-500 hover:bg-orange-50 font-bold"
                        >
                          −
                        </button>
                        <span className="px-3 py-1 font-semibold text-orange-600">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                menuItem: item._id,
                                quantity: cartItem.quantity + 1,
                              }),
                            )
                          }
                          className="px-3 py-1 text-orange-500 hover:bg-orange-50 font-bold"
                        >
                          +
                        </button>
                      </div>
                    );
                  }
                  return (
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="mt-2 bg-orange-500 text-white px-4 py-1 rounded-lg text-sm hover:bg-orange-600"
                    >
                      Add +
                    </button>
                  );
                })()}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Floating Cart Badge */}
      {cartItemCount > 0 && (
        <Link
          to="/cart"
          className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-700 flex items-center gap-2"
        >
          🛒 {cartItemCount} items in cart
        </Link>
      )}
    </div>
  );
};

export default KitchenMenu;