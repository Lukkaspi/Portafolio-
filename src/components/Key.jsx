import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Text, useCursor } from '@react-three/drei';
import * as THREE from 'three';

const KEY_HEIGHT = 0.32;
const KEY_DEPTH = 0.95;
const GAP = 0.06;

const NEUTRAL_BODY = '#1a1d22';
const COMING_SOON_BODY = '#14171c';

export default function Key({
  x,
  z,
  w = 1,
  label,
  sub,
  project,
  comingSoon,
  capTexture,
  onSelect,
}) {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  const interactive = !!project;
  useCursor(hovered && interactive);

  const style = project?.style ?? null;

  const baseY = 0;
  const liftY = 0.12;

  useFrame((_, delta) => {
    if (!ref.current) return;
    const target = hovered && interactive ? baseY + liftY : baseY;
    ref.current.position.y = THREE.MathUtils.lerp(
      ref.current.position.y,
      target,
      Math.min(1, delta * 14)
    );

    const body = ref.current.userData.body;
    if (body) {
      const targetIntensity = project
        ? hovered
          ? 1.5
          : project.featured
          ? 0.75
          : 0.28
        : 0;
      body.material.emissiveIntensity = THREE.MathUtils.lerp(
        body.material.emissiveIntensity,
        targetIntensity,
        Math.min(1, delta * 10)
      );
    }
  });

  const width = w - GAP;
  const depth = KEY_DEPTH - GAP;
  const labelColor = comingSoon ? '#5a5f6a' : '#f5f5f7';
  const subColor = comingSoon ? '#3a3f48' : 'rgba(255,255,255,0.55)';

  const bodyColor = comingSoon
    ? COMING_SOON_BODY
    : style?.body ?? NEUTRAL_BODY;
  const emissiveHex = style?.accent ?? '#000000';

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
        args={[width, KEY_HEIGHT, depth]}
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

      {/* Brand-textured top face for project keys */}
      {capTexture && (
        <mesh
          position={[0, KEY_HEIGHT / 2 + 0.001, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[width * 0.92, depth * 0.92]} />
          <meshStandardMaterial
            map={capTexture}
            transparent
            roughness={0.7}
            metalness={0.05}
            emissive={emissiveHex}
            emissiveMap={capTexture}
            emissiveIntensity={0.35}
            toneMapped={false}
          />
        </mesh>
      )}

      {/* Fallback / generic label only when there is no cap texture */}
      {!capTexture && (
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
      )}

      {sub && !capTexture && (
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
