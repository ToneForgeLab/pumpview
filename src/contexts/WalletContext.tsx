import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PublicKey } from '@solana/web3.js';

interface WalletContextType {
  connected: boolean;
  publicKey: string | null;
  walletName: string | null;
  connecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  signMessage: (message: string) => Promise<string | null>;
  isSignedIn: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

interface WalletProviderProps {
  children: ReactNode;
}

// Solana钱包检测函数
const getWalletProvider = () => {
  if (typeof window === 'undefined') return null;
  
  // 检测Phantom钱包
  if ((window as any).phantom?.solana?.isPhantom) {
    return {
      provider: (window as any).phantom.solana,
      name: 'Phantom'
    };
  }
  
  // 检测Solflare钱包
  if ((window as any).solflare?.isSolflare) {
    return {
      provider: (window as any).solflare,
      name: 'Solflare'
    };
  }
  
  // 检测Backpack钱包
  if ((window as any).backpack?.isBackpack) {
    return {
      provider: (window as any).backpack,
      name: 'Backpack'
    };
  }
  
  // 检测通用Solana钱包
  if ((window as any).solana) {
    return {
      provider: (window as any).solana,
      name: 'Solana Wallet'
    };
  }
  
  return null;
};

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [walletName, setWalletName] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  // Check if wallet is already connected
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const wallet = getWalletProvider();
        if (wallet) {
          const response = await wallet.provider.connect({ onlyIfTrusted: true });
          if (response.publicKey) {
            setConnected(true);
            setPublicKey(response.publicKey.toString());
            setWalletName(wallet.name);
          }
        }
      } catch (error) {
        console.log('Wallet not auto-connected');
      }
    };
    
    checkConnection();
  }, []);

  const connect = async () => {
    if (connecting) return;
    
    setConnecting(true);
    try {
      const wallet = getWalletProvider();
      
      if (wallet) {
        const response = await wallet.provider.connect();
        setConnected(true);
        setPublicKey(response.publicKey.toString());
        setWalletName(wallet.name);
        
        console.log('Wallet connected successfully:', {
          publicKey: response.publicKey.toString(),
          walletName: wallet.name
        });

        // Automatically trigger sign-in after successful connection
        try {
          const message = `PumpView Sign-In\nTimestamp: ${new Date().toISOString()}\nWallet: ${response.publicKey.toString()}`;
          const encodedMessage = new TextEncoder().encode(message);
          const signedMessage = await wallet.provider.signMessage(encodedMessage);
          
          if (signedMessage.signature) {
            setIsSignedIn(true);
            const signature = btoa(String.fromCharCode(...signedMessage.signature));
            console.log('Auto sign-in successful:', { message, signature, publicKey: response.publicKey.toString() });
            alert(`Welcome to PumpView!\nWallet: ${wallet.name}\nAddress: ${response.publicKey.toString().slice(0, 4)}...${response.publicKey.toString().slice(-4)}`);
          }
        } catch (signError) {
          console.error('Auto sign-in failed:', signError);
          alert('Wallet connected but sign-in failed. Please try again.');
        }
      } else {
        // If no wallet is detected, guide user to install
        const userChoice = window.confirm(
          'No Solana wallet detected. Would you like to install Phantom wallet?'
        );
        if (userChoice) {
          window.open('https://phantom.app/', '_blank');
        }
      }
    } catch (error: any) {
      console.error('Wallet connection failed:', error);
      if (error.code === 4001) {
        alert('User rejected the connection request');
      } else {
        alert('Connection failed, please try again');
      }
    } finally {
      setConnecting(false);
    }
  };

  const disconnect = async () => {
    try {
      const wallet = getWalletProvider();
      if (wallet) {
        await wallet.provider.disconnect();
      }
    } catch (error) {
      console.error('Disconnect failed:', error);
    } finally {
      setConnected(false);
      setPublicKey(null);
      setWalletName(null);
      setIsSignedIn(false);
    }
  };

  const signMessage = async (message: string): Promise<string | null> => {
    try {
      const wallet = getWalletProvider();
      if (!wallet || !connected) {
        throw new Error('Wallet not connected');
      }

      const encodedMessage = new TextEncoder().encode(message);
      const signedMessage = await wallet.provider.signMessage(encodedMessage);
      
      // Return base64 encoded signature
      return btoa(String.fromCharCode(...signedMessage.signature));
    } catch (error) {
      console.error('Message signing failed:', error);
      return null;
    }
  };

  const value = {
    connected,
    publicKey,
    walletName,
    connecting,
    connect,
    disconnect,
    signMessage,
    isSignedIn,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}; 