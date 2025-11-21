import { Link } from "react-router-dom";
import { socialLinks } from "../constants";

const Footer = () => {
  return (
    <footer className='bg-black border-t border-gray-800 pt-12 pb-8 font-inter'>
      <div className='container mx-auto px-6 lg:px-8'>
        <div className='flex flex-col md:flex-row justify-between items-center md:items-start gap-8'>

          {/* Brand & Tagline */}
          <div className='flex flex-col items-center md:items-start'>
            <Link to="/" className='text-2xl font-bold text-white tracking-tighter hover:text-gray-300 transition-colors'>
              AS
            </Link>
            <p className='mt-2 text-gray-500 text-sm text-center md:text-left max-w-xs'>
              Building the future with code and creativity.
            </p>
          </div>

          {/* Quick Links */}
          <div className='flex gap-8 text-sm font-medium text-gray-400'>
            <a href="#about" className='hover:text-white transition-colors'>About</a>
            <a href="#projects" className='hover:text-white transition-colors'>Projects</a>
            <a href="#experience" className='hover:text-white transition-colors'>Experience</a>
            <a href="#contact" className='hover:text-white transition-colors'>Contact</a>
          </div>

          {/* Social Links */}
          <div className='flex gap-4'>
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.link}
                target='_blank'
                rel="noopener noreferrer"
                className='w-10 h-10 flex justify-center items-center rounded-full bg-gray-900 border border-gray-800 hover:bg-gray-800 hover:border-gray-700 transition-all duration-300 group'
              >
                <img
                  src={link.iconUrl}
                  alt={link.name}
                  className='w-5 h-5 object-contain opacity-70 group-hover:opacity-100 transition-opacity'
                />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className='my-8 border-t border-gray-900'></div>

        {/* Copyright */}
        <div className='flex flex-col md:flex-row justify-between items-center text-xs text-gray-600'>
          <p>
            © {new Date().getFullYear()} Arnav Singh. All rights reserved.
          </p>
          <div className='flex gap-4 mt-4 md:mt-0'>
            <a href="#" className='hover:text-gray-400 transition-colors'>Privacy Policy</a>
            <a href="#" className='hover:text-gray-400 transition-colors'>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
