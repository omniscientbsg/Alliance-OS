import React, { useState } from 'react';
import { Drawer } from '@/components/ui/drawer';
import { FileWarning, Calculator, Users, DollarSign, Activity } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface ClaimDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  claimId: string | null;
}

export function ClaimDetailDrawer({ isOpen, onClose, claimId }: ClaimDetailDrawerProps) {
  const [activeTab, setActiveTab] = useState('loss');

  if (!claimId) return null;

  return (
    <Drawer 
      isOpen={isOpen} 
      onClose={onClose} 
      title={`Claim Ref: ${claimId}`}
      subtitle="Fire Damage • Under Review"
      size="xl"
    >
      <div className="flex flex-col md:flex-row gap-6 h-full">
        <div className="w-full md:w-56 shrink-0 space-y-1">
          <button onClick={() => setActiveTab('loss')} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'loss' ? 'bg-aos-blue/10 text-aos-blue' : 'text-slate-600 hover:bg-slate-50'}`}>
            <span className="flex items-center gap-2"><FileWarning className="w-4 h-4" /> Loss Details</span>
          </button>
          <button onClick={() => setActiveTab('reserves')} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'reserves' ? 'bg-aos-blue/10 text-aos-blue' : 'text-slate-600 hover:bg-slate-50'}`}>
            <span className="flex items-center gap-2"><DollarSign className="w-4 h-4" /> Reserves & Payments</span>
          </button>
          <button onClick={() => setActiveTab('parties')} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'parties' ? 'bg-aos-blue/10 text-aos-blue' : 'text-slate-600 hover:bg-slate-50'}`}>
            <span className="flex items-center gap-2"><Users className="w-4 h-4" /> Involved Parties</span>
          </button>
        </div>

        <div className="flex-1 min-w-0">
          {activeTab === 'loss' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <Card className="p-5 border-slate-200 shadow-sm space-y-6">
                <div className="grid grid-cols-2 gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Policy Number</p>
                    <p className="text-base font-semibold text-aos-blue mt-1">P11/2025/100/5042</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Insured Party</p>
                    <p className="text-base font-semibold text-slate-900 mt-1">Acme Corp Ltd</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Date of Loss</p>
                    <p className="text-sm font-medium text-slate-900">15 April 2026</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Date Intimated (FNOL)</p>
                    <p className="text-sm font-medium text-slate-900">16 April 2026</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Cause of Loss Code</p>
                    <p className="text-sm font-medium text-slate-900">F02 - Electrical Short Circuit</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-slate-500 mb-2">Loss Description</p>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-sm text-slate-700 leading-relaxed">
                    A fire broke out in the main server room on the 4th floor due to a suspected electrical fault in the AC unit. The fire was contained within 45 minutes by the internal sprinkler system, but significant water and smoke damage occurred to the adjacent IT equipment.
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'reserves' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="grid grid-cols-3 gap-4">
                <Card className="p-4 border-slate-200 shadow-sm">
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Initial Reserve</p>
                  <p className="text-xl font-bold text-slate-900 mt-1">TZS 25,000,000</p>
                </Card>
                <Card className="p-4 border-slate-200 shadow-sm bg-aos-amber/5 border-aos-amber/20">
                  <p className="text-xs text-aos-amber uppercase tracking-wider font-semibold">Current/Revised Reserve</p>
                  <p className="text-xl font-bold text-aos-amber mt-1">TZS 45,000,000</p>
                </Card>
                <Card className="p-4 border-slate-200 shadow-sm bg-aos-emerald/5 border-aos-emerald/20">
                  <p className="text-xs text-aos-emerald uppercase tracking-wider font-semibold">Total Paid to Date</p>
                  <p className="text-xl font-bold text-aos-emerald mt-1">TZS 0.00</p>
                </Card>
              </div>

              <Card className="p-0 border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                  <h3 className="font-semibold text-slate-900">Financial History Log</h3>
                </div>
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-2 font-medium">Date</th>
                      <th className="px-4 py-2 font-medium">Action</th>
                      <th className="px-4 py-2 font-medium text-right">Amount</th>
                      <th className="px-4 py-2 font-medium">User</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50/50">
                      <td className="px-4 py-3 text-slate-600">16 Apr 2026</td>
                      <td className="px-4 py-3"><span className="px-2 py-0.5 rounded bg-slate-100 text-xs font-medium">Initial Reserve Creation</span></td>
                      <td className="px-4 py-3 text-right font-medium">TZS 25,000,000</td>
                      <td className="px-4 py-3 text-slate-500">System (Auto-FNOL)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="px-4 py-3 text-slate-600">20 Apr 2026</td>
                      <td className="px-4 py-3"><span className="px-2 py-0.5 rounded bg-aos-amber/10 text-aos-amber text-xs font-medium">Reserve Revision Upwards</span></td>
                      <td className="px-4 py-3 text-right font-medium">+ TZS 20,000,000</td>
                      <td className="px-4 py-3 text-slate-500">J. Handler</td>
                    </tr>
                  </tbody>
                </table>
              </Card>
            </div>
          )}
          
          {activeTab === 'parties' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <Card className="p-4 border-slate-200 shadow-sm flex justify-between items-center">
                 <div>
                   <p className="text-xs font-semibold text-slate-500 uppercase">Assigned Surveyor</p>
                   <p className="text-base font-medium text-slate-900">TopMark Loss Adjusters Ltd</p>
                   <p className="text-sm text-slate-500">Report Status: Pending Final Review</p>
                 </div>
                 <button className="px-3 py-1.5 text-sm font-medium text-aos-blue border border-aos-blue/20 rounded-lg hover:bg-aos-blue/5">View Report</button>
              </Card>
              <Card className="p-4 border-slate-200 shadow-sm flex justify-between items-center">
                 <div>
                   <p className="text-xs font-semibold text-slate-500 uppercase">Assigned Repairer/Contractor</p>
                   <p className="text-base font-medium text-slate-900">Not Yet Assigned</p>
                 </div>
                 <button className="px-3 py-1.5 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50">Assign Now</button>
              </Card>
            </div>
          )}
        </div>
      </div>
    </Drawer>
  );
}
