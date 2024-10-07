import { CTA } from "../components";
import Education from "./Education";
import Skills from "./Skills";
import Projects from "./Projects";
import Research from "./Research";
import Experience from "./Experience";

const About = () => {
  return (
    <section id="about" className="max-container overflow-y-auto h-screen px-4 py-10">
      {/* Title Section */}
      <h1 className="text-4xl font-bold text-white text-center">
        Hello, I'm <span className="blue-gradient_text font-semibold drop-shadow">Arnav Singh</span> 👋
      </h1>
      <div className="mt-5 text-center text-white">
        <p className="text-lg">
          Welcome! My name is Arnav Singh, a Junior at Dartmouth College 🌲, double-majoring in Physics and Computer Science with a Mathematics modification.
        </p>
        <p className="text-lg">
          I'm passionate about space physics, aerospace research, and applying machine learning to solve complex scientific problems.
        </p>
      </div>

      {/* Work Experience Section */}
      <div className="py-10">
        <h3 className="text-3xl text-sky-400 font-semibold mb-4">Work Experience</h3>
        <Experience />
      </div>

      {/* Skills Section */}
      <div className="py-10">
        <h3 className="text-3xl text-sky-400 font-semibold mb-4">Skills</h3>
        <Skills />
      </div>

      {/* Projects Section */}
      <div className="py-10">
        <h3 className="text-3xl text-sky-400 font-semibold mb-4">Projects</h3>
        <Projects />
      </div>

      {/* Research Section */}
      <div className="py-10">
        <h3 className="text-3xl text-sky-400 font-semibold mb-4">Research</h3>
        <Research />
      </div>

      {/* Education Section */}
      <div className="py-10">
        <h3 className="text-3xl text-sky-400 font-semibold mb-4">Education</h3>
        <Education />
      </div>

      {/* Call-to-Action (CTA) */}
      <hr className="border-slate-200 my-8" />
      <CTA />
    </section>
  );
};

export default About;