import React from 'react';
import { motion } from 'framer-motion';

interface StatCard {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: string;
  color: string;
}

const StatsCards: React.FC = () => {
  const stats: StatCard[] = [
    {
      title: 'Total Market Cap',
      value: '$2.4B',
      change: '+12.5%',
      isPositive: true,
      icon: '💰',
      color: 'blue',
    },
    {
      title: '24h Volume',
      value: '$456M',
      change: '+8.3%',
      isPositive: true,
      icon: '📊',
      color: 'purple',
    },
    {
      title: 'Active Tokens',
      value: '1,234',
      change: '+23',
      isPositive: true,
      icon: '🚀',
      color: 'pink',
    },
    {
      title: 'New Tokens',
      value: '89',
      change: '-5.2%',
      isPositive: false,
      icon: '✨',
      color: 'green',
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'text-blue-400 border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]',
      purple: 'text-purple-400 border-purple-500/30 hover:shadow-[0_0_20px_rgba(147,51,234,0.3)]',
      pink: 'text-pink-400 border-pink-500/30 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)]',
      green: 'text-green-400 border-green-500/30 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]',
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          whileHover={{ y: -10, scale: 1.02 }}
          className={`glass-effect rounded-2xl p-6 border ${getColorClasses(stat.color)} transition-all duration-300 group`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="text-3xl animate-float">{stat.icon}</div>
            <div
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                stat.isPositive
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-red-500/20 text-red-400'
              }`}
            >
              {stat.change}
            </div>
          </div>
          
          <h3 className="text-gray-400 text-sm font-medium mb-2">
            {stat.title}
          </h3>
          
          <div className={`text-3xl font-bold ${getColorClasses(stat.color).split(' ')[0]} group-hover:glow-text transition-all duration-300`}>
            {stat.value}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCards; 