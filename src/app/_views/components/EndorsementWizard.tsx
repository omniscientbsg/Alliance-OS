"use client";

import React, { useState } from 'react';
import { X, ChevronRight, CheckCircle2, Shield, Calendar, Edit3, Calculator, FileText, FileDown } from 'lucide-react';
import { CurrencyInput } from '@/components/shared/CurrencyInput';

interface EndorsementWizardProps { isOpen: boolean; onClose: () => void; policyId: string; }

const STEPS = ['Endorsement Type', 'Effective Date', 'Modifications', 'Premium Calculation', 'Review'];

export function EndorsementWizard({ isOpen, onClose, policyId }: EndorsementWizardProps) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    type: '', reason: '', date: '',
    addCovers: [] as string[],
    newSI: 50000000,
    addPremium: 1250000
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300">
        
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Pass Endorsement</h2>
            <p className="text-xs text-slate-500">Policy: {policyId} • Step {step + 1} of {STEPS.length}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200"><X className="w-5 h-5 text-slate-500" /></button>
        </div>

        <div className="px-6 py-3 bg-white border-b border-slate-100 flex items-center gap-1 overflow-x-auto">
          {STEPS.map((s, i) => (
            <React.Fragment key={s}>
              <button onClick={() => i <= step && setStep(i)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${i === step ? 'bg-aos-blue text-white' : i < step ? 'bg-aos-emerald/10 text-aos-emerald' : 'bg-slate-100 text-slate-400'}`}>
                {i < step ? <CheckCircle2 className="w-3 h-3" /> : <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[9px]">{i + 1}</span>}
                {s}
              </button>
              {i < STEPS.length - 1 && <ChevronRight className="w-3 h-3 text-slate-300 shrink-0" />}
            </React.Fragment>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
          {step === 0 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2"><Edit3 className="w-4 h-4 text-aos-blue" /> Endorsement Type</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: '101', name: 'Additional Premium (Financial)' },
                  { id: '102', name: 'Return Premium (Financial)' },
                  { id: '103', name: 'Non-Financial / Administrative' },
                  { id: '104', name: 'Extension of Cover' },
                ].map(t => (
                  <label key={t.id} className={`p-4 border rounded-xl cursor-pointer transition-all ${data.type === t.id ? 'border-aos-blue bg-aos-blue/5' : 'border-slate-200 bg-white hover:border-aos-blue/30'}`}>
                    <input type="radio" name="endorsementType" className="hidden" checked={data.type === t.id} onChange={() => setData({ ...data, type: t.id })} />
                    <span className="font-semibold text-sm text-slate-900 block">{t.name}</span>
                    <span className="text-xs text-slate-500 mt-1 block">Code: {t.id}</span>
                  </label>
                ))}
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Reason for Endorsement</label>
                <textarea className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:border-aos-blue outline-none min-h-[100px]" placeholder="Explain why this endorsement is being passed..." onChange={e => setData({ ...data, reason: e.target.value })} value={data.reason} />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2"><Calendar className="w-4 h-4 text-aos-blue" /> Endorsement Effective Date</h3>
              <div className="bg-aos-blue/5 border border-aos-blue/20 rounded-lg p-4">
                <p className="text-sm font-medium text-slate-900">Policy Period: 13/05/2026 to 12/05/2027</p>
                <p className="text-xs text-slate-600 mt-1">Endorsement effective date must fall within this period.</p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Effective Date</label>
                  <input type="date" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:border-aos-blue outline-none" onChange={e => setData({ ...data, date: e.target.value })} value={data.date} />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2"><Shield className="w-4 h-4 text-aos-blue" /> Modifications</h3>
              <div className="space-y-4">
                <CurrencyInput label="Revise Sum Insured (if applicable)" currencyCode="TZS" rate={1} fcValue={data.newSI} onFcChange={v => setData({ ...data, newSI: v })} exchangeRateType="Buying" />
                
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-2">Add / Remove Covers</label>
                  <div className="border border-slate-200 rounded-lg bg-white overflow-hidden">
                    {[
                      { code: '3115', desc: 'Political Violence & Terrorism', rate: '0.05%' },
                      { code: '3112', desc: 'Personal Accident (Extension)', rate: '0.10%' },
                    ].map(c => (
                      <div key={c.code} className="flex items-center justify-between p-3 border-b border-slate-100 last:border-0 hover:bg-slate-50">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" className="rounded text-aos-blue" onChange={e => {
                            const newCovers = e.target.checked ? [...data.addCovers, c.code] : data.addCovers.filter(x => x !== c.code);
                            setData({ ...data, addCovers: newCovers });
                          }} checked={data.addCovers.includes(c.code)} />
                          <div><p className="text-sm font-medium">{c.desc}</p><p className="text-xs text-slate-500">Code: {c.code}</p></div>
                        </label>
                        <span className="text-sm font-mono">{c.rate}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2"><Calculator className="w-4 h-4 text-aos-blue" /> Pro-rata Premium Calculation</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
                  <div className="flex justify-between text-sm"><span className="text-slate-500">Days on Risk</span><span className="font-medium">145 Days</span></div>
                  <div className="flex justify-between text-sm"><span className="text-slate-500">Unexpired Days</span><span className="font-medium text-aos-blue">220 Days</span></div>
                  <div className="flex justify-between text-sm pt-3 border-t"><span className="text-slate-500">Original Base Premium</span><span className="font-medium">TZS 1,500,000</span></div>
                  <div className="flex justify-between text-sm"><span className="text-slate-500">New Base Premium</span><span className="font-medium">TZS 1,800,000</span></div>
                  <div className="flex justify-between text-sm pt-3 border-t font-bold"><span className="text-slate-900">Additional Premium</span><span className="text-aos-emerald">TZS {data.addPremium.toLocaleString()}</span></div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2"><FileText className="w-4 h-4 text-aos-blue" /> Review Endorsement Schedule</h3>
              <div className="bg-slate-800 text-white p-6 rounded-xl space-y-6 font-mono text-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10"><Shield className="w-24 h-24" /></div>
                <div className="text-center border-b border-slate-700 pb-4">
                  <h2 className="text-lg font-bold">ALLIANCE INSURANCE CORPORATION</h2>
                  <p className="text-slate-400">ENDORSEMENT SCHEDULE</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><span className="text-slate-400">Policy No:</span> {policyId}</div>
                  <div><span className="text-slate-400">Endorsement No:</span> END-2026-00412</div>
                  <div><span className="text-slate-400">Effective Date:</span> {data.date || 'Pending'}</div>
                  <div><span className="text-slate-400">Type:</span> {data.type === '101' ? 'Additional Premium' : 'Modification'}</div>
                </div>
                <div className="border-t border-slate-700 pt-4">
                  <p className="text-slate-400 mb-2">REASON / DESCRIPTION:</p>
                  <p className="whitespace-pre-wrap">{data.reason || 'No description provided.'}</p>
                </div>
                <div className="border-t border-slate-700 pt-4 flex justify-between">
                  <span className="text-slate-400">ADDITIONAL PREMIUM DUE:</span>
                  <span className="text-aos-emerald font-bold">TZS {data.addPremium.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-slate-100 bg-white flex justify-between items-center">
          <button onClick={() => step > 0 ? setStep(step - 1) : onClose()} className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1">
            {step === 0 ? 'Cancel' : 'Back'}
          </button>
          <div className="flex gap-3">
            {step === 4 ? (
              <button onClick={onClose} className="px-6 py-2 text-sm font-medium text-white bg-aos-emerald rounded-lg hover:bg-aos-emerald/90 flex items-center gap-2 shadow-sm">
                <CheckCircle2 className="w-4 h-4" /> Authorize Endorsement
              </button>
            ) : (
              <button onClick={() => setStep(step + 1)} className="px-6 py-2 text-sm font-medium text-white bg-aos-blue rounded-lg hover:bg-aos-blue/90 flex items-center gap-2 shadow-sm">
                Next <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
