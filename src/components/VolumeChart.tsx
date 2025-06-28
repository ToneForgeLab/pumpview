import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const VolumeChart: React.FC = () => {
  // Mock data for demonstration
  const generateMockData = () => {
    const labels = [];
    const volumes = [];
    
    for (let i = 23; i >= 0; i--) {
      const date = new Date();
      date.setHours(date.getHours() - i);
      labels.push(date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }));
      
      // Generate realistic volume data
      const baseVolume = 500000;
      const volatility = 300000;
      const hourlyFactor = Math.sin((i / 24) * Math.PI * 2) * 0.3 + 1; // Daily pattern
      const randomFactor = Math.random() * volatility;
      volumes.push((baseVolume * hourlyFactor + randomFactor));
    }
    
    return { labels, volumes };
  };

  const { labels, volumes } = generateMockData();

  const data = {
    labels,
    datasets: [
      {
        label: 'Volume ($)',
        data: volumes,
        backgroundColor: volumes.map((_, index) => {
          const opacity = 0.4 + (index / volumes.length) * 0.6;
          return `rgba(147, 51, 234, ${opacity})`;
        }),
        borderColor: 'rgb(147, 51, 234)',
        borderWidth: 2,
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: 'rgb(147, 51, 234)',
        borderWidth: 1,
        cornerRadius: 12,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            const value = context.parsed.y;
            return `Volume: $${(value / 1000000).toFixed(2)}M`;
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          color: 'rgba(147, 51, 234, 0.1)',
          borderColor: 'rgba(147, 51, 234, 0.2)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.6)',
          font: {
            family: 'JetBrains Mono',
            size: 10,
          },
          maxTicksLimit: 8,
        },
      },
      y: {
        display: true,
        grid: {
          color: 'rgba(147, 51, 234, 0.1)',
          borderColor: 'rgba(147, 51, 234, 0.2)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.6)',
          font: {
            family: 'JetBrains Mono',
            size: 11,
          },
          callback: function(value: any) {
            return `${(value / 1000000).toFixed(1)}M`;
          },
        },
      },
    },
    animation: {
      duration: 1500,
      easing: 'easeInOutQuart' as const,
    },
  };

  const totalVolume = volumes.reduce((sum, vol) => sum + vol, 0);
  const avgVolume = totalVolume / volumes.length;
  const currentVolume = volumes[volumes.length - 1];

  return (
    <div className="relative">
      <div className="h-80 relative">
        <Bar data={data} options={options} />
      </div>
      
      {/* Volume stats */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-sm text-gray-400 mb-1">Current Volume</div>
          <div className="text-xl font-bold text-purple-400 glow-text">
            ${(currentVolume / 1000000).toFixed(2)}M
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-sm text-gray-400 mb-1">24h Average</div>
          <div className="text-xl font-bold text-purple-400">
            ${(avgVolume / 1000000).toFixed(2)}M
          </div>
        </div>
      </div>
      
      {/* Volume indicator */}
      <div className="mt-4 flex items-center justify-center space-x-2">
        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
        <span className="text-sm text-gray-400">Real-time Update</span>
      </div>
    </div>
  );
};

export default VolumeChart; 