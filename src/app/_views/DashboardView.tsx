"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Shield, 
  FileText, 
  TrendingUp, 
  AlertCircle, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  CheckCircle2,
  Activity,
  HeartHandshake,
  FileCheck,
  Building,
  PieChart
} from "lucide-react";

export default function DashboardView() {
  return (
    <div className="space-y-6">
      {/* Welcome & Global Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Mission Control</h1>
          <p className="text-sm text-slate-500 mt-1">Welcome back. Here's what's happening across the Alliance network today.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
            Generate Report
          </button>
          <button className="px-4 py-2 bg-aos-blue text-white rounded-lg text-sm font-medium hover:bg-aos-blue/90 transition-colors shadow-sm shadow-aos-blue/20">
            + New Transaction
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <Card className="shadow-sm overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Shield className="w-16 h-16" />
          </div>
          <CardContent className="p-5">
            <p className="text-sm font-medium text-slate-500 mb-1">Gross Written Premium</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-bold">TZS 1.24B</h3>
            </div>
            <div className="flex items-center gap-1 mt-3 text-sm">
              <span className="flex items-center text-aos-emerald font-medium bg-aos-emerald/10 px-1.5 py-0.5 rounded">
                <ArrowUpRight className="w-3 h-3 mr-0.5" /> 12.5%
              </span>
              <span className="text-slate-400">vs last month</span>
            </div>
          </CardContent>
        </Card>

        {/* KPI 2 */}
        <Card className="shadow-sm overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <FileText className="w-16 h-16" />
          </div>
          <CardContent className="p-5">
            <p className="text-sm font-medium text-slate-500 mb-1">Active Claims</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-bold">432</h3>
              <span className="text-sm text-slate-500 font-medium">pending</span>
            </div>
            <div className="flex items-center gap-1 mt-3 text-sm">
              <span className="flex items-center text-aos-rose font-medium bg-aos-rose/10 px-1.5 py-0.5 rounded">
                <ArrowUpRight className="w-3 h-3 mr-0.5" /> 4.2%
              </span>
              <span className="text-slate-400">vs last month</span>
            </div>
          </CardContent>
        </Card>

        {/* KPI 3 */}
        <Card className="shadow-sm overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <HeartHandshake className="w-16 h-16" />
          </div>
          <CardContent className="p-5">
            <p className="text-sm font-medium text-slate-500 mb-1">Treaty Capacity Utilization</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-bold">68%</h3>
            </div>
            <div className="mt-3">
              <div className="w-full bg-slate-100 rounded-full h-1.5 mb-1 overflow-hidden">
                <div className="bg-aos-blue h-1.5 rounded-full progress-bar-fill" style={{ width: '68%' }}></div>
              </div>
              <p className="text-xs text-slate-400">Fire & Marine Treaties</p>
            </div>
          </CardContent>
        </Card>

        {/* KPI 4 */}
        <Card className="shadow-sm overflow-hidden relative bg-gradient-to-br from-aos-navy to-aos-navy-light text-white border-transparent">
          <CardContent className="p-5">
            <div className="flex justify-between items-start mb-4">
              <p className="text-sm font-medium text-slate-300">System Health</p>
              <span className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-aos-emerald opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-aos-emerald"></span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Activity className="w-8 h-8 text-aos-emerald" />
              <div>
                <h3 className="text-xl font-bold text-white">Optimal</h3>
                <p className="text-xs text-slate-400">All services operational</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Area */}
        <Card className="lg:col-span-2 shadow-sm border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <CardTitle className="text-base font-semibold">Premium vs Claims Trend</CardTitle>
              <CardDescription>Trailing 6 months (TZS Billions)</CardDescription>
            </div>
            <select className="text-xs border border-slate-200 rounded-md bg-white text-slate-700 px-2 py-1 outline-none focus:ring-2 focus:ring-aos-blue/20">
              <option>All Branches</option>
              <option>Dar Es Salaam</option>
              <option>Arusha</option>
            </select>
          </CardHeader>
          <CardContent>
            {/* Custom CSS Bar Chart */}
            <div className="h-[250px] mt-4 flex items-end gap-2 md:gap-6 px-2 chart-grid relative pt-4">
              
              {/* Y-Axis Labels */}
              <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[10px] text-slate-400 py-2">
                <span>1.5B</span>
                <span>1.0B</span>
                <span>0.5B</span>
                <span>0</span>
              </div>

              {[
                { month: 'Oct', premium: 85, claims: 45 },
                { month: 'Nov', premium: 92, claims: 52 },
                { month: 'Dec', premium: 78, claims: 65 },
                { month: 'Jan', premium: 110, claims: 48 },
                { month: 'Feb', premium: 95, claims: 42 },
                { month: 'Mar', premium: 124, claims: 58 },
              ].map((data, i) => (
                <div key={i} className="flex-1 flex flex-col items-center justify-end h-full group ml-8">
                  <div className="flex items-end gap-1 w-full justify-center h-[calc(100%-24px)] relative">
                    {/* Tooltip on hover */}
                    <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[10px] p-2 rounded shadow-lg pointer-events-none z-10 whitespace-nowrap">
                      <p>Premium: {(data.premium * 0.01).toFixed(2)}B</p>
                      <p className="text-aos-rose-400">Claims: {(data.claims * 0.01).toFixed(2)}B</p>
                    </div>
                    {/* Premium Bar */}
                    <div 
                      className="w-1/3 max-w-[24px] bg-aos-blue rounded-t-sm transition-all duration-500 ease-out group-hover:brightness-110" 
                      style={{ height: `${data.premium}%` }}
                    ></div>
                    {/* Claims Bar */}
                    <div 
                      className="w-1/3 max-w-[24px] bg-slate-200 group-hover:bg-aos-rose/80 rounded-t-sm transition-all duration-500 ease-out" 
                      style={{ height: `${data.claims}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-slate-500 mt-2 font-medium">{data.month}</span>
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-aos-blue"></div>
                <span className="text-xs text-slate-600 font-medium">GWP</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-slate-200"></div>
                <span className="text-xs text-slate-600 font-medium">Claims Incurred</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Priority Action Queue */}
        <Card className="shadow-sm border-slate-200 flex flex-col">
          <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50">
            <CardTitle className="text-base font-semibold flex items-center justify-between">
              Priority Actions
              <span className="bg-aos-rose/10 text-aos-rose text-xs px-2 py-0.5 rounded-full font-bold">5 pending</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex-1 overflow-y-auto">
            <div className="divide-y divide-slate-100">
              
              <div className="p-4 hover:bg-slate-50 transition-colors cursor-pointer group">
                <div className="flex gap-3">
                  <div className="mt-0.5 bg-aos-amber/10 p-1.5 rounded-md text-aos-amber shrink-0 group-hover:bg-aos-amber group-hover:text-white transition-colors">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-0.5 group-hover:text-aos-blue transition-colors">Approve RI Allocation</p>
                    <p className="text-xs text-slate-500 mb-2">Policy P11/2025/100/5042 requires manual facultative override.</p>
                    <span className="text-[10px] font-medium text-slate-400">2 hours ago • Underwriting</span>
                  </div>
                </div>
              </div>

              <div className="p-4 hover:bg-slate-50 transition-colors cursor-pointer group">
                <div className="flex gap-3">
                  <div className="mt-0.5 bg-aos-blue/10 p-1.5 rounded-md text-aos-blue shrink-0 group-hover:bg-aos-blue group-hover:text-white transition-colors">
                    <FileCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-0.5 group-hover:text-aos-blue transition-colors">Authorize Claim Settlement</p>
                    <p className="text-xs text-slate-500 mb-2">Claim C11/100/1002/2026/011654 for TZS 45,000,000 pending approval.</p>
                    <span className="text-[10px] font-medium text-slate-400">4 hours ago • Claims</span>
                  </div>
                </div>
              </div>

              <div className="p-4 hover:bg-slate-50 transition-colors cursor-pointer group">
                <div className="flex gap-3">
                  <div className="mt-0.5 bg-slate-100 p-1.5 rounded-md text-slate-500 shrink-0 group-hover:bg-slate-800 group-hover:text-white transition-colors">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-0.5 group-hover:text-aos-blue transition-colors">Treaty Renewal (FIR-2026)</p>
                    <p className="text-xs text-slate-500 mb-2">Fire Proportional Treaty terms need review before month-end rollover.</p>
                    <span className="text-[10px] font-medium text-slate-400">1 day ago • Reinsurance</span>
                  </div>
                </div>
              </div>

            </div>
          </CardContent>
          <div className="p-3 border-t border-slate-100 bg-slate-50 text-center rounded-b-xl">
            <button className="text-xs font-semibold text-aos-blue hover:text-aos-blue/80 transition-colors">
              View All Tasks →
            </button>
          </div>
        </Card>
      </div>

      {/* Quick Access Modules replacing Menu Manager */}
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
