import { Link } from "react-router-dom";
import { arrow } from "../assets/icons";
import { motion, AnimatePresence } from "framer-motion";

const InfoBox = ({ text, link, btnText }) => (
    <div className='glass-panel px-8 py-4 rounded-xl relative z-50 text-center shadow-2xl border border-white/20'>
        <p className='font-medium sm:text-xl text-center text-white mb-4 leading-relaxed'>
            {text}
        </p>
        <a
            href={link}
            onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(link.substring(1));
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }}
            className='inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 border border-white/20 hover:scale-105 cursor-pointer'
        >
            {btnText}
            <img src={arrow} className='w-4 h-4 object-contain' alt="arrow" />
        </a>
    </div>
);

const renderContent = {
    1: (
        <div className="text-center glass-panel px-8 py-6 rounded-2xl border border-white/20 shadow-2xl">
            <h1 className='sm:text-xl sm:leading-snug text-white mx-5 font-semibold'>
                Hi, I'm <span className='text-blue-400 font-bold'>Arnav Singh</span> 👋
                <br />
                A Software Engineer & Physicist from <span className="text-blue-400">Dartmouth</span>
            </h1>
        </div>
    ),
    2: (
        <InfoBox
            text="I fuse my love for Physics, CS, and Math to build applications and simulations with real momentum."
            link="#about"
            btnText="About me"
        />
    ),
    3: (
        <InfoBox
            text="Led multiple projects at PlayStation, NASA, and more. Curious about the impact?"
            link="#projects"
            btnText="Visit my portfolio"
        />
    ),
    4: (
        <InfoBox
            text="Need a project done or looking for a dev? I'm just a click away!"
            link="#contact"
            btnText="Let's talk"
        />
    ),
};

const HomeInfo = ({ currentStage }) => {
    return (
        <AnimatePresence mode="wait">
            {currentStage && (
                <motion.div
                    key={currentStage}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute top-28 left-0 right-0 flex justify-center items-center z-10 px-4"
                >
                    {renderContent[currentStage] || null}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default HomeInfo;
