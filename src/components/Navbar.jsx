import { useState, useEffect } from "react";
import { logo } from "../assets/images";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for tracking sections
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observerOptions = {
      threshold: 0.3, // Trigger earlier for better UX
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "backdrop-blur-xl bg-black/70 border-b border-white/10 shadow-lg py-3" : "bg-transparent py-6"
        }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">

        {/* Minimalist Logo */}
        <a
          href="/"
          className="flex items-center gap-2"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <img src={logo} alt='logo' className='w-9 h-9 object-contain' />
          <p className="text-2xl font-bold tracking-tighter hover:text-gray-300 transition-colors">AS</p>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8 text-sm font-medium tracking-wide items-center">
          {["about", "experience", "projects", "contact"].map((link) => (
            <a
              key={link}
              href={`#${link}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link);
              }}
              className={`transition-colors duration-300 hover:text-white ${activeSection === link ? "text-white" : "text-gray-400"
                }`}
            >
              {link.charAt(0).toUpperCase() + link.slice(1)}
            </a>
          ))}
          <div className="relative group flex items-center">
            <a
              href="/plain"
              className="transition-colors duration-300 hover:text-white text-gray-500 font-mono text-xs border border-white/10 px-2 py-1 rounded"
            >
              [Plain.html]
            </a>
            {/* Tooltip */}
            <div className="absolute top-full right-0 mt-3 px-3 py-1.5 bg-black/90 border border-white/10 text-gray-300 text-[10px] uppercase tracking-wider font-mono whitespace-nowrap rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none z-50">
              Low-bandwidth / Accessible View
            </div>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? "max-h-96 py-6 border-white/10 shadow-2xl" : "max-h-0 py-0 border-transparent"}`}
      >
        <nav className="flex flex-col items-center space-y-6">
          {["about", "experience", "projects", "contact"].map((link) => (
            <a
              key={link}
              href={`#${link}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link);
                setIsMobileMenuOpen(false);
              }}
              className={`transition-colors duration-300 hover:text-white text-lg font-medium tracking-wide ${activeSection === link ? "text-white" : "text-gray-400"
                }`}
            >
              {link.charAt(0).toUpperCase() + link.slice(1)}
            </a>
          ))}
          <div className="relative group flex flex-col items-center mt-2">
            <a
              href="/plain"
              className="transition-colors duration-300 hover:text-white text-gray-500 font-mono text-sm border border-white/10 px-4 py-2 rounded"
            >
              [Plain.html]
            </a>
            <p className="text-gray-500 text-[10px] mt-1 font-mono uppercase tracking-wider">
              Low-bandwidth / Accessible View
            </p>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
