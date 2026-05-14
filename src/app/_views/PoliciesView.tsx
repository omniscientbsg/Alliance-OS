import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield, Search, Plus, Filter, FileText, CheckCircle2, XCircle, Clock } from "lucide-react";
import { PolicyDetailDrawer } from './components/PolicyDetailDrawer';
import { IssuePolicyWizard } from './components/IssuePolicyWizard';
import { QuotationWizard } from './components/QuotationWizard';
import { RenewalEngine } from './components/RenewalEngine';

export default function PoliciesView() {
  const [activeTab, setActiveTab] = useState('active');
  const [selectedPolicy, setSelectedPolicy] = useState<string | null>(null);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isQuotationOpen, setIsQuotationOpen] = useState(false);

  const policies = [
    { id: "P11/2025/100/5042", insured: "Acme Corp Ltd", type: "Fire & Perils", premium: "TZS 4,500,000", status: "Active", startDate: "2025-01-01", endDate: "2025-12-31", tiraSync: 'Synced' },
    { id: "P11/2025/100/5043", insured: "Global Industries", type: "Marine Cargo", premium: "TZS 12,200,000", status: "Pending Approval", startDate: "2025-02-15", endDate: "2026-02-14", tiraSync: 'Pending' },
    { id: "P11/2025/100/5044", insured: "John Doe", type: "Motor Comprehensive", premium: "TZS 850,000", status: "Active", startDate: "2025-03-10", endDate: "2026-03-09", tiraSync: 'Synced' },
    { id: "P11/2024/100/4012", insured: "Tech Solutions Inc", type: "Cyber Liability", premium: "TZS 2,100,000", status: "Expired", startDate: "2024-05-01", endDate: "2025-04-30", tiraSync: 'Synced' },
    { id: "P11/2025/100/5045", insured: "City Construction", type: "Contractors All Risk", premium: "TZS 18,500,000", status: "Active", startDate: "2025-04-20", endDate: "2026-04-19", tiraSync: 'Pending' },
  ];

  return (
    <>
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Policy Management</h1>
            <p className="text-sm text-slate-500 mt-1">Manage policies, endorsements, and renewals.</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2">
              <Filter className="w-4 h-4" /> Filter
            </button>
            <button 
              onClick={() => setIsQuotationOpen(true)}
              className="px-4 py-2 bg-white border border-aos-blue/30 text-aos-blue rounded-lg text-sm font-medium hover:bg-aos-blue/5 transition-colors shadow-sm flex items-center gap-2"
            >
              <FileText className="w-4 h-4" /> New Quotation
            </button>
            <button 
              onClick={() => setIsWizardOpen(true)}
              className="px-4 py-2 bg-aos-blue text-white rounded-lg text-sm font-medium hover:bg-aos-blue/90 transition-colors shadow-sm shadow-aos-blue/20 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Issue Policy
            </button>
          </div>
        </div>

        <Card className="shadow-sm border-slate-200">
          <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between gap-4 bg-slate-50/50 rounded-t-xl">
            <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg">
              <button onClick={() => setActiveTab('active')} className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === 'active' ? 'bg-white text-aos-blue shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>Active</button>
              <button onClick={() => setActiveTab('pending')} className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === 'pending' ? 'bg-white text-aos-blue shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>Pending</button>
              <button onClick={() => setActiveTab('expired')} className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === 'expired' ? 'bg-white text-aos-blue shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>Expired</button>
              <button onClick={() => setActiveTab('renewals')} className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === 'renewals' ? 'bg-white text-aos-blue shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>Renewals Pipeline</button>
            </div>
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search by Policy No, Insured..." 
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-aos-blue/20 transition-all"
              />
            </div>
          </div>
          <div className="p-0">
            {activeTab === 'renewals' ? (
              <div className="p-4 bg-slate-50">
                <RenewalEngine />
              </div>
            ) : (
            <>
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="font-semibold text-slate-600 py-3">Policy Number</TableHead>
                  <TableHead className="font-semibold text-slate-600">Insured Name</TableHead>
                  <TableHead className="font-semibold text-slate-600">Product</TableHead>
                  <TableHead className="font-semibold text-slate-600">Gross Premium</TableHead>
                  <TableHead className="font-semibold text-slate-600">Period</TableHead>
                  <TableHead className="font-semibold text-slate-600">Status</TableHead>
                  <TableHead className="font-semibold text-slate-600 text-center">TIRA Sync</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {policies.map((policy) => (
                  <TableRow 
                    key={policy.id} 
                    className="hover:bg-slate-50/50 cursor-pointer group"
                    onClick={() => setSelectedPolicy(policy.id)}
                  >
                    <TableCell className="font-medium text-aos-blue group-hover:underline">
                      {policy.id}
                    </TableCell>
                    <TableCell className="font-medium text-slate-900">{policy.insured}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">
                        <Shield className="w-3 h-3 text-slate-500" />
                        {policy.type}
                      </span>
                    </TableCell>
                    <TableCell className="font-semibold text-slate-700">{policy.premium}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm text-slate-700">{policy.startDate}</span>
                        <span className="text-xs text-slate-400">to {policy.endDate}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {policy.status === 'Active' && (
                        <span className="inline-flex items-center gap-1.5 text-aos-emerald text-sm font-medium bg-aos-emerald/10 px-2.5 py-1 rounded-full">
                          <CheckCircle2 className="w-4 h-4" /> Active
                        </span>
                      )}
                      {policy.status === 'Pending Approval' && (
                        <span className="inline-flex items-center gap-1.5 text-aos-amber text-sm font-medium bg-aos-amber/10 px-2.5 py-1 rounded-full">
                          <Clock className="w-4 h-4" /> Pending
                        </span>
                      )}
                      {policy.status === 'Expired' && (
                        <span className="inline-flex items-center gap-1.5 text-slate-500 text-sm font-medium bg-slate-100 px-2.5 py-1 rounded-full">
                          <XCircle className="w-4 h-4" /> Expired
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {policy.tiraSync === 'Synced' ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-aos-blue/10 text-aos-blue" title="Synced to TIRA">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-400" title="Pending TIRA Sync">
                          <Clock className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="p-4 border-t border-slate-100 bg-slate-50/50 rounded-b-xl flex items-center justify-between text-sm text-slate-500">
              Showing 1 to 5 of 240 entries
              <div className="flex gap-1">
                <button className="px-3 py-1 rounded border border-slate-200 bg-white text-slate-400 cursor-not-allowed">Prev</button>
                <button className="px-3 py-1 rounded border border-slate-200 bg-aos-blue text-white font-medium">1</button>
                <button className="px-3 py-1 rounded border border-slate-200 bg-white text-slate-700 hover:bg-slate-50">2</button>
                <button className="px-3 py-1 rounded border border-slate-200 bg-white text-slate-700 hover:bg-slate-50">3</button>
                <button className="px-3 py-1 rounded border border-slate-200 bg-white text-slate-700 hover:bg-slate-50">Next</button>
              </div>
            </div>
            </>
            )}
          </div>
        </Card>
      </div>

      <PolicyDetailDrawer 
        isOpen={!!selectedPolicy} 
        onClose={() => setSelectedPolicy(null)} 
        policyId={selectedPolicy} 
      />
      
      <IssuePolicyWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
      />
      
      <QuotationWizard
        isOpen={isQuotationOpen}
        onClose={() => setIsQuotationOpen(false)}
      />
    </>
  );
}
