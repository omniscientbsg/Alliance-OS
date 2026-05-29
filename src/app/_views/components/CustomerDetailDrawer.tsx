"use client";

import React, { useState } from 'react';
import { Drawer } from '@/components/ui/drawer';
import { User, Shield, Activity, Phone, Mail, MapPin, Briefcase, FileCheck, Building2, AlertTriangle, FileText, CheckCircle2, XCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface CustomerDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  customerId: string | null;
}

export function CustomerDetailDrawer({ isOpen, onClose, customerId }: CustomerDetailDrawerProps) {
  const [activeTab, setActiveTab] = useState('profile');

  if (!customerId) return null;

  return (
    <Drawer 
      isOpen={isOpen} 
      onClose={onClose} 
      title={`Customer 360: Acme Corp Ltd`}
      subtitle={`ID: ${customerId} • Corporate Customer`}
      size="xl"
    >
      <div className="flex flex-col md:flex-row gap-6 h-full">
        <div className="w-full md:w-56 shrink-0 space-y-1">
          <button onClick={() => setActiveTab('profile')} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'profile' ? 'bg-aos-blue/10 text-aos-blue' : 'text-slate-600 hover:bg-slate-50'}`}>
            <span className="flex items-center gap-2"><User className="w-4 h-4" /> Profile & KYC</span>
          </button>
          <button onClick={() => setActiveTab('policies')} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'policies' ? 'bg-aos-blue/10 text-aos-blue' : 'text-slate-600 hover:bg-slate-50'}`}>
            <span className="flex items-center gap-2"><Shield className="w-4 h-4" /> Policies (14)</span>
          </button>
          <button onClick={() => setActiveTab('claims')} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'claims' ? 'bg-aos-blue/10 text-aos-blue' : 'text-slate-600 hover:bg-slate-50'}`}>
            <span className="flex items-center gap-2"><FileText className="w-4 h-4" /> Claims (3)</span>
          </button>
          <button onClick={() => setActiveTab('financials')} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'financials' ? 'bg-aos-blue/10 text-aos-blue' : 'text-slate-600 hover:bg-slate-50'}`}>
            <span className="flex items-center gap-2"><Activity className="w-4 h-4" /> Risk & Finance</span>
          </button>
        </div>

        <div className="flex-1 min-w-0">
          {activeTab === 'profile' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="grid grid-cols-2 gap-6">
                <Card className="p-4 border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-semibold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                    <Briefcase className="w-4 h-4 text-aos-blue" /> Corporate Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-slate-500">Registered Name</p>
                      <p className="text-sm font-medium text-slate-900">Acme Corporation Tanzania Ltd</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Short Name</p>
                      <p className="text-sm font-medium text-slate-900">ACME</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">TIN Number</p>
                      <p className="text-sm font-medium text-slate-900">105-888-222</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">VRN (VAT Reg No)</p>
                      <p className="text-sm font-medium text-slate-900">40-111111-W</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-semibold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                    <MapPin className="w-4 h-4 text-aos-blue" /> Contact Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs text-slate-500">Physical Address</p>
                        <p className="text-sm font-medium text-slate-900">Acme Tower, Floor 4<br/>Bagamoyo Road, Dar Es Salaam</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                      <div>
                        <p className="text-xs text-slate-500">Phone</p>
                        <p className="text-sm font-medium text-slate-900">+255 712 345 678</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                      <div>
                        <p className="text-xs text-slate-500">Email Address</p>
                        <p className="text-sm font-medium text-slate-900">info@acmecorp.co.tz</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-semibold text-slate-900 flex items-center gap-2 mb-4">
                  <FileCheck className="w-4 h-4 text-aos-emerald" /> KYC & Document Status
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200">
                    <CheckCircle2 className="w-5 h-5 text-aos-emerald" />
                    <div><p className="text-sm font-medium">Certificate of Inc.</p><p className="text-xs text-slate-500">Verified 12/2025</p></div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200">
                    <CheckCircle2 className="w-5 h-5 text-aos-emerald" />
                    <div><p className="text-sm font-medium">TIN Certificate</p><p className="text-xs text-slate-500">Verified 12/2025</p></div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-aos-amber/5 rounded-lg border border-aos-amber/20">
                    <AlertTriangle className="w-5 h-5 text-aos-amber" />
                    <div><p className="text-sm font-medium">Directors IDs</p><p className="text-xs text-aos-amber">Expires in 14 days</p></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'policies' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-slate-900">Active Policies (14)</h3>
                <button className="text-sm font-medium text-aos-blue hover:underline">View All History →</button>
              </div>
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl bg-white overflow-hidden">
                {[
                  { id: 'P11/2026/100/5042', prod: 'Fire & Perils', si: 'TZS 1.5B', prem: 'TZS 4.5M', exp: '31/12/2026', status: 'Active' },
                  { id: 'P11/2026/200/1008', prod: 'Motor Fleet', si: 'TZS 800M', prem: 'TZS 12M', exp: '15/06/2026', status: 'Active' },
                  { id: 'P11/2026/300/4055', prod: 'Marine Cargo', si: 'TZS 400M', prem: 'TZS 2.1M', exp: '10/05/2026', status: 'Expiring Soon' },
                ].map((p, i) => (
                  <div key={i} className="p-4 hover:bg-slate-50 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-aos-blue">{p.id}</p>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${p.status === 'Active' ? 'bg-aos-emerald/10 text-aos-emerald' : 'bg-aos-amber/10 text-aos-amber'}`}>{p.status}</span>
                      </div>
                      <p className="text-sm text-slate-600 mt-1">{p.prod} • Expires: {p.exp}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-900">{p.si} SI</p>
                      <p className="text-xs text-slate-500 mt-1">Prem: {p.prem}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'claims' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-slate-900">Recent Claims</h3>
                <button className="text-sm font-medium text-aos-blue hover:underline">File New Claim →</button>
              </div>
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl bg-white overflow-hidden">
                {[
                  { id: 'C11/100/1002/2026/011702', pol: 'P11/2026/200/1008', date: '12/04/2026', type: 'Own Damage', amt: 'TZS 4.5M', status: 'Assessment' },
                  { id: 'C11/100/1002/2025/008920', pol: 'P11/2025/200/1008', date: '05/11/2025', type: 'Third Party', amt: 'TZS 1.2M', status: 'Closed' },
                  { id: 'C11/100/5042/2025/004501', pol: 'P11/2025/100/5042', date: '22/07/2025', type: 'Fire Damage', amt: 'TZS 15M', status: 'Closed' },
                ].map((c, i) => (
                  <div key={i} className="p-4 hover:bg-slate-50 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-aos-blue">{c.id}</p>
                      <p className="text-sm text-slate-600 mt-1">{c.type} • {c.pol} • Date: {c.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-900">{c.amt}</p>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        {c.status === 'Closed' ? <CheckCircle2 className="w-3 h-3 text-aos-emerald" /> : <Activity className="w-3 h-3 text-aos-blue" />}
                        <p className="text-xs text-slate-500">{c.status}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'financials' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="grid grid-cols-3 gap-4">
                <Card className="p-4 border-slate-200 shadow-sm bg-aos-blue/5 border-aos-blue/20">
                  <p className="text-xs text-aos-blue uppercase tracking-wider font-semibold">Total GWP (YTD)</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">TZS 450M</p>
                </Card>
                <Card className="p-4 border-slate-200 shadow-sm">
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Outstanding AR</p>
                  <p className="text-2xl font-bold text-aos-rose mt-1">TZS 12.5M</p>
                </Card>
                <Card className="p-4 border-slate-200 shadow-sm">
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Overall Loss Ratio</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">42%</p>
                </Card>
              </div>
              
              <Card className="p-5 border-slate-200 shadow-sm">
                 <h3 className="text-sm font-semibold text-slate-900 mb-4 border-b border-slate-100 pb-2">Total Exposure by Class of Business</h3>
                 <div className="space-y-5">
                   <div>
                     <div className="flex justify-between text-sm mb-1"><span className="text-slate-600 font-medium">Fire & Perils</span><span className="font-bold">TZS 1.5 Billion</span></div>
                     <div className="w-full bg-slate-100 h-2.5 rounded-full"><div className="bg-aos-blue h-2.5 rounded-full" style={{ width: '60%' }}></div></div>
                   </div>
                   <div>
                     <div className="flex justify-between text-sm mb-1"><span className="text-slate-600 font-medium">Motor Fleet</span><span className="font-bold">TZS 800 Million</span></div>
                     <div className="w-full bg-slate-100 h-2.5 rounded-full"><div className="bg-aos-teal h-2.5 rounded-full" style={{ width: '25%' }}></div></div>
                   </div>
                   <div>
                     <div className="flex justify-between text-sm mb-1"><span className="text-slate-600 font-medium">Marine Cargo</span><span className="font-bold">TZS 400 Million</span></div>
                     <div className="w-full bg-slate-100 h-2.5 rounded-full"><div className="bg-aos-emerald h-2.5 rounded-full" style={{ width: '15%' }}></div></div>
                   </div>
                 </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </Drawer>
  );
}
