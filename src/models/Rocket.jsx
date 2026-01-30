import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import rocketModel from "../assets/3d/rocket.glb";

export function Rocket({ isRotating, ...props }) {
  const { nodes, materials } = useGLTF(rocketModel)
  const groupRef = useRef()

  useFrame((state, delta) => {
    if (isRotating) {
      groupRef.current.rotation.y += 2 * delta // Rotate faster when active
    } else {
      groupRef.current.rotation.y += 0.5 * delta // Slow idle rotation
    }
  })

  return (
    <group ref={groupRef} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group position={[-0.003, 0.024, -6.331]} rotation={[0.238, -0.545, 0.562]} scale={7}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.planet001_1.geometry}
            material={materials.scene}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.planet001_2.geometry}
            material={materials.scene}
          />
        </group>
      </group>
    </group>
  )
}
useGLTF.preload(rocketModel)