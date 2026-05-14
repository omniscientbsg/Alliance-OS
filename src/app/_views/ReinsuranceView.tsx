"use client";

import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { 
  Bot, Sparkles, Zap, CheckCircle2, AlertTriangle, ChevronRight, 
  RefreshCw, Filter, Plus, HeartHandshake, TrendingUp, Shield, 
  ArrowRight, Activity, Eye, Download
} from "lucide-react";

const TREATIES = [
  { id: 'FIR-QS-2026', name: 'Fire Property QS 2026', type: 'Quota Share', retention: '30%', capacity: 'TZS 5B', used: 68, reinsurers: ['SwissRe', 'MunichRe', 'Hannover'] },
  { id: 'MOT-XOL-2026', name: 'Motor XOL 2026', type: 'Excess of Loss', retention: 'TZS 5M xs', capacity: 'TZS 50M', used: 42, reinsurers: ['LloydsSyndicate 23', 'ZurichRe'] },
  { id: 'MAR-XOL-2026', name: 'Marine Hull XOL 2026', type: 'Excess of Loss', retention: 'TZS 10M xs', capacity: 'TZS 200M', used: 92, reinsurers: ['MunichRe', 'LloydsSyndicate 23'] },
  { id: 'CAR-FAC-2026', name: 'CAR Facultative', type: 'Facultative', retention: '20%', capacity: 'TZS 50B per risk', used: 15, reinsurers: ['SwissRe', 'AfricaRe'] },
];

const PENDING_POLICIES = [
  { id: 'P11/2026/200/1008', insured: 'Global Industries', product: 'Fire & Allied Perils', si: 'TZS 8.5B', premium: 'TZS 120M', priority: 'auto', confidence: 96 },
  { id: 'P11/2026/300/4055', insured: 'City Construction', product: 'Contractors All Risk', si: 'TZS 25B', premium: 'TZS 350M', priority: 'fac', confidence: 0 },
  { id: 'P11/2026/100/5042', insured: 'Acme Corp Ltd', product: 'Motor Commercial', si: 'TZS 1.5B', premium: 'TZS 45M', priority: 'auto', confidence: 99 },
  { id: 'P11/2026/400/2211', insured: 'Precision Air', product: 'Aviation Hull', si: 'TZS 18B', premium: 'TZS 540M', priority: 'fac', confidence: 0 },
];

const AI_ALLOCATION_RESULT = [
  { treaty: 'FIR-QS-2026', reinsurer: 'SwissRe', share: '35%', siCeded: 'TZS 2.975B', premiumCeded: 'TZS 42M' },
  { treaty: 'FIR-QS-2026', reinsurer: 'MunichRe', share: '25%', siCeded: 'TZS 2.125B', premiumCeded: 'TZS 30M' },
  { treaty: 'FIR-QS-2026', reinsurer: 'Hannover', share: '10%', siCeded: 'TZS 850M', premiumCeded: 'TZS 12M' },
  { treaty: 'Retention (Net)', reinsurer: 'Alliance Insurance', share: '30%', siCeded: 'TZS 2.55B', premiumCeded: 'TZS 36M' },
];

export default function ReinsuranceView() {
  const [activeTab, setActiveTab] = useState<'pending' | 'treaties' | 'bordereaux'>('pending');
  const [allocating, setAllocating] = useState<string | null>(null);
  const [allocated, setAllocated] = useState<string[]>([]);
  const [showResult, setShowResult] = useState<string | null>(null);
  const [batchRunning, setBatchRunning] = useState(false);
  const [batchDone, setBatchDone] = useState(false);

  const handleAutoAllocate = (policyId: string) => {
    setAllocating(policyId);
    setTimeout(() => {
      setAllocating(null);
      setAllocated(prev => [...prev, policyId]);
      setShowResult(policyId);
    }, 1800);
  };

  const handleBatch = () => {
    setBatchRunning(true);
    const autoIds = PENDING_POLICIES.filter(p => p.priority === 'auto').map(p => p.id);
    let i = 0;
    const iv = setInterval(() => {
      if (i < autoIds.length) { setAllocated(prev => [...prev, autoIds[i]]); i++; }
      else { clearInterval(iv); setBatchRunning(false); setBatchDone(true); }
    }, 600);
  };

  const tabs = [
    { key: 'pending', label: 'Pending Allocation', count: PENDING_POLICIES.filter(p => !allocated.includes(p.id)).length },
    { key: 'treaties', label: 'Treaty Positions' },
    { key: 'bordereaux', label: 'Bordereaux' },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
            <HeartHandshake className="w-6 h-6 text-indigo-500" /> Reinsurance & Treaties
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">AI-powered treaty allocation, capacity monitoring, and bordereaux generation.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button
            onClick={handleBatch}
            disabled={batchRunning || batchDone}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm flex items-center gap-2"
          >
            {batchRunning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
            {batchRunning ? 'Allocating...' : batchDone ? 'Batch Complete ✓' : 'AI Batch Allocate'}
          </button>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Pending Allocation', value: PENDING_POLICIES.filter(p => !allocated.includes(p.id)).length.toString(), icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20' },
          { label: 'Auto-Allocated Today', value: allocated.length.toString(), icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
          { label: 'Fac. Placements Open', value: '2', icon: HeartHandshake, color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-900/20' },
          { label: 'Treaties Near Capacity', value: '1', icon: Activity, color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-900/20' },
        ].map((kpi, i) => (
          <Card key={i} className="p-4 dark:bg-[#0f172a] dark:border-slate-800 shadow-sm flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${kpi.bg}`}>
              <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
            </div>
            <div>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold">{kpi.label}</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{kpi.value}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Alliance AI Banner */}
      {!batchDone && (
        <div className="flex items-center gap-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/40 rounded-xl">
          <Bot className="w-5 h-5 text-indigo-500 shrink-0" />
          <div className="flex-1">
            <p className="font-semibold text-indigo-900 dark:text-indigo-200 text-sm">Alliance AI can auto-allocate {PENDING_POLICIES.filter(p => p.priority === 'auto').length} policies to treaties instantly</p>
            <p className="text-xs text-indigo-500 dark:text-indigo-400 mt-0.5">{PENDING_POLICIES.filter(p => p.priority === 'fac').length} policies require facultative placement and will be flagged for manual action</p>
          </div>
          <button onClick={handleBatch} disabled={batchRunning} className="shrink-0 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
            Run Now <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      )}

      {batchDone && (
        <div className="flex items-center gap-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/40 rounded-xl animate-in fade-in duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
          <p className="font-semibold text-emerald-900 dark:text-emerald-200 text-sm">Batch complete — 2 policies auto-allocated to treaties. 2 facultative placements flagged for underwriter action.</p>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 border-b border-slate-200 dark:border-slate-800">
        {tabs.map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-colors -mb-px ${activeTab === tab.key ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}>
            {tab.label}
            {'count' in tab && tab.count > 0 && (
              <span className="text-[10px] px-1.5 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-full font-bold border border-amber-200 dark:border-amber-700/40">{tab.count}</span>
            )}
          </button>
        ))}
      </div>

      {/* Tab: Pending Allocation */}
      {activeTab === 'pending' && (
        <div className="space-y-4 animate-in fade-in duration-300">
          {PENDING_POLICIES.map(policy => {
            const isAllocated = allocated.includes(policy.id);
            const isAllocating = allocating === policy.id;
            const isShowingResult = showResult === policy.id;

            return (
              <div key={policy.id}>
                <Card className={`dark:border-slate-800 shadow-sm transition-all ${isAllocated ? 'border-emerald-200 dark:border-emerald-800/40 bg-emerald-50/30 dark:bg-emerald-950/10' : 'dark:bg-[#0f172a]'}`}>
                  <div className="p-5 flex items-center gap-4">
                    <div className={`w-2 h-12 rounded-full shrink-0 ${policy.priority === 'fac' ? 'bg-rose-400' : isAllocated ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-aos-blue dark:text-blue-400 text-sm">{policy.id}</p>
                        {policy.priority === 'auto' && policy.confidence > 0 && (
                          <span className="text-[10px] px-1.5 py-0.5 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-500 dark:text-indigo-400 rounded-full font-bold border border-indigo-200 dark:border-indigo-800/40 flex items-center gap-0.5">
                            <Bot className="w-2.5 h-2.5" /> AI {policy.confidence}% match
                          </span>
                        )}
                        {policy.priority === 'fac' && (
                          <span className="text-[10px] px-1.5 py-0.5 bg-rose-50 dark:bg-rose-900/20 text-rose-500 border border-rose-200 dark:border-rose-800/40 rounded-full font-bold">FAC REQUIRED</span>
                        )}
                        {isAllocated && (
                          <span className="text-[10px] px-1.5 py-0.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40 rounded-full font-bold flex items-center gap-0.5">
                            <CheckCircle2 className="w-2.5 h-2.5" /> ALLOCATED
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">{policy.insured} — {policy.product}</p>
                      <div className="flex gap-4 mt-1 text-xs text-slate-400 dark:text-slate-500">
                        <span>TSI: <span className="font-semibold text-slate-700 dark:text-slate-300">{policy.si}</span></span>
                        <span>Premium: <span className="font-semibold text-slate-700 dark:text-slate-300">{policy.premium}</span></span>
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      {!isAllocated && policy.priority === 'auto' && (
                        <button onClick={() => handleAutoAllocate(policy.id)} disabled={isAllocating}
                          className="px-3 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-60">
                          {isAllocating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Zap className="w-3.5 h-3.5" />}
                          {isAllocating ? 'Allocating...' : 'AI Allocate'}
                        </button>
                      )}
                      {!isAllocated && policy.priority === 'fac' && (
                        <button className="px-3 py-2 text-xs font-bold text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/40 bg-rose-50 dark:bg-rose-900/20 hover:bg-rose-100 dark:hover:bg-rose-900/30 rounded-lg transition-colors flex items-center gap-1.5">
                          <Plus className="w-3.5 h-3.5" /> Place Fac
                        </button>
                      )}
                      {isAllocated && (
                        <button onClick={() => setShowResult(isShowingResult ? null : policy.id)} className="px-3 py-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40 bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 rounded-lg transition-colors flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5" /> View Split
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Allocation Result Accordion */}
                  {isShowingResult && isAllocated && (
                    <div className="border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/30 animate-in slide-in-from-top-2 duration-200">
                      <div className="px-5 py-3 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800">
                        <Sparkles className="w-4 h-4 text-indigo-500" />
                        <p className="text-xs font-bold text-slate-700 dark:text-slate-300">AI Allocation Split — {policy.id}</p>
                      </div>
                      <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
                        {AI_ALLOCATION_RESULT.map((row, i) => (
                          <div key={i} className="px-5 py-2.5 grid grid-cols-4 gap-4 text-xs">
                            <span className="font-medium text-slate-600 dark:text-slate-400">{row.treaty}</span>
                            <span className="font-semibold text-slate-900 dark:text-slate-100">{row.reinsurer}</span>
                            <span className="font-mono text-indigo-500 dark:text-indigo-400">{row.share}</span>
                            <span className="font-mono text-slate-700 dark:text-slate-300">{row.premiumCeded}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab: Treaty Positions */}
      {activeTab === 'treaties' && (
        <div className="space-y-4 animate-in fade-in duration-300">
          {TREATIES.map(treaty => (
            <Card key={treaty.id} className="p-5 dark:bg-[#0f172a] dark:border-slate-800 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-slate-900 dark:text-slate-100">{treaty.name}</p>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${treaty.type === 'Quota Share' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-500 border-blue-200 dark:border-blue-800/40' : treaty.type === 'Excess of Loss' ? 'bg-violet-50 dark:bg-violet-900/20 text-violet-500 border-violet-200 dark:border-violet-800/40' : 'bg-amber-50 dark:bg-amber-900/20 text-amber-500 border-amber-200 dark:border-amber-700/40'}`}>
                      {treaty.type}
                    </span>
                    {treaty.used > 85 && <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-rose-50 dark:bg-rose-900/20 text-rose-500 border border-rose-200 dark:border-rose-800/40 flex items-center gap-0.5"><AlertTriangle className="w-2.5 h-2.5" /> Near Limit</span>}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Retention: <span className="font-semibold">{treaty.retention}</span> · Capacity: <span className="font-semibold">{treaty.capacity}</span></p>
                </div>
                <p className={`text-2xl font-bold ${treaty.used > 85 ? 'text-rose-500' : treaty.used > 60 ? 'text-amber-500' : 'text-emerald-500'}`}>{treaty.used}%</p>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden mb-3">
                <div className={`h-2.5 rounded-full transition-all ${treaty.used > 85 ? 'bg-rose-400' : treaty.used > 60 ? 'bg-amber-400' : 'bg-emerald-400'}`} style={{ width: `${treaty.used}%` }} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {treaty.reinsurers.map((ri, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-md font-medium border border-slate-200 dark:border-slate-700">{ri}</span>
                  ))}
                </div>
                <button className="text-xs font-semibold text-indigo-500 dark:text-indigo-400 hover:underline flex items-center gap-1">
                  View Treaty <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Tab: Bordereaux */}
      {activeTab === 'bordereaux' && (
        <div className="animate-in fade-in duration-300 space-y-4">
          <Card className="p-5 dark:bg-[#0f172a] dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Bot className="w-5 h-5 text-indigo-500" />
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">AI Bordereaux Generator</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              {['Treaty', 'Period', 'Currency'].map((label, i) => (
                <div key={i}>
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">{label}</label>
                  <select className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30">
                    {i === 0 && <><option>FIR-QS-2026</option><option>MOT-XOL-2026</option><option>MAR-XOL-2026</option></>}
                    {i === 1 && <><option>Q1 2026 (Jan–Mar)</option><option>Q2 2026 (Apr–Jun)</option></>}
                    {i === 2 && <><option>TZS</option><option>USD</option></>}
                  </select>
                </div>
              ))}
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm">
              <Sparkles className="w-4 h-4" /> Generate Bordereaux
            </button>
          </Card>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {['FIR-QS-2026 Q1 2026', 'MOT-XOL-2026 Q1 2026'].map((name, i) => (
              <Card key={i} className="p-4 dark:bg-[#0f172a] dark:border-slate-800 shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center shrink-0 border border-indigo-100 dark:border-indigo-800/40">
                  <TrendingUp className="w-5 h-5 text-indigo-500" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900 dark:text-slate-100 text-sm">{name}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">Generated 10 May 2026 · 248 risks</p>
                </div>
                <button className="p-2 text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
