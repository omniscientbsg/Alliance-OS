"use client";

import React from 'react';
import { Card } from '@/components/ui/card';
import { PieChart, TrendingUp, Users, Shield, Zap } from 'lucide-react';

export default function AnalyticsView() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <PieChart className="w-6 h-6 text-indigo-500" />
            Analytics & Reports
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time business intelligence and performance metrics.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Underwriting Performance */}
        <Card className="p-6 bg-white dark:bg-[#0f172a] border-slate-200 dark:border-slate-800 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-500" /> Underwriting Performance
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">GWP (Year to Date)</span>
              <span className="font-bold text-slate-900 dark:text-slate-100">TZS 18.4B</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">New Business Growth</span>
              <span className="font-bold text-emerald-600">+14.2%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Zero-Touch Issuance</span>
              <span className="font-bold text-indigo-600">68% of all retail</span>
            </div>
          </div>
        </Card>

        {/* Claims Performance */}
        <Card className="p-6 bg-white dark:bg-[#0f172a] border-slate-200 dark:border-slate-800 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-rose-500" /> Claims Velocity
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Average Settlement Time</span>
              <span className="font-bold text-slate-900 dark:text-slate-100">2.4 Days</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">AI Auto-Triage Rate</span>
              <span className="font-bold text-indigo-600">84%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-rose-200 bg-rose-50 dark:border-rose-900/50 dark:bg-rose-900/10">
              <span className="text-sm font-medium text-rose-700 dark:text-rose-400">SIU Fraud Saves</span>
              <span className="font-bold text-rose-600 dark:text-rose-400">TZS 450M YTD</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}