"use client";

import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Bot, Sparkles, Upload, FileText, CheckCircle2, ChevronRight, Shield, User, Zap, ArrowRight, AlertTriangle, Building } from "lucide-react";

type WizardMode = 'select' | 'rfq' | 'manual';
type WizardStep = 0 | 1 | 2 | 3;

const STEPS = ["Client & Risk", "Covers & Limits", "Rating", "Review & Bind"];

const RFQ_EXTRACTED = {
  client: { name: "ACME Manufacturing Ltd", pin: "TIN-400211901", address: "Plot 42, Mikocheni Industrial Area, Dar es Salaam", contact: "procurement@acme-tz.com" },
  risk: { product: "Fire & Allied Perils — Industrial", location: "Mikocheni Industrial Area, DSM", construction: "Reinforced Concrete", occupancy: "Manufacturing / Storage", sprinklers: true },
  covers: [
    { name: "Fire & Allied Perils", si: "TZS 4,500,000,000", requested: true },
    { name: "Earthquake & Volcanic Eruption", si: "TZS 4,500,000,000", requested: true },
    { name: "Flood & Storm", si: "TZS 2,000,000,000", requested: true },
    { name: "Business Interruption", si: "TZS 800,000,000", requested: true },
  ],
  rating: { basis: "Sum Insured", rate: "0.045%", annualPremium: "TZS 3,285,000", levy: "TZS 82,125", totalPremium: "TZS 3,367,125" },
};

export default function CreatePolicyPage() {
  const [mode, setMode] = useState<WizardMode>('select');
  const [step, setStep] = useState<WizardStep>(0);
  const [parsing, setParsing] = useState(false);
  const [parsed, setParsed] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [bound, setBound] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleRFQUpload = (file: File) => {
    setFileName(file.name);
    setParsing(true);
    setTimeout(() => { setParsing(false); setParsed(true); }, 2000);
  };

  const handleBind = () => {
    setBound(true);
  };

  if (bound) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in-95 duration-400 space-y-4">
        <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center border-4 border-emerald-100 dark:border-emerald-800/40">
          <CheckCircle2 className="w-10 h-10 text-emerald-500" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Policy Bound!</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md">
          Policy <strong>P11/2026/FIR/5051</strong> has been issued for ACME Manufacturing Ltd. Premium schedule and cover note have been generated automatically.
        </p>
        <div className="flex gap-3 mt-4">
          <button onClick={() => { setMode('select'); setStep(0); setParsed(false); setFileName(null); setBound(false); }}
            className="px-5 py-2.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 border border-indigo-300 dark:border-indigo-700 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors">
            New Quote
          </button>
          <button className="px-5 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm transition-colors flex items-center gap-2">
            View Policy <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Shield className="w-6 h-6 text-aos-blue" /> New Quotation
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Issue a policy manually or let Alliance AI parse an RFQ document.</p>
        </div>
        <span className="text-[10px] font-bold px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-md border border-indigo-200 dark:border-indigo-700 flex items-center gap-1">
          <Bot className="w-3 h-3" /> Powered by Alliance AI
        </span>
      </div>

      {/* Mode Selection */}
      {mode === 'select' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300 pt-4">
          <button onClick={() => setMode('rfq')}
            className="group text-left p-6 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0f172a] hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-lg transition-all">
            <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-indigo-100 dark:border-indigo-800/50">
              <Sparkles className="w-6 h-6 text-indigo-500" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Upload RFQ / Slip</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Upload a broker slip, RFQ email, or Word doc. Alliance AI reads it and pre-fills the entire quotation form in seconds.
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
              AI-Powered <Zap className="w-4 h-4" />
            </div>
          </button>

          <button onClick={() => setMode('manual')}
            className="group text-left p-6 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0f172a] hover:border-slate-400 dark:hover:border-slate-500 hover:shadow-lg transition-all">
            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-slate-200 dark:border-slate-700">
              <FileText className="w-6 h-6 text-slate-500 dark:text-slate-400" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Manual Entry</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Enter risk details step-by-step using the structured quotation wizard with live rating calculations.
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
              Standard Wizard <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      )}

      {/* RFQ Upload Mode */}
      {mode === 'rfq' && !parsed && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div
            onDragOver={e => e.preventDefault()}
            onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleRFQUpload(f); }}
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-indigo-300 dark:border-indigo-700 rounded-2xl p-16 text-center hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors cursor-pointer bg-indigo-50/30 dark:bg-indigo-950/10 group"
          >
            <input ref={fileRef} type="file" accept=".pdf,.docx,.xlsx,.eml,.txt" className="hidden"
              onChange={e => { const f = e.target.files?.[0]; if (f) handleRFQUpload(f); }} />
            {parsing ? (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/40 rounded-full flex items-center justify-center mx-auto">
                  <Bot className="w-8 h-8 text-indigo-500 animate-pulse" />
                </div>
                <p className="font-semibold text-indigo-900 dark:text-indigo-200">Alliance AI is reading your document...</p>
                <p className="text-sm text-indigo-500 dark:text-indigo-400">Extracting client details, risk information, covers and limits</p>
                <div className="w-48 mx-auto bg-indigo-100 dark:bg-indigo-900/40 rounded-full h-1.5 overflow-hidden">
                  <div className="h-1.5 bg-indigo-500 rounded-full animate-pulse w-3/4" />
                </div>
              </div>
            ) : (
              <>
                <Sparkles className="w-12 h-12 text-indigo-400 dark:text-indigo-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <p className="font-semibold text-slate-700 dark:text-slate-300 mb-2">Drop your RFQ, broker slip, or email here</p>
                <p className="text-sm text-slate-400 dark:text-slate-500 mb-4">Supports PDF, Word, Excel, or plain text</p>
                <button className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-sm flex items-center gap-2 mx-auto">
                  <Upload className="w-4 h-4" /> Browse Files
                </button>
              </>
            )}
          </div>
          <button onClick={() => setMode('select')} className="text-sm text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">← Back</button>
        </div>
      )}

      {/* Full Wizard (after RFQ parse OR manual) */}
      {(parsed || mode === 'manual') && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-400">

          {/* AI Parse Banner */}
          {parsed && (
            <div className="flex items-center gap-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/40 rounded-xl mb-6">
              <Sparkles className="w-5 h-5 text-indigo-500 shrink-0" />
              <div className="flex-1">
                <p className="font-semibold text-indigo-900 dark:text-indigo-200 text-sm">Alliance AI pre-filled the form from <strong>{fileName}</strong></p>
                <p className="text-xs text-indigo-500 dark:text-indigo-400 mt-0.5">4 covers, risk details, and rating extracted — review and adjust as needed</p>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            </div>
          )}

          {/* Step Progress */}
          <div className="flex items-center gap-2 mb-8">
            {STEPS.map((s, i) => {
              const done = i < step; const active = i === step;
              return (
                <div key={s} className="flex items-center gap-2 flex-1">
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${active ? 'bg-indigo-600 text-white' : done ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500'}`}>
                    {done ? <CheckCircle2 className="w-3 h-3" /> : <span>{i + 1}</span>}
                    <span className="hidden sm:inline">{s}</span>
                  </div>
                  {i < STEPS.length - 1 && <div className={`flex-1 h-px ${done ? 'bg-indigo-300 dark:bg-indigo-700' : 'bg-slate-200 dark:bg-slate-700'}`} />}
                </div>
              );
            })}
          </div>

          {/* Step 1: Client & Risk */}
          {step === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
              <Card className="p-5 dark:bg-[#0f172a] dark:border-slate-800 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 text-sm"><User className="w-4 h-4 text-indigo-500" /> Client Details</h3>
                {[
                  { label: "Insured Name", value: parsed ? RFQ_EXTRACTED.client.name : '' },
                  { label: "Tax PIN", value: parsed ? RFQ_EXTRACTED.client.pin : '' },
                  { label: "Address", value: parsed ? RFQ_EXTRACTED.client.address : '' },
                  { label: "Contact Email", value: parsed ? RFQ_EXTRACTED.client.contact : '' },
                ].map((f, i) => (
                  <div key={i}>
                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">{f.label}</label>
                    <input defaultValue={f.value} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all" />
                  </div>
                ))}
              </Card>
              <Card className="p-5 dark:bg-[#0f172a] dark:border-slate-800 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 text-sm"><Building className="w-4 h-4 text-indigo-500" /> Risk Information</h3>
                {[
                  { label: "Product / Class", value: parsed ? RFQ_EXTRACTED.risk.product : '' },
                  { label: "Risk Location", value: parsed ? RFQ_EXTRACTED.risk.location : '' },
                  { label: "Construction Type", value: parsed ? RFQ_EXTRACTED.risk.construction : '' },
                  { label: "Occupancy", value: parsed ? RFQ_EXTRACTED.risk.occupancy : '' },
                ].map((f, i) => (
                  <div key={i}>
                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">{f.label}</label>
                    <input defaultValue={f.value} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all" />
                  </div>
                ))}
                {parsed && (
                  <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-2 rounded-lg border border-emerald-100 dark:border-emerald-800/40">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> Sprinkler system detected — rate reduction applied
                  </div>
                )}
              </Card>
            </div>
          )}

          {/* Step 2: Covers */}
          {step === 1 && (
            <Card className="dark:bg-[#0f172a] dark:border-slate-800 shadow-sm overflow-hidden animate-in fade-in duration-300">
              <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-2"><Shield className="w-4 h-4 text-indigo-500" /> Covers & Limits</h3>
                {parsed && <span className="text-xs text-indigo-500 dark:text-indigo-400 flex items-center gap-1"><Sparkles className="w-3 h-3" /> AI-extracted from RFQ</span>}
              </div>
              <div className="divide-y divide-slate-50 dark:divide-slate-800/50">
                {(parsed ? RFQ_EXTRACTED.covers : [
                  { name: "Primary Cover", si: "", requested: true },
                  { name: "Extension / Rider", si: "", requested: false },
                ]).map((cover, i) => (
                  <div key={i} className="px-5 py-4 flex items-center gap-4">
                    <input type="checkbox" defaultChecked={cover.requested} className="w-4 h-4 accent-indigo-600 rounded shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{cover.name}</p>
                    </div>
                    <div className="w-48">
                      <label className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold block mb-1">SUM INSURED</label>
                      <input defaultValue={cover.si} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all font-mono" />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Step 3: Rating */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <Card className="dark:bg-[#0f172a] dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-2"><Zap className="w-4 h-4 text-indigo-500" /> Rating Engine</h3>
                  <span className="text-xs text-indigo-500 dark:text-indigo-400 flex items-center gap-1"><Bot className="w-3 h-3" /> Alliance AI rated</span>
                </div>
                <div className="p-5 grid grid-cols-2 gap-4">
                  {[
                    { label: "Rating Basis", value: parsed ? RFQ_EXTRACTED.rating.basis : "Sum Insured" },
                    { label: "Applied Rate", value: parsed ? RFQ_EXTRACTED.rating.rate : "0.050%" },
                    { label: "Annual Premium", value: parsed ? RFQ_EXTRACTED.rating.annualPremium : "—" },
                    { label: "Levy (2.5%)", value: parsed ? RFQ_EXTRACTED.rating.levy : "—" },
                  ].map((r, i) => (
                    <div key={i} className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800">
                      <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider mb-1">{r.label}</p>
                      <p className="text-lg font-bold text-slate-900 dark:text-slate-100 font-mono">{r.value}</p>
                    </div>
                  ))}
                </div>
                <div className="mx-5 mb-5 p-4 bg-indigo-600 rounded-xl flex items-center justify-between">
                  <span className="text-sm font-bold text-indigo-100">Total Premium (incl. Levy)</span>
                  <span className="text-xl font-bold text-white font-mono">{parsed ? RFQ_EXTRACTED.rating.totalPremium : "—"}</span>
                </div>
              </Card>
              {parsed && (
                <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/40 rounded-xl text-sm">
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-amber-800 dark:text-amber-300">Rate of 0.045% includes a 10% sprinkler discount. Underwriter approval required for SI above TZS 3B — this quote will auto-route to the Large Risk Queue.</p>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Review */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <Card className="dark:bg-[#0f172a] dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-5">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Quote Summary</p>
                  <h2 className="text-lg font-bold text-white">{parsed ? RFQ_EXTRACTED.client.name : "New Insured"}</h2>
                  <p className="text-sm text-slate-400 mt-0.5">{parsed ? RFQ_EXTRACTED.risk.product : "Insurance Policy"}</p>
                </div>
                <div className="p-5 space-y-3 text-sm">
                  {[
                    { label: "Period of Insurance", value: "14 May 2026 — 13 May 2027" },
                    { label: "Total Sum Insured", value: "TZS 11,800,000,000" },
                    { label: "Total Premium", value: parsed ? RFQ_EXTRACTED.rating.totalPremium : "—" },
                    { label: "Payment Terms", value: "30 days from inception" },
                    { label: "Routing", value: "Large Risk Queue — UW Approval Required" },
                  ].map((r, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-slate-50 dark:border-slate-800/50 last:border-0">
                      <span className="text-slate-500 dark:text-slate-400">{r.label}</span>
                      <span className="font-semibold text-slate-900 dark:text-slate-100">{r.value}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <button onClick={() => step === 0 ? setMode('select') : setStep(s => (s - 1) as WizardStep)}
              className="px-4 py-2 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
              ← {step === 0 ? 'Back to Mode Select' : 'Previous'}
            </button>
            {step < 3 ? (
              <button onClick={() => setStep(s => (s + 1) as WizardStep)}
                className="px-5 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-sm flex items-center gap-2">
                Next <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button onClick={handleBind}
                className="px-6 py-2.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-xl transition-colors shadow-sm shadow-emerald-600/20 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Bind Policy
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
