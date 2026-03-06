import { playstation, saao, dPine, dartmouth } from "../assets/images";
import { FaChartLine, FaShieldAlt, FaGamepad, FaSpaceShuttle } from "react-icons/fa";
import { contact, github, linkedin, scholar } from "../assets/icons";

export const experiences = [
    {
        type: 'work',
        role: 'Software Engineer Intern',
        company: 'PlayStation (Sony Interactive Entertainment)',
        duration: 'Jun – Dec 2025',
        logo: playstation,
        desc: "Co-leading development of a React-based internal analytics app for cloud gaming. Building modular TypeScript components for an internal SDK and enhancing application scalability."
    },
    {
        type: 'work',
        role: 'Undergraduate Researcher',
        company: 'South African Astronomical Observatory',
        duration: 'Jan – March 2025',
        logo: saao,
        desc: "Co-authored a research paper on Cataclysmic Binary Stars. Developed an end-to-end Python data pipeline for telescope imaging and engineered automated QC tools."
    },
    {
        type: 'work',
        role: 'Presidential Researcher',
        company: 'Millan Research Lab',
        duration: 'Jan 2024 – Present',
        logo: dPine,
        desc: "Built ensemble ML models for a $150M NASA mission, improving space-weather forecasts by 2.5x. Designed multimodal ML pipelines for magnetosphere prediction."
    },
    {
        type: 'work',
        role: 'Software Engineer Consultant',
        company: 'DTCG',
        duration: 'Sept – Dec 2024',
        logo: dPine,
        desc: "Delivered a full-stack market-making simulation with Django backend and React frontend. Engineered a dynamic P&L tracking system for 300+ users."
    },
    {
        type: 'work',
        role: 'CS Teaching Assistant',
        company: 'Dartmouth Computer Science Dept.',
        duration: 'Aug 2024 – Present',
        logo: dartmouth,
        desc: "Mentoring 350+ students across Web Programming, Cybersecurity, and ML courses. Debugging projects in Python, C/C++, and JavaScript."
    }
];

export const socialLinks = [
    {
        name: 'Contact',
        iconUrl: contact,
        link: '/#contact',
    },
    {
        name: 'GitHub',
        iconUrl: github,
        link: 'https://github.com/arnavsingh0',
    },
    {
        name: 'LinkedIn',
        iconUrl: linkedin,
        link: 'https://www.linkedin.com/in/arnav-singh7',
    },
    {
        name: 'Google Scholar',
        iconUrl: scholar,
        link: 'https://scholar.google.com/',
    }
];

export const projects = [
    {
        iconUrl: FaSpaceShuttle,
        theme: 'btn-back-yellow',
        name: 'Lunar Rover Rescue',
        description: 'Developed an interactive 3D planetary exploration game where users navigate a rover to complete rescue objectives on treacherous terrain.',
        longDescription: 'Command a Vanguard-class rover across procedurally generated extraterrestrial terrain. This simulation employs a custom physics engine and WebGL WebXR rendering to simulate low-gravity planetary exploration. Features dynamic terrain mapping algorithms and physics-based vehicle maneuvering under extreme conditions.',
        link: '/lunar-rover',
        tags: ['Three.js', 'React Three Fiber', 'WebGL', 'Physics API']
    },
    {
        iconUrl: FaChartLine,
        theme: 'btn-back-red',
        name: 'Olympic Medal Prediction',
        description: 'Built ML models (Random Forest, Gradient Boosting) to predict 2024 Olympic medal outcomes with 82% accuracy using 120 years of historical data.',
        link: 'https://github.com/arnavsingh0/Olympics',
        tags: ['Python', 'Scikit-learn', 'Pandas', 'Matplotlib']
    },
    {
        iconUrl: FaShieldAlt,
        theme: 'btn-back-green',
        name: 'AWS Cloud Security',
        description: 'Architected a cloud-native AWS security stack with WAF, Shield, and Cognito. Implemented end-to-end encryption to defend against DDoS and web exploits.',
        link: 'https://github.com/arnavsingh0',
        tags: ['AWS WAF', 'AWS Shield', 'Cognito', 'Cloud-Native']
    },
    {
        iconUrl: FaGamepad,
        theme: 'btn-back-blue',
        name: 'Nuggets (Multiplayer Game)',
        description: 'Engineered server logic and dynamic UI in C for a #1-ranked multiplayer game. Implemented real-time message passing for game state synchronization.',
        link: 'https://github.com/arnavsingh0',
        tags: ['C', 'Sockets', 'Multithreading', 'Networking']
    }
];

export const publications = [
    {
        name: "Cataclysmic Binary Stars",
        description: "Co-authored a research paper on the photometric analysis of cataclysmic variable stars.",
        tags: ["Astrophysics", "Python", "Data Science"],
        link: "https://iopscience.iop.org/article/10.3847/1538-3881/ae201f"
    },
    {
        name: "Magnetosphere Prediction",
        description: "Designed multimodal ML pipelines improving rapid space-weather forecasting accuracy via Open-Close Boundary.",
        tags: ["Machine Learning", "NASA", "Space Weather"],
        link: "https://github.com/arnavsingh0/OCB_modeling"
    }
];