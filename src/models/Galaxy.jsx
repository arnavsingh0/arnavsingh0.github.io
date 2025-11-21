import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Points, useGLTF } from "@react-three/drei";
import { EffectComposer, SelectiveBloom } from "@react-three/postprocessing";
import * as THREE from "three";

import galaxyModel from "../assets/3d/galaxy.glb";

export function Galaxy({ isRotating, setIsRotating, setCurrentStage, ...props }) {
  const ref = useRef();
  const galaxyCenterLightRef = useRef();
  const { nodes } = useGLTF(galaxyModel);
  const { camera } = useThree();

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

  useFrame(() => {
    if (!isRotating) {
      // Slow rotation when not interacting
      ref.current.rotation.y += 0.001;
    }

    // Calculate stage based on rotation
    // We use the group's rotation if we were rotating the group, 
    // but since we are using OrbitControls, we should check the camera angle relative to the center.
    // However, to keep it simple and consistent with the requested "drag to explore" (which usually implies rotating the model),
    // let's stick to the model rotation if we were doing that. 

    // BUT, OrbitControls rotates the CAMERA.
    // So let's calculate the angle based on camera position.

    const angle = Math.atan2(camera.position.x, camera.position.z);
    let normalizedAngle = (angle + Math.PI) / (2 * Math.PI); // 0 to 1

    // Define stages based on angle segments
    if (normalizedAngle >= 0 && normalizedAngle < 0.25) {
      setCurrentStage(1);
    } else if (normalizedAngle >= 0.25 && normalizedAngle < 0.5) {
      setCurrentStage(2);
    } else if (normalizedAngle >= 0.5 && normalizedAngle < 0.75) {
      setCurrentStage(3);
    } else if (normalizedAngle >= 0.75 && normalizedAngle <= 1) {
      setCurrentStage(4);
    }
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