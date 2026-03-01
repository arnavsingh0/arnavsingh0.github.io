
import { motion } from 'framer-motion';
import { SectionWrapper } from '../hoc';
import { experiences } from '../constants';

const Experience = () => {
  return (
    <section id="experience" className="py-10 relative z-10 text-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Main Dashboard Panel */}
          <div className="w-full bg-black/80 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md shadow-2xl shadow-blue-900/20">

            {/* Dashboard Header Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80 animate-pulse"></div>
                </div>
                <p className="font-mono text-xs text-gray-400 tracking-widest ml-4 hidden sm:block">
                  VANGUARD OS v2.0 // MISSION_LOG
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></div>
                <p className="font-mono text-xs text-blue-400 tracking-widest">SYSTEM_ONLINE</p>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="p-6 md:p-10 lg:p-12">
              <div className="mb-12 text-center sm:text-left">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  My Journey
                </h2>
                <p className="text-gray-400 text-lg">
                  A timeline of my professional growth and academic milestones.
                </p>
              </div>

              <div className="max-w-4xl mx-auto sm:ml-0">
                {/* Experience Column */}
                <div className="space-y-8">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-8 h-1 bg-blue-500 rounded-full"></div>
                    <h3 className="font-mono text-sm tracking-[0.2em] text-gray-400">CAREER_TRAJECTORY //</h3>
                  </div>

                  {experiences.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group relative pl-8 border-l-2 border-white/10 hover:border-blue-500 transition-colors duration-300"
                    >
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-black border-2 border-white/30 group-hover:border-blue-500 transition-colors duration-300" />

                      <div className="glass-panel p-6 transform transition-all duration-300 hover:bg-white/5 hover:translate-x-2">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mb-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-white/10 p-2 flex items-center justify-center">
                              <img src={item.logo} alt={item.company} className="w-full h-full object-contain" />
                            </div>
                            <div>
                              <h4 className="text-lg font-bold text-white">{item.role}</h4>
                              <p className="text-blue-400 text-sm">{item.company}</p>
                            </div>
                          </div>
                          <span className="text-xs font-mono text-gray-500 border border-white/10 px-2 py-1 rounded-full">
                            {item.duration}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ExperienceSection = SectionWrapper(Experience, "experience");
export default ExperienceSection;