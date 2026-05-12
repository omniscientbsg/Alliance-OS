import React, { useState } from 'react';
import { X, ChevronRight, CheckCircle2, User, Building, MapPin, Briefcase } from 'lucide-react';

interface CustomerWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CustomerWizard({ isOpen, onClose }: CustomerWizardProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleNext = () => setStep(s => Math.min(3, s + 1));
  const handleBack = () => setStep(s => Math.max(1, s - 1));

  const handleCreate = () => {
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
            <h2 className="text-xl font-bold text-slate-900">Agent/Broker Code Creation</h2>
            <p className="text-sm text-slate-500 mt-1">Master Setup for Intermediaries and Insureds</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Stepper */}
        <div className="bg-white border-b border-slate-100 px-6 py-4">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            <StepIndicator currentStep={step} stepNumber={1} label="Core Details" icon={<User className="w-4 h-4" />} color="aos-teal" />
            <div className={`flex-1 h-0.5 mx-4 ${step >= 2 ? 'bg-aos-teal' : 'bg-slate-100'}`} />
            <StepIndicator currentStep={step} stepNumber={2} label="Commercial Details" icon={<Briefcase className="w-4 h-4" />} color="aos-teal" />
            <div className={`flex-1 h-0.5 mx-4 ${step >= 3 ? 'bg-aos-teal' : 'bg-slate-100'}`} />
            <StepIndicator currentStep={step} stepNumber={3} label="Addresses" icon={<MapPin className="w-4 h-4" />} color="aos-teal" />
          </div>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="grid grid-cols-2 gap-x-8 gap-y-5">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Category Code</label>
                  <select className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-aos-teal/20 focus:border-aos-teal outline-none">
                    <option>601 — Agents — Dar es Salaam</option>
                    <option>602 — Brokers — Nationwide</option>
                    <option>100 — Direct Customers</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Customer Code (Auto-generated)</label>
                  <input type="text" className="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-lg text-sm text-slate-500" value="6010000147" readOnly />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-slate-700 mb-1">First Name / Company Name</label>
                  <input type="text" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-aos-teal/20 focus:border-aos-teal outline-none" defaultValue="MADSON INSURANCE AGENCY" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Customer Nationality</label>
                  <select className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-aos-teal/20 focus:border-aos-teal outline-none">
                    <option>TZ — Tanzania</option>
                    <option>KE — Kenya</option>
                    <option>UG — Uganda</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Short Name</label>
                  <input type="text" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-aos-teal/20 focus:border-aos-teal outline-none" defaultValue="MADSON INSURANC" />
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <input type="checkbox" id="comm_cust" className="rounded text-aos-teal focus:ring-aos-teal" defaultChecked />
                  <label htmlFor="comm_cust" className="text-sm text-slate-700">Commercial Customer</label>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <input type="checkbox" id="all_curr" className="rounded text-aos-teal focus:ring-aos-teal" />
                  <label htmlFor="all_curr" className="text-sm text-slate-700">All Currencies Applicable</label>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="grid grid-cols-2 gap-x-8 gap-y-5">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-medium text-slate-700">Credit Check Required</label>
                    <input type="checkbox" className="rounded text-aos-teal focus:ring-aos-teal" />
                  </div>
                  <input type="number" placeholder="Credit Limit (TZS)" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-aos-teal/20 focus:border-aos-teal outline-none mt-2" disabled />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Credit Days</label>
                  <input type="number" placeholder="Days" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-aos-teal/20 focus:border-aos-teal outline-none" disabled />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Bond Limit</label>
                  <input type="number" placeholder="Amount (TZS)" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-aos-teal/20 focus:border-aos-teal outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Bond Outstanding</label>
                  <input type="number" className="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-lg text-sm text-slate-500" value="0.00" readOnly />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">TIN Number</label>
                  <input type="text" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-aos-teal/20 focus:border-aos-teal outline-none" placeholder="Tax Identification Number" />
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <input type="checkbox" id="tira_non_motor" className="rounded text-aos-teal focus:ring-aos-teal" />
                  <label htmlFor="tira_non_motor" className="text-sm text-slate-700">TIRA NON MOTOR (Integration)</label>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="bg-aos-teal/5 p-4 rounded-xl border border-aos-teal/20 mb-6">
                <p className="text-sm font-medium text-aos-teal flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Physical Address
                </p>
                <p className="text-xs text-slate-600 mt-1">
                  Primary physical address for the intermediary or insured entity.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-5">
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-slate-700 mb-1">Address Lines</label>
                  <div className="space-y-2">
                    <input type="text" placeholder="Address Line 1 (Street/Building)" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-aos-teal/20 focus:border-aos-teal outline-none" />
                    <input type="text" placeholder="Address Line 2 (Area/District)" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-aos-teal/20 focus:border-aos-teal outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">City</label>
                  <select className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-aos-teal/20 focus:border-aos-teal outline-none">
                    <option>Dar es Salaam</option>
                    <option>Arusha</option>
                    <option>Dodoma</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Country</label>
                  <select className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-aos-teal/20 focus:border-aos-teal outline-none">
                    <option>Tanzania</option>
                    <option>Kenya</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">ISD Code & Mobile</label>
                  <div className="flex gap-2">
                    <select className="w-24 px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-aos-teal/20 focus:border-aos-teal outline-none">
                      <option>+255</option>
                      <option>+254</option>
                    </select>
                    <input type="text" placeholder="Mobile No" className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-aos-teal/20 focus:border-aos-teal outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Email (Contact 1)</label>
                  <input type="email" placeholder="Email Address" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-aos-teal/20 focus:border-aos-teal outline-none" />
                </div>
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
                className="px-4 py-2 text-sm font-medium text-white bg-aos-teal rounded-lg hover:bg-aos-teal/90 flex items-center gap-2 transition-colors shadow-sm shadow-aos-teal/20"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button 
                onClick={handleCreate}
                disabled={isSubmitting}
                className="px-6 py-2 text-sm font-medium text-white bg-aos-emerald rounded-lg hover:bg-aos-emerald/90 flex items-center gap-2 transition-all shadow-sm shadow-aos-emerald/20 disabled:opacity-80"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" /> Save Record
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
