import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Home from '../pages/Home';
import Apply from '../pages/Apply';
import AdminPanel from '../pages/AdminPanel';
import ApplicantDashboard from '../pages/ApplicantDashboard';

export default function AnimatedRoutes() {
  const location = useLocation();

  const pageVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, scale: 0.98 },
  };

  const pageTransition = {
    type: "tween",
    ease: "easeInOut",
    duration: 0.4,
  };

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={pageTransition}>
            <Home />
          </motion.div>
        } />
        <Route path="/apply" element={
          <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={pageTransition}>
            <Apply />
          </motion.div>
        } />
        <Route path="/admin" element={
          <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={pageTransition}>
            <AdminPanel />
          </motion.div>
        } />
        <Route path="/login" element={
          <motion.div initial="initial" animate="animate" exit="exit" variants={pageVariants} transition={pageTransition}>
            <ApplicantDashboard />
          </motion.div>
        } />
      </Routes>
    </AnimatePresence>
  );
}
