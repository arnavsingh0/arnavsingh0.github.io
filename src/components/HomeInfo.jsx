import { useState } from "react";

const HomeInfo = ({ triggerOverlayAnimation }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true); // Start the animation, hide the content
    triggerOverlayAnimation(); // Call the animation in Home.jsx
  };

  return (
    // Only show this part if the animation hasn't started
    !isAnimating && (
      <div className='flex flex-col items-center justify-center text-center'>
        <h1 className='sm:text-xl sm:leading-snug text-white mx-5'>
          <span className='relative group hover:blue-gradient_text font-semibold drop-shadow transition duration-300'>
            <span className='group-hover:hidden'>Hello there</span>
            <span className='hidden group-hover:inline'>General Kenobi</span>
          </span>
          , I'm
          <span className='font-semibold mx-2'>Arnav Singh</span> 👋
        </h1>

        <div className='flex flex-col items-center mt-6 space-y-4'>
          <span
            onClick={handleClick}
            className='relative overflow-hidden transition duration-300 cursor-pointer blue-gradient_text hover:text-white font-semibold drop-shadow'>
            Explore
          </span>
        </div>
      </div>
    )
  );
};

export default HomeInfo;