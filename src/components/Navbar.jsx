import { useState, useEffect } from "react";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("");

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

  // Intersection Observer for tracking sections
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observerOptions = {
      threshold: 0.6, // When 60% of the section is in view
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id); // Set active section ID
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full bg-black shadow-lg z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <a href="/" className="flex items-center flex-shrink-0">
          <img
            src="src/assets/images/logo.svg" // Path to your favicon or logo
            alt="Logo"
            className="w-10 h-10" // Adjust size as needed
          />
          <span className="text-xl font-bold text-white ml-3">AS</span>
        </a>

        {/* Navigation Links */}
        <nav className="flex space-x-8 text-sm uppercase tracking-widest font-medium">
          {["about", "experience", "skills", "projects", "research", "education"].map((link) => (
            <a
              key={link}
              href={`#${link}`}
              className={
                activeSection === link
                  ? "text-white border-b-2 border-white pb-1 transition-all duration-300"
                  : "text-gray-400 hover:text-white hover:border-b-2 hover:border-white pb-1 transition-all duration-300"
              }
            >
              {link.charAt(0).toUpperCase() + link.slice(1)}
            </a>
          ))}
        </nav>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="ml-4 bg-gray-200 dark:bg-gray-700 p-2 rounded-full shadow transition duration-300 flex items-center"
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