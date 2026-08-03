import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Home = () => {
  const { darkMode } = useTheme();

  return (
    <div
      className={`min-h-screen ${
        darkMode
          ? "bg-gray-900"
          : "bg-gradient-to-br from-orange-50 to-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1
          className={`text-5xl font-bold mb-4 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Fresh Food, Delivered{" "}
          <span className={darkMode ? "text-orange-400" : "text-orange-500"}>
            Fast
          </span>
        </h1>
        <p
          className={`text-lg mb-8 max-w-2xl mx-auto ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Order from the best cloud kitchens in your city. Fresh meals prepared
          by expert chefs, delivered to your doorstep.
        </p>
        <Link
          to="/kitchens"
          className="inline-block bg-orange-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-600 transition"
        >
          Explore Kitchens
        </Link>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            className={`p-6 rounded-xl shadow-sm ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="text-4xl mb-3">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=80&h=80&fit=crop"
                alt="Wide Variety"
                className="w-16 h-16 rounded-full mx-auto object-cover"
              />
            </div>
            <h3
              className={`text-xl font-semibold mb-2 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Wide Variety
            </h3>
            <p className={darkMode ? "text-gray-400" : "text-gray-500"}>
              Veg, Non-Veg, Vegan — choose from multiple cuisines
            </p>
          </div>
          <div
            className={`p-6 rounded-xl shadow-sm ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="text-4xl mb-3">
              <img
                src="https://images.unsplash.com/photo-1526367790999-0150786686a2?w=80&h=80&fit=crop"
                alt="Fast Delivery"
                className="w-16 h-16 rounded-full mx-auto object-cover"
              />
            </div>
            <h3
              className={`text-xl font-semibold mb-2 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Fast Delivery
            </h3>
            <p className={darkMode ? "text-gray-400" : "text-gray-500"}>
              Get your food delivered in 30 minutes or less
            </p>
          </div>
          <div
            className={`p-6 rounded-xl shadow-sm ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="text-4xl mb-3">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=80&h=80&fit=crop"
                alt="Easy Payments"
                className="w-16 h-16 rounded-full mx-auto object-cover"
              />
            </div>
            <h3
              className={`text-xl font-semibold mb-2 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Easy Payments
            </h3>
            <p className={darkMode ? "text-gray-400" : "text-gray-500"}>
              Pay via UPI, Card, or Cash on Delivery
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;