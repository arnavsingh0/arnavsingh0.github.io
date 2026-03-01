import { IoPlanet, IoCodeSlash, IoAirplane, IoPrism } from "react-icons/io5";
import { motion } from "framer-motion";
import myimage from "../assets/images/myimage.png";
import { SectionWrapper } from "../hoc";

import Map from "../components/Map";
import dartmouthLogo from '../assets/images/dartmouth.png';

const About = () => {
  const passions = [
    {
      icon: <IoCodeSlash className="w-8 h-8 text-blue-400" />,
      title: "Cool Software",
      desc: "Engineering & Innovation",
      color: "from-blue-500/20 to-cyan-500/20",
    },
    {
      icon: <IoPlanet className="w-8 h-8 text-purple-400" />,
      title: "Astronomy",
      desc: "Stargazing & Space Physics",
      color: "from-purple-500/20 to-blue-500/20",
    },
    {
      icon: <IoPrism className="w-8 h-8 text-pink-400" />,
      title: "Physics",
      desc: "Laws of the Universe",
      color: "from-pink-500/20 to-rose-500/20",
    },
    {
      icon: <IoAirplane className="w-8 h-8 text-sky-400" />,
      title: "Aerospace",
      desc: "Aviation & Flight Dynamics",
      color: "from-sky-500/20 to-indigo-500/20",
    },
  ];

  return (
    <section id="about" className="min-h-screen py-20 bg-black text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          {/* Main Dashboard Container */}
          <div className="relative bg-black/80 border border-white/10 rounded-3xl backdrop-blur-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">

            {/* Dashboard Header Bar */}
            <div className="bg-gradient-to-r from-white/5 to-transparent border-b border-white/10 p-3 sm:p-5 flex justify-between items-center sm:pr-8">
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_10px_rgba(34,197,94,0.5)] animate-pulse"></div>
                </div>
                <h3 className="font-mono text-xs sm:text-sm tracking-[0.2em] text-gray-400 hidden sm:block">VANGUARD OS v2.0 // COMMAND_INTERFACE</h3>
              </div>
              <div className="font-mono text-xs text-blue-400 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                SYSTEM_ONLINE
              </div>
            </div>

            {/* Dashboard Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-1 p-1 bg-white/5">

              {/* Left Column: Profile & Bio (Spans 4 cols on LG) */}
              <div className="lg:col-span-4 bg-black/60 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="relative group mb-8 mx-auto w-48 h-48 sm:w-64 sm:h-64 lg:w-full lg:h-auto lg:aspect-square">
                    <div className="absolute -inset-1 bg-gradient-to-tr from-blue-600/50 to-purple-600/50 rounded-2xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000"></div>
                    <img
                      src={myimage}
                      alt="Arnav Singh"
                      className="relative w-full h-full rounded-2xl border border-white/20 object-cover shadow-2xl"
                    />
                    {/* Overlay HUD elements */}
                    <div className="absolute top-2 left-2 pb-1 border-l-2 border-t-2 border-white/30 w-8 h-8"></div>
                    <div className="absolute bottom-2 right-2 pt-1 border-r-2 border-b-2 border-white/30 w-8 h-8"></div>
                  </div>

                  <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    Arnav Singh
                  </h1>
                  <p className="text-blue-400 font-mono text-sm mb-6 tracking-wider">COMMANDER // ENG-SCI DIV</p>

                  <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
                    <p>
                      A <span className="text-white font-medium">Senior at Dartmouth College</span> 🌲 fusing Physics, CS, and Math to build the future and explore the cosmos.
                    </p>
                    <p>
                      Born in Singapore, raised between the green hills of Ireland 🇮🇪 and the scenic landscapes of Upstate New York 🍁. Always looking up at the sky.
                    </p>
                  </div>
                </div>

                {/* View Resume Button inside the left panel at the bottom */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <motion.button
                    onClick={() => {
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-sm py-3 px-6 rounded-lg transition-all"
                  >
                    <span>CONTACT</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </motion.button>
                </div>
              </div>

              {/* Right Side: Data Modules (Spans 8 cols on LG) */}
              <div className="lg:col-span-8 flex flex-col gap-1">

                {/* Top Right: Mission Directives (Passions) */}
                <div className="bg-black/60 p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-1 bg-blue-500 rounded-full"></div>
                    <h3 className="font-mono text-sm tracking-[0.2em] text-gray-400">MISSION_DIRECTIVES //</h3>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {passions.map((item, index) => (
                      <div key={index} className="flex flex-col items-center sm:items-start text-center sm:text-left gap-3 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                        <div className="bg-black/50 p-2 rounded-lg">{item.icon}</div>
                        <div>
                          <p className="text-white font-bold text-sm">{item.title}</p>
                          <p className="text-gray-500 text-xs hidden sm:block">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Right: Coordinates & Credentials Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 flex-1">

                  {/* Bottom Left-ish: Map Module */}
                  <div className="lg:col-span-2 bg-black/60 p-6 sm:p-8 flex flex-col min-h-[350px] sm:min-h-[400px] relative overflow-hidden group">
                    {/* Subtle grid background */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>

                    {/* Header */}
                    <div className="flex items-center justify-between mb-6 z-10 relative">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-1 bg-green-500 rounded-full"></div>
                        <h3 className="font-mono text-sm tracking-[0.2em] text-gray-400 whitespace-nowrap">COORDINATES //</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span>
                        <p className="font-mono text-[10px] text-green-500 tracking-widest hidden sm:block">TRACKING_ON</p>
                      </div>
                    </div>

                    <div className="w-full flex-grow flex items-center justify-center scale-90 sm:scale-100 group-hover:scale-[1.02] transition-transform duration-700 z-10 relative">
                      <Map />
                    </div>
                  </div>

                  {/* Bottom Right-ish: Education Module */}
                  <div className="lg:col-span-1 bg-black/60 p-6 flex flex-col relative overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6 z-10 relative">
                      <div className="w-4 h-1 bg-purple-500 rounded-full"></div>
                      <h3 className="font-mono text-[10px] sm:text-xs tracking-[0.2em] text-gray-400">CREDENTIALS //</h3>
                    </div>

                    {/* Stacked Layout for Narrow Column */}
                    <div className="flex flex-col gap-4 items-center sm:items-start flex-grow justify-start z-10 relative">
                      {/* Logo Orbit */}
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
                        <div className="absolute inset-0 border border-purple-500/30 rounded-full animate-[spin_10s_linear_infinite]" />
                        <div className="absolute inset-1 border border-dashed border-blue-500/30 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                        <div className="absolute inset-0 flex items-center justify-center p-3 bg-black rounded-full z-10">
                          <img src={dartmouthLogo} alt="Dartmouth College" className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]" />
                        </div>
                      </div>

                      <div className="flex-1 text-center sm:text-left">
                        <h4 className="text-lg font-bold text-white mb-0.5">Dartmouth College</h4>
                        <p className="text-purple-400 text-[11px] sm:text-xs mb-4">B.A. Physics & Math / CS, Jun 2026</p>

                        <div className="bg-black/50 border border-white/5 rounded-lg p-2.5 mb-4 inline-block sm:block w-full sm:w-auto text-left">
                          <p className="text-[9px] sm:text-[10px] font-mono text-gray-500 mb-0.5">GPA_OVERALL</p>
                          <p className="text-xs sm:text-sm text-green-400 font-mono">3.9 / 4.0</p>
                        </div>

                        <div className="flex flex-wrap justify-center sm:justify-start gap-1.5 mb-4">
                          <span className="text-[8px] sm:text-[9px] font-mono bg-purple-500/10 border border-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded">PHYSICS</span>
                          <span className="text-[8px] sm:text-[9px] font-mono bg-blue-500/10 border border-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded">CS</span>
                          <span className="text-[8px] sm:text-[9px] font-mono bg-green-500/10 border border-green-500/20 text-green-300 px-1.5 py-0.5 rounded">MATH</span>
                        </div>

                        <div className="border-t border-white/10 pt-3 hidden sm:block">
                          <p className="text-[8px] sm:text-[9px] font-mono text-gray-500 mb-1.5">RELEVANT_COURSEWORK //</p>
                          <p className="text-[10px] text-gray-400 leading-relaxed pr-2">
                            ML (Grad), AI (Grad), Quantum Mechanics, Security & Privacy, Software Design, App Dev.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const AboutSection = SectionWrapper(About, "about");
export default AboutSection;