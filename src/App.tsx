import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { WalletProvider } from './contexts/WalletContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import DemoPage from './pages/DemoPage';
import MatrixBackground from './components/MatrixBackground';

const App: React.FC = () => {
  return (
    <WalletProvider>
      <Router>
        <div className="min-h-screen bg-black relative overflow-hidden">
          <MatrixBackground />
          <Navbar />
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/demo" element={<DemoPage />} />
            </Routes>
          </motion.main>
        </div>
      </Router>
    </WalletProvider>
  );
};

export default App; 