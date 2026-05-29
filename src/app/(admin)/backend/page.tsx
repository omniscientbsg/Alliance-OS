import React from 'react';
import { Card } from "@/components/ui/card";
import { Activity, Database, Server, CheckCircle2 } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">System Overview</h1>
          <p className="text-sm text-slate-500 mt-1">Real-time infrastructure health and API status.</p>
        </div>
        <div className="px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded border border-emerald-500/20 flex items-center gap-2 text-sm font-bold">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          ALL SYSTEMS OPERATIONAL
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5 border-slate-800 shadow-sm bg-slate-900">
          <div className="flex items-center gap-3 mb-4">
            <Server className="w-5 h-5 text-aos-blue" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Event Bus</h3>
          </div>
          <p className="text-3xl font-bold text-white mb-1">98.2k</p>
          <p className="text-sm text-slate-500">Events processed (24h)</p>
          <div className="mt-4 flex items-center text-emerald-500 text-xs gap-1">
            <CheckCircle2 className="w-3 h-3" /> 0 Dead Letter Queue
          </div>
        </Card>
        
        <Card className="p-5 border-slate-800 shadow-sm bg-slate-900">
          <div className="flex items-center gap-3 mb-4">
            <Database className="w-5 h-5 text-aos-amber" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Database</h3>
          </div>
          <p className="text-3xl font-bold text-white mb-1">14.2ms</p>
          <p className="text-sm text-slate-500">Avg Query Latency</p>
          <div className="mt-4 flex items-center text-emerald-500 text-xs gap-1">
            <CheckCircle2 className="w-3 h-3" /> Primary connected
          </div>
        </Card>

        <Card className="p-5 border-slate-800 shadow-sm bg-slate-900">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-5 h-5 text-aos-rose" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">API Traffic</h3>
          </div>
          <p className="text-3xl font-bold text-white mb-1">1,240</p>
          <p className="text-sm text-slate-500">Req / Minute</p>
          <div className="mt-4 flex items-center text-emerald-500 text-xs gap-1">
            <CheckCircle2 className="w-3 h-3" /> 99.99% Uptime
          </div>
        </Card>
      </div>

      <Card className="border-slate-800 shadow-sm bg-slate-900">
        <div className="p-4 border-b border-slate-800">
          <h3 className="font-semibold text-white">Active Service Connections</h3>
        </div>
        <div className="p-0">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-950/50 text-slate-400">
              <tr>
                <th className="px-4 py-3 font-medium">Service Name</th>
                <th className="px-4 py-3 font-medium">Protocol</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Latency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/50">
                <td className="px-4 py-3 font-medium text-white">PostgreSQL Primary</td>
                <td className="px-4 py-3">TCP/IP</td>
                <td className="px-4 py-3"><span className="text-emerald-500">Connected</span></td>
                <td className="px-4 py-3">12ms</td>
              </tr>
              <tr className="hover:bg-slate-800/50">
                <td className="px-4 py-3 font-medium text-white">Oracle Legacy Bridge</td>
                <td className="px-4 py-3">REST/ETL</td>
                <td className="px-4 py-3"><span className="text-emerald-500">Syncing</span></td>
                <td className="px-4 py-3">145ms</td>
              </tr>
              <tr className="hover:bg-slate-800/50">
                <td className="px-4 py-3 font-medium text-white">M-Pesa API Gateway</td>
                <td className="px-4 py-3">HTTPS/REST</td>
                <td className="px-4 py-3"><span className="text-emerald-500">Connected</span></td>
                <td className="px-4 py-3">85ms</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
