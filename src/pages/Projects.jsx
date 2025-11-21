import { Link } from "react-router-dom";
import { projects } from "../constants";
import { arrow } from "../assets/icons";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";

const Projects = () => {
  // Separate projects into Engineering and Research for better organization
  const engineeringProjects = projects.filter(p => !p.isResearch);
  const researchProjects = [
    {
      name: "Cataclysmic Binary Stars",
      description: "Co-authored a research paper on the photometric analysis of cataclysmic variable stars.",
      tags: ["Astrophysics", "Python", "Data Science"],
      link: "https://arxiv.org/abs/2511.12762"
    },
    {
      name: "Magnetosphere Prediction",
      description: "Designed multimodal ML pipelines improving rapid space-weather forecasting accuracy via Open-Close Boundary.",
      tags: ["Machine Learning", "NASA", "Space Weather"],
      link: "https://github.com/arnavsingh0"
    }
  ];

  return (
    <section id="projects" className="py-10 relative z-10 text-white">
      <div className="container mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Selected Work
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A showcase of my engineering projects and scientific research.
          </p>
        </motion.div>

        {/* Engineering Projects */}
        <div className="mb-24">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold mb-8 border-l-4 border-blue-500 pl-4"
          >
            Engineering
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {engineeringProjects.map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-panel p-6 rounded-xl hover:bg-white/5 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${project.theme} shadow-lg`}>
                  <img
                    src={project.iconUrl}
                    alt='threads'
                    className='w-1/2 h-1/2 object-contain'
                  />
                </div>

                <h4 className='text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors'>
                  {project.name}
                </h4>
                <p className='text-gray-400 text-sm leading-relaxed mb-6'>
                  {project.description}
                </p>

                <div className='mt-auto flex items-center gap-2'>
                  <Link
                    to={project.link}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='font-semibold text-blue-400 hover:text-blue-300 transition-colors'
                  >
                    View Project
                  </Link>
                  <img
                    src={arrow}
                    alt='arrow'
                    className='w-4 h-4 object-contain opacity-70 group-hover:translate-x-1 transition-transform'
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Research Projects */}
        <div>
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold mb-8 border-l-4 border-purple-500 pl-4"
          >
            Research
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {researchProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-panel p-8 rounded-xl hover:bg-white/5 transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-purple-500/20" />

                <h4 className="text-2xl font-bold text-white mb-4">{project.name}</h4>
                <p className="text-gray-400 leading-relaxed mb-6">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="text-xs font-mono bg-purple-500/10 text-purple-300 px-3 py-1 rounded-full border border-purple-500/20">
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  to={project.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-2 text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors'
                >
                  Read Publication <span className="text-lg">→</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default SectionWrapper(Projects, "projects");
