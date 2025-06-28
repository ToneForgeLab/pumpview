import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Transaction {
  id: string;
  type: 'BUY' | 'SELL';
  token: string;
  amount: number;
  price: number;
  profit: number;
  timestamp: number;
  x: number;
  y: number;
}

interface AgentStats {
  totalProfit: number;
  winRate: number;
  totalTrades: number;
  activeAgents: number;
  avgReturn: number;
}

const AIAgent: React.FC = () => {
  const [agentStats, setAgentStats] = useState<AgentStats>({
    totalProfit: 125680.50,
    winRate: 78.5,
    totalTrades: 1247,
    activeAgents: 12,
    avgReturn: 15.8,
  });

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isTrading, setIsTrading] = useState(true);

  // Generate random transaction
  const generateTransaction = (): Transaction => {
    const tokens = ['PUMP', 'MOON', 'DOGE', 'PEPE', 'BONK', 'WIF', 'FLOKI'];
    const types: ('BUY' | 'SELL')[] = ['BUY', 'SELL'];
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      type: types[Math.floor(Math.random() * types.length)],
      token: tokens[Math.floor(Math.random() * tokens.length)],
      amount: Math.random() * 1000 + 100,
      price: Math.random() * 10 + 0.1,
      profit: (Math.random() - 0.3) * 500, // bias towards profit
      timestamp: Date.now(),
      x: Math.random() * 100,
      y: Math.random() * 100,
    };
  };

  // Update stats periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setAgentStats(prev => ({
        totalProfit: prev.totalProfit + (Math.random() - 0.4) * 100,
        winRate: Math.max(70, Math.min(85, prev.winRate + (Math.random() - 0.5) * 0.5)),
        totalTrades: prev.totalTrades + Math.floor(Math.random() * 3),
        activeAgents: Math.max(8, Math.min(15, prev.activeAgents + Math.floor((Math.random() - 0.5) * 2))),
        avgReturn: Math.max(12, Math.min(20, prev.avgReturn + (Math.random() - 0.5) * 0.3)),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Generate transactions
  useEffect(() => {
    if (!isTrading) return;

    const interval = setInterval(() => {
      const newTransaction = generateTransaction();
      setTransactions(prev => {
        const updated = [...prev, newTransaction];
        return updated.slice(-6); // Keep only last 6 transactions
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [isTrading]);

  const handleToggleTrading = () => {
    setIsTrading(!isTrading);
  };

  return (
    <div className="glass-effect rounded-3xl p-8 neon-border hover:shadow-[0_0_30px_rgba(0,255,136,0.3)] transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold text-green-400 glow-text">
          AI Trading Agent
        </h3>
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full ${isTrading ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
          <span className="text-sm text-gray-400">
            {isTrading ? 'Active Trading' : 'Paused'}
          </span>
          <motion.button
            onClick={handleToggleTrading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg text-white text-sm font-medium hover:shadow-[0_0_15px_rgba(0,255,136,0.4)] transition-all duration-300"
          >
            {isTrading ? 'Pause' : 'Start'}
          </motion.button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <motion.div
          whileHover={{ y: -5, scale: 1.02 }}
          className="bg-white/5 rounded-2xl p-4 border border-green-500/30 hover:border-green-400/50 transition-all duration-300"
        >
          <div className="text-sm text-gray-400 mb-1">Total Profit</div>
          <div className="text-xl font-bold text-green-400 glow-text">
            ${agentStats.totalProfit.toFixed(2)}
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5, scale: 1.02 }}
          className="bg-white/5 rounded-2xl p-4 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300"
        >
          <div className="text-sm text-gray-400 mb-1">Win Rate</div>
          <div className="text-xl font-bold text-blue-400 glow-text">
            {agentStats.winRate.toFixed(1)}%
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5, scale: 1.02 }}
          className="bg-white/5 rounded-2xl p-4 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300"
        >
          <div className="text-sm text-gray-400 mb-1">Total Trades</div>
          <div className="text-xl font-bold text-purple-400 glow-text">
            {agentStats.totalTrades.toLocaleString()}
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5, scale: 1.02 }}
          className="bg-white/5 rounded-2xl p-4 border border-pink-500/30 hover:border-pink-400/50 transition-all duration-300"
        >
          <div className="text-sm text-gray-400 mb-1">Active Agents</div>
          <div className="text-xl font-bold text-pink-400 glow-text">
            {agentStats.activeAgents}
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5, scale: 1.02 }}
          className="bg-white/5 rounded-2xl p-4 border border-yellow-500/30 hover:border-yellow-400/50 transition-all duration-300"
        >
          <div className="text-sm text-gray-400 mb-1">Avg Return</div>
          <div className="text-xl font-bold text-yellow-400 glow-text">
            {agentStats.avgReturn.toFixed(1)}%
          </div>
        </motion.div>
      </div>

      {/* Trading Flow Visualization */}
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-bold text-gray-300">Live Trading Flow</h4>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Real-time</span>
          </div>
        </div>

        {/* Trading Network */}
        <div className="relative h-64 bg-black/20 rounded-2xl border border-white/10 overflow-hidden">
          {/* Network grid */}
          <div className="absolute inset-0 opacity-20">
            <div className="cyber-grid w-full h-full"></div>
          </div>

          {/* Central AI Hub */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,255,136,0.6)]"
          >
            <span className="text-2xl">🤖</span>
          </motion.div>

          {/* Pulsing connections */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 w-1 bg-gradient-to-r from-transparent via-green-400 to-transparent"
              style={{
                height: '120px',
                transformOrigin: 'center top',
                transform: `translate(-50%, -50%) rotate(${i * 60}deg)`,
              }}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}

          {/* Trading nodes */}
          {[...Array(6)].map((_, i) => {
            const angle = (i * 60) * (Math.PI / 180);
            const x = 50 + 35 * Math.cos(angle);
            const y = 50 + 35 * Math.sin(angle);
            
            return (
              <motion.div
                key={i}
                className="absolute w-8 h-8 bg-blue-500/80 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-[0_0_10px_rgba(59,130,246,0.6)]"
                style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
              >
                {i + 1}
              </motion.div>
            );
          })}

          {/* Transaction particles */}
          <AnimatePresence>
            {transactions.map((transaction) => (
              <motion.div
                key={transaction.id}
                initial={{ 
                  opacity: 0, 
                  scale: 0, 
                  x: '50%', 
                  y: '50%' 
                }}
                animate={{ 
                  opacity: [0, 1, 1, 0], 
                  scale: [0, 1, 1, 0],
                  x: `${transaction.x}%`,
                  y: `${transaction.y}%`,
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 3 }}
                className={`absolute w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-lg ${
                  transaction.type === 'BUY' 
                    ? 'bg-green-500 text-white shadow-[0_0_10px_rgba(34,197,94,0.6)]' 
                    : 'bg-red-500 text-white shadow-[0_0_10px_rgba(239,68,68,0.6)]'
                }`}
                style={{ transform: 'translate(-50%, -50%)' }}
              >
                {transaction.type === 'BUY' ? '↗' : '↘'}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Recent Transactions */}
        <div className="mt-6">
          <h4 className="text-lg font-bold text-gray-300 mb-4">Recent Transactions</h4>
          <div className="space-y-2">
            <AnimatePresence>
              {transactions.slice(-3).reverse().map((transaction, index) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center justify-between bg-white/5 rounded-xl p-3 border border-white/10"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      transaction.type === 'BUY' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {transaction.type === 'BUY' ? '↗' : '↘'}
                    </div>
                    <div>
                      <div className="font-bold text-white">{transaction.type} {transaction.token}</div>
                      <div className="text-sm text-gray-400">
                        {transaction.amount.toFixed(0)} @ ${transaction.price.toFixed(4)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold ${
                      transaction.profit > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {transaction.profit > 0 ? '+' : ''}${transaction.profit.toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-400">
                      {new Date(transaction.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAgent; 