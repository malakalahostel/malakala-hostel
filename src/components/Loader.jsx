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
    // Initial wait to show button
    const timer = setTimeout(() => {
      setLoadComplete(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Main Launch Controller
  useEffect(() => {
    if (phase === 2) {
      // Phase 2: Terminal messages (5 seconds)
      const msgInterval = setInterval(() => {
        setMessageIndex(prev => {
          if (prev < launchMessages.length - 1) return prev + 1;
          return prev;
        });
      }, 250); // Fast print
      
      const t = setTimeout(() => setPhase(3), 5000);
      return () => { clearInterval(msgInterval); clearTimeout(t); };
    }
    else if (phase === 3) {
      // Phase 3: Percent Progress Matrix (5 seconds)
      let currentProgress = 0;
      const progInterval = setInterval(() => {
        currentProgress += Math.random() * 8;
        if (currentProgress > 99) currentProgress = 100;
        setProgress(Math.min(100, currentProgress));
      }, 200); // Ticks every 200ms
      
      const t = setTimeout(() => setPhase(4), 5000);
      return () => { clearInterval(progInterval); clearTimeout(t); };
    }
    else if (phase === 4) {
      // Phase 4: Final 10-second countdown (10 seconds)
      const countInterval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countInterval);
            setIsVisible(false);
            setTimeout(() => onFinish(), 1500); // Explode out
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(countInterval);
    }
  }, [phase, onFinish]);

  const handleLaunch = () => {
    setIsVisible(false);
    setTimeout(() => onFinish(), 1500);
  };

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
              Malakala Hostel
              
              <div className="h-16 mt-8 flex items-center justify-center overflow-visible">
                <AnimatePresence mode="wait">
                  {loadComplete ? (
                    <motion.button 
                      key="launchBtn"
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0, transition: { duration: 0.4 } }}
                      whileHover={{ scale: 1.05, boxShadow: "0px 0px 30px rgba(108, 99, 255, 0.8)" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleLaunch}
                      className="px-10 py-4 bg-primary text-white rounded-md font-bold tracking-[0.2em] border border-primary/50 shadow-2xl shadow-primary/40 transition-colors cursor-pointer relative overflow-hidden"
                    >
                      <motion.div 
                        className="absolute inset-0 bg-black/30"
                        initial={{ x: "-100%" }}
                        animate={{ x: "200%" }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
                      />
                      ENTER WEBSITE
                    </motion.button>
                  ) : (
                    <motion.div key="progress" className="w-64 overflow-hidden rounded-full border border-gray-800" exit={{ opacity: 0, scale: 0.5 }}>
                      <motion.div 
                        className="h-1.5 bg-primary" 
                        initial={{ width: "0%" }} 
                        animate={{ width: "100%" }} 
                        transition={{ duration: 2, ease: "easeInOut" }}
                      />
                      <div className="text-gray-500 text-xs mt-3 text-center tracking-widest uppercase">System Startup...</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* Phase 2: Terminal Logs */}
          <AnimatePresence>
            {phase === 2 && (
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                className="w-full max-w-2xl px-8 text-left h-64 overflow-hidden flex flex-col justify-end relative"
                style={{ WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 80%, rgba(0,0,0,0))' }}
              >
                <div className="text-primary text-sm tracking-wide break-words space-y-2 opacity-80">
                  {launchMessages.slice(0, messageIndex).map((msg, i) => (
                    <div key={i} className="text-gray-500">[OK] {msg}</div>
                  ))}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-green-400 font-bold"
                  >
                    &gt; {launchMessages[messageIndex]}<span className="animate-pulse">_</span>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Phase 3: Progress Matrix */}
          <AnimatePresence>
            {phase === 3 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: -100 }}
                className="flex flex-col items-center justify-center mt-20"
              >
                <div className="text-[8rem] font-black text-transparent bg-clip-text bg-gradient-to-t from-primary to-blue-300 leading-none" style={{ WebkitTextStroke: '2px rgba(108,99,255,0.2)' }}>
                  {progress.toFixed(1)}%
                </div>
                <div className="text-gray-400 tracking-[0.5em] mt-4 uppercase text-sm font-bold">
                  Compiling Mainframe
                </div>
                <div className="w-96 h-2 bg-gray-900 mt-8 rounded-full overflow-hidden border border-gray-800">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-blue-600 to-indigo-400"
                    style={{ width: `${progress}%` }}
                    layout
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Phase 4: Final Countdown */}
          <AnimatePresence>
            {phase === 4 && (
              <motion.div 
                initial={{ opacity: 0, scale: 2 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-gray-950"
              >
                <motion.div 
                  key={countdown}
                  initial={{ opacity: 0, scale: 0.5, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
                  transition={{ duration: 0.8 }}
                  className="text-[15rem] font-black leading-none text-white drop-shadow-[0_0_30px_rgba(108,99,255,0.8)]"
                >
                  {countdown}
                </motion.div>
                <div className="text-red-500 tracking-[1em] text-xl mt-8 font-bold animate-pulse">
                  T-MINUS
                </div>
              </motion.div>
            )}
          </AnimatePresence>

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
