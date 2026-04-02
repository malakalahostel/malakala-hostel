import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';
import AnimatedRoutes from './components/AnimatedRoutes';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic'
    });
  }, []);

  const handleFinishLoading = () => {
    setLoading(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col transition-all">
        {loading && <Loader onFinish={handleFinishLoading} />}
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
