import { Link } from "react-router-dom";

const MealPlans = () => {
  const plans = [
    {
      id: 1,
      name: "Basic Plan",
      meals: "1 meal/day",
      price: "₹2,999/month",
      description:
        "Perfect for singles. One freshly prepared meal delivered daily.",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=300&fit=crop",
    },
    {
      id: 2,
      name: "Standard Plan",
      meals: "2 meals/day",
      price: "₹5,499/month",
      description:
        "Lunch and dinner covered. Great variety with rotating menu.",
      image:
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=300&fit=crop",
    },
    {
      id: 3,
      name: "Premium Plan",
      meals: "3 meals/day",
      price: "₹7,999/month",
      description: "Full day coverage including breakfast, lunch, and dinner.",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=300&fit=crop",
    },
    {
      id: 4,
      name: "Family Plan",
      meals: "2 meals/day × 4",
      price: "₹18,999/month",
      description: "Feed the whole family with our curated meals for 4 people.",
      image:
        "https://images.unsplash.com/photo-1493770348161-369560ae357d?w=600&h=300&fit=crop",
    },
    {
      id: 5,
      name: "Fitness Plan",
      meals: "3 meals + snacks",
      price: "₹9,499/month",
      description:
        "High-protein meals designed for active lifestyles and fitness goals.",
      image:
        "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&h=300&fit=crop",
    },
    {
      id: 6,
      name: "Weekend Special",
      meals: "Sat & Sun only",
      price: "₹1,999/month",
      description: "Gourmet weekend meals when you want to treat yourself.",
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=300&fit=crop",
    },
  ];

  return (
    <section id="meal-plans" className="py-20 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4 drop-shadow-[0_4px_100px_rgba(255,4,4,0.25)]">
          Chef Prepared, Organic And Gluten-Free Meals
        </h2>
        <p className="text-white/60 text-center mb-12 text-lg">
          Delivered Daily, For The Caped Crusaders
        </p>

        {/* Plan Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="relative rounded-3xl overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform duration-300"
            >
              {/* Background Image */}
              <img
                src={plan.image}
                alt={plan.name}
                className="w-full h-[220px] object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent backdrop-blur-[2px]" />
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {plan.name}
                    </h3>
                    <p className="text-white/70 text-sm mb-1">
                      {plan.description}
                    </p>
                    <p className="text-white/50 text-xs">{plan.meals}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-red-400">
                      {plan.price}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-12">
          <Link
            to="/kitchens"
            className="bg-red-700 hover:bg-red-800 text-white px-8 py-3 rounded-xl text-lg font-semibold transition-colors"
          >
            Subscribe Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MealPlans;