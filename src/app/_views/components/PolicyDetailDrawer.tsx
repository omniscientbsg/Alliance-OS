import React, { useState } from 'react';
import { Drawer } from '@/components/ui/drawer';
import { FileText, Shield, CreditCard, Clock, CheckCircle2, ChevronRight, Calculator, FileCheck } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface PolicyDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  policyId: string | null;
}

export function PolicyDetailDrawer({ isOpen, onClose, policyId }: PolicyDetailDrawerProps) {
  const [activeTab, setActiveTab] = useState('summary');

  if (!policyId) return null;

  return (
    <Drawer 
      isOpen={isOpen} 
      onClose={onClose} 
      title={`Policy Details: ${policyId}`}
      subtitle="Fire & Perils • Active"
      size="xl"
    >
      <div className="flex flex-col md:flex-row gap-6 h-full">
        {/* Sidebar Nav */}
        <div className="w-full md:w-56 shrink-0 space-y-1">
          <button 
            onClick={() => setActiveTab('summary')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'summary' ? 'bg-aos-blue/10 text-aos-blue' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <span className="flex items-center gap-2"><FileText className="w-4 h-4" /> Summary</span>
            <ChevronRight className={`w-4 h-4 ${activeTab === 'summary' ? 'opacity-100' : 'opacity-0'}`} />
          </button>
          <button 
            onClick={() => setActiveTab('financials')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'financials' ? 'bg-aos-blue/10 text-aos-blue' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <span className="flex items-center gap-2"><Calculator className="w-4 h-4" /> Financials</span>
            <ChevronRight className={`w-4 h-4 ${activeTab === 'financials' ? 'opacity-100' : 'opacity-0'}`} />
          </button>
          <button 
            onClick={() => setActiveTab('risk')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'risk' ? 'bg-aos-blue/10 text-aos-blue' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <span className="flex items-center gap-2"><Shield className="w-4 h-4" /> Risk Details</span>
            <ChevronRight className={`w-4 h-4 ${activeTab === 'risk' ? 'opacity-100' : 'opacity-0'}`} />
          </button>
          <button 
            onClick={() => setActiveTab('endorsements')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'endorsements' ? 'bg-aos-blue/10 text-aos-blue' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <span className="flex items-center gap-2"><FileCheck className="w-4 h-4" /> Endorsements (2)</span>
            <ChevronRight className={`w-4 h-4 ${activeTab === 'endorsements' ? 'opacity-100' : 'opacity-0'}`} />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          {activeTab === 'summary' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-slate-500 mb-1">Insured Party</h3>
                    <p className="text-base font-semibold text-slate-900">Acme Corp Ltd</p>
                    <p className="text-sm text-aos-blue">CUST-10024</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-500 mb-1">Intermediary</h3>
                    <p className="text-sm text-slate-900">Marsh Brokers Tanzania</p>
                    <p className="text-sm text-slate-500">Comm: 15%</p>
                  </div>
                </div>
                <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div>
                    <h3 className="text-sm font-medium text-slate-500 mb-1">Period of Cover</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-semibold text-slate-900">01 Jan 2025</span>
                      <span className="text-slate-400">→</span>
                      <span className="text-sm font-semibold text-slate-900">31 Dec 2025</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-500 mb-1">Status</h3>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-aos-emerald/10 text-aos-emerald text-sm font-medium">
                      <CheckCircle2 className="w-4 h-4" /> Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'financials' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <Card className="border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                  <h3 className="font-semibold text-slate-900">Premium Breakdown</h3>
                </div>
                <div className="p-0">
                  <table className="w-full text-sm text-left">
                    <tbody className="divide-y divide-slate-100">
                      <tr className="hover:bg-slate-50/50">
                        <td className="px-4 py-3 text-slate-600 font-medium">Basic Premium</td>
                        <td className="px-4 py-3 text-right text-slate-900 font-semibold">TZS 3,813,559</td>
                      </tr>
                      <tr className="hover:bg-slate-50/50">
                        <td className="px-4 py-3 text-slate-600">Training Levy (1%)</td>
                        <td className="px-4 py-3 text-right text-slate-900">TZS 38,136</td>
                      </tr>
                      <tr className="hover:bg-slate-50/50">
                        <td className="px-4 py-3 text-slate-600">Stamp Duty</td>
                        <td className="px-4 py-3 text-right text-slate-900">TZS 5,000</td>
                      </tr>
                      <tr className="hover:bg-slate-50/50">
                        <td className="px-4 py-3 text-slate-600">Value Added Tax (18%)</td>
                        <td className="px-4 py-3 text-right text-slate-900">TZS 643,305</td>
                      </tr>
                      <tr className="bg-aos-blue/5 border-t-2 border-aos-blue/20">
                        <td className="px-4 py-3 font-bold text-slate-900">Gross Premium</td>
                        <td className="px-4 py-3 text-right font-bold text-aos-blue text-base">TZS 4,500,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 border-slate-200 shadow-sm">
                  <h3 className="text-sm font-medium text-slate-500 mb-1">Total Sum Insured</h3>
                  <p className="text-xl font-bold text-slate-900">TZS 1,500,000,000</p>
                </Card>
                <Card className="p-4 border-slate-200 shadow-sm">
                  <h3 className="text-sm font-medium text-slate-500 mb-1">Deductible / Excess</h3>
                  <p className="text-xl font-bold text-slate-900">10% of Claim (Min. 5M)</p>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'risk' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-2">Property Details</h3>
              <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                <div>
                  <p className="text-sm text-slate-500">Risk Location</p>
                  <p className="text-sm font-medium text-slate-900 mt-1">Plot 45, Nyerere Road, Dar Es Salaam</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Construction Type</p>
                  <p className="text-sm font-medium text-slate-900 mt-1">Class I (Brick/Concrete)</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Occupancy</p>
                  <p className="text-sm font-medium text-slate-900 mt-1">Manufacturing / Warehouse</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Fire Protection Setup</p>
                  <p className="text-sm font-medium text-slate-900 mt-1">Sprinklers + Hydrants (15% Discount)</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'endorsements' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex justify-end">
                <button className="px-3 py-1.5 bg-aos-blue text-white rounded text-sm font-medium hover:bg-aos-blue/90 transition-colors shadow-sm">
                  + Pass Endorsement
                </button>
              </div>
              <Card className="p-4 border-slate-200 shadow-sm flex items-start gap-4">
                <div className="p-2 bg-slate-100 rounded-lg shrink-0">
                  <FileText className="w-5 h-5 text-slate-500" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">END-2025-001: Change of Address</h4>
                  <p className="text-xs text-slate-500 mt-1">Processed on 15 Feb 2025 by System Admin</p>
                  <p className="text-sm text-slate-700 mt-2">Updated risk location to Plot 45, Nyerere Road. No premium implication.</p>
                </div>
              </Card>
              <Card className="p-4 border-slate-200 shadow-sm flex items-start gap-4">
                <div className="p-2 bg-slate-100 rounded-lg shrink-0">
                  <FileText className="w-5 h-5 text-slate-500" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">END-2025-002: Sum Insured Increase</h4>
                  <p className="text-xs text-slate-500 mt-1">Processed on 10 Mar 2025 by Jane Underwriter</p>
                  <p className="text-sm text-slate-700 mt-2">Additional premium charged: TZS 250,000. Sum insured increased by 100M.</p>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </Drawer>
  );
}
