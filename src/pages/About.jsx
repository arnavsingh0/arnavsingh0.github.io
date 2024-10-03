import { CTA } from "../components";
import Education from "./Education";
import Skills from "./Skills";
import Projects from "./Projects";
import Research from "./Research";
import Experience from "./Experience";

const About = () => {
  return (
    <section id="about" className="max-container">
      <h1 className="head-text">
        Hello, I'm <span className="blue-gradient_text font-semibold drop-shadow">Arnav</span> 👋
      </h1>
      <div className="mt-5 flex flex-col gap-3 text-white">
        <p>
          Welcome! My name is Arnav Singh, and I'm a Junior at Dartmouth College🌲 pursuing a double major in Physics and Computer Science/Math.
        </p>
      </div>

      <div className="py-16">
        <h3 className="subhead-text">Work Experience.</h3>
        <Projects />
      </div>

      <div className="py-10 flex flex-col">
        <h3 className="subhead-text">My Skills</h3>
        {/* Skills section can be included here if needed */}
        <Skills />
      </div>

      <div className="py-16">
        <h3 className="subhead-text">Work Experience.</h3>
        <Experience />
      </div>

      <div className="py-16">
        <h3 className="subhead-text">Education</h3>
        <Education />
      </div>

      <div className="py-16">
        <h3 className="subhead-text">Projects</h3>
        <Projects />
      </div>

      <div className="py-16">
        <h3 className="subhead-text">Research</h3>
        <Research />
      </div>

      <hr className="border-slate-200" />

      <CTA />
    </section>
  );
};

export default About;