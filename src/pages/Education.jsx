import React from "react";
import { FaGraduationCap } from "react-icons/fa"; // Icon for Education
import dartmouthLogo from "../assets/images/D-Pine_Black.png"; // Add correct path for Dartmouth logo

const Education = () => {
  return (
    <section id="education" className="py-16 bg-black text-white relative">
      {/* Space-themed background */}
      <div className="absolute inset-0 bg-cover bg-center opacity-20 z-0"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Title */}
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-400 glow-effect">
          <FaGraduationCap className="inline-block mr-2" /> Education
        </h2>

        {/* Dartmouth College Card */}
        <div className="relative bg-gradient-to-r from-purple-700 to-indigo-700 p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
          {/* Glow effect and logo */}
          <div className="absolute top-0 right-0 w-16 h-16 opacity-30">
            <img
              src={dartmouthLogo}
              alt="Dartmouth Logo"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Dartmouth College Information */}
          <h3 className="text-3xl font-semibold mb-2 text-white">Dartmouth College</h3>
          <p className="text-lg text-yellow-300">
            Double Major in <strong>Physics</strong> & <strong>Computer Science</strong> 
            <br />with a modification (%) in <strong>Mathematics</strong>
          </p>
          <p className="text-gray-300 mt-2">Anticipated Graduation: <span className="font-semibold">2026</span></p>

          {/* Icons and key points */}
          <ul className="mt-4 space-y-2 text-white">
            <li>🌌 Focus on Physics & Machine Learning</li>
            <li>🚀 Problem Solving Enthusiast</li>
          </ul>

          {/* Visit link */}
          <div className="mt-6">
            <a
              href="https://dartmouth.edu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-indigo-700 font-bold py-2 px-6 rounded-lg shadow-md hover:bg-indigo-200 transition-colors duration-300"
            >
              Visit Dartmouth
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;