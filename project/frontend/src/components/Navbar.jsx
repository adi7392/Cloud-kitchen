import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { logout } from "../redux/slices/authSlice.js";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const { darkMode } = useTheme();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  return (
    <nav
      className={`shadow-md sticky top-0 z-50 ${
        darkMode ? "bg-gray-900 shadow-gray-800" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          to="/"
          className={`text-2xl font-bold ${
            darkMode ? "text-orange-400" : "text-orange-500"
          }`}
        >
          CloudKitchen
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (query.trim()) navigate(`/kitchens?search=${encodeURIComponent(query.trim())}`);
              else navigate('/kitchens');
              setQuery('');
            }}
            className="flex items-center mr-4"
          >
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search kitchens or dishes..."
              className="w-64 px-3 py-1.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <button type="submit" className="ml-2 bg-orange-500 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-orange-600">Search</button>
          </form>
          <Link
            to="/kitchens"
            className={`${
              darkMode
                ? "text-gray-300 hover:text-orange-400"
                : "text-gray-700 hover:text-orange-500"
            }`}
          >
            Kitchens
          </Link>

          {user ? (
            <>
              <Link
                to="/my-orders"
                className={`${
                  darkMode
                    ? "text-gray-300 hover:text-orange-400"
                    : "text-gray-700 hover:text-orange-500"
                }`}
              >
                My Orders
              </Link>
              <Link
                to="/cart"
                className={`relative ${
                  darkMode
                    ? "text-gray-300 hover:text-orange-400"
                    : "text-gray-700 hover:text-orange-500"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
                  />
                </svg>
                {items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </Link>
              <Link
                to="/profile"
                className={`${
                  darkMode
                    ? "text-gray-300 hover:text-orange-400"
                    : "text-gray-700 hover:text-orange-500"
                }`}
              >
                Profile
              </Link>
              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className={`font-medium ${
                    darkMode
                      ? "text-orange-400 hover:text-orange-300"
                      : "text-orange-600 hover:text-orange-700"
                  }`}
                >
                  Admin
                </Link>
              )}
              <span
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Hi, {user.username}
              </span>
              <ThemeToggle />
              <button
                onClick={() => dispatch(logout())}
                className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <ThemeToggle />
              <Link
                to="/login"
                className={`${
                  darkMode
                    ? "text-gray-300 hover:text-orange-400"
                    : "text-gray-700 hover:text-orange-500"
                }`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-orange-500 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-orange-600"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setOpen((s) => !s)}
            aria-label="Toggle menu"
            className={`p-2 rounded-md focus:outline-none focus:ring-2 ${
              darkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div className={`${open ? "block" : "hidden"} md:hidden px-4 pb-4`}>
        <div className="flex flex-col gap-3">
          <Link to="/kitchens" className="py-2">
            Kitchens
          </Link>
          {user ? (
            <>
              <Link to="/my-orders" className="py-2">
                My Orders
              </Link>
              <Link to="/cart" className="py-2">
                Cart {items.length > 0 && `(${items.length})`}
              </Link>
              <Link to="/profile" className="py-2">
                Profile
              </Link>
              {user.role === "admin" && (
                <Link to="/admin" className="py-2">
                  Admin
                </Link>
              )}
              <button
                onClick={() => dispatch(logout())}
                className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm w-max"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="py-2">
                Login
              </Link>
              <Link to="/register" className="py-2 inline-block w-max bg-orange-500 text-white px-4 py-1.5 rounded-lg">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;