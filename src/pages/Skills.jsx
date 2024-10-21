import { FaCode, FaDatabase, FaCogs, FaRocket } from 'react-icons/fa'; // Icons for different skills

const Skills = () => {
  // Programming languages with proficiency levels
  const programmingLanguages = [
    { name: 'Python', level: 90 },
    { name: 'Java', level: 80 },
    { name: 'C & C++', level: 85 },
    { name: 'Rust', level: 75 },
    { name: 'JavaScript (React, Node.js)', level: 85 },
    { name: 'HTML & CSS', level: 95 },
  ];

  return (
    <section id="skills" className="py-16 bg-black text-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Title */}
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-400">Skills</h2>

        {/* Programming Languages Section with Progress Bars */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg mb-12">
          <h3 className="text-3xl font-semibold mb-6 text-indigo-400 flex items-center">
            <FaCode className="text-blue-400 mr-3" /> Programming Languages
          </h3>
          <div className="space-y-6">
            {programmingLanguages.map((lang, idx) => (
              <div key={idx} className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-lg font-medium text-white">{lang.name}</span>
                  <span className="text-sm text-gray-400">{lang.level}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4">
                  <div
                    className="bg-indigo-500 h-4 rounded-full"
                    style={{ width: `${lang.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skill Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Databases & Data Science */}
          <div className="skill-card bg-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
            <FaDatabase className="text-4xl text-yellow-400 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Databases & Data Science</h3>
            <ul className="space-y-2">
              <li>SQL</li>
              <li>MongoDB</li>
              <li>Data Visualization (Matplotlib, Seaborn)</li>
              <li>Machine Learning (scikit-learn, TensorFlow)</li>
              <li>Pandas & NumPy</li>
            </ul>
          </div>

          {/* Tools & Technologies */}
          <div className="skill-card bg-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
            <FaCogs className="text-4xl text-green-400 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Tools & Technologies</h3>
            <ul className="space-y-2">
              <li>Git & GitHub</li>
              <li>AWS & Cloud Computing</li>
              <li>Docker</li>
              <li>CI/CD Pipelines</li>
              <li>Linux & Bash</li>
            </ul>
          </div>

          {/* Aerospace & Physics */}
          <div className="skill-card bg-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
            <FaRocket className="text-4xl text-red-400 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Aerospace & Physics</h3>
            <ul className="space-y-2">
              <li>Aerodynamics & Propulsion</li>
              <li>Finite Element Analysis (FEA)</li>
              <li>Space Physics</li>
              <li>SolidWorks CAD</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;