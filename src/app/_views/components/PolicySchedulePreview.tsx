import React from 'react';
import { X, Printer, Download, Share2, Shield, FileText, CheckCircle2 } from 'lucide-react';

interface PolicySchedulePreviewProps {
  isOpen: boolean;
  onClose: () => void;
  policyId: string | null;
}

export function PolicySchedulePreview({ isOpen, onClose, policyId }: PolicySchedulePreviewProps) {
  if (!isOpen || !policyId) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl flex flex-col h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Policy Schedule Preview</h2>
            <p className="text-sm text-slate-500 mt-1">{policyId} • Generated automatically</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-colors tooltip-trigger" title="Print">
              <Printer className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-lg text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-colors tooltip-trigger" title="Download PDF">
              <Download className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-lg text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-colors tooltip-trigger" title="Share via Email">
              <Share2 className="w-5 h-5" />
            </button>
            <div className="w-px h-6 bg-slate-300 mx-2"></div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF Viewer Mockup */}
        <div className="flex-1 overflow-y-auto bg-slate-200 p-8 flex justify-center">
          <div className="bg-white w-[210mm] min-h-[297mm] shadow-lg p-12 text-slate-800 relative">
            <div className="absolute top-12 right-12 opacity-10">
              <Shield className="w-32 h-32" />
            </div>
            
            <div className="border-b-2 border-slate-800 pb-6 mb-8 text-center relative z-10">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">ALLIANCE INSURANCE</h1>
              <p className="text-sm text-slate-600 font-medium">Head Office: Nyerere Road, Dar es Salaam, Tanzania</p>
              <h2 className="text-xl font-bold mt-6 py-2 border-y border-slate-300 inline-block px-8">POLICY SCHEDULE</h2>
            </div>

            <div className="grid grid-cols-2 gap-8 text-sm mb-8 relative z-10">
              <div className="space-y-4">
                <div>
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Policy Number</p>
                  <p className="font-bold text-base">{policyId}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">The Insured</p>
                  <p className="font-bold text-base">Acme Corp Ltd</p>
                  <p className="text-slate-600">P.O. Box 1234, Dar es Salaam</p>
                  <p className="text-slate-600">TIN: 100-245-678</p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Intermediary</p>
                  <p className="font-medium">Marsh Brokers Tanzania</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Class of Business</p>
                  <p className="font-bold text-base">Fire & Allied Perils</p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Period of Insurance</p>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">01 Jan 2025</span>
                    <span className="text-slate-400">to</span>
                    <span className="font-medium">31 Dec 2025</span>
                  </div>
                  <p className="text-xs text-slate-500 italic mt-0.5">(Both dates inclusive)</p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Currency</p>
                  <p className="font-medium">TZS (Tanzanian Shilling)</p>
                </div>
              </div>
            </div>

            <div className="mb-8 relative z-10">
              <div className="bg-slate-100 p-2 font-bold text-slate-800 mb-4 border border-slate-200">RISK DETAILS & SUM INSURED</div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-300">
                    <th className="py-2 text-left font-semibold">Location / Description</th>
                    <th className="py-2 text-right font-semibold">Sum Insured (TZS)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-3">Item 1: Buildings & Machinery at Plot 45, Nyerere Rd</td>
                    <td className="py-3 text-right font-medium">1,000,000,000</td>
                  </tr>
                  <tr>
                    <td className="py-3">Item 2: Stock in Trade</td>
                    <td className="py-3 text-right font-medium">500,000,000</td>
                  </tr>
                  <tr className="bg-slate-50 font-bold border-t-2 border-slate-400">
                    <td className="py-3">TOTAL SUM INSURED</td>
                    <td className="py-3 text-right">1,500,000,000</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mb-12 relative z-10">
              <div className="bg-slate-100 p-2 font-bold text-slate-800 mb-4 border border-slate-200">PREMIUM COMPUTATION</div>
              <table className="w-full text-sm">
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-2">Basic Premium</td>
                    <td className="py-2 text-right">3,813,559</td>
                  </tr>
                  <tr>
                    <td className="py-2">Training Levy (1%)</td>
                    <td className="py-2 text-right">38,136</td>
                  </tr>
                  <tr>
                    <td className="py-2">Stamp Duty</td>
                    <td className="py-2 text-right">5,000</td>
                  </tr>
                  <tr>
                    <td className="py-2">Value Added Tax (18%)</td>
                    <td className="py-2 text-right">643,305</td>
                  </tr>
                  <tr className="bg-slate-50 font-bold border-t-2 border-slate-400 text-lg">
                    <td className="py-3">TOTAL GROSS PREMIUM DUE</td>
                    <td className="py-3 text-right">4,500,000</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-end mt-24 relative z-10">
              <div className="text-center">
                <div className="w-48 h-px bg-slate-400 mb-2"></div>
                <p className="text-xs font-semibold text-slate-600">Authorized Signatory</p>
                <p className="text-xs text-slate-500">Alliance Insurance</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500 mb-1">Generated by System Admin on 14 May 2026</p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded text-xs font-bold">
                  <CheckCircle2 className="w-3 h-3" /> VERIFIED E-DOCUMENT
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
