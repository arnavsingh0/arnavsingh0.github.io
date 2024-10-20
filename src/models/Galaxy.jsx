import { useEffect, useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, useGLTF } from "@react-three/drei";
import { EffectComposer, SelectiveBloom } from "@react-three/postprocessing";
import * as THREE from "three";

import galaxyModel from "../assets/3d/galaxy.glb"; // Adjust the path as needed

export function Galaxy(props) {
  const ref = useRef();
  const galaxyCenterLightRef = useRef();
  const { nodes } = useGLTF(galaxyModel);

  const [positions, colors] = useMemo(() => {
    nodes.Object_2.geometry.center();
    const positions = new Float32Array(
      nodes.Object_2.geometry.attributes.position.array.buffer
    );
    const colors = new Float32Array(positions.length);

    const getDistanceToCenter = (x, y, z) =>
      Math.sqrt(x * x + y * y + z * z);

    const color = new THREE.Color();
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      const z = positions[i + 2];
      const distanceToCenter = getDistanceToCenter(x, y, z);
      const normalizedDistanceToCenter = distanceToCenter / 100;

      color.setRGB(
        Math.cos(normalizedDistanceToCenter),
        THREE.MathUtils.randFloat(0, 0.8),
        Math.sin(normalizedDistanceToCenter)
      );
      color.toArray(colors, i);
    }

    return [positions, colors];
  }, [nodes]);

  useFrame(({ clock }) => {
    ref.current.rotation.z = clock.getElapsedTime() / 5;
    ref.current.scale.setScalar(Math.sin(clock.getElapsedTime() / 8) + 2);  // Frequency and amplitude of the scale, i can set to whatever i want
  });

  return (
    <group {...props} dispose={null} ref={ref}>
      <pointLight
        position={[0, 0, 0]}
        ref={galaxyCenterLightRef}
        intensity={0.5}
      />
      <Points scale={0.05} positions={positions} colors={colors}>
        <pointsMaterial
          transparent
          depthWrite={false}
          vertexColors
          opacity={0.4}
          depthTest
          size={0.01}
        />
      </Points>
      <EffectComposer autoClear={false}>
        <SelectiveBloom
          intensity={2}
          luminanceThreshold={0.001}
          luminanceSmoothing={0.225}
          lights={[galaxyCenterLightRef]}
        />
      </EffectComposer>
    </group>
  );
}

useGLTF.preload(galaxyModel);