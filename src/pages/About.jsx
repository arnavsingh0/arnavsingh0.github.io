import { CTA } from "../components";
import Education from "./Education";
import Skills from "./Skills";
import Projects from "./Projects";
import Research from "./Research";
import Experience from "./Experience";
import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const options = {
      threshold: 0.6, // Adjust this to detect when 60% of the section is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const link = document.querySelector(`a[href="#${entry.target.id}"]`);
        if (entry.isIntersecting) {
          link?.classList.add("active-link");
        } else {
          link?.classList.remove("active-link");
        }
      });
    }, options);

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div className="max-container overflow-y-auto h-screen px-4 py-10">
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
      <section id="experience" className="py-10">
        <h3 className="text-3xl text-sky-400 font-semibold mb-4">Work Experience</h3>
        <Experience />
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-10">
        <h3 className="text-3xl text-sky-400 font-semibold mb-4">Skills</h3>
        <Skills />
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-10">
        <h3 className="text-3xl text-sky-400 font-semibold mb-4">Projects</h3>
        <Projects />
      </section>

      {/* Research Section */}
      <section id="research" className="py-10">
        <h3 className="text-3xl text-sky-400 font-semibold mb-4">Research</h3>
        <Research />
      </section>

      {/* Education Section */}
      <section id="education" className="py-10">
        <h3 className="text-3xl text-sky-400 font-semibold mb-4">Education</h3>
        <Education />
      </section>

      {/* Call-to-Action (CTA) */}
      <hr className="border-slate-200 my-8" />
      <CTA />
    </div>
  );
};

export default About;