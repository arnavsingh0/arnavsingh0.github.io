import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Sparkles } from "@react-three/drei";
import { Bloom, DepthOfField, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import confetti from "canvas-confetti";
import { playPuff, unlockAudio } from "./sounds";
import { swellScore } from "./score";
import ErrorBoundary from "../../components/ErrorBoundary";

/* ---------- layout ---------- */

const RINGS = [
  { count: 11, radius: 0.66, offset: 0.1 },
  { count: 7, radius: 0.38, offset: 0.7 },
  { count: 3, radius: 0.11, offset: 1.9 },
];

const CANDLES = RINGS.flatMap((ring, ringIndex) => (
  Array.from({ length: ring.count }, (_, slot) => {
    const angle = (slot / ring.count) * Math.PI * 2 + ring.offset;
    return {
      x: Math.cos(angle) * ring.radius,
      z: Math.sin(angle) * ring.radius * 0.92,
      rose: (slot + ringIndex) % 2 === 1,
      height: 0.24 + ((slot * 7 + ringIndex * 3) % 5) * 0.012,
    };
  })
)).map((candle, id) => ({ ...candle, id }));

const CAKE_RADIUS = 1.0;
const CAKE_HEIGHT = 0.82;
const CAKE_BASE_Y = 0.46; // top of the stand plate
const CAKE_TOP = CAKE_BASE_Y + CAKE_HEIGHT;

function surfaceY(x, z) {
  const radial = Math.hypot(x, z / 0.92);
  const dome = Math.sqrt(Math.max(0.02, 1.08 * 1.08 - radial * radial));
  return CAKE_TOP + dome * 0.16;
}

/* ---------- textures ---------- */

function canvasTexture(width, height, draw) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  draw(canvas.getContext("2d"), width, height);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function waxTexture(base, stripe) {
  const texture = canvasTexture(32, 128, (ctx) => {
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, 32, 128);
    ctx.fillStyle = stripe;
    for (let y = 6; y < 128; y += 18) ctx.fillRect(0, y, 32, 6);
  });
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

function glowTexture() {
  return canvasTexture(128, 128, (ctx) => {
    const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, "rgba(255, 214, 150, 1)");
    gradient.addColorStop(0.3, "rgba(255, 170, 80, 0.45)");
    gradient.addColorStop(1, "rgba(255, 120, 40, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);
  });
}

// Anamorphic lens streak: a thin horizontal flare that fades at both ends.
function streakTexture() {
  return canvasTexture(256, 16, (ctx) => {
    const gradient = ctx.createLinearGradient(0, 0, 256, 0);
    gradient.addColorStop(0, "rgba(150, 190, 255, 0)");
    gradient.addColorStop(0.35, "rgba(170, 205, 255, 0.35)");
    gradient.addColorStop(0.5, "rgba(230, 240, 255, 1)");
    gradient.addColorStop(0.65, "rgba(170, 205, 255, 0.35)");
    gradient.addColorStop(1, "rgba(150, 190, 255, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 16);
    const vertical = ctx.createLinearGradient(0, 0, 0, 16);
    vertical.addColorStop(0, "rgba(0,0,0,1)");
    vertical.addColorStop(0.5, "rgba(0,0,0,0)");
    vertical.addColorStop(1, "rgba(0,0,0,1)");
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = vertical;
    ctx.fillRect(0, 0, 256, 16);
  });
}

function smokeTexture() {
  return canvasTexture(128, 128, (ctx) => {
    const gradient = ctx.createRadialGradient(64, 64, 4, 64, 64, 64);
    gradient.addColorStop(0, "rgba(230, 222, 218, 0.55)");
    gradient.addColorStop(0.5, "rgba(230, 222, 218, 0.18)");
    gradient.addColorStop(1, "rgba(230, 222, 218, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);
  });
}

function topperTexture() {
  return canvasTexture(512, 320, (ctx, width, height) => {
    ctx.clearRect(0, 0, width, height);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const gradient = ctx.createLinearGradient(0, 40, 0, 280);
    gradient.addColorStop(0, "#f8e8c4");
    gradient.addColorStop(0.5, "#d9b36e");
    gradient.addColorStop(1, "#9c7a3c");
    ctx.fillStyle = gradient;
    ctx.font = "italic 500 230px 'Playfair Display', Georgia, serif";
    ctx.fillText("21", width / 2, height / 2 + 12);
  });
}

/* ---------- flame ---------- */

const FLAME_VERT = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FLAME_FRAG = `
  uniform float uTime;
  uniform float uLit;
  uniform float uSeed;
  varying vec2 vUv;

  float hash(float n) { return fract(sin(n) * 43758.5453); }

  void main() {
    vec2 uv = vUv;
    float t = uTime * 7.0 + uSeed * 10.0;
    float wob = (sin(t + uv.y * 9.0) * 0.5 + sin(t * 1.7 + uv.y * 15.0) * 0.5) * 0.06 * uv.y;
    float x = uv.x - 0.5 + wob;
    // teardrop: wide near the base, pinched toward the tip
    float h = clamp(uv.y / max(uLit, 0.05), 0.0, 1.0);
    float width = 0.30 * sin(h * 3.14159) * (1.0 - h * 0.45) + 0.02;
    float d = abs(x) / width;
    float body = 1.0 - smoothstep(0.55, 1.0, d);
    float core = 1.0 - smoothstep(0.0, 0.5, d + h * 0.6);
    float fade = smoothstep(0.0, 0.08, uv.y) * (1.0 - smoothstep(0.78, 1.0, h));
    float alpha = body * fade * uLit;
    vec3 base = vec3(1.0, 0.42, 0.08);
    vec3 mid = vec3(1.0, 0.72, 0.28);
    vec3 hot = vec3(1.0, 0.97, 0.86);
    vec3 color = mix(base, mid, body);
    color = mix(color, hot, core);
    // a blue kiss right at the wick
    color = mix(vec3(0.45, 0.6, 1.0), color, smoothstep(0.0, 0.18, h));
    gl_FragColor = vec4(color, alpha);
  }
`;

function Flame({ lit, seed, glow, streak }) {
  const mat = useRef(null);
  const group = useRef(null);
  const halo = useRef(null);
  const flare = useRef(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (mat.current) {
      mat.current.uniforms.uTime.value = t;
      const target = lit ? 1 : 0;
      mat.current.uniforms.uLit.value += (target - mat.current.uniforms.uLit.value) * 0.16;
    }
    if (group.current) group.current.quaternion.copy(state.camera.quaternion);
    const flicker = 0.85 + Math.sin(t * 11 + seed * 8) * 0.08 + Math.sin(t * 23 + seed) * 0.05;
    const level = mat.current ? mat.current.uniforms.uLit.value : 0;
    if (halo.current) {
      halo.current.material.opacity = 0.55 * flicker * level;
      halo.current.scale.setScalar(0.34 + flicker * 0.05);
    }
    if (flare.current) {
      flare.current.material.opacity = 0.16 * flicker * level;
      flare.current.scale.x = 0.9 + Math.sin(t * 3.1 + seed * 5) * 0.08;
    }
  });
  return (
    <group ref={group} position={[0, 0, 0]}>
      <mesh ref={halo} position={[0, 0.03, -0.002]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={glow}
          transparent
          opacity={0.5}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh ref={flare} position={[0, 0.05, -0.001]} raycast={() => null}>
        <planeGeometry args={[1, 0.05]} />
        <meshBasicMaterial
          map={streak}
          transparent
          opacity={0.16}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh position={[0, 0.07, 0]} raycast={() => null}>
        <planeGeometry args={[0.09, 0.17]} />
        <shaderMaterial
          ref={mat}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          uniforms={{
            uTime: { value: 0 },
            uLit: { value: lit ? 1 : 0 },
            uSeed: { value: seed },
          }}
          vertexShader={FLAME_VERT}
          fragmentShader={FLAME_FRAG}
        />
      </mesh>
    </group>
  );
}

function Smoke({ texture, seed }) {
  const ref = useRef(null);
  const born = useRef(null);
  useFrame((state) => {
    const mesh = ref.current;
    if (!mesh) return;
    if (born.current == null) born.current = state.clock.elapsedTime;
    const t = state.clock.elapsedTime - born.current;
    const life = Math.min(1, t / 2.4);
    mesh.position.y = 0.02 + t * 0.22;
    mesh.position.x = Math.sin(t * 1.6 + seed) * 0.04 * t;
    mesh.scale.setScalar(0.08 + life * 0.42);
    mesh.material.opacity = (1 - life) * (1 - life) * 0.9;
    mesh.quaternion.copy(state.camera.quaternion);
  });
  return (
    <mesh ref={ref} position={[0, 0.02, 0]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} transparent opacity={0} depthWrite={false} />
    </mesh>
  );
}

/* ---------- candle ---------- */

function flameWorld(candle, target) {
  const y = surfaceY(candle.x, candle.z) - 0.01 + candle.height + 0.09;
  return target.set(candle.x, y, candle.z);
}

function Candle({ candle, lit, textures }) {
  const y = surfaceY(candle.x, candle.z);
  const h = candle.height;
  return (
    <group position={[candle.x, y - 0.01, candle.z]}>
      <mesh position={[0, h / 2, 0]} castShadow raycast={() => null}>
        <cylinderGeometry args={[0.02, 0.022, h, 14]} />
        <meshStandardMaterial map={candle.rose ? textures.rose : textures.cream} roughness={0.5} />
      </mesh>
      <mesh position={[0, h + 0.012, 0]} raycast={() => null}>
        <cylinderGeometry args={[0.004, 0.004, 0.026, 6]} />
        <meshStandardMaterial color="#1d1512" />
      </mesh>
      <group position={[0, h + 0.02, 0]}>
        <Flame lit={lit} seed={candle.id * 0.37} glow={textures.glow} streak={textures.streak} />
        {!lit && <Smoke texture={textures.smoke} seed={candle.id} />}
      </group>
    </group>
  );
}

/* Screen-space picking: a tap (or a finger dragged across the flames) puts
   out whichever lit flame is nearest on screen, within a generous radius.
   Far more forgiving than raycasting tiny flame meshes. */
function Picker({ lit, onTap }) {
  const get = useThree((state) => state.get);
  const gl = useThree((state) => state.gl);
  // Everything mutable lives in refs so the listeners are bound once and a
  // drag survives the re-renders caused by its own taps.
  const litRef = useRef(lit);
  const tapRef = useRef(onTap);
  const sweep = useRef({ down: false, last: null, hits: new Set() });
  litRef.current = lit;
  tapRef.current = onTap;

  useEffect(() => {
    const el = gl.domElement;
    const v = new THREE.Vector3();
    const pick = (clientX, clientY, radius) => {
      const { camera, size } = get();
      const rect = el.getBoundingClientRect();
      const px = clientX - rect.left;
      const py = clientY - rect.top;
      let best = null;
      let bestD = radius * radius;
      CANDLES.forEach((candle) => {
        if (!litRef.current[candle.id] || sweep.current.hits.has(candle.id)) return;
        flameWorld(candle, v).project(camera);
        const sx = ((v.x + 1) / 2) * size.width;
        const sy = ((1 - v.y) / 2) * size.height;
        const d = (sx - px) ** 2 + (sy - py) ** 2;
        if (d < bestD) {
          bestD = d;
          best = candle.id;
        }
      });
      return best;
    };
    const radius = () => {
      const { size } = get();
      return Math.max(44, Math.min(size.width, size.height) * 0.07);
    };
    const onDown = (event) => {
      sweep.current.down = true;
      sweep.current.last = { x: event.clientX, y: event.clientY };
      sweep.current.hits = new Set();
      const id = pick(event.clientX, event.clientY, radius());
      if (id != null) {
        sweep.current.hits.add(id);
        tapRef.current([id]);
      }
    };
    const onMove = (event) => {
      const s = sweep.current;
      if (!s.down || !s.last) return;
      // sweep: sample along the drag so a fast swipe still catches flames,
      // then put the whole batch out with one breath
      const dx = event.clientX - s.last.x;
      const dy = event.clientY - s.last.y;
      const steps = Math.max(1, Math.ceil(Math.hypot(dx, dy) / 10));
      const ids = [];
      for (let i = 1; i <= steps; i += 1) {
        const t = i / steps;
        const id = pick(s.last.x + dx * t, s.last.y + dy * t, radius() * 0.75);
        if (id != null) {
          s.hits.add(id);
          ids.push(id);
        }
      }
      if (ids.length) tapRef.current(ids);
      s.last = { x: event.clientX, y: event.clientY };
    };
    const onUp = () => {
      sweep.current.down = false;
      sweep.current.last = null;
    };
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [gl, get]);
  return null;
}

/* ---------- cake ---------- */

function Sprinkles() {
  const items = useMemo(() => {
    let seed = 21;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    const colors = ["#c8a46a", "#fff4ea", "#e7a0b4", "#f3d5a0"];
    return Array.from({ length: 70 }, () => {
      const angle = rand() * Math.PI * 2;
      const radius = 0.18 + Math.sqrt(rand()) * 0.78;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius * 0.92;
      return {
        position: [x, surfaceY(x, z) + 0.004, z],
        rotation: [0, rand() * Math.PI, 0],
        color: colors[Math.floor(rand() * colors.length)],
      };
    });
  }, []);
  return items.map((item, index) => (
    <mesh key={index} position={item.position} rotation={item.rotation} raycast={() => null}>
      <boxGeometry args={[0.012, 0.01, 0.05]} />
      <meshStandardMaterial color={item.color} roughness={0.4} />
    </mesh>
  ));
}

function Drips() {
  const drips = useMemo(() => Array.from({ length: 16 }, (_, index) => {
    const angle = (index / 16) * Math.PI * 2 + 0.2;
    const length = 0.12 + ((index * 5) % 4) * 0.045;
    return {
      position: [Math.cos(angle) * CAKE_RADIUS, CAKE_TOP - length * 0.55, Math.sin(angle) * CAKE_RADIUS * 0.92],
      scale: [0.075, length, 0.075],
      round: [Math.cos(angle) * CAKE_RADIUS, CAKE_TOP - length * 1.02, Math.sin(angle) * CAKE_RADIUS * 0.92],
    };
  }), []);
  return drips.map((drip, index) => (
    <group key={index}>
      <mesh position={drip.position} scale={drip.scale} castShadow raycast={() => null}>
        <cylinderGeometry args={[0.5, 0.42, 1, 16]} />
        <meshPhysicalMaterial color="#ffd3de" roughness={0.3} clearcoat={0.5} clearcoatRoughness={0.25} />
      </mesh>
      <mesh position={drip.round} scale={[1, 1.2, 1]} raycast={() => null}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshPhysicalMaterial color="#ffd3de" roughness={0.3} clearcoat={0.5} clearcoatRoughness={0.25} />
      </mesh>
    </group>
  ));
}

function Cake({ lit, textures }) {
  return (
    <group>
      {/* stand */}
      <mesh position={[0, 0.04, 0]} receiveShadow raycast={() => null}>
        <cylinderGeometry args={[0.62, 0.78, 0.08, 48]} />
        <meshStandardMaterial color="#b8955a" metalness={0.7} roughness={0.32} />
      </mesh>
      <mesh position={[0, 0.25, 0]} receiveShadow raycast={() => null}>
        <cylinderGeometry args={[0.11, 0.2, 0.36, 24]} />
        <meshStandardMaterial color="#b8955a" metalness={0.7} roughness={0.32} />
      </mesh>
      <mesh position={[0, CAKE_BASE_Y - 0.02, 0]} receiveShadow raycast={() => null}>
        <cylinderGeometry args={[1.3, 1.24, 0.04, 72]} />
        <meshStandardMaterial color="#c9a467" metalness={0.75} roughness={0.28} />
      </mesh>
      <mesh position={[0, CAKE_BASE_Y, 0]} rotation={[Math.PI / 2, 0, 0]} raycast={() => null}>
        <torusGeometry args={[1.3, 0.022, 12, 96]} />
        <meshStandardMaterial color="#e2c58b" metalness={0.85} roughness={0.22} />
      </mesh>

      {/* cake body */}
      <mesh position={[0, CAKE_BASE_Y + CAKE_HEIGHT / 2, 0]} scale={[1, 1, 0.92]} castShadow receiveShadow raycast={() => null}>
        <cylinderGeometry args={[CAKE_RADIUS, CAKE_RADIUS * 1.03, CAKE_HEIGHT, 96]} />
        <meshStandardMaterial color="#ef9bb0" roughness={0.62} />
      </mesh>
      <mesh position={[0, CAKE_BASE_Y + CAKE_HEIGHT * 0.5, 0]} scale={[1, 1, 0.92]} raycast={() => null}>
        <torusGeometry args={[CAKE_RADIUS * 1.012, 0.012, 8, 96]} />
        <meshStandardMaterial color="#f6c7d2" roughness={0.5} />
      </mesh>
      {/* frosting dome */}
      <mesh position={[0, CAKE_TOP - 0.02, 0]} scale={[1.08, 0.18, 0.99]} castShadow raycast={() => null}>
        <sphereGeometry args={[1.0, 72, 36, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhysicalMaterial color="#ffd3de" roughness={0.3} clearcoat={0.5} clearcoatRoughness={0.25} />
      </mesh>
      <Drips />
      <Sprinkles />

      {/* "21" topper on two picks at the back */}
      <group position={[0, CAKE_TOP + 0.02, -0.84]}>
        {[-0.22, 0.22].map((x) => (
          <mesh key={x} position={[x, 0.3, 0]} raycast={() => null}>
            <cylinderGeometry args={[0.006, 0.006, 0.6, 6]} />
            <meshStandardMaterial color="#e2c58b" metalness={0.8} roughness={0.3} />
          </mesh>
        ))}
        <mesh position={[0, 0.74, 0]} raycast={() => null}>
          <planeGeometry args={[0.7, 0.44]} />
          <meshBasicMaterial map={textures.topper} transparent side={THREE.DoubleSide} toneMapped={false} />
        </mesh>
      </group>

      {CANDLES.map((candle) => (
        <Candle key={candle.id} candle={candle} lit={lit[candle.id]} textures={textures} />
      ))}
    </group>
  );
}

/* ---------- room ---------- */

function Room({ lit, warm, dark, onTap, fancy }) {
  const key = useRef(null);
  const target = useRef(null);
  const glow = useRef(null);
  const rim = useRef(null);
  const intro = useRef(0);
  const { scene } = useThree();
  const colors = useMemo(() => ({
    night: new THREE.Color("#07040a"),
    dawn: new THREE.Color("#2b1a1a"),
    current: new THREE.Color("#07040a"),
  }), []);
  const fog = useMemo(() => new THREE.Fog("#07040a", 6, 13), []);
  const [textures, setTextures] = useState(() => ({
    cream: waxTexture("#fff6ee", "rgba(201, 164, 106, 0.45)"),
    rose: waxTexture("#f6cdd8", "rgba(255,255,255,0.4)"),
    glow: glowTexture(),
    streak: streakTexture(),
    smoke: smokeTexture(),
    topper: topperTexture(),
  }));
  const litCount = lit.filter(Boolean).length;

  useEffect(() => {
    let alive = true;
    document.fonts?.load("italic 500 40px 'Playfair Display'").then(() => {
      if (!alive) return;
      setTextures((current) => ({ ...current, topper: topperTexture() }));
    }).catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  useLayoutEffect(() => {
    if (key.current && target.current) key.current.target = target.current;
    scene.background = colors.current;
    scene.fog = fog;
  }, [scene, colors, fog]);

  useFrame((state, delta) => {
    intro.current = Math.min(1, intro.current + delta * 0.22);
    const ease = 1 - (1 - intro.current) ** 3;
    const t = state.clock.elapsedTime;
    const breathe = Math.sin(t * 0.35) * 0.05;
    const drift = Math.sin(t * 0.21) * 0.1;
    // narrow screens stand further back so the whole cake stays in frame
    const back = Math.max(0, 1.15 - state.camera.aspect) * 4.6;
    state.camera.position.set(drift, 3.05 + back * 0.35 + warm * 0.25 + breathe, 6.4 + back - ease * 0.7);
    state.camera.lookAt(0, 0.92 + warm * 0.08, 0);

    const dim = dark ? 0.08 : 1;
    colors.current.lerpColors(colors.night, colors.dawn, warm);
    fog.color.copy(colors.current);
    if (key.current) key.current.intensity = (11 + litCount * 0.35 + warm * 9) * dim;
    if (glow.current) glow.current.intensity = (0.12 + litCount * 0.09) * dim + warm * 0.6;
    if (rim.current) rim.current.intensity = (1.6 + warm * 1.2) * dim;
  });

  return (
    <>
      <ambientLight intensity={0.04 + warm * 0.16} color="#3a2430" />
      <spotLight
        ref={key}
        position={[1.0, 5.6, 4.0]}
        angle={0.36}
        penumbra={1}
        intensity={14}
        color="#ffcf9e"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0004}
        distance={16}
      />
      <object3D ref={target} position={[0, 0.8, 0]} />
      <spotLight ref={rim} position={[-2.4, 3.2, -3.2]} angle={0.7} penumbra={1} intensity={1.6} color="#7f8fe0" />
      <directionalLight position={[2.6, 2.2, 2.6]} intensity={0.45 + warm * 0.5} color="#ffb7c9" />
      <pointLight ref={glow} position={[0, CAKE_TOP + 0.5, 0.1]} color="#ffb366" intensity={0.5} distance={3.2} decay={2} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]} receiveShadow raycast={() => null}>
        <circleGeometry args={[9, 72]} />
        <meshStandardMaterial color="#120a0e" roughness={0.94} />
      </mesh>
      <ContactShadows position={[0, 0.002, 0]} opacity={0.6} scale={7} blur={2.4} far={2.8} color="#000" />

      <Cake lit={lit} textures={textures} />
      <Picker lit={lit} onTap={onTap} />

      <Sparkles count={40} scale={[3.2, 2.2, 2.2]} position={[0, 1.6, 0]} size={1.6} speed={0.2} color="#ffd9ad" opacity={0.6} />

      <EffectComposer multisampling={0}>
        <Bloom luminanceThreshold={0.82} luminanceSmoothing={0.2} intensity={0.9} mipmapBlur />
        {fancy ? <DepthOfField focusDistance={0.02} focalLength={0.028} bokehScale={1.2} /> : null}
        <Noise opacity={0.03} />
        <Vignette eskil={false} offset={0.2} darkness={0.85} />
      </EffectComposer>
    </>
  );
}

/* ---------- confetti ---------- */

function burst() {
  const colors = ["#e7a0b4", "#c8a46a", "#fff8f3", "#f3d5a0", "#d9899f"];
  confetti({
    particleCount: 110,
    spread: 75,
    startVelocity: 34,
    scalar: 0.9,
    ticks: 220,
    origin: { y: 0.6 },
    colors,
    shapes: ["circle"],
    disableForReducedMotion: true,
  });
  window.setTimeout(() => {
    confetti({
      particleCount: 50,
      spread: 110,
      startVelocity: 20,
      scalar: 1.1,
      origin: { y: 0.55 },
      colors,
      shapes: ["square"],
      disableForReducedMotion: true,
    });
  }, 320);
}

/* ---------- scene ---------- */

export default function Candles({ onComplete }) {
  const litRef = useRef(Array(21).fill(true));
  const orderRef = useRef([...Array(21).keys()].sort(() => Math.random() - 0.5));
  const finished = useRef(false);
  const listenRef = useRef(null);
  const meterRef = useRef(null);
  const [lit, setLit] = useState(() => Array(21).fill(true));
  const [listening, setListening] = useState(false);
  const [micError, setMicError] = useState("");
  const [phase, setPhase] = useState("lit"); // lit | dark | wish
  const [warm, setWarm] = useState(0);
  const fancy = useMemo(() => (
    window.matchMedia("(pointer: fine)").matches && window.innerWidth > 900
  ), []);

  const finish = () => {
    if (finished.current) return;
    finished.current = true;
    // the dark beat, then the wish, then the room warms
    window.setTimeout(() => setPhase("dark"), 350);
    window.setTimeout(() => {
      setPhase("wish");
      swellScore();
      burst();
    }, 1500);
    window.setTimeout(() => setWarm(1), 2100);
    window.setTimeout(onComplete, 4600);
  };

  const putOut = (indexes) => {
    if (finished.current || indexes.length === 0) return;
    const next = litRef.current.slice();
    indexes.forEach((index) => {
      next[index] = false;
    });
    litRef.current = next;
    setLit(next);
    playPuff();
    if (next.every((on) => !on)) finish();
  };

  const extinguish = (count) => {
    const picks = [];
    orderRef.current.forEach((index) => {
      if (picks.length < count && litRef.current[index]) picks.push(index);
    });
    putOut(picks);
  };

  useEffect(() => () => {
    listenRef.current?.stop();
  }, []);

  const startMic = async () => {
    unlockAudio();
    setMicError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audio = unlockAudio();
      const source = audio.createMediaStreamSource(stream);
      const analyser = audio.createAnalyser();
      analyser.fftSize = 512;
      source.connect(analyser);
      const data = new Uint8Array(analyser.fftSize);
      let frame = 0;
      let stopped = false;
      const loop = () => {
        if (stopped || finished.current) return;
        analyser.getByteTimeDomainData(data);
        let sum = 0;
        for (let i = 0; i < data.length; i += 1) {
          const sample = (data[i] - 128) / 128;
          sum += sample * sample;
        }
        const rms = Math.sqrt(sum / data.length);
        if (meterRef.current) {
          meterRef.current.style.transform = `scaleX(${Math.min(1, rms * 4)})`;
        }
        frame += 1;
        if (frame % 3 === 0 && rms > 0.08) {
          extinguish(rms > 0.22 ? 2 : 1);
        }
        listenRef.current.raf = requestAnimationFrame(loop);
      };
      listenRef.current = {
        stop: () => {
          stopped = true;
          cancelAnimationFrame(listenRef.current?.raf);
          stream.getTracks().forEach((track) => track.stop());
          source.disconnect();
        },
      };
      setListening(true);
      loop();
    } catch {
        setMicError("no mic here, so swipe the flames instead");
    }
  };

  const tapCandle = (ids) => {
    unlockAudio();
    if (finished.current) return;
    putOut(ids.filter((id) => litRef.current[id]));
  };

  const litCount = lit.filter(Boolean).length;
  const counter = litCount === 21
    ? "twenty-one candles"
    : litCount === 0
      ? "all out"
      : `${litCount} still burning`;

  return (
    <section className={`s21-candle-stage is-${phase}`}>
      <ErrorBoundary fallback={<p className="s21-hint">the candles are shy. tap anywhere and we will keep going.</p>}>
        <Canvas
          className="s21-cake-canvas"
          camera={{ position: [0, 3.05, 6.4], fov: 30 }}
          shadows
          dpr={[1, 1.5]}
          gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
          onCreated={({ gl }) => {
            gl.toneMappingExposure = 1.1;
          }}
        >
          <Room lit={lit} warm={warm} dark={phase === "dark"} onTap={tapCandle} fancy={fancy} />
        </Canvas>
      </ErrorBoundary>
      <div className="s21-candle-ui">
        {phase === "wish" ? (
          <div className="s21-wish-block">
            <p className="s21-wish">happy birthday, Shansu</p>
            <p className="s21-smallcaps">twenty-one, cutessuu</p>
          </div>
        ) : (
          <div className={`s21-candle-copy ${phase === "dark" ? "is-hidden" : ""}`}>
            <p className="s21-smallcaps">{counter}</p>
            <h1>make a wish</h1>
            {listening ? (
              <div className="s21-meter" aria-hidden="true">
                <span ref={meterRef} />
              </div>
            ) : (
              <button type="button" className="s21-textlink" onClick={startMic}>
                blow into the mic
              </button>
            )}
            <p className="s21-hint">{micError || (listening ? "blow, Shansu" : "or swipe across the flames")}</p>
          </div>
        )}
      </div>
    </section>
  );
}
