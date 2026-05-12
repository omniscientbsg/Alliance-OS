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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Chart 1: GWP by Class of Business */}
        <Card className="p-6 border-slate-200 shadow-sm flex flex-col min-h-[350px]">
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
        <Card className="p-6 border-slate-200 shadow-sm flex flex-col min-h-[350px]">
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
      </div>
    </div>
  );
}
