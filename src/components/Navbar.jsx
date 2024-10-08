import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };

  // Persist the theme preference across reloads
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <header className="header fixed top-0 left-0 w-full bg-gradient-to-br from-gray-800 to-black shadow-lg z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo/Brand */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-starry-gold" : "text-deep-space-blue hover:text-galaxy-purple"
          }
        >
          <h1 className="text-4xl font-bold transition duration-300 ease-in-out pulsating-as">
            AS
          </h1>
        </NavLink>

        {/* Navigation Links */}
        <nav className="flex space-x-6 text-lg font-medium">
        <a href="" className="nav-link text-white hover:blue-gradient_text font-semibold drop-shadow transition duration-300 ease-in-out">About</a>
          <a href="#experience" className="nav-link text-white hover:blue-gradient_text font-semibold drop-shadow transition duration-300 ease-in-out">Experience</a>
          <a href="#skills" className="nav-link text-white hover:blue-gradient_text font-semibold drop-shadow transition duration-300 ease-in-out">Skills</a>
          <a href="#projects" className="nav-link text-white hover:blue-gradient_text font-semibold drop-shadow transition duration-300 ease-in-out">Projects</a>
          <a href="#research" className="nav-link text-white hover:blue-gradient_text font-semibold drop-shadow transition duration-300 ease-in-out">Research</a>
          <a href="#education" className="nav-link text-white hover:blue-gradient_text font-semibold drop-shadow transition duration-300 ease-in-out">Education</a>
        </nav>

        {/* Day/Night Mode Toggle Button */}
        <button
          onClick={toggleDarkMode}
          className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full shadow transition duration-300"
          aria-label="Toggle Day/Night Mode"
        >
          {isDarkMode ? (
            <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 15a5 5 0 100-10 5 5 0 000 10zm1-7V7a1 1 0 10-2 0v1a1 1 0 002 0zm-1 7a1 1 0 100-2 1 1 0 000 2zm-6-4h1a1 1 0 100-2H4a1 1 0 000 2zm10-1a1 1 0 100 2h1a1 1 0 000-2h-1z" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
};

export default Navbar;