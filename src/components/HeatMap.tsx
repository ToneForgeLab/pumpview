import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface TokenData {
  symbol: string;
  name: string;
  change: number;
  volume: number;
  marketCap: number;
}

const HeatMap: React.FC = () => {
  const tokenData: TokenData[] = useMemo(() => [
    { symbol: 'PUMP', name: 'PumpCoin', change: 15.6, volume: 2500000, marketCap: 45000000 },
    { symbol: 'MOON', name: 'MoonShot', change: -8.3, volume: 1800000, marketCap: 32000000 },
    { symbol: 'DOGE', name: 'DogeCoin', change: 12.1, volume: 3200000, marketCap: 78000000 },
    { symbol: 'SHIB', name: 'ShibaInu', change: -5.7, volume: 1500000, marketCap: 25000000 },
    { symbol: 'PEPE', name: 'PepeCoin', change: 23.4, volume: 4100000, marketCap: 92000000 },
    { symbol: 'FLOKI', name: 'FlokiInu', change: 7.8, volume: 980000, marketCap: 18000000 },
    { symbol: 'SAFE', name: 'SafeMoon', change: -12.5, volume: 750000, marketCap: 15000000 },
    { symbol: 'BONK', name: 'BonkCoin', change: 18.9, volume: 2800000, marketCap: 55000000 },
    { symbol: 'WIF', name: 'DogWifHat', change: -3.2, volume: 1200000, marketCap: 22000000 },
    { symbol: 'MEME', name: 'MemeCoin', change: 9.4, volume: 1600000, marketCap: 38000000 },
    { symbol: 'WOJAK', name: 'WojakCoin', change: -6.8, volume: 890000, marketCap: 16000000 },
    { symbol: 'APE', name: 'ApeCoin', change: 14.2, volume: 3500000, marketCap: 85000000 },
  ], []);

  const getChangeColor = (change: number) => {
    if (change > 15) return 'bg-green-500';
    if (change > 5) return 'bg-green-400';
    if (change > 0) return 'bg-green-300';
    if (change > -5) return 'bg-red-300';
    if (change > -10) return 'bg-red-400';
    return 'bg-red-500';
  };

  const getChangeIntensity = (change: number) => {
    const intensity = Math.min(Math.abs(change) / 25, 1);
    return intensity;
  };

  const getTextColor = (change: number) => {
    return Math.abs(change) > 10 ? 'text-white' : 'text-gray-900';
  };

  const getBoxSize = (marketCap: number) => {
    const maxCap = Math.max(...tokenData.map(t => t.marketCap));
    const minCap = Math.min(...tokenData.map(t => t.marketCap));
    const minSize = 100;
    const maxSize = 180;
    const ratio = (marketCap - minCap) / (maxCap - minCap);
    return minSize + (maxSize - minSize) * ratio;
  };

  // Sort tokens by market cap for better visual arrangement
  const sortedTokenData = useMemo(() => 
    [...tokenData].sort((a, b) => b.marketCap - a.marketCap), 
    [tokenData]
  );

  return (
    <div className="relative overflow-hidden rounded-2xl">
      {/* Flex container instead of grid */}
      <div className="flex flex-wrap gap-3 p-4 justify-center items-end">
        {sortedTokenData.map((token, index) => {
          const size = getBoxSize(token.marketCap);
          const intensity = getChangeIntensity(token.change);
          
          return (
            <motion.div
              key={token.symbol}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              whileHover={{ 
                scale: 1.1, 
                zIndex: 10,
                transition: { duration: 0.2 }
              }}
              className={`
                relative rounded-lg p-3 cursor-pointer flex flex-col justify-between
                ${getChangeColor(token.change)}
                ${getTextColor(token.change)}
                hover:shadow-2xl hover:shadow-current/20
                transition-all duration-300
                group
              `}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                opacity: 0.7 + intensity * 0.3,
              }}
            >
              {/* Token symbol */}
              <div className="font-bold text-sm lg:text-lg mb-1 group-hover:scale-110 transition-transform duration-300 text-center">
                {token.symbol}
              </div>
              
              {/* Change percentage */}
              <div className="font-bold text-lg lg:text-2xl mb-1 glow-text text-center">
                {token.change > 0 ? '+' : ''}{token.change.toFixed(1)}%
              </div>
              
              {/* Market cap */}
              <div className="text-xs lg:text-sm opacity-80 text-center">
                ${(token.marketCap / 1000000).toFixed(1)}M
              </div>
              
              {/* Hover tooltip */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute left-1/2 -translate-x-1/2 -bottom-20 z-20 bg-black/90 backdrop-blur-sm rounded-lg p-3 border border-white/10 whitespace-nowrap"
              >
                <div className="text-white text-sm space-y-1">
                  <div className="font-bold">{token.name}</div>
                  <div>Volume: ${(token.volume / 1000000).toFixed(2)}M</div>
                  <div>Market Cap: ${(token.marketCap / 1000000).toFixed(1)}M</div>
                  <div className={`font-bold ${token.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {token.change > 0 ? '+' : ''}{token.change.toFixed(2)}%
                  </div>
                </div>
              </motion.div>
              
              {/* Pulse animation for high changes */}
              {Math.abs(token.change) > 15 && (
                <div className="absolute inset-0 rounded-lg animate-pulse-glow pointer-events-none" />
              )}
            </motion.div>
          );
        })}
      </div>
      
      {/* Legend */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
          <span>Color Intensity = Change Magnitude</span>
          <span>Size = Market Cap</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-xs">Decrease</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-xs">Increase</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="text-xs">Live Update</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeatMap; 