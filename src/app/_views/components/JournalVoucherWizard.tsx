import React, { useState } from 'react';
import { X, ChevronRight, CheckCircle2, FileText, Calculator, Send } from 'lucide-react';
import { CurrencyInput } from '@/components/shared/CurrencyInput';

interface JournalVoucherWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

export function JournalVoucherWizard({ isOpen, onClose }: JournalVoucherWizardProps) {
  const [step, setStep] = useState(0);
  const [entries, setEntries] = useState([
    { id: 1, account: '', debit: 0, credit: 0, narration: '' },
    { id: 2, account: '', debit: 0, credit: 0, narration: '' }
  ]);

  if (!isOpen) return null;

  const totalDebit = entries.reduce((sum, e) => sum + e.debit, 0);
  const totalCredit = entries.reduce((sum, e) => sum + e.credit, 0);
  const isBalanced = totalDebit === totalCredit && totalDebit > 0;

  const handleAddEntry = () => {
    setEntries([...entries, { id: Date.now(), account: '', debit: 0, credit: 0, narration: '' }]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300">
        
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Create Journal Voucher</h2>
            <p className="text-xs text-slate-500">Manual GL Adjustment • Step {step + 1} of 2</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200"><X className="w-5 h-5 text-slate-500" /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
          {step === 0 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">JV Date</label>
                  <input type="date" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:border-aos-blue outline-none" defaultValue="2026-05-14" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Reference / Doc No</label>
                  <input type="text" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:border-aos-blue outline-none" placeholder="E.g., ADJ-MAY-01" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Global Narration</label>
                <input type="text" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:border-aos-blue outline-none" placeholder="Description for this JV..." />
              </div>

              <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-semibold text-slate-900">Ledger Entries</h3>
                  <button onClick={handleAddEntry} className="text-xs font-medium text-aos-blue hover:underline">+ Add Line</button>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-2 text-left font-semibold text-slate-600">Account Code</th>
                        <th className="px-4 py-2 text-right font-semibold text-slate-600 w-32">Debit (TZS)</th>
                        <th className="px-4 py-2 text-right font-semibold text-slate-600 w-32">Credit (TZS)</th>
                        <th className="px-4 py-2 text-left font-semibold text-slate-600">Line Narration</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {entries.map((entry, idx) => (
                        <tr key={entry.id}>
                          <td className="p-2">
                            <select className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs outline-none">
                              <option>Select Account...</option>
                              <option>4001 - Premium Receivable</option>
                              <option>5001 - Commission Expense</option>
                              <option>1001 - Main Bank Account</option>
                              <option>8001 - Misc Adjustments</option>
                            </select>
                          </td>
                          <td className="p-2">
                            <input 
                              type="number" 
                              className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs outline-none text-right" 
                              placeholder="0"
                              value={entry.debit || ''}
                              onChange={e => {
                                const newEntries = [...entries];
                                newEntries[idx].debit = Number(e.target.value);
                                setEntries(newEntries);
                              }}
                            />
                          </td>
                          <td className="p-2">
                            <input 
                              type="number" 
                              className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs outline-none text-right" 
                              placeholder="0"
                              value={entry.credit || ''}
                              onChange={e => {
                                const newEntries = [...entries];
                                newEntries[idx].credit = Number(e.target.value);
                                setEntries(newEntries);
                              }}
                            />
                          </td>
                          <td className="p-2">
                            <input type="text" className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs outline-none" placeholder="Remarks..." />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-slate-50 border-t-2 border-slate-200 font-bold">
                      <tr>
                        <td className="px-4 py-3 text-right text-slate-700">TOTALS:</td>
                        <td className={`px-4 py-3 text-right ${totalDebit !== totalCredit ? 'text-aos-rose' : 'text-slate-900'}`}>{totalDebit.toLocaleString()}</td>
                        <td className={`px-4 py-3 text-right ${totalDebit !== totalCredit ? 'text-aos-rose' : 'text-slate-900'}`}>{totalCredit.toLocaleString()}</td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                {!isBalanced && (
                  <p className="text-xs font-medium text-aos-rose mt-2 text-right px-4">Debits and Credits must balance to proceed.</p>
                )}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-300 flex flex-col items-center justify-center py-8">
              <div className="w-16 h-16 bg-aos-blue/10 rounded-full flex items-center justify-center mb-4">
                <Send className="w-8 h-8 text-aos-blue" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Post Journal Voucher</h3>
              <p className="text-sm text-slate-500 text-center max-w-md">
                You are about to post a manual JV with a total value of <strong>TZS {totalDebit.toLocaleString()}</strong>.
              </p>
              
              <div className="w-full max-w-md bg-slate-50 border border-slate-200 rounded-lg p-4 mt-4 text-sm text-slate-700 space-y-2">
                <div className="flex justify-between"><span>Status:</span> <span className="font-medium text-aos-amber">Pending Maker/Checker Approval</span></div>
                <div className="flex justify-between"><span>Lines:</span> <span className="font-medium">{entries.length}</span></div>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-slate-100 bg-white flex justify-between items-center">
          <button onClick={() => step > 0 ? setStep(step - 1) : onClose()} className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900">
            {step === 0 ? 'Cancel' : 'Back'}
          </button>
          {step === 0 ? (
            <button 
              onClick={() => setStep(1)} 
              disabled={!isBalanced}
              className="px-6 py-2 text-sm font-medium text-white bg-aos-blue rounded-lg hover:bg-aos-blue/90 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm flex items-center gap-2"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button onClick={onClose} className="px-6 py-2 text-sm font-medium text-white bg-aos-emerald rounded-lg hover:bg-aos-emerald/90 shadow-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Submit for Approval
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
