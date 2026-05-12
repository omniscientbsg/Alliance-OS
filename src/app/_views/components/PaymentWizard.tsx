import React, { useState } from 'react';
import { X, ChevronRight, CheckCircle2, ArrowUpRight, ListChecks, ArrowDownRight } from 'lucide-react';

interface PaymentWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PaymentWizard({ isOpen, onClose }: PaymentWizardProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleNext = () => setStep(s => Math.min(3, s + 1));
  const handleBack = () => setStep(s => Math.max(1, s - 1));

  const handleGenerate = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
      setTimeout(() => setStep(1), 300);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Bank/Cash Payments</h2>
            <p className="text-sm text-slate-500 mt-1">Generate outbound payment vouchers and EFT batches</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Stepper */}
        <div className="bg-white border-b border-slate-100 px-6 py-4">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            <StepIndicator currentStep={step} stepNumber={1} label="Payment Header" icon={<ArrowUpRight className="w-4 h-4" />} color="aos-blue" />
            <div className={`flex-1 h-0.5 mx-4 ${step >= 2 ? 'bg-aos-blue' : 'bg-slate-100'}`} />
            <StepIndicator currentStep={step} stepNumber={2} label="Invoice Matching" icon={<ListChecks className="w-4 h-4" />} color="aos-blue" />
            <div className={`flex-1 h-0.5 mx-4 ${step >= 3 ? 'bg-aos-blue' : 'bg-slate-100'}`} />
            <StepIndicator currentStep={step} stepNumber={3} label="Generation" icon={<ArrowDownRight className="w-4 h-4" />} color="aos-blue" />
          </div>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="grid grid-cols-2 gap-x-8 gap-y-5">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Transaction Type</label>
                  <select className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-aos-blue/20 focus:border-aos-blue outline-none">
                    <option>PVB103 — Bank Payment USD</option>
                    <option>PVB100 — Bank Payment TZS</option>
                    <option>CPV100 — Cash Payment</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Date</label>
                  <input type="date" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-aos-blue/20 focus:border-aos-blue outline-none" defaultValue="2026-05-12" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Currency Code</label>
                  <select className="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-lg text-sm text-slate-500 outline-none" disabled>
                    <option>USD</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Payment Mode</label>
                  <select className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-aos-blue/20 focus:border-aos-blue outline-none">
                    <option>EFT — EXIM BANK-USD</option>
                    <option>CQ — Cheque</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-slate-700 mb-1">Payee (Party Code/Name)</label>
                  <input type="text" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-aos-blue/20 focus:border-aos-blue outline-none" placeholder="Search party..." defaultValue="ALBIZIA LIMITED" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-slate-700 mb-1">Remarks</label>
                  <input type="text" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-aos-blue/20 focus:border-aos-blue outline-none" defaultValue="Claim settlement for C11/100/1002/2026/011637" />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <h3 className="text-sm font-semibold text-slate-900 border-b border-slate-200 pb-2 mb-4">Pending Invoices / Claims for Payee</h3>
              <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-2 font-medium text-slate-600 w-10">Select</th>
                      <th className="px-4 py-2 font-medium text-slate-600">Doc No / Claim No</th>
                      <th className="px-4 py-2 font-medium text-slate-600">O/S Amt</th>
                      <th className="px-4 py-2 font-medium text-slate-600">Payment Adj Amt</th>
                      <th className="px-4 py-2 font-medium text-slate-600">Discount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50">
                      <td className="px-4 py-3"><input type="checkbox" className="rounded text-aos-blue focus:ring-aos-blue" defaultChecked /></td>
                      <td className="px-4 py-3 font-medium text-slate-900">C11/100/1002/2026/011637</td>
                      <td className="px-4 py-3 text-slate-600">USD 434.00</td>
                      <td className="px-4 py-3">
                        <input type="number" className="w-28 px-2 py-1 border border-slate-300 rounded text-sm focus:border-aos-blue focus:ring-1 focus:ring-aos-blue outline-none" defaultValue="434.00" />
                      </td>
                      <td className="px-4 py-3">
                        <input type="number" className="w-24 px-2 py-1 border border-slate-300 rounded text-sm focus:border-aos-blue focus:ring-1 focus:ring-aos-blue outline-none" defaultValue="0.00" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end mt-4 text-sm">
                <div className="w-64 space-y-2">
                  <div className="flex justify-between text-slate-600"><span>Total Payment Adj:</span> <span>USD 434.00</span></div>
                  <div className="flex justify-between text-slate-600"><span>Total Discount:</span> <span>USD 0.00</span></div>
                  <div className="flex justify-between font-bold text-slate-900 border-t border-slate-200 pt-2"><span>Net Amount:</span> <span className="text-aos-blue">USD 434.00</span></div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 flex flex-col items-center justify-center py-8">
              <div className="w-16 h-16 bg-aos-blue/10 rounded-full flex items-center justify-center mb-4">
                <ArrowUpRight className="w-8 h-8 text-aos-blue" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Ready to Generate Payment</h3>
              <p className="text-sm text-slate-500 text-center max-w-md">
                Clicking generate will create the final payment document and initiate the EFT batch transfer process to EXIM BANK-USD.
              </p>
              
              <div className="w-full max-w-md bg-slate-50 border border-slate-200 rounded-lg p-4 mt-4 text-sm text-slate-700 space-y-2">
                <div className="flex justify-between"><span>Payee:</span> <span className="font-medium">ALBIZIA LIMITED</span></div>
                <div className="flex justify-between"><span>Mode:</span> <span className="font-medium">EFT — EXIM BANK-USD</span></div>
                <div className="flex justify-between"><span>Net Amount:</span> <span className="font-medium text-aos-blue">USD 434.00</span></div>
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
                className="px-4 py-2 text-sm font-medium text-white bg-aos-blue rounded-lg hover:bg-aos-blue/90 flex items-center gap-2 transition-colors shadow-sm shadow-aos-blue/20"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button 
                onClick={handleGenerate}
                disabled={isSubmitting}
                className="px-6 py-2 text-sm font-medium text-white bg-aos-emerald rounded-lg hover:bg-aos-emerald/90 flex items-center gap-2 transition-all shadow-sm shadow-aos-emerald/20 disabled:opacity-80"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" /> Generate Payment
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

function StepIndicator({ currentStep, stepNumber, label, icon, color }: { currentStep: number, stepNumber: number, label: string, icon: React.ReactNode, color: string }) {
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
