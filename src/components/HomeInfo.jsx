import { Link } from "react-router-dom";
import { arrow } from "../assets/icons";

const HomeInfo = () => {
  const supernovaStyle = 'relative overflow-hidden transition duration-300';

  const galaxyLinks = (
    <div className='flex flex-col items-center mt-6 space-y-4'>
      <Link to='/about' className={supernovaStyle}>
        <span className='text-cosmic-teal hover:text-white transition duration-300'>
          About
        </span>
        <span className='absolute inset-0 bg-yellow-300 opacity-0 transform scale-0 transition-all duration-300 hover:opacity-100 hover:scale-110 rounded-full sparkle' style={{ '--i': 1 }}></span>
      </Link>
      <Link to='/projects' className={supernovaStyle}>
        <span className='text-cosmic-teal hover:text-white transition duration-300'>
          Projects
        </span>
        <span className='absolute inset-0 bg-yellow-300 opacity-0 transform scale-0 transition-all duration-300 hover:opacity-100 hover:scale-110 rounded-full sparkle' style={{ '--i': 2 }}></span>
      </Link>
    </div>
  );

  return (
    <div className='flex flex-col items-center justify-center text-center p-6 bg-gradient-to-r from-indigo-900 to-black rounded-lg shadow-lg'>
      <div className='relative group'>
        <span className='text-cosmic-teal text-lg absolute -top-10 left-1/2 transform -translate-x-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
          General Kenobi
        </span>
        <h1 className='sm:text-xl sm:leading-snug text-white mx-5'>
          <span className='hover:text-cosmic-teal'>Hello there</span>
          , I'm
          <span className='font-semibold mx-2'>Arnav Singh</span> 👋
          <br />
          An Undergrad Student at Dartmouth 🌲
        </h1>
      </div>
      {galaxyLinks}
    </div>
  );
};

export default HomeInfo;
