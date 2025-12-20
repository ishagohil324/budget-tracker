import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text3D, Center } from '@react-three/drei';
import { formatCurrency } from '../../utils/formatters';

function RotatingCard({ balance }) {
  const meshRef = useRef();

  useFrame((state) => {
    meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[4, 2.5, 0.2]} />
      <meshStandardMaterial
        color="#3B82F6"
        metalness={0.8}
        roughness={0.2}
      />
      <Center position={[0, 0, 0.11]}>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.3}
          height={0.05}
        >
          {formatCurrency(balance)}
          <meshStandardMaterial color="#ffffff" />
        </Text3D>
      </Center>
    </mesh>
  );
}

const BalanceCard3D = ({ balance }) => {
  return (
    <div className="w-full h-64 rounded-xl overflow-hidden glass">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, -10, -10]} angle={0.3} />
        <RotatingCard balance={balance} />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default BalanceCard3D;