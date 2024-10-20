import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { OrbitControls } from "@react-three/drei"; 
import lohengrin from "../assets/Lohengrin.mp3";
import { HomeInfo, Loader } from "../components";
import { soundoff, soundon } from "../assets/icons";
import { Galaxy } from "../models"; 
import About from "./About"; // Import the About component

const Home = () => {
  const audioRef = useRef(new Audio(lohengrin));
  audioRef.current.volume = 0.4;
  audioRef.current.loop = true;

  const [currentStage, setCurrentStage] = useState(1);
  const [isRotating, setIsRotating] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [showAbout, setShowAbout] = useState(false); // State to show the About page with animation

  useEffect(() => {
    if (isPlayingMusic) {
      audioRef.current.play();
    }

    return () => {
      audioRef.current.pause();
    };
  }, [isPlayingMusic]);

  const triggerOverlayAnimation = () => {
    setShowAbout(true);
  };

  return (
    <section className='w-full h-screen relative'>
      <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
        {currentStage && (
          <HomeInfo currentStage={currentStage} triggerOverlayAnimation={triggerOverlayAnimation} />
        )}
      </div>

      <Canvas
        className={`w-full h-screen bg-transparent ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
        camera={{ position: [-5, -10, 10], near: 0.1, far: 100 }}
        style={{ background: 'black' }}
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
            skyColor='#000000'
            groundColor='#000000'
            intensity={0}
          />

          <Galaxy
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={[1, 1, 1]}
          />
          
          <OrbitControls 
            enableZoom={false}
            rotateSpeed={1}
          />
        </Suspense>
      </Canvas>

      {/* The about section with sliding animation */}
      {showAbout && (
        <div className="absolute inset-0 bg-black/80 z-20 flex justify-center items-center animate-slideInRight">
          <About />
        </div>
      )}

      <div className='absolute bottom-2 left-2'>
        <img
          src={!isPlayingMusic ? soundoff : soundon}
          alt='jukebox'
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
          className='w-10 h-10 cursor-pointer object-contain'/>
        <h1>
          {isPlayingMusic ? "" : "Off"}
        </h1>
      </div>
    </section>
  );
};

export default Home;