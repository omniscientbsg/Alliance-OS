"use client";

import React, { useState } from 'react';
import { X, AlertTriangle, FileWarning, CheckCircle2 } from 'lucide-react';

interface CancellationModalProps {
  isOpen: boolean;
  onClose: () => void;
  policyId: string;
}

export function CancellationModal({ isOpen, onClose, policyId }: CancellationModalProps) {
  const [method, setMethod] = useState<'pro-rata' | 'short-period'>('pro-rata');
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleCancel = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
        
        {success ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-aos-emerald/10 text-aos-emerald rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Cancellation Processed</h2>
            <p className="text-sm text-slate-500">Policy {policyId} has been cancelled successfully. Endorsement generated.</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-aos-rose/5">
              <div className="flex items-center gap-3">
                <FileWarning className="w-5 h-5 text-aos-rose" />
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Cancel Policy</h2>
                  <p className="text-xs text-slate-500">{policyId}</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200"><X className="w-5 h-5 text-slate-500" /></button>
            </div>

            <div className="p-6 space-y-6">
              <div className="bg-aos-amber/10 border border-aos-amber/20 rounded-lg p-3 flex gap-3 items-start">
                <AlertTriangle className="w-5 h-5 text-aos-amber shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700">Cancelling a policy is an irreversible financial action. A return premium endorsement will be generated based on the calculation method.</p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-2">Calculation Method</label>
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => setMethod('pro-rata')} className={`p-3 border rounded-lg text-left transition-all ${method === 'pro-rata' ? 'border-aos-rose bg-aos-rose/5 ring-1 ring-aos-rose' : 'border-slate-200 hover:border-slate-300'}`}>
                    <span className="block text-sm font-semibold text-slate-900">Pro-Rata</span>
                    <span className="block text-xs text-slate-500 mt-1">Exact daily calculation</span>
                  </button>
                  <button onClick={() => setMethod('short-period')} className={`p-3 border rounded-lg text-left transition-all ${method === 'short-period' ? 'border-aos-rose bg-aos-rose/5 ring-1 ring-aos-rose' : 'border-slate-200 hover:border-slate-300'}`}>
                    <span className="block text-sm font-semibold text-slate-900">Short Period</span>
                    <span className="block text-xs text-slate-500 mt-1">Penalty scales applied</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Effective Date of Cancellation</label>
                <input type="date" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:border-aos-rose outline-none" />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Reason for Cancellation</label>
                <textarea 
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:border-aos-rose outline-none min-h-[80px]" 
                  placeholder="e.g. Vehicle sold..."
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                />
              </div>

              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
                <div className="flex justify-between text-sm"><span className="text-slate-500">Unexpired Risk Days</span><span className="font-medium">210 Days</span></div>
                <div className="flex justify-between text-sm pt-2 border-t font-bold"><span className="text-slate-900">Return Premium Est.</span><span className="text-aos-rose">TZS 850,000</span></div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900">Cancel</button>
              <button onClick={handleCancel} disabled={!reason || isSubmitting} className="px-6 py-2 text-sm font-medium text-white bg-aos-rose rounded-lg hover:bg-aos-rose/90 flex items-center gap-2 shadow-sm disabled:opacity-50">
                {isSubmitting ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Processing...</> : 'Confirm Cancellation'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
