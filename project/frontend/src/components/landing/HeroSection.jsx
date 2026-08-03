import { Link } from "react-router-dom";

const HeroSection = () => {
  // Placeholder food images — replace with actual images from your assets
  const foodCards = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=400&fit=crop",
      alt: "Fresh salad bowl",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&h=400&fit=crop",
      alt: "Gourmet pancakes",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=400&fit=crop",
      alt: "Wood-fired pizza",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=400&fit=crop",
      alt: "Grilled steak",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=400&fit=crop",
      alt: "Colorful food platter",
    },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #000000 0%, rgba(0,0,0,0.95) 100%)",
      }}
    >
      {/* Tagline */}
      <h1 className="text-3xl md:text-5xl font-['Kaushan_Script',cursive] text-white text-center mb-12 drop-shadow-[0_4px_100px_rgba(255,0,0,0.25)]">
        you have big plans...
        <br />
        we have meal plans.
      </h1>

      {/* Food Cards Row */}
      <div className="flex gap-4 md:gap-6 px-4 mb-12 overflow-x-auto max-w-full scrollbar-hide">
        {foodCards.map((card) => (
          <div
            key={card.id}
            className="flex-shrink-0 w-[180px] md:w-[240px] h-[260px] md:h-[360px] rounded-3xl overflow-hidden shadow-[0_4px_100px_rgba(113,0,0,0.25)] hover:scale-105 transition-transform duration-300"
          >
            <img
              src={card.image}
              alt={card.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Subtitle */}
      <h2 className="text-xl md:text-3xl font-bold text-white text-center max-w-4xl px-4 mb-8 drop-shadow-[0_4px_100px_rgba(255,4,4,0.25)]">
        Chef Prepared, Organic And Gluten-Free Meals
        <br />
        Delivered Daily, For The Caped Crusaders
      </h2>

      {/* CTA */}
      <div className="flex flex-col items-center gap-4">
        <p className="text-xl text-white/80">select your plan</p>
        <div className="w-px h-12 bg-white/50" />
        <Link
          to="/kitchens"
          className="bg-red-700 hover:bg-red-800 text-white px-8 py-3 rounded-xl text-lg font-semibold transition-colors"
        >
          Explore Meal Plans
        </Link>
      </div>

      {/* Decorative shadow */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_4px_100px_rgba(0,0,0,0.25)]" />
    </section>
  );
};

export default HeroSection;