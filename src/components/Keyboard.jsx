import { useMemo } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import Key from './Key.jsx';
import { layout } from '../data/keyboardLayout.js';
import { projects, projectByKey } from '../data/projects.js';
import { keyStyles } from '../data/keyStyles.js';
import { asset } from '../lib/asset.js';

const UNIT = 1.0;
const ROW_DEPTH = 1.0;

function positionRows(rows) {
  return rows.map((row, rowIndex) => {
    const total = row.reduce((acc, k) => acc + (k.w ?? 1) * UNIT, 0);
    let cursor = -total / 2;
    const positioned = row.map((k) => {
      const w = (k.w ?? 1) * UNIT;
      const x = cursor + w / 2;
      cursor += w;
      return { ...k, x, w };
    });
    return { rowIndex, keys: positioned };
  });
}

// Stable list of cap texture paths in the same order as `projects`,
// so useTexture returns an array we can map back by index.
const capPaths = projects
  .map((p) => keyStyles[p.slug]?.cap)
  .filter(Boolean)
  .map(asset);

useTexture.preload(capPaths);

export default function Keyboard({ onSelect }) {
  const rows = useMemo(() => positionRows(layout), []);
  const totalRows = rows.length;
  const zOffset = -((totalRows - 1) * ROW_DEPTH) / 2;

  const textures = useTexture(capPaths);
  // Map slug → texture for fast lookup; ensure correct color space.
  const texBySlug = useMemo(() => {
    const map = {};
    let i = 0;
    for (const p of projects) {
      const cap = keyStyles[p.slug]?.cap;
      if (!cap) continue;
      const tex = Array.isArray(textures) ? textures[i] : textures;
      if (tex) {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.anisotropy = 4;
        map[p.slug] = tex;
      }
      i++;
    }
    return map;
  }, [textures]);

  return (
    <group rotation={[-0.18, 0, 0]} position={[0, 0, 0]}>
      {/* Base plate */}
      <mesh
        position={[
          0,
          -0.22,
          zOffset + ((totalRows - 1) * ROW_DEPTH) / 2,
        ]}
        receiveShadow
      >
        <boxGeometry args={[16, 0.18, totalRows * ROW_DEPTH + 0.6]} />
        <meshStandardMaterial color="#0d1014" roughness={0.85} metalness={0.25} />
      </mesh>

      {rows.map(({ rowIndex, keys }) =>
        keys.map((k, i) => {
          const z = zOffset + rowIndex * ROW_DEPTH;
          const baseProject = projectByKey[k.label.toUpperCase()] ?? null;
          const project = baseProject
            ? { ...baseProject, style: keyStyles[baseProject.slug] ?? null }
            : null;
          const comingSoon = !project;
          const capTexture = project ? texBySlug[project.slug] ?? null : null;
          return (
            <Key
              key={`${rowIndex}-${i}`}
              x={k.x}
              z={z}
              w={k.w}
              label={k.label}
              sub={k.sub}
              project={project}
              comingSoon={comingSoon}
              capTexture={capTexture}
              onSelect={onSelect}
            />
          );
        })
      )}
    </group>
  );
}
