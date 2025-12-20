// import React, { useRef } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { OrbitControls, Text3D, Center } from '@react-three/drei';
// import { formatCurrency } from '../../utils/formatters';

// function RotatingCard({ balance }) {
//   const meshRef = useRef();

//   useFrame((state) => {
//     meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
//     meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
//   });

//   return (
//     <mesh ref={meshRef}>
//       <boxGeometry args={[4, 2.5, 0.2]} />
//       <meshStandardMaterial
//         color="#3B82F6"
//         metalness={0.8}
//         roughness={0.2}
//       />
//       <Center position={[0, 0, 0.11]}>
//         <Text3D
//           font="/fonts/helvetiker_regular.typeface.json"
//           size={0.3}
//           height={0.05}
//         >
//           {formatCurrency(balance)}
//           <meshStandardMaterial color="#ffffff" />
//         </Text3D>
//       </Center>
//     </mesh>
//   );
// }

// const BalanceCard3D = ({ balance }) => {
//   return (
//     <div className="w-full h-64 rounded-xl overflow-hidden glass">
//       <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
//         <ambientLight intensity={0.5} />
//         <pointLight position={[10, 10, 10]} intensity={1} />
//         <spotLight position={[-10, -10, -10]} angle={0.3} />
//         <RotatingCard balance={balance} />
//         <OrbitControls enableZoom={false} />
//       </Canvas>
//     </div>
//   );
// };

// export default BalanceCard3D;






import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../common/GlassCard';
import { formatCurrency } from '../../utils/formatters';

const BalanceCard3D = ({ balance }) => {
  return (
    <motion.div
      initial={{ opacity: 0, rotateY: -90 }}
      animate={{ opacity: 1, rotateY: 0 }}
      transition={{ duration: 0.8, type: 'spring' }}
      whileHover={{ scale: 1.02, rotateY: 5 }}
      style={{ perspective: 1000 }}
    >
      <GlassCard className="relative overflow-hidden h-48">
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              'linear-gradient(45deg, #3B82F6, #8B5CF6)',
              'linear-gradient(45deg, #8B5CF6, #EC4899)',
              'linear-gradient(45deg, #EC4899, #3B82F6)',
            ],
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between">
          <div>
            <p className="text-gray-300 text-sm mb-2">Total Balance</p>
            <motion.h2
              className="text-5xl font-bold text-white"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
            >
              {formatCurrency(balance)}
            </motion.h2>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">Updated just now</span>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-8 h-8 border-2 border-white border-t-transparent rounded-full"
            />
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default BalanceCard3D;