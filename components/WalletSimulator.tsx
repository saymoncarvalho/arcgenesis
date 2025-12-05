import React, { useState } from 'react';
import { Wallet, CreditCard, ArrowRightLeft, RefreshCw, AlertCircle } from 'lucide-react';
import { WalletState } from '../types';

interface WalletSimulatorProps {
  walletState: WalletState;
  setWalletState: React.Dispatch<React.SetStateAction<WalletState>>;
}

export const WalletSimulator: React.FC<WalletSimulatorProps> = ({ walletState, setWalletState }) => {
  const [loading, setLoading] = useState(false);

  const handleConnect = () => {
    setLoading(true);
    setTimeout(() => {
      setWalletState({
        connected: true,
        address: '0x71C...9A23',
        balance: '100.00',
        network: 'Arc Testnet'
      });
      setLoading(false);
    }, 1500);
  };

  const handleDisconnect = () => {
    setWalletState({
      connected: false,
      address: null,
      balance: '0',
      network: 'Disconnected'
    });
  };

  return (
    <div className="w-full max-w-md mx-auto bg-[#0b1121] rounded-2xl p-6 border border-blue-900/50 shadow-xl backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Wallet className="text-blue-400" />
          Wallet Simulator
        </h2>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${walletState.connected ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
          {walletState.connected ? 'Connected' : 'Disconnected'}
        </span>
      </div>

      {!walletState.connected ? (
        <div className="text-center py-8">
          <p className="text-blue-200/60 mb-6">Connect your simulated wallet to interact with the DApp.</p>
          <button
            onClick={handleConnect}
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
          >
            {loading ? <RefreshCw className="animate-spin w-5 h-5" /> : 'Connect Wallet'}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-[#020617]/60 p-4 rounded-xl border border-blue-900/30">
            <p className="text-blue-300/60 text-sm mb-1">Total Balance</p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-white">{walletState.balance}</span>
              <span className="text-blue-400 font-medium">USDC (Arc)</span>
            </div>
            <p className="text-xs text-blue-400/60 mt-2 font-mono bg-blue-950/50 py-1 px-2 rounded inline-block border border-blue-900/30">
              {walletState.address}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex flex-col items-center justify-center p-3 bg-blue-900/20 hover:bg-blue-900/40 rounded-lg transition-colors border border-blue-900/30 group">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <ArrowRightLeft className="w-5 h-5 text-blue-400" />
              </div>
              <span className="text-sm font-medium text-blue-100">Transfer</span>
            </button>
            <button className="flex flex-col items-center justify-center p-3 bg-blue-900/20 hover:bg-blue-900/40 rounded-lg transition-colors border border-blue-900/30 group">
              <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <CreditCard className="w-5 h-5 text-indigo-400" />
              </div>
              <span className="text-sm font-medium text-blue-100">Buy</span>
            </button>
          </div>

          <div className="border-t border-blue-900/30 pt-4">
            <div className="flex items-start gap-3 p-3 bg-yellow-500/5 rounded-lg border border-yellow-500/10">
              <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
              <div className="text-xs text-yellow-200/70">
                <p className="font-semibold text-yellow-500 mb-1">Simulation Mode</p>
                This is a visual interface for learning purposes. No real transactions are occurring on the Blockchain.
              </div>
            </div>
          </div>

          <button
            onClick={handleDisconnect}
            className="w-full py-2 text-sm text-red-400 hover:text-red-300 transition-colors"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};