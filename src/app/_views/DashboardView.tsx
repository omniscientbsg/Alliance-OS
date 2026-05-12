"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Shield, FileText, TrendingUp, AlertCircle, ArrowUpRight, Clock, CheckCircle2, Activity, HeartHandshake, FileCheck, Building, PieChart, Users, AlertTriangle, Banknote, RefreshCw, Search, Eye
} from "lucide-react";

type DashboardRole = 'manager' | 'underwriter' | 'claims_handler';

export default function DashboardView() {
  const [role, setRole] = useState<DashboardRole>('manager');

  return (
    <div className="space-y-6">
      {/* Header + Role Switcher */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Mission Control</h1>
          <p className="text-sm text-slate-500 mt-1">Welcome back. Here&apos;s what&apos;s happening across the Alliance network today.</p>
        </div>
        <div className="flex gap-2 bg-slate-100 p-1 rounded-lg">
          {([
            { key: 'manager', label: 'Manager', icon: Building },
            { key: 'underwriter', label: 'Underwriter', icon: Shield },
            { key: 'claims_handler', label: 'Claims Handler', icon: FileText },
          ] as const).map(r => (
            <button key={r.key} onClick={() => setRole(r.key)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md flex items-center gap-1.5 transition-colors ${role === r.key ? 'bg-white text-aos-blue shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>
              <r.icon className="w-3.5 h-3.5" /> {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards — always visible */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Gross Written Premium" value="TZS 1.24B" change="+12.5%" positive icon={Shield} />
        <KPICard title="Active Claims" value="432" subtitle="pending" change="+4.2%" positive={false} icon={FileText} />
        <KPICard title="Treaty Utilization" value="68%" progress={68} icon={HeartHandshake} />
        <Card className="shadow-sm overflow-hidden relative bg-gradient-to-br from-aos-navy to-aos-navy-light text-white border-transparent">
          <CardContent className="p-5">
            <div className="flex justify-between items-start mb-4">
              <p className="text-sm font-medium text-slate-300">System Health</p>
              <span className="flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-aos-emerald opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-aos-emerald" /></span>
            </div>
            <div className="flex items-center gap-3">
              <Activity className="w-8 h-8 text-aos-emerald" />
              <div><h3 className="text-xl font-bold text-white">Optimal</h3><p className="text-xs text-slate-400">All services operational</p></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ROLE-SPECIFIC PANELS */}
      {role === 'manager' && <ManagerPanel />}
      {role === 'underwriter' && <UnderwriterPanel />}
      {role === 'claims_handler' && <ClaimsHandlerPanel />}

      {/* Quick Access Modules */}
      <div>
        <h2 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wider">Operational Modules</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {[
            { name: "Policy Issuance", icon: Shield, color: "text-aos-blue", bg: "bg-aos-blue/10" },
            { name: "Claims FNOL", icon: FileText, color: "text-aos-rose", bg: "bg-aos-rose/10" },
            { name: "RI Treaties", icon: HeartHandshake, color: "text-aos-emerald", bg: "bg-aos-emerald/10" },
            { name: "Bank Receipts", icon: TrendingUp, color: "text-aos-amber", bg: "bg-aos-amber/10" },
            { name: "Master Setup", icon: Building, color: "text-slate-600", bg: "bg-slate-100" },
            { name: "Reports", icon: PieChart, color: "text-aos-violet", bg: "bg-aos-violet/10" },
          ].map((mod, i) => (
            <button key={i} className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-200 bg-white hover:border-aos-blue/30 hover:shadow-md transition-all group">
              <div className={`w-10 h-10 rounded-lg ${mod.bg} ${mod.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <mod.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-slate-700 text-center">{mod.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── KPI Card ─── */
function KPICard({ title, value, subtitle, change, positive, progress, icon: Icon }: { title: string; value: string; subtitle?: string; change?: string; positive?: boolean; progress?: number; icon: React.ElementType }) {
  return (
    <Card className="shadow-sm overflow-hidden relative">
      <div className="absolute top-0 right-0 p-4 opacity-5"><Icon className="w-16 h-16" /></div>
      <CardContent className="p-5">
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <div className="flex items-baseline gap-2"><h3 className="text-2xl font-bold">{value}</h3>{subtitle && <span className="text-sm text-slate-500 font-medium">{subtitle}</span>}</div>
        {change && (
          <div className="flex items-center gap-1 mt-3 text-sm">
            <span className={`flex items-center font-medium px-1.5 py-0.5 rounded ${positive ? 'text-aos-emerald bg-aos-emerald/10' : 'text-aos-rose bg-aos-rose/10'}`}>
              <ArrowUpRight className="w-3 h-3 mr-0.5" /> {change}
            </span>
            <span className="text-slate-400">vs last month</span>
          </div>
        )}
        {progress !== undefined && (
          <div className="mt-3">
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden"><div className="bg-aos-blue h-1.5 rounded-full progress-bar-fill" style={{ width: `${progress}%` }} /></div>
            <p className="text-xs text-slate-400 mt-1">Fire & Marine Treaties</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/* ═══ MANAGER PANEL ═══ */
function ManagerPanel() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Pending Approvals */}
      <Card className="shadow-sm border-slate-200">
        <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50">
          <CardTitle className="text-base font-semibold flex items-center justify-between">
            Pending Approvals
            <span className="bg-aos-rose/10 text-aos-rose text-xs px-2 py-0.5 rounded-full font-bold">7</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100">
            {[
              { type: 'Policy', id: 'P11/2026/100/5042', amount: 'TZS 45M', user: 'SARAH-UW', icon: Shield, color: 'text-aos-blue bg-aos-blue/10' },
              { type: 'Settlement', id: 'C11/100/1002/2026/011654', amount: 'TZS 12.5M', user: 'EUGINIA-CL', icon: Banknote, color: 'text-aos-emerald bg-aos-emerald/10' },
              { type: 'Payment', id: 'PVB103-20261', amount: 'USD 434', user: 'SHUKURU-FN', icon: Banknote, color: 'text-aos-amber bg-aos-amber/10' },
            ].map((item, i) => (
              <div key={i} className="p-3 hover:bg-slate-50 cursor-pointer flex items-center gap-3">
                <div className={`p-1.5 rounded-md ${item.color}`}><item.icon className="w-3.5 h-3.5" /></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.type} — {item.id}</p>
                  <p className="text-xs text-slate-400">{item.user} • {item.amount}</p>
                </div>
                <button className="p-1 rounded bg-aos-emerald/10 text-aos-emerald hover:bg-aos-emerald/20"><CheckCircle2 className="w-3.5 h-3.5" /></button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Renewal Pipeline */}
      <Card className="shadow-sm border-slate-200">
        <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50">
          <CardTitle className="text-base font-semibold">Renewal Pipeline</CardTitle>
          <CardDescription>Policies expiring — next 90 days</CardDescription>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          {[
            { label: 'Next 30 days', count: 142, value: 'TZS 850M', pct: 90, color: 'bg-aos-rose' },
            { label: '31–60 days', count: 98, value: 'TZS 620M', pct: 60, color: 'bg-aos-amber' },
            { label: '61–90 days', count: 67, value: 'TZS 410M', pct: 40, color: 'bg-aos-blue' },
          ].map((bucket, i) => (
            <div key={i}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-slate-700">{bucket.label}</span>
                <span className="text-slate-500">{bucket.count} policies • {bucket.value}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className={`h-2 rounded-full ${bucket.color} progress-bar-fill`} style={{ width: `${bucket.pct}%` }} />
              </div>
            </div>
          ))}
          <div className="pt-2 border-t border-slate-100 flex justify-between items-center">
            <span className="text-xs text-slate-500">Total: 307 policies, TZS 1.88B</span>
            <button className="text-xs font-semibold text-aos-blue hover:underline">View All →</button>
          </div>
        </CardContent>
      </Card>

      {/* Outstanding Premiums by Broker */}
      <Card className="shadow-sm border-slate-200">
        <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50">
          <CardTitle className="text-base font-semibold">Outstanding Premiums</CardTitle>
          <CardDescription>Top overdue by broker</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100">
            {[
              { broker: 'Howden Puri', amount: 'TZS 245M', days: '60+ days', severity: 'high' },
              { broker: 'AON Tanzania', amount: 'TZS 180M', days: '45 days', severity: 'medium' },
              { broker: 'Marsh Ltd', amount: 'TZS 92M', days: '30 days', severity: 'low' },
              { broker: 'Willis Towers', amount: 'TZS 78M', days: '21 days', severity: 'low' },
            ].map((row, i) => (
              <div key={i} className="p-3 flex items-center gap-3 hover:bg-slate-50">
                <div className={`w-2 h-2 rounded-full ${row.severity === 'high' ? 'bg-aos-rose' : row.severity === 'medium' ? 'bg-aos-amber' : 'bg-aos-blue'}`} />
                <div className="flex-1">
                  <p className="text-sm font-medium">{row.broker}</p>
                  <p className="text-xs text-slate-400">{row.days}</p>
                </div>
                <span className="text-sm font-bold text-slate-900">{row.amount}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Claims Funnel — full width */}
      <Card className="shadow-sm border-slate-200 lg:col-span-2">
        <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50">
          <CardTitle className="text-base font-semibold">Claims Pipeline</CardTitle>
          <CardDescription>Active claims by processing stage</CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex items-end justify-between gap-2 h-40">
            {[
              { stage: 'Registered', count: 142, pct: 100, color: 'bg-aos-blue' },
              { stage: 'Under Survey', count: 89, pct: 63, color: 'bg-aos-violet' },
              { stage: 'Assessment', count: 67, pct: 47, color: 'bg-aos-amber' },
              { stage: 'Settlement', count: 45, pct: 32, color: 'bg-aos-emerald' },
              { stage: 'Closed', count: 89, pct: 63, color: 'bg-slate-300' },
            ].map((s, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-lg font-bold text-slate-900">{s.count}</span>
                <div className={`w-full ${s.color} rounded-t-md transition-all`} style={{ height: `${s.pct}%` }} />
                <span className="text-[10px] font-medium text-slate-500 text-center">{s.stage}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Alerts */}
      <Card className="shadow-sm border-slate-200">
        <CardHeader className="pb-3 border-b border-slate-100 bg-aos-rose/5">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-aos-rose" /> AI Alerts
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100">
            {[
              { alert: 'High fraud score on C11/100/1002/2026/011702', type: 'Fraud', severity: 'high' },
              { alert: 'Aviation XOL treaty at 92% capacity', type: 'Treaty Limit', severity: 'high' },
              { alert: '23 renewals lapsing within 7 days', type: 'Renewal', severity: 'medium' },
            ].map((a, i) => (
              <div key={i} className="p-3 flex items-start gap-3 hover:bg-slate-50 cursor-pointer">
                <div className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${a.severity === 'high' ? 'bg-aos-rose' : 'bg-aos-amber'}`} />
                <div>
                  <p className="text-sm font-medium text-slate-800">{a.alert}</p>
                  <span className="text-[10px] font-medium text-slate-400">{a.type}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* ═══ UNDERWRITER PANEL ═══ */
function UnderwriterPanel() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="shadow-sm border-slate-200">
        <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50">
          <CardTitle className="text-base font-semibold flex items-center justify-between">Awaiting RI Allocation <span className="bg-aos-amber/10 text-aos-amber text-xs px-2 py-0.5 rounded-full font-bold">12</span></CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100">
            {[
              { policy: 'P11/2026/100/5042', insured: 'Acme Corp', product: 'Motor Commercial', si: 'TZS 1.5B' },
              { policy: 'P11/2026/200/1008', insured: 'Global Industries', product: 'Fire & Perils', si: 'TZS 8.5B' },
              { policy: 'P11/2026/300/4055', insured: 'City Construction', product: 'CAR', si: 'TZS 25B' },
            ].map((p, i) => (
              <div key={i} className="p-3 hover:bg-slate-50 cursor-pointer">
                <p className="text-sm font-medium text-aos-blue">{p.policy}</p>
                <p className="text-xs text-slate-600">{p.insured} — {p.product}</p>
                <p className="text-xs text-slate-400 mt-1">SI: {p.si}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm border-slate-200">
        <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50">
          <CardTitle className="text-base font-semibold">Treaty Capacity</CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          {[
            { treaty: 'FIR-2026 (Fire Prop.)', used: 68, capacity: 'TZS 5B' },
            { treaty: 'MOT-XOL-2026', used: 42, capacity: 'TZS 2.5B' },
            { treaty: 'MAR-HULL-XOL', used: 92, capacity: 'TZS 10B' },
            { treaty: 'AVI-SPECIAL', used: 15, capacity: 'TZS 50B' },
          ].map((t, i) => (
            <div key={i}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-slate-700 text-xs">{t.treaty}</span>
                <span className="text-xs text-slate-500">{t.used}% of {t.capacity}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className={`h-2 rounded-full ${t.used > 80 ? 'bg-aos-rose' : t.used > 50 ? 'bg-aos-amber' : 'bg-aos-blue'}`} style={{ width: `${t.used}%` }} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="shadow-sm border-slate-200">
        <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50">
          <CardTitle className="text-base font-semibold flex items-center justify-between">Large Risk Queue <span className="bg-aos-blue/10 text-aos-blue text-xs px-2 py-0.5 rounded-full font-bold">4</span></CardTitle>
          <CardDescription>SI above TZS 5B threshold</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100">
            {[
              { insured: 'City Construction', si: 'TZS 25B', product: 'CAR' },
              { insured: 'Precision Air', si: 'TZS 18B', product: 'Aviation' },
              { insured: 'TANESCO', si: 'TZS 12B', product: 'Fire' },
              { insured: 'Global Industries', si: 'TZS 8.5B', product: 'Fire & AP' },
            ].map((r, i) => (
              <div key={i} className="p-3 hover:bg-slate-50 cursor-pointer flex justify-between items-center">
                <div><p className="text-sm font-medium">{r.insured}</p><p className="text-xs text-slate-400">{r.product}</p></div>
                <span className="text-sm font-bold text-slate-900">{r.si}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* ═══ CLAIMS HANDLER PANEL ═══ */
function ClaimsHandlerPanel() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="shadow-sm border-slate-200 lg:col-span-2">
        <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50">
          <CardTitle className="text-base font-semibold flex items-center justify-between">My Claims Queue <span className="bg-aos-rose/10 text-aos-rose text-xs px-2 py-0.5 rounded-full font-bold">8</span></CardTitle>
          <CardDescription>Prioritised by fraud score + value + age</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100">
            {[
              { id: 'C11/100/1002/2026/011702', insured: 'John Kimaro', vehicle: 'T412 EFZ', amount: 'TZS 4.5M', fraud: 'High', age: '2d', status: 'Survey Complete' },
              { id: 'C11/100/1002/2026/011654', insured: 'ALBIZIA LIMITED', vehicle: 'T882 CDF', amount: 'TZS 12.5M', fraud: 'Low', age: '5d', status: 'Assessment' },
              { id: 'C11/100/1002/2026/011698', insured: 'Coastal Motors', vehicle: 'T115 BGH', amount: 'TZS 800K', fraud: 'Medium', age: '1d', status: 'Registered' },
              { id: 'C11/100/5042/2026/011710', insured: 'Acme Corp', vehicle: 'T998 XYZ', amount: 'TZS 22M', fraud: 'Low', age: '3d', status: 'Under Survey' },
            ].map((c, i) => (
              <div key={i} className="p-3 hover:bg-slate-50 cursor-pointer flex items-center gap-3">
                <div className={`w-2 h-8 rounded-full ${c.fraud === 'High' ? 'bg-aos-rose' : c.fraud === 'Medium' ? 'bg-aos-amber' : 'bg-aos-emerald'}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-aos-blue">{c.id}</p>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold border ${c.fraud === 'High' ? 'bg-aos-rose/10 text-aos-rose border-aos-rose/20' : c.fraud === 'Medium' ? 'bg-aos-amber/10 text-aos-amber border-aos-amber/20' : 'bg-aos-emerald/10 text-aos-emerald border-aos-emerald/20'}`}>
                      {c.fraud} Risk
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">{c.insured} — {c.vehicle}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold">{c.amount}</p>
                  <p className="text-[10px] text-slate-400">{c.age} old • {c.status}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50">
            <CardTitle className="text-base font-semibold">Pending Surveys</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            {[
              { surveyor: 'James Mwenda', claims: 3, overdue: 1 },
              { surveyor: 'Grace Mbeki', claims: 2, overdue: 0 },
            ].map((s, i) => (
              <div key={i} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                <div><p className="text-sm font-medium">{s.surveyor}</p><p className="text-xs text-slate-400">{s.claims} assigned</p></div>
                {s.overdue > 0 && <span className="text-[10px] px-2 py-0.5 bg-aos-rose/10 text-aos-rose rounded-full font-bold">{s.overdue} overdue</span>}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200">
          <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50">
            <CardTitle className="text-base font-semibold flex items-center justify-between">Ready for Settlement <span className="bg-aos-emerald/10 text-aos-emerald text-xs px-2 py-0.5 rounded-full font-bold">5</span></CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {[
                { id: 'C11/100/1002/2026/011630', amount: 'TZS 2.1M' },
                { id: 'C11/100/1002/2026/011645', amount: 'TZS 890K' },
                { id: 'C11/100/5042/2026/011688', amount: 'TZS 5.4M' },
              ].map((c, i) => (
                <div key={i} className="p-3 flex justify-between items-center hover:bg-slate-50 cursor-pointer">
                  <span className="text-sm font-medium text-aos-blue">{c.id}</span>
                  <span className="text-sm font-bold">{c.amount}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
