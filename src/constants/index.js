import portraitImage from "../assets/images/myimage.png";

export const portrait = {
    src: portraitImage,
    alt: "Arnav Singh standing outdoors in front of a telescope dome",
};

export const profile = {
    name: "Arnav Singh",
    role: "Physics and computer science, Dartmouth",
    lede: "I study physics, mathematics, and computer science at Dartmouth. I like the work that sits next to a measurement: telescope images, a space-weather model, and the programs in between.",
    quote: {
        text: "On two occasions I have been asked, ‘If you put into the machine wrong figures, will the right answers come out?’ I am not able rightly to apprehend the kind of confusion of ideas that could provoke such a question.",
        cite: "Charles Babbage",
    },
};

export const education = {
    when: "June 2026",
    school: "Dartmouth College",
    degree: "B.A. in Physics and Computer Science, modified with Mathematics",
    detail: "GPA 3.9 / 4.0. Coursework includes graduate machine learning and AI, quantum mechanics, security and privacy, software design, and app development.",
};

export const toolGroups = [
    {
        label: "Languages",
        items: "Python, C, C++, Java, TypeScript, JavaScript, Go, SQL, Bash, R, MATLAB, and PHP.",
    },
    {
        label: "Libraries and tools",
        items: "NumPy, Pandas, scikit-learn, TensorFlow, React, Angular, Vue, Node.js, Redux, GraphQL, AWS, Docker, Git, and Linux.",
    },
];

export const experiences = [
    {
        type: "work",
        role: "Software engineer intern",
        company: "PlayStation (Sony Interactive Entertainment)",
        duration: "Jun – Dec 2025",
        desc: "Co-led a React analytics app for cloud gaming, and built modular TypeScript components for an internal SDK.",
    },
    {
        type: "work",
        role: "Undergraduate researcher",
        company: "South African Astronomical Observatory",
        duration: "Jan – March 2025",
        desc: "Co-authored a research paper on cataclysmic binary stars. Developed an end-to-end Python data pipeline for telescope imaging and engineered automated quality-control tools.",
    },
    {
        type: "work",
        role: "Presidential researcher",
        company: "Millan Research Lab",
        duration: "Jan 2024 – present",
        desc: "Built ensemble machine-learning models for a $150M NASA mission, improving space-weather forecasts by 2.5×. Designed multimodal pipelines for magnetosphere prediction.",
    },
    {
        type: "work",
        role: "Software engineer consultant",
        company: "DTCG",
        duration: "Sept – Dec 2024",
        desc: "Delivered a full-stack market-making simulation with a Django backend and a React frontend. Engineered a dynamic profit-and-loss tracking system for 300+ users.",
    },
    {
        type: "work",
        role: "CS teaching assistant",
        company: "Dartmouth Computer Science",
        duration: "Aug 2024 – present",
        desc: "Mentoring 350+ students across web programming, cybersecurity, and machine learning. Debugging projects in Python, C, C++, and JavaScript.",
    },
];

export const socialLinks = [
    {
        name: "GitHub",
        link: "https://github.com/arnavsingh0",
    },
    {
        name: "LinkedIn",
        link: "https://www.linkedin.com/in/arnav-singh7",
    },
];

export const projects = [
    {
        name: "Lunar Rover Rescue",
        description: "A browser game. Drive a rover across rough terrain and collect the crystals scattered on it.",
        link: "/lunar-rover",
        tags: ["Three.js", "React Three Fiber", "WebGL"],
    },
    {
        name: "Olympic Medal Prediction",
        description: "Machine-learning models (random forest, gradient boosting) to predict 2024 Olympic medal outcomes, with 82% accuracy, using 120 years of historical data.",
        link: "https://github.com/arnavsingh0/Olympics",
        tags: ["Python", "scikit-learn", "Pandas", "Matplotlib"],
    },
    {
        name: "AWS Cloud Security",
        description: "A cloud security stack with WAF, Shield, and Cognito, and end-to-end encryption aimed at DDoS and web exploits.",
        link: "https://github.com/arnavsingh0",
        tags: ["AWS WAF", "AWS Shield", "Cognito"],
    },
    {
        name: "Nuggets",
        description: "Server logic and a dynamic interface in C for a #1-ranked multiplayer game. Real-time message passing keeps the game state in sync.",
        link: "https://github.com/arnavsingh0",
        tags: ["C", "Sockets", "Multithreading"],
    },
];

export const publications = [
    {
        name: "Cataclysmic Binary Stars",
        description: "Co-authored a paper on the photometric analysis of cataclysmic variable stars.",
        tags: ["Astrophysics", "Python", "Data"],
        link: "https://iopscience.iop.org/article/10.3847/1538-3881/ae201f",
    },
    {
        name: "Magnetosphere Prediction",
        description: "Multimodal machine-learning pipelines for space-weather forecasting, using the open-closed boundary.",
        tags: ["Machine learning", "NASA", "Space weather"],
        link: "https://github.com/arnavsingh0/OCB_modeling",
    },
];
