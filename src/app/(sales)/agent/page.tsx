import React from 'react';
import { Card } from "@/components/ui/card";
import { TrendingUp, Users, CheckCircle2, AlertCircle, FileText } from "lucide-react";

export default function AgentDashboard() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Sales Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">Welcome back, Sarah. You're 82% to your monthly target.</p>
        </div>
        <button className="px-4 py-2 bg-aos-blue text-white rounded-lg text-sm font-medium hover:bg-aos-blue/90 transition-colors shadow-sm shadow-aos-blue/20">
          + New Lead
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5 border-slate-200 shadow-sm bg-white">
          <p className="text-sm font-medium text-slate-500 mb-1">Monthly Target</p>
          <div className="flex items-end gap-3">
            <p className="text-3xl font-bold text-slate-900">TZS 45M</p>
            <p className="text-sm text-slate-400 pb-1">/ 55M</p>
          </div>
          <div className="mt-4 w-full bg-slate-100 rounded-full h-2">
            <div className="bg-aos-blue h-2 rounded-full" style={{ width: '82%' }}></div>
          </div>
        </Card>
        
        <Card className="p-5 border-slate-200 shadow-sm bg-white">
          <p className="text-sm font-medium text-slate-500 mb-1">Active Leads</p>
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold text-slate-900">24</p>
            <div className="w-10 h-10 rounded-full bg-aos-amber/10 flex items-center justify-center text-aos-amber">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="mt-4 flex items-center gap-1 text-sm text-aos-emerald font-medium">
            <TrendingUp className="w-4 h-4" /> 3 converted this week
          </p>
        </Card>

        <Card className="p-5 border-slate-200 shadow-sm bg-white">
          <p className="text-sm font-medium text-slate-500 mb-1">Pending Renewals</p>
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold text-slate-900">8</p>
            <div className="w-10 h-10 rounded-full bg-aos-rose/10 flex items-center justify-center text-aos-rose">
              <AlertCircle className="w-5 h-5" />
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-500">Expiring within 30 days</p>
        </Card>
      </div>

      <Card className="shadow-sm border-slate-200">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 rounded-t-xl">
          <h3 className="font-semibold text-slate-800">Recent Activity</h3>
        </div>
        <div className="p-0">
          <div className="divide-y divide-slate-100">
            <div className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-aos-emerald/10 text-aos-emerald flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">Policy P11/2026/100/5042 Bound</p>
                  <p className="text-xs text-slate-500">Acme Corp Ltd • TZS 4.5M Premium</p>
                </div>
              </div>
              <span className="text-xs text-slate-400">2 hours ago</span>
            </div>
            <div className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-aos-blue/10 text-aos-blue flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">Quote Q11/2026/100/1021 Sent</p>
                  <p className="text-xs text-slate-500">Logistics Pro Ltd • Awaiting Client Approval</p>
                </div>
              </div>
              <span className="text-xs text-slate-400">Yesterday</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
