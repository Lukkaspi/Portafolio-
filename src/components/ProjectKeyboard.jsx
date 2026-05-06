import { Suspense, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  RoundedBox,
  ContactShadows,
  Environment,
  useTexture,
  useCursor,
} from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { projects } from '../data/projects.js';
import { keyStyles } from '../data/keyStyles.js';
import { asset } from '../lib/asset.js';

// Exactly 10 slots. 5 columns × 2 rows. CUPRA in the front-centre.
const SLOTS = [
  // back row (further from camera)
  { slug: 'car-sketches', col: 0, row: 0 },
  { slug: 'microplastics-filter', col: 1, row: 0 },
  { slug: 'university-sheets', col: 2, row: 0 },
  { slug: 'aparcat', col: 3, row: 0 },
  { slug: 'uab-hackathon', col: 4, row: 0 },
  // front row
  { slug: 'technical-drawings', col: 0, row: 1 },
  { slug: 'intercom-study', col: 1, row: 1 },
  { slug: 'cupra', col: 2, row: 1 },
  { slug: 'urn-packaging', col: 3, row: 1 },
  { slug: 'dam-beverage', col: 4, row: 1 },
];

// Geometry constants — compact, balanced, fits tall right-column at iPad
// landscape aspect ratios without horizontal stretching.
const KEY_W = 1.05;
const KEY_D = 1.05;
const KEY_H = 0.36;
const GAP = 0.1;
const COLS = 5;
const ROWS = 2;

const totalW = COLS * KEY_W + (COLS - 1) * GAP;
const totalD = ROWS * KEY_D + (ROWS - 1) * GAP;

const projectBySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));

function slotPosition(slot) {
  const x = -totalW / 2 + KEY_W / 2 + slot.col * (KEY_W + GAP);
  const z = -totalD / 2 + KEY_D / 2 + slot.row * (KEY_D + GAP);
  return [x, 0, z];
}

const capPaths = SLOTS.map((s) => keyStyles[s.slug]?.cap).filter(Boolean).map(asset);
useTexture.preload(capPaths);

function ProjectKey({ slot, project, style, texture, hoveredSlug, setHoveredSlug, onSelect }) {
  const groupRef = useRef();
  const bodyRef = useRef();
  const isHovered = hoveredSlug === slot.slug;
  const anyHovered = !!hoveredSlug;
  useCursor(isHovered);

  const targetScale = useMemo(
    () => new THREE.Vector3(1, 1, 1),
    []
  );

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const k = isHovered ? 1.16 : anyHovered ? 0.94 : 1.0;
    targetScale.set(k, k, k);
    groupRef.current.scale.lerp(targetScale, Math.min(1, delta * 9));

    // Lift the hovered key a touch
    const liftTarget = isHovered ? 0.14 : 0;
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      liftTarget,
      Math.min(1, delta * 9)
    );

    if (bodyRef.current) {
      // Every project key is permanently illuminated. Hover intensifies the
      // accent without ever turning it off; CUPRA gets a small extra boost
      // so the featured key still reads as the focal point.
      const baseline = 0.85 + (project.featured ? 0.25 : 0);
      const target = isHovered ? baseline + 0.7 : baseline;
      bodyRef.current.material.emissiveIntensity = THREE.MathUtils.lerp(
        bodyRef.current.material.emissiveIntensity,
        target,
        Math.min(1, delta * 8)
      );
    }
  });

  const [px, , pz] = slotPosition(slot);

  return (
    <group
      ref={groupRef}
      position={[px, 0, pz]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHoveredSlug(slot.slug);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHoveredSlug((cur) => (cur === slot.slug ? null : cur));
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(project);
      }}
    >
      <RoundedBox
        ref={bodyRef}
        args={[KEY_W, KEY_H, KEY_D]}
        radius={0.09}
        smoothness={4}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          color={style?.body ?? '#0e1a2e'}
          emissive={style?.accent ?? '#000000'}
          emissiveIntensity={0.85}
          roughness={0.55}
          metalness={0.12}
          clearcoat={0.2}
          clearcoatRoughness={0.7}
          transparent
          opacity={0.95}
        />
      </RoundedBox>

      {/* Engraved cap face — engraving is permanently lit in its accent */}
      {texture && (
        <mesh
          position={[0, KEY_H / 2 + 0.001, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[KEY_W * 0.92, KEY_D * 0.92]} />
          <meshStandardMaterial
            map={texture}
            transparent
            roughness={0.7}
            metalness={0.03}
            emissive={style?.accent ?? '#000'}
            emissiveMap={texture}
            emissiveIntensity={isHovered ? 1.05 : 0.7}
            toneMapped={false}
          />
        </mesh>
      )}

      {/* Always-on accent rim along the bottom edge — colour reads even when
          the key is at rest, hover just intensifies it. */}
      <mesh position={[0, -KEY_H / 2 + 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[KEY_W * 0.88, KEY_D * 0.88]} />
        <meshBasicMaterial
          color={style?.accent ?? '#7c5cff'}
          transparent
          opacity={isHovered ? 0.7 : 0.32}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function KeyboardGroup({ hoveredSlug, setHoveredSlug, onSelect }) {
  const groupRef = useRef();
  const textures = useTexture(capPaths);

  // Map slug → texture (preloaded order matches SLOTS order)
  const texBySlug = useMemo(() => {
    const map = {};
    let i = 0;
    for (const s of SLOTS) {
      const cap = keyStyles[s.slug]?.cap;
      if (!cap) continue;
      const tex = Array.isArray(textures) ? textures[i] : textures;
      if (tex) {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.anisotropy = 4;
        map[s.slug] = tex;
      }
      i++;
    }
    return map;
  }, [textures]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    // Gentle floating — kept subtle so it doesn't fight readability.
    const float = Math.sin(t * 0.85) * 0.03;
    groupRef.current.position.y = float;

    // Very subtle mouse-follow tilt around the base orientation. Reduced from
    // the earlier values so all keys stay clearly visible at all times.
    const px = state.pointer.x;
    const py = state.pointer.y;
    const baseX = -0.12; // very mild forward tilt — view is mostly top-down
    const targetX = baseX + py * 0.025;
    const targetY = px * 0.05;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetX,
      Math.min(1, delta * 4)
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetY,
      Math.min(1, delta * 4)
    );
  });

  return (
    <group ref={groupRef} rotation={[-0.12, 0, 0]} scale={0.88}>
      {/* Smoked-glass base plate — semi-transparent so the hero stars and
          gradients bleed through, and so nothing reads as a bright slab. */}
      <mesh position={[0, -KEY_H / 2 - 0.12, 0]} receiveShadow>
        <boxGeometry args={[totalW + 0.5, 0.10, totalD + 0.5]} />
        <meshPhysicalMaterial
          color="#06101e"
          transparent
          opacity={0.42}
          roughness={0.18}
          metalness={0.0}
          clearcoat={0.7}
          clearcoatRoughness={0.18}
          reflectivity={0.35}
          ior={1.4}
        />
      </mesh>

      {/* Soft accent under-light. Subtle violet wash so the base plate
          reads as illuminated from beneath rather than a dark void. */}
      <mesh
        position={[0, -KEY_H / 2 - 0.19, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[totalW + 0.6, totalD + 0.6]} />
        <meshBasicMaterial
          color="#7c5cff"
          transparent
          opacity={0.14}
          toneMapped={false}
        />
      </mesh>

      {SLOTS.map((slot) => {
        const project = projectBySlug[slot.slug];
        if (!project) return null;
        return (
          <ProjectKey
            key={slot.slug}
            slot={slot}
            project={project}
            style={keyStyles[slot.slug]}
            texture={texBySlug[slot.slug]}
            hoveredSlug={hoveredSlug}
            setHoveredSlug={setHoveredSlug}
            onSelect={onSelect}
          />
        );
      })}
    </group>
  );
}

export default function ProjectKeyboard() {
  const navigate = useNavigate();
  const [hoveredSlug, setHoveredSlug] = useState(null);
  const hovered = hoveredSlug ? projectBySlug[hoveredSlug] : null;

  return (
    <div className="relative h-full w-full">
      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{ position: [0, 7.6, 7.0], fov: 44 }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        onPointerMissed={() => setHoveredSlug(null)}
      >
        <color attach="background" args={['#00000000']} />

        <ambientLight intensity={0.32} />
        <directionalLight
          position={[6, 9, 5]}
          intensity={0.9}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-7, 3, -5]} intensity={0.55} color="#7c5cff" />
        <pointLight position={[7, 2, -4]} intensity={0.4} color="#5b9eff" />

        <Suspense fallback={null}>
          {/* Dim environment so reflections stay dark and smoky, never white */}
          <Environment preset="night" environmentIntensity={0.2} />
          <KeyboardGroup
            hoveredSlug={hoveredSlug}
            setHoveredSlug={setHoveredSlug}
            onSelect={(p) => navigate(`/project/${p.slug}`)}
          />
          <ContactShadows
            position={[0, -0.45, 0]}
            opacity={0.45}
            scale={9}
            blur={2.6}
            far={5}
            color="#000"
          />
        </Suspense>
      </Canvas>

      {/* Floating tooltip card */}
      <div
        className={`pointer-events-none absolute inset-x-4 bottom-4 z-10 mx-auto max-w-sm transition-all duration-300 ${
          hovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
        }`}
      >
        <div className="card flex items-start gap-3 px-4 py-3 backdrop-blur-md">
          <span
            className="mt-1 inline-block h-2 w-2 flex-shrink-0 rounded-full"
            style={{ backgroundColor: keyStyles[hovered?.slug]?.accent ?? '#7c5cff' }}
          />
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
              {hovered?.tag ?? '—'}
            </div>
            <div className="mt-0.5 text-sm font-semibold text-white">
              {hovered?.title ?? '—'}
            </div>
            <div className="mt-0.5 text-xs text-zinc-300/80 line-clamp-2">
              {hovered?.summary ?? ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
