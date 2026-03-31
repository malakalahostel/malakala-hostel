import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Center, Text3D, Float, Environment } from '@react-three/drei';

export default function Loader({ onFinish }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide loader after 2.5s to let the 3D M spin for a bit
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onFinish(), 800); // 800ms for exit animation
    }, 2800);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-gray-900 flex items-center justify-center overflow-hidden flex-col"
        >
          <div className="h-[300px] w-[300px] mb-8">
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1.5} />
              <Environment preset="city" />
              
              <Float speed={4} rotationIntensity={1} floatIntensity={2}>
                <Center>
                  <Text3D
                    font="https://threejs.org/examples/fonts/helvetiker_bold.typeface.json"
                    size={1.5}
                    height={0.4}
                    curveSegments={12}
                    bevelEnabled
                    bevelThickness={0.05}
                    bevelSize={0.03}
                    bevelOffset={0}
                    bevelSegments={5}
                  >
                    MH
                    <meshStandardMaterial color="#6C63FF" metalness={0.8} roughness={0.2} />
                  </Text3D>
                </Center>
              </Float>
            </Canvas>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-white text-2xl font-bold tracking-widest flex items-center flex-col"
          >
            MALAKALA HOSTEL
            <motion.div 
              className="mt-4 h-1 bg-primary rounded" 
              initial={{ width: 0 }} 
              animate={{ width: 100 }} 
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.8 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
