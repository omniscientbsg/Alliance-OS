import React, { useState } from 'react';
import { X, ChevronRight, CheckCircle2, ShieldAlert, Camera, Bot, Fingerprint, Activity, CheckCircle, Smartphone } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface ClaimSettlementWizardProps {
  isOpen: boolean;
  onClose: () => void;
  claimId?: string;
}

export function ClaimSettlementWizard({ isOpen, onClose, claimId = "C11/100/1002/2026/011637" }: ClaimSettlementWizardProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleNext = () => setStep(s => Math.min(2, s + 1));
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
        className="fixed inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-5xl bg-white dark:bg-[#0a0e1a] border border-transparent dark:border-slate-800 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-[#0f172a]">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Bot className="w-6 h-6 text-indigo-600 dark:text-indigo-400" /> Alliance AI: Zero-Touch Settlement
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">AI Visual Damage Assessment for Claim {claimId}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Stepper */}
        <div className="bg-white dark:bg-[#0a0e1a] border-b border-slate-100 dark:border-slate-800 px-6 py-4">
          <div className="flex items-center justify-between max-w-md mx-auto">
            <StepIndicator currentStep={step} stepNumber={1} label="Visual AI Assessment" icon={<Camera className="w-4 h-4" />} color="indigo-600" />
            <div className={`flex-1 h-0.5 mx-4 ${step >= 2 ? 'bg-indigo-600 dark:bg-indigo-500' : 'bg-slate-100 dark:bg-slate-800'}`} />
            <StepIndicator currentStep={step} stepNumber={2} label="STP Authorization" icon={<Fingerprint className="w-4 h-4" />} color="indigo-600" />
          </div>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50 dark:bg-[#0a0e1a]">
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Left Col: Uploaded Images & AI Overlay */}
                <div className="col-span-1 space-y-4">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-slate-500 dark:text-slate-400" /> Customer Uploads (WhatsApp)
                  </h3>
                  
                  <div className="relative rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800 aspect-[4/3] group border border-slate-300 dark:border-slate-700">
                    <img src="https://images.unsplash.com/photo-1590226344588-4672621a1f0a?auto=format&fit=crop&q=80&w=600" alt="Car Damage" className="w-full h-full object-cover" />
                    
                    {/* AI Overlay Mockup */}
                    <div className="absolute inset-0 bg-indigo-900/20"></div>
                    
                    {/* Bounding Box 1 */}
                    <div className="absolute top-[30%] left-[20%] w-[40%] h-[50%] border-2 border-dashed border-red-400 bg-red-400/20 rounded-md flex flex-col justify-end p-1">
                      <div className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm w-fit">
                        Front Bumper: 98%
                      </div>
                    </div>
                    {/* Bounding Box 2 */}
                    <div className="absolute top-[40%] left-[65%] w-[25%] h-[30%] border-2 border-dashed border-orange-400 bg-orange-400/20 rounded-md flex flex-col justify-end p-1">
                      <div className="bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm w-fit">
                        Headlight: 92%
                      </div>
                    </div>

                    <div className="absolute top-2 right-2 bg-indigo-600 dark:bg-indigo-500 text-white text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-lg">
                      <Activity className="w-3 h-3" /> Scanned
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="aspect-square bg-slate-200 dark:bg-slate-800 rounded-lg overflow-hidden border-2 border-indigo-500 dark:border-indigo-400">
                      <img src="https://images.unsplash.com/photo-1590226344588-4672621a1f0a?auto=format&fit=crop&q=80&w=200" alt="Thumb" className="w-full h-full object-cover" />
                    </div>
                    <div className="aspect-square bg-slate-200 dark:bg-slate-800 rounded-lg overflow-hidden opacity-50">
                       <img src="https://images.unsplash.com/photo-1588625946153-623e1f5746b8?auto=format&fit=crop&q=80&w=200" alt="Thumb" className="w-full h-full object-cover" />
                    </div>
                    <div className="aspect-square bg-slate-200 dark:bg-slate-800 rounded-lg flex items-center justify-center opacity-50 border border-slate-300 dark:border-slate-700">
                      <Camera className="w-6 h-6 text-slate-400 dark:text-slate-500" />
                    </div>
                  </div>
                </div>

                {/* Right Col: AI Analysis & Financials */}
                <div className="col-span-2 space-y-6">
                  
                  <Card className="border-indigo-200 dark:border-indigo-900/50 shadow-sm overflow-hidden bg-white dark:bg-[#0f172a]">
                    <div className="bg-indigo-50 dark:bg-indigo-900/40 p-4 border-b border-indigo-100 dark:border-indigo-900/50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bot className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                        <h3 className="font-semibold text-indigo-900 dark:text-indigo-200">Computer Vision Analysis</h3>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold rounded-full border border-green-200 dark:border-green-800/50">
                        <CheckCircle className="w-3.5 h-3.5" /> HIGH CONFIDENCE
                      </div>
                    </div>
                    
                    <div className="p-4 grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Detected Damages</p>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-700 dark:text-slate-300">1. Front Bumper (Replace)</span>
                            <span className="font-medium text-slate-900 dark:text-slate-100">TZS 850,000</span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-700 dark:text-slate-300">2. Right Headlight (Replace)</span>
                            <span className="font-medium text-slate-900 dark:text-slate-100">TZS 250,000</span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-700 dark:text-slate-300">3. Paint & Labor</span>
                            <span className="font-medium text-slate-900 dark:text-slate-100">TZS 150,000</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3 border-l border-slate-100 dark:border-slate-800 pl-4">
                         <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Policy Validation</p>
                         <div className="space-y-2 text-sm">
                           <div className="flex justify-between items-center">
                             <span className="text-slate-600 dark:text-slate-400">Coverage Active?</span>
                             <span className="text-green-600 dark:text-green-400 font-medium">Yes</span>
                           </div>
                           <div className="flex justify-between items-center">
                             <span className="text-slate-600 dark:text-slate-400">Police Report Req?</span>
                             <span className="text-slate-900 dark:text-slate-100 font-medium">Waived (Minor)</span>
                           </div>
                           <div className="flex justify-between items-center">
                             <span className="text-slate-600 dark:text-slate-400">Fraud Risk Score</span>
                             <span className="text-green-600 dark:text-green-400 font-medium">12/100 (Safe)</span>
                           </div>
                         </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-[#0f172a]">
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Financial Recommendation</h3>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600 dark:text-slate-400 text-sm">AI Estimated Repair Cost</span>
                        <span className="font-semibold text-slate-900 dark:text-slate-100">TZS 1,250,000</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600 dark:text-slate-400 text-sm">Less: Policy Deductible</span>
                        <span className="font-semibold text-rose-500 dark:text-rose-400">- TZS 100,000</span>
                      </div>
                      <div className="w-full h-px bg-slate-200 dark:bg-slate-800 my-2"></div>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-900 dark:text-slate-100">Net Recommended Payout</span>
                        <span className="font-bold text-2xl text-aos-emerald dark:text-emerald-400">TZS 1,150,000</span>
                      </div>
                    </div>
                  </Card>

                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 flex flex-col items-center justify-center py-12">
              <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-4 border-4 border-indigo-100 dark:border-indigo-800/50 shadow-inner">
                <Fingerprint className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Straight-Through Processing (STP)</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 text-center max-w-md">
                You are about to authorize an instant Fast-Track payout. The funds will be disbursed immediately to the customer's registered mobile wallet or bank account.
              </p>
              
              <div className="w-full max-w-md bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-sm rounded-xl p-5 mt-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">Payee:</span> 
                  <span className="font-medium text-slate-900 dark:text-slate-100">Sarah Jenkins (Insured)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">Channel:</span> 
                  <span className="font-medium text-slate-900 dark:text-slate-100">M-Pesa Mobile Money</span>
                </div>
                <div className="w-full h-px bg-slate-100 dark:bg-slate-800"></div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400 text-sm">Amount:</span> 
                  <span className="font-bold text-aos-emerald dark:text-emerald-400 text-xl">TZS 1,150,000</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-[#0a0e1a] flex justify-between items-center">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
          >
            Cancel
          </button>
          <div className="flex gap-3">
            <button 
              onClick={handleBack}
              disabled={step === 1 || isSubmitting}
              className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-[#0f172a] border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Back
            </button>
            {step < 2 ? (
              <button 
                onClick={handleNext}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 rounded-lg flex items-center gap-2 transition-colors shadow-sm shadow-indigo-600/20"
              >
                Review STP Terms <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button 
                onClick={handleSettle}
                disabled={isSubmitting}
                className="px-6 py-2 text-sm font-medium text-white bg-aos-emerald hover:bg-aos-emerald/90 dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-lg flex items-center gap-2 transition-all shadow-sm shadow-aos-emerald/20 disabled:opacity-80"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Executing STP...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" /> Authorize Instant Payout
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
        isActive ? `bg-${color} dark:bg-indigo-500 text-white ring-4 ring-${color}/20 shadow-md` : 
        isComplete ? `bg-${color} dark:bg-indigo-500 text-white` : 
        'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700'
      }`}>
        {isComplete ? <CheckCircle2 className="w-5 h-5" /> : stepNumber}
      </div>
      <span className={`text-xs mt-2 font-semibold ${isActive ? `text-${color} dark:text-indigo-400` : isComplete ? 'text-slate-700 dark:text-slate-300' : 'text-slate-400 dark:text-slate-500'}`}>
        {label}
      </span>
    </div>
  );
}
