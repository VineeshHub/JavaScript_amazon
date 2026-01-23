import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { getMovieRecommendation } from '../services/geminiService';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([
    { text: "Hi! I'm CineBot. Not sure what to watch? Ask me for a recommendation!", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { text: userMsg, isBot: false }]);
    setInput('');
    setIsLoading(true);

    const reply = await getMovieRecommendation(userMsg);
    
    setMessages(prev => [...prev, { text: reply, isBot: true }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-20 right-4 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-brand-600 hover:bg-brand-500 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center"
        >
          <Bot className="w-6 h-6" />
        </button>
      )}

      {isOpen && (
        <div className="bg-slate-900 border border-slate-700 w-80 h-96 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="bg-slate-800 p-4 flex justify-between items-center border-b border-slate-700">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-brand-500" />
              <span className="font-semibold text-white">CineBot Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-900/95">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  m.isBot
                    ? 'bg-slate-800 text-slate-200 rounded-tl-none'
                    : 'bg-brand-600 text-white ml-auto rounded-tr-none'
                }`}
              >
                {m.text}
              </div>
            ))}
            {isLoading && (
              <div className="bg-slate-800 text-slate-400 p-3 rounded-2xl rounded-tl-none w-12 flex justify-center">
                <span className="animate-pulse">...</span>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-slate-800 border-t border-slate-700 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Suggest a sci-fi movie..."
              className="flex-1 bg-slate-900 text-white rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-500 border border-slate-700"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white p-2 rounded-full"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChat;
