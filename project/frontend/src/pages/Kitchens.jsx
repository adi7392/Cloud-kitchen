import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

const Kitchens = () => {
  const [kitchens, setKitchens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchKitchens();
  }, []);

  const fetchKitchens = async (query = "") => {
    setLoading(true);
    try {
      const params = query ? { search: query } : {};
      const { data } = await api.get("/kitchens", { params });
      setKitchens(data.kitchens);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchKitchens(search);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Explore Kitchens</h1>

      <form onSubmit={handleSearch} className="mb-8 flex gap-2">
        <input
          type="text"
          placeholder="Search kitchens..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button
          type="submit"
          className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
        >
          Search
        </button>
      </form>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : kitchens.length === 0 ? (
        <p className="text-center text-gray-500">No kitchens found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kitchens.map((kitchen) => (
            <Link
              key={kitchen._id}
              to={`/kitchens/${kitchen._id}`}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
            >
              <img
                src={
                  kitchen.image?.url ||
                  "https://via.placeholder.com/400x200?text=Kitchen"
                }
                alt={kitchen.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{kitchen.name}</h3>
                <p className="text-gray-500 text-sm mt-1">
                  {kitchen.cuisine?.join(", ")}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-sm text-gray-600">
                    ⭐ {kitchen.rating || 0}
                  </span>
                  <span className="text-sm text-gray-600">
                    🕒 {kitchen.deliveryTime} min
                  </span>
                  <span className="text-sm text-green-600 font-medium">
                    {kitchen.deliveryCharge === 0
                      ? "Free Delivery"
                      : `₹${kitchen.deliveryCharge}`}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Kitchens;