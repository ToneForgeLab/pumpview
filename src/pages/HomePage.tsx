import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const features = [
    {
      title: 'Real-time Data Analytics',
      description: 'Powered by cutting-edge PumpFun data streams, delivering real-time token analysis and comprehensive market intelligence',
      icon: '📊',
    },
    {
      title: 'Advanced Visualization',
      description: 'Sophisticated data visualization technology transforms complex market data into intuitive, actionable insights',
      icon: '📈',
    },
    {
      title: 'Interactive Experience',
      description: 'Seamless user experience with rich interactive features that make data exploration engaging and productive',
      icon: '🎮',
    },
    {
      title: 'AI-Powered Insights',
      description: 'Machine learning algorithms deliver intelligent token trend predictions and strategic investment guidance',
      icon: '🤖',
    },
  ];
  const contractAddress = "Contract address coming soon";

  const handleCopyAddress = () => {
    // Placeholder contract address - will be updated when token launches
    navigator.clipboard.writeText(contractAddress);
    // You can add a toast notification here
  };

  return (
    <div className="min-h-screen pt-20 relative">
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold mb-8 gradient-text glow-text"
          >
            PumpView
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Harness the power of advanced data visualization to unlock deep insights from PumpFun platform token data,
            empowering your investment decisions with comprehensive market intelligence
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link
              to="/demo"
              className="group relative px-12 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.8)] transition-all duration-300 transform hover:scale-105"
            >
              <span className="relative z-10">Explore Demo</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            
            <button
              onClick={() => window.open('https://x.com/pumpview_ai_sol', '_blank')}
              className="px-8 py-4 border border-blue-500/50 rounded-xl text-blue-400 font-medium hover:bg-blue-500/10 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-300"
            >
              Follow Updates
            </button>
          </motion.div>
        </div>

        {/* Floating Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -100, 0],
              y: [0, 100, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 cyber-grid">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text"
          >
            Core Features
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass-effect rounded-2xl p-8 text-center group hover:neon-border transition-all duration-300"
              >
                <div className="text-4xl mb-6 animate-float">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-4 text-blue-400 group-hover:glow-text transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Information Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass-effect rounded-3xl p-12 neon-border"
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">Demo Experience</h3>
              <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
                Our current demo showcases static data samples to demonstrate PumpView's powerful analytical capabilities. 
                This preview gives you a glimpse of the comprehensive insights and visualizations available on our platform.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                  <h4 className="text-2xl font-bold text-yellow-400">$PumpView Token Launch</h4>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">
                  We're preparing to launch the <span className="text-blue-400 font-semibold">$PumpView</span> token! 
                  Once live, token holders will gain access to premium features, real-time data streams, 
                  advanced analytics tools, and exclusive market insights.
                </p>
                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-6 border border-blue-500/30">
                  <h5 className="text-lg font-semibold text-blue-400 mb-3">Premium Features for Token Holders:</h5>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center space-x-2">
                      <span className="text-green-400">✓</span>
                      <span>Real-time data access & live market feeds</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-green-400">✓</span>
                      <span>Advanced AI-powered prediction models</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-green-400">✓</span>
                      <span>Custom alerts & portfolio tracking</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-green-400">✓</span>
                      <span>Priority support & early feature access</span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-6"
              >
                <div className="bg-black/50 rounded-2xl p-8 border border-gray-700">
                  <h4 className="text-xl font-bold text-purple-400 mb-4 flex items-center">
                    <span className="mr-3">🔗</span>
                    Contract Address
                  </h4>
                  <div className="space-y-4">
                    <div className="bg-gray-800/80 rounded-xl p-4 border border-gray-600">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">$PumpView Token Contract</span>
                        <button
                          onClick={handleCopyAddress}
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                          aria-label="Copy contract address"
                        >
                          📋
                        </button>
                      </div>
                      <div className="mt-2 p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                        <code className="text-yellow-400 text-sm font-mono">
                          {contractAddress}
                        </code>
                      </div>
                    </div>
                    <div className="text-center">
                      <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 text-yellow-400 text-sm font-medium">
                        <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></span>
                        Coming Soon
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/30">
                  <h5 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-3">
                    Stay Tuned! 🚀
                  </h5>
                  <p className="text-gray-300">
                    Join our community to be the first to know about the token launch and gain early access to premium features.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass-effect rounded-3xl p-12 text-center neon-border"
          >
            <h3 className="text-3xl font-bold mb-12 gradient-text">Platform Analytics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-4xl font-bold text-blue-400 glow-text"
                >
                  50,000+
                </motion.div>
                <p className="text-gray-300">Tokens Analyzed</p>
              </div>
              <div className="space-y-2">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-4xl font-bold text-purple-400 glow-text"
                >
                  10M+
                </motion.div>
                <p className="text-gray-300">Data Points Processed</p>
              </div>
              <div className="space-y-2">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-4xl font-bold text-pink-400 glow-text"
                >
                  99.9%
                </motion.div>
                <p className="text-gray-300">Data Accuracy</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-8 gradient-text"
          >
            Ready to Revolutionize Your Data Analysis?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 mb-12"
          >
            Experience the cutting-edge capabilities of PumpView and embark on your advanced data analysis journey today
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              to="/demo"
              className="inline-block px-16 py-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl text-white font-bold text-xl hover:shadow-[0_0_40px_rgba(59,130,246,0.8)] transition-all duration-300 transform hover:scale-105 animate-pulse-glow"
            >
              Start Exploring
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 