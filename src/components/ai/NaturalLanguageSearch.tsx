"use client";

import React, { useState } from 'react';
import { Search, Sparkles, ArrowRight, X, Shield, FileText, Users, Clock } from 'lucide-react';

interface NLSearchResult {
  id: string;
  type: 'policy' | 'claim' | 'customer';
  title: string;
  detail: string;
  meta: string;
}

export function NaturalLanguageSearch({ className = '' }: { className?: string }) {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<NLSearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  const suggestions = [
    'Show all motor policies expiring in 30 days for brokers in Dar',
    'Claims with settlement above TZS 10M this quarter',
    'Outstanding premiums from Howden Puri older than 60 days',
    'What is the standard excess for windscreen on motor private?',
  ];

  const mockResults: NLSearchResult[] = [
    { id: '1', type: 'policy', title: 'P11/2025/100/5044', detail: 'John Doe — Motor Comprehensive', meta: 'Expires: 09/03/2026 • SI: TZS 50M' },
    { id: '2', type: 'policy', title: 'P11/2025/100/5042', detail: 'Acme Corp — Fire & Perils', meta: 'Expires: 31/12/2025 • SI: TZS 1.5B' },
    { id: '3', type: 'claim', title: 'C11/100/1002/2026/011654', detail: 'ALBIZIA LIMITED — Own Damage', meta: 'Status: Assessment • TZS 4.5M' },
    { id: '4', type: 'customer', title: 'Howden Puri', detail: 'Broker — Category 601', meta: 'Outstanding: TZS 245M • 12 active policies' },
  ];

  const handleSearch = () => {
    if (!query.trim()) return;
    setIsSearching(true);
    setShowResults(true);
    setTimeout(() => { setResults(mockResults); setIsSearching(false); }, 800);
  };

  const typeIcon = { policy: Shield, claim: FileText, customer: Users };
  const typeColor = { policy: 'text-aos-blue bg-aos-blue/10', claim: 'text-aos-rose bg-aos-rose/10', customer: 'text-aos-emerald bg-aos-emerald/10' };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-aos-violet" />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
          placeholder="Ask anything... e.g. 'motor policies expiring next 30 days'"
          className="w-full pl-12 pr-24 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-aos-violet/20 focus:border-aos-violet outline-none shadow-sm"
        />
        <button onClick={handleSearch} className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-aos-violet text-white text-sm font-medium rounded-lg hover:bg-aos-violet/90 flex items-center gap-1">
          <Search className="w-3.5 h-3.5" /> Search
        </button>
      </div>

      {/* Suggestions */}
      {!showResults && (
        <div className="mt-2 flex flex-wrap gap-2">
          {suggestions.map((s, i) => (
            <button key={i} onClick={() => { setQuery(s); handleSearch(); }}
              className="text-xs px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-slate-600 hover:bg-aos-violet/5 hover:border-aos-violet/20 hover:text-aos-violet transition-colors">
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Results */}
      {showResults && (
        <div className="mt-4 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="p-3 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <p className="text-xs text-slate-500">{isSearching ? 'Searching...' : `${results.length} results for "${query}"`}</p>
            <button onClick={() => { setShowResults(false); setQuery(''); setResults([]); }}><X className="w-4 h-4 text-slate-400" /></button>
          </div>
          {isSearching ? (
            <div className="p-8 text-center"><div className="w-6 h-6 border-2 border-aos-violet border-t-transparent rounded-full animate-spin mx-auto" /><p className="text-xs text-slate-400 mt-2">AI is processing your query...</p></div>
          ) : (
            <div className="divide-y divide-slate-100">
              {results.map(r => {
                const Icon = typeIcon[r.type];
                return (
                  <div key={r.id} className="p-3 hover:bg-slate-50 cursor-pointer flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${typeColor[r.type]}`}><Icon className="w-4 h-4" /></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900">{r.title}</p>
                      <p className="text-xs text-slate-600">{r.detail}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{r.meta}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300" />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
