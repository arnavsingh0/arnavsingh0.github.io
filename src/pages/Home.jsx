import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { OrbitControls } from "@react-three/drei"; // Import OrbitControls

import lohengrin from "../assets/Lohengrin.mp3";
import { HomeInfo, Loader } from "../components";
import { soundoff, soundon } from "../assets/icons";
import { Galaxy } from "../models"; // Importing Galaxy here

const Home = () => {
  const audioRef = useRef(new Audio(lohengrin));
  audioRef.current.volume = 0.4;
  audioRef.current.loop = true;

  const [currentStage, setCurrentStage] = useState(1);
  const [isRotating, setIsRotating] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  useEffect(() => {
    if (isPlayingMusic) {
      audioRef.current.play();
    }

    return () => {
      audioRef.current.pause();
    };
  }, [isPlayingMusic]);

  return (
    <section className='w-full h-screen relative'>
      <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
        {currentStage && <HomeInfo currentStage={currentStage} />}
      </div>

      <Canvas
        className={`w-full h-screen bg-transparent ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
        camera={{ position: [-5, -8, 10], near: 0.1, far: 1000 }} // Top and side view
        style={{ background: 'black' }} // Set black background
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
            skyColor='#000000' // Set the sky color to black
            groundColor='#000000' // Set the ground color to black
            intensity={0} // Set intensity to 0 to keep it dark
          />

          <Galaxy
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
            position={[0, 0, 0]} // Center the galaxy
            rotation={[0, 0, 0]} // Set rotation as needed
            scale={[1, 1, 1]} // Adjust scale if needed
          />
          
          {/* Add OrbitControls to the Canvas */}
          <OrbitControls 
            enableZoom={false} // Optional: Disable zoom if desired
            rotateSpeed={2}    // Increase rotation speed
          />
        </Suspense>
      </Canvas>

      <div className='absolute bottom-2 left-2'>
        <img
          src={!isPlayingMusic ? soundoff : soundon}
          alt='jukebox'
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
          className='w-10 h-10 cursor-pointer object-contain'/>
        <h1>
          ^ song
        </h1>
      </div>
    </section>
  );
};

export default Home;