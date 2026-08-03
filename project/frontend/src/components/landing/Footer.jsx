import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <Link to="/" className="text-xl font-bold text-white">
            CafeSerenity<span className="text-red-500">Bites</span>
          </Link>
          <p className="text-white/40 text-sm mt-2">
            Chef Prepared, Organic And Gluten-Free Meals
          </p>
        </div>

        <div className="flex gap-6 text-white/50 text-sm">
          <a href="#hero" className="hover:text-white transition-colors">
            Welcome
          </a>
          <a
            href="#how-it-works"
            className="hover:text-white transition-colors"
          >
            How It Works
          </a>
          <a href="#meal-plans" className="hover:text-white transition-colors">
            Meal Plans
          </a>
          <a href="#faqs" className="hover:text-white transition-colors">
            FAQs
          </a>
          <a href="#contact" className="hover:text-white transition-colors">
            Contact
          </a>
        </div>

        <p className="text-white/30 text-xs">
          © 2026 CafeSerenityBites. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;