import React, { useState, useRef, useEffect } from 'react';
import { CompleteAnalysisResponse } from '../types';
import { sendChatMessage } from '../services/api';
import { Send, RotateCcw, HelpCircle } from 'lucide-react';

interface ChatAssistantProps {
  analysisContext: CompleteAnalysisResponse;
}

interface Message {
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

export const ChatAssistant: React.FC<ChatAssistantProps> = ({ analysisContext }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: `Hello. Ask me any question about your tax checkup, regime recommendation, or specific deductions. All answers are derived directly from your verified rule-engine results.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const samplePrompts = [
    'Why is the Old Regime better for me?',
    'Explain Section 80D simply',
    'How was my tax calculated?',
    'What am I missing?',
    'Why do I need this information?'
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMsg: Message = {
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await sendChatMessage(query, analysisContext);
      const botMsg: Message = {
        sender: 'bot',
        text: res.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (err: any) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: `Based on your verified analysis: ${analysisContext.taxAnalysis.recommendationReason}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 flex flex-col h-[500px]">
      {/* Header per Master Prompt Section 7 */}
      <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-purple-50/50 rounded-t-xl">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-purple-700 shrink-0" />
          <div>
            <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wider">Ask Veroxa</h3>
            <p className="text-[11px] text-purple-900 font-medium">Your tax explanation assistant</p>
          </div>
        </div>

        <button
          onClick={() => setMessages([messages[0]])}
          title="Reset conversation"
          className="p-1.5 text-slate-400 hover:text-slate-700 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-25">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
          >
            <div className={`w-7 h-7 rounded-md shrink-0 flex items-center justify-center text-xs font-bold ${
              msg.sender === 'user' 
                ? 'bg-slate-900 text-white' 
                : 'bg-purple-100 text-purple-900'
            }`}>
              {msg.sender === 'user' ? 'U' : 'V'}
            </div>

            <div className={`rounded-lg p-3.5 text-xs sm:text-sm leading-relaxed space-y-1 ${
              msg.sender === 'user'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-900 border border-slate-200'
            }`}>
              <div className="whitespace-pre-wrap">{msg.text}</div>
              <span className={`text-[10px] block text-right pt-1 ${
                msg.sender === 'user' ? 'text-slate-300' : 'text-slate-400'
              }`}>
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 max-w-[80%]">
            <div className="w-7 h-7 rounded-md bg-purple-100 text-purple-900 flex items-center justify-center text-xs font-bold shrink-0">
              V
            </div>
            <div className="bg-white border border-slate-200 p-3.5 rounded-lg text-xs text-slate-500">
              Translating verified rule context into clear human language...
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Question Chips */}
      <div className="px-4 py-2 bg-slate-50 border-t border-slate-200 overflow-x-auto flex gap-2 no-scrollbar">
        {samplePrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="shrink-0 text-[11px] font-medium bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1 rounded-md transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
        className="p-3 bg-white border-t border-slate-200 flex gap-2 rounded-b-xl"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about your tax checkup..."
          className="flex-1 bg-slate-50 border border-slate-200 rounded-md px-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-semibold px-4 py-2 rounded-md transition-colors flex items-center justify-center shrink-0"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
