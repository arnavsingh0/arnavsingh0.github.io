import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { OrbitControls, Stars } from "@react-three/drei";
import { FaVolumeUp, FaVolumeMute, FaHandPointer } from "react-icons/fa";
import lohengrin from "../assets/Lohengrin.mp3";
import { HomeInfo, Loader } from "../components";
import { Galaxy } from "../models";

const Home = () => {
  const audioRef = useRef(new Audio(lohengrin));
  audioRef.current.volume = 0.4;
  audioRef.current.loop = true;

  const [currentStage, setCurrentStage] = useState(1);
  const [isRotating, setIsRotating] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    if (isPlayingMusic) {
      audioRef.current.play();
    }

    return () => {
      audioRef.current.pause();
    };
  }, [isPlayingMusic]);

  // Hide hint after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const adjustGalaxyForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [1, 1, 1];
      screenPosition = [0, -2, 0];
    }

    return [screenScale, screenPosition];
  };

  const [galaxyScale, galaxyPosition] = adjustGalaxyForScreenSize();

  return (
    <section id="home" className='w-full h-screen relative'>

      {/* HomeInfo Overlay - Passes currentStage */}
      <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center pointer-events-none'>
        <div className="pointer-events-auto">
          {currentStage && <HomeInfo currentStage={currentStage} />}
        </div>
      </div>

      {/* Fixed 3D Background */}
      <div className="fixed inset-0 z-0">
        <Canvas
          className={`w-full h-full bg-transparent ${isRotating ? "cursor-grabbing" : "cursor-grab"}`}
          camera={{ position: [0, 0, 30], near: 0.1, far: 1000 }}
        >
          <Suspense fallback={<Loader />}>
            <directionalLight position={[1, 1, 1]} intensity={2} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 5, 10]} intensity={2} />
            <spotLight
              position={[0, 50, 10]}
              angle={0.15}
              penumbra={1}
              intensity={2}
            />
            <hemisphereLight
              skyColor='#b1e1ff'
              groundColor='#000000'
              intensity={1}
            />

            <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade speed={1} />

            <Galaxy
              isRotating={isRotating}
              setIsRotating={setIsRotating}
              setCurrentStage={setCurrentStage}
              position={galaxyPosition}
              rotation={[0, 0, 0]} // Adjusted initial rotation for better view
              scale={galaxyScale}
            />

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              rotateSpeed={0.5}
              autoRotate={!isRotating} // Auto-rotate when not interacting
              autoRotateSpeed={0.5}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Interaction Hint */}
      <div className={`absolute bottom-20 left-0 right-0 flex justify-center pointer-events-none transition-opacity duration-1000 ${showHint ? 'opacity-100' : 'opacity-0'}`}>
        <div className="glass-panel px-6 py-3 rounded-full flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20">
          <FaHandPointer className="text-blue-400 animate-bounce" />
          <span className="text-white font-medium tracking-wide">Drag to explore the galaxy</span>
        </div>
      </div>

      {/* Sound Control */}
      <div className='absolute bottom-6 left-6 z-20'>
        <button
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
          className={`group relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${isPlayingMusic
            ? 'bg-blue-500/20 border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.5)]'
            : 'bg-white/10 border-white/20 hover:bg-white/20'
            } backdrop-blur-md border`}
        >
          {isPlayingMusic ? (
            <FaVolumeUp className="w-5 h-5 text-blue-400" />
          ) : (
            <FaVolumeMute className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
          )}

          {/* Pulse Effect when playing */}
          {isPlayingMusic && (
            <span className="absolute inset-0 rounded-full border border-blue-400 animate-ping opacity-75"></span>
          )}
        </button>
      </div>
    </section>
  );
};

export default Home;
