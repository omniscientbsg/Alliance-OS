"use client";

import { useState, useEffect } from 'react';
import { Search, Shield, FileText, User, Command, ArrowRight, CornerDownLeft, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Omnibar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    
    const handleOpen = () => setIsOpen(true);
    
    document.addEventListener('keydown', down);
    window.addEventListener('open-omnibar', handleOpen);
    
    return () => {
      document.removeEventListener('keydown', down);
      window.removeEventListener('open-omnibar', handleOpen);
    };
  }, []);

  if (!isOpen) return null;

  const results = [
    { type: 'Action', label: 'Register New Motor Claim', icon: FileText, color: 'text-rose-500', route: '/claims/new' },
    { type: 'Action', label: 'Issue Zero-Touch Auto Renewal', icon: Sparkles, color: 'text-indigo-500', route: '/renewals/auto' },
    { type: 'Policy', label: 'P11/2026/100/5042 ?" Acme Corp', icon: Shield, color: 'text-aos-blue', route: '/policy/P11-2026-100-5042' },
    { type: 'Claim', label: 'C11/100/1002/2026/011702 ?" John Kimaro', icon: FileText, color: 'text-rose-500', route: '/claims/C11-1002' },
    { type: 'Customer', label: 'Global Industries Ltd (TIN: 104-293-294)', icon: User, color: 'text-slate-500', route: '/customers/global-ind' },
  ].filter(r => r.label.toLowerCase().includes(query.toLowerCase()) || r.type.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      {/* Omnibar Dialog */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Input area */}
        <div className="flex items-center px-4 py-4 border-b border-slate-100 dark:border-slate-800">
          <Search className="w-6 h-6 text-slate-400 mr-3" />
          <input 
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What do you want to do? Search policies, claims, or actions..."
            className="flex-1 bg-transparent text-lg outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
          />
          <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
            ESC to close
          </div>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {results.length === 0 ? (
            <div className="py-14 text-center text-sm text-slate-500">
              No results found for <span className="font-semibold">"{query}"</span>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Suggestions
              </div>
              {results.map((result, i) => (
                <button 
                  key={i}
                  onClick={() => {
                    setIsOpen(false);
                    router.push(result.route);
                  }}
                  className="w-full flex items-center px-3 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors group text-left"
                >
                  <div className={`p-2 rounded-lg bg-slate-50 dark:bg-slate-800 ${result.color} mr-4 group-hover:bg-white dark:group-hover:bg-slate-700 transition-colors`}>
                    <result.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">{result.label}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{result.type}</p>
                  </div>
                  <CornerDownLeft className="w-4 h-4 text-slate-300 dark:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-700 rounded border border-slate-200 dark:border-slate-600 font-mono">↑</kbd> <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-700 rounded border border-slate-200 dark:border-slate-600 font-mono">↓</kbd> to navigate</span>
            <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-700 rounded border border-slate-200 dark:border-slate-600 font-mono">↵</kbd> to select</span>
          </div>
          <div className="flex items-center gap-1 text-indigo-500">
            <Sparkles className="w-3.5 h-3.5" /> AI Intent Parsing Active
          </div>
        </div>
      </div>
    </div>
  );
}