const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "SELECT YOUR PLAN",
      description:
        "Choose from our range of weekly and monthly meal plans tailored to your dietary needs and preferences.",
      image:
        "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=150&h=150&fit=crop",
    },
    {
      id: 2,
      title: "SCHEDULE YOUR DELIVERIES",
      description:
        "Pick your delivery days and times. We deliver fresh meals in insulated cooler bags to keep them perfect.",
      image:
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=150&h=150&fit=crop",
    },
    {
      id: 3,
      title: "HEAT, EAT, REPEAT",
      description:
        "Simply heat your chef-prepared meals and enjoy restaurant-quality food from the comfort of your home.",
      image:
        "https://images.unsplash.com/photo-1547592180-85f173990554?w=150&h=150&fit=crop",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="relative py-20 px-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=1920&h=1126&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl md:text-5xl font-['Kaushan_Script',cursive] text-white text-center mb-16 drop-shadow-[0_4px_100px_rgba(255,0,0,0.25)]">
          fortune favors flavor
        </h2>

        {/* Steps */}
        <div className="bg-black/60 rounded-[35px] shadow-[0_4px_100px_black] p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-700">
            {steps.map((step) => (
              <div
                key={step.id}
                className="flex flex-col items-center text-center px-4 pt-8 md:pt-0"
              >
                {/* Circle Image */}
                <div className="w-[120px] h-[120px] rounded-full overflow-hidden mb-6 shadow-lg">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Step Title */}
                <h3 className="text-lg md:text-xl font-bold text-white mb-3 drop-shadow-[0_4px_100px_rgba(255,4,4,0.25)]">
                  {step.title}
                </h3>
                {/* Step Description */}
                <p className="text-white/70 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-12">
          <a
            href="#meal-plans"
            className="bg-red-700 hover:bg-red-800 text-white px-8 py-3 rounded-xl text-lg font-semibold transition-colors"
          >
            Select your meal plan
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;