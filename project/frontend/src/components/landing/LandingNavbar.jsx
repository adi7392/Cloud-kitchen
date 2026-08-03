import { Link } from "react-router-dom";
import ThemeToggle from "../ThemeToggle";

const LandingNavbar = () => {
  const navLinks = [
    { name: "WELCOME", href: "#hero" },
    { name: "HOW IT WORKS", href: "#how-it-works" },
    { name: "MEAL PLANS", href: "#meal-plans" },
    { name: "FAQs", href: "#faqs" },
    { name: "CONTACT", href: "#contact" },
    { name: "REFER A FRIEND", href: "#refer" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-white font-serif tracking-wide">
            CafeSerenity<span className="text-red-500">Bites</span>
          </span>
        </Link>

        {/* Nav Links */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-white/80 hover:text-white text-sm tracking-wider transition-colors font-serif"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            to="/cart"
            className="text-white hover:text-red-400 transition-colors"
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
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default LandingNavbar;