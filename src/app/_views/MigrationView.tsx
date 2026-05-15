"use client";

import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import {
  Upload, FileSpreadsheet, Bot, CheckCircle2, AlertTriangle, Sparkles,
  ArrowRight, Download, Eye, RefreshCw, X, ChevronRight, Database
} from 'lucide-react';

type ImportStep = 'upload' | 'mapping' | 'validation' | 'importing' | 'done';

const FIELD_MAPPINGS = [
  { source: 'Policy No', target: 'policy_number', confidence: 99, status: 'matched' },
  { source: 'Insured Name', target: 'insured_name', confidence: 97, status: 'matched' },
  { source: 'Sum Insured', target: 'sum_insured', confidence: 95, status: 'matched' },
  { source: 'Prem Amount', target: 'gross_premium', confidence: 88, status: 'matched' },
  { source: 'Comm %', target: 'commission_rate', confidence: 91, status: 'matched' },
  { source: 'Start Dt', target: 'inception_date', confidence: 72, status: 'review' },
  { source: 'Exp Dt', target: 'expiry_date', confidence: 70, status: 'review' },
  { source: 'Veh Reg', target: 'vehicle_registration', confidence: 96, status: 'matched' },
  { source: 'AGENT_CD', target: 'broker_code', confidence: 60, status: 'review' },
  { source: 'OLD_REF', target: null, confidence: 0, status: 'unmapped' },
];

const VALIDATION_ISSUES = [
  { row: 14, field: 'inception_date', issue: 'Date format ambiguous: "01/02/26" — interpreted as 1 Feb 2026', severity: 'warn' },
  { row: 27, field: 'sum_insured', issue: 'Value "1,500,000.00" contains currency symbol — will be stripped', severity: 'warn' },
  { row: 89, field: 'vehicle_registration', issue: 'Duplicate registration T412 EFZ — policy P11/2026/Motor/1042 already exists', severity: 'error' },
  { row: 103, field: 'broker_code', issue: 'AGENT_CD "BR-009" not found in broker master — will create as new', severity: 'warn' },
];

const IMPORT_MODULES = [
  { id: 'policies', label: 'Policy Register', icon: FileSpreadsheet, desc: 'Active & historical policies from legacy system', count: '2,847 records' },
  { id: 'claims', label: 'Claims Register', icon: Database, desc: 'Open claims with financials and reserve data', count: '432 records' },
  { id: 'customers', label: 'Customer Master', icon: Database, desc: 'Insured party register with contact details', count: '1,204 records' },
  { id: 'premiums', label: 'Premium Receipts', icon: Database, desc: 'Premium collection history from general ledger', count: '8,912 records' },
];

export default function MigrationView() {
  const [step, setStep] = useState<ImportStep>('upload');
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) { setFileName(file.name); setStep('mapping'); }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) { setFileName(file.name); setStep('mapping'); }
  };

  const runImport = () => {
    setStep('importing');
    setProgress(0);
    const iv = setInterval(() => {
      setProgress(p => { if (p >= 100) { clearInterval(iv); setStep('done'); return 100; } return p + 4; });
    }, 80);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Database className="w-6 h-6 text-indigo-500" /> Legacy Migration
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Upload legacy Excel exports — Alliance AI auto-maps columns, validates data, and imports cleanly.
          </p>
        </div>
        <span className="text-[10px] font-bold px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-md border border-indigo-200 dark:border-indigo-700 flex items-center gap-1">
          <Bot className="w-3 h-3" /> Powered by Alliance AI
        </span>
      </div>

      {/* Progress Stepper */}
      <div className="flex items-center gap-2">
        {(['upload', 'mapping', 'validation', 'importing', 'done'] as ImportStep[]).map((s, i, arr) => {
          const labels = ['Upload File', 'AI Mapping', 'Validation', 'Importing', 'Complete'];
          const idx = arr.indexOf(step);
          const done = arr.indexOf(s) < idx;
          const active = s === step;
          return (
            <React.Fragment key={s}>
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${active ? 'bg-indigo-600 text-white' : done ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500'}`}>
                {done ? <CheckCircle2 className="w-3 h-3" /> : <span>{i + 1}</span>}
                <span className="hidden sm:inline">{labels[i]}</span>
              </div>
              {i < arr.length - 1 && <div className={`flex-1 h-px ${done ? 'bg-indigo-300 dark:bg-indigo-700' : 'bg-slate-200 dark:bg-slate-700'}`} />}
            </React.Fragment>
          );
        })}
      </div>

      {/* Step 1: Module Select + Upload */}
      {step === 'upload' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div>
            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">Select Data Module to Import</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {IMPORT_MODULES.map(mod => (
                <button key={mod.id} onClick={() => setSelectedModule(mod.id)}
                  className={`text-left p-4 rounded-xl border transition-all ${selectedModule === mod.id ? 'border-indigo-300 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-900/20' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0f172a] hover:border-indigo-200 dark:hover:border-indigo-800'}`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${selectedModule === mod.id ? 'bg-indigo-100 dark:bg-indigo-900/50' : 'bg-slate-100 dark:bg-slate-800'}`}>
                      <mod.icon className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-slate-100 text-sm">{mod.label}</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{mod.desc}</p>
                      <p className="text-xs font-bold text-indigo-500 dark:text-indigo-400 mt-1">{mod.count}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div
            onDragOver={e => e.preventDefault()}
            onDrop={handleFileDrop}
            className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-12 text-center hover:border-indigo-400 dark:hover:border-indigo-600 transition-colors cursor-pointer bg-slate-50/50 dark:bg-slate-900/20 group"
            onClick={() => fileRef.current?.click()}
          >
            <input ref={fileRef} type="file" accept=".xlsx,.xls,.csv" className="hidden" onChange={handleFileSelect} />
            <FileSpreadsheet className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4 group-hover:text-indigo-400 transition-colors" />
            <p className="font-semibold text-slate-700 dark:text-slate-300 mb-1">Drop your Excel or CSV file here</p>
            <p className="text-sm text-slate-400 dark:text-slate-500">Supports .xlsx, .xls, .csv — legacy Oracle exports welcome</p>
            <button className="mt-4 px-4 py-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 border border-indigo-300 dark:border-indigo-700 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors flex items-center gap-2 mx-auto">
              <Upload className="w-4 h-4" /> Browse Files
            </button>
          </div>

          <div className="flex items-center gap-3 p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/40 rounded-xl text-sm">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
            <p className="text-amber-800 dark:text-amber-300">Alliance AI will auto-map your legacy column headers and flag any data quality issues before import. No data will be committed until you approve.</p>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
              <Download className="w-4 h-4" /> Download template (.xlsx)
            </button>
          </div>
        </div>
      )}

      {/* Step 2: AI Column Mapping */}
      {step === 'mapping' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="flex items-center gap-3 p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/40 rounded-xl">
            <Sparkles className="w-5 h-5 text-indigo-500 shrink-0" />
            <div>
              <p className="font-semibold text-indigo-900 dark:text-indigo-200 text-sm">Alliance AI mapped {FIELD_MAPPINGS.filter(f => f.status === 'matched').length}/{FIELD_MAPPINGS.length} columns automatically</p>
              <p className="text-xs text-indigo-500 dark:text-indigo-400">File: <strong>{fileName}</strong> · {FIELD_MAPPINGS.length} columns detected</p>
            </div>
          </div>

          <Card className="dark:bg-[#0f172a] dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/30 grid grid-cols-3 gap-4">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Legacy Column</p>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Maps To (Alliance OS)</p>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">AI Confidence</p>
            </div>
            <div className="divide-y divide-slate-50 dark:divide-slate-800/50">
              {FIELD_MAPPINGS.map((mapping, i) => (
                <div key={i} className="px-4 py-3 grid grid-cols-3 gap-4 items-center hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <span className="text-sm font-mono font-semibold text-slate-700 dark:text-slate-300">{mapping.source}</span>
                  <div>
                    {mapping.target ? (
                      <span className="text-sm font-mono text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-2 py-0.5 rounded border border-indigo-100 dark:border-indigo-800/50">{mapping.target}</span>
                    ) : (
                      <span className="text-sm text-slate-400 dark:text-slate-500 italic">— skip —</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div className={`h-1.5 rounded-full ${mapping.confidence > 85 ? 'bg-emerald-400' : mapping.confidence > 60 ? 'bg-amber-400' : 'bg-rose-400'}`} style={{ width: `${mapping.confidence}%` }} />
                    </div>
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 w-8 shrink-0">{mapping.confidence}%</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold border ${mapping.status === 'matched' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/40' : mapping.status === 'review' ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-700/40' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700'}`}>
                      {mapping.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="flex justify-between">
            <button onClick={() => setStep('upload')} className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">← Change File</button>
            <button onClick={() => setStep('validation')} className="px-5 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-sm flex items-center gap-2">
              Validate Data <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Validation */}
      {step === 'validation' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Total Rows', value: '2,847', color: 'text-slate-900 dark:text-slate-100' },
              { label: 'Ready to Import', value: '2,843', color: 'text-emerald-600 dark:text-emerald-400' },
              { label: 'Needs Review', value: '4', color: 'text-amber-600 dark:text-amber-400' },
            ].map((s, i) => (
              <Card key={i} className="p-4 text-center dark:bg-[#0f172a] dark:border-slate-800 shadow-sm">
                <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider mb-2">{s.label}</p>
                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              </Card>
            ))}
          </div>

          <Card className="dark:bg-[#0f172a] dark:border-slate-800 shadow-sm">
            <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" /> Validation Issues ({VALIDATION_ISSUES.length})
              </p>
              <span className="text-xs text-slate-400 dark:text-slate-500">{VALIDATION_ISSUES.filter(i => i.severity === 'error').length} errors · {VALIDATION_ISSUES.filter(i => i.severity === 'warn').length} warnings</span>
            </div>
            <div className="divide-y divide-slate-50 dark:divide-slate-800/50">
              {VALIDATION_ISSUES.map((issue, i) => (
                <div key={i} className="px-4 py-3 flex items-start gap-3">
                  <div className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${issue.severity === 'error' ? 'bg-rose-500' : 'bg-amber-400'}`} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Row {issue.row}</span>
                      <span className="text-xs font-mono text-indigo-500 dark:text-indigo-400">{issue.field}</span>
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300">{issue.issue}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${issue.severity === 'error' ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-500 border-rose-200 dark:border-rose-800/40' : 'bg-amber-50 dark:bg-amber-900/20 text-amber-500 border-amber-200 dark:border-amber-700/40'}`}>
                    {issue.severity.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <div className="flex justify-between">
            <button onClick={() => setStep('mapping')} className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">← Edit Mapping</button>
            <div className="flex gap-3">
              <button className="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-2">
                <Eye className="w-4 h-4" /> Preview Data
              </button>
              <button onClick={runImport} className="px-5 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-sm flex items-center gap-2">
                <Upload className="w-4 h-4" /> Import 2,843 Records
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Importing */}
      {step === 'importing' && (
        <div className="flex flex-col items-center justify-center py-16 space-y-6 animate-in fade-in duration-300">
          <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/20 rounded-full flex items-center justify-center border-4 border-indigo-100 dark:border-indigo-800/40">
            <Database className="w-10 h-10 text-indigo-500 animate-pulse" />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Importing Records...</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{Math.round((progress / 100) * 2843).toLocaleString()} of 2,843 records processed</p>
          </div>
          <div className="w-full max-w-md bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
            <div className="h-3 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-150" style={{ width: `${progress}%` }} />
          </div>
          <div className="grid grid-cols-3 gap-4 w-full max-w-md">
            {[
              { label: 'Validated', done: progress > 20 },
              { label: 'Transformed', done: progress > 55 },
              { label: 'Committed', done: progress > 90 },
            ].map((t, i) => (
              <div key={i} className={`flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg border justify-center transition-all ${t.done ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/40 text-emerald-600 dark:text-emerald-400' : 'bg-slate-50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-700 text-slate-400'}`}>
                <CheckCircle2 className="w-3 h-3" /> {t.label}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 5: Done */}
      {step === 'done' && (
        <div className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in zoom-in-95 duration-400 space-y-4">
          <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center border-4 border-emerald-100 dark:border-emerald-800/40">
            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Migration Complete!</h2>
          <div className="grid grid-cols-3 gap-4 mt-4 w-full max-w-md">
            {[
              { label: 'Records Imported', value: '2,843' },
              { label: 'Skipped (Errors)', value: '4' },
              { label: 'Time Taken', value: '1.8s' },
            ].map((s, i) => (
              <Card key={i} className="p-4 text-center dark:bg-[#0f172a] dark:border-slate-800">
                <p className="text-xl font-bold text-slate-900 dark:text-slate-100">{s.value}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{s.label}</p>
              </Card>
            ))}
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={() => { setStep('upload'); setFileName(null); setSelectedModule(null); }} className="px-5 py-2.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 border border-indigo-300 dark:border-indigo-700 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors flex items-center gap-2">
              <RefreshCw className="w-4 h-4" /> Import Another Module
            </button>
            <button className="px-5 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm transition-colors flex items-center gap-2">
              View Imported Records <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
