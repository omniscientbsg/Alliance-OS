import React, { useState } from 'react';
import { Bot, Send, X, Mic, Paperclip, ChevronRight, Sparkles } from "lucide-react";

interface CoPilotSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CoPilotSidebar({ isOpen, onClose }: CoPilotSidebarProps) {
  const [input, setInput] = useState('');
  
  const suggestions = [
    "Summarize Acme Corp's claim history",
    "Find policies expiring next month",
    "Explain the Motor QS treaty terms",
    "Calculate loss ratio for Fire branch"
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-2xl border-l border-slate-200 z-50 flex flex-col transform transition-transform duration-300 translate-x-0 animate-in slide-in-from-right">
      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-indigo-600 text-white">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5" />
          <div>
            <h2 className="font-bold text-sm">Alliance CoPilot</h2>
            <p className="text-[10px] text-indigo-200">AI Assistant powered by DeepMind</p>
          </div>
        </div>
        <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {/* Welcome Message */}
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex-shrink-0 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm p-3 shadow-sm">
            <p className="text-sm text-slate-700">Hello! I'm your Alliance CoPilot. I can help you search policies, analyze claims, or navigate the system. What would you like to do today?</p>
          </div>
        </div>

        {/* Suggestion Chips */}
        <div className="space-y-2 mt-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-11">Suggested Queries</p>
          <div className="flex flex-col gap-2 ml-11">
            {suggestions.map((suggestion, idx) => (
              <button 
                key={idx}
                className="text-left text-xs text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 py-2 px-3 rounded-xl transition-colors flex items-center justify-between group"
                onClick={() => setInput(suggestion)}
              >
                {suggestion}
                <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-slate-200 bg-white">
        <div className="relative flex items-center">
          <button className="absolute left-3 text-slate-400 hover:text-slate-600">
            <Paperclip className="w-4 h-4" />
          </button>
          <input 
            type="text" 
            placeholder="Ask CoPilot anything..." 
            className="w-full pl-10 pr-20 py-3 bg-slate-100 border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="absolute right-2 flex items-center gap-1">
            <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition-colors">
              <Mic className="w-4 h-4" />
            </button>
            <button className={`p-1.5 rounded-lg transition-colors ${input ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-200'}`}>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
        <p className="text-[10px] text-center text-slate-400 mt-2">CoPilot can make mistakes. Verify important information.</p>
      </div>
    </div>
  );
}
