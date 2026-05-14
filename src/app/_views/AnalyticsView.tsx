import React from 'react';
import { Card } from "@/components/ui/card";
import { BarChart3, PieChart, TrendingUp, Download, Calendar } from "lucide-react";

export default function AnalyticsView() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Business Analytics</h1>
          <p className="text-sm text-slate-500 mt-1">Comprehensive insights into underwriting performance and claims ratios.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2">
            <Calendar className="w-4 h-4" /> YTD 2026
          </button>
          <button className="px-4 py-2 bg-aos-blue text-white rounded-lg text-sm font-medium hover:bg-aos-blue/90 transition-colors shadow-sm shadow-aos-blue/20 flex items-center gap-2">
            <Download className="w-4 h-4" /> Export Report
          </button>
        </div>
      </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Chart 1: GWP by Class of Business */}
        <Card className="p-6 border-slate-200 shadow-sm flex flex-col min-h-[350px] lg:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-semibold text-slate-800">GWP by Class of Business</h3>
            <PieChart className="w-5 h-5 text-slate-400" />
          </div>
          <div className="flex-1 flex flex-col justify-end gap-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-slate-700">Motor Comprehensive</span>
                <span className="text-slate-500">TZS 1.2B (45%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3">
                <div className="bg-aos-blue h-3 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-slate-700">Fire & Perils</span>
                <span className="text-slate-500">TZS 850M (32%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3">
                <div className="bg-aos-emerald h-3 rounded-full" style={{ width: '32%' }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-slate-700">Marine Cargo</span>
                <span className="text-slate-500">TZS 400M (15%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3">
                <div className="bg-aos-amber h-3 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-slate-700">Others</span>
                <span className="text-slate-500">TZS 210M (8%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3">
                <div className="bg-slate-400 h-3 rounded-full" style={{ width: '8%' }}></div>
              </div>
            </div>
          </div>
        </Card>

        {/* Chart 2: Loss Ratio Trend */}
        <Card className="p-6 border-slate-200 shadow-sm flex flex-col min-h-[350px] lg:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-semibold text-slate-800">Incurred Loss Ratio Trend</h3>
            <TrendingUp className="w-5 h-5 text-slate-400" />
          </div>
          <div className="flex-1 flex items-end gap-2 h-48 relative pt-6">
            <div className="absolute left-0 top-0 text-xs text-slate-400 h-full flex flex-col justify-between pb-6">
              <span>100%</span>
              <span>75%</span>
              <span>50%</span>
              <span>25%</span>
              <span>0%</span>
            </div>
            <div className="absolute left-8 right-0 top-0 h-full flex flex-col justify-between pb-6">
              <div className="border-b border-slate-100/50 border-dashed w-full"></div>
              <div className="border-b border-aos-rose/30 border-dashed w-full relative">
                <span className="absolute -top-4 right-0 text-[10px] text-aos-rose">Target &lt;60%</span>
              </div>
              <div className="border-b border-slate-100/50 border-dashed w-full"></div>
              <div className="border-b border-slate-100/50 border-dashed w-full"></div>
              <div className="border-b border-slate-200 w-full"></div>
            </div>
            
            {/* Bars */}
            <div className="flex-1 z-10 flex flex-col items-center justify-end gap-2 ml-8">
              <div className="w-full bg-aos-emerald rounded-t-sm" style={{ height: '42%' }}></div>
              <span className="text-xs text-slate-500 font-medium">Jan</span>
            </div>
            <div className="flex-1 z-10 flex flex-col items-center justify-end gap-2">
              <div className="w-full bg-aos-emerald rounded-t-sm" style={{ height: '48%' }}></div>
              <span className="text-xs text-slate-500 font-medium">Feb</span>
            </div>
            <div className="flex-1 z-10 flex flex-col items-center justify-end gap-2">
              <div className="w-full bg-aos-amber rounded-t-sm" style={{ height: '58%' }}></div>
              <span className="text-xs text-slate-500 font-medium">Mar</span>
            </div>
            <div className="flex-1 z-10 flex flex-col items-center justify-end gap-2">
              <div className="w-full bg-aos-rose rounded-t-sm" style={{ height: '72%' }}></div>
              <span className="text-xs text-slate-500 font-medium">Apr</span>
            </div>
            <div className="flex-1 z-10 flex flex-col items-center justify-end gap-2">
              <div className="w-full bg-aos-emerald rounded-t-sm" style={{ height: '55%' }}></div>
              <span className="text-xs text-slate-500 font-medium">May</span>
            </div>
          </div>
        </Card>

        {/* Chart 3: Premium Production by Broker */}
        <Card className="p-6 border-slate-200 shadow-sm flex flex-col min-h-[350px] lg:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-semibold text-slate-800">Production by Top Brokers</h3>
            <BarChart3 className="w-5 h-5 text-slate-400" />
          </div>
          <div className="flex-1 flex flex-col justify-end gap-4">
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-slate-700">Aon Tanzania</span>
                <span className="text-slate-500">TZS 850M</span>
              </div>
              <div className="w-full bg-slate-100 rounded h-6 relative overflow-hidden">
                <div className="bg-aos-blue h-full absolute left-0 top-0" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-slate-700">Marsh & McLennan</span>
                <span className="text-slate-500">TZS 620M</span>
              </div>
              <div className="w-full bg-slate-100 rounded h-6 relative overflow-hidden">
                <div className="bg-aos-blue/80 h-full absolute left-0 top-0" style={{ width: '62%' }}></div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-slate-700">Willis Towers Watson</span>
                <span className="text-slate-500">TZS 410M</span>
              </div>
              <div className="w-full bg-slate-100 rounded h-6 relative overflow-hidden">
                <div className="bg-aos-blue/60 h-full absolute left-0 top-0" style={{ width: '41%' }}></div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-slate-700">Local Brokers (Combined)</span>
                <span className="text-slate-500">TZS 330M</span>
              </div>
              <div className="w-full bg-slate-100 rounded h-6 relative overflow-hidden">
                <div className="bg-aos-blue/40 h-full absolute left-0 top-0" style={{ width: '33%' }}></div>
              </div>
            </div>
          </div>
        </Card>

        {/* Chart 4: Claim Settlement TAT */}
        <Card className="p-6 border-slate-200 shadow-sm flex flex-col min-h-[350px] lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Claims TAT</h3>
            <Calendar className="w-5 h-5 text-slate-400" />
          </div>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative w-40 h-40">
              <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                <path className="text-slate-100" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-aos-emerald" strokeDasharray="80, 100" strokeWidth="4" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-slate-800">14</span>
                <span className="text-xs text-slate-500 font-medium">Days Avg</span>
              </div>
            </div>
            <p className="text-center text-sm text-slate-500 mt-4 px-2">
              80% of claims settled within the 21-day target SLA.
            </p>
          </div>
        </Card>

        {/* Chart 5: Policy Renewal Retention Rate */}
        <Card className="p-6 border-slate-200 shadow-sm flex flex-col min-h-[350px] lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Retention Rate</h3>
            <TrendingUp className="w-5 h-5 text-slate-400" />
          </div>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative w-40 h-40">
              <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                <path className="text-slate-100" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-aos-blue" strokeDasharray="92, 100" strokeWidth="4" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-slate-800">92%</span>
                <span className="text-xs text-slate-500 font-medium">Retained</span>
              </div>
            </div>
            <p className="text-center text-sm text-slate-500 mt-4 px-2">
              +4% improvement compared to previous quarter.
            </p>
          </div>
        </Card>

        {/* Chart 6: Outstanding Claims Reserve Aging */}
        <Card className="p-6 border-slate-200 shadow-sm flex flex-col min-h-[350px] lg:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-semibold text-slate-800">OCR Aging Analysis</h3>
            <BarChart3 className="w-5 h-5 text-slate-400" />
          </div>
          <div className="flex-1 flex items-end gap-6 relative pt-6">
            <div className="absolute left-0 top-0 text-xs text-slate-400 h-full flex flex-col justify-between pb-6">
              <span>TZS 5B</span>
              <span>TZS 2.5B</span>
              <span>0</span>
            </div>
            <div className="absolute left-12 right-0 top-0 h-full flex flex-col justify-between pb-6">
              <div className="border-b border-slate-100 border-dashed w-full"></div>
              <div className="border-b border-slate-100 border-dashed w-full"></div>
              <div className="border-b border-slate-200 w-full"></div>
            </div>
            <div className="flex-1 z-10 flex flex-col items-center justify-end gap-2 ml-12">
              <div className="w-16 bg-aos-emerald rounded-t-sm hover:opacity-90 transition-opacity" style={{ height: '30%' }}></div>
              <span className="text-xs text-slate-500 font-medium whitespace-nowrap">0-30 Days</span>
            </div>
            <div className="flex-1 z-10 flex flex-col items-center justify-end gap-2">
              <div className="w-16 bg-aos-amber rounded-t-sm hover:opacity-90 transition-opacity" style={{ height: '60%' }}></div>
              <span className="text-xs text-slate-500 font-medium whitespace-nowrap">31-90 Days</span>
            </div>
            <div className="flex-1 z-10 flex flex-col items-center justify-end gap-2">
              <div className="w-16 bg-aos-rose/60 rounded-t-sm hover:opacity-90 transition-opacity" style={{ height: '45%' }}></div>
              <span className="text-xs text-slate-500 font-medium whitespace-nowrap">91-180 Days</span>
            </div>
            <div className="flex-1 z-10 flex flex-col items-center justify-end gap-2">
              <div className="w-16 bg-aos-rose rounded-t-sm hover:opacity-90 transition-opacity" style={{ height: '20%' }}></div>
              <span className="text-xs text-slate-500 font-medium whitespace-nowrap">&gt; 180 Days</span>
            </div>
          </div>
        </Card>

        {/* Chart 7: Reinsurance Ceded vs Recoveries */}
        <Card className="p-6 border-slate-200 shadow-sm flex flex-col min-h-[350px] lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800">RI Performance</h3>
            <PieChart className="w-5 h-5 text-slate-400" />
          </div>
          <div className="flex-1 flex flex-col justify-center space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600 font-medium">Premium Ceded</span>
                <span className="text-slate-900 font-bold">TZS 1.4B</span>
              </div>
              <div className="text-xs text-slate-500 mb-2">35% of Gross Premium</div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-aos-coral h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600 font-medium">Claim Recoveries</span>
                <span className="text-slate-900 font-bold">TZS 850M</span>
              </div>
              <div className="text-xs text-slate-500 mb-2">60% Recovery Ratio</div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-aos-emerald h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600 font-medium">RI Commission</span>
                <span className="text-slate-900 font-bold">TZS 210M</span>
              </div>
              <div className="text-xs text-slate-500 mb-2">15% Avg Comm Rate</div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-aos-blue h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
          </div>
        </Card>

        {/* Chart 8: Expense Ratio */}
        <Card className="p-6 border-slate-200 shadow-sm flex flex-col min-h-[350px] lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Expense Ratios</h3>
            <TrendingUp className="w-5 h-5 text-slate-400" />
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="text-5xl font-extrabold text-slate-800 tracking-tighter mb-2">
                28<span className="text-3xl text-slate-500 font-medium">%</span>
              </div>
              <p className="text-sm font-medium text-aos-emerald flex items-center gap-1 bg-aos-emerald/10 px-2.5 py-1 rounded-full">
                <TrendingUp className="w-3 h-3 rotate-180" /> -2.5% vs Last Year
              </p>
              
              <div className="w-full space-y-3 mt-8">
                <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
                  <span className="text-slate-500">Commission Exp</span>
                  <span className="font-semibold text-slate-700">12.5%</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
                  <span className="text-slate-500">Management Exp</span>
                  <span className="font-semibold text-slate-700">15.5%</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-800 font-semibold">Combined Ratio</span>
                  <span className="font-bold text-aos-blue">89.5%</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
