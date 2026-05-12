import React, { useState } from 'react';
import { X, ChevronRight, CheckCircle2, Shield, Calculator, FileText, User } from 'lucide-react';

interface IssuePolicyWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

export function IssuePolicyWizard({ isOpen, onClose }: IssuePolicyWizardProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleNext = () => setStep(s => Math.min(4, s + 1));
  const handleBack = () => setStep(s => Math.max(1, s - 1));

  const handleIssue = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
      // Reset for next time
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
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Issue New Policy</h2>
            <p className="text-sm text-slate-500 mt-1">Multi-step underwriting process</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Stepper */}
        <div className="bg-white border-b border-slate-100 px-6 py-4">
          <div className="flex items-center justify-between">
            <StepIndicator currentStep={step} stepNumber={1} label="Core Details" icon={<User className="w-4 h-4" />} />
            <div className={`flex-1 h-0.5 mx-4 ${step >= 2 ? 'bg-aos-blue' : 'bg-slate-100'}`} />
            <StepIndicator currentStep={step} stepNumber={2} label="Risk Details" icon={<Shield className="w-4 h-4" />} />
            <div className={`flex-1 h-0.5 mx-4 ${step >= 3 ? 'bg-aos-blue' : 'bg-slate-100'}`} />
            <StepIndicator currentStep={step} stepNumber={3} label="Calculation" icon={<Calculator className="w-4 h-4" />} />
            <div className={`flex-1 h-0.5 mx-4 ${step >= 4 ? 'bg-aos-blue' : 'bg-slate-100'}`} />
            <StepIndicator currentStep={step} stepNumber={4} label="Issue" icon={<FileText className="w-4 h-4" />} />
          </div>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-slate-900 border-b border-slate-200 pb-2">Product Selection</h3>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Product Line (Class Code)</label>
                    <select className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-aos-blue/20 focus:border-aos-blue outline-none">
                      <option>50 — Accidents & Miscellaneous</option>
                      <option>10 — Motor</option>
                      <option>20 — Fire & Allied Perils</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Specific Product</label>
                    <select className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-aos-blue/20 focus:border-aos-blue outline-none">
                      <option>5042 — Corporate Plus</option>
                      <option>5010 — General Accident</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-slate-900 border-b border-slate-200 pb-2">Party Selection</h3>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Insured Customer</label>
                    <div className="flex gap-2">
                      <input type="text" placeholder="Search Customer Code or Name..." className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-aos-blue/20 focus:border-aos-blue outline-none" defaultValue="CUST-10024" />
                      <button className="px-3 py-2 bg-slate-100 border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-200">Search</button>
                    </div>
                    <p className="text-xs text-aos-emerald mt-1 font-medium">Found: Acme Corp Ltd</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Intermediary (Broker/Agent)</label>
                    <select className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-aos-blue/20 focus:border-aos-blue outline-none">
                      <option>6010000147 — MADSON INSURANCE AGENCY</option>
                      <option>Direct (No Broker)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-slate-900 border-b border-slate-200 pb-2">Cover Period</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Effective From</label>
                    <input type="date" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-aos-blue/20 focus:border-aos-blue outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Effective To</label>
                    <input type="date" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-aos-blue/20 focus:border-aos-blue outline-none" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="bg-aos-blue/5 p-4 rounded-xl border border-aos-blue/20 mb-6">
                <p className="text-sm font-medium text-aos-blue flex items-center gap-2">
                  <Shield className="w-4 h-4" /> Flex Field Engine Active
                </p>
                <p className="text-xs text-slate-600 mt-1">
                  The following fields are dynamically rendered based on the Block Definition for <strong>Product 5042 - Corporate Plus</strong>. 
                  (Mapped to PGIT_POL_RISK_ADDL_INFO).
                </p>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-5">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Property Policy No (PRAI_NUM_01)</label>
                  <input type="text" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-aos-blue/20 focus:border-aos-blue outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Risk Location (PRAI_CHAR_05)</label>
                  <input type="text" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-aos-blue/20 focus:border-aos-blue outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Total Sum Insured (PRAI_NUM_02)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">TZS</span>
                    <input type="number" className="w-full pl-10 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-aos-blue/20 focus:border-aos-blue outline-none" defaultValue="1500000000" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Construction Type</label>
                  <select className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-aos-blue/20 focus:border-aos-blue outline-none">
                    <option>Class I (Brick/Concrete)</option>
                    <option>Class II</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <h4 className="text-sm font-semibold text-slate-900 mt-4 mb-2">Applicable Covers (Section 500101)</h4>
                  <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="px-4 py-2 font-medium text-slate-600">Cover Code</th>
                          <th className="px-4 py-2 font-medium text-slate-600">Description</th>
                          <th className="px-4 py-2 font-medium text-slate-600">SI Value</th>
                          <th className="px-4 py-2 font-medium text-slate-600">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <tr>
                          <td className="px-4 py-2 font-medium">3501</td>
                          <td className="px-4 py-2">Burglary (Basic/Mandatory)</td>
                          <td className="px-4 py-2">1,500,000,000</td>
                          <td className="px-4 py-2"><span className="text-aos-emerald text-xs font-medium">Included</span></td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 font-medium">3502</td>
                          <td className="px-4 py-2">All Risks Add-on</td>
                          <td className="px-4 py-2"><input type="number" className="w-32 px-2 py-1 border border-slate-300 rounded text-xs" placeholder="Enter SI" /></td>
                          <td className="px-4 py-2"><input type="checkbox" className="rounded text-aos-blue" /></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="bg-aos-emerald/10 p-4 rounded-xl border border-aos-emerald/20 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-aos-emerald shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-aos-emerald">Rating Engine Processed Successfully</h4>
                  <p className="text-xs text-aos-emerald/80 mt-1">Tariff parameters evaluated: [Body Type: Frm to To] [Usage Type: Frm to To]. Calculation Logic: 013 (Rate on SI against Cover). Rounding: NO ROUND OFF.</p>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-6">
                <div className="col-span-3">
                  <h3 className="text-sm font-semibold text-slate-900 border-b border-slate-200 pb-2 mb-4">Premium Breakdown (Tax & Charges Engine)</h3>
                  <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                    <table className="w-full text-sm text-left">
                      <tbody className="divide-y divide-slate-100">
                        <tr className="hover:bg-slate-50">
                          <td className="px-4 py-3 text-slate-600 font-medium">Basic Premium (Cover 3501 Rate: 0.254%)</td>
                          <td className="px-4 py-3 text-right text-slate-900 font-semibold">TZS 3,813,559</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="px-4 py-3 text-slate-600">Training Levy (1%) - <em>Tax Code L1</em></td>
                          <td className="px-4 py-3 text-right text-slate-900">TZS 38,136</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="px-4 py-3 text-slate-600">Stamp Duty - <em>Fixed</em></td>
                          <td className="px-4 py-3 text-right text-slate-900">TZS 5,000</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="px-4 py-3 text-slate-600">Value Added Tax (18%) - <em>Tax Code V</em></td>
                          <td className="px-4 py-3 text-right text-slate-900">TZS 643,305</td>
                        </tr>
                        <tr className="bg-slate-50 border-t-2 border-slate-200">
                          <td className="px-4 py-3 font-bold text-slate-900">Total Gross Premium</td>
                          <td className="px-4 py-3 text-right font-bold text-aos-blue text-lg">TZS 4,500,000</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="col-span-2 space-y-4">
                  <h3 className="text-sm font-semibold text-slate-900 border-b border-slate-200 pb-2">Reinsurance (RI) Allocation Preview</h3>
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-3">
                    <p className="text-xs text-slate-500">Treaty: LBL-2026 (Proportional)</p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-medium text-slate-700">CQS (Compulsory Quota Share - 10%)</span>
                        <span>TZS 381,356</span>
                      </div>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full"><div className="bg-aos-blue h-1.5 rounded-full w-[10%]"></div></div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-medium text-slate-700">RETN (Retention - 90%)</span>
                        <span>TZS 3,432,203</span>
                      </div>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full"><div className="bg-aos-blue h-1.5 rounded-full w-[90%]"></div></div>
                    </div>
                    <p className="text-xs text-slate-400 mt-2 text-center">Final RI allocation occurs upon approval.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 flex flex-col items-center justify-center py-8">
              <div className="w-16 h-16 bg-aos-blue/10 rounded-full flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-aos-blue" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Ready to Issue Policy</h3>
              <p className="text-sm text-slate-500 text-center max-w-md">
                All validations passed. Click 'Issue Policy' to generate the policy document (Doc Code: 10-PL-01-001) and trigger the Maker-Checker approval workflow.
              </p>
              
              <div className="w-full max-w-md bg-slate-50 border border-slate-200 rounded-lg p-4 mt-4 text-sm text-slate-700 space-y-2">
                <div className="flex justify-between"><span>Insured:</span> <span className="font-medium">Acme Corp Ltd</span></div>
                <div className="flex justify-between"><span>Product:</span> <span className="font-medium">5042 - Corporate Plus</span></div>
                <div className="flex justify-between"><span>Gross Premium:</span> <span className="font-medium text-aos-blue">TZS 4,500,000</span></div>
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
            {step < 4 ? (
              <button 
                onClick={handleNext}
                className="px-4 py-2 text-sm font-medium text-white bg-aos-blue rounded-lg hover:bg-aos-blue/90 flex items-center gap-2 transition-colors shadow-sm shadow-aos-blue/20"
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
                    Generating Document...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" /> Issue Policy
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

function StepIndicator({ currentStep, stepNumber, label, icon }: { currentStep: number, stepNumber: number, label: string, icon: React.ReactNode }) {
  const isComplete = currentStep > stepNumber;
  const isActive = currentStep === stepNumber;
  
  return (
    <div className="flex flex-col items-center">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
        isActive ? 'bg-aos-blue text-white ring-4 ring-aos-blue/10' : 
        isComplete ? 'bg-aos-emerald text-white' : 
        'bg-slate-100 text-slate-400'
      }`}>
        {isComplete ? <CheckCircle2 className="w-5 h-5" /> : stepNumber}
      </div>
      <span className={`text-xs mt-2 font-medium ${isActive ? 'text-aos-blue' : isComplete ? 'text-slate-700' : 'text-slate-400'}`}>
        {label}
      </span>
    </div>
  );
}
