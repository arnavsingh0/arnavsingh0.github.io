import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className='header flex justify-between items-center'>
      <NavLink
        to='/'
        className={({ isActive }) =>
          isActive ? 'text-starry-gold' : 'text-deep-space-blue hover:text-galaxy-purple'
        }
      >
        <h1 className='text-4xl font-bold transition duration-300 ml--2 ease-in-out pulsating-as'> {/* Add the pulsating class */}
          AS
        </h1>
      </NavLink>
      <nav className='flex ml-7 mt-7  text-lg gap-10 font-medium'>
        {["about", "projects", "education", "skills", "research", "experience", "academic-projects", "contact"].map((link, index) => (
          <NavLink
            key={index}
            to={`/${link}`}
            className={({ isActive }) =>
              isActive
                ? "text-blue-600"
                : "text-white hover:text-blue-500 transition duration-300 ease-in-out"
            }
          >
            {link.charAt(0).toUpperCase() + link.slice(1).replace(/-/g, ' ')}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};
export default Navbar;