import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const TokenChart: React.FC = () => {
  // Mock data for demonstration
  const generateMockData = () => {
    const labels = [];
    const prices = [];
    const volumes = [];
    
    for (let i = 30; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
      
      // Generate realistic price data with some volatility
      const basePrice = 0.5;
      const volatility = 0.1;
      const trend = (30 - i) * 0.01; // Slight upward trend
      const randomFactor = (Math.random() - 0.5) * volatility;
      prices.push(basePrice + trend + randomFactor);
      
      volumes.push(Math.random() * 1000000 + 500000);
    }
    
    return { labels, prices, volumes };
  };

  const { labels, prices, volumes } = generateMockData();

  const data = {
    labels,
    datasets: [
      {
        label: 'PUMP Token Price ($)',
        data: prices,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 3,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: 'rgba(255, 255, 255, 0.8)',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 8,
        fill: true,
        tension: 0.4,
        shadowOffsetX: 0,
        shadowOffsetY: 10,
        shadowBlur: 20,
        shadowColor: 'rgba(59, 130, 246, 0.3)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
        cornerRadius: 12,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            return `Price: $${context.parsed.y.toFixed(4)}`;
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          color: 'rgba(59, 130, 246, 0.1)',
          borderColor: 'rgba(59, 130, 246, 0.2)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.6)',
          font: {
            family: 'JetBrains Mono',
            size: 11,
          },
        },
      },
      y: {
        display: true,
        grid: {
          color: 'rgba(59, 130, 246, 0.1)',
          borderColor: 'rgba(59, 130, 246, 0.2)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.6)',
          font: {
            family: 'JetBrains Mono',
            size: 11,
          },
          callback: function(value: any) {
            return `$${value.toFixed(3)}`;
          },
        },
      },
    },
    elements: {
      point: {
        hoverBackgroundColor: 'rgb(59, 130, 246)',
        hoverBorderColor: 'rgba(255, 255, 255, 1)',
        hoverBorderWidth: 3,
      },
    },
    animation: {
      duration: 2000,
      easing: 'easeInOutCubic' as const,
    },
  };

  return (
    <div className="relative">
      <div className="h-80 relative">
        <Line data={data} options={options} />
      </div>
      
      {/* Price indicator */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-400">Real-time Price</span>
          </div>
          <div className="text-2xl font-bold text-blue-400 glow-text">
            ${prices[prices.length - 1]?.toFixed(4)}
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-sm text-gray-400">24h Change</div>
          <div className="text-green-400 font-bold">+12.35%</div>
        </div>
      </div>
    </div>
  );
};

export default TokenChart; 