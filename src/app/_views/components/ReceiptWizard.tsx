import React, { useState } from 'react';
import { X, ChevronRight, CheckCircle2, Building, Wallet, FileText } from 'lucide-react';

interface ReceiptWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReceiptWizard({ isOpen, onClose }: ReceiptWizardProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleNext = () => setStep(s => Math.min(3, s + 1));
  const handleBack = () => setStep(s => Math.max(1, s - 1));

  const handleIssue = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
      setTimeout(() => setStep(1), 300);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Post Receipt Voucher</h2>
            <p className="text-sm text-slate-500 mt-1">General Ledger Transaction Entry</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Stepper */}
        <div className="bg-white border-b border-slate-100 px-6 py-4">
          <div className="flex items-center justify-between max-w-lg mx-auto">
            <StepIndicator currentStep={step} stepNumber={1} label="Transaction Type" icon={<Building className="w-4 h-4" />} color="aos-amber" />
            <div className={`flex-1 h-0.5 mx-4 ${step >= 2 ? 'bg-aos-amber' : 'bg-slate-100'}`} />
            <StepIndicator currentStep={step} stepNumber={2} label="Allocation" icon={<Wallet className="w-4 h-4" />} color="aos-amber" />
            <div className={`flex-1 h-0.5 mx-4 ${step >= 3 ? 'bg-aos-amber' : 'bg-slate-100'}`} />
            <StepIndicator currentStep={step} stepNumber={3} label="Submit" icon={<FileText className="w-4 h-4" />} color="aos-amber" />
          </div>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 max-w-xl mx-auto mt-4">
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-slate-900 border-b border-slate-200 pb-2">Select GL Master Document Code</h3>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Transaction Code</label>
                  <select className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-aos-amber/20 focus:border-aos-amber outline-none">
                    <option>RVB100 — Receipt Voucher Bank TZS</option>
                    <option>RVB103 — Receipt Voucher Bank USD</option>
                    <option>RVC100 — Receipt Voucher Cash TZS</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Division (Branch)</label>
                    <select className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-aos-amber/20 focus:border-aos-amber outline-none">
                      <option>100 — Dar Es Salaam</option>
                      <option>200 — Arusha</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Receipt Mode</label>
                    <select className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-aos-amber/20 focus:border-aos-amber outline-none">
                      <option>EFT (Electronic Fund Transfer)</option>
                      <option>CQ (Cheque)</option>
                    </select>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs text-slate-500 space-y-1 mt-4">
                  <p><strong>Type:</strong> R - RECEIPTS</p>
                  <p><strong>Exchange Rate Type:</strong> B - Buying</p>
                  <p><strong>Authorization:</strong> Required (Horizontal Any)</p>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-slate-900 border-b border-slate-200 pb-2">Party Allocation</h3>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Party Code (Customer/Broker)</label>
                    <div className="flex gap-2">
                      <input type="text" placeholder="Search Party..." className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-aos-amber/20 focus:border-aos-amber outline-none" defaultValue="70100030" />
                      <button className="px-3 py-2 bg-slate-100 border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-200">Verify</button>
                    </div>
                    <p className="text-xs text-aos-emerald mt-1 font-medium">Found: TRANS AFRICA IN</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Target Bank Account</label>
                    <select className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-aos-amber/20 focus:border-aos-amber outline-none">
                      <option>470105 — EXIM Bank Main (0300174019)</option>
                      <option>470106 — CRDB Collection (01J2039)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Accounting Mode</label>
                    <select className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-aos-amber/20 focus:border-aos-amber outline-none">
                      <option>On Account (Unallocated)</option>
                      <option>Invoice Matching</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-slate-900 border-b border-slate-200 pb-2">Financial Details</h3>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Instrument Amount (TZS)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-medium text-sm">TZS</span>
                      <input type="number" className="w-full pl-10 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-lg font-bold focus:ring-2 focus:ring-aos-amber/20 focus:border-aos-amber outline-none" defaultValue="6079360" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Instrument No (Ref)</label>
                      <input type="text" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-aos-amber/20 focus:border-aos-amber outline-none" placeholder="e.g. 000011" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Instrument Date</label>
                      <input type="date" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-aos-amber/20 focus:border-aos-amber outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Remarks / Narration</label>
                    <input type="text" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-aos-amber/20 focus:border-aos-amber outline-none" placeholder="Premium on account..." />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 flex flex-col items-center justify-center py-8">
              <div className="w-16 h-16 bg-aos-amber/10 rounded-full flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-aos-amber" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Ready to Post Receipt</h3>
              <p className="text-sm text-slate-500 text-center max-w-md">
                Click 'Post Transaction' to generate the GL voucher and route to the finance manager for authorization.
              </p>
              
              <div className="w-full max-w-md bg-slate-50 border border-slate-200 rounded-lg p-4 mt-4 text-sm text-slate-700 space-y-2">
                <div className="flex justify-between"><span>Type:</span> <span className="font-medium">RVB100 (Receipt Voucher Bank TZS)</span></div>
                <div className="flex justify-between"><span>Party:</span> <span className="font-medium">TRANS AFRICA IN</span></div>
                <div className="flex justify-between"><span>Amount:</span> <span className="font-medium text-aos-amber text-base">TZS 6,079,360.00</span></div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-100 bg-white flex justify-between items-center">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Cancel
          </button>
          <div className="flex gap-3">
            <button 
              onClick={handleBack}
              disabled={step === 1 || isSubmitting}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Back
            </button>
            {step < 3 ? (
              <button 
                onClick={handleNext}
                className="px-4 py-2 text-sm font-medium text-white bg-aos-amber rounded-lg hover:bg-aos-amber/90 flex items-center gap-2 transition-colors shadow-sm shadow-aos-amber/20"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button 
                onClick={handleIssue}
                disabled={isSubmitting}
                className="px-6 py-2 text-sm font-medium text-white bg-aos-emerald rounded-lg hover:bg-aos-emerald/90 flex items-center gap-2 transition-all shadow-sm shadow-aos-emerald/20 disabled:opacity-80"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Posting...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" /> Post Transaction
                  </>
                )}
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

function StepIndicator({ currentStep, stepNumber, label, icon, color = 'aos-blue' }: { currentStep: number, stepNumber: number, label: string, icon: React.ReactNode, color?: string }) {
  const isComplete = currentStep > stepNumber;
  const isActive = currentStep === stepNumber;
  
  return (
    <div className="flex flex-col items-center">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
        isActive ? `bg-${color} text-white ring-4 ring-${color}/10` : 
        isComplete ? `bg-${color} text-white` : 
        'bg-slate-100 text-slate-400'
      }`}>
        {isComplete ? <CheckCircle2 className="w-5 h-5" /> : stepNumber}
      </div>
      <span className={`text-xs mt-2 font-medium ${isActive ? `text-${color}` : isComplete ? 'text-slate-700' : 'text-slate-400'}`}>
        {label}
      </span>
    </div>
  );
}
