import { Link } from "react-router-dom";
import { socialLinks } from "../constants";

const Footer = () => {
  return (
    <footer className='relative bg-gray-900/40 backdrop-blur-lg border-t border-white/10 pt-16 pb-8 font-inter overflow-hidden'>
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none" />

      <div className='container relative mx-auto px-6 lg:px-8 z-10'>
        <div className='flex flex-col md:flex-row justify-between items-center md:items-start gap-12'>

          {/* Brand & Vision */}
          <div className='flex flex-col items-center md:items-start space-y-4 max-w-sm'>
            <Link
              to="/"
              className='text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 tracking-tighter hover:opacity-80 transition-opacity'
            >
              AS
            </Link>
            <p className='text-gray-400 text-sm text-center md:text-left leading-relaxed'>
              Crafting digital experiences that merge code with creativity.
              Let's build the future together.
            </p>
          </div>

          {/* Navigation & Connect */}
          <div className="flex flex-col sm:flex-row gap-12 sm:gap-20">
            {/* Quick Links */}
            <div className="flex flex-col items-center md:items-start gap-4">
              <h3 className="text-white font-semibold tracking-wide">Explore</h3>
              <div className="flex flex-col items-center md:items-start gap-3">
                <a href="#about" className='text-gray-400 hover:text-blue-400 transition-all hover:translate-x-1 duration-300 text-sm'>About</a>
                <a href="#projects" className='text-gray-400 hover:text-blue-400 transition-all hover:translate-x-1 duration-300 text-sm'>Projects</a>
                <a href="#experience" className='text-gray-400 hover:text-blue-400 transition-all hover:translate-x-1 duration-300 text-sm'>Experience</a>
                <a href="#contact" className='text-gray-400 hover:text-blue-400 transition-all hover:translate-x-1 duration-300 text-sm'>Contact</a>
              </div>
            </div>

            {/* Socials */}
            <div className="flex flex-col items-center md:items-start gap-4">
              <h3 className="text-white font-semibold tracking-wide">Connect</h3>
              <div className='flex gap-4'>
                {socialLinks.map((link) => {
                  const isInternal = link.link.startsWith('#') || link.link.startsWith('/#');
                  const linkProps = isInternal
                    ? {}
                    : { target: '_blank', rel: 'noopener noreferrer' };

                  return (
                    <a
                      key={link.name}
                      href={link.link}
                      {...linkProps}
                      className='w-10 h-10 flex justify-center items-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/50 hover:scale-110 transition-all duration-300 group'
                      aria-label={link.name}
                    >
                      <img
                        src={link.iconUrl}
                        alt={link.name}
                        className='w-5 h-5 object-contain opacity-70 group-hover:opacity-100 transition-opacity'
                      />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className='my-10 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent'></div>

        {/* Copyright */}
        <div className='flex flex-col md:flex-row justify-between items-center text-xs text-gray-500'>
          <p>
            © {new Date().getFullYear()} Arnav Singh. All rights reserved.
          </p>
          <div className='flex gap-6 mt-4 md:mt-0'>
            <a href="#" className='hover:text-blue-400 transition-colors'>Privacy Policy</a>
            <a href="#" className='hover:text-blue-400 transition-colors'>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
