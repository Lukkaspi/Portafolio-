import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Text, useCursor } from '@react-three/drei';
import * as THREE from 'three';

const ACCENTS = {
  accent: '#7c5cff',
  cupra: '#c75a2a',
};

// Sizes are in world units, where 1 unit = 1U key width-ish.
const KEY_HEIGHT = 0.32;
const KEY_DEPTH = 0.95; // Z (depth into the board)
const GAP = 0.06;

export default function Key({ x, z, w = 1, label, sub, project, comingSoon, onSelect }) {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  const interactive = !!project;
  useCursor(hovered && interactive);

  const accent = useMemo(() => {
    if (!project) return null;
    return ACCENTS[project.accent] ?? ACCENTS.accent;
  }, [project]);

  const baseY = 0;
  const liftY = 0.12;

  useFrame((_, delta) => {
    if (!ref.current) return;
    const target = hovered && interactive ? baseY + liftY : baseY;
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, target, Math.min(1, delta * 14));

    // Emissive lerp on the body material
    const body = ref.current.userData.body;
    if (body) {
      const targetIntensity = project
        ? hovered
          ? 1.4
          : project.featured
          ? 0.55
          : 0.18
        : 0;
      body.material.emissiveIntensity = THREE.MathUtils.lerp(
        body.material.emissiveIntensity,
        targetIntensity,
        Math.min(1, delta * 10)
      );
    }
  });

  const width = w - GAP;
  const labelColor = comingSoon ? '#5a5f6a' : '#f5f5f7';
  const subColor = comingSoon ? '#3a3f48' : 'rgba(255,255,255,0.55)';

  // Body emissive uses the accent if it’s a project key, otherwise neutral.
  const emissiveHex = accent ?? '#000000';
  const bodyColor = comingSoon ? '#14171c' : '#1a1d22';

  return (
    <group
      ref={ref}
      position={[x, baseY, z]}
      onPointerOver={(e) => {
        if (!interactive) return;
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={(e) => {
        if (!interactive) return;
        e.stopPropagation();
        setHovered(false);
      }}
      onClick={(e) => {
        if (!interactive) return;
        e.stopPropagation();
        onSelect?.(project);
      }}
    >
      <RoundedBox
        args={[width, KEY_HEIGHT, KEY_DEPTH - GAP]}
        radius={0.06}
        smoothness={3}
        ref={(m) => {
          if (m && ref.current) ref.current.userData.body = m;
        }}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={bodyColor}
          emissive={emissiveHex}
          emissiveIntensity={project?.featured ? 0.55 : 0.0}
          roughness={0.55}
          metalness={0.18}
        />
      </RoundedBox>

      {/* Top label */}
      <Text
        position={[0, KEY_HEIGHT / 2 + 0.001, 0.04]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={label.length > 2 ? 0.16 : 0.22}
        color={labelColor}
        anchorX="center"
        anchorY="middle"
        letterSpacing={-0.02}
      >
        {label}
      </Text>

      {/* Sub label (e.g. "Shift", "Enter") */}
      {sub && (
        <Text
          position={[0, KEY_HEIGHT / 2 + 0.001, -0.18]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.09}
          color={subColor}
          anchorX="center"
          anchorY="middle"
        >
          {sub}
        </Text>
      )}
    </group>
  );
}
