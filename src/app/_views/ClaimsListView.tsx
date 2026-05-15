"use client";

import React from 'react';
import Link from 'next/link';
import { FileText, Search, Filter, Shield, AlertTriangle, CheckCircle2, Bot, MapPin, Calendar, Activity } from 'lucide-react';
import { Card } from '@/components/ui/card';

const MOCK_CLAIMS = [
  { id: 'C11/100/1002/2026/011702', insured: 'John Kimaro', product: 'Motor Comprehensive', amount: 'TZS 1,200,000', fraud: 'Low', status: 'Assessment Pending', date: '14 May 2026', triage: 'AI Extracted' },
  { id: 'C11/100/1002/2026/011698', insured: 'Coastal Motors', product: 'Motor Fleet', amount: 'TZS 800,000', fraud: 'Medium', status: 'Survey Required', date: '12 May 2026', triage: 'Manual' },
  { id: 'C11/100/5042/2026/011710', insured: 'Acme Corp', product: 'Fire & Perils', amount: 'TZS 22,500,000', fraud: 'Low', status: 'Under Survey', date: '11 May 2026', triage: 'Manual' },
  { id: 'C11/100/1002/2026/011715', insured: 'Sarah Jenkins', product: 'Motor Comprehensive', amount: 'TZS 450,000', fraud: 'High', status: 'SIU Investigation', date: '10 May 2026', triage: 'AI Flagged' },
];

export default function ClaimsListView() {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Activity className="w-6 h-6 text-indigo-500" />
            Claims Operations
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage, triage, and assess incoming claims.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search claims..." 
              className="pl-9 pr-4 py-2 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-900 dark:text-slate-100 w-64"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-sm font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
            <FileText className="w-4 h-4" /> New Claim
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Open Claims', value: '432', sub: '+12 this week' },
          { label: 'AI Auto-Triaged', value: '84%', sub: 'Last 30 days', color: 'text-indigo-500' },
          { label: 'Avg Cycle Time', value: '2.4 days', sub: '-1.1 days vs LY', color: 'text-emerald-500' },
          { label: 'SIU Referrals', value: '14', sub: 'Action required', color: 'text-rose-500' },
        ].map((kpi, i) => (
          <Card key={i} className="p-4 bg-white dark:bg-[#0f172a] border-slate-200 dark:border-slate-800 shadow-sm">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{kpi.label}</p>
            <p className={`text-2xl font-bold ${kpi.color || 'text-slate-900 dark:text-slate-100'}`}>{kpi.value}</p>
            <p className="text-[10px] text-slate-400 mt-1">{kpi.sub}</p>
          </Card>
        ))}
      </div>

      {/* Claims Data Grid */}
      <Card className="bg-white dark:bg-[#0f172a] border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-900/50 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3">Claim Ref</th>
                <th className="px-4 py-3">Insured / Product</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Reserve</th>
                <th className="px-4 py-3">Fraud Score</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
              {MOCK_CLAIMS.map((claim, i) => (
                <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors group">
                  <td className="px-4 py-3">
                    <Link href={`/claims/${claim.id.replace(/\//g, '-')}`} className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                      {claim.id}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-slate-900 dark:text-slate-100">{claim.insured}</p>
                    <p className="text-[10px] text-slate-400">{claim.product}</p>
                  </td>
                  <td className="px-4 py-3 text-xs">{claim.date}</td>
                  <td className="px-4 py-3 font-medium">{claim.amount}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      claim.fraud === 'High' ? 'bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-900/20 dark:border-rose-800' :
                      claim.fraud === 'Medium' ? 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800' :
                      'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800'
                    }`}>
                      {claim.fraud === 'High' && <AlertTriangle className="w-3 h-3" />}
                      {claim.fraud}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                      <span className="text-xs font-medium">{claim.status}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Link 
                      href={`/claims/${claim.id.replace(/\//g, '-')}`}
                      className="text-xs font-bold text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity hover:underline"
                    >
                      Open Canvas →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}