import { Link } from "react-router-dom";
import { socialLinks } from "../constants";

const Footer = () => {
  return (
    <footer className='relative bg-black border-t border-white/10 pt-12 pb-8 font-mono overflow-hidden z-10'>
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>

      <div className='container relative mx-auto px-6 lg:px-8 z-10 max-w-7xl'>
        {/* Top Console Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-1 bg-blue-500 rounded-full"></div>
            <p className="text-xs tracking-[0.3em] text-gray-500">END_OF_TRANSMISSION //</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <p className="text-[10px] text-green-500 tracking-widest hidden sm:block">SYSTEM_SECURE</p>
          </div>
        </div>

        <div className='flex flex-col md:flex-row justify-between items-center md:items-start gap-12'>

          {/* Brand & Vision */}
          <div className='flex flex-col items-center md:items-start space-y-4 max-w-sm'>
            <Link
              to="/"
              className='text-2xl font-bold text-white tracking-tighter hover:text-blue-400 transition-colors flex items-center gap-2'
            >
              <span className="text-blue-500">&gt;_</span>
              ARNAV_SINGH
            </Link>
            <p className='text-gray-400 text-xs sm:text-sm text-center md:text-left leading-relaxed font-sans'>
              Crafting digital experiences that merge code with creativity.
              Building the future.
            </p>
          </div>

          {/* Navigation & Connect */}
          <div className="flex flex-col sm:flex-row gap-12 sm:gap-24 w-full md:w-auto justify-around md:justify-end">
            {/* Quick Links */}
            <div className="flex flex-col items-center md:items-start gap-4">
              <h3 className="text-gray-500 text-xs tracking-[0.2em]">DIRECTIVES //</h3>
              <div className="flex flex-col items-center md:items-start gap-3">
                <a href="#about" className='text-gray-300 hover:text-blue-400 transition-all hover:translate-x-1 duration-300 text-sm'>[1] About</a>
                <a href="#projects" className='text-gray-300 hover:text-blue-400 transition-all hover:translate-x-1 duration-300 text-sm'>[2] Projects</a>
                <a href="#experience" className='text-gray-300 hover:text-blue-400 transition-all hover:translate-x-1 duration-300 text-sm'>[3] Experience</a>
                <a href="#contact" className='text-gray-300 hover:text-blue-400 transition-all hover:translate-x-1 duration-300 text-sm'>[4] Contact</a>
              </div>
            </div>

            {/* Socials */}
            <div className="flex flex-col items-center md:items-start gap-4">
              <h3 className="text-gray-500 text-xs tracking-[0.2em]">NETWORK //</h3>
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
                      className='w-10 h-10 flex justify-center items-center rounded-lg bg-white/5 border border-white/10 hover:bg-blue-600/20 hover:border-blue-500/50 hover:-translate-y-1 transition-all duration-300 group'
                      aria-label={link.name}
                    >
                      <img
                        src={link.iconUrl}
                        alt={link.name}
                        className='w-5 h-5 object-contain opacity-60 group-hover:opacity-100 group-hover:brightness-200 transition-all'
                      />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Decoder Line Animation */}
        <div className="relative w-full h-[1px] bg-white/10 mt-12 mb-6 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full"></div>
          <div className="absolute top-0 left-1/2 w-1/4 h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] opacity-50"></div>
        </div>

        {/* Copyright */}
        <div className='flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-500 tracking-wider'>
          <p>
            SYS_COPYRIGHT &copy; {new Date().getFullYear()} ARNAV SINGH. ALL RIGHTS RESERVED.
          </p>
          <div className='flex gap-6 mt-4 md:mt-0'>
            <a href="#" className='hover:text-blue-400 transition-colors'>PRIVACY_POLICY</a>
            <a href="#" className='hover:text-blue-400 transition-colors'>TERMS_OF_SERVICE</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
