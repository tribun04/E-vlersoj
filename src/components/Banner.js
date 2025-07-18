import React from 'react';

// --- Configuration Data ---
// Kept separate for easy updates.
const categories = [
  { label: "Teknologji", image: "https://images.unsplash.com/photo-1752035197224-6e6bdc4f7fb1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", position: "w-24 h-24 md:w-32 md:h-32 top-8 left-[8%] md:top-10 md:left-[10%]" },
  { label: "Shëndetësi", image: "https://images.unsplash.com/photo-1752035681676-cf53168f73a4?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", position: "w-20 h-20 md:w-28 md:h-28 top-[30%] left-[-5%] md:top-[35%] md:left-0" },
  { label: "Financa", image: "https://images.unsplash.com/photo-1751906602589-74cbe72d08b1?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", position: "w-20 h-20 md:w-28 md:h-28 bottom-[25%] left-[18%] md:bottom-[20%] md:left-[25%]" },
  { label: "Udhëtime", image: "https://plus.unsplash.com/premium_photo-1671410372788-16f3eb25a817?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", position: "w-20 h-20 md:w-28 md:h-28 top-[20%] right-[8%] md:top-10 md:right-[10%]" },
  { label: "Tregti", image: "https://images.unsplash.com/photo-1752035197224-6e6bdc4f7fb1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", position: "w-24 h-24 md:w-32 md:h-32 top-[45%] right-[-5%] md:top-[35%] md:right-0" },
  { label: "Arsim", image: "https://images.unsplash.com/photo-1752035197224-6e6bdc4f7fb1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", position: "w-20 h-20 md:w-28 md:h-28 bottom-[15%] right-[12%] md:bottom-[20%] md:right-[20%]" },
];

// --- Sub-Components for Readability & Reusability ---

/**
 * A proper SVG cloud component.
 * It's more scalable and visually appealing than a simple div.
 */
const CloudLabel = ({ label }) => (
  <div className="absolute -top-6 md:-top-8 left-1/2 -translate-x-1/2 w-max z-20">
    <div className="relative flex items-center justify-center">
      {/* SVG for the cloud shape */}
      <svg
        width="100"
        height="50"
        viewBox="0 0 100 50"
        className="absolute w-full h-full text-white dark:text-gray-800 drop-shadow-md"
      >
        <path
          d="M75,50 a25,25 0 1,1 0,-50 a20,20 0 0,1 20,20 a15,15 0 0,1 -15,15 h-60 a15,15 0 0,1 -15,-15 a20,20 0 0,1 20,-20 a25,25 0 1,1 0,50 z"
          fill="currentColor"
        />
      </svg>
      {/* The text label, positioned on top of the SVG */}
      <span className="relative text-gray-700 dark:text-gray-200 text-xs md:text-sm font-semibold z-10 px-4">
        {label}
      </span>
    </div>
  </div>
);

/**
 * Renders a single floating bubble with a randomized animation.
 * This makes the main component cleaner and logic more contained.
 */
const FloatingBubble = ({ category }) => {
  // Randomize animation properties for a more natural, dynamic feel
  const animationDuration = Math.random() * 5 + 7; // 7s to 12s
  const animationDelay = Math.random() * 2;       // 0s to 2s

  return (
    <div
      className={`absolute ${category.position} rounded-full border-2 md:border-3 border-green-200 dark:border-green-800 bg-white dark:bg-gray-800 shadow-xl flex items-center justify-center overflow-visible`}
      style={{
        animation: `float ${animationDuration}s ease-in-out infinite`,
        animationDelay: `${animationDelay}s`,
      }}
    >
      <CloudLabel label={category.label} />
      <img
        src={category.image}
        alt={category.label}
        className="w-full h-full object-cover rounded-full"
      />
    </div>
  );
};

// --- Main Hero Section Component ---

const HeroSection = () => {
  return (
    <section className="relative bg-gray-50 dark:bg-gray-900 mx-w-[1250px] mx-auto
     py-20 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        {/* Decorative floating bubbles in the background */}
        <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
          {categories.map((cat) => (
            <FloatingBubble key={cat.label} category={cat} />
          ))}
        </div>

        {/* Main hero content, positioned above the bubbles */}
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <p className="text-green-600 dark:text-green-400 font-semibold text-sm md:text-base mb-3">
            Vlerësime të besueshme nga përdorues të vërtetë
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
            Gjej kompanitë dhe produktet që njerëzit i besojnë
          </h1>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 mb-8 text-lg">
            Shfleto mijëra vlerësime të pavarura për të marrë vendime më të mira.
          </p>
          <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-bold text-base transition-transform duration-200 ease-in-out hover:scale-105 shadow-lg hover:shadow-green-500/30">
            Shfleto Të Gjitha Vlerësimet
          </button>
        </div>
      </div>

      {/* 
        A single, more natural animation keyframe. 
        We use random durations and delays on each bubble to make them unique.
      */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(3deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;