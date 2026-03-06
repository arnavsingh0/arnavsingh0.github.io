import React, { Suspense, useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Sparkles } from "@react-three/drei";
import * as THREE from "three";

// --- Reusable Geometries & Materials ---
// This prevents React from recreating objects every frame or unmounting/remounting
const rockGeometry = new THREE.DodecahedronGeometry(1);
const rockMaterial = new THREE.MeshStandardMaterial({ color: "#2d2f36", roughness: 1.0 });

const anomalyGeometry = new THREE.OctahedronGeometry(0.8, 0);
const anomalyMaterial = new THREE.MeshStandardMaterial({
    color: "#00ffff",
    emissive: "#00ffff",
    emissiveIntensity: 1.5, // High emissive to compensate for no bloom
    roughness: 0.1,
    metalness: 0.8
});

const wheelGeometry = new THREE.CylinderGeometry(0.6, 0.6, 0.5, 12); // Reduced segments
const wheelMaterial = new THREE.MeshStandardMaterial({ color: "#1a1a1a", roughness: 1.0 });

const hubcapGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.05, 6);
const hubcapMaterial = new THREE.MeshStandardMaterial({ color: "#888", metalness: 0.8, roughness: 0.2 });

const suspensionGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.8, 6); // Reduced segments
const suspensionMaterial = new THREE.MeshStandardMaterial({ color: "#333", metalness: 0.6, roughness: 0.4 });


// --- Collectibles (Instanced) ---
const Anomalies = ({ count, onCollect, roverPositionRef }) => {
    // We store the data but render via InstancedMesh for 1 draw call
    const [anomalies, setAnomalies] = useState(() => {
        const items = [];
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = 20 + Math.random() * 300;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            items.push({ id: i, position: new THREE.Vector3(x, 1, z), collected: false, offset: Math.random() * 100 });
        }
        return items;
    });

    const instancedMeshRef = useRef();
    const tempObject = useMemo(() => new THREE.Object3D(), []);

    useFrame((state) => {
        if (!roverPositionRef.current || !instancedMeshRef.current) return;
        const time = state.clock.elapsedTime;

        let collectedAny = false;
        const updated = anomalies.map(a => {
            if (a.collected) return a;
            const dist = a.position.distanceTo(roverPositionRef.current);
            if (dist < 3.0) {
                collectedAny = true;
                onCollect();
                return { ...a, collected: true };
            }
            return a;
        });

        if (collectedAny) setAnomalies(updated);

        // Update instances
        anomalies.forEach((a, i) => {
            if (a.collected) {
                // Shrink to 0 to hide it efficiently
                tempObject.scale.set(0, 0, 0);
            } else {
                tempObject.position.copy(a.position);
                tempObject.position.y = 1 + Math.sin(time * 2 + a.offset) * 0.5;
                tempObject.rotation.y = time;
                tempObject.rotation.x = time * 0.5;
                tempObject.scale.set(1, 1, 1);
            }
            tempObject.updateMatrix();
            instancedMeshRef.current.setMatrixAt(i, tempObject.matrix);
        });
        instancedMeshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh
            ref={instancedMeshRef}
            args={[anomalyGeometry, anomalyMaterial, count]}
            castShadow
        />
    );
};

// --- Terrain & Rocks (Instanced) ---
const Terrain = () => {
    const planeRef = useRef();
    const instancedRocksRef = useRef();
    const rockCount = 300;

    // Shared height function to ensure rocks and terrain match exactly
    const getTerrainZ = (x, y) => {
        let z = (Math.sin(x * 0.05) * Math.cos(y * 0.05)) * 5;
        z += (Math.sin(x * 0.01) * Math.cos(y * 0.01)) * 15;
        const dist = Math.sqrt(x * x + y * y);
        if (dist < 30) z *= dist / 30;
        return z;
    };

    useEffect(() => {
        if (!planeRef.current) return;
        const geometry = planeRef.current.geometry;
        const positionAttribute = geometry.attributes.position;
        const vertex = new THREE.Vector3();

        for (let i = 0; i < positionAttribute.count; i++) {
            vertex.fromBufferAttribute(positionAttribute, i);
            positionAttribute.setZ(i, getTerrainZ(vertex.x, vertex.y));
        }
        geometry.computeVertexNormals();
        positionAttribute.needsUpdate = true;
    }, []);

    // Setup Instanced Rocks once
    useEffect(() => {
        if (!instancedRocksRef.current) return;
        const tempObj = new THREE.Object3D();

        for (let i = 0; i < rockCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = 20 + Math.random() * 800;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const z = getTerrainZ(x, y);
            const scale = Math.random() * 3 + 0.5;

            tempObj.position.set(x, z + scale / 2 - 0.2, -y);
            tempObj.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
            tempObj.scale.set(scale, scale, scale);
            tempObj.updateMatrix();

            instancedRocksRef.current.setMatrixAt(i, tempObj.matrix);
        }
        instancedRocksRef.current.instanceMatrix.needsUpdate = true;
    }, []);

    return (
        <group>
            <mesh ref={planeRef} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                {/* Geomoetry segments reduced from 250x250 to 125x125 for 4x memory savings */}
                <planeGeometry args={[2000, 2000, 125, 125]} />
                <meshStandardMaterial
                    color="#3a3c42"
                    roughness={0.9}
                    metalness={0.1}
                    flatShading={false}
                />
            </mesh>
            <instancedMesh
                ref={instancedRocksRef}
                args={[rockGeometry, rockMaterial, rockCount]}
                castShadow
                receiveShadow
            />
        </group>
    );
};

// --- Mobile Controls UI ---
const MobileButton = ({ actionKey, label, className, roverRef }) => (
    <button
        onContextMenu={(e) => e.preventDefault()}
        onPointerDown={(e) => { e.preventDefault(); roverRef.current?.setKey(actionKey, true); }}
        onPointerUp={(e) => { e.preventDefault(); roverRef.current?.setKey(actionKey, false); }}
        onPointerLeave={(e) => { e.preventDefault(); roverRef.current?.setKey(actionKey, false); }}
        className={`bg-white/10 border border-white/20 backdrop-blur-md text-white font-mono active:bg-blue-500/50 active:scale-95 transition-all shadow-lg flex items-center justify-center touch-none select-none ${className}`}
    >
        {label}
    </button>
);

// --- Rover ---
const Rover = React.forwardRef(({ position, setHudData, roverPositionRef }, ref) => {
    const group = useRef();
    const wheelsRef = useRef([]);
    const [keys, setKeys] = useState({ w: false, a: false, s: false, d: false, shift: false, c: false });

    React.useImperativeHandle(ref, () => ({
        setKey: (key, value) => {
            setKeys(k => {
                // Ignore if the key is already in this state to avoid unnecessary re-renders
                if (k[key] === value) return k;
                return { ...k, [key]: value };
            });
        }
    }));
    const speed = useRef(0);
    const rotation = useRef(0);
    const battery = useRef(100);
    const cameraMode = useRef(0);
    const prevC = useRef(false);

    useEffect(() => {
        const handleKeyDown = (e) => {
            const key = e.key.toLowerCase();
            if (key === "w" || e.key === "ArrowUp") setKeys(k => ({ ...k, w: true }));
            if (key === "s" || e.key === "ArrowDown") setKeys(k => ({ ...k, s: true }));
            if (key === "a" || e.key === "ArrowLeft") setKeys(k => ({ ...k, a: true }));
            if (key === "d" || e.key === "ArrowRight") setKeys(k => ({ ...k, d: true }));
            if (e.shiftKey) setKeys(k => ({ ...k, shift: true }));
            if (key === "c") setKeys(k => ({ ...k, c: true }));
        };
        const handleKeyUp = (e) => {
            const key = e.key.toLowerCase();
            if (key === "w" || e.key === "ArrowUp") setKeys(k => ({ ...k, w: false }));
            if (key === "s" || e.key === "ArrowDown") setKeys(k => ({ ...k, s: false }));
            if (key === "a" || e.key === "ArrowLeft") setKeys(k => ({ ...k, a: false }));
            if (key === "d" || e.key === "ArrowRight") setKeys(k => ({ ...k, d: false }));
            if (key === "shift") setKeys(k => ({ ...k, shift: false }));
            if (key === "c") setKeys(k => ({ ...k, c: false }));
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    const vYAxis = useRef(new THREE.Vector3(0, 1, 0));
    const vLookAt = useRef(new THREE.Vector3());
    const vTempPos = useRef(new THREE.Vector3());

    useFrame((state, delta) => {
        if (!group.current) return;

        if (keys.c && !prevC.current) {
            cameraMode.current = (cameraMode.current + 1) % 2;
        }
        prevC.current = keys.c;

        const isBoosting = keys.shift && battery.current > 0 && keys.w;
        if (isBoosting) {
            battery.current = Math.max(0, battery.current - 20 * delta);
        } else {
            battery.current = Math.min(100, battery.current + 5 * delta);
        }
        const maxAccel = isBoosting ? 30 : 15;

        // Acceleration
        if (keys.w) speed.current += maxAccel * delta;
        if (keys.s) speed.current -= 15 * delta;

        // Friction
        speed.current *= 0.95;

        // Turning
        const speedFactor = Math.min(Math.abs(speed.current) / 5, 1);
        const turnSpeed = 2.0 * delta * speedFactor * (speed.current > 0.1 ? 1 : speed.current < -0.1 ? -1 : 0);
        if (keys.a) rotation.current += turnSpeed;
        if (keys.d) rotation.current -= turnSpeed;

        group.current.rotation.order = 'YXZ'; // Important for vehicles (Yaw first)
        group.current.rotation.y = rotation.current;

        const getTerrainZ = (x, y) => {
            let z = (Math.sin(x * 0.05) * Math.cos(y * 0.05)) * 5;
            z += (Math.sin(x * 0.01) * Math.cos(y * 0.01)) * 15;
            const dist = Math.sqrt(x * x + y * y);
            if (dist < 30) z *= dist / 30;
            return z;
        };

        const newX = group.current.position.x + Math.sin(rotation.current) * speed.current * delta;
        const newZ = group.current.position.z + Math.cos(rotation.current) * speed.current * delta;
        const groundHeight = getTerrainZ(newX, -newZ);

        group.current.position.x = newX;
        group.current.position.z = newZ;
        group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, groundHeight, 0.25);

        // Smart & efficient terrain following via math neighborhood sampling
        const frontZ = getTerrainZ(newX + Math.sin(rotation.current) * 1.5, -(newZ + Math.cos(rotation.current) * 1.5));
        const backZ = getTerrainZ(newX - Math.sin(rotation.current) * 1.5, -(newZ - Math.cos(rotation.current) * 1.5));
        const rightZ = getTerrainZ(newX + Math.cos(rotation.current) * 1.0, -(newZ - Math.sin(rotation.current) * 1.0));
        const leftZ = getTerrainZ(newX - Math.cos(rotation.current) * 1.0, -(newZ + Math.sin(rotation.current) * 1.0));

        const targetPitch = Math.atan2(frontZ - backZ, 3.0);
        const targetRoll = Math.atan2(rightZ - leftZ, 2.0);

        // Fixed inverted signs: Pitch needs negative to tilt nose up on hills, Roll needs positive to lift left side.
        group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -targetPitch, 0.25);
        group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, targetRoll, 0.25);

        if (roverPositionRef) roverPositionRef.current.copy(group.current.position);

        wheelsRef.current.forEach((wheel) => {
            if (wheel) wheel.rotation.x += (speed.current * delta) / 0.6;
        });

        // Throttle HUD updates to prevent excessive React re-renders which cost CPU
        if (Math.round(state.clock.elapsedTime * 10) % 2 === 0) {
            setHudData({
                speed: Math.abs(speed.current).toFixed(1),
                battery: battery.current.toFixed(0),
                camera: cameraMode.current === 0 ? "EXT" : "MAST",
                boosting: isBoosting
            });
        }

        if (cameraMode.current === 0) {
            vTempPos.current.set(0, 6, -14);
            vTempPos.current.applyAxisAngle(vYAxis.current, rotation.current); // Use only yaw for 3rd person stability
            vTempPos.current.add(group.current.position);
            state.camera.position.lerp(vTempPos.current, 0.1);

            vLookAt.current.copy(group.current.position).add(new THREE.Vector3(0, Math.abs(speed.current) * 0.1 + 1, 0));
            state.camera.lookAt(vLookAt.current);
        } else {
            vTempPos.current.set(0, 3, 0.5);
            vTempPos.current.applyEuler(group.current.rotation); // Apply full tilt for 1st person
            vTempPos.current.add(group.current.position);
            state.camera.position.copy(vTempPos.current);

            const lookForward = new THREE.Vector3(0, 2.5, 10);
            lookForward.applyEuler(group.current.rotation);
            lookForward.add(group.current.position);
            state.camera.lookAt(lookForward);
        }
    });

    return (
        <group ref={group} position={position}>
            <mesh position={[0, 1.2, 0]} castShadow>
                <boxGeometry args={[2.4, 0.6, 4]} />
                <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[0, 1.6, -0.5]} castShadow>
                <boxGeometry args={[2.2, 0.2, 2.5]} />
                <meshStandardMaterial color="#111" metalness={0.5} roughness={0.8} />
            </mesh>

            {[-1.5, 0, 1.5].map((z, i) =>
                [-1.5, 1.5].map((x, j) => {
                    const idx = i * 2 + j;
                    return (
                        <group key={idx} position={[x, 0.6, z]}>
                            {/* Reusing wheel geometry and material */}
                            <mesh
                                ref={(el) => (wheelsRef.current[idx] = el)}
                                rotation={[0, 0, Math.PI / 2]}
                                castShadow
                                geometry={wheelGeometry}
                                material={wheelMaterial}
                            >
                                <mesh
                                    position={[0, x > 0 ? 0.26 : -0.26, 0]}
                                    rotation={[Math.PI / 2, 0, 0]}
                                    geometry={hubcapGeometry}
                                    material={hubcapMaterial}
                                />
                            </mesh>
                            <mesh
                                position={[x > 0 ? -0.2 : 0.2, 0.3, 0]}
                                rotation={[0, 0, x > 0 ? Math.PI / 4 : -Math.PI / 4]}
                                geometry={suspensionGeometry}
                                material={suspensionMaterial}
                            />
                        </group>
                    );
                })
            )}

            <mesh position={[0, 2.2, 1.2]} castShadow>
                <cylinderGeometry args={[0.05, 0.05, 1.5]} />
                <meshStandardMaterial color="#ddd" metalness={0.6} roughness={0.4} />
            </mesh>
            <mesh position={[0, 3.0, 1.2]} castShadow>
                <boxGeometry args={[0.4, 0.3, 0.5]} />
                <meshStandardMaterial color="#fff" metalness={0.2} roughness={0.5} />
            </mesh>

            {[-0.8, 0.8].map((x, i) => (
                <mesh key={i} position={[x, 1.75, -1]} rotation={[-0.1, 0, 0]} castShadow>
                    <boxGeometry args={[1.2, 0.05, 1.8]} />
                    <meshStandardMaterial color="#0A1045" metalness={0.9} roughness={0.1} />
                </mesh>
            ))}

            <mesh position={[1, 1.8, -1.8]} castShadow>
                <cylinderGeometry args={[0.02, 0.02, 1.5]} />
                <meshStandardMaterial color="#555" />
            </mesh>
            <mesh position={[1, 2.5, -1.8]}>
                <sphereGeometry args={[0.08]} />
                <meshStandardMaterial color="#ff3333" emissive="#ff0000" emissiveIntensity={2} />
            </mesh>

            <spotLight
                position={[0, 1.4, 2]}
                angle={0.6}
                penumbra={0.5}
                intensity={3}
                distance={60}
                castShadow
                color="#e0f7fa"
                target-position={[0, 0, 10]}
            />
            {/* Removed the rear point light to save draw calls */}

            <group position={[0, 0, -2]}>
                <Sparkles count={30} scale={3} size={10} speed={0.4} opacity={0.2} color="#a09a8a" />
            </group>
        </group>
    );
});
Rover.displayName = "Rover";

// --- Main Scene ---
const LunarRover = () => {
    const [hudData, setHudData] = useState({ speed: "0.0", battery: "100", camera: "EXT", boosting: false });
    const [score, setScore] = useState(0);
    const roverPositionRef = useRef(new THREE.Vector3(0, 0, 0));
    const roverControlsRef = useRef();

    const handleCollect = () => {
        setScore(s => s + 1);
    };

    return (
        <div className="w-full h-screen relative bg-black overflow-hidden">
            {/* UI Overlay */}
            <div className="absolute top-0 left-0 w-full p-4 sm:p-10 z-10 pointer-events-none flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-4">
                <div>
                    <h1 className="text-lg sm:text-3xl font-bold font-mono text-blue-400 tracking-widest drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                        VANGUARD OS // LUNAR_ROVER_SIM
                    </h1>
                    <div className="hidden sm:block text-gray-300 font-mono text-xs sm:text-sm mt-3 bg-black/60 p-3 sm:p-4 rounded border border-blue-500/30 backdrop-blur-md max-w-[80vw] sm:max-w-sm pointer-events-auto">
                        <span className="text-blue-400 mb-1 sm:mb-2 block font-bold border-b border-blue-500/30 pb-1">MISSION DIRECTIVE:</span>
                        Navigate the lunar surface. Collect anomalous energy crystals.<br /><br />
                        <span className="text-blue-400 block border-b border-blue-500/30 pb-1 mt-1 sm:mt-2 mb-1 sm:mb-2">CONTROLS:</span>
                        <div>
                            [W] Accelerate | [S] Brake/Rev<br />
                            [A/D] Steer | [Shift] Boost<br />
                            [C] Toggle Camera
                        </div>
                    </div>
                </div>
                <div className="text-left flex flex-col items-start sm:items-end sm:text-right bg-black/60 p-3 sm:p-5 rounded border border-blue-500/30 backdrop-blur-md w-[80vw] sm:w-64 max-w-[200px] sm:max-w-none pointer-events-auto mt-1 sm:mt-0">
                    <p className="text-green-400 font-mono text-[10px] sm:text-sm tracking-wider flex items-center justify-start sm:justify-end gap-1.5 sm:gap-2 mb-1.5 sm:mb-3">
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500 animate-pulse"></span>
                        SYSTEM ONLINE
                    </p>

                    <div className="space-y-1 sm:space-y-2 mt-1 sm:mt-4 w-full">
                        <div className="flex justify-between text-[10px] sm:text-xs font-mono text-blue-300">
                            <span>VELOCITY:</span>
                            <span className={parseFloat(hudData.speed) > 20 ? "text-yellow-400" : ""}>{hudData.speed} m/s</span>
                        </div>

                        <div className="flex justify-between text-[10px] sm:text-xs font-mono text-blue-300 items-center">
                            <span>POWER:</span>
                            <div className="w-16 sm:w-24 h-1.5 sm:h-2 bg-gray-800 rounded overflow-hidden shadow-[inset_0_0_5px_rgba(0,0,0,0.5)]">
                                <div
                                    className={`h-full flex-none ${parseFloat(hudData.battery) > 20 ? (hudData.boosting ? 'bg-yellow-400' : 'bg-blue-500') : 'bg-red-500 animate-pulse'}`}
                                    style={{ width: `${hudData.battery}%`, transition: 'width 0.1s linear' }}
                                ></div>
                            </div>
                        </div>

                        <div className="flex justify-between text-[10px] sm:text-xs font-mono text-blue-300 mt-1 sm:mt-2">
                            <span>CAM MODE:</span>
                            <span className="text-green-400">[{hudData.camera}]</span>
                        </div>

                        <div className="flex justify-between text-[10px] sm:text-xs font-mono text-blue-300 pt-1 sm:pt-2 border-t border-blue-500/30 mt-1 sm:mt-2">
                            <span>ANOMALIES:</span>
                            <span className="text-cyan-400 font-bold text-[10px] sm:text-sm">{score}</span>
                        </div>
                    </div>

                    <a href="/#projects" className="pointer-events-auto mt-3 sm:mt-6 w-full block text-center px-4 sm:px-6 py-1.5 sm:py-2 border border-red-500/50 bg-red-500/10 text-red-400 font-mono text-[10px] sm:text-sm hover:bg-red-500/30 hover:shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all">
                        [ ABORT MISSION ]
                    </a>
                </div>
            </div>

            {hudData.camera === "MAST" && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10 opacity-50">
                    <div className="w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] border border-cyan-500/40 rounded-full flex items-center justify-center">
                        <div className="w-[15%] h-[1px] bg-cyan-500 absolute left-0"></div>
                        <div className="w-[15%] h-[1px] bg-cyan-500 absolute right-0"></div>
                        <div className="h-[15%] w-[1px] bg-cyan-500 absolute top-0"></div>
                        <div className="h-[15%] w-[1px] bg-cyan-500 absolute bottom-0"></div>
                        <div className="w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_5px_#0ff]"></div>
                    </div>
                </div>
            )}

            {/* Mobile Touch Controls */}
            <div className="absolute bottom-6 left-2 right-2 sm:hidden z-20 flex justify-between items-end pointer-events-none">
                {/* D-PAD Left */}
                <div className="flex flex-col gap-1 pointer-events-auto">
                    <div className="flex justify-center">
                        <MobileButton actionKey="w" label="W" className="w-12 h-12 rounded-t-lg" roverRef={roverControlsRef} />
                    </div>
                    <div className="flex justify-center gap-1">
                        <MobileButton actionKey="a" label="A" className="w-12 h-12 rounded-l-lg" roverRef={roverControlsRef} />
                        <MobileButton actionKey="s" label="S" className="w-12 h-12 rounded-b-lg" roverRef={roverControlsRef} />
                        <MobileButton actionKey="d" label="D" className="w-12 h-12 rounded-r-lg" roverRef={roverControlsRef} />
                    </div>
                </div>

                {/* Actions Right */}
                <div className="flex flex-col gap-3 pointer-events-auto items-end">
                    <MobileButton actionKey="c" label="CAM" className="w-12 h-12 rounded-full text-[10px] font-bold" roverRef={roverControlsRef} />
                    <MobileButton actionKey="shift" label="BOOST" className="w-14 h-14 rounded-full text-xs font-bold bg-blue-600/40 border-blue-400/50" roverRef={roverControlsRef} />
                </div>
            </div>

            {/* Performance optimal Canvas setup */}
            <Canvas dpr={[1, 1.5]} shadows camera={{ position: [0, 5, -12], fov: 60 }} performance={{ min: 0.5 }}>
                <color attach="background" args={["#000002"]} />
                <fog attach="fog" args={["#000002", 20, 200]} />

                <ambientLight intensity={0.4} />
                <directionalLight
                    position={[100, 50, -50]}
                    intensity={2.8}
                    castShadow
                    shadow-mapSize={1024} // Reduced from 2048 for memory
                    shadow-camera-left={-80}
                    shadow-camera-right={80}
                    shadow-camera-top={80}
                    shadow-camera-bottom={-80}
                    shadow-bias={-0.0005}
                />

                <Stars radius={200} depth={50} count={5000} factor={6} saturation={0} fade speed={0.5} />

                <Suspense fallback={null}>
                    <Terrain />
                    <Rover ref={roverControlsRef} position={[0, 0, 0]} setHudData={setHudData} roverPositionRef={roverPositionRef} />
                    <Anomalies count={30} onCollect={handleCollect} roverPositionRef={roverPositionRef} />
                    {/* Post-processing completely removed */}
                </Suspense>
            </Canvas>
        </div>
    );
};

export default LunarRover;
