import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const RepublicDay: React.FC = () => {
  useGSAP(() => {
    // Animate the Republic Day section on scroll
    gsap.from(".republic-day-content", {
      scrollTrigger: {
        trigger: ".republic-day-section",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.2,
    });

    // Animate the Ashoka Chakra
    gsap.from(".ashoka-chakra", {
      scrollTrigger: {
        trigger: ".republic-day-section",
        start: "top 60%",
      },
      scale: 0,
      opacity: 0,
      duration: 1.5,
      ease: "elastic.out(1, 0.5)",
    });
  }, []);

  return (
    <div className="republic-day-section w-full min-h-screen bg-white py-20 px-4 md:px-10">
      {/* Header with Tricolor Theme */}
      <div className="tricolor-border py-8 mb-12">
        <h2 className="clash text-5xl md:text-7xl font-bold text-center text-black republic-day-content">
          🇮🇳 REPUBLIC DAY 2026 🇮🇳
        </h2>
        <p className="serif text-2xl md:text-3xl text-center mt-4 text-gray-700 republic-day-content">
          Celebrating 77 Years of Democracy
        </p>
      </div>

      {/* Ashoka Chakra */}
      <div className="flex justify-center mb-12">
        <div className="ashoka-chakra relative w-32 h-32 md:w-48 md:h-48">
          <svg
            viewBox="0 0 200 200"
            className="ashoka-chakra-spin w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer Circle */}
            <circle
              cx="100"
              cy="100"
              r="95"
              stroke="#000080"
              strokeWidth="3"
              fill="none"
            />

            {/* Inner Circle */}
            <circle cx="100" cy="100" r="20" fill="#000080" />

            {/* 24 Spokes */}
            {Array.from({ length: 24 }).map((_, i) => {
              const angle = (i * 360) / 24;
              const rad = (angle * Math.PI) / 180;
              const x1 = 100 + 20 * Math.cos(rad);
              const y1 = 100 + 20 * Math.sin(rad);
              const x2 = 100 + 95 * Math.cos(rad);
              const y2 = 100 + 95 * Math.sin(rad);
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#000080"
                  strokeWidth="2"
                />
              );
            })}
          </svg>
        </div>
      </div>

      {/* Information Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Card 1 */}
        <div className="republic-day-content bg-linear-to-br from-orange-100 to-orange-50 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 border-l-4 border-saffron">
          <h3 className="clash text-2xl font-bold mb-3 text-saffron">
            January 26, 1950
          </h3>
          <p className="serif text-gray-700 leading-relaxed">
            On this historic day, the Constitution of India came into effect,
            making India a sovereign democratic republic.
          </p>
        </div>

        {/* Card 2 */}
        <div className="republic-day-content bg-linear-to-br from-green-100 to-green-50 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 border-l-4 border-india-green">
          <h3 className="clash text-2xl font-bold mb-3 text-india-green">
            The Constitution
          </h3>
          <p className="serif text-gray-700 leading-relaxed">
            Dr. B.R. Ambedkar chaired the drafting committee, creating the
            world's longest written constitution with 448 articles.
          </p>
        </div>

        {/* Card 3 */}
        <div className="republic-day-content bg-linear-to-br from-blue-100 to-blue-50 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 border-l-4 border-ashoka-blue">
          <h3 className="clash text-2xl font-bold mb-3 text-ashoka-blue">
            Unity in Diversity
          </h3>
          <p className="serif text-gray-700 leading-relaxed">
            Republic Day celebrates India's rich cultural heritage and the unity
            of its diverse population across 28 states and 8 union territories.
          </p>
        </div>
      </div>

      {/* Quote Section */}
      <div className="republic-day-content max-w-4xl mx-auto text-center py-12">
        <div className="tricolor-gradient p-1 rounded-lg inline-block republic-day-glow">
          <div className="bg-white p-8 rounded-lg">
            <blockquote className="serif text-xl md:text-2xl italic text-gray-800 mb-4">
              "We are Indians, firstly and lastly."
            </blockquote>
            <cite className="clash text-lg font-semibold text-gray-600">
              - Dr. B.R. Ambedkar
            </cite>
          </div>
        </div>
      </div>

      {/* Fun Facts */}
      <div className="republic-day-content max-w-4xl mx-auto mt-12">
        <h3 className="clash text-3xl md:text-4xl font-bold text-center mb-8 text-black">
          Did You Know?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg">
            <span className="text-3xl">🎖️</span>
            <div>
              <h4 className="clash font-semibold text-lg mb-2">
                Parade Tradition
              </h4>
              <p className="serif text-gray-700">
                The Republic Day parade at Rajpath showcases India's defense
                capability, cultural diversity, and social progress.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
            <span className="text-3xl">📜</span>
            <div>
              <h4 className="clash font-semibold text-lg mb-2">
                Handwritten Constitution
              </h4>
              <p className="serif text-gray-700">
                The original Constitution was handwritten in both Hindi and
                English, with beautiful calligraphy and illustrations.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
            <span className="text-3xl">🏛️</span>
            <div>
              <h4 className="clash font-semibold text-lg mb-2">Chief Guest</h4>
              <p className="serif text-gray-700">
                Every year, a foreign head of state is invited as the chief
                guest, symbolizing India's international relations.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg">
            <span className="text-3xl">⚖️</span>
            <div>
              <h4 className="clash font-semibold text-lg mb-2">
                Fundamental Rights
              </h4>
              <p className="serif text-gray-700">
                The Constitution guarantees six fundamental rights to all
                citizens, ensuring equality and justice.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Closing Message */}
      <div className="republic-day-content text-center mt-16">
        <h3 className="clash text-3xl md:text-5xl font-bold text-black mb-4">
          Jai Hind! 🇮🇳
        </h3>
        <p className="serif text-xl text-gray-700">
          Let's celebrate the spirit of democracy, freedom, and unity
        </p>
      </div>
    </div>
  );
};

export default RepublicDay;
