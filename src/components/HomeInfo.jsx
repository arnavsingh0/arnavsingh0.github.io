import { Link } from "react-router-dom";

const HomeInfo = () => {
  const supernovaStyle = 'relative overflow-hidden transition duration-300';

  const galaxyLinks = (
    <div className='flex flex-col items-center mt-6 space-y-4'>
      <Link to='/about' className={supernovaStyle}>
        <span className='relative group blue-gradient_text hover:text-white font-semibold drop-shadow transition duration-300'>
          <span className="group-hover:hidden">Explore</span>
          <span className = 'hidden group-hover:inline'> Click to learn more about me!</span>
        </span>
      </Link>
      {/* <Link to='/projects' className={supernovaStyle}>
        <span className='text-cosmic-coral hover:text-white transition duration-300'>
          Projects
        </span>
        <span className='absolute inset-0 bg-yellow-300 opacity-0 transform scale-0 transition-all duration-300 hover:opacity-100 hover:scale-110 rounded-full sparkle' style={{ '--i': 2 }}></span>
      </Link> */}
    </div>
  );

  return (
    <div className='flex flex-col items-center justify-center text-center'>
      <h1 className='sm:text-xl sm:leading-snug text-white mx-5'>
        <span className='relative group hover:blue-gradient_text font-semibold drop-shadow transition duration-300'>
          <span className='group-hover:hidden'>Hello there</span>
          <span className='hidden group-hover:inline'>General Kenobi</span>
        </span>
        , I'm
        <span className='font-semibold mx-2'>Arnav Singh</span> 👋
      {/* <br />
        An Undergrad Computer Science & Physics Student at Dartmouth 🌲 */}
      </h1>
      {galaxyLinks}
    </div>
  );
};

export default HomeInfo;