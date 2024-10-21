import { FaCalendarAlt } from 'react-icons/fa'; // Icon for duration
import lockheedLogo from '../assets/images/tesla.png'; // Example logo (add actual path to your logos)
import llnlLogo from '../assets/images/meta.png'; // Example logo
import dartmouthLogo from '../assets/images/starbucks.png'; // Example logo

const Experience = () => {
  const experiences = [
    {
      role: 'Software Engineering Intern',
      company: 'Lockheed Martin',
      duration: 'Summer 2025',
      logo: lockheedLogo,
    },
    {
      role: 'Research Assistant',
      company: 'Lawrence Livermore National Laboratory',
      duration: 'Fall 2024',
      logo: llnlLogo,
    },
    {
      role: 'Quantitative Researcher',
      company: 'Dartmouth Tech Consulting Group',
      duration: '2023 - Present',
      logo: dartmouthLogo,
    },
    //Adding more experience later
  ];

  return (
    <section id="experience" className="py-16 bg-black text-white relative">
      {/* Space-themed Background */}
      <div className="absolute inset-0 bg-cover bg-center galaxy-bg opacity-20 z-0"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Title */}
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-400 glow-effect">Experience</h2>

        {/* Experience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="experience-card bg-gray-900 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 relative"
            >
              {/* Glow effect around the card */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 opacity-30 blur-lg z-0"></div>

              <div className="flex flex-col items-center relative z-10">
                {/* Company Logo */}
                <img src={exp.logo} alt={`${exp.company} logo`} className="w-20 h-20 mb-4 object-contain" />
                
                {/* Role and Company */}
                <h3 className="text-xl font-semibold mb-2">{exp.role}</h3>
                <p className="text-gray-400 mb-2">{exp.company}</p>
                
                {/* Duration */}
                <div className="flex items-center space-x-2 text-gray-500">
                  <FaCalendarAlt />
                  <span>{exp.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;