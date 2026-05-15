"use client";

import React from 'react';
import { Card } from '@/components/ui/card';
import { HeartHandshake, AlertTriangle, Shield, CheckCircle2 } from 'lucide-react';

export default function ReinsuranceView() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <HeartHandshake className="w-6 h-6 text-indigo-500" />
            Reinsurance & Treaties
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time proportional and non-proportional (XOL) treaty management.
          </p>
        </div>
        <button className="flex items-center gap-2 px-3 py-2 text-sm font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
          Generate Bordereaux
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Proportional Treaties */}
        <Card className="p-6 bg-white dark:bg-[#0f172a] border-slate-200 dark:border-slate-800 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
            <Shield className="w-5 h-5 text-aos-blue" /> Proportional Treaties
          </h2>
          <div className="space-y-6">
            {[
              { name: 'FIR-2026 (Fire Surplus)', used: 'TZS 3.4B', cap: 'TZS 5.0B', pct: 68 },
              { name: 'MOT-QS-2026 (Motor Quota Share)', used: 'TZS 1.2B', cap: 'TZS 2.5B', pct: 48 },
              { name: 'ENG-2026 (Engineering)', used: 'TZS 8.5B', cap: 'TZS 10.0B', pct: 85, warn: true },
            ].map((t, i) => (
              <div key={i}>
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.used} / {t.cap}</p>
                  </div>
                  <span className={`text-xs font-bold ${t.warn ? 'text-amber-500' : 'text-emerald-500'}`}>{t.pct}% Utilized</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                  <div className={`h-full rounded-full ${t.warn ? 'bg-amber-500' : 'bg-aos-blue'}`} style={{ width: `${t.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Non-Proportional Treaties */}
        <Card className="p-6 bg-white dark:bg-[#0f172a] border-slate-200 dark:border-slate-800 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-500" /> Non-Proportional (XOL)
          </h2>
          <div className="space-y-6">
            {[
              { name: 'MAR-HULL-XOL', layer: 'Layer 1: 800M xs 90M', status: 'Active', burn: '14.2%' },
              { name: 'AVIATION-XOL', layer: 'Layer 2: 3B xs 800M', status: 'Warning', burn: '82.5%', warn: true },
            ].map((t, i) => (
              <div key={i} className={`p-4 rounded-xl border ${t.warn ? 'border-rose-200 bg-rose-50 dark:border-rose-900/50 dark:bg-rose-900/10' : 'border-slate-100 dark:border-slate-800'}`}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{t.name}</p>
                    <p className="text-xs font-mono text-slate-500 mt-1">{t.layer}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${t.warn ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>{t.status}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Burning Cost Ratio:</span>
                  <span className={`font-bold ${t.warn ? 'text-rose-600' : 'text-slate-900 dark:text-slate-100'}`}>{t.burn}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Live Allocation Feed */}
        <Card className="lg:col-span-2 bg-white dark:bg-[#0f172a] border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">Live Auto-Allocations</h2>
            <span className="text-xs text-emerald-500 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5"/> Event Bus Active</span>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              <div className="flex items-center gap-4 text-sm p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <span className="text-slate-400 font-mono text-xs">10:45 AM</span>
                <span className="font-semibold text-slate-900 dark:text-slate-100">P11/2026/100/5042</span>
                <span className="text-slate-500 text-xs flex-1">Gross: TZS 1.45M</span>
                <span className="text-emerald-600 font-medium text-xs">MOT-QS: 40% Ceded</span>
              </div>
              <div className="flex items-center gap-4 text-sm p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <span className="text-slate-400 font-mono text-xs">10:38 AM</span>
                <span className="font-semibold text-slate-900 dark:text-slate-100">P11/2026/100/1008</span>
                <span className="text-slate-500 text-xs flex-1">Gross: TZS 15.2M</span>
                <span className="text-aos-blue font-medium text-xs">FIR-2026: 80% Ceded (Surplus)</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}