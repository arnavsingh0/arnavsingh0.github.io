import { NavLink } from "react-router-dom";

const Navbar = () => {
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
          {["about", "projects", "education", "skills", "research", "experience", "contact"].map((link, index) => (
            <NavLink
              key={index}
              to={`/${link}`} // Scroll to section IDs on the About page
              className={({ isActive }) =>
                isActive
                  ? "blue-gradient_text font-semibold drop-shadow"
                  : "text-white hover:blue-gradient_text font-semibold drop-shadow transition duration-300 ease-in-out"
              }
            >
              {link.charAt(0).toUpperCase() + link.slice(1).replace(/-/g, " ")}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;