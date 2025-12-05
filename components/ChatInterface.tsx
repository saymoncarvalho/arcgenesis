import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { Message, Sender } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: "Hello! I am your Arc/Blockchain development mentor. Since you've never developed before, let's start from the basics. What would you like to create or understand first?",
      sender: Sender.AI,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: input,
      sender: Sender.USER,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      // Create a history string for context
      const history = messages.slice(-5).map(m => `${m.sender}: ${m.text}`);
      
      const responseText = await sendMessageToGemini(userMsg.text, history);
      
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: Sender.AI,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-[#0b1121] rounded-2xl border border-blue-900/50 shadow-xl overflow-hidden backdrop-blur-sm">
      {/* Header */}
      <div className="p-4 border-b border-blue-900/50 bg-[#020617]/80 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center border border-blue-500/20">
          <Bot className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h3 className="font-semibold text-white">Arc Mentor AI</h3>
          <p className="text-xs text-blue-300/60">Development Assistant</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.sender === Sender.USER ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              msg.sender === Sender.USER ? 'bg-blue-600' : 'bg-[#1e3a8a]'
            }`}>
              {msg.sender === Sender.USER ? <User size={16} /> : <Sparkles size={16} />}
            </div>
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                msg.sender === Sender.USER
                  ? 'bg-blue-600 text-white rounded-tr-none'
                  : 'bg-[#1e293b] text-slate-100 rounded-tl-none border border-blue-900/30'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#1e3a8a] flex items-center justify-center shrink-0">
              <Sparkles size={16} />
            </div>
            <div className="bg-[#1e293b] rounded-2xl rounded-tl-none px-4 py-3 border border-blue-900/30">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-[#020617]/50 border-t border-blue-900/50">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask something like: 'How do I create a smart contract?'"
            className="w-full bg-[#0f172a] text-white placeholder-slate-500 border border-blue-900/50 rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none h-[52px]"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="absolute right-2 top-1.5 p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};