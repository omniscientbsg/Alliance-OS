"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ChevronLeft, Search, Shield, User, Car, CheckCircle2, 
  ArrowRight, Sparkles, CreditCard, FileText, Zap, Send, 
  Calculator, Settings, Mail, MessageSquare
} from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function QuoteWizardView() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  
  // States for interactivity
  const [isQuoting, setIsQuoting] = useState(false);
  const [quoteMode, setQuoteMode] = useState<'ai' | 'manual' | null>(null);
  const [selectedQuote, setSelectedQuote] = useState<number | null>(null);
  const [isSending, setIsSending] = useState(false);

  // Manual Quote State
  const [manualCovers, setManualCovers] = useState({
    ownDamage: true,
    thirdParty: true,
    excessProtector: false,
    lossOfUse: false,
  });

  const handleGenerateAI = () => {
    setQuoteMode('ai');
    setIsQuoting(true);
    setTimeout(() => {
      setIsQuoting(false);
      setStep(4);
    }, 1500);
  };

  const handleCalculateManual = () => {
    setQuoteMode('manual');
    setIsQuoting(true);
    setTimeout(() => {
      setIsQuoting(false);
      setSelectedQuote(0); // Auto-select the only manual tier
      setStep(4);
    }, 800);
  };

  const handleSendQuote = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setStep(10); // Quote Sent Success screen
    }, 1500);
  };

  // Calculate manual premium
  const manualPremium = 118000 
    + (manualCovers.ownDamage ? 2250000 : 0) 
    + (manualCovers.excessProtector ? 225000 : 0) 
    + (manualCovers.lossOfUse ? 150000 : 0);

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      
      {/* Header & Back */}
      <div className="flex items-center gap-4">
        <button onClick={() => router.back()} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg text-slate-500 transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Originate Policy</h1>
          <p className="text-sm text-slate-500">End-to-End Quotation & Binding Workflow</p>
        </div>
      </div>

      {/* Stepper (Only show if not in success screens) */}
      {step < 10 && (
        <div className="flex items-center justify-between relative px-8">
          <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-1 bg-slate-200 dark:bg-slate-800 -z-10 rounded-full" />
          <div className={`absolute left-8 top-1/2 -translate-y-1/2 h-1 bg-aos-blue -z-10 rounded-full transition-all duration-500`} style={{ width: `${((step - 1) / 4) * 100}%` }} />
          
          {['Select Client', 'Risk Details', 'Quote Generation', 'Review & Action', 'Issue & Pay'].map((label, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-colors bg-white dark:bg-[#0f172a] ${
                step > i + 1 ? 'border-aos-blue text-aos-blue' : 
                step === i + 1 ? 'border-aos-blue text-aos-blue shadow-[0_0_10px_rgba(37,99,235,0.2)]' : 
                'border-slate-200 dark:border-slate-800 text-slate-400'
              }`}>
                {step > i + 1 ? <CheckCircle2 className="w-5 h-5 text-aos-blue" /> : i + 1}
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${step >= i + 1 ? 'text-slate-900 dark:text-slate-100' : 'text-slate-400'}`}>{label}</span>
            </div>
          ))}
        </div>
      )}

      <Card className="bg-white dark:bg-[#0f172a] border-slate-200 dark:border-slate-800 shadow-lg min-h-[500px] overflow-hidden relative">
        
        {/* STEP 1: Select Client */}
        {step === 1 && (
          <div className="p-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-6">Who is this policy for?</h2>
            
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                autoFocus
                type="text" 
                placeholder="Search existing customers by Name, TIN, or Phone..." 
                className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-aos-blue text-slate-900 dark:text-slate-100"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div 
                onClick={() => setStep(2)}
                className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-aos-blue cursor-pointer transition-all hover:shadow-md flex items-start gap-4 group"
              >
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 text-slate-500" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-aos-blue">John Kimaro</p>
                  <p className="text-xs text-slate-500 mb-2">Retail Client A +255 712 345 678</p>
                  <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-600 dark:text-slate-300">1 Active Policy</span>
                </div>
              </div>
              <div 
                className="p-4 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl hover:border-aos-blue hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-all flex flex-col items-center justify-center text-center group"
              >
                <User className="w-6 h-6 text-slate-400 group-hover:text-aos-blue mb-2" />
                <p className="text-sm font-bold text-slate-900 dark:text-slate-100">Create New Client</p>
                <p className="text-xs text-slate-500">Add a new retail or corporate entity</p>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Risk Details */}
        {step === 2 && (
          <div className="p-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-6">Define the Risk (Motor)</h2>
            
            <div className="space-y-4 mb-8 max-w-2xl">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Registration No.</label>
                <input type="text" defaultValue="T 992 ABC" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-aos-blue outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Make & Model</label>
                  <input type="text" defaultValue="Toyota Land Cruiser" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-aos-blue outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Year of Mfg</label>
                  <input type="text" defaultValue="2022" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-aos-blue outline-none" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Vehicle Value (Sum Insured in TZS)</label>
                <input type="text" defaultValue="120,000,000" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-aos-blue outline-none font-mono font-medium" />
              </div>
            </div>

            <div className="flex justify-between">
              <button onClick={() => setStep(1)} className="px-6 py-2 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300">Back</button>
              <button onClick={() => setStep(3)} className="px-6 py-2 rounded-xl font-bold text-white bg-aos-blue hover:bg-blue-700 flex items-center gap-2">Proceed to Quotation <ArrowRight className="w-4 h-4" /></button>
            </div>
          </div>
        )}

        {/* STEP 3: Quote Generation Mode (AI vs Manual) */}
        {step === 3 && (
          <div className="p-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-6">How would you like to generate this quote?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              
              {/* Option A: AI Quoting */}
              <div className="border border-slate-200 dark:border-slate-700 rounded-2xl p-6 bg-slate-50/50 dark:bg-slate-900/20 hover:border-indigo-400 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">AI Auto-Tiers</h3>
                <p className="text-sm text-slate-500 mb-6 min-h-[40px]">Alliance AI generates 3 optimised coverage tiers (Basic, Comprehensive, Exec) tailored to the client's risk profile.</p>
                <button 
                  onClick={handleGenerateAI}
                  disabled={isQuoting}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  {isQuoting && quoteMode === 'ai' ? <><Zap className="w-4 h-4 animate-pulse" /> Generating...</> : 'Generate AI Tiers'}
                </button>
              </div>

              {/* Option B: Manual Quoting */}
              <div className="border border-slate-200 dark:border-slate-700 rounded-2xl p-6 bg-slate-50/50 dark:bg-slate-900/20 hover:border-aos-blue transition-colors">
                <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center mb-4">
                  <Settings className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">Manual Quote Builder</h3>
                <p className="text-sm text-slate-500 mb-4">Manually select coverages, adjust loadings/discounts, and build a single custom quote for the client.</p>
                
                {/* Manual Toggles */}
                <div className="space-y-2 mb-6">
                  <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 p-2 border border-slate-200 dark:border-slate-700 rounded-lg">
                    <input type="checkbox" checked disabled className="w-4 h-4 text-aos-blue rounded" />
                    Own Damage (Base)
                  </label>
                  <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 p-2 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800">
                    <input type="checkbox" checked={manualCovers.excessProtector} onChange={(e) => setManualCovers({...manualCovers, excessProtector: e.target.checked})} className="w-4 h-4 text-aos-blue rounded" />
                    Excess Protector (+10%)
                  </label>
                  <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 p-2 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800">
                    <input type="checkbox" checked={manualCovers.lossOfUse} onChange={(e) => setManualCovers({...manualCovers, lossOfUse: e.target.checked})} className="w-4 h-4 text-aos-blue rounded" />
                    Loss of Use (Flat TZS 150k)
                  </label>
                </div>

                <button 
                  onClick={handleCalculateManual}
                  disabled={isQuoting}
                  className="w-full py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 text-sm font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  {isQuoting && quoteMode === 'manual' ? <><Calculator className="w-4 h-4 animate-pulse" /> Calculating...</> : 'Calculate Premium'}
                </button>
              </div>

            </div>

            <div className="flex justify-start">
              <button onClick={() => setStep(2)} className="px-6 py-2 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300">Back</button>
            </div>
          </div>
        )}

        {/* STEP 4: Review Quotes & Action (Send vs Bind) */}
        {step === 4 && (
          <div className="p-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Review & Action</h2>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded border border-indigo-200">Quote Ref: Q-2026-9812</span>
            </div>

            {/* AI Tiers View */}
            {quoteMode === 'ai' && (
              <div className="grid grid-cols-3 gap-6 mb-8">
                {[
                  { tier: 'Third Party Only', desc: 'Basic legal compliance', premium: '118,000', covers: ['TP Bodily Injury', 'TP Property Damage'], uncovers: ['Own Damage', 'Theft', 'Fire'] },
                  { tier: 'Comprehensive', desc: 'Standard market coverage', premium: '4,800,000', covers: ['Own Damage', 'Theft', 'Fire', 'TP Bodily Injury', 'TP Property Damage'], uncovers: ['Excess Protector', 'Loss of Use'], isPopular: true },
                  { tier: 'Executive Plus', desc: 'Zero excess, full protection', premium: '5,650,000', covers: ['Own Damage', 'Theft', 'Fire', 'Excess Protector', 'Loss of Use (30 days)'], uncovers: [] },
                ].map((q, i) => (
                  <div 
                    key={i} 
                    onClick={() => setSelectedQuote(i)}
                    className={`relative rounded-2xl border-2 p-5 cursor-pointer transition-all ${
                      selectedQuote === i 
                        ? 'border-aos-blue bg-blue-50/30 dark:bg-blue-900/10 shadow-md' 
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    {q.isPopular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-[10px] font-bold px-3 py-0.5 rounded-full">RECOMMENDED</span>}
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">{q.tier}</h3>
                    <p className="text-xs text-slate-500 mb-4">{q.desc}</p>
                    <p className="text-2xl font-bold font-mono text-slate-900 dark:text-slate-100 mb-6">
                      <span className="text-sm font-normal text-slate-500">TZS </span>{q.premium}
                    </p>
                    
                    <div className="space-y-2">
                      {q.covers.map((c, j) => (
                        <div key={j} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> {c}
                        </div>
                      ))}
                      {q.uncovers.map((c, j) => (
                        <div key={j} className="flex items-center gap-2 text-xs text-slate-400">
                          <div className="w-3.5 h-3.5 rounded-full border border-slate-300 dark:border-slate-600 shrink-0" /> {c}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Manual Quote View */}
            {quoteMode === 'manual' && (
              <div className="mb-8">
                <div className="max-w-md mx-auto rounded-2xl border-2 border-aos-blue bg-blue-50/30 dark:bg-blue-900/10 shadow-md p-6">
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 text-center mb-1">Custom Comprehensive Quote</h3>
                  <p className="text-xs text-slate-500 text-center mb-6">Manually configured coverages</p>
                  
                  <div className="text-center mb-6">
                    <p className="text-3xl font-bold font-mono text-slate-900 dark:text-slate-100">
                      <span className="text-sm font-normal text-slate-500">TZS </span>{manualPremium.toLocaleString()}
                    </p>
                  </div>

                  <div className="space-y-2 bg-white dark:bg-[#0f172a] p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between text-sm"><span className="text-slate-600 dark:text-slate-300">Own Damage & TP</span><span className="font-mono">TZS 2,368,000</span></div>
                    {manualCovers.excessProtector && <div className="flex items-center justify-between text-sm"><span className="text-slate-600 dark:text-slate-300">Excess Protector</span><span className="font-mono">TZS 225,000</span></div>}
                    {manualCovers.lossOfUse && <div className="flex items-center justify-between text-sm"><span className="text-slate-600 dark:text-slate-300">Loss of Use</span><span className="font-mono">TZS 150,000</span></div>}
                  </div>
                </div>
              </div>
            )}

            {/* Real-World Actions (Send vs Bind) */}
            <div className="flex justify-between items-center border-t border-slate-100 dark:border-slate-800 pt-6 mt-6">
              <button onClick={() => setStep(3)} className="px-6 py-2.5 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300">Back to Build</button>
              
              <div className="flex gap-4">
                {/* Save & Send Option */}
                <button 
                  onClick={handleSendQuote}
                  disabled={selectedQuote === null || isSending}
                  className="px-6 py-2.5 rounded-xl font-bold text-slate-700 dark:text-slate-200 bg-white border border-slate-200 dark:bg-slate-900 dark:border-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center gap-2"
                >
                  {isSending ? <><Zap className="w-4 h-4 animate-pulse" /> Sending...</> : <><Send className="w-4 h-4" /> Send Quote to Client</>}
                </button>

                {/* Bind Option */}
                <button 
                  onClick={() => setStep(5)}
                  disabled={selectedQuote === null}
                  className="px-6 py-2.5 rounded-xl font-bold text-white bg-aos-blue hover:bg-blue-700 disabled:opacity-50 transition-all flex items-center gap-2 shadow-md"
                >
                  Client Accepted A Proceed to Bind <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Bind & Issue */}
        {step === 5 && (
          <div className="p-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-6">Collect Premium & Issue</h2>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 border border-slate-200 dark:border-slate-700 mb-6">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-4">Binding Summary</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between"><span className="text-slate-500">Client</span><span className="font-medium dark:text-slate-200">John Kimaro</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Asset</span><span className="font-medium dark:text-slate-200">Toyota Land Cruiser (T 992 ABC)</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Mode</span><span className="font-medium dark:text-slate-200">{quoteMode === 'ai' ? 'AI Generated Tier' : 'Custom Built'}</span></div>
                    <div className="h-px bg-slate-200 dark:bg-slate-700 my-2" />
                    <div className="flex justify-between text-base font-bold text-slate-900 dark:text-slate-100">
                      <span>Total Payable</span><span className="font-mono">TZS {quoteMode === 'manual' ? manualPremium.toLocaleString() : '4,800,000'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Payment Method</h3>
                {[
                  { id: 'bank', name: 'Bank Transfer / Deposit', icon: FileText },
                  { id: 'mobile', name: 'Mobile Money (M-Pesa, Tigo)', icon: Zap },
                  { id: 'card', name: 'Credit / Debit Card', icon: CreditCard },
                ].map((pm, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-aos-blue cursor-pointer">
                    <input type="radio" name="payment" className="w-4 h-4 text-aos-blue" />
                    <pm.icon className="w-5 h-5 text-slate-400" />
                    <span className="text-sm font-medium text-slate-900 dark:text-slate-100">{pm.name}</span>
                  </div>
                ))}

                <button 
                  onClick={() => setStep(11)} // Success Bound
                  className="w-full mt-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Shield className="w-4 h-4" /> Receive Funds & Generate Policy
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SUCCESS SCREEN: Quote Sent */}
        {step === 10 && (
          <div className="p-8 text-center animate-in zoom-in-95 duration-500 flex flex-col items-center justify-center min-h-[450px]">
            <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-6 border-4 border-white dark:border-[#0f172a] shadow-lg">
              <Send className="w-10 h-10 text-aos-blue" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Quote Sent to Client</h2>
            <p className="text-slate-500 max-w-md mb-8">
              Quotation <span className="font-bold text-slate-700 dark:text-slate-300">Q-2026-9812</span> has been saved as a Draft and emailed to John Kimaro. The pipeline status is now "Pending Acceptance".
            </p>
            
            <div className="flex gap-4">
              <button 
                onClick={() => router.push('/policies')} 
                className="px-6 py-2.5 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 transition-colors"
              >
                Return to Dashboard
              </button>
              <button 
                onClick={() => {
                  // Simulate client calling back to bind
                  setStep(5);
                }} 
                className="px-6 py-2.5 rounded-xl font-bold text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                Client Accepted (Bind Now) <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* SUCCESS SCREEN: Policy Bound */}
        {step === 11 && (
          <div className="p-8 text-center animate-in zoom-in-95 duration-500 flex flex-col items-center justify-center min-h-[450px]">
            <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-6 border-4 border-white dark:border-[#0f172a] shadow-lg">
              <CheckCircle2 className="w-10 h-10 text-emerald-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Policy Issued & Active</h2>
            <p className="text-slate-500 max-w-md mb-8">
              Payment received. The policy schedule and certificate have been generated. The Reinsurance engine has logged the risk.
            </p>
            
            <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4 w-full max-w-sm mx-auto mb-8">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Generated Policy Number</p>
              <p className="text-xl font-mono font-bold text-emerald-600 dark:text-emerald-400">P11/2026/100/5042</p>
            </div>

            <div className="flex gap-4 justify-center">
              <button className="px-4 py-2.5 rounded-xl font-bold text-slate-700 dark:text-slate-200 bg-white border border-slate-200 dark:bg-slate-900 dark:border-slate-700 hover:bg-slate-50 hover:border-slate-300 flex items-center gap-2">
                <Mail className="w-4 h-4" /> Email Docs
              </button>
              <button 
                onClick={() => router.push('/policies')} 
                className="px-6 py-2.5 rounded-xl font-bold text-white bg-aos-blue hover:bg-blue-700 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        )}

      </Card>
    </div>
  );
}