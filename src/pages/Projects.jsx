import { Link } from "react-router-dom";
import { useState } from "react";
import { projects, publications } from "../constants";
import { arrow } from "../assets/icons";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "../hoc";
import Carousel from "../components/Carousel";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  // Separate projects into Engineering and Research for better organization
  const engineeringProjects = projects.filter(p => !p.isResearch);
  const researchProjects = publications;

  return (
    <section id="projects" className="py-10 relative z-10 text-white">
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
                  VANGUARD OS v2.0 // PROJECTS_&_RESEARCH
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
                  Selected Work
                </h2>
                <p className="text-gray-400 text-lg">
                  A showcase of my engineering projects and scientific research.
                </p>
              </div>

              {/* Engineering Projects */}
              <div className="mb-20">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-1 bg-blue-500 rounded-full"></div>
                  <h3 className="font-mono text-sm tracking-[0.2em] text-gray-400">ENGINEERING //</h3>
                </div>
                <Carousel>
                  {engineeringProjects.map((project, index) => (
                    <motion.div
                      key={project.name}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true, margin: "-50px" }}
                      onClick={() => setSelectedProject(project)}
                      className="min-w-[280px] max-w-[280px] sm:min-w-[350px] sm:max-w-[350px] flex-shrink-0 snap-center glass-panel p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group cursor-pointer border border-white/5 hover:border-blue-500/50 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 hover:z-50 relative overflow-hidden flex flex-col"
                    >
                      <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${project.theme} shadow-lg z-10`}>
                        {typeof project.iconUrl === 'string' ? (
                          <img
                            src={project.iconUrl}
                            alt={project.name}
                            className='w-1/2 h-1/2 object-contain'
                          />
                        ) : (
                          <project.iconUrl className='w-1/2 h-1/2 text-white' />
                        )}
                      </div>

                      <h4 className='text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors z-10'>
                        {project.name}
                      </h4>
                      <p className='text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 z-10'>
                        {project.description}
                      </p>

                      {/* Tech Tags */}
                      {project.tags && (
                        <div className="flex flex-wrap gap-2 mb-6 mt-auto z-10">
                          {project.tags.slice(0, 3).map((tag, idx) => (
                            <span key={idx} className="text-[10px] font-mono bg-blue-500/10 text-blue-300 px-2 py-1 rounded border border-blue-500/20">
                              {tag}
                            </span>
                          ))}
                          {project.tags.length > 3 && (
                            <span className="text-[10px] font-mono text-gray-500 px-2 py-1">+{project.tags.length - 3}</span>
                          )}
                        </div>
                      )}

                      <div className='flex items-center gap-2 mt-4 pt-4 border-t border-white/10 w-full z-10'>
                        <span className='font-mono text-xs text-blue-400 group-hover:text-blue-300 transition-colors tracking-widest'>
                          ACCESS_DATA //
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </Carousel>
              </div>

              {/* Research Projects */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-1 bg-purple-500 rounded-full"></div>
                  <h3 className="font-mono text-sm tracking-[0.2em] text-gray-400 whitespace-nowrap">RESEARCH //</h3>
                </div>
                <Carousel>
                  {researchProjects.map((project, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true, margin: "-50px" }}
                      className="min-w-[280px] max-w-[280px] sm:min-w-[350px] sm:max-w-[350px] flex-shrink-0 snap-center glass-panel p-6 sm:p-8 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 relative overflow-hidden group hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20 hover:z-50 hover:border-purple-500/50 border border-white/5 flex flex-col"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-purple-500/30" />

                      <h4 className="text-2xl font-bold text-white mb-4 z-10 group-hover:text-purple-400 transition-colors">{project.name}</h4>
                      <p className="text-gray-400 leading-relaxed mb-6 z-10 flex-grow">{project.description}</p>

                      <div className="flex flex-wrap gap-2 mb-6 z-10 mt-auto">
                        {project.tags.map((tag, idx) => (
                          <span key={idx} className="text-[10px] font-mono bg-purple-500/10 text-purple-300 px-3 py-1 rounded border border-purple-500/20">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="pt-4 border-t border-white/10 w-full z-10 mt-2">
                        <Link
                          to={project.link}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='inline-flex items-center gap-2 text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors'
                        >
                          Read Publication <span className="text-lg">→</span>
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </Carousel>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Command Interface Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-2xl bg-black/90 border border-blue-500/30 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(59,130,246,0.15)] flex flex-col max-h-[90vh]"
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-blue-500/5">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-8 h-1 bg-blue-500 rounded-full flex-shrink-0"></div>
                    <p className="font-mono text-[10px] sm:text-xs text-blue-400 tracking-widest truncate">
                      DATABANK_ACCESS // {selectedProject.name.toUpperCase()}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
                  <div className="flex flex-col sm:flex-row items-start gap-6 mb-8">
                    <div className={`w-16 h-16 rounded-xl flex-shrink-0 flex items-center justify-center ${selectedProject.theme} shadow-lg`}>
                      {typeof selectedProject.iconUrl === 'string' ? (
                        <img src={selectedProject.iconUrl} alt={selectedProject.name} className='w-1/2 h-1/2 object-contain' />
                      ) : (
                        <selectedProject.iconUrl className='w-1/2 h-1/2 text-white' />
                      )}
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{selectedProject.name}</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tags?.map((tag, idx) => (
                          <span key={idx} className="text-[10px] font-mono bg-blue-500/10 text-blue-300 px-2 py-1 rounded border border-blue-500/20">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-mono text-xs tracking-[0.2em] text-gray-500 mb-3">MISSION_SUMMARY //</h4>
                      <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                        {selectedProject.longDescription || selectedProject.description}
                      </p>
                    </div>

                    <div className="pt-8 flex justify-end">
                      <Link
                        to={selectedProject.link}
                        target={selectedProject.link.startsWith('http') ? '_blank' : undefined}
                        rel={selectedProject.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className='group flex items-center justify-center gap-3 bg-white/10 border border-white/20 hover:bg-blue-600 hover:border-blue-500 text-white font-mono text-sm px-6 py-3 rounded-lg transition-all w-full sm:w-auto'
                        onClick={() => setSelectedProject(null)}
                      >
                        <span>INITIATE_LINK</span>
                        <img src={arrow} alt='arrow' className='w-4 h-4 object-contain brightness-200 group-hover:translate-x-1 transition-transform' />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const ProjectsSection = SectionWrapper(Projects, "projects");
export default ProjectsSection;
