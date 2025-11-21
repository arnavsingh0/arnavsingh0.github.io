import { IoPlanet, IoCodeSlash, IoAirplane, IoPrism } from "react-icons/io5";
import { motion } from "framer-motion";
import myimage from "../assets/images/myimage.png";
import { SectionWrapper } from "../hoc";

const About = () => {
  const passions = [
    {
      icon: <IoPlanet className="w-8 h-8 text-purple-400" />,
      title: "Astronomy",
      desc: "Stargazing & Space Physics",
      color: "from-purple-500/20 to-blue-500/20",
    },
    {
      icon: <IoCodeSlash className="w-8 h-8 text-blue-400" />,
      title: "Coding",
      desc: "Full Stack & AI Development",
      color: "from-blue-500/20 to-cyan-500/20",
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

      <div className="container mx-auto px-6 relative z-10">

        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center md:text-left"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
              Hello, I'm <br />
              <span className="text-blue-500">Arnav Singh</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto md:mx-0">
              A <span className="text-white font-medium">Junior at Dartmouth College</span> 🌲 blending
              <span className="text-blue-400"> Physics</span>, <span className="text-blue-400">CS</span>, and <span className="text-blue-400">Math</span> to explore the cosmos and build the future.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <img
              src={myimage}
              alt="Arnav Singh"
              className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-black object-cover shadow-2xl transform transition-transform duration-500 group-hover:scale-105"
            />
          </motion.div>
        </div>

        {/* Passions Grid */}
        <div className="mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-12 text-center md:text-left"
          >
            What Drives Me
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {passions.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`p-6 rounded-2xl bg-gradient-to-br ${item.color} border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300 hover:-translate-y-2`}
              >
                <div className="mb-4 bg-black/30 w-14 h-14 rounded-xl flex items-center justify-center backdrop-blur-md">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Biography Detail */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-12 items-center mb-24 glass-panel p-8 md:p-12"
        >
          <div>
            <h3 className="text-2xl font-bold mb-6">My Journey</h3>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Born in Singapore and raised between the green hills of Ireland 🇮🇪 and the scenic landscapes of Upstate New York 🍁, I've always been looking up at the sky.
              </p>
              <p>
                My academic path is a fusion of rigorous scientific inquiry and creative engineering. Whether it's deriving equations for space physics or architecting full-stack applications, I thrive at the intersection of theory and application.
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            {/* Placeholder for a secondary image or graphic if desired, currently just a decorative element */}
            <div className="w-full h-48 md:h-full min-h-[200px] rounded-xl bg-gradient-to-br from-blue-900/30 to-purple-900/30 flex items-center justify-center border border-white/5">
              <span className="text-gray-500 font-mono text-sm">Creating Impact 🚀</span>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <div className="text-center">
          <motion.a
            href="/path-to-resume.pdf" // TODO: Replace with your resume link
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 bg-white text-black hover:bg-gray-200 font-bold py-4 px-10 rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            <span>View Resume</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </motion.a>
        </div>

      </div>
    </section>
  );
};

export default SectionWrapper(About, "about");