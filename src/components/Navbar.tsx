import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useWallet } from '../contexts/WalletContext';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showWalletMenu, setShowWalletMenu] = useState(false);
  const { connected, publicKey, walletName, connecting, connect, disconnect, isSignedIn } = useWallet();
  const walletMenuRef = useRef<HTMLDivElement>(null);

  // 点击外部关闭钱包菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (walletMenuRef.current && !walletMenuRef.current.contains(event.target as Node)) {
        setShowWalletMenu(false);
      }
    };

    if (showWalletMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showWalletMenu]);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleTwitterClick = () => {
    window.open('https://x.com/pumpview_ai_sol', '_blank', 'noopener,noreferrer');
  };

  const handleWalletAction = () => {
    if (connected) {
      setShowWalletMenu(!showWalletMenu);
    } else {
      connect();
    }
  };



  const handleDisconnect = () => {
    disconnect();
    setShowWalletMenu(false);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const getWalletIcon = () => {
    switch (walletName) {
      case 'Phantom':
        return '👻';
      case 'Solflare':
        return '🔥';
      case 'Backpack':
        return '🎒';
      default:
        return '🌟';
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-blue-500/20"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="text-xl font-bold gradient-text glow-text">PumpView</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`relative px-4 py-2 transition-all duration-300 ${
                location.pathname === '/' 
                  ? 'text-blue-400 glow-text' 
                  : 'text-gray-300 hover:text-blue-400'
              }`}
            >
              Home
              {location.pathname === '/' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                />
              )}
            </Link>
            <Link
              to="/demo"
              className={`relative px-4 py-2 transition-all duration-300 ${
                location.pathname === '/demo' 
                  ? 'text-blue-400 glow-text' 
                  : 'text-gray-300 hover:text-blue-400'
              }`}
            >
              Demo
              {location.pathname === '/demo' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                />
              )}
            </Link>
            <motion.button
              onClick={handleTwitterClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-gradient-to-r from-gray-800 to-black rounded-lg text-white font-bold hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 border border-gray-600/50 hover:border-white/30"
            >
              𝕏
            </motion.button>
            
            <div className="relative" ref={walletMenuRef}>
              <motion.button
                onClick={handleWalletAction}
                disabled={connecting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                  connected
                    ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white hover:shadow-[0_0_20px_rgba(147,51,234,0.6)]'
                    : 'bg-gradient-to-r from-orange-500 to-yellow-600 text-white hover:shadow-[0_0_20px_rgba(249,115,22,0.6)]'
                } ${connecting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {connecting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Connecting...</span>
                  </div>
                ) : connected ? (
                  <div className="flex items-center space-x-2">
                    <span>{getWalletIcon()}</span>
                    <div className={`w-2 h-2 rounded-full ${isSignedIn ? 'bg-green-300' : 'bg-yellow-300'}`}></div>
                    <span>{formatAddress(publicKey!)}</span>
                    <span className="ml-1">▼</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>🌟</span>
                    <span>Connect Wallet</span>
                  </div>
                )}
              </motion.button>

              {/* 钱包下拉菜单 */}
              {showWalletMenu && connected && (
                                 <motion.div
                   initial={{ opacity: 0, y: -10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -10 }}
                   className="absolute right-0 mt-2 w-64 bg-black/90 backdrop-blur-lg border border-purple-500/30 rounded-xl shadow-xl z-50"
                 >
                   <div className="p-4 border-b border-gray-700/50">
                     <div className="flex items-center space-x-3 mb-2">
                       <span className="text-2xl">{getWalletIcon()}</span>
                       <div>
                         <p className="text-purple-400 font-semibold">{walletName}</p>
                         <p className="text-gray-400 text-sm">Connected</p>
                       </div>
                     </div>
                    <div className="bg-gray-800/80 rounded-lg p-2">
                      <p className="text-gray-300 text-sm font-mono">{publicKey}</p>
                    </div>
                  </div>
                  
                  <div className="p-2">
                    <div className="px-4 py-2 border-b border-gray-700/50 mb-2">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${isSignedIn ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
                        <span className={`text-sm font-medium ${isSignedIn ? 'text-green-400' : 'text-yellow-400'}`}>
                          {isSignedIn ? 'Signed In' : 'Connected'}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={handleDisconnect}
                      className="w-full px-4 py-2 text-left hover:bg-red-500/20 rounded-lg transition-colors text-red-400 hover:text-red-300"
                    >
                      <div className="flex items-center space-x-2">
                        <span>🔌</span>
                        <span>Disconnect</span>
                      </div>
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={handleToggleMenu}
            className="md:hidden p-2 text-gray-300 hover:text-blue-400 transition-colors"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block w-5 h-0.5 bg-current transition-transform ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`} />
              <span className={`block w-5 h-0.5 bg-current my-1 transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-current transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4 border-t border-blue-500/20"
          >
            <div className="flex flex-col space-y-4 pt-4">
              <Link
                to="/"
                onClick={handleToggleMenu}
                className={`px-4 py-2 transition-all duration-300 ${
                  location.pathname === '/' 
                    ? 'text-blue-400 glow-text' 
                    : 'text-gray-300 hover:text-blue-400'
                }`}
              >
                Home
              </Link>
              <Link
                to="/demo"
                onClick={handleToggleMenu}
                className={`px-4 py-2 transition-all duration-300 ${
                  location.pathname === '/demo' 
                    ? 'text-blue-400 glow-text' 
                    : 'text-gray-300 hover:text-blue-400'
                }`}
              >
                Demo
              </Link>
              <button
                onClick={handleTwitterClick}
                className="px-6 py-2 mx-4 bg-gradient-to-r from-gray-800 to-black rounded-lg text-white font-bold hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 border border-gray-600/50 hover:border-white/30"
              >
                𝕏
              </button>
              
              <div className="relative mx-4">
                <button
                  onClick={handleWalletAction}
                  disabled={connecting}
                  className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 w-full ${
                    connected
                      ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white hover:shadow-[0_0_20px_rgba(147,51,234,0.6)]'
                      : 'bg-gradient-to-r from-orange-500 to-yellow-600 text-white hover:shadow-[0_0_20px_rgba(249,115,22,0.6)]'
                  } ${connecting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {connecting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>连接中...</span>
                    </div>
                  ) : connected ? (
                    <div className="flex items-center justify-center space-x-2">
                      <span>{getWalletIcon()}</span>
                      <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                      <span>{formatAddress(publicKey!)}</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <span>🌟</span>
                      <span>连接钱包</span>
                    </div>
                  )}
                </button>

                {/* 移动端钱包菜单 */}
                {showWalletMenu && connected && (
                  <div className="absolute left-0 right-0 mt-2 bg-black/90 backdrop-blur-lg border border-purple-500/30 rounded-xl shadow-xl z-50">
                                         <div className="p-4 border-b border-gray-700/50">
                       <div className="flex items-center space-x-3 mb-2">
                         <span className="text-2xl">{getWalletIcon()}</span>
                         <div>
                           <p className="text-purple-400 font-semibold">{walletName}</p>
                           <p className="text-gray-400 text-sm">Connected</p>
                         </div>
                       </div>
                      <div className="bg-gray-800/80 rounded-lg p-2">
                        <p className="text-gray-300 text-xs font-mono break-all">{publicKey}</p>
                      </div>
                    </div>
                    
                    <div className="p-2 space-y-1">
                      <div className="px-4 py-2 border-b border-gray-700/50 mb-2">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${isSignedIn ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
                          <span className={`text-sm font-medium ${isSignedIn ? 'text-green-400' : 'text-yellow-400'}`}>
                            {isSignedIn ? 'Signed In' : 'Connected'}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={handleDisconnect}
                        className="w-full px-4 py-2 text-left hover:bg-red-500/20 rounded-lg transition-colors text-red-400"
                      >
                        <div className="flex items-center space-x-2">
                          <span>🔌</span>
                          <span>Disconnect</span>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar; 