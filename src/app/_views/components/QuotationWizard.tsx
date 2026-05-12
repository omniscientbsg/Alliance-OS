"use client";

import React, { useState } from 'react';
import { X, ChevronRight, ChevronLeft, Search, CheckCircle2, AlertTriangle, Calculator, FileDown, Users, Shield, Layers, Settings, Eye } from 'lucide-react';
import { CurrencyInput } from '@/components/shared/CurrencyInput';
import { StatusBadge } from '@/components/shared/StatusBadge';

interface QuotationWizardProps { isOpen: boolean; onClose: () => void; }

const STEPS = ['Customer', 'Product', 'Risk Details', 'Covers', 'Pricing', 'Review'];

export function QuotationWizard({ isOpen, onClose }: QuotationWizardProps) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    customerCode: '', customerName: '', tin: '',
    product: '', section: '', policyType: '',
    vehicleReg: '', vehicleMake: '', vehicleModel: '', vehicleYear: '', vehicleCC: '', bodyType: '', usage: '', fuelType: '',
    covers: ['3101', '3109', '3501'] as string[],
    sumInsured: 50000000, basePremium: 0, tax: 0, totalPremium: 0,
  });

  if (!isOpen) return null;

  const computed = {
    basePremium: Math.round(data.sumInsured * 0.03),
    levy: Math.round(data.sumInsured * 0.03 * 0.002),
    stampDuty: 10000,
    get total() { return this.basePremium + this.levy + this.stampDuty; }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div>
            <h2 className="text-lg font-bold text-slate-900">New Quotation</h2>
            <p className="text-xs text-slate-500">Guided policy creation — {STEPS[step]}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200"><X className="w-5 h-5 text-slate-500" /></button>
        </div>

        {/* Step indicator */}
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

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {step === 0 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2"><Users className="w-4 h-4 text-aos-blue" /> Customer Selection</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Search Customer (TIN / Name)</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="text" placeholder="Search by TIN, name, or code..." className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-sm focus:border-aos-blue outline-none" onChange={e => setData({ ...data, customerName: e.target.value || 'ACME CORPORATION LTD' })} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Customer Code</label>
                  <input type="text" value="6010000147" readOnly className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600" />
                </div>
              </div>
              {/* Mock search result */}
              <div className="bg-aos-blue/5 border border-aos-blue/20 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-bold text-slate-900">ACME CORPORATION LTD</p>
                    <p className="text-xs text-slate-500 mt-0.5">Code: 6010000147 • Category: 601 — Agents Dar es Salaam</p>
                    <p className="text-xs text-slate-400">TIN: 123-456-789 • Credit Limit: TZS 500,000,000</p>
                  </div>
                  <StatusBadge status="active" />
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <button className="px-3 py-1.5 bg-slate-100 rounded-md hover:bg-slate-200 font-medium">Chk.Dup.</button>
                <span>or</span>
                <button className="px-3 py-1.5 bg-aos-blue/10 text-aos-blue rounded-md hover:bg-aos-blue/20 font-medium">+ Create New Customer</button>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2"><Layers className="w-4 h-4 text-aos-blue" /> Product & Section Selection</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Product</label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:border-aos-blue outline-none" onChange={e => setData({ ...data, product: e.target.value })}>
                    <option value="">Select Product...</option>
                    <option value="1002">1002 — Motor Private</option>
                    <option value="1003">1003 — Motor Commercial</option>
                    <option value="5042">5042 — Corporate Plus</option>
                    <option value="2001">2001 — Fire & Allied Perils</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Section</label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:border-aos-blue outline-none">
                    <option>10 — Motor Section</option>
                    <option>50 — Accidents & Miscellaneous</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Policy Type</label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:border-aos-blue outline-none">
                    <option>1002 — Motor Private</option>
                    <option>5042 — Corporate Plus</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Policy Period From</label>
                  <input type="date" defaultValue="2026-05-13" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Policy Period To</label>
                  <input type="date" defaultValue="2027-05-12" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2"><Settings className="w-4 h-4 text-aos-blue" /> Risk Details — Dynamic Fields</h3>
              <p className="text-xs text-slate-500 bg-slate-50 p-2 rounded">Fields loaded from Block Definition: PGIT_POL_RISK_ADDL_INFO_01 (Motor Private)</p>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Vehicle Reg. No</label>
                  <input type="text" placeholder="e.g. T 412 EFZ" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:border-aos-blue outline-none" onChange={e => setData({ ...data, vehicleReg: e.target.value })} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Vehicle Make</label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:border-aos-blue outline-none" onChange={e => setData({ ...data, vehicleMake: e.target.value })}>
                    <option>Toyota</option><option>Nissan</option><option>Mitsubishi</option><option>Suzuki</option><option>Honda</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Vehicle Model</label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"><option>Land Cruiser</option><option>Hilux</option><option>Corolla</option><option>RAV4</option></select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Year of Manufacture</label>
                  <input type="text" defaultValue="2024" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Engine CC</label>
                  <input type="text" defaultValue="2800" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Body Type</label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"><option>SUV</option><option>Saloon</option><option>Pickup</option><option>Van</option></select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Vehicle Usage</label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"><option>Private</option><option>Commercial</option><option>PSV</option></select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Fuel Type</label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"><option>Diesel</option><option>Petrol</option><option>Electric</option></select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Chassis No.</label>
                  <input type="text" placeholder="VIN / Chassis" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                </div>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <label className="flex items-center gap-2 text-sm text-slate-700"><input type="checkbox" className="rounded text-aos-blue" /> COMESA Extension</label>
                <label className="flex items-center gap-2 text-sm text-slate-700"><input type="checkbox" className="rounded text-aos-blue" /> Geographical Extension</label>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2"><Shield className="w-4 h-4 text-aos-blue" /> Cover Selection</h3>
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 border-b"><tr>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-slate-600">Select</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-slate-600">Cover Code</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-slate-600">Description</th>
                    <th className="px-4 py-2 text-center text-xs font-semibold text-slate-600">Mandatory</th>
                    <th className="px-4 py-2 text-center text-xs font-semibold text-slate-600">Basic</th>
                    <th className="px-4 py-2 text-right text-xs font-semibold text-slate-600">Rate %</th>
                  </tr></thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { code: '3101', desc: 'Comprehensive', mandatory: true, basic: true, rate: '3.00' },
                      { code: '3109', desc: 'WindScreen', mandatory: false, basic: false, rate: '0.25' },
                      { code: '3110', desc: 'Third Party Liability', mandatory: true, basic: true, rate: '0.50' },
                      { code: '3501', desc: 'Burglary & Theft', mandatory: false, basic: false, rate: '0.15' },
                      { code: '3112', desc: 'Personal Accident', mandatory: false, basic: false, rate: '0.10' },
                      { code: '3115', desc: 'Political Violence & Terrorism', mandatory: false, basic: false, rate: '0.05' },
                    ].map(c => (
                      <tr key={c.code} className="hover:bg-slate-50">
                        <td className="px-4 py-2"><input type="checkbox" defaultChecked={c.mandatory || data.covers.includes(c.code)} className="rounded text-aos-blue" disabled={c.mandatory} /></td>
                        <td className="px-4 py-2 font-mono text-xs">{c.code}</td>
                        <td className="px-4 py-2 font-medium">{c.desc}</td>
                        <td className="px-4 py-2 text-center">{c.mandatory && <CheckCircle2 className="w-4 h-4 text-aos-emerald mx-auto" />}</td>
                        <td className="px-4 py-2 text-center">{c.basic && <CheckCircle2 className="w-4 h-4 text-aos-blue mx-auto" />}</td>
                        <td className="px-4 py-2 text-right font-mono">{c.rate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2"><Calculator className="w-4 h-4 text-aos-blue" /> Premium Calculation</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <CurrencyInput label="Sum Insured (Vehicle Value)" currencyCode="TZS" exchangeRateType="Buying" rate={1} fcValue={data.sumInsured} onFcChange={v => setData({ ...data, sumInsured: v })} />
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
                    <div className="flex justify-between text-sm"><span className="text-slate-600">Base Premium (3.00%)</span><span className="font-medium">TZS {computed.basePremium.toLocaleString()}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-slate-600">Premium Levy (0.20%)</span><span className="font-medium">TZS {computed.levy.toLocaleString()}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-slate-600">Stamp Duty</span><span className="font-medium">TZS {computed.stampDuty.toLocaleString()}</span></div>
                    <div className="flex justify-between text-sm font-bold border-t border-slate-200 pt-2 mt-2"><span>Total Premium</span><span className="text-aos-blue">TZS {computed.total.toLocaleString()}</span></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div><label className="block text-xs font-medium text-slate-500 mb-1">Commission Rate %</label><input type="text" defaultValue="10.00" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" /></div>
                  <div><label className="block text-xs font-medium text-slate-500 mb-1">Commission Amount</label><input type="text" value={`TZS ${Math.round(computed.basePremium * 0.1).toLocaleString()}`} readOnly className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" /></div>
                  <div><label className="block text-xs font-medium text-slate-500 mb-1">Discount %</label><input type="text" defaultValue="0.00" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" /></div>
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2"><Eye className="w-4 h-4 text-aos-blue" /> Review & Submit</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3 bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <h4 className="text-xs font-semibold text-slate-500 uppercase">Customer</h4>
                  <p className="text-sm font-medium">ACME CORPORATION LTD (6010000147)</p>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase mt-4">Product</h4>
                  <p className="text-sm font-medium">1002 — Motor Private</p>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase mt-4">Period</h4>
                  <p className="text-sm font-medium">13/05/2026 → 12/05/2027</p>
                </div>
                <div className="space-y-3 bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <h4 className="text-xs font-semibold text-slate-500 uppercase">Vehicle</h4>
                  <p className="text-sm font-medium">T 412 EFZ — Toyota Land Cruiser 2024</p>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase mt-4">Sum Insured</h4>
                  <p className="text-sm font-bold text-slate-900">TZS {data.sumInsured.toLocaleString()}</p>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase mt-4">Total Premium</h4>
                  <p className="text-lg font-bold text-aos-blue">TZS {computed.total.toLocaleString()}</p>
                </div>
              </div>
              <div className="bg-aos-amber/5 border border-aos-amber/20 rounded-lg p-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-aos-amber shrink-0" />
                <p className="text-xs text-slate-700">This quotation will be submitted for approval. RI allocation will auto-trigger upon policy issuance.</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-white flex justify-between items-center">
          <button onClick={() => step > 0 ? setStep(step - 1) : onClose()} className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1">
            <ChevronLeft className="w-4 h-4" /> {step === 0 ? 'Cancel' : 'Back'}
          </button>
          <div className="flex gap-3">
            {step === 5 && (
              <button className="px-4 py-2 text-sm font-medium text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 flex items-center gap-2"><FileDown className="w-4 h-4" /> Save as Quotation</button>
            )}
            <button onClick={() => step < 5 ? setStep(step + 1) : onClose()} className="px-6 py-2 text-sm font-medium text-white bg-aos-blue rounded-lg hover:bg-aos-blue/90 flex items-center gap-2 shadow-sm shadow-aos-blue/20">
              {step === 5 ? <><CheckCircle2 className="w-4 h-4" /> Issue Policy</> : <>Next <ChevronRight className="w-4 h-4" /></>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
