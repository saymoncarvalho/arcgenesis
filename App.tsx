import React, { useState } from 'react';
import { LayoutDashboard, GraduationCap, Wallet as WalletIcon, ExternalLink } from 'lucide-react';
import { ChatInterface } from './components/ChatInterface';
import { WalletSimulator } from './components/WalletSimulator';
import { WalletState, Tab } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.CHAT);
  const [walletState, setWalletState] = useState<WalletState>({
    connected: false,
    address: null,
    balance: '0',
    network: 'Disconnected'
  });

  return (
    <div className="min-h-screen text-slate-100 selection:bg-blue-500/30">
      
      {/* Navigation Bar */}
      <nav className="border-b border-blue-900/30 bg-[#020617]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-blue-700 p-2 rounded-lg shadow-lg shadow-blue-900/50">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                ArcDev Genesis
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <a href="#" className="text-sm font-medium text-blue-200/70 hover:text-white transition-colors">Documentation</a>
              <a href="#" className="text-sm font-medium text-blue-200/70 hover:text-white transition-colors">Faucet</a>
              <div className="h-4 w-[1px] bg-blue-800"></div>
              <div className="flex items-center gap-2 text-xs font-mono text-blue-400 bg-blue-950/40 px-3 py-1.5 rounded-full border border-blue-500/30">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                API CONNECTED
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome to Arc Network</h1>
          <p className="text-blue-200/60 max-w-2xl">
            Your journey to developing decentralized applications (DApps) starts here.
            Use the AI to learn, generate code, and the simulator to test interactions in a safe environment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Menu & Wallet */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Menu Cards */}
            <div className="grid grid-cols-1 gap-3">
              <button 
                onClick={() => setActiveTab(Tab.CHAT)}
                className={`p-4 rounded-xl border transition-all text-left flex items-center gap-4 ${
                  activeTab === Tab.CHAT 
                  ? 'bg-blue-900/20 border-blue-500/50 ring-1 ring-blue-500/50 shadow-lg shadow-blue-900/10' 
                  : 'bg-[#0b1121] border-blue-900/30 hover:bg-[#1e293b] hover:border-blue-800'
                }`}
              >
                <div className={`p-2 rounded-lg ${activeTab === Tab.CHAT ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                  <LayoutDashboard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-100">AI Assistant</h3>
                  <p className="text-xs text-blue-300/60">Generate code and ask questions</p>
                </div>
              </button>

              <button 
                 onClick={() => setActiveTab(Tab.WALLET)}
                 className={`p-4 rounded-xl border transition-all text-left flex items-center gap-4 ${
                  activeTab === Tab.WALLET 
                  ? 'bg-blue-900/20 border-blue-500/50 ring-1 ring-blue-500/50 shadow-lg shadow-blue-900/10' 
                  : 'bg-[#0b1121] border-blue-900/30 hover:bg-[#1e293b] hover:border-blue-800'
                }`}
              >
                <div className={`p-2 rounded-lg ${activeTab === Tab.WALLET ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                  <WalletIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-100">Wallet Simulator</h3>
                  <p className="text-xs text-blue-300/60">Test transactions without risk</p>
                </div>
              </button>
              
              <button 
                className="p-4 rounded-xl border bg-[#0b1121] border-blue-900/30 text-left flex items-center gap-4 opacity-60 cursor-not-allowed"
              >
                <div className="p-2 rounded-lg bg-slate-800 text-slate-400">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-100">Tutorials (Coming Soon)</h3>
                  <p className="text-xs text-blue-300/60">Step-by-step lessons</p>
                </div>
              </button>
            </div>

            {/* Quick Tips */}
            <div className="bg-gradient-to-br from-blue-950 to-[#020617] rounded-xl p-5 border border-blue-900/50">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-blue-400" />
                Quick Tip
              </h3>
              <p className="text-sm text-blue-200/60 leading-relaxed">
                ERC-20 tokens are like digital "currencies" you can create. Try asking the assistant: "Write a simple token contract for me".
              </p>
            </div>
          </div>

          {/* Right Column: Main Interaction Area */}
          <div className="lg:col-span-8">
            {activeTab === Tab.CHAT && (
              <ChatInterface />
            )}
            
            {activeTab === Tab.WALLET && (
              <div className="flex flex-col items-center justify-center h-full min-h-[500px] bg-[#0b1121]/50 rounded-2xl border border-blue-900/30 p-8">
                 <div className="max-w-md w-full">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-white">Your Test Lab</h2>
                        <p className="text-blue-200/60 mt-2">
                            Before sending real transactions to the network, understand how a wallet works in this safe environment.
                        </p>
                    </div>
                    <WalletSimulator walletState={walletState} setWalletState={setWalletState} />
                 </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;