import { useMemo } from 'react';
import Key from './Key.jsx';
import { layout } from '../data/keyboardLayout.js';
import { projectByKey } from '../data/projects.js';

const UNIT = 1.0;
const ROW_DEPTH = 1.0;

// Compute (x, z) positions for every key from the layout array.
// X is centred per-row; Z grows back-to-front.
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

export default function Keyboard({ onSelect }) {
  const rows = useMemo(() => positionRows(layout), []);
  const totalRows = rows.length;
  // Centre Z so the keyboard sits nicely around origin.
  const zOffset = -((totalRows - 1) * ROW_DEPTH) / 2;

  return (
    <group rotation={[-0.18, 0, 0]} position={[0, 0, 0]}>
      {/* Base plate */}
      <mesh position={[0, -0.22, zOffset + ((totalRows - 1) * ROW_DEPTH) / 2]} receiveShadow>
        <boxGeometry args={[16, 0.18, totalRows * ROW_DEPTH + 0.6]} />
        <meshStandardMaterial color="#0d1014" roughness={0.85} metalness={0.25} />
      </mesh>

      {rows.map(({ rowIndex, keys }) =>
        keys.map((k, i) => {
          const z = zOffset + rowIndex * ROW_DEPTH;
          const project = projectByKey[k.label.toUpperCase()] ?? null;
          const comingSoon = !project;
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
              onSelect={onSelect}
            />
          );
        })
      )}
    </group>
  );
}
