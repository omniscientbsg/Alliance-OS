"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ChevronLeft, Shield, User, MapPin, Clock, Calendar, 
  AlertTriangle, CheckCircle2, Bot, ArrowRight, Car, 
  Paperclip, Activity, Zap, Check, Building
} from 'lucide-react';

const MOCK_DB: Record<string, any> = {
  '011702': { insured: 'John Kimaro', product: 'Motor Comprehensive', vehicle: 'Toyota Hilux 2.4 GD-6', reg: 'T 412 EFZ', policy: 'P11/2026/100/5042', icon: User, initials: 'JK', reserve: 'TZS 1,200,000', fraud: 12, risk: 'Low Risk', fraudColor: 'text-emerald-500 bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800', status: 'Assessment Pending', step: 3, assetIcon: Car },
  '011698': { insured: 'Coastal Motors', product: 'Motor Fleet', vehicle: 'Ford Transit Van', reg: 'T 882 DFX', policy: 'P11/2026/100/5043', icon: Building, initials: 'CM', reserve: 'TZS 800,000', fraud: 45, risk: 'Medium Risk', fraudColor: 'text-amber-500 bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800', status: 'Survey Required', step: 4, assetIcon: Car },
  '011710': { insured: 'Acme Corp', product: 'Fire & Perils', vehicle: 'Warehouse A (Fire)', reg: 'Plot 44, Industrial Area', policy: 'P11/2026/100/1008', icon: Building, initials: 'AC', reserve: 'TZS 22,500,000', fraud: 8, risk: 'Low Risk', fraudColor: 'text-emerald-500 bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800', status: 'Under Survey', step: 4, assetIcon: Building },
  '011715': { insured: 'Sarah Jenkins', product: 'Motor Comprehensive', vehicle: 'Subaru Forester', reg: 'T 119 XYZ', policy: 'P11/2026/100/5099', icon: User, initials: 'SJ', reserve: 'TZS 450,000', fraud: 89, risk: 'High Risk (SIU)', fraudColor: 'text-rose-500 bg-rose-50 border-rose-200 dark:bg-rose-900/20 dark:border-rose-800', status: 'SIU Investigation', step: 2, assetIcon: Car },
};

export default function ClaimCanvasView({ claimId }: { claimId: string }) {
  const router = useRouter();
  const [extractionApproved, setExtractionApproved] = useState(false);

  // Extract trailing ID
  const shortId = claimId.split('/').pop()?.split('-').pop() || '011702';
  const data = MOCK_DB[shortId] || MOCK_DB['011702'];

  const extractedData = data.assetIcon === Building ? [
    { label: 'Date of Loss', value: '11 May 2026', conf: 99, color: 'text-emerald-500 bg-emerald-50 border-emerald-200', icon: Calendar },
    { label: 'Time of Loss', value: '02:15 AM', conf: 95, color: 'text-emerald-500 bg-emerald-50 border-emerald-200', icon: Clock },
    { label: 'Location', value: data.reg, conf: 98, color: 'text-emerald-500 bg-emerald-50 border-emerald-200', icon: MapPin },
    { label: 'Cause of Loss', value: 'Electrical Fire', conf: 88, color: 'text-amber-600 bg-amber-50 border-amber-200', icon: AlertTriangle },
  ] : [
    { label: 'Date of Loss', value: '14 May 2026', conf: 99, color: 'text-emerald-500 bg-emerald-50 border-emerald-200', icon: Calendar },
    { label: 'Time of Loss', value: '08:30 AM', conf: 92, color: 'text-emerald-500 bg-emerald-50 border-emerald-200', icon: Clock },
    { label: 'Location', value: data.reg, conf: 85, color: 'text-amber-600 bg-amber-50 border-amber-200', icon: MapPin },
    { label: 'Cause of Loss', value: data.fraud > 80 ? 'Staged Collision (Flagged)' : 'Rear-end collision', conf: data.fraud > 80 ? 40 : 96, color: data.fraud > 80 ? 'text-rose-500 bg-rose-50 border-rose-200' : 'text-emerald-500 bg-emerald-50 border-emerald-200', icon: AlertTriangle },
    { label: 'Third Party Inv.', value: 'Yes', conf: 72, color: 'text-rose-500 bg-rose-50 border-rose-200', icon: User },
  ];

  return (
    <div className="flex flex-col h-full absolute inset-0 bg-slate-50 dark:bg-slate-950 overflow-hidden z-20">
      
      {/* Top Navigation Bar */}
      <header className="h-14 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md text-slate-500 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 rounded-full ${data.fraud > 80 ? 'bg-rose-500' : data.status.includes('Survey') ? 'bg-amber-400' : 'bg-emerald-400'} animate-pulse`} />
            <h1 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono tracking-tight">
              {claimId}
            </h1>
            <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full border ${
              data.fraud > 80 ? 'bg-rose-100 text-rose-600 border-rose-200 dark:bg-rose-900/30' :
              data.status.includes('Survey') ? 'bg-amber-100 text-amber-600 border-amber-200 dark:bg-amber-900/30' : 
              'bg-indigo-100 text-indigo-600 border-indigo-200 dark:bg-indigo-900/30'
            }`}>
              {data.status}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg border ${data.fraudColor}`}>
            <AlertTriangle className="w-3.5 h-3.5" />
            Fraud Score: {data.fraud}/100 ({data.risk})
          </div>
          <button className={`${data.fraud > 80 ? 'bg-rose-600 hover:bg-rose-700' : 'bg-indigo-600 hover:bg-indigo-700'} text-white text-xs font-bold px-4 py-1.5 rounded-lg transition-colors shadow-sm`}>
            {data.fraud > 80 ? 'Escalate to SIU' : 'Approve & Settle'}
          </button>
        </div>
      </header>

      {/* 3-Pane Canvas Layout */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* PANE 1: Left Rail (Immutable Context) */}
        <aside className="w-80 border-r border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20 overflow-y-auto shrink-0 p-4 space-y-4 custom-scrollbar">
          <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Immutable Context</h2>
          
          {/* Policy Card */}
          <div className="bg-white dark:bg-[#0f172a] rounded-xl border border-slate-200 dark:border-slate-800 p-3 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors cursor-pointer group">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-4 h-4 text-aos-blue" />
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {data.policy}
              </span>
              <span className="ml-auto text-[10px] font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-1.5 py-0.5 rounded text-emerald-600">ACTIVE</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-slate-500">Product</span><span className="font-medium dark:text-slate-200">{data.product}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Inception</span><span className="font-medium dark:text-slate-200">01 Jan 2026</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Excess</span><span className="font-medium dark:text-slate-200">{data.assetIcon === Building ? 'TZS 5,000,000' : 'TZS 150,000'}</span></div>
            </div>
          </div>

          {/* Asset Card */}
          <div className="bg-white dark:bg-[#0f172a] rounded-xl border border-slate-200 dark:border-slate-800 p-3 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              {React.createElement(data.assetIcon, { className: "w-4 h-4 text-slate-500" })}
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100">Insured Asset</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-slate-500">Asset</span><span className="font-medium dark:text-slate-200">{data.vehicle}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Reg/Loc</span><span className="font-medium dark:text-slate-200">{data.reg}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Sum Insured</span><span className="font-medium dark:text-slate-200">{data.assetIcon === Building ? 'TZS 450,000,000' : 'TZS 85,000,000'}</span></div>
            </div>
          </div>

          {/* Entity Card */}
          <div className="bg-white dark:bg-[#0f172a] rounded-xl border border-slate-200 dark:border-slate-800 p-3 shadow-sm hover:border-indigo-300 transition-colors cursor-pointer group">
            <div className="flex items-center gap-2 mb-3">
              {React.createElement(data.icon, { className: "w-4 h-4 text-slate-500" })}
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 transition-colors">Insured Entity</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-500">{data.initials}</div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{data.insured}</p>
                <p className="text-xs text-slate-500">+255 712 345 678</p>
              </div>
            </div>
          </div>
        </aside>

        {/* PANE 2: Center (Timeline & Actions) */}
        <main className="flex-1 bg-white dark:bg-[#0f172a] flex flex-col min-w-0">
          
          {/* Pipeline Visual */}
          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
            <div className="flex items-center justify-between relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-slate-100 dark:bg-slate-800 -z-10" />
              {[
                { label: 'FNOL', status: data.step > 1 ? 'done' : 'active' },
                { label: 'AI Triage', status: data.step > 2 ? 'done' : data.step === 2 ? 'active' : 'pending' },
                { label: 'Assessment', status: data.step > 3 ? 'done' : data.step === 3 ? 'active' : 'pending' },
                { label: 'Survey', status: data.step > 4 ? 'done' : data.step === 4 ? 'active' : 'pending' },
                { label: 'Settlement', status: data.step > 5 ? 'done' : data.step === 5 ? 'active' : 'pending' }
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center gap-2 bg-white dark:bg-[#0f172a] px-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center border-[2px] ${
                    step.status === 'done' ? 'bg-emerald-500 border-emerald-500 text-white' : 
                    step.status === 'active' ? (data.fraud > 80 ? 'bg-rose-50 border-rose-500 text-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.2)]' : 'bg-white dark:bg-slate-900 border-amber-500 text-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.2)]') : 
                    'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600'
                  }`}>
                    {step.status === 'done' ? <Check className="w-3.5 h-3.5" /> : <span className="text-[10px] font-bold">{i+1}</span>}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wide ${
                    step.status === 'active' ? (data.fraud > 80 ? 'text-rose-600' : 'text-amber-600 dark:text-amber-400') : 
                    step.status === 'done' ? 'text-slate-700 dark:text-slate-300' : 'text-slate-400'
                  }`}>{step.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Event Feed */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
            
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className={`flex-1 rounded-2xl rounded-tl-none p-4 border ${data.fraud > 80 ? 'bg-rose-50 border-rose-200 dark:bg-rose-900/10 dark:border-rose-900/50' : 'bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800'}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-xs font-bold ${data.fraud > 80 ? 'text-rose-600 dark:text-rose-400' : 'text-indigo-600 dark:text-indigo-400'}`}>Alliance AI Triage</span>
                  <span className="text-[10px] text-slate-400">Today, 09:42 AM</span>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  I have ingested the FNOL report from {data.insured}. The policy is active and covers {data.assetIcon === Building ? 'Fire Damage' : 'Own Damage'}.
                  <br/><br/>
                  <strong className={data.fraud > 80 ? 'text-rose-700 dark:text-rose-300' : 'text-slate-900 dark:text-white'}>
                    {data.fraud > 80 ? 'CRITICAL WARNING: High probability of staged collision or fraudulent representation. Damage profile does not match reported cause.' : 'Recommendation:'}
                  </strong> 
                  {data.fraud > 80 ? ' DO NOT settle. Refer to SIU immediately.' : ` Estimated initial reserve is set to ${data.reserve}. Please verify the AI extraction on the right pane.`}
                </p>
              </div>
            </div>

            <div className="flex gap-4 flex-row-reverse">
              <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0 font-bold text-xs text-slate-600 dark:text-slate-300">
                Me
              </div>
              <div className="flex-1 max-w-[80%]">
                <div className="relative">
                  <textarea 
                    placeholder="Reply, request a surveyor, or log a note..." 
                    className="w-full bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none"
                    rows={2}
                  />
                  <div className="absolute bottom-2 right-2 flex gap-2">
                    <button className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors"><Paperclip className="w-4 h-4" /></button>
                    <button className="px-3 py-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-lg hover:opacity-90">Send</button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </main>

        {/* PANE 3: Right Rail (AI Verification / "Maker") */}
        <aside className="w-80 lg:w-96 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] flex flex-col shrink-0 relative shadow-[-4px_0_24px_-10px_rgba(0,0,0,0.05)] z-10">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-indigo-50/50 dark:bg-indigo-900/10 flex items-center gap-2">
            <Zap className="w-4 h-4 text-indigo-500" />
            <h2 className="text-xs font-bold text-indigo-900 dark:text-indigo-100 uppercase tracking-wider">AI Copilot Extraction</h2>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
            {/* Evidence Viewer */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-slate-500">Evidence Uploaded</span>
                <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-500">1 Image</span>
              </div>
              <div className="w-full h-32 bg-slate-200 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <span className="text-white text-xs font-bold font-mono">ENLARGE</span>
                </div>
                {React.createElement(data.assetIcon, { className: "w-8 h-8 text-slate-400" })}
              </div>
            </div>

            {/* Extracted Fields */}
            <div className="space-y-3">
              <span className="text-xs font-semibold text-slate-500">Extracted Data</span>
              
              <div className="space-y-2">
                {extractedData.map((field, i) => (
                  <div key={i} className={`p-2.5 rounded-lg border ${extractionApproved ? 'bg-slate-50 border-slate-200 dark:bg-slate-800/50 dark:border-slate-700' : field.color} transition-all`}>
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-1.5">
                        <field.icon className={`w-3 h-3 ${extractionApproved ? 'text-slate-400' : field.color.split(' ')[0]}`} />
                        <span className="text-[10px] font-bold text-slate-500 uppercase">{field.label}</span>
                      </div>
                      {!extractionApproved && (
                        <span className={`text-[9px] font-bold px-1.5 rounded-sm ${field.color}`}>
                          {field.conf}% CONF
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <input 
                        type="text" 
                        defaultValue={field.value}
                        className={`bg-transparent text-sm font-medium ${data.fraud > 80 && field.conf < 50 ? 'text-rose-600 line-through' : 'text-slate-900 dark:text-slate-100'} outline-none w-full`}
                        disabled={extractionApproved}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 shrink-0">
            {extractionApproved ? (
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 justify-center p-2">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm font-bold">Data Verified & Saved</span>
              </div>
            ) : (
              <button 
                onClick={() => setExtractionApproved(true)}
                className={`w-full ${data.fraud > 80 ? 'bg-rose-600 hover:bg-rose-700' : 'bg-indigo-600 hover:bg-indigo-700'} text-white font-bold text-sm py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2`}
              >
                <CheckCircle2 className="w-4 h-4" />
                {data.fraud > 80 ? 'Reject & Flag SIU' : 'Verify & Approve Extraction'}
              </button>
            )}
          </div>
        </aside>

      </div>
    </div>
  );
}