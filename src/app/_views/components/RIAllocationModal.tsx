import React, { useState } from 'react';
import { X, CheckCircle2, AlertTriangle, Scale, ShieldAlert, GitBranch, Share2 } from 'lucide-react';

interface RIAllocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  policyId?: string;
}

export function RIAllocationModal({ isOpen, onClose, policyId = "P11/2026/100/5042" }: RIAllocationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleApprove = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Share2 className="w-5 h-5 text-aos-coral" /> Reinsurance Allocation
            </h2>
            <p className="text-sm text-slate-500 mt-1">Review and approve treaty allocations for {policyId}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50 space-y-6">
          
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <p className="text-xs font-medium text-slate-500 mb-1">Total Sum Insured (100%)</p>
              <p className="text-xl font-bold text-slate-900">TZS 1.5B</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <p className="text-xs font-medium text-slate-500 mb-1">Total Premium (100%)</p>
              <p className="text-xl font-bold text-slate-900">TZS 45.0M</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <p className="text-xs font-medium text-slate-500 mb-1">Facultative Reinsurance</p>
              <p className="text-xl font-bold text-slate-900">0.00%</p>
            </div>
            <div className="bg-aos-coral/5 p-4 rounded-xl border border-aos-coral/20 shadow-sm">
              <p className="text-xs font-medium text-aos-coral mb-1">Allocation Status</p>
              <div className="flex items-center gap-1.5 mt-1">
                <AlertTriangle className="w-4 h-4 text-aos-coral" />
                <p className="text-sm font-bold text-aos-coral">Pending Approval</p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-end mb-4">
              <h3 className="text-sm font-semibold text-slate-900">Allocation Breakdown by Risk & Cover</h3>
              <button className="text-xs font-medium text-aos-blue hover:underline">Recalculate Allocation</button>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-2 font-semibold text-slate-600">Risk ID</th>
                    <th className="px-4 py-2 font-semibold text-slate-600">Treaty Type</th>
                    <th className="px-4 py-2 font-semibold text-slate-600">Alloc %</th>
                    <th className="px-4 py-2 font-semibold text-slate-600 text-right">Sum Insured Allocated</th>
                    <th className="px-4 py-2 font-semibold text-slate-600 text-right">Premium Allocated</th>
                    <th className="px-4 py-2 font-semibold text-slate-600 text-center">Comm %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {/* CQS */}
                  <tr className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900" rowSpan={3}>Risk-001 (Building)</td>
                    <td className="px-4 py-3 text-slate-600"><span className="px-2 py-0.5 rounded text-xs bg-slate-100 border border-slate-200 font-medium">CQS (Compulsory)</span></td>
                    <td className="px-4 py-3 font-medium">5.00%</td>
                    <td className="px-4 py-3 text-right">TZS 75,000,000</td>
                    <td className="px-4 py-3 text-right">TZS 2,250,000</td>
                    <td className="px-4 py-3 text-center">10.00</td>
                  </tr>
                  {/* RETN */}
                  <tr className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-600"><span className="px-2 py-0.5 rounded text-xs bg-aos-emerald/10 text-aos-emerald border-aos-emerald/20 font-medium">RETN (Retention)</span></td>
                    <td className="px-4 py-3 font-medium">40.00%</td>
                    <td className="px-4 py-3 text-right">TZS 600,000,000</td>
                    <td className="px-4 py-3 text-right">TZS 18,000,000</td>
                    <td className="px-4 py-3 text-center">-</td>
                  </tr>
                  {/* Surplus */}
                  <tr className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-600"><span className="px-2 py-0.5 rounded text-xs bg-aos-blue/10 text-aos-blue border-aos-blue/20 font-medium">1st SURPLUS</span></td>
                    <td className="px-4 py-3 font-medium">55.00%</td>
                    <td className="px-4 py-3 text-right">TZS 825,000,000</td>
                    <td className="px-4 py-3 text-right">TZS 24,750,000</td>
                    <td className="px-4 py-3 text-center">25.00</td>
                  </tr>
                  
                  {/* Totals */}
                  <tr className="bg-slate-50 border-t-2 border-slate-200 font-bold">
                    <td colSpan={2} className="px-4 py-3 text-right">Total:</td>
                    <td className="px-4 py-3 text-aos-coral">100.00%</td>
                    <td className="px-4 py-3 text-right text-aos-coral">TZS 1,500,000,000</td>
                    <td className="px-4 py-3 text-right text-aos-coral">TZS 45,000,000</td>
                    <td className="px-4 py-3"></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
              <ShieldAlert className="w-3 h-3" /> Allocation uses Treaty Code: <span className="font-medium">FIR-SUR-2026</span>
            </p>
          </div>

          <div className="bg-slate-100 p-4 rounded-xl border border-slate-200">
            <h4 className="text-sm font-semibold text-slate-900 mb-3">Manual Override Options</h4>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input type="checkbox" className="rounded text-aos-coral" /> Override CQS Percentage
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input type="checkbox" className="rounded text-aos-coral" /> Force Facultative Placement
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input type="checkbox" className="rounded text-aos-coral" /> Re-trigger XOL Assessment
              </label>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-100 bg-white flex justify-between items-center">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Cancel / Close
          </button>
          <div className="flex gap-3">
            <button className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
              Reversal
            </button>
            <button 
              onClick={handleApprove}
              disabled={isSubmitting}
              className="px-6 py-2 text-sm font-medium text-white bg-aos-coral rounded-lg hover:bg-aos-coral/90 flex items-center gap-2 transition-all shadow-sm shadow-aos-coral/20 disabled:opacity-80"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Approving...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" /> Approve Allocation
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
