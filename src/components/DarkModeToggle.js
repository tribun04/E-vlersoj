// components/DarkModeToggle.jsx


import React, { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function DarkModeToggle() {
  // Check for saved preference in localStorage, default to false (light mode)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const savedMode = localStorage.getItem("darkMode");
      return savedMode ? JSON.parse(savedMode) : false;
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem("darkMode", "false");
    }
  }, [isDarkMode]);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="p-3 rounded-full transition-colors duration-300 ease-in-out bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-yellow-400 hover:bg-gray-300 dark:hover:bg-gray-700"
        aria-label="Toggle Dark Mode"
      >
        {isDarkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
      </button>
    </div>
  );
}