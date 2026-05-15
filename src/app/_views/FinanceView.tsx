"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Briefcase, TrendingUp, RefreshCw, Upload, CheckCircle2, ArrowRight, Download, CreditCard, Building } from 'lucide-react';

export default function FinanceView() {
  const [activeTab, setActiveTab] = useState<'ledger' | 'banking'>('ledger');

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-emerald-600" />
            Finance & General Ledger
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage bank accounts, reconcile MT940 statements, and view the immutable event ledger.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => alert("Exporting General Ledger to CSV...")} className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
            <Download className="w-4 h-4" /> Export
          </button>
          <button onClick={() => alert("Opening MT940 File Upload Dialog...")} className="flex items-center gap-2 px-3 py-2 text-sm font-bold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors shadow-sm">
            <Upload className="w-4 h-4" /> Upload MT940 Statement
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-slate-200 dark:border-slate-800">
        <button 
          onClick={() => setActiveTab('ledger')}
          className={`px-4 py-2 text-sm font-bold border-b-2 transition-colors ${activeTab === 'ledger' ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
        >
          Event Ledger
        </button>
        <button 
          onClick={() => setActiveTab('banking')}
          className={`px-4 py-2 text-sm font-bold border-b-2 transition-colors ${activeTab === 'banking' ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
        >
          Bank Accounts & Reconciliation
        </button>
      </div>

      {/* BANKING TAB */}
      {activeTab === 'banking' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Bank Accounts Grid */}
            <div className="md:col-span-2 space-y-4">
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Building className="w-4 h-4 text-emerald-600" /> Active Corporate Accounts
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { bank: 'CRDB Bank', acc: '01J2039948201', curr: 'TZS', bal: '4,250,800,000', status: 'Reconciled Today' },
                  { bank: 'NMB Bank', acc: '440192837411', curr: 'TZS', bal: '1,890,250,000', status: 'Pending Statements' },
                  { bank: 'Exim Bank', acc: '0300174019', curr: 'USD', bal: '1,450,200', status: 'Reconciled Yesterday' },
                  { bank: 'Vodacom M-Pesa', acc: 'Till: 882910', curr: 'TZS', bal: '45,200,000', status: 'Live API Sync' },
                ].map((b, i) => (
                  <Card key={i} className="p-4 bg-white dark:bg-[#0f172a] border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-300 transition-colors cursor-pointer group">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 transition-colors">{b.bank}</p>
                        <p className="text-xs font-mono text-slate-500">{b.acc}</p>
                      </div>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded uppercase bg-slate-100 dark:bg-slate-800 text-slate-500">{b.curr}</span>
                    </div>
                    <div className="flex justify-between items-end">
                      <p className="text-xl font-bold font-mono text-slate-900 dark:text-slate-100">{b.bal}</p>
                      <p className="text-[10px] text-slate-400">{b.status}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* AI Reconciliation Queue */}
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-indigo-500" /> MT940 AI Reconciliation Queue
              </h2>
              {[
                { stmt: 'Incoming: CRDB Bank', amt: 'TZS 1,450,000', match: 'Inv #INV-2026-992 (John Kimaro)', conf: 98 },
                { stmt: 'Incoming: NMB', amt: 'USD 4,200', match: 'Inv #INV-2026-104 (Acme Corp)', conf: 92 },
                { stmt: 'Incoming: M-Pesa', amt: 'TZS 45,000', match: 'Unknown (Multiple matches)', conf: 41, warn: true },
              ].map((r, i) => (
                <Card key={i} className={`p-4 border shadow-sm ${r.warn ? 'border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/10' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a]'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase">{r.stmt}</span>
                    <span className="font-bold font-mono text-slate-900 dark:text-slate-100">{r.amt}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm mb-3">
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                    <span className={r.warn ? 'text-amber-600' : 'text-indigo-600 dark:text-indigo-400 font-medium'}>{r.match}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${r.warn ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>{r.conf}% Match</span>
                    {!r.warn && <button onClick={() => alert("Reconciliation match confirmed and logged to ledger.")} className="text-xs bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 shadow-sm transition-colors">Accept Match</button>}
                    {r.warn && <button onClick={() => alert("Opening manual review workspace...")} className="text-xs bg-white border border-slate-200 text-slate-700 px-3 py-1 rounded hover:bg-slate-50 shadow-sm transition-colors">Manual Review</button>}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* LEDGER TAB */}
      {activeTab === 'ledger' && (
        <Card className="bg-white dark:bg-[#0f172a] border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden animate-in fade-in duration-300">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">Live Immutable Event Ledger</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
              <thead className="bg-slate-50 dark:bg-slate-900/50 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-4 py-3">Timestamp</th>
                  <th className="px-4 py-3">Ref / Event</th>
                  <th className="px-4 py-3">Debit</th>
                  <th className="px-4 py-3">Credit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                {[
                  { time: '10:42:15', ref: 'RVB103-20261', event: 'Premium Collection', db: 'TZS 1,450,000', cr: '-' },
                  { time: '10:41:02', ref: 'C11/011702', event: 'Claim Reserve Allocation', db: 'TZS 1,200,000', cr: '-' },
                  { time: '09:15:30', ref: 'PVB103-20264', event: 'Claim Payout (M-Pesa)', db: '-', cr: 'TZS 450,000' },
                  { time: '08:05:11', ref: 'RVB103-20260', event: 'Premium Collection (USD)', db: 'USD 4,200', cr: '-' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                    <td className="px-4 py-3 text-xs text-slate-400 font-mono">{row.time}</td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-slate-900 dark:text-slate-100">{row.ref}</p>
                      <p className="text-[10px] text-slate-500">{row.event}</p>
                    </td>
                    <td className="px-4 py-3 text-emerald-600 font-medium font-mono">{row.db}</td>
                    <td className="px-4 py-3 text-rose-500 font-medium font-mono">{row.cr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

    </div>
  );
}