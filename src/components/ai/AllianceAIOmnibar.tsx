"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Search, Bot, Sparkles, ArrowRight, Shield, FileText, HeartHandshake, 
  Banknote, Users, Settings, TrendingUp, Zap, Clock, CheckCircle2, 
  ChevronRight, Command, X
} from 'lucide-react';

import { useRouter } from 'next/navigation';

interface OmnibarProps {
  isOpen: boolean;
  onClose: () => void;
}

type Action = {
  id: string;
  label: string;
  description: string;
  category: string;
  icon: React.ElementType;
  iconColor: string;
  shortcut?: string;
  aiPowered?: boolean;
  route?: string;
};

const ACTIONS: Action[] = [
  // AI-Powered Actions
  { id: 'ai-quote', label: 'Generate AI Quote', description: 'Let Alliance AI draft a quote from natural language', category: 'Alliance AI', icon: Sparkles, iconColor: 'text-indigo-500', shortcut: 'Q', aiPowered: true },
  { id: 'ai-claim-assess', label: 'Run AI Damage Assessment', description: 'Upload photos for Zero-Touch STP evaluation', category: 'Alliance AI', icon: Bot, iconColor: 'text-indigo-500', aiPowered: true },
  { id: 'ai-renew', label: 'AI Renewal Recommendations', description: 'Get AI-ranked list of policies needing attention', category: 'Alliance AI', icon: Zap, iconColor: 'text-indigo-500', aiPowered: true },
  { id: 'ai-fraud', label: 'Run Fraud Check', description: 'Analyse a claim or policy for fraud signals', category: 'Alliance AI', icon: Bot, iconColor: 'text-indigo-500', aiPowered: true },

  // Quick Actions — Policies
  { id: 'new-policy', label: 'Issue New Policy', description: 'Open the policy issuance wizard', category: 'Policies', icon: Shield, iconColor: 'text-aos-blue', shortcut: 'P' },
  { id: 'search-policy', label: 'Search Policy', description: 'Find a policy by number, client or plate', category: 'Policies', icon: Search, iconColor: 'text-aos-blue' },
  { id: 'renewals', label: 'View Renewal Pipeline', description: 'Policies expiring in the next 90 days', category: 'Policies', icon: Clock, iconColor: 'text-aos-amber' },

  // Quick Actions — Claims
  { id: 'register-fnol', label: 'Register FNOL', description: 'Log a new First Notice of Loss', category: 'Claims', icon: FileText, iconColor: 'text-aos-rose', shortcut: 'F' },
  { id: 'search-claim', label: 'C11/100/1002/2026/011702 - John Kimaro', description: 'Open Claim Canvas for C11-1002', category: 'Claims', icon: Search, iconColor: 'text-aos-rose', route: '/claims/C11-1002' },
  { id: 'settle-claim', label: 'Process Settlement', description: 'Initiate STP or manual settlement workflow', category: 'Claims', icon: CheckCircle2, iconColor: 'text-aos-emerald' },

  // Quick Actions — Finance
  { id: 'new-receipt', label: 'Record Bank Receipt', description: 'Log an incoming premium payment', category: 'Finance', icon: Banknote, iconColor: 'text-aos-amber', shortcut: 'R' },
  { id: 'voucher', label: 'Raise Payment Voucher', description: 'Create a payment voucher for approval', category: 'Finance', icon: Banknote, iconColor: 'text-aos-amber' },

  // Quick Actions — Navigation
  { id: 'nav-dashboard', label: 'Go to Dashboard', description: 'Mission control and AI action center', category: 'Navigate', icon: TrendingUp, iconColor: 'text-slate-500' },
  { id: 'nav-ri', label: 'Go to Reinsurance', description: 'Treaty management and allocations', category: 'Navigate', icon: HeartHandshake, iconColor: 'text-slate-500' },
  { id: 'nav-customers', label: 'Go to Customers', description: 'Client registry and CRM', category: 'Navigate', icon: Users, iconColor: 'text-slate-500' },
  { id: 'nav-settings', label: 'Go to Settings', description: 'System configuration and masters', category: 'Navigate', icon: Settings, iconColor: 'text-slate-500' },
];

const RECENT_QUERIES = [
  "Summarise Acme Corp's claim history",
  "Motor XOL treaty — remaining capacity",
  "Policies expiring in next 7 days",
];

export function AllianceAIOmnibar({ isOpen, onClose }: OmnibarProps) {
  const [query, setQuery] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const filteredActions = query.length > 0
    ? ACTIONS.filter(a =>
        a.label.toLowerCase().includes(query.toLowerCase()) ||
        a.description.toLowerCase().includes(query.toLowerCase()) ||
        a.category.toLowerCase().includes(query.toLowerCase())
      )
    : ACTIONS.filter(a => a.category === 'Alliance AI');

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIdx(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIdx(i => Math.min(i + 1, filteredActions.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setSelectedIdx(i => Math.max(i - 1, 0)); }
    if (e.key === 'Escape') onClose();
    if (e.key === 'Enter') { 
      const selected = filteredActions[selectedIdx];
      if (selected && selected.route) {
        router.push(selected.route);
      }
      onClose(); 
    }
  }, [filteredActions, selectedIdx, onClose, router]);

  // Group filtered actions by category
  const grouped = filteredActions.reduce<Record<string, Action[]>>((acc, action) => {
    if (!acc[action.category]) acc[action.category] = [];
    acc[action.category].push(action);
    return acc;
  }, {});

  if (!isOpen) return null;

  const isNaturalLanguageQuery = query.length > 4 && !filteredActions.find(a => a.label.toLowerCase() === query.toLowerCase());

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-[100] bg-black/50 dark:bg-black/70 backdrop-blur-sm animate-in fade-in duration-150"
        onClick={onClose}
      />

      {/* Omnibar Panel */}
      <div className="fixed top-[15vh] left-1/2 -translate-x-1/2 z-[101] w-full max-w-2xl animate-in slide-in-from-top-4 duration-200">
        <div className="bg-white dark:bg-[#0f172a] rounded-2xl shadow-2xl dark:shadow-black/60 border border-slate-200 dark:border-slate-700 overflow-hidden">

          {/* Input Area */}
          <div className="flex items-center gap-3 p-4 border-b border-slate-100 dark:border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0 shadow-sm">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <input
              ref={inputRef}
              type="text"
              className="flex-1 text-base text-slate-900 dark:text-slate-100 bg-transparent outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
              placeholder="Search, navigate, or ask Alliance AI anything..."
              value={query}
              onChange={e => { setQuery(e.target.value); setSelectedIdx(0); }}
              onKeyDown={handleKeyDown}
            />
            {query && (
              <button onClick={() => setQuery('')} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                <X className="w-4 h-4" />
              </button>
            )}
            <div className="flex items-center gap-1 px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-md text-slate-500 dark:text-slate-400 text-xs font-mono">
              <Command className="w-3 h-3" /> K
            </div>
          </div>

          {/* Natural Language AI Query Banner */}
          {isNaturalLanguageQuery && (
            <div 
              className="mx-3 mt-3 p-3 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800/60 rounded-xl cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors group"
              onClick={onClose}
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-indigo-500 dark:text-indigo-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-indigo-900 dark:text-indigo-200">Ask Alliance AI</p>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 truncate">"{query}"</p>
                </div>
                <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          )}

          {/* Results */}
          <div className="max-h-[55vh] overflow-y-auto p-3 space-y-4 custom-scrollbar">
            
            {/* Quick Shortcuts Header (no query) */}
            {!query && (
              <>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-2 mb-2">Powered by Alliance AI</p>
                  {ACTIONS.filter(a => a.aiPowered).map((action, idx) => (
                    <ActionRow key={action.id} action={action} isSelected={selectedIdx === idx} onClick={onClose} />
                  ))}
                </div>
                <div className="border-t border-slate-100 dark:border-slate-800 pt-3">
                  <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-2 mb-2">Recent Queries</p>
                  <div className="space-y-1">
                    {RECENT_QUERIES.map((q, i) => (
                      <button key={i} onClick={() => { setQuery(q); }} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-left group">
                        <Clock className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" />
                        <span className="text-sm text-slate-700 dark:text-slate-300">{q}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-300 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Filtered grouped results */}
            {query && Object.entries(grouped).map(([category, actions]) => (
              <div key={category}>
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-2 mb-2">{category}</p>
                {actions.map((action, idx) => {
                  const globalIdx = filteredActions.indexOf(action);
                  return <ActionRow key={action.id} action={action} isSelected={selectedIdx === globalIdx} onClick={() => {
                    if (action.route) {
                      router.push(action.route);
                    }
                    onClose();
                  }} />;
                })}
              </div>
            ))}

            {query && filteredActions.length === 0 && (
              <div className="py-12 text-center text-slate-400 dark:text-slate-500">
                <Bot className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm">No actions found. Press Enter to ask Alliance AI.</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/30">
            <p className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
              <span className="font-mono bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded text-[9px]">↑↓</span> navigate
              <span className="font-mono bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded text-[9px] ml-1">↵</span> select
              <span className="font-mono bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded text-[9px] ml-1">Esc</span> close
            </p>
            <p className="text-[10px] text-indigo-500 dark:text-indigo-400 flex items-center gap-1 font-semibold">
              <Sparkles className="w-3 h-3" /> Powered by Alliance AI
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

function ActionRow({ action, isSelected, onClick }: { action: Action; isSelected: boolean; onClick: () => void }) {
  const Icon = action.icon;
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left group ${
        isSelected
          ? 'bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800/60'
          : 'hover:bg-slate-50 dark:hover:bg-slate-800/40 border border-transparent'
      }`}
    >
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isSelected ? 'bg-indigo-100 dark:bg-indigo-800/60' : 'bg-slate-100 dark:bg-slate-800'} transition-colors`}>
        <Icon className={`w-4 h-4 ${action.iconColor}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{action.label}</span>
          {action.aiPowered && (
            <span className="text-[9px] px-1.5 py-0.5 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-full font-bold border border-indigo-200 dark:border-indigo-700">AI</span>
          )}
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{action.description}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {action.shortcut && (
          <span className="text-[9px] font-mono bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded border border-slate-300 dark:border-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">{action.shortcut}</span>
        )}
        <ChevronRight className={`w-4 h-4 text-slate-300 dark:text-slate-600 transition-all ${isSelected ? 'text-indigo-400 translate-x-0.5' : 'group-hover:translate-x-0.5'}`} />
      </div>
    </button>
  );
}

/* Global Keyboard Handler Hook — use in layout */
export function useOmnibar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return { isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) };
}
