import React, { useState } from 'react';
import { X, ChevronRight, CheckCircle2, User, Building, MapPin, Briefcase, FileText, Banknote, ShieldAlert } from 'lucide-react';
import { BilingualField } from '@/components/shared/BilingualField';

interface CustomerWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

const STEPS = ['Core Details', 'Addresses & Contacts', 'Commercial Details', 'Broker & EFT', 'KYC & Currency'];

export function CustomerWizard({ isOpen, onClose }: CustomerWizardProps) {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleNext = () => setStep(s => Math.min(STEPS.length - 1, s + 1));
  const handleBack = () => setStep(s => Math.max(0, s - 1));

  const handleCreate = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
      setTimeout(() => setStep(0), 300);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[95vh] overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Customer Master Setup</h2>
            <p className="text-sm text-slate-500 mt-1">Create or modify Party details (Customer / Agent / Broker / Service Provider)</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Stepper */}
        <div className="px-6 py-3 bg-white border-b border-slate-100 flex items-center gap-1 overflow-x-auto">
          {STEPS.map((s, i) => (
            <React.Fragment key={s}>
              <button onClick={() => i <= step && setStep(i)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${i === step ? 'bg-aos-teal text-white' : i < step ? 'bg-aos-emerald/10 text-aos-emerald' : 'bg-slate-100 text-slate-400'}`}>
                {i < step ? <CheckCircle2 className="w-3 h-3" /> : <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[9px]">{i + 1}</span>}
                {s}
              </button>
              {i < STEPS.length - 1 && <ChevronRight className="w-3 h-3 text-slate-300 shrink-0" />}
            </React.Fragment>
          ))}
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
          {step === 0 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2"><User className="w-4 h-4 text-aos-teal" /> Core Details</h3>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Category Code</label>
                  <select className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-aos-teal/20 focus:border-aos-teal outline-none">
                    <option>100 — Direct Customers</option>
                    <option>601 — Agents — Dar es Salaam</option>
                    <option>602 — Brokers — Nationwide</option>
                    <option>801 — Service Providers</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Customer Code (Auto)</label>
                  <input type="text" className="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-lg text-sm text-slate-500" value="1000000147" readOnly />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Customer Type</label>
                  <select className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm">
                    <option>Corporate</option>
                    <option>Individual</option>
                  </select>
                </div>
                <div className="col-span-3">
                  <BilingualField label="First Name / Company Name" placeholder="e.g. ACME CORPORATION LTD" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Customer Nationality</label>
                  <select className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm">
                    <option>TZ — Tanzania</option>
                    <option>KE — Kenya</option>
                    <option>UG — Uganda</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Short Name</label>
                  <input type="text" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm" placeholder="ACME" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Date of Birth / Incorporation</label>
                  <input type="date" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm" />
                </div>
                <div className="col-span-3 flex items-center gap-6 p-4 bg-white border border-slate-200 rounded-lg">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700"><input type="checkbox" className="rounded text-aos-teal" defaultChecked /> Active Customer</label>
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700"><input type="checkbox" className="rounded text-aos-teal" /> Staff Customer</label>
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-700"><input type="checkbox" className="rounded text-aos-teal" /> Group Company</label>
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2"><MapPin className="w-4 h-4 text-aos-teal" /> Addresses & Contacts</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider border-b pb-2">Physical Address</h4>
                  <div><label className="block text-xs font-medium text-slate-700 mb-1">Address Line 1</label><input type="text" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm" /></div>
                  <div><label className="block text-xs font-medium text-slate-700 mb-1">Address Line 2</label><input type="text" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm" /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">City</label>
                      <select className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm"><option>Dar es Salaam</option><option>Arusha</option></select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Country</label>
                      <select className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm"><option>Tanzania</option></select>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider border-b pb-2">PO Box & Contact</h4>
                  <div><label className="block text-xs font-medium text-slate-700 mb-1">PO Box</label><input type="text" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm" /></div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Mobile Number</label>
                    <div className="flex gap-2">
                      <select className="w-24 px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm"><option>+255</option><option>+254</option></select>
                      <input type="text" className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm" />
                    </div>
                  </div>
                  <div><label className="block text-xs font-medium text-slate-700 mb-1">Email Address</label><input type="email" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm" /></div>
                  <div><label className="block text-xs font-medium text-slate-700 mb-1">Contact Person</label><input type="text" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm" /></div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2"><Briefcase className="w-4 h-4 text-aos-teal" /> Commercial Details</h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-5">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-medium text-slate-700">Credit Check Required</label>
                    <input type="checkbox" className="rounded text-aos-teal" />
                  </div>
                  <input type="number" placeholder="Credit Limit (TZS)" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm mt-2" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Credit Days</label>
                  <input type="number" placeholder="e.g. 30" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Bond Limit</label>
                  <input type="number" placeholder="Amount (TZS)" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Bond Outstanding</label>
                  <input type="number" className="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-lg text-sm text-slate-500" value="0.00" readOnly />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">TIN Number</label>
                  <input type="text" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm" placeholder="Tax Identification Number" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">VRN Number</label>
                  <input type="text" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm" placeholder="VAT Registration Number" />
                </div>
                <div className="col-span-2 flex items-center gap-2 p-3 bg-aos-rose/5 border border-aos-rose/20 rounded-lg mt-4">
                  <input type="checkbox" id="tira_non_motor" className="rounded text-aos-rose" />
                  <label htmlFor="tira_non_motor" className="text-sm font-medium text-slate-700 flex items-center gap-2">TIRA NON MOTOR Flag <span className="text-xs font-normal text-slate-500">(Check if exempt from TIRA integration)</span></label>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2"><Banknote className="w-4 h-4 text-aos-teal" /> Agent/Broker & EFT Details</h3>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider border-b pb-2">Agent / Broker Settings</h4>
                  <div><label className="block text-xs font-medium text-slate-700 mb-1">Agent License No.</label><input type="text" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm" /></div>
                  <div><label className="block text-xs font-medium text-slate-700 mb-1">License Expiry Date</label><input type="date" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm" /></div>
                  <div className="flex items-center gap-2 mt-4">
                    <input type="checkbox" className="rounded text-aos-teal" />
                    <label className="text-sm text-slate-700">Allow Commission Offset</label>
                  </div>
                  <div><label className="block text-xs font-medium text-slate-700 mb-1">Default Commission Setup Code</label>
                    <select className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm"><option>STDBRK — Standard Broker Commission</option></select>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider border-b pb-2">EFT Bank Details</h4>
                  <div><label className="block text-xs font-medium text-slate-700 mb-1">Bank Name</label>
                    <select className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm"><option>CRDB Bank</option><option>NMB Bank</option><option>Standard Chartered</option></select>
                  </div>
                  <div><label className="block text-xs font-medium text-slate-700 mb-1">Branch</label><input type="text" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm" /></div>
                  <div><label className="block text-xs font-medium text-slate-700 mb-1">Account Number</label><input type="text" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm" /></div>
                  <div><label className="block text-xs font-medium text-slate-700 mb-1">Account Name</label><input type="text" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm" /></div>
                  <div><label className="block text-xs font-medium text-slate-700 mb-1">SWIFT Code</label><input type="text" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm" /></div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2"><ShieldAlert className="w-4 h-4 text-aos-teal" /> KYC & Currency</h3>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider border-b pb-2">KYC Documents</h4>
                  <div className="space-y-3">
                    {[
                      { name: 'Certificate of Incorporation', req: true },
                      { name: 'TIN Certificate', req: true },
                      { name: 'Director IDs / Passports', req: true },
                      { name: 'Business License', req: false },
                    ].map(doc => (
                      <div key={doc.name} className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-slate-400" />
                          <span className="text-sm font-medium text-slate-700">{doc.name}</span>
                          {doc.req && <span className="text-[10px] text-aos-rose font-bold">*</span>}
                        </div>
                        <button className="text-xs font-medium text-aos-blue hover:underline">Upload</button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider border-b pb-2">Applicable Currencies</h4>
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-3">
                    <label className="flex items-center gap-3 text-sm font-medium text-slate-700">
                      <input type="checkbox" className="rounded text-aos-teal" defaultChecked /> TZS (Tanzanian Shilling) — Base
                    </label>
                    <label className="flex items-center gap-3 text-sm font-medium text-slate-700">
                      <input type="checkbox" className="rounded text-aos-teal" /> USD (US Dollar)
                    </label>
                    <label className="flex items-center gap-3 text-sm font-medium text-slate-700">
                      <input type="checkbox" className="rounded text-aos-teal" /> EUR (Euro)
                    </label>
                    <label className="flex items-center gap-3 text-sm font-medium text-slate-700">
                      <input type="checkbox" className="rounded text-aos-teal" /> GBP (British Pound)
                    </label>
                    <div className="pt-3 border-t border-slate-200 mt-3">
                      <label className="flex items-center gap-2 text-sm text-slate-700">
                        <input type="checkbox" className="rounded text-aos-teal" /> All Currencies Applicable
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-100 bg-white flex justify-between items-center">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
            Cancel
          </button>
          <div className="flex gap-3">
            <button onClick={handleBack} disabled={step === 0 || isSubmitting} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 transition-colors">
              Back
            </button>
            {step < STEPS.length - 1 ? (
              <button onClick={handleNext} className="px-4 py-2 text-sm font-medium text-white bg-aos-teal rounded-lg hover:bg-aos-teal/90 flex items-center gap-2 transition-colors shadow-sm shadow-aos-teal/20">
                Next <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button onClick={handleCreate} disabled={isSubmitting} className="px-6 py-2 text-sm font-medium text-white bg-aos-emerald rounded-lg hover:bg-aos-emerald/90 flex items-center gap-2 transition-all shadow-sm shadow-aos-emerald/20 disabled:opacity-80">
                {isSubmitting ? (
                  <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Saving...</>
                ) : (
                  <><CheckCircle2 className="w-4 h-4" /> Submit for Approval</>
                )}
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
