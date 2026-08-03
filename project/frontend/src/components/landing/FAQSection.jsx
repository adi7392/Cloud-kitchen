import { useState } from "react";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is CafeSerenityBites?",
      answer:
        "CafeSerenityBites is your culinary wingman! We are not just a meal delivery company — think of us as your personal butler, catering to your every nutritional whim.",
    },
    {
      question: "Where does CafeSerenityBites deliver?",
      answer:
        "Presently, we offer delivery services within Gurugram, Haryana. We are expanding to more cities soon!",
    },
    {
      question: "How does scheduling work?",
      answer:
        "CafeSerenityBites delivers every day! Your meals are packaged in insulated cooler bags with ice packs to ensure they stay fresh until you pick them up in the morning.",
    },
    {
      question: "Can I pick which dishes I receive?",
      answer:
        "Embracing the Delicious Unknown: CafeSerenityBites is here for the caped crusaders who take on villains and conquer boardrooms alike. We craft your personalized menu every day, using the freshest ingredients and tailoring it to your dietary preferences and dislikes (which you can share at checkout).",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="py-20 px-4 bg-black">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
          Frequently Asked Questions
        </h2>

        {/* FAQ List */}
        <div className="bg-white/5 rounded-3xl p-6 md:p-10 border border-white/10">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border-b border-white/10 last:border-b-0 ${
                index === 0 ? "" : "mt-2"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between py-5 text-left group"
              >
                <span className="text-white font-medium text-lg pr-4 group-hover:text-red-400 transition-colors">
                  {faq.question}
                </span>
                <span className="text-white/60 text-2xl flex-shrink-0">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <p className="text-white/60 pb-5 leading-relaxed text-sm md:text-base">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;