import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Center, Text3D, Float, Environment } from '@react-three/drei';

export default function Loader({ onFinish }) {
  const [isVisible, setIsVisible] = useState(true);
  const [loadComplete, setLoadComplete] = useState(false);

  useEffect(() => {
    // Show the launch button after 2 seconds
    const timer = setTimeout(() => {
      setLoadComplete(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleLaunch = () => {
    setIsVisible(false);
    setTimeout(() => onFinish(), 800); // 800ms for exit animation
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
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
            
            <div className="h-16 mt-4 flex items-center justify-center overflow-visible">
              {loadComplete ? (
                <motion.button 
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(108, 99, 255, 0.6)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLaunch}
                  className="px-8 py-3 bg-primary text-white rounded-full font-bold tracking-widest border border-primary/50 hover:bg-transparent shadow-lg shadow-primary/30 transition-colors uppercase cursor-pointer relative overflow-hidden"
                >
                  <motion.div 
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: "-100%" }}
                    animate={{ x: "200%" }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
                  />
                  Launch Website
                </motion.button>
              ) : (
                <div className="w-48 overflow-hidden rounded-full">
                  <motion.div 
                    className="h-1 bg-primary rounded-full" 
                    initial={{ width: "0%" }} 
                    animate={{ width: "100%" }} 
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                  <div className="text-gray-400 text-xs font-normal mt-2 text-center normal-case tracking-normal">Initializing modules...</div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
