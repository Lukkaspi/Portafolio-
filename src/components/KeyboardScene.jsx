import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import Keyboard from './Keyboard.jsx';

export default function KeyboardScene() {
  const navigate = useNavigate();

  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ position: [0, 6.5, 8], fov: 35 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
    >
      <color attach="background" args={['#070910']} />
      <fog attach="fog" args={['#070910', 18, 38]} />

      <ambientLight intensity={0.35} />
      <directionalLight
        position={[6, 10, 6]}
        intensity={1.1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-8, 4, -6]} intensity={0.5} color="#7c5cff" />
      <pointLight position={[8, 3, -4]} intensity={0.35} color="#c75a2a" />

      <Suspense fallback={null}>
        <Keyboard onSelect={(project) => navigate(`/project/${project.slug}`)} />
        <ContactShadows
          position={[0, -0.31, 0]}
          opacity={0.55}
          scale={20}
          blur={2.4}
          far={6}
        />
      </Suspense>

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={6}
        maxDistance={14}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.3}
        target={[0, 0, 0]}
      />
    </Canvas>
  );
}
