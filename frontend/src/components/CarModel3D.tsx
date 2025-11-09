import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei";
import { Suspense } from "react";
import { motion } from "framer-motion";

const Car3DModel = () => {
  return (
    <group>
      {/* Car Body */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[4, 1.5, 2]} />
        <meshStandardMaterial color="#001E50" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Car Roof */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[2.5, 1, 1.8]} />
        <meshStandardMaterial color="#001E50" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Wheels */}
      {[
        [-1.2, -0.2, 1],
        [1.2, -0.2, 1],
        [-1.2, -0.2, -1],
        [1.2, -0.2, -1],
      ].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
            <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
      ))}

      {/* Windows */}
      <mesh position={[0.5, 1.5, 0]}>
        <boxGeometry args={[1, 0.8, 1.7]} />
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.3} />
      </mesh>

      {/* Headlights */}
      {[
        [2, 0.5, 0.7],
        [2, 0.5, -0.7],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#00B0F0" emissive="#00B0F0" emissiveIntensity={2} />
        </mesh>
      ))}
    </group>
  );
};

const CarModel3D = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-[400px] rounded-xl overflow-hidden glass"
    >
      <Canvas>
        <PerspectiveCamera makeDefault position={[8, 4, 8]} />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={6}
          maxDistance={15}
          autoRotate
          autoRotateSpeed={2}
        />
        
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <directionalLight position={[-10, -10, -5]} intensity={0.3} />
        <pointLight position={[0, 5, 0]} intensity={0.5} />

        <Suspense fallback={null}>
          <Car3DModel />
          <Environment preset="sunset" />
        </Suspense>

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
          <planeGeometry args={[50, 50]} />
          <shadowMaterial transparent opacity={0.2} />
        </mesh>
      </Canvas>
    </motion.div>
  );
};

export default CarModel3D;
