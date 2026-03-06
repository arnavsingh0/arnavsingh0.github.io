import { FaCode, FaTools, FaRocket, FaPython, FaJava, FaReact, FaNodeJs, FaAws, FaDocker, FaGitAlt, FaLinux, FaPhp, FaAngular, FaVuejs } from 'react-icons/fa';
import { SiCplusplus, SiPostgresql, SiTensorflow, SiPandas, SiNumpy, SiScikitlearn, SiGo, SiR, SiRedux, SiGraphql, SiTypescript } from 'react-icons/si';
import { motion } from 'framer-motion';
import { SectionWrapper } from '../hoc';

const Skills = () => {
  const skillCategories = [
    {
      title: "Core Propulsion (Languages)",
      icon: <FaCode className="text-blue-400" />,
      skills: [
        { name: "Python", icon: <FaPython className="text-yellow-300" /> },
        { name: "TypeScript", icon: <SiTypescript className="text-blue-500" /> },
        { name: "JavaScript", icon: <FaNodeJs className="text-yellow-400" /> },
        { name: "Go", icon: <SiGo className="text-cyan-400" /> },
        { name: "Java", icon: <FaJava className="text-red-400" /> },
        { name: "C/C++", icon: <SiCplusplus className="text-blue-600" /> },
        { name: "SQL", icon: <SiPostgresql className="text-blue-300" /> },
        { name: "Bash", icon: <FaLinux className="text-gray-400" /> },
        { name: "R", icon: <SiR className="text-blue-500" /> },
        { name: "MATLAB", icon: <FaCode className="text-orange-500" /> },
        { name: "PHP", icon: <FaPhp className="text-indigo-400" /> },
      ]
    },
    {
      title: "Navigational Systems (Frameworks & Libraries)",
      icon: <FaRocket className="text-purple-400" />,
      skills: [
        { name: "React", icon: <FaReact className="text-cyan-400" /> },
        { name: "Angular", icon: <FaAngular className="text-red-500" /> },
        { name: "Vue", icon: <FaVuejs className="text-green-500" /> },
        { name: "Node.js", icon: <FaNodeJs className="text-green-600" /> },
        { name: "Redux", icon: <SiRedux className="text-purple-500" /> },
        { name: "GraphQL", icon: <SiGraphql className="text-pink-500" /> },
        { name: "TensorFlow", icon: <SiTensorflow className="text-orange-500" /> },
        { name: "Pandas", icon: <SiPandas className="text-purple-500" /> },
        { name: "NumPy", icon: <SiNumpy className="text-blue-400" /> },
        { name: "Scikit-learn", icon: <SiScikitlearn className="text-orange-300" /> },
      ]
    },
    {
      title: "Mission Equipment (Tools & Platforms)",
      icon: <FaTools className="text-green-400" />,
      skills: [
        { name: "AWS (WAF/Shield)", icon: <FaAws className="text-orange-400" /> },
        { name: "Docker", icon: <FaDocker className="text-blue-500" /> },
        { name: "Git", icon: <FaGitAlt className="text-red-500" /> },
        { name: "Linux", icon: <FaLinux className="text-yellow-100" /> },
        { name: "REST APIs", icon: <FaCode className="text-gray-300" /> },
      ]
    }
  ];

  return (
    <section className="py-10 bg-black text-white relative z-10">
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
                  VANGUARD OS v2.0 // LOADOUT
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
                  Rover Loadout
                </h2>
                <p className="text-gray-400 text-lg">
                  The onboard systems, navigational frameworks, and mission-critical tools powering my expeditions.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {skillCategories.map((category, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="glass-panel p-8 hover:bg-white/5 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-8 pb-3 border-b border-white/10">
                      <div className="w-6 h-1 bg-blue-500 rounded-full"></div>
                      <h3 className="text-xs font-mono tracking-widest text-gray-400">{category.title.toUpperCase()}{' //'}</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {category.skills.map((skill, idx) => (
                        <motion.div
                          key={idx}
                          whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                          className="flex items-center gap-3 p-3 rounded-lg bg-white/5 transition-colors cursor-default"
                        >
                          <div className="text-xl">{skill.icon}</div>
                          <span className="text-sm font-medium text-gray-300">{skill.name}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const SkillsSection = SectionWrapper(Skills, "skills");
export default SkillsSection;