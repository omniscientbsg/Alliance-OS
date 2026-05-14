"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Shield, FileText, TrendingUp, ArrowUpRight, CheckCircle2, Activity, 
  HeartHandshake, Building, Users, AlertTriangle, Banknote, Bot, 
  Sparkles, Zap, ChevronRight, Clock, ArrowRight, Target, 
  TrendingDown, RefreshCw, Command
} from "lucide-react";

type DashboardRole = 'manager' | 'underwriter' | 'claims_handler';

export default function DashboardView() {
  const [role, setRole] = useState<DashboardRole>('manager');
  const [dismissedAlerts, setDismissedAlerts] = useState<number[]>([]);

  const aiAlerts = [
    { id: 1, severity: 'critical', label: 'Aviation XOL treaty at 92% capacity — open Fac facility now', action: 'View Treaty', icon: AlertTriangle, color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-900/20', border: 'border-rose-200 dark:border-rose-800/50' },
    { id: 2, severity: 'high', label: '23 policies lapsing in 7 days — TZS 184M at risk', action: 'View Renewals', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20', border: 'border-amber-200 dark:border-amber-800/50' },
    { id: 3, severity: 'high', label: 'Claim C11/100/1002/2026/011702 — fraud score 87/100, SIU referral recommended', action: 'Open Case', icon: Shield, color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-900/20', border: 'border-rose-200 dark:border-rose-800/50' },
    { id: 4, severity: 'info', label: 'Alliance AI identified 41 motor policies eligible for Zero-Touch renewal', action: 'Auto-Renew', icon: Zap, color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-900/20', border: 'border-indigo-200 dark:border-indigo-800/50' },
  ].filter(a => !dismissedAlerts.includes(a.id));

  return (
    <div className="space-y-6">

      {/* Hero Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Bot className="w-6 h-6 text-indigo-500" />
            Alliance AI — Action Center
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Prescriptive intelligence for Alliance Insurance · Wed 14 May 2026
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700/50 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors">
            <Command className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Open Omnibar</span> <kbd className="text-[10px] font-mono opacity-60">⌘K</kbd>
          </button>
          <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
            {([
              { key: 'manager', label: 'Manager', icon: Building },
              { key: 'underwriter', label: 'UW', icon: Shield },
              { key: 'claims_handler', label: 'Claims', icon: FileText },
            ] as const).map(r => (
              <button key={r.key} onClick={() => setRole(r.key)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md flex items-center gap-1.5 transition-colors ${role === r.key ? 'bg-white dark:bg-slate-700 text-aos-blue dark:text-blue-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'}`}>
                <r.icon className="w-3 h-3" /> {r.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Gross Written Premium', value: 'TZS 1.24B', change: '+12.5%', pos: true, icon: TrendingUp, glow: 'shadow-blue-100 dark:shadow-blue-900/20' },
          { title: 'Active Claims', value: '432', change: '+4.2%', pos: false, icon: FileText, glow: 'shadow-rose-100 dark:shadow-rose-900/20' },
          { title: 'Loss Ratio', value: '48.3%', change: '-2.1%', pos: true, icon: Target, glow: 'shadow-emerald-100 dark:shadow-emerald-900/20' },
          { title: 'Treaty Utilization', value: '68%', change: '+5%', pos: false, icon: HeartHandshake, glow: 'shadow-amber-100 dark:shadow-amber-900/20' },
        ].map((kpi, i) => (
          <Card key={i} className={`shadow-sm dark:bg-[#0f172a] dark:border-slate-800 overflow-hidden relative group hover:shadow-md transition-shadow ${kpi.glow}`}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{kpi.title}</p>
                <kpi.icon className="w-4 h-4 text-slate-300 dark:text-slate-600" />
              </div>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{kpi.value}</p>
              <div className="flex items-center gap-1.5 mt-2">
                {kpi.pos ? <ArrowUpRight className="w-3 h-3 text-emerald-500" /> : <TrendingDown className="w-3 h-3 text-rose-500" />}
                <span className={`text-xs font-semibold ${kpi.pos ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500 dark:text-rose-400'}`}>{kpi.change}</span>
                <span className="text-xs text-slate-400 dark:text-slate-500">vs last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Alliance AI Alerts */}
      {aiAlerts.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">Alliance AI — Prescriptive Alerts</h2>
            <span className="text-xs px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full font-bold border border-indigo-200 dark:border-indigo-700">{aiAlerts.length}</span>
          </div>
          {aiAlerts.map(alert => (
            <div key={alert.id} className={`flex items-center gap-4 px-4 py-3 rounded-xl border ${alert.bg} ${alert.border} group cursor-pointer hover:shadow-sm transition-all animate-in slide-in-from-left-2 duration-300`}>
              <alert.icon className={`w-5 h-5 ${alert.color} shrink-0`} />
              <p className="flex-1 text-sm font-medium text-slate-800 dark:text-slate-200">{alert.label}</p>
              <button className={`shrink-0 flex items-center gap-1.5 text-xs font-semibold ${alert.color} opacity-0 group-hover:opacity-100 transition-opacity`}>
                {alert.action} <ArrowRight className="w-3 h-3" />
              </button>
              <button onClick={() => setDismissedAlerts(prev => [...prev, alert.id])} className="shrink-0 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs px-2 py-1 hover:bg-black/5 rounded transition-colors">×</button>
            </div>
          ))}
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Role Panel — 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {role === 'manager' && <ManagerPanel />}
          {role === 'underwriter' && <UnderwriterPanel />}
          {role === 'claims_handler' && <ClaimsHandlerPanel />}
        </div>

        {/* Right Sidebar — AI Insights + Quick Actions */}
        <div className="space-y-6">

          {/* AI Live Feed */}
          <Card className="dark:bg-[#0f172a] dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 p-4 flex items-center gap-2">
              <Bot className="w-5 h-5 text-white" />
              <div>
                <h3 className="text-sm font-bold text-white">Alliance AI Feed</h3>
                <p className="text-[10px] text-indigo-200">Powered by Alliance AI</p>
              </div>
              <span className="ml-auto flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-50" /><span className="relative inline-flex rounded-full h-2 w-2 bg-white" /></span>
            </div>
            <div className="p-0 divide-y divide-slate-100 dark:divide-slate-800">
              {[
                { time: '2 min ago', text: 'Quote Q2026/1042 auto-rated at TZS 2.4M — within acceptable band', icon: Sparkles, color: 'text-indigo-500' },
                { time: '14 min ago', text: 'STP payment TZS 1.15M disbursed to Sarah Jenkins via M-Pesa', icon: CheckCircle2, color: 'text-emerald-500' },
                { time: '1 hr ago', text: 'Treaty MAR-HULL-XOL passed 90% threshold — alert raised', icon: AlertTriangle, color: 'text-amber-500' },
                { time: '3 hr ago', text: '17 motor policies auto-renewed with no manual intervention', icon: Zap, color: 'text-indigo-500' },
              ].map((entry, i) => (
                <div key={i} className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <entry.icon className={`w-4 h-4 ${entry.color} shrink-0 mt-0.5`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{entry.text}</p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">{entry.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="dark:bg-[#0f172a] dark:border-slate-800 shadow-sm">
            <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800">
              <CardTitle className="text-sm font-bold text-slate-900 dark:text-slate-100">Quick Actions</CardTitle>
            </CardHeader>
            <div className="p-3 grid grid-cols-2 gap-2">
              {[
                { name: 'Issue Policy', icon: Shield, color: 'text-aos-blue', bg: 'bg-aos-blue/10 dark:bg-blue-900/30' },
                { name: 'Register FNOL', icon: FileText, color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-900/20' },
                { name: 'AI Quote', icon: Sparkles, color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-900/20', ai: true },
                { name: 'Bank Receipt', icon: Banknote, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20' },
                { name: 'RI Treaties', icon: HeartHandshake, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
                { name: 'Customers', icon: Users, color: 'text-slate-500', bg: 'bg-slate-100 dark:bg-slate-800' },
              ].map((mod, i) => (
                <button key={i} className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-sm transition-all group relative">
                  {mod.ai && <span className="absolute top-1.5 right-1.5 text-[8px] font-bold bg-indigo-100 dark:bg-indigo-900/50 text-indigo-500 dark:text-indigo-400 px-1 rounded">AI</span>}
                  <div className={`w-9 h-9 rounded-lg ${mod.bg} ${mod.color} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                    <mod.icon className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 text-center">{mod.name}</span>
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function ManagerPanel() {
  return (
    <div className="space-y-6">
      {/* Pending Approvals */}
      <Card className="dark:bg-[#0f172a] dark:border-slate-800 shadow-sm">
        <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
          <CardTitle className="text-sm font-bold flex items-center justify-between text-slate-900 dark:text-slate-100">
            Pending Approvals
            <span className="bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 text-xs px-2 py-0.5 rounded-full font-bold border border-rose-200 dark:border-rose-800/50">7</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {[
            { type: 'Policy', id: 'P11/2026/100/5042', amount: 'TZS 45M', user: 'SARAH-UW', icon: Shield, color: 'text-aos-blue bg-aos-blue/10' },
            { type: 'Settlement', id: 'C11/100/1002/2026/011654', amount: 'TZS 12.5M', user: 'EUGINIA-CL', icon: Banknote, color: 'text-emerald-500 bg-emerald-50' },
            { type: 'Payment', id: 'PVB103-20261', amount: 'USD 434', user: 'SHUKURU-FN', icon: Banknote, color: 'text-amber-500 bg-amber-50' },
          ].map((item, i) => (
            <div key={i} className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer flex items-center gap-3 border-b border-slate-50 dark:border-slate-800/50 last:border-0">
              <div className={`p-1.5 rounded-md dark:opacity-90 ${item.color}`}><item.icon className="w-3.5 h-3.5" /></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">{item.type} — {item.id}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500">{item.user} · {item.amount}</p>
              </div>
              <button className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Renewal Pipeline */}
      <Card className="dark:bg-[#0f172a] dark:border-slate-800 shadow-sm">
        <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
          <CardTitle className="text-sm font-bold text-slate-900 dark:text-slate-100">Renewal Pipeline <span className="font-normal text-slate-400 dark:text-slate-500 ml-1">— next 90 days</span></CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          {[
            { label: 'Next 30 days', count: 142, value: 'TZS 850M', pct: 90, color: 'bg-rose-400' },
            { label: '31–60 days', count: 98, value: 'TZS 620M', pct: 60, color: 'bg-amber-400' },
            { label: '61–90 days', count: 67, value: 'TZS 410M', pct: 40, color: 'bg-blue-400' },
          ].map((b, i) => (
            <div key={i}>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-700 dark:text-slate-300">{b.label}</span>
                <span className="text-slate-400 dark:text-slate-500">{b.count} policies · {b.value}</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                <div className={`h-2 rounded-full ${b.color} progress-bar-fill`} style={{ width: `${b.pct}%` }} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function UnderwriterPanel() {
  return (
    <div className="space-y-6">
      <Card className="dark:bg-[#0f172a] dark:border-slate-800 shadow-sm">
        <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
          <CardTitle className="text-sm font-bold flex items-center justify-between text-slate-900 dark:text-slate-100">
            Awaiting RI Allocation <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-xs px-2 py-0.5 rounded-full font-bold border border-amber-200 dark:border-amber-700">12</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {[
            { policy: 'P11/2026/100/5042', insured: 'Acme Corp', product: 'Motor Commercial', si: 'TZS 1.5B' },
            { policy: 'P11/2026/200/1008', insured: 'Global Industries', product: 'Fire & Perils', si: 'TZS 8.5B' },
            { policy: 'P11/2026/300/4055', insured: 'City Construction', product: 'CAR', si: 'TZS 25B' },
          ].map((p, i) => (
            <div key={i} className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer border-b border-slate-50 dark:border-slate-800/50 last:border-0 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-aos-blue dark:text-blue-400">{p.policy}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{p.insured} — {p.product}</p>
              </div>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{p.si}</span>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card className="dark:bg-[#0f172a] dark:border-slate-800 shadow-sm">
        <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
          <CardTitle className="text-sm font-bold text-slate-900 dark:text-slate-100">Treaty Capacity</CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          {[
            { treaty: 'FIR-2026 (Fire Prop.)', used: 68, capacity: 'TZS 5B' },
            { treaty: 'MOT-XOL-2026', used: 42, capacity: 'TZS 2.5B' },
            { treaty: 'MAR-HULL-XOL', used: 92, capacity: 'TZS 10B' },
            { treaty: 'AVI-SPECIAL', used: 15, capacity: 'TZS 50B' },
          ].map((t, i) => (
            <div key={i}>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-700 dark:text-slate-300">{t.treaty}</span>
                <span className="text-slate-400 dark:text-slate-500">{t.used}% of {t.capacity}</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                <div className={`h-2 rounded-full ${t.used > 80 ? 'bg-rose-400' : t.used > 50 ? 'bg-amber-400' : 'bg-blue-400'}`} style={{ width: `${t.used}%` }} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function ClaimsHandlerPanel() {
  return (
    <div className="space-y-6">
      <Card className="dark:bg-[#0f172a] dark:border-slate-800 shadow-sm">
        <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
          <CardTitle className="text-sm font-bold flex items-center justify-between text-slate-900 dark:text-slate-100">
            My Claims Queue <span className="bg-rose-100 dark:bg-rose-900/30 text-rose-500 text-xs px-2 py-0.5 rounded-full font-bold border border-rose-200 dark:border-rose-800/50">8</span>
          </CardTitle>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Prioritised by fraud score · value · age</p>
        </CardHeader>
        <CardContent className="p-0">
          {[
            { id: 'C11/100/1002/2026/011702', insured: 'John Kimaro', amount: 'TZS 4.5M', fraud: 'High', age: '2d', status: 'Survey Complete' },
            { id: 'C11/100/1002/2026/011654', insured: 'ALBIZIA LIMITED', amount: 'TZS 12.5M', fraud: 'Low', age: '5d', status: 'Assessment' },
            { id: 'C11/100/1002/2026/011698', insured: 'Coastal Motors', amount: 'TZS 800K', fraud: 'Medium', age: '1d', status: 'Registered' },
            { id: 'C11/100/5042/2026/011710', insured: 'Acme Corp', amount: 'TZS 22M', fraud: 'Low', age: '3d', status: 'Under Survey' },
          ].map((c, i) => (
            <div key={i} className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer flex items-center gap-3 border-b border-slate-50 dark:border-slate-800/50 last:border-0">
              <div className={`w-1.5 h-10 rounded-full shrink-0 ${c.fraud === 'High' ? 'bg-rose-400' : c.fraud === 'Medium' ? 'bg-amber-400' : 'bg-emerald-400'}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-aos-blue dark:text-blue-400 truncate">{c.id}</p>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold border shrink-0 ${c.fraud === 'High' ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-500 border-rose-200 dark:border-rose-800/50' : c.fraud === 'Medium' ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-500 border-amber-200 dark:border-amber-700' : 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 border-emerald-200 dark:border-emerald-800/50'}`}>{c.fraud}</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">{c.insured}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{c.amount}</p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500">{c.age} · {c.status}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
