import React, { useEffect, useState } from 'react';
import { Loader2, AlertTriangle, Key } from 'lucide-react';

interface TrapdoorModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export function TrapdoorModal({ isOpen, onClose, title = "Issuing Policy..." }: TrapdoorModalProps) {
  const [stage, setStage] = useState<'loading' | 'error'>('loading');

  useEffect(() => {
    if (isOpen) {
      setStage('loading');
      const timer = setTimeout(() => {
        setStage('error');
      }, 1500); // 1.5s delay
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4 overflow-hidden relative">
        
        {stage === 'loading' && (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="w-10 h-10 text-aos-blue animate-spin mb-4" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{title}</h3>
            <p className="text-sm text-slate-500 mt-2 text-center">Committing transaction to core ledger...</p>
          </div>
        )}

        {stage === 'error' && (
          <div className="flex flex-col items-center py-4 animate-in slide-in-from-bottom-4 duration-300">
            <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center mb-6">
              <Key className="w-8 h-8 text-rose-600 dark:text-rose-400" />
            </div>
            
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">System Alert</h3>
            
            <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50 rounded-xl p-4 mb-6">
              <div className="flex gap-3">
                <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-rose-900 dark:text-rose-300">Transaction Halted</h4>
                  <p className="text-sm text-rose-700 dark:text-rose-400 mt-1 leading-relaxed">
                    Alliance Payment Gateway Configuration Missing. Please provide API keys to module to complete this financial transaction.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 w-full">
              <button 
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl font-bold text-slate-700 dark:text-slate-200 bg-white border border-slate-200 dark:bg-slate-900 dark:border-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl font-bold text-white bg-slate-900 dark:bg-white dark:text-slate-900 hover:opacity-90 transition-colors"
              >
                Acknowledge
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}