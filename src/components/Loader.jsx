import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Center, Text3D, Float, Environment } from '@react-three/drei';

const launchMessages = [
  "Initializing core modules...",
  "Establishing secure API connection...",
  "Decrypting assets...",
  "Loading component libraries...",
  "Verifying Dharmasamsthe heritage protocols...",
  "Optimizing layout for high-performance...",
  "Compiling application forms...",
  "Caching local resources...",
  "Connecting to secure server proxy...",
  "Synchronizing database...",
  "Activating 3D rendering engine...",
  "Verifying application integrity...",
  "Bypassing quantum firewall...",
  "Injecting CSS variables...",
  "Compiling React nodes...",
  "Finalizing render pipeline...",
  "Launch sequence primed."
];

export default function Loader({ onFinish }) {
  const [isVisible, setIsVisible] = useState(true);
  const [loadComplete, setLoadComplete] = useState(false);
  const [phase, setPhase] = useState(0); // 0=Wait, 2=Terminal, 3=Progress, 4=Countdown
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    // Initial wait to show loader then finish
    const timer = setTimeout(() => {
      setLoadComplete(true);
      setIsVisible(false);
      setTimeout(() => onFinish(), 1500); // Wait for transition
    }, 2000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  // Launch sequence removed

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 2, filter: "blur(30px) brightness(200%)" }}
          transition={{ duration: 1.5, ease: "easeIn" }}
          className="fixed inset-0 z-[100] bg-gray-950 flex items-center justify-center overflow-hidden flex-col font-mono"
        >
          {/* Phase 0: 3D Logo */}
          <AnimatePresence>
            {phase === 0 && (
              <motion.div 
                className="h-[300px] w-[300px] mb-8 relative"
                initial={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
              >
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
                      >
                        MH
                        <meshStandardMaterial color="#6C63FF" metalness={0.8} roughness={0.2} />
                      </Text3D>
                    </Center>
                  </Float>
                </Canvas>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Intro Text & Button */}
          {phase === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 1 }}
              className="text-white text-3xl font-bold tracking-[0.3em] flex items-center flex-col uppercase font-sans"
            >
              Malkala Hostel
              
              <div className="h-16 mt-8 flex items-center justify-center overflow-visible">
                <AnimatePresence mode="wait">
                  <motion.div key="progress" className="w-64 overflow-hidden rounded-full border border-gray-800" exit={{ opacity: 0, scale: 0.5 }}>
                    <motion.div 
                      className="h-1.5 bg-primary" 
                      initial={{ width: "0%" }} 
                      animate={{ width: "100%" }} 
                      transition={{ duration: 2, ease: "easeInOut" }}
                    />
                    <div className="text-gray-500 text-xs mt-3 text-center tracking-widest uppercase">{loadComplete ? "System Starting..." : "System Startup..."}</div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* Launch phases removed */}

          {/* Background Ambient Grid when active */}
          {phase > 0 && phase < 4 && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 0.1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none z-[-1]"
              style={{
                backgroundImage: 'linear-gradient(rgba(108, 99, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(108, 99, 255, 0.5) 1px, transparent 1px)',
                backgroundSize: '50px 50px',
                backgroundPosition: 'center center'
              }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
