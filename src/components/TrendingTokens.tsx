import React from 'react';
import { motion } from 'framer-motion';

interface TrendingToken {
  rank: number;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  logo: string;
}

const TrendingTokens: React.FC = () => {
  const trendingTokens: TrendingToken[] = [
    {
      rank: 1,
      symbol: 'PUMP',
      name: 'PumpCoin',
      price: 0.5432,
      change24h: 25.67,
      volume24h: 8500000,
      marketCap: 125000000,
      logo: '🚀',
    },
    {
      rank: 2,
      symbol: 'MOON',
      name: 'MoonShot',
      price: 0.1234,
      change24h: 18.43,
      volume24h: 5200000,
      marketCap: 89000000,
      logo: '🌙',
    },
    {
      rank: 3,
      symbol: 'DOGE',
      name: 'DogeCoin',
      price: 0.2876,
      change24h: 15.21,
      volume24h: 12000000,
      marketCap: 156000000,
      logo: '🐕',
    },
    {
      rank: 4,
      symbol: 'PEPE',
      name: 'PepeCoin',
      price: 0.0876,
      change24h: 12.89,
      volume24h: 7800000,
      marketCap: 98000000,
      logo: '🐸',
    },
    {
      rank: 5,
      symbol: 'BONK',
      name: 'BonkCoin',
      price: 0.3421,
      change24h: 11.34,
      volume24h: 4500000,
      marketCap: 67000000,
      logo: '💥',
    },
    {
      rank: 6,
      symbol: 'WIF',
      name: 'DogWifHat',
      price: 0.1987,
      change24h: 9.76,
      volume24h: 3200000,
      marketCap: 45000000,
      logo: '🐶',
    },
    {
      rank: 7,
      symbol: 'FLOKI',
      name: 'FlokiInu',
      price: 0.0654,
      change24h: 8.45,
      volume24h: 2800000,
      marketCap: 38000000,
      logo: '🔥',
    },
    {
      rank: 8,
      symbol: 'SHIB',
      name: 'ShibaInu',
      price: 0.0432,
      change24h: 7.23,
      volume24h: 2100000,
      marketCap: 29000000,
      logo: '🦴',
    },
  ];

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-400 glow-text';
    if (rank === 2) return 'text-gray-300';
    if (rank === 3) return 'text-orange-400';
    return 'text-gray-400';
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return '👑';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return rank.toString();
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(2)}M`;
    }
    if (num >= 1000) {
      return `$${(num / 1000).toFixed(1)}K`;
    }
    return `$${num.toFixed(4)}`;
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="grid grid-cols-12 gap-4 text-sm text-gray-400 font-medium border-b border-white/10 pb-3">
        <div className="col-span-1">#</div>
        <div className="col-span-3">Token</div>
        <div className="col-span-2 text-right">Price</div>
        <div className="col-span-2 text-right">24h Change</div>
        <div className="col-span-2 text-right">24h Volume</div>
        <div className="col-span-2 text-right">Market Cap</div>
      </div>

      {/* Token List */}
      <div className="space-y-2">
        {trendingTokens.map((token, index) => (
          <motion.div
            key={token.symbol}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.02, 
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
            }}
            className="grid grid-cols-12 gap-4 items-center py-4 px-4 rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] group"
          >
            {/* Rank */}
            <div className={`col-span-1 font-bold text-lg ${getRankColor(token.rank)}`}>
              {token.rank <= 3 ? (
                <span className="text-2xl">{getRankIcon(token.rank)}</span>
              ) : (
                token.rank
              )}
            </div>

            {/* Token Info */}
            <div className="col-span-3 flex items-center space-x-3">
              <div className="text-2xl animate-float">{token.logo}</div>
              <div>
                <div className="font-bold text-white group-hover:text-blue-400 transition-colors">
                  {token.symbol}
                </div>
                <div className="text-sm text-gray-400">{token.name}</div>
              </div>
            </div>

            {/* Price */}
            <div className="col-span-2 text-right font-mono">
              <div className="text-white font-bold">
                ${token.price.toFixed(4)}
              </div>
            </div>

            {/* 24h Change */}
            <div className="col-span-2 text-right">
              <div className={`font-bold flex items-center justify-end space-x-1 ${
                token.change24h > 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                <span>{token.change24h > 0 ? '↗' : '↘'}</span>
                <span>+{token.change24h.toFixed(2)}%</span>
              </div>
            </div>

            {/* 24h Volume */}
            <div className="col-span-2 text-right font-mono">
              <div className="text-gray-300">
                {formatNumber(token.volume24h)}
              </div>
            </div>

            {/* Market Cap */}
            <div className="col-span-2 text-right font-mono">
              <div className="text-gray-300">
                {formatNumber(token.marketCap)}
              </div>
            </div>

            {/* Hover effect indicator */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-r-full origin-left"
            />
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-400">Data updates every 10s</span>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white text-sm font-medium hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300"
          onClick={() => window.open('https://x.com/pumpview_ai_sol', '_blank')}
        >
          View More
        </motion.button>
      </div>
    </div>
  );
};

export default TrendingTokens; 