
import { arrow } from "../assets/icons";
import { motion, AnimatePresence } from "framer-motion";

const InfoBox = ({ text, link, btnText }) => (
    <div className='w-full max-w-[90vw] sm:max-w-md mx-auto bg-black/40 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm shadow-2xl shadow-blue-900/20'>
        {/* Dashboard Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
            <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80 animate-pulse"></div>
                </div>
                <p className="font-mono text-[10px] text-gray-400 tracking-widest ml-3">
                    VANGUARD // SYS_MSG
                </p>
            </div>
        </div>

        {/* Content */}
        <div className='px-6 py-6 text-center'>
            <p className='font-medium sm:text-lg text-white mb-6 leading-relaxed'>
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
                className='inline-flex items-center justify-center gap-3 w-full sm:w-auto bg-white/5 hover:bg-white/10 text-blue-400 hover:text-blue-300 font-mono text-sm py-3 px-6 rounded-lg transition-all duration-300 border border-white/10 hover:border-blue-500/50 cursor-pointer group'
            >
                <span className="tracking-widest">{btnText.toUpperCase()}</span>
                <img src={arrow} className='w-3 h-3 object-contain opacity-70 group-hover:translate-x-1 transition-transform' alt="arrow" />
            </a>
        </div>
    </div>
);

const renderContent = {
    1: (
        <div className="w-full max-w-[90vw] sm:max-w-2xl mx-auto bg-black/40 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm shadow-[0_0_40px_rgba(59,130,246,0.15)]">
            {/* Dashboard Header Bar */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-white/5">
                <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/80 animate-pulse"></div>
                    </div>
                    <p className="font-mono text-xs text-gray-400 tracking-widest ml-4 hidden sm:block">
                        VANGUARD OS v2.0 // PERSONNEL_FILE
                    </p>
                    <p className="font-mono text-[10px] text-gray-400 tracking-widest ml-2 sm:hidden">
                        VANGUARD // FILE
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="px-6 py-8 sm:px-10 sm:py-10 text-center flex flex-col items-center gap-6">
                <h1 className='text-white font-semibold flex flex-col items-center gap-3'>
                    <span className="font-mono text-sm tracking-[0.2em] text-gray-500">IDENTIFICATION //</span>
                    <span className='text-5xl md:text-6xl text-blue-400 font-bold tracking-tight'>Arnav Singh</span>
                    <span className="sm:text-lg sm:leading-snug mt-2 text-gray-300 max-w-lg">
                        A <span className="text-white font-medium">Software Engineer</span> & <span className="text-white font-medium">Physicist</span> from <span className="text-purple-400 font-medium">Dartmouth</span>
                    </span>
                </h1>

                <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
                    <a
                        href="#projects"
                        onClick={(e) => {
                            e.preventDefault();
                            const element = document.getElementById('projects');
                            if (element) element.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="group flex items-center justify-center gap-3 bg-blue-600/20 border border-blue-500/30 hover:bg-blue-600 text-white font-mono text-sm px-6 py-3 mx-auto w-full sm:w-auto rounded-lg transition-all cursor-pointer"
                    >
                        <span>EXPLORE_WORK</span>
                        <img src={arrow} className='w-4 h-4 object-contain brightness-200 group-hover:translate-x-1 transition-transform' alt="arrow" />
                    </a>

                    <a
                        href="#contact"
                        onClick={(e) => {
                            e.preventDefault();
                            const element = document.getElementById('contact');
                            if (element) element.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="group flex items-center justify-center gap-3 bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 hover:text-white font-mono text-sm px-6 py-3 w-full sm:w-auto rounded-lg transition-all cursor-pointer"
                    >
                        <span>VIEW_RESUME</span>
                        <span className="text-lg leading-none group-hover:-translate-y-0.5 transition-transform">↗</span>
                    </a>
                </div>
            </div>
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
    // Array to represent the 4 stages
    const stages = [1, 2, 3, 4];
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

                    {/* Terminal Style Indicators */}
                    <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 flex gap-2">
                        {stages.map((stage) => (
                            <div
                                key={stage}
                                className={`h-1.5 rounded transition-all duration-300 ${currentStage === stage
                                    ? 'bg-blue-500 w-8 shadow-[0_0_10px_rgba(59,130,246,0.8)]' // Active indicator is longer and glows
                                    : 'bg-white/20 hover:bg-white/40 w-4'
                                    }`}
                            />
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default HomeInfo;
