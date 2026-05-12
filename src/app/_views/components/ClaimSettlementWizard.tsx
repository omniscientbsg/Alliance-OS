import React, { useState } from 'react';
import { X, ChevronRight, CheckCircle2, FileCheck, ShieldAlert, Banknote } from 'lucide-react';

interface ClaimSettlementWizardProps {
  isOpen: boolean;
  onClose: () => void;
  claimId?: string;
}

export function ClaimSettlementWizard({ isOpen, onClose, claimId = "C11/100/1002/2026/011637" }: ClaimSettlementWizardProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleNext = () => setStep(s => Math.min(3, s + 1));
  const handleBack = () => setStep(s => Math.max(1, s - 1));

  const handleSettle = () => {
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
            <h2 className="text-xl font-bold text-slate-900">Claim Settlement</h2>
            <p className="text-sm text-slate-500 mt-1">Process payout for Claim {claimId}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Stepper */}
        <div className="bg-white border-b border-slate-100 px-6 py-4">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            <StepIndicator currentStep={step} stepNumber={1} label="Settlement Type" icon={<FileCheck className="w-4 h-4" />} color="aos-emerald" />
            <div className={`flex-1 h-0.5 mx-4 ${step >= 2 ? 'bg-aos-emerald' : 'bg-slate-100'}`} />
            <StepIndicator currentStep={step} stepNumber={2} label="Breakdown" icon={<ShieldAlert className="w-4 h-4" />} color="aos-emerald" />
            <div className={`flex-1 h-0.5 mx-4 ${step >= 3 ? 'bg-aos-emerald' : 'bg-slate-100'}`} />
            <StepIndicator currentStep={step} stepNumber={3} label="Payee Details" icon={<Banknote className="w-4 h-4" />} color="aos-emerald" />
          </div>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="bg-aos-emerald/5 p-4 rounded-xl border border-aos-emerald/20 flex items-start gap-3 mb-6">
                <FileCheck className="w-5 h-5 text-aos-emerald mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-aos-emerald">Validating Claim Details</h4>
                  <p className="text-xs text-slate-600 mt-1">Claim {claimId} is active. Product: Motor Private. Reserve: TZS 1,500,000.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-5">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Settlement Type</label>
                  <select className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-aos-emerald/20 focus:border-aos-emerald outline-none">
                    <option>001 — Partial Settlement</option>
                    <option>002 — Full & Final Settlement</option>
                    <option>003 — Ex-Gratia Settlement</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Date of Loss</label>
                  <input type="text" className="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-lg text-sm text-slate-500" value="19/03/2026" readOnly />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-slate-700 mb-1">Cover Description (Affected Cover)</label>
                  <select className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-aos-emerald/20 focus:border-aos-emerald outline-none">
                    <option>3109 — WindScreen</option>
                    <option>3101 — Comprehensive Basic</option>
                  </select>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <input type="checkbox" id="recovery" className="rounded text-aos-emerald focus:ring-aos-emerald" />
                  <label htmlFor="recovery" className="text-sm text-slate-700">Recovery Applicable</label>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <input type="checkbox" id="salvage" className="rounded text-aos-emerald focus:ring-aos-emerald" />
                  <label htmlFor="salvage" className="text-sm text-slate-700">Salvage Involved</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="excess_protect" className="rounded text-aos-emerald focus:ring-aos-emerald" />
                  <label htmlFor="excess_protect" className="text-sm text-slate-700">Excess Protector Applied</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="loss_of_use" className="rounded text-aos-emerald focus:ring-aos-emerald" />
                  <label htmlFor="loss_of_use" className="text-sm text-slate-700">Loss Of Use</label>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <h3 className="text-sm font-semibold text-slate-900 border-b border-slate-200 pb-2 mb-4">Breakdown by Cover (SMI)</h3>
              <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-2 font-medium text-slate-600">Cover</th>
                      <th className="px-4 py-2 font-medium text-slate-600">Initial Reserve</th>
                      <th className="px-4 py-2 font-medium text-slate-600">Previous Payouts</th>
                      <th className="px-4 py-2 font-medium text-slate-600">Settlement Amt</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="px-4 py-3 font-medium">3109 - WindScreen</td>
                      <td className="px-4 py-3">TZS 1,500,000</td>
                      <td className="px-4 py-3 text-slate-500">TZS 0</td>
                      <td className="px-4 py-3">
                        <input type="number" className="w-32 px-2 py-1 border border-slate-300 rounded text-sm focus:border-aos-emerald focus:ring-1 focus:ring-aos-emerald outline-none" defaultValue="1200000" />
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-3">Less: Deductible (Excess)</td>
                      <td className="px-4 py-3"></td>
                      <td className="px-4 py-3"></td>
                      <td className="px-4 py-3">
                        <input type="number" className="w-32 px-2 py-1 border border-slate-300 rounded text-sm text-aos-rose focus:border-aos-emerald focus:ring-1 focus:ring-aos-emerald outline-none" defaultValue="100000" />
                      </td>
                    </tr>
                    <tr className="bg-slate-100 border-t-2 border-slate-200 font-semibold">
                      <td colSpan={3} className="px-4 py-3 text-right">Net Payable:</td>
                      <td className="px-4 py-3 text-aos-emerald">TZS 1,100,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 flex flex-col items-center justify-center py-4">
              <div className="w-full max-w-lg space-y-4">
                <h3 className="text-sm font-semibold text-slate-900 border-b border-slate-200 pb-2">Payee Information</h3>
                
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Payee Type</label>
                  <select className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-aos-emerald/20 focus:border-aos-emerald outline-none">
                    <option>Insured (Customer)</option>
                    <option>Garage / Repairer</option>
                    <option>Surveyor</option>
                    <option>Third Party</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Select Payee Name</label>
                  <input type="text" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-aos-emerald/20 focus:border-aos-emerald outline-none" defaultValue="ALBIZIA LIMITED" />
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mt-4 text-sm text-slate-700 space-y-2">
                  <div className="flex justify-between"><span>Claim:</span> <span className="font-medium">{claimId}</span></div>
                  <div className="flex justify-between"><span>Settlement Type:</span> <span className="font-medium">Partial Settlement</span></div>
                  <div className="flex justify-between"><span>Net Amount Payable:</span> <span className="font-bold text-aos-emerald text-lg">TZS 1,100,000</span></div>
                </div>

                <p className="text-xs text-slate-500 text-center mt-4">
                  Submitting will generate a payment voucher request in the Finance module for authorization.
                </p>
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
                className="px-4 py-2 text-sm font-medium text-white bg-aos-emerald rounded-lg hover:bg-aos-emerald/90 flex items-center gap-2 transition-colors shadow-sm shadow-aos-emerald/20"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button 
                onClick={handleSettle}
                disabled={isSubmitting}
                className="px-6 py-2 text-sm font-medium text-white bg-aos-emerald rounded-lg hover:bg-aos-emerald/90 flex items-center gap-2 transition-all shadow-sm shadow-aos-emerald/20 disabled:opacity-80"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" /> Process Settlement
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
