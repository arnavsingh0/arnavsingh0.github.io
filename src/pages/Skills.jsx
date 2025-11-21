import { FaCode, FaDatabase, FaTools, FaRocket, FaPython, FaJava, FaRust, FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaAws, FaDocker, FaGitAlt, FaLinux, FaPhp, FaAngular, FaVuejs } from 'react-icons/fa';
import { SiCplusplus, SiMongodb, SiPostgresql, SiTensorflow, SiPandas, SiNumpy, SiScikitlearn, SiGo, SiR, SiRedux, SiGraphql, SiTypescript } from 'react-icons/si';
import { motion } from 'framer-motion';
import { SectionWrapper } from '../hoc';

const Skills = () => {
  const skillCategories = [
    {
      title: "Languages",
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
      title: "Frameworks & Libraries",
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
      title: "Tools & Platforms",
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
      <div className="container mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Technical Arsenal
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A comprehensive list of the languages, frameworks, and tools I work with.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="glass-panel p-8 hover:bg-white/5 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="text-2xl">{category.icon}</div>
                <h3 className="text-xl font-bold">{category.title}</h3>
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
    </section>
  );
};

export default SectionWrapper(Skills, "skills");