"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ChevronLeft, Search, FileText, UploadCloud, Bot, CheckCircle2, 
  Car, Shield, User, MapPin, AlertTriangle, ArrowRight
} from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function FnolWizardView() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [policySearch, setPolicySearch] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAIProcess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(4);
    }, 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      
      {/* Header & Back */}
      <div className="flex items-center gap-4">
        <button onClick={() => router.back()} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg text-slate-500 transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Log New Claim (FNOL)</h1>
          <p className="text-sm text-slate-500">First Notice of Loss AI Intake</p>
        </div>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 dark:bg-slate-800 -z-10 rounded-full" />
        <div className={`absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-indigo-500 -z-10 rounded-full transition-all duration-500`} style={{ width: `${((step - 1) / 3) * 100}%` }} />
        
        {['Identify Policy', 'Incident Details', 'Upload Evidence', 'AI Triage'].map((label, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-colors ${
              step > i + 1 ? 'bg-indigo-500 border-indigo-500 text-white' : 
              step === i + 1 ? 'bg-white dark:bg-slate-900 border-indigo-500 text-indigo-500' : 
              'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400'
            }`}>
              {step > i + 1 ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
            </div>
            <span className={`text-xs font-bold uppercase tracking-wider ${step >= i + 1 ? 'text-slate-900 dark:text-slate-100' : 'text-slate-400'}`}>{label}</span>
          </div>
        ))}
      </div>

      <Card className="bg-white dark:bg-[#0f172a] border-slate-200 dark:border-slate-800 shadow-lg overflow-hidden min-h-[400px]">
        
        {/* STEP 1: Policy Search */}
        {step === 1 && (
          <div className="p-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-6">Find Policy or Customer</h2>
            
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                autoFocus
                type="text" 
                value={policySearch}
                onChange={(e) => setPolicySearch(e.target.value)}
                placeholder="Search by Policy No, Reg No, or Name (e.g. P11...)" 
                className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
              />
            </div>

            {policySearch.length > 2 && (
              <div className="space-y-3">
                <p className="text-xs font-bold text-slate-500 uppercase">Search Results</p>
                <div 
                  onClick={() => setStep(2)}
                  className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-indigo-500 dark:hover:border-indigo-500 cursor-pointer transition-all hover:shadow-md flex items-center justify-between group bg-slate-50 dark:bg-slate-800/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-slate-900 dark:text-slate-100">P11/2026/100/5042</p>
                      <p className="text-sm text-slate-500">John Kimaro ?" Motor Comprehensive (T 412 EFZ)</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-1 rounded-md mb-1 inline-block">ACTIVE</span>
                    <p className="text-xs text-slate-400 group-hover:text-indigo-500 transition-colors flex items-center gap-1">Select Policy <ArrowRight className="w-3 h-3" /></p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: Incident Details */}
        {step === 2 && (
          <div className="p-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-6">Incident Overview</h2>
            
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700 mb-6 flex gap-4 items-center">
              <User className="w-5 h-5 text-slate-400" />
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Reporting for: John Kimaro</p>
                <p className="text-xs text-slate-500">Policy: P11/2026/100/5042</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 block">What happened?</label>
                <textarea 
                  rows={4}
                  className="w-full bg-white dark:bg-[#0f172a] border border-slate-300 dark:border-slate-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none text-slate-900 dark:text-slate-100"
                  placeholder="Describe the incident briefly..."
                  defaultValue="Rear ended by another vehicle while stopped at traffic light on Morogoro road."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 block">Date of Loss</label>
                  <input type="date" defaultValue="2026-05-14" className="w-full bg-white dark:bg-[#0f172a] border border-slate-300 dark:border-slate-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 block">Third Party Involved?</label>
                  <select className="w-full bg-white dark:bg-[#0f172a] border border-slate-300 dark:border-slate-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100">
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <button onClick={() => setStep(1)} className="px-6 py-2.5 rounded-xl font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">Back</button>
              <button onClick={() => setStep(3)} className="px-6 py-2.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors flex items-center gap-2">Next Step <ArrowRight className="w-4 h-4" /></button>
            </div>
          </div>
        )}

        {/* STEP 3: Evidence */}
        {step === 3 && (
          <div className="p-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-6">Upload Evidence & Documents</h2>
            
            <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-12 text-center bg-slate-50 dark:bg-slate-800/30 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
              <UploadCloud className="w-12 h-12 text-slate-400 mx-auto mb-4 group-hover:text-indigo-500 transition-colors" />
              <p className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1">Drag and drop photos or PDF forms here</p>
              <p className="text-sm text-slate-500">or click to browse files</p>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded flex items-center justify-center">
                    <Car className="w-5 h-5 text-slate-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">crash_photo_rear.jpg</p>
                    <p className="text-xs text-slate-500">2.4 MB A Uploaded</p>
                  </div>
                </div>
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <button onClick={() => setStep(2)} className="px-6 py-2.5 rounded-xl font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">Back</button>
              <button 
                onClick={handleAIProcess} 
                className="px-6 py-2.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors flex items-center gap-2"
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Submit to AI Triage'} <Bot className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: AI Processing / Complete */}
        {step === 4 && (
          <div className="p-8 text-center animate-in zoom-in-95 duration-500 flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-6 border-4 border-white dark:border-[#0f172a] shadow-lg">
              <CheckCircle2 className="w-10 h-10 text-emerald-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Claim Registered Successfully</h2>
            <p className="text-slate-500 max-w-md mb-8">
              Alliance AI has extracted the evidence and generated an initial reserve. The claim has been routed to the adjuster queue.
            </p>
            
            <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4 w-full max-w-sm mx-auto mb-8">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Generated Claim Reference</p>
              <p className="text-xl font-mono font-bold text-indigo-600 dark:text-indigo-400">C11/100/1002/2026/011702</p>
            </div>

            <button 
              onClick={() => router.push('/claims/C11-1002')} 
              className="px-8 py-3 rounded-xl font-bold text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              Open Claim Canvas <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </Card>
    </div>
  );
}