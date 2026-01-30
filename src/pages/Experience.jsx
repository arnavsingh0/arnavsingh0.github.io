import { FaBriefcase, FaGraduationCap } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { SectionWrapper } from '../hoc';
import playstationLogo from '../assets/images/playstation.png'; // Using placeholder logos for now
import llnlLogo from '../assets/images/saao.png';
import dartmouthLogo from '../assets/images/dartmouth.png';
import dPineLogo from '../assets/images/D-Pine_Black.png';

const Experience = () => {
  const experiences = [
    {
      type: 'work',
      role: 'Software Engineer Intern',
      company: 'PlayStation (Sony Interactive Entertainment)',
      duration: 'Jun – Dec 2025',
      logo: playstationLogo,
      desc: "Co-leading development of a React-based internal analytics app for cloud gaming. Building modular TypeScript components for an internal SDK and enhancing application scalability."
    },
    {
      type: 'work',
      role: 'Undergraduate Researcher',
      company: 'South African Astronomical Observatory',
      duration: 'Jan – March 2025',
      logo: llnlLogo,
      desc: "Co-authored a research paper on Cataclysmic Binary Stars. Developed an end-to-end Python data pipeline for telescope imaging and engineered automated QC tools."
    },
    {
      type: 'work',
      role: 'Presidential Researcher',
      company: 'Millan Research Lab',
      duration: 'Jan 2024 – Present',
      logo: dPineLogo,
      desc: "Built ensemble ML models for a $150M NASA mission, improving space-weather forecasts by 2.5x. Designed multimodal ML pipelines for magnetosphere prediction."
    },
    {
      type: 'work',
      role: 'Software Engineer Consultant',
      company: 'DTCG',
      duration: 'Sept – Dec 2024',
      logo: dPineLogo,
      desc: "Delivered a full-stack market-making simulation with Django backend and React frontend. Engineered a dynamic P&L tracking system for 300+ users."
    },
    {
      type: 'work',
      role: 'CS Teaching Assistant',
      company: 'Dartmouth Computer Science Dept.',
      duration: 'Aug 2024 – Present',
      logo: dartmouthLogo,
      desc: "Mentoring 350+ students across Web Programming, Cybersecurity, and ML courses. Debugging projects in Python, C/C++, and JavaScript."
    }
  ];

  const education = [
    {
      type: 'edu',
      role: 'Dartmouth College',
      company: 'Bachelor of Arts',
      duration: 'June 2026',
      logo: dartmouthLogo,
      desc: "Double Major in Computer Science & Physics, Minor in Mathematics. GPA: 3.9/4.0.",
      coursework: "Relevant Coursework: Machine Learning (Grad), AI (Grad), Quantum Mechanics, Security & Privacy, Software Design & Implementation, DSA & OOP."
    }
  ];

  return (
    <section id="experience" className="py-10 relative z-10 text-white">
      <div className="container mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            My Journey
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A timeline of my professional growth and academic milestones.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Experience Column */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-8">
              <FaBriefcase className="text-2xl text-blue-400" />
              <h3 className="text-2xl font-bold">Experience</h3>
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
                  <div className="flex items-center justify-between mb-4">
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

          {/* Education Column */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-8">
              <FaGraduationCap className="text-2xl text-purple-400" />
              <h3 className="text-2xl font-bold">Education</h3>
            </div>

            {education.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative pl-8 border-l-2 border-white/10 hover:border-purple-500 transition-colors duration-300"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-black border-2 border-white/30 group-hover:border-purple-500 transition-colors duration-300" />

                <div className="glass-panel p-6 transform transition-all duration-300 hover:bg-white/5 hover:translate-x-2">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-white/10 p-2 flex items-center justify-center">
                        <img src={item.logo} alt={item.company} className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white">{item.role}</h4>
                        <p className="text-purple-400 text-sm">{item.company}</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-gray-500 border border-white/10 px-2 py-1 rounded-full">
                      {item.duration}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {item.desc}
                  </p>
                  <p className="text-gray-500 text-xs italic">
                    {item.coursework}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">Physics</span>
                    <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">Computer Science</span>
                    <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">Math</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionWrapper(Experience, "experience");