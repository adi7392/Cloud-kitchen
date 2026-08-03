import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-orange-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="text-white text-2xl font-bold tracking-tight">
            CloudKitchen
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/my-orders"
              className="text-white hover:text-yellow-200 transition"
            >
              My Orders
            </Link>
            <Link
              to="/login"
              className="text-white hover:text-yellow-200 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-white hover:text-yellow-200 transition"
            >
              Sign Up
            </Link>
            <Link
              to="/profile"
              className="text-white hover:text-yellow-200 transition"
            >
              Profile
            </Link>
          </div>

          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md bg-orange-600 p-2 text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <span className="sr-only">Open navigation menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
