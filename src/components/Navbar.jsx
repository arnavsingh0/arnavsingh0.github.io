import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="header flex flex-col fixed top-0 right-0 h-full">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "text-starry-gold" : "text-deep-space-blue hover:text-galaxy-purple"
        }
      >
        <h1 className="text-4xl font-bold transition duration-300 ml--2 ease-in-out pulsating-as">
          AS
        </h1>
      </NavLink>
      <nav className="flex flex-col mt-7 text-lg gap-5 font-medium">
        {["about", "projects", "education", "skills", "research", "experience", "contact"].map((link, index) => (
          <NavLink
            key={index}
            to={`/about#${link}`} // Ensure links point to the About page with section IDs
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
    </header>
  );
};

export default Navbar;