import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';
import AnimatedRoutes from './components/AnimatedRoutes';

function App() {
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic'
    });
  }, []);

  const handleFinishLoading = () => {
    setLoading(false);
    setShowConfetti(true);
  };

  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col transition-all">
        {loading && <Loader onFinish={handleFinishLoading} />}
        
        {showConfetti && (
          <>
            <div className="fixed inset-0 z-[200] pointer-events-none">
              <Confetti 
                width={width} 
                height={height} 
                numberOfPieces={500} 
                recycle={false} 
                gravity={0.2}
                initialVelocityX={30}
                initialVelocityY={45}
                confettiSource={{ x: 0, y: height - 100, w: 0, h: 0 }}
              />
            </div>
            <div className="fixed inset-0 z-[200] pointer-events-none">
              <Confetti 
                width={width} 
                height={height} 
                numberOfPieces={500} 
                recycle={false} 
                gravity={0.2}
                initialVelocityX={30}
                initialVelocityY={45}
                confettiSource={{ x: width, y: height - 100, w: 0, h: 0 }}
              />
            </div>
          </>
        )}

        <Navbar />
        <main className="flex-grow">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
