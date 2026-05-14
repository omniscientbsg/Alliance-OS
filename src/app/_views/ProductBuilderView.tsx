"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Bot, Sparkles, ChevronRight, CheckCircle2, Zap, Shield, FileText, Settings, Eye, Code, ArrowRight, Plus, Layers } from 'lucide-react';

type BuildStep = 'prompt' | 'generating' | 'review' | 'done';

const EXAMPLE_PROMPTS = [
  "Parametric crop insurance triggered by rainfall below 50mm, flat rate 2%, covers smallholder farmers",
  "Motor commercial comprehensive product with excess protector rider and windscreen add-on",
  "Group life insurance with accidental death benefit, age bands 18-65, employer-paid",
  "Marine cargo open cover for imports, ICC-A conditions, automatic attachment on bill of lading",
];

const GENERATED_PRODUCT = {
  name: "Parametric Crop Insurance — Rainfall Trigger",
  code: "AGR-PARA-001",
  class: "Agriculture / Parametric",
  covers: [
    { code: "AGR-001", name: "Rainfall Deficit Loss", limit: "TZS 5,000,000", trigger: "Rainfall < 50mm / 30 days" },
    { code: "AGR-002", name: "Crop Failure Indemnity", limit: "TZS 2,500,000", trigger: "Linked to AGR-001 trigger" },
  ],
  rating: { basis: "Flat Rate", rate: "2.00%", minPremium: "TZS 50,000" },
  fields: [
    { label: "Farm Location (GPS)", type: "geo", required: true },
    { label: "Crop Type", type: "dropdown", options: ["Maize", "Rice", "Wheat", "Sunflower"] },
    { label: "Acreage (hectares)", type: "number", required: true },
    { label: "Sum Insured", type: "currency", required: true },
    { label: "Growing Season", type: "date-range", required: true },
  ],
  schema: `CREATE TABLE agr_para_risk (
  policy_no    VARCHAR(50),
  farm_lat     DECIMAL(9,6),
  farm_lng     DECIMAL(9,6),
  crop_type    VARCHAR(50),
  acreage      DECIMAL(10,2),
  sum_insured  DECIMAL(18,2),
  season_start DATE,
  season_end   DATE
);`,
};

export default function ProductBuilderView() {
  const [step, setStep] = useState<BuildStep>('prompt');
  const [inputText, setInputText] = useState('');
  const [activeExample, setActiveExample] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<'covers' | 'fields' | 'rating' | 'schema'>('covers');

  const handleGenerate = () => {
    if (!inputText.trim()) return;
    setStep('generating');
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); setStep('review'); return 100; }
        return p + 8;
      });
    }, 120);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-indigo-500" /> Product Builder
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Describe a product in plain language — Alliance AI generates the schema, covers, rating logic, and UI forms instantly.
          </p>
        </div>
        <span className="text-[10px] font-bold px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-md border border-indigo-200 dark:border-indigo-700 flex items-center gap-1">
          <Bot className="w-3 h-3" /> Powered by Alliance AI
        </span>
      </div>

      {/* Step 1: Natural Language Input */}
      {(step === 'prompt' || step === 'generating') && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <Card className="p-6 border-indigo-200 dark:border-indigo-800/50 bg-gradient-to-br from-indigo-50/50 to-white dark:from-indigo-950/20 dark:to-[#0f172a] dark:border shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Bot className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h2 className="font-semibold text-slate-900 dark:text-slate-100">Describe your insurance product</h2>
            </div>
            <textarea
              className="w-full h-32 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 resize-none transition-all"
              placeholder="e.g. Parametric crop insurance triggered by rainfall below 50mm, flat rate 2%, covers smallholder farmers in Tanzania..."
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              disabled={step === 'generating'}
            />
            <div className="flex items-center justify-between mt-4">
              <span className="text-xs text-slate-400 dark:text-slate-500">{inputText.length} characters</span>
              <button
                onClick={handleGenerate}
                disabled={!inputText.trim() || step === 'generating'}
                className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-semibold text-sm transition-colors shadow-sm shadow-indigo-600/20"
              >
                <Sparkles className="w-4 h-4" />
                {step === 'generating' ? 'Generating...' : 'Generate with Alliance AI'}
              </button>
            </div>
          </Card>

          {/* Example prompts */}
          <div>
            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">Try an example</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {EXAMPLE_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => { setInputText(prompt); setActiveExample(i); }}
                  className={`text-left p-4 rounded-xl border text-sm transition-all group ${
                    activeExample === i
                      ? 'border-indigo-300 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-900/20'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0f172a] hover:border-indigo-200 dark:hover:border-indigo-800'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${activeExample === i ? 'bg-indigo-100 dark:bg-indigo-900/50' : 'bg-slate-100 dark:bg-slate-800'}`}>
                      <Layers className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300 leading-relaxed">{prompt}</span>
                  </div>
                  <div className="flex justify-end mt-2">
                    <ChevronRight className={`w-4 h-4 text-indigo-400 transition-opacity ${activeExample === i ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Generation Progress */}
          {step === 'generating' && (
            <Card className="p-6 border-indigo-200 dark:border-indigo-800/50 bg-indigo-50/50 dark:bg-indigo-950/20 shadow-sm animate-in slide-in-from-bottom-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white animate-pulse" />
                </div>
                <div>
                  <p className="font-semibold text-indigo-900 dark:text-indigo-200 text-sm">Alliance AI is building your product...</p>
                  <p className="text-xs text-indigo-500 dark:text-indigo-400">{progress < 30 ? 'Analysing product description...' : progress < 60 ? 'Generating cover structure...' : progress < 85 ? 'Building rating logic & schema...' : 'Creating UI form definitions...'}</p>
                </div>
              </div>
              <div className="w-full bg-indigo-100 dark:bg-indigo-900/40 rounded-full h-2 overflow-hidden">
                <div className="h-2 bg-indigo-600 dark:bg-indigo-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
              <div className="grid grid-cols-4 gap-2 mt-4">
                {[
                  { label: 'Product Schema', done: progress > 25 },
                  { label: 'Cover Sections', done: progress > 50 },
                  { label: 'Rating Logic', done: progress > 75 },
                  { label: 'UI Forms', done: progress > 90 },
                ].map((t, i) => (
                  <div key={i} className={`flex items-center gap-1.5 text-xs px-2 py-1.5 rounded-lg border transition-all ${t.done ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/50 text-emerald-600 dark:text-emerald-400' : 'bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 text-slate-400'}`}>
                    <CheckCircle2 className={`w-3 h-3 shrink-0 ${t.done ? 'text-emerald-500' : 'opacity-30'}`} />
                    <span className="truncate">{t.label}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      )}

      {/* Step 2: Review Generated Product */}
      {step === 'review' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-400">
          {/* Success Banner */}
          <div className="flex items-center gap-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 rounded-xl">
            <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
            <div className="flex-1">
              <p className="font-semibold text-emerald-900 dark:text-emerald-200 text-sm">Product generated successfully</p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">Alliance AI created 2 covers, a rating engine, 5 UI fields, and a database schema in 1.4s</p>
            </div>
            <button onClick={() => { setStep('prompt'); setInputText(''); setActiveExample(null); }} className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1">
              <Plus className="w-3 h-3" /> New Product
            </button>
          </div>

          {/* Product Summary */}
          <Card className="dark:bg-[#0f172a] dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{GENERATED_PRODUCT.class}</p>
                <h2 className="text-lg font-bold text-white">{GENERATED_PRODUCT.name}</h2>
                <p className="text-sm text-slate-400 mt-0.5">Product Code: <span className="text-slate-200 font-mono">{GENERATED_PRODUCT.code}</span></p>
              </div>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-indigo-600/30 text-indigo-300 text-xs font-bold rounded-md border border-indigo-700/50">AI Generated</span>
                <span className="px-2 py-1 bg-amber-600/20 text-amber-400 text-xs font-bold rounded-md border border-amber-700/30">Draft</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/30">
              {([
                { key: 'covers', label: 'Covers', icon: Shield },
                { key: 'fields', label: 'UI Fields', icon: FileText },
                { key: 'rating', label: 'Rating', icon: Zap },
                { key: 'schema', label: 'DB Schema', icon: Code },
              ] as const).map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === tab.key ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 bg-white dark:bg-[#0f172a]' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                >
                  <tab.icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-5">
              {activeTab === 'covers' && (
                <div className="space-y-3">
                  {GENERATED_PRODUCT.covers.map((cover, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800">
                      <div className="w-9 h-9 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center shrink-0 border border-indigo-100 dark:border-indigo-800/50">
                        <Shield className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-slate-900 dark:text-slate-100 text-sm">{cover.name}</p>
                          <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">{cover.code}</span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Trigger: <span className="font-medium text-slate-700 dark:text-slate-300">{cover.trigger}</span></p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Limit: <span className="font-semibold text-slate-800 dark:text-slate-200">{cover.limit}</span></p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'fields' && (
                <div className="space-y-2">
                  {GENERATED_PRODUCT.fields.map((field, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800">
                      <span className="w-5 h-5 bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{field.label}</p>
                        {field.options && <p className="text-xs text-slate-400 dark:text-slate-500">Options: {field.options.join(', ')}</p>}
                      </div>
                      <span className="text-xs font-mono text-indigo-500 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-2 py-0.5 rounded border border-indigo-100 dark:border-indigo-800/50">{field.type}</span>
                      {field.required && <span className="text-[10px] text-rose-500 font-bold">REQ</span>}
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'rating' && (
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'Rating Basis', value: GENERATED_PRODUCT.rating.basis },
                    { label: 'Rate', value: GENERATED_PRODUCT.rating.rate },
                    { label: 'Minimum Premium', value: GENERATED_PRODUCT.rating.minPremium },
                  ].map((r, i) => (
                    <div key={i} className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800 text-center">
                      <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider mb-2">{r.label}</p>
                      <p className="text-xl font-bold text-slate-900 dark:text-slate-100">{r.value}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'schema' && (
                <pre className="bg-slate-900 dark:bg-black/40 text-emerald-400 text-xs p-4 rounded-xl overflow-x-auto border border-slate-700 dark:border-slate-800 leading-relaxed font-mono">
                  {GENERATED_PRODUCT.schema}
                </pre>
              )}
            </div>
          </Card>

          {/* Action Footer */}
          <div className="flex items-center justify-between pt-2">
            <button onClick={() => setStep('prompt')} className="px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors flex items-center gap-1">
              ← Refine Prompt
            </button>
            <div className="flex gap-3">
              <button className="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-2">
                <Eye className="w-4 h-4" /> Preview Form
              </button>
              <button
                onClick={() => setStep('done')}
                className="px-5 py-2 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 rounded-xl shadow-sm shadow-indigo-600/20 transition-colors flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" /> Publish Product <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Published */}
      {step === 'done' && (
        <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in-95 duration-400">
          <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mb-6 border-4 border-emerald-100 dark:border-emerald-800/50">
            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Product Published!</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-2 max-w-md">
            <strong>AGR-PARA-001</strong> is now live. Underwriters can quote and issue policies immediately. The database schema has been applied automatically.
          </p>
          <div className="flex gap-3 mt-6">
            <button onClick={() => { setStep('prompt'); setInputText(''); setActiveExample(null); }} className="px-5 py-2.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 border border-indigo-300 dark:border-indigo-700 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" /> Build Another Product
            </button>
            <button className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-sm flex items-center gap-2">
              <Settings className="w-4 h-4" /> View Product Setup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
