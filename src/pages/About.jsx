import { CTA, Footer, Navbar } from "../components";
import Education from "./Education";
import Skills from "./Skills";
import Projects from "./Projects";
import Research from "./Research";
import Experience from "./Experience";
import Contact from "./Contact";
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
      {/* Navbar */}
      <Navbar />

      {/* Title Section */}
<section id="about" className="py-16 bg-gradient-to-b from-black via-gray-800 to-black text-white">
  <div className="container mx-auto px-4 lg:px-8">
    
    {/* Title */}
    <h1 className="text-5xl font-extrabold text-center">
      Hello, I'm <span className="blue-gradient_text font-semibold drop-shadow-lg">Arnav Singh</span> 👋
    </h1>

    {/* Profile Introduction */}
    <div className="mt-8 text-center max-w-2xl mx-auto">
      <p className="text-lg leading-relaxed mb-4">
        Welcome! I'm currently a <span className="font-semibold text-yellow-300">Junior</span> at <span className="text-green-300">Dartmouth College</span> 🌲, pursuing a double major in <span className="font-semibold text-blue-300">Physics</span> and <span className="font-semibold text-blue-300">Computer Science</span> with a modification in <span className="font-semibold text-blue-300">Mathematics</span>.
      </p>
      <p className="text-lg leading-relaxed mb-6">
        Born in Singapore, I moved to Ireland when I was 3 and lived in Limerick County (like the poem scheme) until I was 8. Since then, I've been residing in the beautiful Upstate New York 🍁.
      </p>

      <p className="text-lg leading-relaxed">
        I'm passionate about applying <span className="font-semibold text-pink-300">Machine Learning</span> to solve complex scientific problems, exploring <span className="font-semibold text-purple-300">Space Physics</span>, and conducting research in <span className="font-semibold text-purple-300">Aerospace</span>.
      </p>
    </div>

    {/* Animated Profile Image */}
    <div className="flex justify-center mt-12">
      <div className="relative">
        <img
          src="src/assets/images/myimage.png"
          alt="Arnav Singh"
          className="w-40 h-40 md:w-60 md:h-60 rounded-full border-4 border-indigo-500 shadow-lg transform hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-blue-500 animate-ping"></div>
      </div>
    </div>
    
    {/* Call to Action Button */}
    <div className="text-center mt-8">
      <a
        href="/path-to-resume.pdf" // Replace with your resume link
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-indigo-600 text-white text-lg font-bold py-3 px-6 rounded-full shadow-lg hover:bg-indigo-500 transition duration-300"
      >
        View My Resume
      </a>
    </div>

  </div>
</section>
      {/* Education Section */}
      <section id="education" className="py-10">
        <Education />
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-10">
        <Skills />
      </section>

      {/* Research Section */}
      <section id="research" className="py-10">
        <Research />
      </section>

      {/* Work Experience Section */}
      <section id="experience" className="py-10">
        <Experience />
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-10">
        <Projects />
      </section>

      {/* Contact */}
      <section id="contact" className="py-10">
      <hr className="border-slate-200 my-8" />
      <Contact />
      </section>

      <Footer />
    </div>
  );
};

export default About;