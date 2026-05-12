import React, { useState } from 'react';
import { X, ChevronRight, CheckCircle2, Search, FileWarning, DollarSign, Send } from 'lucide-react';

interface RegisterFnolWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RegisterFnolWizard({ isOpen, onClose }: RegisterFnolWizardProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [policyFound, setPolicyFound] = useState(false);

  if (!isOpen) return null;

  const handleNext = () => setStep(s => Math.min(4, s + 1));
  const handleBack = () => setStep(s => Math.max(1, s - 1));

  const handleIssue = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
      setTimeout(() => { setStep(1); setPolicyFound(false); }, 300);
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
            <h2 className="text-xl font-bold text-slate-900">Register FNOL (First Notice of Loss)</h2>
            <p className="text-sm text-slate-500 mt-1">Claim Intimation Process</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Stepper */}
        <div className="bg-white border-b border-slate-100 px-6 py-4">
          <div className="flex items-center justify-between">
            <StepIndicator currentStep={step} stepNumber={1} label="Policy Search" icon={<Search className="w-4 h-4" />} />
            <div className={`flex-1 h-0.5 mx-4 ${step >= 2 ? 'bg-aos-rose' : 'bg-slate-100'}`} />
            <StepIndicator currentStep={step} stepNumber={2} label="Loss Details" icon={<FileWarning className="w-4 h-4" />} color="aos-rose" />
            <div className={`flex-1 h-0.5 mx-4 ${step >= 3 ? 'bg-aos-rose' : 'bg-slate-100'}`} />
            <StepIndicator currentStep={step} stepNumber={3} label="Initial Reserve" icon={<DollarSign className="w-4 h-4" />} color="aos-rose" />
            <div className={`flex-1 h-0.5 mx-4 ${step >= 4 ? 'bg-aos-rose' : 'bg-slate-100'}`} />
            <StepIndicator currentStep={step} stepNumber={4} label="Submit" icon={<Send className="w-4 h-4" />} color="aos-rose" />
          </div>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="max-w-xl mx-auto space-y-6 mt-4">
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-slate-900 border-b border-slate-200 pb-2">Identify Policy</h3>
                  <div className="flex gap-2">
                    <input type="text" placeholder="Enter Policy Number, Chassis Number, or Insured Name..." className="flex-1 px-3 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-aos-rose/20 focus:border-aos-rose outline-none" defaultValue="P11/2025/100/5042" />
                    <button 
                      onClick={() => setPolicyFound(true)}
                      className="px-4 py-2.5 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-900 flex items-center gap-2"
                    >
                      <Search className="w-4 h-4" /> Verify
                    </button>
                  </div>
                </div>

                {policyFound && (
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-slate-900">Acme Corp Ltd</h4>
                        <p className="text-sm text-aos-blue font-medium mt-0.5">P11/2025/100/5042</p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-aos-emerald text-xs font-medium bg-aos-emerald/10 px-2 py-1 rounded-full">
                        <CheckCircle2 className="w-3 h-3" /> Active Policy
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <div>
                        <p className="text-slate-500 text-xs mb-1">Product</p>
                        <p className="font-medium text-slate-900">5042 - Corporate Plus</p>
                      </div>
                      <div>
                        <p className="text-slate-500 text-xs mb-1">Cover Period</p>
                        <p className="font-medium text-slate-900">01 Jan 2025 to 31 Dec 2025</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-slate-900 border-b border-slate-200 pb-2">Intimation Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Date of Loss</label>
                      <input type="date" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-aos-rose/20 focus:border-aos-rose outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">Date of Intimation</label>
                      <input type="date" className="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-lg text-sm outline-none text-slate-500" value="2026-05-12" readOnly />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Nature of Loss</label>
                    <select className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-aos-rose/20 focus:border-aos-rose outline-none">
                      <option>NOL-1001 — Own Damage</option>
                      <option>NOL-1002 — Third Party Property Damage</option>
                      <option>NOL-1003 — Fire Damage</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Cause of Loss Code</label>
                    <select className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-aos-rose/20 focus:border-aos-rose outline-none">
                      <option>COL-1002 — Accidental Damage</option>
                      <option>F02 — Electrical Short Circuit</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-slate-900 border-b border-slate-200 pb-2">Loss Description</h3>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Describe Circumstances</label>
                    <textarea 
                      rows={5} 
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-aos-rose/20 focus:border-aos-rose outline-none resize-none"
                      placeholder="Provide full description of how the loss occurred..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Loss Location</label>
                    <input type="text" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-aos-rose/20 focus:border-aos-rose outline-none" placeholder="E.g., Intersection of Nyerere Rd" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 max-w-2xl mx-auto mt-4">
              <div className="bg-aos-amber/10 p-4 rounded-xl border border-aos-amber/20 mb-6 flex items-start gap-3">
                <FileWarning className="w-5 h-5 text-aos-amber shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-aos-amber">Accounting Mode: Batch</h4>
                  <p className="text-xs text-aos-amber/80 mt-1">This claim requires an Initial Reserve estimate before submission. Total Policy Sum Insured is TZS 1,500,000,000. Deductible is 10% of Claim (Min 5M).</p>
                </div>
              </div>

              <div className="space-y-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-1">Estimated Initial Reserve</label>
                  <p className="text-xs text-slate-500 mb-3">Enter the gross estimated amount required to settle this claim.</p>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium text-lg">TZS</span>
                    <input type="number" className="w-full pl-14 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-lg font-bold focus:ring-2 focus:ring-aos-rose/20 focus:border-aos-rose outline-none" placeholder="0.00" />
                  </div>
                </div>
                
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-slate-700">Assign Surveyor Now?</p>
                    <p className="text-xs text-slate-500">You can also assign one later from the Claim Drawer.</p>
                  </div>
                  <select className="w-64 px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-aos-rose/20 focus:border-aos-rose outline-none">
                    <option>Select Surveyor (Optional)</option>
                    <option>TopMark Loss Adjusters Ltd</option>
                    <option>Global Surveyors</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 flex flex-col items-center justify-center py-8">
              <div className="w-16 h-16 bg-aos-rose/10 rounded-full flex items-center justify-center mb-4">
                <Send className="w-8 h-8 text-aos-rose" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Ready to Register FNOL</h3>
              <p className="text-sm text-slate-500 text-center max-w-md">
                Click 'Submit Claim' to generate the claim document (Doc Code: 20-CL-01-001) and post the initial reserve batch.
              </p>
              
              <div className="w-full max-w-md bg-slate-50 border border-slate-200 rounded-lg p-4 mt-4 text-sm text-slate-700 space-y-2">
                <div className="flex justify-between"><span>Policy:</span> <span className="font-medium">P11/2025/100/5042</span></div>
                <div className="flex justify-between"><span>Insured:</span> <span className="font-medium">Acme Corp Ltd</span></div>
                <div className="flex justify-between"><span>Action:</span> <span className="font-medium text-aos-rose">Create New Claim Record</span></div>
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
                disabled={step === 1 && !policyFound}
                className="px-4 py-2 text-sm font-medium text-white bg-aos-rose rounded-lg hover:bg-aos-rose/90 flex items-center gap-2 transition-colors shadow-sm shadow-aos-rose/20 disabled:opacity-50 disabled:cursor-not-allowed"
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
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" /> Submit Claim
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
