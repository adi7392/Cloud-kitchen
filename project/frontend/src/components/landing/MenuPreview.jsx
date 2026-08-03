import { useState } from "react";
import { Link } from "react-router-dom";

const MenuPreview = () => {
  const [activeCategory, setActiveCategory] = useState("snacks");

  const categories = [
    { id: "snacks", name: "Snacks" },
    { id: "main-course", name: "Main Course" },
    { id: "beverages", name: "Beverages" },
    { id: "breads", name: "Breads" },
  ];

  const menuItems = {
    snacks: [
      { name: "Paneer Tikka", price: "₹180" },
      { name: "Veg Spring Rolls", price: "₹120" },
      { name: "Chicken Wings", price: "₹220" },
      { name: "Masala Fries", price: "₹100" },
      { name: "Samosa (2 pcs)", price: "₹60" },
      { name: "Aloo Tikki", price: "₹80" },
    ],
    "main-course": [
      { name: "Butter Chicken", price: "₹280" },
      { name: "Dal Makhani", price: "₹200" },
      { name: "Paneer Butter Masala", price: "₹240" },
      { name: "Chicken Biryani", price: "₹260" },
      { name: "Veg Pulao", price: "₹180" },
      { name: "Fish Curry", price: "₹320" },
      { name: "Mutton Rogan Josh", price: "₹350" },
      { name: "Chole Bhature", price: "₹160" },
      { name: "Rajma Chawal", price: "₹150" },
      { name: "Egg Curry", price: "₹180" },
      { name: "Kadai Paneer", price: "₹220" },
    ],
    beverages: [
      { name: "Mango Lassi", price: "₹80" },
      { name: "Masala Chai", price: "₹40" },
      { name: "Fresh Lime Soda", price: "₹60" },
      { name: "Cold Coffee", price: "₹100" },
      { name: "Buttermilk", price: "₹50" },
    ],
    breads: [
      { name: "Butter Naan", price: "₹40" },
      { name: "Garlic Naan", price: "₹50" },
      { name: "Tandoori Roti", price: "₹25" },
      { name: "Laccha Paratha", price: "₹45" },
      { name: "Missi Roti", price: "₹35" },
    ],
  };

  return (
    <section
      id="menu"
      className="py-20 px-4 relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&h=1200&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/85" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-4xl md:text-6xl font-bold text-white text-center mb-8 tracking-wider">
          MENU
        </h2>

        {/* Search bar */}
        <div className="flex justify-end mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="bg-white/10 border border-white/20 rounded-full px-5 py-2 text-white placeholder-white/50 focus:outline-none focus:border-red-500 w-[200px] md:w-[280px]"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
                activeCategory === cat.id
                  ? "bg-red-700 text-white"
                  : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
          {menuItems[activeCategory]?.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 py-3 border-b border-white/10"
            >
              {/* Circle placeholder for food image */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-700 to-red-900 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">
                {item.name.charAt(0)}
              </div>
              {/* Item info */}
              <div className="flex-1">
                <h4 className="text-white font-medium">{item.name}</h4>
              </div>
              {/* Price */}
              <span className="text-red-400 font-semibold">{item.price}</span>
            </div>
          ))}
        </div>

        {/* View Full Menu Button */}
        <div className="flex justify-center mt-12">
          <Link
            to="/kitchens"
            className="bg-red-700 hover:bg-red-800 text-white px-10 py-3 rounded-xl text-lg font-semibold transition-colors"
          >
            View Full Menu
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MenuPreview;