import React from 'react';
import { motion } from 'framer-motion';
import TokenChart from '../components/TokenChart';
import VolumeChart from '../components/VolumeChart';
import HeatMap from '../components/HeatMap';
import StatsCards from '../components/StatsCards';
import TrendingTokens from '../components/TrendingTokens';
import AIAgent from '../components/AIAgent';

const DemoPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-20 relative">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text glow-text">
            Data Analytics Demo
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Explore real-time data visualization of PumpFun platform, gain insights into token market dynamics and trend analysis
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <StatsCards />
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Token Price Chart */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-effect rounded-3xl p-8 neon-border hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-300"
          >
            <h3 className="text-2xl font-bold mb-6 text-blue-400 glow-text">
              Token Price Trends
            </h3>
            <TokenChart />
          </motion.div>

          {/* Volume Chart */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="glass-effect rounded-3xl p-8 neon-border hover:shadow-[0_0_30px_rgba(147,51,234,0.3)] transition-all duration-300"
          >
            <h3 className="text-2xl font-bold mb-6 text-purple-400 glow-text">
              Volume Analysis
            </h3>
            <VolumeChart />
          </motion.div>
        </div>

        {/* AI Agent */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-12"
        >
          <AIAgent />
        </motion.div>

        {/* Heat Map */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="glass-effect rounded-3xl p-8 neon-border mb-12 hover:shadow-[0_0_30px_rgba(236,72,153,0.3)] transition-all duration-300"
        >
          <h3 className="text-2xl font-bold mb-6 text-pink-400 glow-text">
            Market Heatmap
          </h3>
          <HeatMap />
        </motion.div>

        {/* Trending Tokens */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="glass-effect rounded-3xl p-8 neon-border hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] transition-all duration-300"
        >
          <h3 className="text-2xl font-bold mb-6 text-green-400 glow-text">
            Trending Tokens
          </h3>
          <TrendingTokens />
        </motion.div>

        {/* Twitter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="text-center mt-16"
        >
          <div className="glass-effect rounded-3xl p-12 neon-border">
            <h3 className="text-3xl font-bold mb-6 gradient-text">
              Want More Data Insights?
            </h3>
            <p className="text-xl text-gray-300 mb-8">
              Follow our Twitter for the latest market analysis and platform updates
            </p>
            <motion.button
              onClick={() => window.open('https://x.com/pumpview_ai_sol', '_blank')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.8)] transition-all duration-300 animate-pulse-glow"
            >
              Follow @PumpView
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DemoPage; 