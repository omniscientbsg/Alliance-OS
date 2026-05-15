"use client";

import React from 'react';
import Link from 'next/link';
import { Shield, Search, Filter, AlertTriangle, Clock, MapPin, Building, Car, User } from 'lucide-react';
import { Card } from '@/components/ui/card';

const MOCK_POLICIES = [
  { id: 'P11/2026/100/5042', insured: 'John Kimaro', product: 'Motor Comprehensive', asset: 'T 412 EFZ', premium: 'TZS 1,450,000', status: 'Active', expiry: '31 Dec 2026', type: 'retail', icon: User },
  { id: 'P11/2026/100/1008', insured: 'Acme Corp', product: 'Fire & Perils', asset: 'Warehouse A', premium: 'TZS 15,200,000', status: 'Active', expiry: '14 Jun 2026', type: 'corporate', icon: Building },
  { id: 'P11/2026/100/5043', insured: 'Coastal Motors', product: 'Motor Fleet', asset: '12 Vehicles', premium: 'TZS 8,500,000', status: 'Expiring Soon', expiry: '28 May 2026', type: 'sme', icon: Car },
];

export default function PoliciesListView() {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Shield className="w-6 h-6 text-aos-blue" />
            Policy Administration
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage active policies, renewals, and endorsements.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search policies..." 
              className="pl-9 pr-4 py-2 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-aos-blue/50 text-slate-900 dark:text-slate-100 w-64"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <Link href="/policies/new" className="flex items-center gap-2 px-3 py-2 text-sm font-bold text-white bg-aos-blue rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
            <Shield className="w-4 h-4" /> Issue Policy
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Policies', value: '14,203', sub: '+142 this month' },
          { label: 'Gross Written Premium', value: 'TZS 4.2B', sub: 'YTD 2026', color: 'text-aos-blue' },
          { label: 'Upcoming Renewals', value: '342', sub: 'Next 30 days', color: 'text-amber-500' },
          { label: 'Zero-Touch Issued', value: '68%', sub: 'Last 30 days', color: 'text-indigo-500' },
        ].map((kpi, i) => (
          <Card key={i} className="p-4 bg-white dark:bg-[#0f172a] border-slate-200 dark:border-slate-800 shadow-sm">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{kpi.label}</p>
            <p className={`text-2xl font-bold ${kpi.color || 'text-slate-900 dark:text-slate-100'}`}>{kpi.value}</p>
            <p className="text-[10px] text-slate-400 mt-1">{kpi.sub}</p>
          </Card>
        ))}
      </div>

      {/* Policies Data Grid */}
      <Card className="bg-white dark:bg-[#0f172a] border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-900/50 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3">Policy Number</th>
                <th className="px-4 py-3">Insured Entity</th>
                <th className="px-4 py-3">Product / Asset</th>
                <th className="px-4 py-3">Annual Premium</th>
                <th className="px-4 py-3">Expiry Date</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
              {MOCK_POLICIES.map((policy, i) => {
                const Icon = policy.icon;
                return (
                <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors group cursor-pointer">
                  <td className="px-4 py-3">
                    <span className="font-semibold text-aos-blue dark:text-blue-400">
                      {policy.id}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-medium text-slate-900 dark:text-slate-100">{policy.insured}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-slate-900 dark:text-slate-100">{policy.product}</p>
                    <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" /> {policy.asset}</p>
                  </td>
                  <td className="px-4 py-3 font-medium">{policy.premium}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 text-xs">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {policy.expiry}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      policy.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800' :
                      'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800'
                    }`}>
                      {policy.status}
                    </span>
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}